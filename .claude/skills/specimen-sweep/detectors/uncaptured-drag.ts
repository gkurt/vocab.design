import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * uncaptured-drag detector (recall-tuned; see COMPLAINTS.md). A demo that wires a
 * raw pointer drag (down + move + up) without setPointerCapture loses the drag
 * the moment a real reader's pointer leaves the element: moves stop arriving and
 * the release lands elsewhere, so takeover breaks while the choreography (which
 * dispatches directly on the element) keeps passing. Flags demo.ts files carrying
 * the drag triple with no capture call. Hover trackers (move only) and press
 * holds via pressureHold (no raw move listener) do not flag; a judge or the fixer
 * filters demos whose pointermove is not a held drag.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/uncaptured-drag.ts`
 */
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
  if (demo.includes('setPointerCapture')) continue;
  const wires = (type: string) => new RegExp(`addEventListener\\(\\s*'${type}'`).test(demo);
  if (!wires('pointerdown') || !wires('pointermove')) continue;
  if (!wires('pointerup') && !wires('pointercancel')) continue;
  flagged++;
  console.log(`${slug}\tdown+move+up wired, no capture`);
}
console.error(`\n${flagged}/${specimens} specimens flagged`);
