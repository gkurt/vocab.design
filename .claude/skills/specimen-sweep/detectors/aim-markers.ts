import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * aim-markers detector (recall-tuned; see COMPLAINTS.md). Flags demos that draw
 * visible stop-point markers for the choreography's pointer (hit-slop's dashed
 * aiming dots). Two signals, either flags:
 *   (a) the dashed-ring recipe: 'dashed' and a 50% border-radius within one
 *       style chunk of demo.ts (helpers count; template interpolation is fine);
 *   (b) the choreography aims moveTo at a part whose name smells like a marker
 *       (dot-, aim-, tap-, mark-, spot-, point-).
 * Legit dashed geometry (a slop region, marching ants, a drop zone) has neither
 * a circle recipe nor marker-named moveTo targets; the judge filters leftovers.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/aim-markers.ts`
 */
const MARKER_NAME = /^(dot|aim|tap|mark|spot|point)(-|$)/;

const demos = 'src/content/demos';
let specimens = 0;
let flagged = 0;
for (const slug of readdirSync(demos).sort()) {
  let demo: string;
  let script: string;
  try {
    demo = readFileSync(join(demos, slug, 'demo.ts'), 'utf8');
    script = readFileSync(join(demos, slug, 'choreography.ts'), 'utf8');
  } catch {
    continue;
  }
  specimens++;
  const notes: string[] = [];

  const styles = [...demo.matchAll(/style\s*=\s*"([^"]*)"/g)].map((m) => m[1]);
  const rings = styles.filter((s) => s.includes('dashed') && /border-radius:\s*50%/.test(s));
  if (rings.length) notes.push(`dashed-ring recipe x${rings.length}`);

  const aimed = [...script.matchAll(/moveTo:\s*(['"`])\[data-part=([\w-]+)\]\1/g)]
    .map((m) => m[2])
    .filter((name) => MARKER_NAME.test(name));
  if (aimed.length) notes.push(`marker-named moveTo targets: ${[...new Set(aimed)].join(', ')}`);

  if (!notes.length) continue;
  flagged++;
  console.log(`${slug}\t${notes.join(' · ')}`);
}
console.error(`\n${flagged}/${specimens} specimens flagged`);
