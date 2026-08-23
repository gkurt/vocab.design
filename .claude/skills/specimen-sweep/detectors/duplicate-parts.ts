// Ambiguous data-part names: one name, several elements, and something that wants one.
//
//   bun .claude/skills/specimen-sweep/detectors/duplicate-parts.ts
//
// Sharing a `data-part` name across sibling elements is legitimate and the kit supports it
// directly: `partsOf(root, name)` returns them all, which is how a demo drives four glued
// pairs or eight cards with one name. The defect is a shared name that something then reads
// as if it were single:
//
//   part()    `part(root, name)` returns the FIRST match, so a demo reading a duplicated
//             name with the singular helper silently operates on one arbitrary element.
//   script    `data-part` is the only selector a choreography may use, and a step resolves
//             one element, so a step aiming at a duplicated name is a coin toss decided by
//             document order. An `assert` on one is worse than fragile, it is unfalsifiable:
//             the claim passes if ANY copy satisfies it.
//
// Recall-tuned source scan, no browser. Duplication is detected two ways: the same name
// spelled out more than once in the file's CODE (comments are stripped first), and a name
// emitted from a helper or template that the demo itself reads back with `partsOf`, which
// proves at authoring time that the author expected several. A name used ONLY through
// `partsOf` and never aimed at by a script is working as intended and is not reported.
//
// A source scan cannot see whether the copies exist AT THE SAME TIME: two spellings in two
// branches of a ternary are one element in the DOM and no defect at all, which is what all
// but two of the remaining findings turned out to be. `duplicate-parts-live.mjs` answers
// that half by watching the counts while each flagged specimen plays; run it before judging.
//
// Output: `slug<TAB>reader<TAB>evidence`

import { readFileSync, readdirSync } from 'node:fs';

const DEMOS = 'src/content/demos';

type Row = [slug: string, reader: string, evidence: string];
const rows: Row[] = [];

for (const slug of readdirSync(DEMOS).sort()) {
  let demo: string;
  try {
    demo = readFileSync(`${DEMOS}/${slug}/demo.ts`, 'utf8');
  } catch {
    continue;
  }
  let script = '';
  try {
    script = readFileSync(`${DEMOS}/${slug}/choreography.ts`, 'utf8');
  } catch {
    /* a demo may ship without one */
  }

  // Comments do not render, and a demo header naming its own subject part (`The subject
  // is the axis itself, \`data-part="axis"\``) is the house convention rather than a second
  // element. Counting them made 61 of this detector's first 70 specimens noise, so the
  // count is taken on code alone. Whole-line `//` only, so a URL keeps its slashes.
  demo = demo.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');

  // Names the demo itself treats as plural are duplicated on purpose.
  const plural = new Set(Array.from(demo.matchAll(/partsOf\(\s*[A-Za-z_$][\w$]*\s*,\s*'([^']+)'/g), (m) => m[1]!));
  // Names the demo reads as single.
  const singular = new Set(Array.from(demo.matchAll(/\bpart\(\s*[A-Za-z_$][\w$]*\s*,\s*'([^']+)'/g), (m) => m[1]!));

  const written = new Map<string, number>();
  for (const m of demo.matchAll(/data-part="([^"${}]+)"/g)) written.set(m[1]!, (written.get(m[1]!) ?? 0) + 1);

  for (const [name, times] of written) {
    const duplicated = times > 1 || plural.has(name);
    if (!duplicated) continue;
    const how = times > 1 ? `written ${times} times` : 'read back with partsOf, so several exist';
    // A choreography selects `[data-part=name]`, optionally qualified by another attribute.
    const aimed = new RegExp(`data-part=["']?${name.replace(/[.*+?^$()|[\]\\]/g, '\\$&')}[\\]"' ]`).test(script);
    if (singular.has(name)) rows.push([slug, 'part()', `[${name}] ${how}, but the demo reads it with the singular part()`]);
    if (aimed) rows.push([slug, 'script', `[${name}] ${how}, and the choreography aims a step at it`]);
  }
}

rows.sort((a, b) => a[0].localeCompare(b[0]) || a[2].localeCompare(b[2]));
for (const row of rows) console.log(row.join('\t'));

const slugs = new Set(rows.map((r) => r[0]));
console.error(`\n${slugs.size} specimens resolve a shared data-part as if it were single (${rows.length} findings)`);
for (const reader of ['part()', 'script']) console.error(`  ${reader}: ${rows.filter((r) => r[1] === reader).length}`);
