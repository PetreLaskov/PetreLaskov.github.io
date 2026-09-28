import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
const data=JSON.parse(fs.readFileSync(path.join(root,'content/site.json'),'utf8'));
const production=process.argv.includes('--production');
const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=v=>{if(typeof v!=='string'||!/^https:\/\//.test(v))throw Error('External links must use https: '+v);new URL(v);return esc(v)};
const asset=v=>{if(!/^\/assets\/[a-zA-Z0-9_./-]+$/.test(v)||v.includes('..'))throw Error('Use /assets/ paths for local images');if(!fs.existsSync(path.join(root,'public',v)))throw Error('Missing image: '+v);return esc(v)};
const navItems=[...data.areas,{slug:'about',label:'About',number:'04',description:'A personal introduction, professional background, and ways to connect.'}];
if(data.areas.map(a=>a.slug).join(',')!=='wisdom,knowledge,art')throw Error('Keep the four agreed navigation areas.');
if(production&&!data.url)throw Error('Set the confirmed public site URL before a production build.');
const origin=data.url?new URL(data.url).origin:'';
if(origin&&!origin.startsWith('https://'))throw Error('Public site URL must use HTTPS.');
const routes=[];
// Only remove this generator's exact output directory; reject redirected targets.
if(path.relative(root,out)!=='dist'||(fs.existsSync(out)&&fs.lstatSync(out).isSymbolicLink()))throw Error('Unsafe output directory');
for(const area of data.areas)area.items=area.items.filter(item=>item.draft!==true);
const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="4" fill="#262925"/><text x="11" y="44" font-family="Georgia,serif" font-size="37" fill="#f7f7f2">p.</text></svg>';
function layout(title,description,route,body,active=''){
const nav=navItems.map(a=>'<a href="/'+a.slug+'/"'+(a.slug===active?' aria-current="page"':'')+'>'+esc(a.label)+'</a>').join('');
return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title><meta name="description" content="'+esc(description)+'"><meta name="author" content="'+esc(data.name)+'">'+(!production?'<meta name="robots" content="noindex,nofollow">':'')+(origin?'<link rel="canonical" href="'+origin+route+'">':'')+'<meta property="og:type" content="website"><meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(description)+'"><link rel="icon" href="data:image/svg+xml,'+encodeURIComponent(icon)+'"><link rel="stylesheet" href="/styles.css"></head><body><a class="skip" href="#main">Skip to content</a><div class="shell"><header><a class="wordmark" href="/"'+(route==='/'?' aria-current="page"':'')+'>'+esc(data.name)+'</a><nav aria-label="Main navigation">'+nav+'</nav></header><main id="main" tabindex="-1">'+body+'</main><footer><p>© '+new Date().getFullYear()+' '+esc(data.name)+'</p><div class="footer-links"><a href="/">Home</a><a href="/about/">About &amp; contact</a></div></footer></div></body></html>';
}
function page(route,title,description,body,active=''){
const file=route==='/404.html'?'404.html':route.slice(1)+'index.html';
fs.mkdirSync(path.dirname(path.join(out,file)),{recursive:true});
fs.writeFileSync(path.join(out,file),layout(title,description,route,body,active));
routes.push(route);
}
function head(area){return '<div class="page-head"><div class="eyebrow">'+area.number+' / '+esc(data.name)+'</div><h1>'+esc(area.label)+'</h1><p>'+esc(area.description)+'</p></div>'}
function paragraphs(items=[]){return items.map(p=>'<p>'+esc(p)+'</p>').join('')}
function image(item){return item.image?'<figure class="artwork"><a href="'+asset(item.image)+'" aria-label="View full image: '+esc(item.title)+'"><img src="'+asset(item.image)+'" alt="'+esc(item.alt)+'" loading="lazy"></a>'+(item.credit?'<figcaption>'+esc(item.credit)+'</figcaption>':'')+'</figure>':''}
const seen=new Set();
for(const area of data.areas){for(const item of area.items){
 if(!item.title||!item.summary||!item.slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug))throw Error('Each item needs title, summary, and a lowercase hyphenated slug');
 const key=area.slug+'/'+item.slug;if(seen.has(key))throw Error('Duplicate item '+key);seen.add(key);
 if(item.url&&(item.paragraphs?.length||item.sections?.length))throw Error('Choose an external edition or local text for '+key);
 if(!item.url&&!item.paragraphs?.length&&!item.sections?.length&&!item.image&&!item.images?.length)throw Error('Local items need text or artwork: '+key);
 if(item.images)for(const pic of item.images){if(!pic.alt||!pic.credit)throw Error('Each collection image needs alt text and credit');asset(pic.image)}
 if(item.image&&(!item.alt||!item.credit))throw Error('Artwork needs alt text and exact credit: '+key);
 if(item.url)safeUrl(item.url);if(item.image)asset(item.image);
 if(item.date&&!/^\d{4}-\d{2}-\d{2}$/.test(item.date))throw Error('Use YYYY-MM-DD dates');
}}
for(const link of data.about.links)safeUrl(link.url);
if(data.about.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.about.email))throw Error('Invalid contact email');
if(fs.existsSync(out))fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'public'),out,{recursive:true});
page('/',data.name,data.description,'<section class="hero"><div class="eyebrow">A personal home</div><h1>'+esc(data.home.title).replace('imagination.','<em>imagination.</em>')+'</h1><p class="intro">'+esc(data.home.intro)+'</p></section><section class="home-layout" aria-labelledby="explore"><h2 class="eyebrow section-caption" id="explore">Explore</h2><div>'+navItems.map(a=>'<a class="area-link" href="/'+a.slug+'/"><span class="area-number" aria-hidden="true">'+a.number+'</span><div><h2>'+esc(a.label)+'</h2><p>'+esc(a.description)+'</p></div><span class="area-arrow" aria-hidden="true">↗</span></a>').join('')+'</div></section>');
for(const area of data.areas){
 const list=area.items.map(item=>'<article class="work">'+(item.image?'<a href="'+(item.url?safeUrl(item.url):'/'+area.slug+'/'+item.slug+'/')+'"><img src="'+asset(item.image)+'" alt="'+esc(item.alt)+'" loading="lazy"></a>':'')+'<div class="meta">'+esc(item.kind||'')+(item.date?' · <time datetime="'+esc(item.date)+'">'+esc(item.date)+'</time>':'')+'</div><h2><a href="'+(item.url?safeUrl(item.url):'/'+area.slug+'/'+item.slug+'/')+'">'+esc(item.title)+'</a></h2><p>'+esc(item.summary)+'</p>'+(item.url?'<span class="meta">Read on '+esc(new URL(item.url).hostname.replace(/^www\./,''))+'</span>':'')+'</article>').join('');
 page('/'+area.slug+'/',area.label+' — '+data.name,area.description,head(area)+'<section class="section-body"><h2 class="eyebrow section-caption">'+(area.slug==='art'?'Collections':'Selected work')+'</h2><div class="work-list">'+(list||'<div class="empty"><div class="empty-rule" aria-hidden="true"></div><h2>Room for what’s to come.</h2><p>'+esc(area.empty)+'</p></div>')+'</div></section>',area.slug);
 for(const item of area.items){if(item.url)continue;
 const route='/'+area.slug+'/'+item.slug+'/';
 const intro='<div class="page-head"><a class="back" href="/'+area.slug+'/">'+esc(area.label)+'</a><h1>'+esc(item.title)+'</h1><p>'+esc(item.summary)+'</p></div>';
 const meta=[item.kind,item.date,item.author||data.name,item.role,item.assistance].filter(Boolean).map(s=>'<p>'+esc(s)+'</p>').join('');
 const sections=(item.sections||[]).map(s=>'<section><h2>'+esc(s.heading)+'</h2>'+paragraphs(s.paragraphs)+'</section>').join('');
 const sources=item.sources?.length?'<section class="related"><h2>Sources</h2><ul>'+item.sources.map(s=>'<li><a href="'+safeUrl(s.url)+'">'+esc(s.label)+'</a>'+(s.note?' — '+esc(s.note):'')+'</li>').join('')+'</ul></section>':'';
 page(route,item.title+' — '+data.name,item.summary,intro+image(item)+(item.images||[]).map(pic=>image({...pic,title:item.title})).join('')+'<div class="article-layout"><aside class="meta" aria-label="Publication details">'+meta+'</aside><article class="prose">'+paragraphs(item.paragraphs)+sections+sources+'</article></div>',area.slug);
 }
}
const about=navItems.at(-1);
const bio=data.about.paragraphs.length?paragraphs(data.about.paragraphs):'<div class="empty"><div class="empty-rule" aria-hidden="true"></div><h2>An introduction, in time.</h2><p>A little about me and the work behind this site will live here.</p></div>';
const work=data.about.professional.length?data.about.professional.map(p=>'<p>'+esc(p)+'</p>').join(''):'<p>Background and selected professional work will be added here.</p>';
const links=data.about.links.length?'<ul>'+data.about.links.map(l=>'<li><a href="'+safeUrl(l.url)+'">'+esc(l.label)+'</a></li>').join('')+'</ul>':'';
if(data.about.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.about.email))throw Error('Invalid contact email');
const contact=(data.about.email?'<p><a href="mailto:'+esc(data.about.email)+'">'+esc(data.about.email)+'</a></p>':'')+links;
page('/about/','About — '+data.name,about.description,head(about)+'<div class="about-layout"><div class="prose">'+bio+'</div><aside><section class="side-section"><h2>Professional background</h2>'+work+'</section><section class="side-section"><h2>Elsewhere &amp; contact</h2>'+(contact||'<p>Links and a way to get in touch will be added here.</p>')+'</section></aside></div>','about');
page('/404.html','Page not found — '+data.name,'This page could not be found.','<div class="not-found"><div class="eyebrow">404</div><h1>This page isn’t here.</h1><p><a href="/">Return home</a></p></div>');
fs.writeFileSync(path.join(out,'robots.txt'),production?'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
if(origin)fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.filter(r=>r!='/404.html').map(r=>'<url><loc>'+esc(origin+r)+'</loc></url>').join('')+'</urlset>');
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('Built '+routes.length+' pages in dist/ ('+(production?'production':'private preview')+').');
