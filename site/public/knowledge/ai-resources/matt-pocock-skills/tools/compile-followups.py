from pathlib import Path
import json, hashlib, datetime
R=Path(r'.')
read=lambda p:json.loads((R/p).read_text(encoding='utf-8-sig'))
cases=[];responses=[];grades=[]
for prefix in ['followup','second-followup']:
 cases+=read('evals/'+prefix+'-with-rubrics.json')['cases']
 responses+=read('evals/'+prefix+'-responses.json')['responses']
 grades+=read('evals/'+prefix+'-grades.json')['cases']
assert len(cases)==len(responses)==len(grades)==8
sections={};points=0;maximum=0
for c in cases:
 g=next(x for x in grades if x['id']==c['id']);r=next(x for x in responses if x['id']==c['id'])
 assert len(g['scores'])==len(g['evidence'])==len(c['assertions'])==3
 assert all(v in [0,.5,1] for v in g['scores'])
 points+=sum(g['scores']);maximum+=len(c['assertions'])
 sections[c['id']]=f"## {c['id']}\n\n**Input:** {c['prompt']}\n\n**Actual response:**\n\n{r['response']}\n\n**Independent judgment:** {sum(g['scores'])}/{len(c['assertions'])}. {g.get('notes','')}\n\n"+'\n'.join(f"- {a} **{g['scores'][i]}.** {g['evidence'][i]}"for i,a in enumerate(c['assertions']))+'\n'
intro=f'# Targeted follow-up development probes\n\nEight actual text responses received **{points}/{maximum}** supported assertion points from independent grading. These prompts were selected after reviews and first-trial outcomes, with criteria fixed before their responses. They are regression and smoke probes, not a held-out efficacy benchmark. They do not replace first-trial scores or establish real tool execution.\n\n'
intro+='The first fresh agent read six prompts and five current skill files only. A separate fresh agent read two later probes: repaired setup and unchanged writing-beats. Graders read only the respective prompts, assertions and retained responses. Writing-beats therefore has a fresh-context retest, but its wording also makes the standalone context explicit; this is not a controlled diagnosis of cross-case contamination.\n\n'
(R/'evals/FOLLOWUP-RESULTS.md').write_text(intro+'\n'.join(sections.values()),encoding='utf-8')
mapping={'grill-me':['preference-probes-01'],'writing-fragments':['anchored-variation-01'],'retro':['instruction-ablation-01'],'writing-shape':['thesis-stress-test-01'],'triage':['triage-repair-full','triage-repair-label-only'],'setup-matt-pocock-skills':['setup-existing-schema-repair'],'writing-beats':['writing-beats-isolated-retest']}
for slug,ids in mapping.items():
 p=R/'evals'/(slug+'.md');t=p.read_text(encoding='utf-8').split('\n<!-- POST-TRIAL -->')[0].rstrip()
 t+='\n\n<!-- POST-TRIAL -->\n# Later targeted evidence\n\nThese post-review text probes are distinct from the first comparison above. They test the stated local behavior and do not establish a collaboration gain or live execution.\n\n'+'\n'.join(sections[i]for i in ids)
 if slug in ['triage','setup-matt-pocock-skills']:t=t.replace('**Case-bound grades:**','**Version note:** the initial comparison uses the archived v1 candidate. The current package has a recorded repair; its targeted response evidence appears below.\n\n**Case-bound grades:**',1)
 p.write_text(t,encoding='utf-8')
