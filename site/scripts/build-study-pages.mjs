import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const site=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base='/knowledge/ai-resources/matt-pocock-skills/';
const origin='https://petrelaskov.github.io';
const root=path.join(site,'public',base);
const original=fs.readFileSync(path.join(root,'COMPENDIUM.html'),'utf8');
const payload=original.match(/<script type="application\/json" id="data">([\s\S]*?)<\/script>/)?.[1];
if(!payload)throw Error('Missing preserved study reader data');
const data=JSON.parse(payload);
if(data.reader.length!==38)throw Error('Expected the complete 38-skill edition');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date='2026-09-29';
const publication='Study edition commissioned and published by Petre Laskov. Analysis, refactors and evaluations were produced with OpenAI Codex. Original skills by Matt Pocock, preserved under the MIT license. Independent reviews in this edition are AI reviews, not independent human validation.';
const source='https://github.com/mattpocock/skills/tree/c55ee46073ed923f86ce59a5eb3b6d895095d1b7';
const title=s=>s.slug+' — agent skill guide, critique and refactor';
const desc=s=>`Study of Matt Pocock’s ${s.slug} skill: when to use it, strengths, criticism, proposed refactor, exact differences, an original proposal and recorded evaluations.`;
const chapterPath=s=>base+'chapters/'+s.slug+'/';
const routeList=[];
const route=(p)=>{if(!routeList.some(x=>x.route===p))routeList.push({route:p,lastmod:date})};
function links(html){return html.replace(/href="([^"]+)"/g,(all,h)=>{if(/^(https?:|mailto:|data:|#|\/)/.test(h))return all;const match=h.match(/^chapters\/([a-z0-9-]+)\.md$/);if(match&&data.reader.some(s=>s.slug===match[1]))return 'href="'+base+'chapters/'+match[1]+'/"';return 'href="'+esc(new URL(h,origin+base).pathname)+'"'})}
function breadcrumbs(name,url){const pairs=[['Petre Laskov','/'],['The Knowledge Project','/knowledge/'],['AI Resources','/knowledge/ai-resources/'],['Matt Pocock skills',base]];if(url!==base)pairs.push([name,url]);return pairs}
function structured(name,description,url,type='Article'){
 const items=breadcrumbs(name,url);
 return {'@context':'https://schema.org','@graph':[{'@type':type,'@id':origin+url+'#edition',url:origin+url,name,headline:name,description,inLanguage:'en',datePublished:date,dateModified:date,publisher:{'@type':'Person',name:'Petre Laskov',url:origin+'/'},isBasedOn:{'@type':'CreativeWork',name:'Matt Pocock skills',url:source,author:{'@type':'Person',name:'Matt Pocock'}},...(url!==base?{isPartOf:{'@type':'CreativeWork',name:'Matt Pocock skills — full study edition',url:origin+base}}:{}),creativeWorkStatus:'AI-generated study edition with inspectable development evaluation'}, {'@type':'BreadcrumbList',itemListElement:items.map(([name,p],i)=>({'@type':'ListItem',position:i+1,name,item:origin+p}))}]};
}
const jsonld=obj=>'<script type="application/ld+json">'+JSON.stringify(obj).replaceAll('<','\\u003c')+'</script>';
function metadata(name,description,url,type='Article'){return '<title>'+esc(name)+' — Petre Laskov</title><meta name="description" content="'+esc(description)+'"><link rel="canonical" href="'+origin+url+'"><meta property="og:type" content="'+(type==='Article'?'article':'website')+'"><meta property="og:title" content="'+esc(name)+'"><meta property="og:description" content="'+esc(description)+'"><meta property="og:url" content="'+origin+url+'"><meta property="og:site_name" content="Petre Laskov"><meta name="twitter:card" content="summary">'+jsonld(structured(name,description,url,type))}
const css='body{margin:0;background:#f7f5ef;color:#202727;font:17px/1.75 system-ui,sans-serif}a{color:#145b77;text-underline-offset:3px}header,main,footer{width:min(900px,calc(100% - 40px));margin:auto}header{padding:28px 0;border-bottom:1px solid #d7ddd4}nav{font-size:14px;line-height:1.8}nav a{margin-right:10px}main{padding:32px 0 60px}h1{font:700 clamp(27px,5vw,40px)/1.2 Georgia,serif;overflow-wrap:anywhere}h2{font:700 27px/1.3 Georgia,serif;margin-top:40px}h3{font-size:21px}p,li{overflow-wrap:anywhere}li{margin:10px 0}.meta{font-size:13px;color:#52615b}.material-links{padding:16px 0;border-block:1px solid #d7ddd4;margin:25px 0}.material-links a{display:inline-block;margin:3px 16px 3px 0}code{font:14px/1.6 ui-monospace,Consolas,monospace;overflow-wrap:anywhere}pre{padding:18px;background:#eef0e9;border:1px solid #d7ddd4;overflow:auto}pre code{white-space:pre;overflow-wrap:normal}table{display:block;overflow:auto;border-collapse:collapse;font-size:14px}td,th{padding:9px;border:1px solid #d7ddd4;vertical-align:top}details{padding:14px;border:1px solid #d7ddd4;margin:20px 0}summary{cursor:pointer;font-weight:650;overflow-wrap:anywhere}blockquote{margin:24px 0;border-left:3px solid #205c4a;padding-left:20px}footer{padding:25px 0;font-size:13px;border-top:1px solid #d7ddd4}.chapter-list{padding-left:24px}.chapter-list p{margin:3px 0 20px;color:#52615b;font-size:15px}a:focus-visible{outline:3px solid #b5722e;outline-offset:4px}.skip{position:absolute;top:-100px}.skip:focus{top:0;background:white;padding:10px}img{max-width:100%}';
function shell(name,description,url,body,type='Article'){
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+metadata(name,description,url,type)+'<style>'+css+'</style></head><body><a class="skip" href="#main">Skip to content</a><header><nav aria-label="Breadcrumb">'+breadcrumbs(name,url).map(([n,p])=>'<a href="'+p+'">'+esc(n)+'</a>').join(' / ')+'</nav><p class="meta">'+esc(publication)+' Published <time datetime="'+date+'">29 September 2026</time>.</p></header><main id="main">'+body+'</main><footer><a href="'+base+'">Full interactive reader</a> · <a href="'+base+'chapters/">All 38 chapters</a> · <a href="'+base+'evaluation/">Evaluation method and results</a> · <a href="'+base+'LICENSE-MATT-POCOCK.txt">Source license</a> · <a href="'+base+'PUBLICATION.md">Publication details</a></footer></body></html>';
}
function write(url,html){const dest=path.join(site,'public',url,'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);route(url)}
for(const s of data.reader){
 const url=chapterPath(s);
 const materials='<nav class="material-links" aria-label="Chapter materials"><a href="'+base+'#'+s.slug+'/chapter">Open in the full reader</a><a href="'+base+'chapters/'+s.slug+'.md">Chapter Markdown</a><a href="'+base+'diffs/'+s.slug+'.diff">Exact package diff</a><a href="'+base+'evals/'+s.slug+'.md">Evaluation record</a></nav>';
 const instructions=html=>links(html).replace(/<h1>/g,'<h3>').replace(/<\/h1>/g,'</h3>');
 const body=materials+links(s.panels.chapter)+'<section><h2>Complete proposed refactor</h2>'+instructions(s.panels.refactor)+'</section><section><h2>Complete original proposal: '+esc(s.original_slug)+'</h2>'+instructions(s.panels.original)+'</section>'+materials;
 write(url,shell(title(s),desc(s),url,body));
}
const chapterIndex='<h1>Matt Pocock skills: all 38 study chapters</h1><p>For people designing agent skills, studying human–AI collaboration, or comparing instructions against evaluation evidence. Each chapter explains the original mechanism, questions its assumptions, proposes a refactor, and develops another skill.</p><p><a href="'+base+'">Use the full interactive reader</a> to compare source, refactor, diff, original proposal and evaluation side by side. These individual pages preserve the same chapter material and can be read without JavaScript.</p><ol class="chapter-list">'+data.reader.map(s=>'<li><a href="'+chapterPath(s)+'">'+esc(s.slug)+'</a><p>'+esc(s.summary)+' Original proposal: '+esc(s.original_slug)+'.</p></li>').join('')+'</ol>';
write(base+'chapters/',shell('Matt Pocock skills: chapter index','A complete index of 38 agent-skill studies, including writing-for-agents, grilling, TDD, code review, research and handoffs.',base+'chapters/',chapterIndex,'CollectionPage'));
const method='<h1>How the 38 agent skills were evaluated</h1><p>The development study retained 342 responses across 114 prompts. Refactors tied the source in 36 skill groups and scored lower in two. A strong no-skill control limits what can be credited to the skills. This is inspectable development evidence, not proof of general collaboration gains.</p>'+links(data.method).replace(/<h1>/g,'<h2>').replace(/<\/h1>/g,'</h2>');
write(base+'evaluation/',shell('Agent skill evaluation: methods, results and limitations','Read the protocols, 342-response comparison, source and control results, independent AI reviews, versioned repairs and limitations.',base+'evaluation/',method));
const nav='<nav aria-label="Breadcrumb" class="publication-nav"><a href="/">Petre Laskov</a><span> / </span><a href="/knowledge/">The Knowledge Project</a><span> / </span><a href="/knowledge/ai-resources/">AI Resources</a></nav>';
const credit='<p class="publication-credit">'+esc(publication)+' <a href="'+base+'chapters/">Browse all chapters</a> · <a href="'+base+'evaluation/">Evaluation method &amp; results</a> · <a href="'+base+'COMPENDIUM.md" download>Markdown edition</a> · <a href="'+base+'LICENSE-MATT-POCOCK.txt">MIT license</a></p>';
const head=metadata('Matt Pocock agent skills — full study edition','38 agent skills explained and examined: commentary, refactors, exact diffs, original skill proposals and recorded development evaluations.',base,'CollectionPage').replace(/<title>[\s\S]*?<\/title>/,'');
let reader=original.replace('</head>',head+'<style>.publication-nav{display:block;font-size:13px;line-height:1.5;margin:0 0 15px;max-height:none;overflow:visible}.publication-credit{max-width:1100px;font-size:12px!important;line-height:1.6}#list>a{display:block;font-size:14px;padding:7px 9px}</style></head>').replace('<body><header>','<body><header>'+nav).replace('</header>',credit+'</header>');
// Initial HTML contains the same overview and real chapter links for readers without JS.
reader=reader.replace('<article class="content" id="content"></article>','<article class="content" id="content">'+links(data.intro).replace('<h1>','<h2>').replace('</h1>','</h2>')+'<p><a href="'+base+'chapters/">Browse all 38 complete chapters</a></p></article>');
reader=reader.replace('<nav id="list" aria-label="Skill chapters"></nav>','<nav id="list" aria-label="Skill chapters">'+data.reader.map(s=>'<a href="'+chapterPath(s)+'">'+s.number+'. '+esc(s.slug)+'</a>').join('')+'</nav>');
if(reader.match(/<script type="application\/json" id="data">([\s\S]*?)<\/script>/)[1]!==payload)throw Error('Reader data changed');
fs.writeFileSync(path.join(root,'index.html'),reader);route(base);
fs.writeFileSync(path.join(site,'content/additional-routes.json'),JSON.stringify(routeList,null,2)+'\n');
console.log('Prepared 38 complete static chapters, chapter index, evaluation page and crawlable reader.');
