import sys, os, json, hashlib, re, difflib, importlib.util
from pathlib import Path
ROOT=Path(sys.argv[1] if len(sys.argv)>1 else r'.')
sys.path.insert(0,str(Path(os.environ['TEMP'])/'codex-matt-skills-validation-20260929'))
import yaml
validator_path=Path(r'/path/to/user-home\.codex\skills\.system\skill-creator\scripts\quick_validate.py')
spec=importlib.util.spec_from_file_location('skill_validator',validator_path)
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
manifest=json.loads((ROOT/'source-manifest.json').read_text(encoding='utf-8'))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:p.read_text(encoding='utf-8-sig')
issues=[]; checks=[]; links=[]; packages=[]; deltas=[]
for f in manifest['files']:
 p=ROOT/f['path'];checks.append({'check':'source hash','path':f['path'],'pass':p.exists() and sha(p)==f['sha256']})
for s in manifest['skills']:
 slug=s['slug'];src=ROOT/s['source'];author=ROOT/'reviews'/('author-'+slug+'.json')
 if not author.exists():issues.append({'skill':slug,'issue':'Missing author metadata'});continue
 m=json.loads(read(author));chapter=ROOT/'chapters'/(slug+'.md')
 if not chapter.exists():issues.append({'skill':slug,'issue':'Missing chapter'});continue
 words=len(read(chapter).split());checks.append({'check':'substantive chapter floor','path':str(chapter.relative_to(ROOT)),'words':words,'pass':words>=1000})
 for kind,name in [('refactored',slug),('original-skills',m['original_slug'])]:
  p=ROOT/kind/name
  try:ok,message=module.validate_skill(p)
  except Exception as e:ok=False;message=str(e)
  packages.append({'path':str(p.relative_to(ROOT)).replace('\\','/'),'pass':ok,'message':message,'sha256':sha(p/'SKILL.md') if (p/'SKILL.md').exists() else None})
  if not ok:issues.append({'skill':slug,'issue':kind+': '+message})
  if (p/'SKILL.md').exists():
   front=re.match(r'^---\s*\n(.*?)\n---',read(p/'SKILL.md'),re.S)
   fm=yaml.safe_load(front.group(1)) if front else {}
   checks.append({'check':'name matches directory','path':str(p.relative_to(ROOT)),'pass':fm.get('name')==name})
 source_policy=src.parent/'agents'/'openai.yaml';candidate_policy=ROOT/'refactored'/slug/'agents'/'openai.yaml'
 if source_policy.exists():checks.append({'check':'preserved invocation metadata','path':slug,'pass':candidate_policy.exists() and sha(source_policy)==sha(candidate_policy)})
 checks.append({'check':'source license in refactor','path':slug,'pass':(ROOT/'refactored'/slug/'LICENSE').exists() and sha(ROOT/'refactored'/slug/'LICENSE')==sha(ROOT/'source'/'LICENSE')})
 # Exact text package diff, including deleted or added support files.
 a={p.relative_to(src.parent).as_posix():p for p in src.parent.rglob('*') if p.is_file()}
 b={p.relative_to(ROOT/'refactored'/slug).as_posix():p for p in (ROOT/'refactored'/slug).rglob('*') if p.is_file()}
 dispositions=[x.get('file','').replace('\\','/') for x in m.get('supporting_disposition',[])]
 reported_reads=[x.replace('\\','/') if x.replace('\\','/').startswith('source/') else 'source/'+x.replace('\\','/') for x in m.get('source_files_read',[])]
 for rel,p in a.items():
  checks.append({'check':'source file recorded as read','path':str(p.relative_to(ROOT)).replace('\\','/'),'pass':p.relative_to(ROOT).as_posix() in reported_reads})
  if rel!='SKILL.md':checks.append({'check':'supporting file disposition','path':str(p.relative_to(ROOT)).replace('\\','/'),'pass':any(d==rel or d.endswith('/'+slug+'/'+rel) for d in dispositions)})
 chunks=[]
 for rel in sorted(set(a)|set(b)):
  old=read(a[rel]) if rel in a else '';new=read(b[rel]) if rel in b else ''
  if old!=new:
   chunks.extend(difflib.unified_diff(old.splitlines(keepends=True),new.splitlines(keepends=True),fromfile='a/'+str(src.parent.relative_to(ROOT)).replace('\\','/')+'/'+rel,tofile='b/refactored/'+slug+'/'+rel))
 (ROOT/'diffs'/(slug+'.diff')).write_text(''.join(chunks),encoding='utf-8')
 deltas.append({'slug':slug,'changed_files':[r for r in sorted(set(a)|set(b)) if (read(a[r]) if r in a else '')!=(read(b[r]) if r in b else '')],'delta_count':len(m.get('deltas',[])),'supporting_files':list(a),'dispositions':m.get('supporting_disposition',[])})
 # Check real Markdown artifact links outside code blocks. Runtime/example locations in code are not links.
 targets=[chapter]+list((ROOT/'refactored'/slug).rglob('*.md'))+list((ROOT/'original-skills'/m['original_slug']).rglob('*.md'))
 for f in targets:
  body=re.sub(r'(?ms)^\s*(```|~~~).*?^\s*\1\s*$','',read(f))
  for target in re.findall(r'\]\(([^\n]+?)\)',body):
   target=target.strip().strip('<>');target=target.split(' "')[0]
   if re.match(r'^(https?://|mailto:|#|codex:)',target):continue
   target=target.split('#')[0]
   if not target or '<' in target or '{' in target:continue
   target=re.sub(r':\d+(?:-\d+)?$','',target)
   resolved=(f.parent/target).resolve()
   if not resolved.exists():links.append({'file':str(f.relative_to(ROOT)).replace('\\','/'),'target':target})
source_checkout=ROOT.parent/'mattpocock-skills'
for s in manifest['skills']:
 src=source_checkout/Path(s['source']).relative_to('source');checks.append({'check':'checkout skill unchanged','path':str(src),'pass':src.exists() and sha(src)==s['sha256']})
result={'packages':packages,'checks':checks,'issues':issues,'unresolved_links':links,'deltas':deltas,'counts':{'packages':len(packages),'package_pass':sum(x['pass'] for x in packages),'checks':len(checks),'check_pass':sum(x['pass'] for x in checks),'issues':len(issues),'unresolved_links':len(links)}}
(ROOT/'validation.json').write_text(json.dumps(result,indent=2,ensure_ascii=False),encoding='utf-8')
text='# Structural validation\n\n'
text+='Executed the bundled skill-creator quick_validate.py through its validate_skill function using PyYAML 6.0.3 installed in a temporary dependency folder. No global skill installation or Python package mutation was performed.\n\n'
text+=f"Packages passing frontmatter/name/scaffold validation: **{result['counts']['package_pass']} / {len(packages)}**. Additional source, invocation, license, name and chapter checks: **{result['counts']['check_pass']} / {len(checks)}**. Unresolved local Markdown links: **{len(links)}**.\n\n"
text+='These checks establish package structure and source preservation, not behavioral superiority, actual host activation or successful external integration. Exact diffs include support files and packaging changes; they are comparison artifacts, not a promise that git apply will directly patch the upstream layout.\n\n'
text+='See [machine-readable validation](validation.json) for every result.\n'
if issues or links:text+='\n## Items requiring attention\n\n```json\n'+json.dumps({'issues':issues,'links':links},indent=2)+'\n```\n'
(ROOT/'VALIDATION.md').write_text(text,encoding='utf-8')
print(json.dumps(result['counts']))
