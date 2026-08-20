// Hover-driven demos that still demand a click to take over: flag demo.ts files
// with hover-response listeners (pointermove/pointerenter/pointerover) and no
// pointerdown listener of their own (a down listener usually means the moves are
// drag-gated, which is not hover-driven), that do not yet mark a surface
// data-hover-driven. data-gaze scopes are hover-driven implicitly and skipped.
// Recall-tuned: a judge decides whether hovering alone is the demo's interaction.
// Run from the repo root: bun .claude/skills/specimen-sweep/detectors/hover-takeover.ts
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DEMOS = 'src/content/demos';
let flagged = 0;
for (const slug of readdirSync(DEMOS).sort()) {
  let source: string;
  try {
    source = readFileSync(join(DEMOS, slug, 'demo.ts'), 'utf8');
  } catch {
    continue;
  }
  if (source.includes('data-hover-driven') || source.includes('data-gaze')) continue;
  const hover = source.match(/addEventListener\('(pointermove|pointerenter|pointerover|mousemove)'/g);
  if (!hover) continue;
  if (source.includes("addEventListener('pointerdown'") || source.includes('pressureHold(') || source.includes('pinchSpread(')) continue;
  flagged++;
  console.log(`${slug}\thover listeners: ${[...new Set(hover.map((m) => m.split("'")[1]))].join(', ')}; no pointerdown gate`);
}
console.error(`\n${flagged} flagged`);
