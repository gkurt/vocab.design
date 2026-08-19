import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * fake-touch detector (recall-tuned; see COMPLAINTS.md). Finds specimens whose
 * TERM is touch-flavored but whose demonstration never performs the gesture:
 * the choreography picks states from controls (segmented tabs, force-level
 * buttons) or merely clicks, because the stage does not yet speak touch.
 * Evidence classifies each hit: 'state-picked' (no drag steps at all) is the
 * prime offender class; 'drag-based' performs a mouse-drawn approximation and
 * may only need the touch graphic once the machinery lands.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/fake-touch.ts`
 */
const TOUCH =
  /\btouch|swipe|pinch|gesture|long.?press|force.?touch|3d.?touch|haptic|fling|pull.to.refresh|momentum|overscroll|rubber.?band|edge.?swipe|multi.?touch|press.?and.?hold\b/i;

const demos = 'src/content/demos';
let flagged = 0;
for (const slug of readdirSync(demos).sort()) {
  let term: string;
  let script: string;
  try {
    term = readFileSync(join(demos, '..', 'terms', `${slug}.mdx`), 'utf8');
    script = readFileSync(join(demos, slug, 'choreography.ts'), 'utf8');
  } catch {
    continue;
  }
  // Judge the term by what it IS (frontmatter), not by prose that merely mentions touch.
  const frontmatter = term.slice(0, term.indexOf('\n---', 3));
  if (!TOUCH.test(slug) && !TOUCH.test(frontmatter)) continue;
  const drags = [...script.matchAll(/\bdrag:/g)].length;
  const picks = [...script.matchAll(/moveTo:\s*(['"`])\[data-part=((?:seg|mode|force|state|tab)-[\w-]+)\]\1/g)].map((m) => m[2]);
  const evidence = drags
    ? `drag-based (${drags} drags${picks.length ? `, also picks ${[...new Set(picks)].join(', ')}` : ''})`
    : `state-picked${picks.length ? ` via ${[...new Set(picks)].join(', ')}` : ' (clicks only, no gesture steps)'}`;
  flagged++;
  console.log(`${slug}\t${evidence}`);
}
console.error(`\n${flagged} touch-flavored specimens flagged`);
