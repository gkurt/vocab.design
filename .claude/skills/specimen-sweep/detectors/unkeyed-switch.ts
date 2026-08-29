// Comparison switches with no key: an `<sp-segmented>` carrying no `data-axis`, so its
// segments are the values of something the reader is never told (SPEC §5.1). Also reports
// the state `data-pose` already calls the term, which is the `data-term` the control
// should be marking. Deterministic, not recall-tuned: the absence of an attribute is not
// a guess. What a fixer still has to decide is the axis WORDING, and whether a switch
// with an ambiguous or absent pose has a term state at all (a variant or a parameter
// switch has none, and must not be given one).
// Run from the repo root: bun .claude/skills/specimen-sweep/detectors/unkeyed-switch.ts
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DEMOS = 'src/content/demos';
const COMMENTS = /\/\*[\s\S]*?\*\/|^\s*\/\/[^\n]*$/gm;
// The OPENING TAG is what carries data-axis, and it is the only thing guaranteed to be
// written literally: a demo may build its segments in a `.map()`, in which case there is
// no literal `value=` anywhere and a detector keyed on the closing tag or on the segments
// finds nothing. Matching the element instead of its contents is what makes this
// deterministic rather than merely usually right.
const OPEN_TAG = /<sp-segmented\b[^>]*>/g;
const CONTROL = /<sp-segmented\b[\s\S]*?<\/sp-segmented>/g;
// `class="sp-segment sp-grow"` is a segment too; anchoring on the exact class attribute
// silently drops every control whose segments carry a second class.
const SEGMENT = /class="sp-segment[^"]*"[^>]*?\bvalue="([^"]*)"[^>]*>([\s\S]*?)<\/button>/g;

const tally = { derived: 0, ambiguous: 0, variant: 0 };
let flagged = 0;
for (const slug of readdirSync(DEMOS).sort()) {
  let source: string;
  try {
    source = readFileSync(join(DEMOS, slug, 'demo.ts'), 'utf8');
  } catch {
    continue;
  }
  const markup = source.replace(COMMENTS, '');
  // A negated clause names the state that DISQUALIFIES the subject, so a value inside one
  // is the foil, not the term: `:not([data-gap=apart])` means apart is what the term is not.
  const pose = (markup.match(/data-pose="([^"]*)"/)?.[1] ?? '').replace(/:not\([^)]*\)/g, '');
  const bodies = markup.match(CONTROL) ?? [];
  let index = -1;
  for (const open of markup.match(OPEN_TAG) ?? []) {
    index++;
    if (open.includes('data-axis=')) continue;
    const control = bodies[index] ?? open;
    const segments = [...control.matchAll(SEGMENT)].map((m) => ({
      value: m[1] ?? '',
      label: (m[2] ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    }));
    // The pose names a segment value outright: the term state is decided, not guessed.
    const named = segments.filter((s) => pose.includes(`=${s.value}]`));
    const kind = named.length === 1 ? 'derived' : pose ? 'ambiguous' : 'variant';
    tally[kind]++;
    flagged++;
    const term = named.length === 1 ? `term=${named[0]?.value}` : pose ? `pose=${pose} (names no segment)` : 'no pose';
    // A value or label carrying `${` is template source, not a rendered segment: the demo
    // builds its options from an array, so the file is the only place the words exist.
    const literal = segments.filter((s) => !`${s.value}${s.label}`.includes('${'));
    const labels =
      literal.length >= 2
        ? literal.map((s) => `${s.value}="${s.label}"`).join(' ')
        : 'segments built at runtime; open the file for the option list';
    console.log(`${slug}\t${kind}; ${term}; ${labels}`);
  }
}
console.error(`\n${flagged} switches with no data-axis: ${tally.derived} derived, ${tally.ambiguous} ambiguous, ${tally.variant} variant/parameter`);
