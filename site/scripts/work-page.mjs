// Bounded professional entrance. Source wording is maintained in content/work.json.
export function renderWorkPage(w,{esc,safeUrl}) {
 const text=(v,label)=>{if(typeof v!=="string"||!v.trim())throw Error('Missing Work text: '+label);return esc(v)};
 const paras=(values,label)=>{if(!Array.isArray(values)||!values.length)throw Error('Missing Work paragraphs: '+label);return values.map(v=>'<p>'+text(v,label)+'</p>').join('')};
 if(w.title!=='Work'||!Array.isArray(w.cases)||!w.cases.length)throw Error('Invalid Work page');
 const cases=w.cases.map((c,i)=>{
  if((c.url===null)!==(c.label===null))throw Error('Work case needs both link label and URL');
  return '<section class="work-case" aria-labelledby="case-'+i+'"><h3 id="case-'+i+'">'+text(c.title,'case title')+'</h3>'+paras(c.body,'case body')+(c.url?'<p><a href="'+safeUrl(c.url)+'">'+text(c.label,'case link')+'</a></p>':'')+'</section>';
 }).join('');
 const menu='<nav class="gallery-nav work-sections" aria-label="Work sections"><a href="#selected-work">Selected work</a><a href="#writing-and-visual-work">Writing and visual work</a><a href="#collaboration">Work to pursue together</a></nav>';
 return '<article class="essay work-page"><div class="page-head"><h1>'+text(w.title,'title')+'</h1><p>'+text(w.deck,'deck')+'</p></div>'+menu+'<div class="prose">'+paras(w.opening,'opening')+'<p>'+text(w.aspiration,'aspiration')+'</p><section id="selected-work" aria-labelledby="selected-work-heading"><h2 id="selected-work-heading">Selected work</h2>'+cases+'<p>'+text(w.supporting,'supporting')+' <a href="'+safeUrl(w.supporting_url)+'">Read Personal AI OS</a>.</p></section><section id="writing-and-visual-work" aria-labelledby="creative-heading"><h2 id="creative-heading">Writing and visual work</h2><p>'+text(w.creative,'creative')+'</p><p><a href="/writing/">Writing</a> · <a href="/art/">Art</a></p></section><section id="collaboration" aria-labelledby="collaboration-heading"><h2 id="collaboration-heading">Work to pursue together</h2>'+paras(w.invitation,'invitation')+'<p><a href="'+safeUrl(w.contact_url)+'">'+text(w.contact_label,'contact label')+'</a></p></section></div></article>';
}
