import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const site=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(site,'..');
const output=path.join(root,'public');
const fresh=path.join(site,'dist');
if(!fs.existsSync(path.join(output,'index.html')))throw Error('Build the existing Quartz archive first.');
if(!fs.existsSync(path.join(fresh,'index.html')))throw Error('Build the new site first.');
const before=fs.readdirSync(output,{recursive:true}).filter(p=>fs.statSync(path.join(output,p)).isFile());
const oldMap=fs.readFileSync(path.join(output,'sitemap.xml'),'utf8');
const newMap=fs.readFileSync(path.join(fresh,'sitemap.xml'),'utf8');
if(fs.readFileSync(path.join(fresh,'index.html'),'utf8').includes('noindex'))throw Error('Production build required.');
fs.cpSync(fresh,output,{recursive:true});
// Quartz emitted /about.html; keep extensionless legacy URLs on the new pages.
for(const route of ['about','wisdom','knowledge','art']){
 fs.copyFileSync(path.join(fresh,route,'index.html'),path.join(output,route+'.html'));
}
// Retain discovery of existing published work alongside the new navigation.
const urls=new Map();
for(const xml of [oldMap,newMap])for(const match of xml.matchAll(/<url>[\s\S]*?<\/url>/g)){
 const loc=match[0].match(/<loc>([\s\S]*?)<\/loc>/)?.[1];
 if(loc)urls.set(loc,match[0]);
}
fs.writeFileSync(path.join(output,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...urls.values()].join('')+'</urlset>');
for(const file of before)if(!fs.existsSync(path.join(output,file)))throw Error('Existing public URL lost: '+file);
for(const forbidden of ['private','raw','content/site.json','CURRENT_STATE.md'])if(fs.existsSync(path.join(output,forbidden)))throw Error('Non-public material in output: '+forbidden);
const rev=process.env.GITHUB_SHA;
if(rev)fs.writeFileSync(path.join(output,'version.json'),JSON.stringify({commit:rev})+'\n');
console.log('Prepared Pages: '+before.length+' existing files retained; new home and four areas installed; '+urls.size+' sitemap entries.');
