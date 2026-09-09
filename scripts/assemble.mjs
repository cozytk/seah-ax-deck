/* 전체판은 sections/ 원본만 조립한다. 뒤쪽 개발 흐름은 아래 ORDER에서 관리한다.
   summary.md는 같은 원본을 공유하되 0~2부의 기존 요약을 유지한다. */
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INTRO = ['0-head.md', '1-D.md', '1-E.md', '1-F.md', '1-G.md', '1-H.md', '1-I.md', '2-antigravity.md'];
const WORKFLOW = ['3-workflow.md', '3-design.md', '4-verify.md', '4-projects.md', '4-auto.md', '4-wrap.md'];
const sections = await Promise.all([...INTRO, ...WORKFLOW].map(async name => [name, (await fs.readFile(join(ROOT, 'sections', name), 'utf8')).trim()]));
const sources = new Map(sections);
const compose = names => names.map((name, i) => i ? sources.get(name).replace(/^---\n/, '') : sources.get(name)).join('\n\n---\n') + '\n';
await fs.writeFile(join(ROOT, 'slides.md'), compose([...INTRO, ...WORKFLOW]));
const summaryPath = join(ROOT, 'summary.md');
const summary = await fs.readFile(summaryPath, 'utf8');
const marker = '<!-- WORKFLOW_START -->';
// 기존 요약본의 0~2부는 최초 마이그레이션 때만 블록 경계로 추출한다.
const prefix = summary.includes(marker) ? summary.split(marker)[0].trimEnd() : summary.split(/\n---\n/).slice(0, 64).join('\n---\n').trimEnd();
await fs.writeFile(summaryPath, prefix + '\n\n' + marker + '\n\n' + compose(WORKFLOW));
console.log('slides.md 및 summary.md 조립 완료 · 개발 흐름 원본 ' + WORKFLOW.length + '개');
