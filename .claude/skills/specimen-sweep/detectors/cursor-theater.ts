import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * cursor-theater detector (recall-tuned; see COMPLAINTS.md entry).
 * Flags moveTo steps with no input step and no assert before the next moveTo or
 * end of script: a hover nothing responds to and nothing checks. Scripts with no
 * input steps at all are marked pure hover tours, the prime offenders.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/cursor-theater.ts`
 */
const KIND = /\{\s*(moveTo|click|dblclick|rightClick|middleClick|drag|press|type|scroll|wait|assert)\b/g;
const INPUT = new Set(['click', 'dblclick', 'rightClick', 'middleClick', 'drag', 'press', 'type', 'scroll']);

const demos = 'src/content/demos';
let specimens = 0;
let flagged = 0;
for (const slug of readdirSync(demos).sort()) {
  let src: string;
  try {
    src = readFileSync(join(demos, slug, 'choreography.ts'), 'utf8');
  } catch {
    continue;
  }
  specimens++;
  const steps = [...src.matchAll(KIND)].map((m) => ({ kind: m[1], at: m.index ?? 0 }));
  const hoverOnly: string[] = [];
  let inputs = 0;
  for (let i = 0; i < steps.length; i++) {
    if (INPUT.has(steps[i].kind)) inputs++;
    if (steps[i].kind !== 'moveTo') continue;
    let consequential = false;
    for (let j = i + 1; j < steps.length && steps[j].kind !== 'moveTo'; j++) {
      if (INPUT.has(steps[j].kind) || steps[j].kind === 'assert') consequential = true;
    }
    if (consequential) continue;
    const sel = src.slice(steps[i].at).match(/moveTo:\s*(['"`])(.*?)\1/);
    hoverOnly.push(sel?.[2] ?? '(unparsed selector)');
  }
  if (!hoverOnly.length) continue;
  flagged++;
  const tour = inputs === 0 ? 'PURE HOVER TOUR · ' : '';
  console.log(`${slug}\t${tour}hover-only moveTo: ${hoverOnly.join(', ')}`);
}
console.error(`\n${flagged}/${specimens} specimens flagged`);
