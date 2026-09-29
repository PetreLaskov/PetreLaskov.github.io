import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root='.';
const dir=path.join(root,'evals/helper-fixtures');fs.mkdirSync(dir,{recursive:true});
const wrapper=path.join(dir,'jq-fixture-wrapper.sh');
// Only the JSON selector is substituted. The original hook never executes COMMAND.
// No test command below is sent to a Git executable or evaluated by a shell.
fs.writeFileSync(wrapper,`#!/bin/bash\njq() { '/path/to/programs/nodejs/node.exe' -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>process.stdout.write(String(JSON.parse(s).tool_input.command)+"\\n"));'; }\nexport -f jq\nexec bash "$1"\n`);
const cases=[
 ['status','git status',0],
 ['push','git push origin HEAD',2],
 ['reset','git reset --hard HEAD',2],
 ['reset-with-directory','git -C repo reset --hard HEAD',2],
 ['clean-source-spelling','git clean -fd',2],
 ['clean-reordered-flags','git clean -df',2],
 ['checkout-with-separator','git checkout -- .',2],
 ['restore-with-option','git restore --worktree .',2],
 ['branch-long-options','git branch --delete --force old',2],
 ['quoted-mention',"printf '%s' 'git push'",0],
 ['composition','git status && git reset --hard HEAD',2]
];
const source=path.join(root,'source/skills/misc/git-guardrails-claude-code/scripts/block-dangerous-git.sh');
const records=cases.map(([id,command,expected])=>{const r=spawnSync('/path/to/programs/Git/bin/bash.exe',[wrapper,source],{input:JSON.stringify({tool_input:{command}}),encoding:'utf8',windowsHide:true});return {id,command,expected_exit:expected,actual_exit:r.status,meets_intended_classification:r.status===expected,stderr:r.stderr.trim(),stdout:r.stdout.trim(),error:r.error?.message};});
const syntaxTargets=[['hook',source,'bash'],['wizard',path.join(root,'source/skills/engineering/wizard/template.sh'),'bash'],['debug-loop',path.join(root,'source/skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh'),'bash'],['dependency-config',path.join(root,'source/skills/in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs'),'node']];
const syntax=syntaxTargets.map(([id,f,tool])=>{const r=spawnSync(tool==='bash'?'/path/to/programs/Git/bin/bash.exe':'/path/to/programs/nodejs/node.exe',[tool==='bash'?'-n':'--check',f],{encoding:'utf8',windowsHide:true});return {id,path:path.relative(root,f),exit:r.status,stderr:r.stderr.trim()};});
const report={run_at:new Date().toISOString(),scope:'The original inspected hook is executed only as a classifier of JSON text. jq is substituted by a fixture-only JSON selector because jq is unavailable. No classified command is executed. Tests characterize the source regex policy, not host enforcement or complete shell parsing.',records,syntax};
fs.writeFileSync(path.join(root,'evals/helper-tests.json'),JSON.stringify(report,null,2));
let md='# Executed helper checks\n\n'+report.scope+'\n\nThe expected classifications are stated test expectations: mutation forms should be blocked; a command that only prints words should be allowed. They do not prove a universal shell policy.\n\n| Case | Supplied command text | Expected exit | Observed exit | Expected classification met |\n|---|---|---:|---:|---|\n'+records.map(r=>`| ${r.id} | \`${r.command}\` | ${r.expected_exit} | ${r.actual_exit} | ${r.meets_intended_classification?'yes':'no'} |`).join('\n')+'\n\nExit 2 blocks; exit 0 allows. The quoted-mention case exposes a false positive; reordered/expanded spellings expose omissions. These are observations of the pinned source, not measurements of a rewritten host guard. The refactor deliberately retains the old script as an inactive, limited reference and requires target-harness tests before claiming enforcement.\n\n## Syntax only\n\n'+syntax.map(x=>`- ${x.id}: exit ${x.exit} from ${x.id==='dependency-config'?'node --check':'bash -n'}.`).join('\n')+'\n\nParsing does not establish that a wizard completed, secrets were stored correctly, a debugging loop reproduced a bug, or dependency-cruiser resolved actual imports. Those environment-specific operations were not performed.\n';
fs.writeFileSync(path.join(root,'evals/HELPER-TESTS.md'),md);
console.log(JSON.stringify({cases:records.length,met:records.filter(r=>r.meets_intended_classification).length,syntax:syntax.map(x=>({id:x.id,exit:x.exit}))}));
