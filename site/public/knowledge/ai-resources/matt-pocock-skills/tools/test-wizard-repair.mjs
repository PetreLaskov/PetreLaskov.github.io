import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root='.';
const bash='/path/to/programs/Git/bin/bash.exe';
const cases=[
 {id:'ask-eof-with-saved-value',input:'',env:'TEST_KEY=saved_value\n',code:'TEST_KEY=sentinel\nif ask TEST_KEY "Value:"; then exit 10; fi\n[[ "$TEST_KEY" == sentinel ]]'},
 {id:'secret-eof-with-saved-value',input:'',env:'TEST_KEY=SYNTHETIC_PRIVATE_VALUE\n',code:'TEST_KEY=sentinel\nif ask_secret TEST_KEY "Secret:"; then exit 10; fi\n[[ "$TEST_KEY" == sentinel ]]'},
 {id:'ask-empty-required',input:'\n',code:'if ask TEST_KEY "Value:"; then exit 10; fi'},
 {id:'secret-empty-required',input:'\n',code:'if ask_secret TEST_KEY "Secret:"; then exit 10; fi'},
 {id:'ask-explicit-enter-reuses',input:'\n',env:'TEST_KEY=saved_value\n',code:'ask TEST_KEY "Value:"\n[[ "$TEST_KEY" == saved_value ]]'},
 {id:'secret-explicit-enter-reuses',input:'\n',env:'TEST_KEY=SYNTHETIC_PRIVATE_VALUE\n',code:'ask_secret TEST_KEY "Secret:"\n[[ "$TEST_KEY" == SYNTHETIC_PRIVATE_VALUE ]]'},
 {id:'ask-new-value',input:'new_value\n',code:'ask TEST_KEY "Value:"\n[[ "$TEST_KEY" == new_value ]]'},
 {id:'pause-eof',input:'',code:'if pause "Continue:"; then exit 10; fi'},
 {id:'secret-auth-failure',code:'gh() { return 1; }\nif set_secret TEST_KEY SYNTHETIC_PRIVATE_VALUE; then exit 10; fi\n[[ ${#SKIPPED[@]} == 1 ]]'},
 {id:'secret-write-failure',code:'gh() { [[ "$1" == auth ]]; }\nif set_secret TEST_KEY SYNTHETIC_PRIVATE_VALUE; then exit 10; fi\n[[ ${#SKIPPED[@]} == 1 ]]'},
 {id:'variable-write-failure',code:'gh() { [[ "$1" == auth ]]; }\nif set_var TEST_KEY public_value; then exit 10; fi\n[[ ${#SKIPPED[@]} == 1 ]]'},
 {id:'finish-after-failure',code:'gh() { return 1; }\nset_secret TEST_KEY SYNTHETIC_PRIVATE_VALUE || true\nif finish; then exit 10; fi',absent:'Setup complete',present:'Setup incomplete'},
 {id:'success-completes',code:'gh() { if [[ "$1" == secret ]]; then cat >/dev/null; fi; return 0; }\nset_secret TEST_KEY SYNTHETIC_PRIVATE_VALUE\nset_var TEST_KEY public_value\nfinish',present:'Setup complete'},
 {id:'failed-stage-stops-before-write',env:'TEST_KEY=saved_value\n',code:'ask TEST_KEY "Value:"\nprintf "UNREACHED_WRITE\\n"\nwrite_env TEST_KEY "$TEST_KEY"',expected:1,absent:'UNREACHED_WRITE',envAfter:'TEST_KEY=saved_value\n'}
];
const variants={source:'source/skills/engineering/wizard/template.sh',v1:'evals/candidate-v1/wizard/template.sh',repaired:'refactored/wizard/template.sh'};
const records=[];
for(const [variant,file] of Object.entries(variants)){
 const text=fs.readFileSync(path.join(root,file),'utf8');
 const lib=text.slice(0,text.indexOf('# STAGES:'));
 const syntax=spawnSync(bash,['-n',path.join(root,file)],{encoding:'utf8',windowsHide:true});
 if(syntax.status!==0)throw new Error('Syntax failure '+variant+syntax.stderr);
 for(const c of cases){
  const d=path.join(root,'evals/helper-fixtures/wizard',variant,c.id);fs.mkdirSync(d,{recursive:true});
  const envFile=path.join(d,'fixture.env');fs.writeFileSync(envFile,c.env||'');
  const script=path.join(d,'run.sh');fs.writeFileSync(script,lib+'\n# Isolated synthetic fixture; example stages are omitted.\n'+c.code+'\n');
  const r=spawnSync(bash,[script],{input:c.input||'',encoding:'utf8',windowsHide:true,env:{...process.env,ENV_FILE:envFile.replace(/^C:/,'/c')}});
  const output=r.stdout+r.stderr;
  const checks={exit:r.status===(c.expected??0),no_secret_output:!output.includes('SYNTHETIC_PRIVATE_VALUE'),absent:c.absent?!output.includes(c.absent):true,present:c.present?output.includes(c.present):true,env_preserved:c.envAfter?fs.readFileSync(envFile,'utf8')===c.envAfter:true};
  records.push({variant,case:c.id,expected_exit:c.expected??0,actual_exit:r.status,checks,passed:Object.values(checks).every(Boolean),stdout:r.stdout.trim(),stderr:r.stderr.trim()});
 }
}
const scope='Executed Bash library fixtures with synthetic input and a stubbed gh function. The live example stages, browser operations, real secrets, and remote writes were never run. These checks cover input/failure/completion behavior only; they do not validate the entire dotenv serializer, generated stages, repository targeting, or a live setup.';
fs.writeFileSync(path.join(root,'evals/wizard-repair-tests.json'),JSON.stringify({run_at:new Date().toISOString(),scope,cases,records},null,2));
const totals=Object.keys(variants).map(v=>({variant:v,passed:records.filter(r=>r.variant===v&&r.passed).length,total:cases.length}));
fs.writeFileSync(path.join(root,'evals/WIZARD-REPAIR.md'),'# Wizard repair: executed regression checks\n\n'+scope+'\n\nThe invariants were selected after an independent audit found contradictions in the initial candidate. They are regression tests, not unseen benchmark results. Both the pinned source and archived first candidate are run alongside the repair.\n\n| Version | Checks met |\n|---|---:|\n'+totals.map(r=>`| ${r.variant} | ${r.passed}/${r.total} |`).join('\n')+'\n\n| Case | Source | Initial candidate | Repaired candidate |\n|---|---|---|---|\n'+cases.map(c=>'| '+c.id+' | '+Object.keys(variants).map(v=>records.find(r=>r.variant===v&&r.case===c.id).passed?'pass':'fail').join(' | ')+' |').join('\n')+'\n\nAn explicit Enter still accepts a saved nonempty value. EOF or missing required values fail before a later write, and failed required remote operations return nonzero. Even if a caller catches that failure, finish reports incomplete and returns nonzero. Successful stubbed operations still complete. All output was checked for leakage of the synthetic secret.\n\nSee [raw records](wizard-repair-tests.json) and [versioned changes](../reviews/audit-repairs.json). The 114-case text trial continues to describe the archived v1 candidate.\n');
console.log(JSON.stringify(totals));
if(records.some(r=>r.variant==='repaired'&&!r.passed))process.exitCode=1;
