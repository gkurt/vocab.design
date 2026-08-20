// Replay-run collisions: a demo that autoplays a run on mount AND offers a
// replay-style control invites the script to cut the mount run mid-flight (the
// mover teleports to zero under the reader's eye). Flags every demo with a
// replay-named part and reports whether mount also starts the same run, which
// is the collision-prone shape. Recall-tuned: the judge reads the choreography
// beside it and answers the timing question per slug.
// Run from the repo root: bun .claude/skills/specimen-sweep/detectors/replay-continuity.ts
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DEMOS = 'src/content/demos';
const CONTROL = /data-part="(replay|restart|again|run|play)"/;
let flagged = 0;
for (const slug of readdirSync(DEMOS).sort()) {
  let source: string;
  try {
    source = readFileSync(join(DEMOS, slug, 'demo.ts'), 'utf8');
  } catch {
    continue;
  }
  const control = source.match(CONTROL);
  if (!control) continue;
  // The handler the control fires, and whether mount calls it bare (autoplay).
  const wired = source.match(new RegExp(`part\\(root, '${control[1]}'\\)\\.addEventListener\\('click', (\\w+)\\)`));
  const handler = wired?.[1];
  const autoplays = handler ? new RegExp(`^\\s*(?:void )?${handler}\\(\\);?\\s*$`, 'm').test(source) : false;
  flagged++;
  console.log(`${slug}\treplay control '${control[1]}'; mount autoplay: ${handler ? (autoplays ? 'YES (collision-prone)' : 'no') : 'unresolved'}`);
}
console.error(`\n${flagged} flagged`);
