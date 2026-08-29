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
const CONTROL = /<sp-segmented\b[\s\S]*?<\/sp-segmented>/g;
const SEGMENT = /class="sp-segment"[^>]*?\bvalue="([^"]*)"[^>]*>([\s\S]*?)<\/button>/g;

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
  const pose = markup.match(/data-pose="([^"]*)"/)?.[1] ?? '';
  for (const control of markup.match(CONTROL) ?? []) {
    if (control.includes('data-axis=')) continue;
    const segments = [...control.matchAll(SEGMENT)].map((m) => ({
      value: m[1] ?? '',
      label: (m[2] ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    }));
    if (segments.length < 2) continue;
    // The pose names a segment value outright: the term state is decided, not guessed.
    const named = segments.filter((s) => pose.includes(`=${s.value}]`));
    const kind = named.length === 1 ? 'derived' : pose ? 'ambiguous' : 'variant';
    tally[kind]++;
    flagged++;
    const term = named.length === 1 ? `term=${named[0]?.value}` : pose ? `pose=${pose} (names no segment)` : 'no pose';
    const labels = segments.map((s) => `${s.value}="${s.label}"`).join(' ');
    console.log(`${slug}\t${kind}; ${term}; ${labels}`);
  }
}
console.error(`\n${flagged} switches with no data-axis: ${tally.derived} derived, ${tally.ambiguous} ambiguous, ${tally.variant} variant/parameter`);
