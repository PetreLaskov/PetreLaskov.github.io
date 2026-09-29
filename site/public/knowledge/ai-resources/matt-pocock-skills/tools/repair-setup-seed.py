from pathlib import Path
import json, shutil, hashlib, datetime
R=Path(r'.')
src=R/'refactored/setup-matt-pocock-skills';dest=R/'evals/candidate-v1/setup-matt-pocock-skills'
if dest.exists():raise SystemExit('Already revised')
shutil.copytree(src,dest)
log=json.loads((R/'reviews/audit-repairs.json').read_text())
for file,before,after in [
 ('issue-tracker-local.md','# Issue tracker: Local Markdown\n\nOne feature/effort', '# Issue tracker: Local Markdown\n\nThis is a seed for a new tracker, not a migration rule. If the repository already uses local issues, inspect and document its actual paths, fields, comments, relationships and terminal states. Those conventions take precedence over the layout below, including an existing single-file tracker. Do not invent details that have not been inspected or require a migration merely to match this seed.\n\nFor a new tracker: one feature/effort'),
 ('SKILL.md','Use the relevant seed:','Adapt the relevant seed to the observed repository. Existing tracker paths and schema take precedence; an example layout is not evidence of the current layout. If inspection is unavailable, identify the exact schema details to confirm rather than filling them in from the seed.\n\nUse the relevant seed:')]:
 p=src/file;t=p.read_text(encoding='utf-8');old=hashlib.sha256(p.read_bytes()).hexdigest()
 if before not in t:raise ValueError(file)
 p.write_text(t.replace(before,after,1),encoding='utf-8')
 log.append(dict(path=p.relative_to(R).as_posix(),issue='Recorded trial imposed seed conventions on an unspecified existing tracker; make observed conventions authoritative.',before_sha256=old,after_sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
(R/'reviews/audit-repairs.json').write_text(json.dumps(log,indent=2),encoding='utf-8')
cases=[dict(id='setup-existing-schema-repair',skill='refactored/setup-matt-pocock-skills/SKILL.md',support=['refactored/setup-matt-pocock-skills/issue-tracker-local.md'],prompt='Setup dry run. The repository has AGENTS.md and a local issue workflow. Verified layout: all issues live in .scratch/ISSUES.md with opaque IDs such as Q9; state is Open or Done; comments are dated bullets below each item; it has no parent links and one package. Keep that workflow. No triage skill is selected. Describe the minimal configuration changes; do not write files.',assertions=['Preserves the actual single-file layout and opaque IDs without requiring a migration.','Documents only the supplied observed schema or clearly marks missing operations as unresolved.','Preserves AGENTS.md, one context, dry-run scope and absence of unused triage configuration.']),dict(id='writing-beats-isolated-retest',skill='refactored/writing-beats/SKILL.md',support=[],prompt='Earlier beat establishing that the narrator lost their job was deleted by the user. The next proposed beat assumes unemployment. What changes in the next choices? No other story facts are supplied in this standalone fixture.',assertions=['Recomputes grounding after deletion without assuming other story facts.','Does not restore or rely on the deleted fact without author direction.','Offers a route independent of unemployment or a proposed grounding choice.'])]
payload=dict(frozen_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),scope='Post-result targeted development checks: repaired setup seed plus isolated writing-beats retest without changing its skill. Not held-out evidence.',cases=cases)
(R/'evals/second-followup-with-rubrics.json').write_text(json.dumps(payload,indent=2),encoding='utf-8')
public={**payload,'cases':[{k:v for k,v in c.items() if k!='assertions'}for c in cases]}
public['inputs']=[dict(path=p,sha256=hashlib.sha256((R/p).read_bytes()).hexdigest())for p in sorted({p for c in cases for p in [c['skill'],*c['support']]})]
(R/'evals/second-followup-prompts.json').write_text(json.dumps(public,indent=2),encoding='utf-8')
print('Repaired setup seed priority; froze two targeted follow-ups.')
