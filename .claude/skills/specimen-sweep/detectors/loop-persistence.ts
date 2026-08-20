// data-loop="keep" candidates: demos the attract loop could keep mounted across
// iterations (devtools inspection survives, ambient state persists) but that must
// declare it because their scripts send input. Flags choreographies whose steps
// are only moveTo/wait/assert (hover is the only input, the likeliest to be
// symmetric) plus any script whose demo already ends visibly at rest is the
// judge's to add. Reports whether the demo arms its clock (phase-locked demos
// are declared only when their script does not time against the cycle).
// Run from the repo root: bun .claude/skills/specimen-sweep/detectors/loop-persistence.ts
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DEMOS = 'src/content/demos';
const INPUT = /moveTo|click:|drag:|press:|hold:|holdKey|type:|scroll:|wheel:|pinch:|withKey|rightClick|middleClick|dblclick/;
const HOVER_ONLY = /moveTo/g;
let flagged = 0;
for (const slug of readdirSync(DEMOS).sort()) {
  let demo: string;
  let script: string;
  try {
    demo = readFileSync(join(DEMOS, slug, 'demo.ts'), 'utf8');
    script = readFileSync(join(DEMOS, slug, 'choreography.ts'), 'utf8');
  } catch {
    continue;
  }
  if (demo.includes('data-loop')) continue;
  if (!INPUT.test(script)) continue; // pure wait/assert: persists automatically, nothing to declare
  if (INPUT.test(script.replace(HOVER_ONLY, ''))) continue; // more than hover: judged case by case, not here
  flagged++;
  console.log(`${slug}\thover-only script; clock ${demo.includes('clock.') ? 'ARMED (declare only if script is phase-free)' : 'unused'}`);
}
console.error(`\n${flagged} flagged`);