p=R/'evals/wizard.md';t=p.read_text(encoding='utf-8').split('\n<!-- POST-TRIAL -->')[0].rstrip()
t=t.replace('**Case-bound grades:**','**Version note:** the initial comparison uses the archived v1 candidate. The current package repairs its shared Bash helper; [14 executed regression checks](WIZARD-REPAIR.md) cover that change.\n\n**Case-bound grades:**',1)
p.write_text(t+'\n\n<!-- POST-TRIAL -->\n## Executed repair evidence\n\nThe source and v1 helper met 4/14 selected checks; the repaired helper met 14/14. These tests exercise input/failure/completion behavior with synthetic data and stubbed remote operations. [Full report](WIZARD-REPAIR.md).\n',encoding='utf-8')
p=R/'evals/RESULTS.md';t=p.read_text(encoding='utf-8').split('\n<!-- POST-TRIAL -->')[0].rstrip()
t+='\n\n<!-- POST-TRIAL -->\n## What the misses changed\n\nThe refactors lost half a point each on writing-beats and setup-matt-pocock-skills. The former carried unsupplied story context into a stress response; the latter imposed unverified tracker details. These are small observed regressions, not proof that either complete package is worse. The control also matched most cases. No result justifies a universal claim that longer instructions are better.\n\nThe setup seed received a concrete preservation repair. Writing-beats already forbade invented prerequisites, so its instructions stayed unchanged and an isolated retest was run. Triage and wizard received separate repairs from semantic audit. Initial grades remain attached to their tested versions.\n\nThe hook stress assertion about prompt advice was only partly supported by every condition: all clearly distinguished copied settings from enforcement, but none explicitly discussed prompt advice. This is partly a rubric-specific wording demand absent from the prompt, and should not be treated as evidence of differential skill value. The judgment is retained rather than altered after seeing results.\n\n'+f'[Eight targeted follow-up responses](FOLLOWUP-RESULTS.md) supported {points}/{maximum} assertions. [Wizard regression tests](WIZARD-REPAIR.md) passed 14/14 on the repair against 4/14 for source and v1. Original-hook classifier tests met 6/11 intended classifications. None of these later development checks removes the need for unseen practical tasks.\n\n'+'[Execution notes](PROTOCOL-EXECUTION-NOTES.md) explain grading and version handling. [Published candidate identity](published-candidate-identity.json) maps final bytes to tested or repaired versions.\n'
p.write_text(t,encoding='utf-8')
conditions=read('evals/CONDITIONS.json');identity=[]
for f in conditions['refactor']['files']:
 p=R/f['path'];current=hashlib.sha256(p.read_bytes()).hexdigest()
 old=R/'evals/candidate-v1'/Path(f['path']).relative_to('refactored')
 if current!=f['sha256']:
  assert old.exists() and hashlib.sha256(old.read_bytes()).hexdigest()==f['sha256'],f['path']
 identity.append(dict(path=f['path'],trial_sha256=f['sha256'],published_sha256=current,status='unchanged since trial'if current==f['sha256']else'repaired after trial',trial_archive=old.relative_to(R).as_posix()if current!=f['sha256']else None))
(R/'evals/published-candidate-identity.json').write_text(json.dumps(dict(recorded_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),files=identity),indent=2),encoding='utf-8')
(R/'evals/PROTOCOL-EXECUTION-NOTES.md').write_text('''# Execution notes and deviations

The original protocol remains intact. The no-supplied-skill condition was added before response trials in PROTOCOL-ADDENDUM.md. Actual scoring used three fresh grading agents, rather than the coordinator named in the first protocol draft. Each grader saw one disjoint packet of cases, fixed assertions, and per-case anonymized A/B/C labels. The condition map was withheld. This reduces direct condition favoritism; recognizable wording and shared model tendencies still limit independence. One grader assessed each response; no inter-rater reliability was measured.

The 114-case comparison refers to candidate v1, frozen in CONDITIONS.json. Final wizard, triage and setup-matt-pocock-skills have later repairs. Their original packages are preserved under candidate-v1 and verified against the frozen hashes. Other refactored files retain their tested bytes. The final original proposal replacements and validity repairs have independent design review; four revised originals have text smoke evidence. The other 34 originals have design review and package validation only.

Follow-up prompts and criteria were saved before the fresh response-producing agents read them, but after the defects were known. They therefore test repairs; they are not unseen proof of general benefit. All scores and first responses are retained, including losses, ties, partials and rubric limitations. Helper tests are isolated executable checks with their own stated scope.
''',encoding='utf-8')
print(json.dumps(dict(targeted_cases=8,points=points,maximum=maximum,changed_trial_files=sum(x['status']=='repaired after trial'for x in identity))))
