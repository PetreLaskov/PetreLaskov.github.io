import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','dist');
const files=fs.readdirSync(root,{recursive:true}).filter(p=>p.endsWith('.html'));
let links=0;
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error('Expected one page heading: '+file);
 if(/C:[\\/]|OneDrive|CODEX OSs|_SNAPSHOT_NOTICE|REPLACE_ME/.test(html))throw Error('Internal material found: '+file);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=match[1];if(ref.startsWith('data:')||ref.startsWith('mailto:')||/^https:\/\//.test(ref))continue;
  const [url,hash]=ref.split('#');
  const target=url?path.join(root,url.endsWith('/')?url+'index.html':url):path.join(root,file);
  if(!fs.existsSync(target))throw Error('Broken link in '+file+': '+ref);
  if(hash&&!fs.readFileSync(target,'utf8').includes('id="'+hash+'"'))throw Error('Missing anchor '+ref);
  links++;
 }
}
console.log('Checked '+files.length+' pages and '+links+' local links/assets. No broken targets or internal paths.');
