import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=process.argv[2] || '.';
const req=createRequire(import.meta.url);
const moduleRoot='/path/to/user-home/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {marked}=await import(pathToFileURL(req.resolve('marked',{paths:[moduleRoot]})));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const write=(p,s)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),s);};
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const wc=s=>s.trim().split(/\s+/).length;
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const relocate=(md,base)=>md.replace(/\]\(([^\n)]+)\)/g,(all,target)=>{
 if(/^(https?:|mailto:|#|codex:|[A-Za-z]:|\/)/.test(target))return all;
 return ']('+path.posix.normalize(base+'/'+target)+')';
});
const manifest=JSON.parse(read('source-manifest.json'));
const meta=manifest.skills.map(s=>({...s,...(exists('reviews/author-'+s.slug+'.json')?JSON.parse(read('reviews/author-'+s.slug+'.json')):{})}));
const incomplete=meta.filter(s=>!exists('chapters/'+s.slug+'.md')||!exists('refactored/'+s.slug+'/SKILL.md')||!s.original_slug||!exists('original-skills/'+s.original_slug+'/SKILL.md'));
if(incomplete.length){console.log(JSON.stringify({waitingFor:incomplete.map(s=>s.slug)}));process.exit(2);}
let intro=`# Studying and rebuilding Matt Pocock's skills

This is a complete study edition of the 38 skills in the pinned local collection. Each chapter begins with Matt's design and the problem it solves, then argues for and against using it, proposes a refactor, explains the changes, and develops an original skill. The rewritten skills and original proposals are actual packages you can inspect. They are candidates, not installed defaults or statements of your preferences.

## The question worth answering

The useful target is not "Can we make all 38 prompts look more sophisticated?" It is: **What does each skill contribute beyond a capable assistant, how can that contribution be made more reliable and economical, and what important capabilities does the collection leave open?** That preserves your request for ambition while making the ambition answerable. Sometimes the strongest refactor is a small repair. Sometimes the original should remain the default. Sometimes the right addition is a separate skill rather than more instructions inside the old one.

The consequential edit is to separate elegance on paper, observed behavior on a fixture, and improvement in our actual collaboration. All three matter, but they are different claims. The chapters give judgments about design. The laboratory section contains retained responses and case-bound grades. Only use over time can establish whether the package saves your attention, improves the result, or creates ceremony that gets in the way.

## What is inside

- **38 chapters:** mechanisms, context, worked examples, strengths, criticisms, porting bets, alternatives, and exercises.
- **38 refactored packages:** ready to inspect as local skill folders, with necessary references, source-license attribution and preserved explicit-only invocation where applicable.
- **38 original proposals:** complete skill instructions, accompanied by their own rationale, examples and failure conditions. Original here means newly proposed in this edition; it is not a claim that nobody has invented the idea elsewhere.
- **Exact package diffs:** additions, deletions and replacements between the preserved source snapshot and the proposed package. Chapter deltas explain why the textual changes matter.
- **Evaluation records:** fixed prompts, rubrics, candidate hashes, original and candidate responses, grading evidence, critical review and limitations. Read the method before treating any letter grade as a verdict.

The source is commit \`c55ee46073ed923f86ce59a5eb3b6d895095d1b7\`. This edition studies that snapshot, not an unverified claim about today's upstream repository. It contains 18 engineering, 7 productivity, 9 in-progress and 4 miscellaneous skills. "In-progress" and "miscellaneous" were Matt's categories at the snapshot, not new ratings assigned here. His promoted plugin set is smaller than the full collection being studied.

## How to read a chapter

First ask whether you can explain the original's distinctive move without borrowing its terminology. For example, a frontier means questions or tasks whose prerequisites are settled; a deep module hides a useful amount of complexity behind a manageable interface. The terms are useful only if they make a decision clearer.

Next examine the worked example. Could you recognize the situation in actual work? A skill with a compelling theory but no recognizable trigger is difficult to use well. Then read the criticism before the refactor. The criticism should identify a failure mechanism or a real cost, not merely prefer a different tone.

Read the proposed instructions as an operator would: what will they make an assistant do differently, and what will they prevent it from doing? Look at the exact diff when an omission or a new requirement concerns you. The source includes support files; a short entrypoint can be misleading if its operational detail lives elsewhere. Each author audit accounts for the support it read and what the refactor retained, replaced or removed.

Finally compare the original proposal with the refactor. The refactor is accountable to Matt's purpose. The original proposal has a wider remit. It can expose a missing capability or suggest a different mode of collaboration, but it still needs a discriminating trigger, useful output and believable cost. A novel title does not itself justify another skill.

## The strongest ideas running through the collection

**Dependencies organize attention.** Grilling asks what can be decided now. Tickets ask what can be built now. Wayfinder asks which uncertainty can be resolved now. These are related structures with different outputs. Confusing them turns conversation into an implementation backlog or sends an agent to build before the governing decision exists.

**Concrete artifacts make disagreement productive.** A prototype offers something to react to. A specification describes behavior that can be checked. A questionnaire directs an information gap to someone who can answer it. A writing beat makes an actual move in the reader's experience. The artifact is useful when it exposes a choice; it becomes overhead when produced solely to satisfy a workflow.

**Interfaces determine what evidence is possible.** TDD, bug diagnosis, codebase design and review keep returning to the seam where behavior can be observed. If a test cannot reach the reported failure, a passing assertion has little value. If every caller must know a module's internals, a small exported API may still be a large conceptual interface. These are practical distinctions worth studying even if you never install the skills.

**Preserving context is a design problem.** Glossaries, decision records, handoffs and tracker links can make future work cheaper. They can also preserve a confident mistake. A pointer is useful only if the next reader can access it and understand what it establishes. A handoff should not turn a proposed decision into an accepted one simply by summarizing it neatly.

**Exploration and commitment need different behavior.** Writing-fragments widens the available material. Writing-shape and writing-beats commit to a reader journey. Research gathers support; a decision still needs judgment. Planning and execution can be intentionally combined, but changing modes silently is a common source of wasted work.

## Where the collection is most vulnerable

One vulnerability is composition. Individually plausible skills can disagree when joined: a review that examines committed HEAD changes cannot automatically validate an implementation that has not been committed. A wrapper may depend on tools or skills that the receiving host cannot load. The refactors should repair these connections without turning every skill into an installation framework.

A second is the conversion of a useful default into a universal rule. Relentless questioning, always recording a glossary, insisting on one test seam, and repeatedly asking for choices all have situations where they help. Each can also consume more attention than the uncertainty warrants. Matt explicitly rejects arbitrary caps on grilling questions; this edition takes that rationale seriously. The interesting issue is question value and dependency, not a magic maximum count.

A third is confidence from representation. A polished lesson is not learned knowledge. A finished specification is not an implemented feature. A clean diff is not correct behavior. A guard script copied into a folder is not an active enforcement boundary. The trial protocol and source audits keep those distinctions visible because the entire project would defeat its purpose if it merely made our claims sound more rigorous.

The answer is not to add a disclaimer to every paragraph. It is to place the relevant distinction where the assistant makes a consequential decision: whether to proceed, publish, mark complete, ask the user, retain an artifact or claim a result. The cheapest effective intervention is usually more durable than a long general checklist.

## A five-day study route

Treat these as study blocks, not deadlines or required working hours. Reading every package and trying the exercises can take considerably longer than reading the commentary.

**Day 1: Instructions and conversation.** Read writing-for-agents, grilling, grill-me, wait-what, grill-with-docs and domain-modeling. Compare a question that unlocks a decision with one that merely produces more conversation. Rewrite one paragraph of an instruction you actually use, and explain which observable behavior should change.

**Day 2: Learning and uncertainty.** Read teach, research, prototype, wayfinder, handoff and to-questionnaire. Practice distinguishing a fact the assistant can inspect, a judgment the user must make, and an experience neither can replace with a summary. Build a small decision map without pretending to specify what remains foggy.

**Day 3: Delivery and evidence.** Read to-spec, to-tickets, tdd, diagnosing-bugs, code-review, implement, implement-spec and pr. Follow one tiny feature through these stages and actively remove stages it does not need. Inspect the uncommitted-review case and ask what evidence would let you say the feature is finished.

**Day 4: Architecture and operating environment.** Read codebase-design, improve-codebase-architecture, resolving-merge-conflicts, triage, ask-matt, setup-matt-pocock-skills, wizard, setup-pre-commit, git-guardrails-claude-code, setup-ts-deep-modules and migrate-to-shoehorn. Concentrate on what is portable judgment and what depends on specific tooling. The specialist chapters are worth understanding without making them immediate installation priorities.

**Day 5: Writing, workflow and new capabilities.** Read writing-fragments, writing-shape, writing-beats, loop-me, retro, scaffold-exercises and claude-handoff. Return to the original proposals throughout the book. Select at most a few for real trials because they solve a recurring problem, not because the titles sound appealing. Record why the rest can wait.

After any block, try three checks: explain one mechanism in plain words; identify a situation where its skill should not activate; and name the strongest reason to retain Matt's version. Those checks encourage understanding rather than agreement with this edition.

## Porting bets are decisions under uncertainty

The table in PORTING-BETS.md contains author judgments, not a ranking measured on your life. "Adopt" means a strong design recommendation for a suitable setting; it still does not mean globally install now. "Pilot" means try a real task and watch for attention costs. "Conditional" means an environment or recurring need must justify it. "Defer" means the current benefit is unlikely to repay setup or maintenance.

Your history was used to locate the correct local collection and preserve the prior lesson. The proposed capabilities are not deductions about your personality. They range across writing, reasoning, learning, software work and coordination. You can reject the model of collaboration implicit in a proposal without rejecting the useful mechanism that inspired it.

Avoid installing the entire collection merely because the edition is complete. Overlapping triggers can make a large skill library less predictable. Choose the specific behavior you want to change, compare source and candidate on a task where that behavior matters, and retain the simpler effective version. This is a recommendation about adoption, not a restriction on what you asked us to create.

## Settled and open

This edition settles the preparation request when every source skill has its explanation, refactor, original proposal, accounted-for delta and recorded development evaluation. It does not settle which version you prefer, what you have learned, or whether any candidate improves long-term collaboration. Those remain live questions with concrete next evidence: unseen tasks, actual artifacts, your corrections, and the attention each workflow costs.

The strongest surviving objection is that a collection of carefully reasoned prompts can still be an elaborate substitute for watching a capable assistant work. The evaluations here reduce some uncertainty, but shared model tendencies, constructed cases and the authors' own design preferences can make the refactors look better than they will feel in daily use.
`;
if(exists('evals/scored-results.json')){
 const r=JSON.parse(read('evals/scored-results.json')),t=r.totals;
 intro+='\n## What the recorded trials establish\n\nThe development suite retained 342 responses across 114 prompts: one source, one refactor and one no-supplied-skill response per prompt. Blinded response grading awarded '+t.source.points+'/'+t.source.maximum+' assertion points to the source, '+t.refactor.points+'/'+t.refactor.maximum+' to the refactors, and '+t.control.points+'/'+t.control.maximum+' to the control. The strong control and near-ceiling scores mean this suite does **not establish a general improvement from installing the skills**. Read [the complete results](evals/RESULTS.md) for local misses and limitations.\n\nIndependent semantic review found two defects that the response trials did not reliably expose: missing triage closure and contradictory wizard helper behavior. Both were repaired with version history intact. The [wizard regression checks](evals/WIZARD-REPAIR.md) directly exercise its changed executable contract. [Targeted follow-up probes](evals/FOLLOWUP-RESULTS.md) cover revised triage instructions and four original proposals. These are development checks selected after review, not unseen benchmark wins.\n\nThe [portfolio review](REVIEWS.md) also challenges overlapping and overly generic original proposals. Two duplicates were replaced, two validity defects repaired, and remaining merge/defer recommendations remain visible. The collection is complete for study; adoption should remain selective.\n';
}
write('OVERVIEW.md',intro);
const betRows=meta.map(s=>`| ${s.number} | [${s.slug}](chapters/${s.slug}.md) | ${s.port_bet||'See chapter'} | ${(s.summary||'See chapter').replaceAll('|','/')} | [${s.original_slug}](original-skills/${s.original_slug}/SKILL.md) |`).join('\n');
write('PORTING-BETS.md',`# Porting bets and original proposals\n\nThese are design judgments by the chapter authors. They are not empirical rankings, user endorsement or installation decisions. See each chapter for its counterargument and falsifier, and the laboratory for trial evidence.\n\n| Study order | Source skill | Author bet | Governing reason | Original proposal |\n|---:|---|---|---|---|\n${betRows}\n`);
let blocks=[intro,'# Chapter index\n\n'+meta.map(s=>`${s.number}. [${s.slug}](#chapter-${s.slug})`).join('\n')];
const reader=[];
for(const s of meta){
 const chapter=read('chapters/'+s.slug+'.md');
 const sourceDir=path.dirname(s.source);
 const sourceFiles=walk(path.join(root,sourceDir)).map(f=>path.relative(root,f).replaceAll('\\','/'));
 const candidateFiles=walk(path.join(root,'refactored',s.slug)).map(f=>path.relative(root,f).replaceAll('\\','/'));
 const originalFiles=walk(path.join(root,'original-skills',s.original_slug)).map(f=>path.relative(root,f).replaceAll('\\','/'));
 const diffPath='diffs/'+s.slug+'.diff';
 const evalPath='evals/'+s.slug+'.md';
 const evalMd=exists(evalPath)?read(evalPath):'Evaluation pending. No grade or benefit claim is available.';
 const diff=exists(diffPath)?read(diffPath):'Exact diff pending.';
 const refactor=read('refactored/'+s.slug+'/SKILL.md');
 const original=read('original-skills/'+s.original_slug+'/SKILL.md');
 blocks.push(`<a id="chapter-${s.slug}"></a>\n\n${relocate(chapter,'chapters')}\n\n## Complete proposed refactor\n\n\`\`\`\`markdown\n${refactor}\n\`\`\`\`\n\n## Complete original proposal: ${s.original_slug}\n\n\`\`\`\`markdown\n${original}\n\`\`\`\`\n\n## Recorded development evaluation\n\n${relocate(evalMd,'evals')}\n\n[Exact package diff](${diffPath})\n`);
 const renderBundle=(ff,raw=false)=>ff.map(f=>{let text=read(f),body;if(raw){body='<pre><code>'+esc(text.split('\n').map((line,i)=>String(i+1).padStart(3)+'  '+line).join('\n'))+'</code></pre>'}else if(f.endsWith('.md')){const fm=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);body=(fm?'<pre><code>'+esc(fm[1])+'</code></pre>':'')+marked.parse(relocate(fm?text.slice(fm[0].length):text,path.posix.dirname(f)))}else body='<pre><code>'+esc(text)+'</code></pre>';return `<details ${f.endsWith('/SKILL.md')?'open':''}><summary>${esc(f.split('/').slice(2).join('/'))}</summary>${body}</details>`}).join('');
 reader.push({...s,words:wc(chapter),panels:{chapter:marked.parse(relocate(chapter,'chapters')),source:renderBundle(sourceFiles,true),refactor:renderBundle(candidateFiles),original:renderBundle(originalFiles),diff:'<p>Exact source-to-candidate package changes. Explanations of the behavioral delta are in the chapter.</p><pre class="diff"><code>'+esc(diff)+'</code></pre>',eval:marked.parse(relocate(evalMd,'evals'))}});
}
write('COMPENDIUM.md',blocks.join('\n\n---\n\n'));
const totalWords=meta.reduce((a,s)=>a+wc(read('chapters/'+s.slug+'.md')),0);
write('README.md',`# Matt Pocock skills: the study compendium\n\nStart with [the offline study reader](COMPENDIUM.html) or [the overview and five-day route](OVERVIEW.md). The reader keeps explanation, original source, refactor, exact diff, original proposal and evaluation together for each skill.\n\n**38 source skills · 38 refactored packages · 38 original proposals · ${totalWords.toLocaleString()} words of chapter commentary.**\n\n- [Single-file Markdown compendium](COMPENDIUM.md)\n- [Porting bets and original proposal index](PORTING-BETS.md)\n- [Evaluation method](evals/PROTOCOL.md) and [results](evals/RESULTS.md)\n- [Validation](VALIDATION.md) and [source manifest](source-manifest.json)\n- [Reproduction guide](REPRODUCE.md)\n\nSnapshot: c55ee46073ed923f86ce59a5eb3b6d895095d1b7. Source is preserved under source/ with the Matt Pocock MIT license. Candidates are local proposals; nothing is globally installed. Earlier lessons are untouched.\n\n## Chapters\n\n${meta.map(s=>`${s.number}. [${s.slug}](chapters/${s.slug}.md) (${s.bucket})`).join('\n')}\n`);
const protocol=relocate(read('evals/PROTOCOL.md')+'\n\n'+(exists('evals/PROTOCOL-ADDENDUM.md')?read('evals/PROTOCOL-ADDENDUM.md'):''),'evals');
const results=exists('evals/RESULTS.md')?relocate(read('evals/RESULTS.md'),'evals')+'\n\n'+(exists('REVIEWS.md')?read('REVIEWS.md'):''):'Trial results are pending.';
const html=String.raw`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Matt Pocock skills · Study compendium</title><style>
:root{color-scheme:light;--ink:#202727;--muted:#52615b;--paper:#f7f5ef;--accent:#205c4a;--line:#d7ddd4}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.7 system-ui,sans-serif}a{color:#145b77;text-underline-offset:3px}button,input,select{font:inherit}button{cursor:pointer}header{padding:24px 32px 18px;border-bottom:1px solid var(--line);background:#fffdf8}header h1{font:700 29px/1.2 Georgia,serif;margin:5px 0}header p{color:var(--muted);margin:5px 0;font-size:14px}.layout{display:grid;grid-template-columns:280px minmax(0,1fr);max-width:1600px;margin:auto}aside{position:sticky;top:0;height:100vh;overflow:auto;padding:20px 16px;border-right:1px solid var(--line)}input{width:100%;padding:9px;border:1px solid #a8b7ae;border-radius:6px;background:white}nav button,.overview{display:block;width:100%;text-align:left;border:0;background:transparent;padding:8px 9px;border-radius:5px;font-size:14px;line-height:1.35;margin:3px 0}nav button:hover,.overview:hover{background:#e2e9e0}nav button[aria-current="page"],.overview[aria-current="page"]{background:#205c4a;color:white}nav small{display:block;opacity:.7;font-size:11px}.main{min-width:0;padding:28px 42px 80px}.tabs{display:flex;gap:5px;flex-wrap:wrap;border-bottom:1px solid var(--line);margin:0 0 25px;padding-bottom:12px}.tabs button{padding:7px 12px;border:1px solid #aebcb3;border-radius:20px;background:transparent;font-size:13px}.tabs button[aria-selected="true"]{background:var(--accent);color:#fff;border-color:var(--accent)}.meta{color:var(--muted);font-size:13px;margin:0 0 14px}.content{max-width:900px}.content h1{font:700 34px/1.22 Georgia,serif;letter-spacing:-.4px;margin:0 0 24px}.content h2{font:700 25px/1.3 Georgia,serif;margin:36px 0 14px}.content h3{font-size:19px;line-height:1.4;margin-top:28px}.content p{margin:15px 0}.content li{margin:8px 0}.content code{font:13px/1.6 ui-monospace,Consolas,monospace;background:#e8ece5;padding:2px 4px;border-radius:3px;overflow-wrap:anywhere}.content pre{background:#eef0e9;border:1px solid var(--line);padding:17px;overflow:auto;border-radius:7px;font-size:13px;line-height:1.6}.content pre code{padding:0;background:transparent;white-space:pre;overflow-wrap:normal}.content .diff{font-size:12px;max-height:75vh}.content table{border-collapse:collapse;width:100%;font-size:14px;display:block;overflow:auto}.content th,.content td{border:1px solid var(--line);padding:9px;vertical-align:top;text-align:left}.content th{background:#e5ebe3}.content blockquote{margin:22px 0;padding:1px 18px;border-left:4px solid #b5c7b7;background:#eef1e9}.content details{margin:18px 0;border:1px solid var(--line);border-radius:6px;padding:12px 17px}.content summary{font-weight:650;cursor:pointer;overflow-wrap:anywhere}.content img{max-width:100%}.content hr{border:0;border-top:1px solid var(--line);margin:32px 0}.topline{display:flex;align-items:center;justify-content:space-between;gap:10px}.print{font-size:12px;background:transparent;border:1px solid var(--line);padding:5px 10px;border-radius:5px}.empty{color:var(--muted);padding:12px}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #b5722e;outline-offset:3px}#status{font-size:12px;color:var(--muted)}@media(max-width:800px){header{padding:18px}.layout{display:block}aside{position:relative;height:auto;border-right:0;border-bottom:1px solid var(--line);padding:12px}nav{max-height:190px;overflow:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px}nav button{overflow-wrap:anywhere}.main{padding:22px 18px 50px}.content h1{font-size:28px}.content h2{font-size:23px}}@media print{header,aside,.tabs,.print,.meta{display:none}.layout{display:block}.main{padding:0}.content{max-width:none}.content details{border:0}.content pre{white-space:pre-wrap}.content pre code{white-space:pre-wrap}.content .diff{max-height:none}a{color:inherit}h1,h2,h3{break-after:avoid}body{background:white;font-size:11pt}}
</style></head><body><header><div class="topline"><div><p>STUDY EDITION · SOURCE SNAPSHOT 18 SEPTEMBER 2026</p><h1>Matt Pocock's skills, examined and rebuilt</h1><p>38 explanations · 38 refactors · 38 original proposals · inspectable evaluation evidence</p></div><button class="print" onclick="window.print()">Print this view</button></div></header><div class="layout"><aside><button class="overview" id="overview">Start here / study route</button><button class="overview" id="method">Evaluation method & results</button><label for="search" id="status">Find a skill or original proposal</label><input id="search" type="search" placeholder="Search the collection" autocomplete="off"><nav id="list" aria-label="Skill chapters"></nav><p id="count"></p></aside><main class="main"><div class="meta" id="meta"></div><div class="tabs" role="tablist" aria-label="Chapter materials" id="tabs"></div><article class="content" id="content"></article></main></div><script type="application/json" id="data">${JSON.stringify({reader,intro:marked.parse(intro),method:marked.parse(protocol+'\n\n'+results)}).replaceAll('<','\\u003c')}</script><script>
const data=JSON.parse(document.getElementById('data').textContent),list=document.getElementById('list'),content=document.getElementById('content'),tabs=document.getElementById('tabs'),meta=document.getElementById('meta');let chosen=null,mode='chapter';const labels={chapter:'Understand & discuss',source:'Matt’s source',refactor:'Refactor',diff:'Exact diff',original:'Original proposal',eval:'Evaluation'};
function nav(){const q=document.getElementById('search').value.toLowerCase();list.innerHTML='';const found=data.reader.filter(x=>(x.slug+' '+x.original_slug+' '+x.summary+' '+x.bucket).toLowerCase().includes(q));for(const x of found){const b=document.createElement('button');b.dataset.slug=x.slug;b.setAttribute('aria-current',chosen===x.slug?'page':'false');b.textContent=x.number+'. '+x.slug;const small=document.createElement('small');small.textContent=x.bucket+' · '+x.port_bet;b.appendChild(small);b.onclick=()=>show(x.slug,'chapter');list.appendChild(b)}document.getElementById('count').textContent=found.length+' of 38 skills';}
function show(slug=null,panel='chapter'){
 chosen=slug;mode=panel;tabs.innerHTML='';
 document.getElementById('overview').setAttribute('aria-current',!slug&&panel==='chapter'?'page':'false');document.getElementById('method').setAttribute('aria-current',!slug&&panel==='eval'?'page':'false');
 if(!slug){content.innerHTML=panel==='eval'?data.method:data.intro;meta.textContent='Local study edition · candidates are proposals, not installed defaults';location.hash=panel==='eval'?'method':'overview'}
 else{const s=data.reader.find(x=>x.slug===slug);if(!s)return;meta.textContent='Chapter '+s.number+' / 38 · '+s.bucket+' · '+s.words.toLocaleString()+' commentary words · author bet: '+s.port_bet;for(const [id,label]of Object.entries(labels)){const b=document.createElement('button');b.role='tab';b.setAttribute('aria-selected',id===panel);b.textContent=label;b.onclick=()=>show(slug,id);tabs.appendChild(b)}content.innerHTML=s.panels[panel]||s.panels.chapter;location.hash=slug+'/'+panel;}
 for(const a of content.querySelectorAll('a')){
  const h=a.getAttribute('href')||'';let target=null,targetPanel='chapter';
  let m=h.match(/^chapters\/([a-z0-9-]+)\.md/);if(m)target=m[1];
  m=h.match(/^refactored\/([a-z0-9-]+)\/SKILL\.md/);if(m){target=m[1];targetPanel='refactor';}
  m=h.match(/^original-skills\/([a-z0-9-]+)\/SKILL\.md/);if(m){target=data.reader.find(s=>s.original_slug===m[1])?.slug;targetPanel='original';}
  m=h.match(/^evals\/([a-z0-9-]+)\.md/);if(m){target=m[1];targetPanel='eval';}
  m=h.match(/^diffs\/([a-z0-9-]+)\.diff/);if(m){target=m[1];targetPanel='diff';}
  if(target&&data.reader.some(s=>s.slug===target))a.onclick=e=>{e.preventDefault();show(target,targetPanel)};
  if(['evals/RESULTS.md','evals/PROTOCOL.md','REVIEWS.md'].includes(h))a.onclick=e=>{e.preventDefault();show(null,'eval')};
 }
 nav();window.scrollTo({top:0,behavior:'instant'});
}
document.getElementById('overview').onclick=()=>show();document.getElementById('method').onclick=()=>show(null,'eval');document.getElementById('search').oninput=nav;const [initial,tab]=location.hash.slice(1).split('/');show(data.reader.some(x=>x.slug===initial)?initial:null,initial==='method'?'eval':tab||'chapter');
</script></body></html>`;
write('COMPENDIUM.html',html);
write('publication-manifest.json',JSON.stringify({built_at:new Date().toISOString(),source_commit:manifest.commit,chapters:38,refactors:38,original_proposals:38,commentary_words:totalWords,candidates:meta.map(s=>({slug:s.slug,refactor_sha256:hash(read('refactored/'+s.slug+'/SKILL.md')),original_slug:s.original_slug,original_sha256:hash(read('original-skills/'+s.original_slug+'/SKILL.md')),chapter_words:wc(read('chapters/'+s.slug+'.md'))}))},null,2));
console.log(JSON.stringify({chapters:38,commentaryWords:totalWords,htmlBytes:Buffer.byteLength(html),root}));
