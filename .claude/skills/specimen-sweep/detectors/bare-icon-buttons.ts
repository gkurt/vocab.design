import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * bare-icon-buttons detector (recall-tuned; see COMPLAINTS.md). `.sp-icon` is
 * display: block, so an icon interpolated bare into a non-flex `.sp-button`
 * breaks its label onto a second line (light-dismiss shipped this way). Flags
 * buttons whose tag does not state a flex display yet whose content starts with
 * an icon call followed by more content. Buttons that are icon-only, or that
 * wrap the icon in a flex span, do not flag.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/bare-icon-buttons.ts`
 */
const BUTTON = /<button\b([^>]*)>\s*(\$\{icon\([^)]*\)\}\s*[^<\s][^<]*)/g;

const demos = 'src/content/demos';
let specimens = 0;
let flagged = 0;
for (const slug of readdirSync(demos).sort()) {
  let demo: string;
  try {
    demo = readFileSync(join(demos, slug, 'demo.ts'), 'utf8');
  } catch {
    continue;
  }
  specimens++;
  const hits: string[] = [];
  for (const m of demo.matchAll(BUTTON)) {
    const attrs = m[1] ?? '';
    if (/display:\s*(inline-)?flex/.test(attrs)) continue;
    hits.push((m[2] ?? '').replace(/\s+/g, ' ').slice(0, 60));
  }
  if (!hits.length) continue;
  flagged++;
  console.log(`${slug}\t${hits.join(' · ')}`);
}
console.error(`\n${flagged}/${specimens} specimens flagged`);
