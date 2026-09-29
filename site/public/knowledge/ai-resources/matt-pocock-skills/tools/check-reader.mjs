import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);const {chromium}=require('/path/to/user-home/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root='.';
const out='/path/to/build-workspace';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--disable-gpu']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
page.setDefaultTimeout(6000);
const report={runtimeErrors:errors,chapters:0,panelChecks:0,search:{},mobile:{},internalLinks:{}};
try{
 await page.goto(pathToFileURL(path.join(root,'COMPENDIUM.html')).href);
 if(errors.length)throw new Error('Reader runtime error: '+errors.join('; '));
 report.title=await page.title();report.chapters=await page.locator('nav button[data-slug]').count();
 report.panelChecks=await page.evaluate(()=>{let count=0;const slugs=[...document.querySelectorAll('nav button[data-slug]')].map(b=>b.dataset.slug);for(const slug of slugs){document.querySelector('[data-slug="'+slug+'"]').click();for(let i=0;i<6;i++){document.querySelectorAll('#tabs button')[i].click();if(document.getElementById('content').textContent.trim().length<25)throw new Error('Empty panel '+slug+' '+i);count++;}}return count;});
 await page.locator('[data-slug="grilling"]').click();await page.screenshot({path:path.join(out,'compendium-chapter.png'),fullPage:false});
 await page.locator('a[href="refactored/grilling/SKILL.md"]').first().click();report.internalLinks.refactor=await page.evaluate(()=>location.hash==='#grilling/refactor');
 await page.locator('[data-slug="grill-me"]').click();await page.locator('a[href="original-skills/preference-probes/SKILL.md"]').first().click();report.internalLinks.original=await page.evaluate(()=>location.hash==='#grill-me/original');
 await page.locator('[data-slug="wizard"]').click();await page.locator('a[href="evals/wizard.md"]').first().click();report.internalLinks.evaluation=await page.evaluate(()=>location.hash==='#wizard/eval'&&document.getElementById('content').textContent.includes('14 executed regression'));
 await page.locator('#search').fill('reversible-bets');report.search.originalProposal=await page.locator('nav button').count();
 await page.locator('#search').fill('THIS-WILL-NOT-MATCH');report.search.empty=await page.locator('nav button').count();
 await page.locator('#search').fill('');
 await page.locator('#overview').click();await page.screenshot({path:path.join(out,'compendium-overview.png'),fullPage:false});
 for(const width of [390,360]){await page.setViewportSize({width,height:844});await page.locator('[data-slug="setup-ts-deep-modules"]').click();report.mobile[width]=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth}));}
 await page.screenshot({path:path.join(out,'compendium-mobile.png'),fullPage:false});
 report.pass=report.chapters===38&&report.panelChecks===228&&errors.length===0&&report.search.originalProposal===1&&report.search.empty===0&&Object.values(report.mobile).every(v=>!v.overflow)&&Object.values(report.internalLinks).every(Boolean);
 fs.writeFileSync(path.join(root,'reader-validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}catch(e){report.failure=e.message;fs.writeFileSync(path.join(root,'reader-validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));process.exitCode=1;}finally{await browser.close();}
