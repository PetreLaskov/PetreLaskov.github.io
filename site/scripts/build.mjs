import './build-study-pages.mjs';
import fs from 'node:fs';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import {toHtml} from 'hast-util-to-html';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
const data=JSON.parse(fs.readFileSync(path.join(root,'content/site.json'),'utf8'));
const production=process.argv.includes('--production');
const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=v=>{if(typeof v!=='string'||!/^https:\/\//.test(v))throw Error('External links must use https: '+v);new URL(v);return esc(v)};
const resourceUrl=v=>{if(typeof v==='string'&&/^\/[a-zA-Z0-9/._-]*$/.test(v)&&!v.startsWith('//')&&!v.split('/').includes('..'))return esc(v);return safeUrl(v)};
const asset=v=>{if(!/^\/assets\/[a-zA-Z0-9_./-]+$/.test(v)||v.includes('..'))throw Error('Use /assets/ paths for local images');if(!fs.existsSync(path.join(root,'public',v)))throw Error('Missing image: '+v);return esc(v)};
const navItems=[...data.areas,{slug:'about',label:'About',number:'05',description:'Writing, art, and studies by Petre Laskov.'}];
if(data.areas.map(a=>a.slug).join(',')!=='writing,wisdom,knowledge,art')throw Error('Expected Writing, Wisdom, Knowledge, and Art.');
if(production&&!data.url)throw Error('Set the confirmed public site URL before a production build.');
const origin=data.url?new URL(data.url).origin:'';
if(origin&&!origin.startsWith('https://'))throw Error('Public site URL must use HTTPS.');
const routes=[];
// Only remove this generator's exact output directory; reject redirected targets.
if(path.relative(root,out)!=='dist'||(fs.existsSync(out)&&fs.lstatSync(out).isSymbolicLink()))throw Error('Unsafe output directory');
for(const area of data.areas)area.items=area.items.filter(item=>item.draft!==true);
const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="4" fill="#262925"/><text x="11" y="44" font-family="Georgia,serif" font-size="37" fill="#f7f7f2">p.</text></svg>';
function layout(title,description,route,body,active='',article=null){
const articleMeta=article?'<meta property="article:published_time" content="'+esc(article.date)+'"><script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:article.title,description,datePublished:article.date,author:{'@type':'Person',name:article.author||data.name},url:origin+route,mainEntityOfPage:origin+route}).replace(/</g,'\\u003c')+'</script>':'';
const nav=navItems.map(a=>'<a href="/'+a.slug+'/"'+(a.slug===active?' aria-current="page"':'')+'>'+esc(a.label)+'</a>').join('');
return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'</title><meta name="description" content="'+esc(description)+'"><meta name="author" content="'+esc(data.name)+'">'+(!production?'<meta name="robots" content="noindex,nofollow">':'')+(origin?'<link rel="canonical" href="'+origin+route+'">':'')+'<meta property="og:type" content="'+(article?'article':'website')+'"><meta property="og:url" content="'+esc(origin+route)+'">'+articleMeta+'<meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(description)+'"><link rel="icon" href="data:image/svg+xml,'+encodeURIComponent(icon)+'"><link rel="stylesheet" href="/styles.css"></head><body><a class="skip" href="#main">Skip to content</a><div class="shell"><header><a class="wordmark" href="/"'+(route==='/'?' aria-current="page"':'')+'>'+esc(data.name)+'</a><nav aria-label="Main navigation">'+nav+'</nav></header><main id="main" tabindex="-1">'+body+'</main><footer><p>© '+new Date().getFullYear()+' '+esc(data.name)+'</p><div class="footer-links"><a href="/">Home</a><a href="/about/">About</a></div></footer></div></body></html>';
}
function page(route,title,description,body,active='',article=null){
const file=route==='/404.html'?'404.html':route.slice(1)+'index.html';
fs.mkdirSync(path.dirname(path.join(out,file)),{recursive:true});
fs.writeFileSync(path.join(out,file),layout(title,description,route,body,active,article));
routes.push(route);
}
function head(area){return '<div class="page-head"><h1>'+esc(area.label)+'</h1><p>'+esc(area.description)+'</p></div>'}
function markdownBody(item){
 if(!/^writing\/[a-z0-9-]+\.md$/.test(item.markdown))throw Error('Invalid writing source');
 const source=fs.readFileSync(path.join(root,'content',item.markdown),'utf8').replace(/\r\n/g,'\n');
 const prefix='# '+item.title+'\n\n*'+item.subtitle+'*\n\n';
 if(!source.startsWith(prefix))throw Error('Essay title/subtitle must match the maintained manuscript');
 const processor=unified().use(remarkParse).use(remarkGfm).use(remarkRehype);
 return toHtml(processor.runSync(processor.parse(source.slice(prefix.length))));
}
function paragraphs(items=[]){return items.map(p=>'<p>'+esc(p)+'</p>').join('')}
function image(item){return item.image?'<figure class="artwork"'+((item.artId||item.slug)?' id="'+esc(item.artId||item.slug)+'"':'')+'><a href="'+asset(item.image)+'" aria-label="View full image: '+esc(item.displayTitle||item.title)+'"><img src="'+asset(item.image)+'" alt="'+esc(item.alt)+'" loading="lazy"'+(item.width?' width="'+Number(item.width)+'" height="'+Number(item.height)+'"':'')+'></a><figcaption><strong>'+esc(item.displayTitle||item.title)+'</strong>'+(item.description?'<span class="art-description">'+esc(item.description)+'</span>':'')+(item.credit?'<span>'+esc(item.credit)+'</span>':'')+'</figcaption></figure>':''}
function gallery(area){
 const menu='<nav class="gallery-nav" aria-label="Art collections">'+area.items.map(i=>'<a href="#'+i.slug+'">'+esc(i.title)+'</a>').join('')+'</nav>';
 return menu+area.items.map(item=>{
  const pics=[{...item,title:item.displayTitle,slug:item.artId},...(item.images||[])];
  return '<section class="gallery-section" id="'+item.slug+'"><div class="collection-heading"><h2><a href="/art/'+item.slug+'/">'+esc(item.title)+'</a></h2><p>'+esc(item.summary)+'</p></div><div class="gallery-grid">'+pics.map(pic=>'<figure><a href="/art/'+item.slug+'/#'+pic.slug+'" aria-label="Open '+esc(pic.title)+'"><img src="'+asset(pic.thumbnail||pic.image)+'" alt="'+esc(pic.alt)+'" loading="lazy" width="'+Number(pic.width)+'" height="'+Number(pic.height)+'"></a><figcaption><strong>'+esc(pic.title)+'</strong>'+(pic.description?'<span>'+esc(pic.description)+'</span>':'')+'</figcaption></figure>').join('')+'</div></section>';
 }).join('')+'<p class="gallery-credit">Created and curated by Petre Laskov in collaboration with AI. Open a collection to linger; click an image there for the full-size view.</p>';
}
const seen=new Set();
for(const area of data.areas){for(const item of area.items){
 if(!item.title||!item.summary||!item.slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug))throw Error('Each item needs title, summary, and a lowercase hyphenated slug');
 const key=area.slug+'/'+item.slug;if(seen.has(key))throw Error('Duplicate item '+key);seen.add(key);
 if(item.url&&(item.paragraphs?.length||item.sections?.length||item.markdown))throw Error('Choose an external edition or local text for '+key);
 if(!item.url&&!item.markdown&&!item.paragraphs?.length&&!item.sections?.length&&!item.image&&!item.images?.length)throw Error('Local items need text or artwork: '+key);
 if(item.images)for(const pic of item.images){if(!pic.alt||!pic.credit)throw Error('Each collection image needs alt text and credit');asset(pic.image)}
 if(item.image&&(!item.alt||!item.credit))throw Error('Artwork needs alt text and exact credit: '+key);
 if(item.links)for(const link of item.links){if(!link.label)throw Error('Resource links need a label');resourceUrl(link.url)}
 if(item.url)safeUrl(item.url);if(item.image)asset(item.image);
 if(item.date&&!/^\d{4}-\d{2}-\d{2}$/.test(item.date))throw Error('Use YYYY-MM-DD dates');
}}
for(const link of data.about.links)safeUrl(link.url);
if(data.about.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.about.email))throw Error('Invalid contact email');
if(fs.existsSync(out))fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'public'),out,{recursive:true});
const featured=data.home.featured.map(ref=>{
 const area=data.areas.find(a=>a.slug===ref.area);
 const item=area?.items.find(i=>i.slug===ref.slug);
 if(!item)throw Error('Missing selected work: '+ref.area+'/'+ref.slug);
 const url='/'+area.slug+'/'+item.slug+'/';
 return '<article class="selected-work"><div><p class="eyebrow">'+esc(item.kind||area.label)+'</p><h2><a href="'+url+'">'+esc(item.title)+'</a></h2><p class="selected-summary">'+esc(item.subtitle||item.summary)+'</p></div>'+(item.image?'<a class="selected-image" href="'+url+'" aria-label="View '+esc(item.title)+'"><img src="'+asset(item.thumbnail||item.image)+'" alt="'+esc(item.alt)+'" width="'+item.width+'" height="'+item.height+'"></a>':'')+'</article>';
}).join('');
page('/',data.name,data.description,'<section class="hero"><h1>'+esc(data.home.title)+'</h1></section><section class="selected-list" aria-label="Selected work">'+featured+'</section><nav class="explore-links" aria-label="Explore the site">'+navItems.map(a=>'<a href="/'+a.slug+'/">'+esc(a.label)+'</a>').join('')+'</nav>');
for(const area of data.areas){
 const list=area.items.map(item=>'<article class="work">'+(item.image?'<a href="'+(item.url?safeUrl(item.url):'/'+area.slug+'/'+item.slug+'/')+'"><img src="'+asset(item.image)+'" alt="'+esc(item.alt)+'" loading="lazy"></a>':'')+'<div class="meta">'+esc(item.kind||'')+(item.date?' · <time datetime="'+esc(item.date)+'">'+esc(item.date)+'</time>':'')+'</div><h2><a href="'+(item.url?safeUrl(item.url):'/'+area.slug+'/'+item.slug+'/')+'">'+esc(item.title)+'</a></h2><p>'+esc(item.summary)+'</p>'+(item.url?'<span class="meta">Read on '+esc(new URL(item.url).hostname.replace(/^www\./,''))+'</span>':'')+'</article>').join('');
 if(area.gallery)page('/'+area.slug+'/',area.label+' — '+data.name,area.description,head(area)+gallery(area),area.slug);
 else page('/'+area.slug+'/',area.label+' — '+data.name,area.description,head(area)+'<section class="section-body"><h2 class="eyebrow section-caption">'+(area.slug==='art'?'Collections':'Selected work')+'</h2><div class="work-list">'+(list||'<div class="empty"><p>'+esc(area.empty)+'</p></div>')+'</div></section>',area.slug);
 for(const item of area.items){if(item.url)continue;
 const route='/'+area.slug+'/'+item.slug+'/';
 if(item.markdown){
  const dateLabel=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(item.date+'T00:00:00Z'));
  const article='<article class="essay"><div class="page-head"><a class="back" href="/writing/">Writing</a><h1>'+esc(item.title)+'</h1><p>'+esc(item.subtitle)+'</p><div class="essay-byline">'+esc(item.author||data.name)+' · <time datetime="'+esc(item.date)+'">'+dateLabel+'</time></div></div><div class="prose">'+markdownBody(item)+'</div><p class="essay-credit">'+esc(item.assistance||'')+'</p></article>';
  page(route,item.browserTitle||item.title+' — '+data.name,item.description||item.summary,article,area.slug,item);
  continue;
 }
 const intro='<div class="page-head"><a class="back" href="/'+area.slug+'/">'+esc(area.label)+'</a><h1>'+esc(item.title)+'</h1><p>'+esc(item.summary)+'</p></div>';
 const meta=[item.kind,item.date,item.author||data.name,item.role,item.assistance].filter(Boolean).map(s=>'<p>'+esc(s)+'</p>').join('');
 const sections=(item.sections||[]).map(s=>'<section><h2>'+esc(s.heading)+'</h2>'+paragraphs(s.paragraphs)+'</section>').join('');
 const resources=item.links?.length?'<section class="related"><h2>'+esc(item.linksTitle||'Resources')+'</h2><ul>'+item.links.map(link=>'<li><a href="'+resourceUrl(link.url)+'">'+esc(link.label)+'</a>'+(link.summary?'<p>'+esc(link.summary)+'</p>':'')+'</li>').join('')+'</ul></section>':'';
 const sources=item.sources?.length?'<section class="related"><h2>Sources</h2><ul>'+item.sources.map(s=>'<li><a href="'+safeUrl(s.url)+'">'+esc(s.label)+'</a>'+(s.note?' — '+esc(s.note):'')+'</li>').join('')+'</ul></section>':'';
 page(route,item.title+' — '+data.name,item.summary,intro+image(item)+(item.images||[]).map(pic=>image({...pic,title:pic.title||item.title})).join('')+'<div class="article-layout"><aside class="meta" aria-label="Publication details">'+meta+'</aside><article class="prose">'+paragraphs(item.paragraphs)+sections+resources+sources+'</article></div>',area.slug);
 }
}
const about=navItems.at(-1);
const bio=paragraphs(data.about.paragraphs);
const work=data.about.professional.length?'<section class="side-section"><h2>Selected professional work</h2>'+paragraphs(data.about.professional)+'</section>':'';
const links=data.about.links.length?'<ul>'+data.about.links.map(l=>'<li><a href="'+safeUrl(l.url)+'">'+esc(l.label)+'</a></li>').join('')+'</ul>':'';
const contact=(data.about.email?'<p><a href="mailto:'+esc(data.about.email)+'">'+esc(data.about.email)+'</a></p>':'')+links;
page('/about/','About — '+data.name,about.description,'<div class="page-head"><h1>About</h1></div><div class="prose minimal-about">'+bio+work+contact+'</div>','about');
page('/404.html','Page not found — '+data.name,'This page could not be found.','<div class="not-found"><div class="eyebrow">404</div><h1>This page isn’t here.</h1><p><a href="/">Return home</a></p></div>');
fs.writeFileSync(path.join(out,'robots.txt'),production?'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
// Static editions are copied intact; include their reader entrances in discovery.
for(const area of data.areas)for(const item of area.items)for(const link of item.links||[]){if(link.url.startsWith('/')&&fs.existsSync(path.join(out,link.url,'index.html'))&&!routes.includes(link.url))routes.push(link.url)}
const staticRoutes=JSON.parse(fs.readFileSync(path.join(root,'content/additional-routes.json'),'utf8'));
for(const item of staticRoutes){if(!/^\/[a-z0-9/-]+\/$/.test(item.route)||!/^\d{4}-\d{2}-\d{2}$/.test(item.lastmod)||!fs.existsSync(path.join(out,item.route,'index.html')))throw Error('Invalid static study route');if(!routes.includes(item.route))routes.push(item.route)}
if(origin)fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.filter(r=>r!='/404.html').map(r=>'<url><loc>'+esc(origin+r)+'</loc>'+(staticRoutes.find(x=>x.route===r)?'<lastmod>'+staticRoutes.find(x=>x.route===r).lastmod+'</lastmod>':'')+'</url>').join('')+'</urlset>');
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('Built '+routes.length+' pages in dist/ ('+(production?'production':'private preview')+').');
