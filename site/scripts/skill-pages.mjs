import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import {toHtml} from 'hast-util-to-html';

// Render deliberately selected public SKILL.md editions as website articles.
export function renderSkillPages({root, page, esc, entries}) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype);
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.skill)) throw Error('Invalid skill slug');
    const route = '/knowledge/ai-resources/skills/' + entry.skill + '/';
    if (entry.url !== route) throw Error('Skill entry must link to its local reader');
    const source = fs.readFileSync(path.join(root, 'public', route, 'SKILL.md'), 'utf8');
    const parsed = matter(source);
    if (parsed.data.name !== entry.skill) throw Error('Skill metadata and route differ');
    const prefix = '# ' + entry.label + '\n\n';
    const body = parsed.content.replace(/\r\n/g, '\n').trimStart();
    if (!body.startsWith(prefix)) throw Error('Skill title differs from its catalog entry');
    const html = toHtml(processor.runSync(processor.parse(body.slice(prefix.length))));
    const sourceURL = 'https://github.com/PetreLaskov/petres-skills/blob/main/skills/' + entry.skill + '/SKILL.md';
    const intro = '<div class="page-head"><a class="back" href="/knowledge/ai-resources/">AI Resources</a><h1>' + esc(entry.label) + '</h1><p>' + esc(entry.summary) + '</p></div>';
    const links = '<section class="related"><h2>Use this skill</h2><p><a href="' + route + 'SKILL.md" download="SKILL.md">Download SKILL.md</a> · <a href="' + sourceURL + '">Source on GitHub</a></p></section>';
    page(route, entry.label + ' — ' + 'Petre Laskov', entry.summary, '<article class="essay">' + intro + '<div class="prose">' + html + links + '</div></article>', 'knowledge');
  }
}
