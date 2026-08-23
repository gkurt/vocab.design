import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * input-simulation detector (recall-tuned; see COMPLAINTS.md). Finds demos whose
 * copy or parts admit to simulating: "Simulate a hold" buttons, sim-named parts,
 * captions saying the specimen pretends, and the excuse that stands where the
 * admission would be. Legitimate hits exist (a simulated network failure is a
 * condition no input could perform, SPEC §8) — the judge separates impersonated
 * INPUT from simulated ENVIRONMENT.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/input-simulation.ts`
 *
 * Scans PROSE UNITS, not lines. A comment block is joined into one unit before the
 * signs are tested, because mouse-gesture hid behind exactly that: its sentence read
 * "The\n * player cannot hold a button across steps", so no single line carried the
 * claim and the line-by-line scan reported nothing while the specimen latched its
 * input for eleven months. A wrapped excuse is the normal shape of an excuse.
 */
const SIGNS: [kind: string, sign: RegExp][] = [
  ['vocab', /simulat/i],
  ['vocab', /data-part="sim[\w-]*"/i],
  ['vocab', /\bpretend/i],
  ['vocab', /labelled simulation/i],
  // The excuse, not the word. quasimode survived the 2026-08-23 sweep behind "Attract cannot
  // hold a key down" plus a "stand-in for the physical key", saying neither "simulate" nor
  // "pretend": every vocabulary sign above is a word an author uses when ADMITTING, and an
  // author explaining why a control is NECESSARY reaches for different words. A claim that
  // the player cannot do something is the tell, and it is worth checking even when it was
  // true when written, because these are exactly the claims the stage keeps outgrowing.
  // Bare `player` as well as `the player`: mouse-gesture's wrapped line began with the noun.
  ['claim', /\b(attract|player|the script|a script|the stage|the ghost cursor|choreography)\b[^.]{0,40}?\bcannot\b/i],
  ['claim', /\bstands? in for\b|\bstand-in for\b/i],
];

/**
 * Sentences excused before the signs run, because they are house discipline written
 * en masse rather than an excuse for anything: the mandatory pointer-capture guard
 * (~30 specimens since the uncaptured-drag sweep) and the DemoClock note that a pose
 * must be able to freeze a run. Blanked rather than skipped, so a unit that carries
 * one of these AND a real admission is still reported for the admission.
 */
const EXCUSED: RegExp[] = [/[^.]*cannot be captured[^.]*\./gi, /[^.]*\bpose\b[^.]{0,160}?cannot[^.]*\./gi];

/** The apparatus named in copy the READER sees, which is never the specimen's business. */
const APPARATUS = /ghost cursor|attract (mode|player|loop)/i;

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
  const lines = demo.split('\n');

  // One unit per comment block (joined, so a wrapped sentence is whole) and one per
  // code line. `line` is where the unit starts, which is what a reader needs to find it.
  // A block comment is tracked as state rather than by a leading star, since a wrapped
  // sentence's last line often carries only the closing `*/` (drag-threshold L16).
  const units: { line: number; text: string; code: boolean }[] = [];
  let inBlock = false;
  for (const [index, raw] of lines.entries()) {
    const opens = raw.includes('/*');
    const comment = inBlock || opens || /^\s*\/\//.test(raw);
    if (opens) inBlock = true;
    if (inBlock && raw.includes('*/')) inBlock = false;
    const text = comment ? raw.replace(/^\s*(\*\/?|\/\/|\/\*\*?)\s?/, '').replace(/\*\/\s*$/, '') : raw;
    const open = units.at(-1);
    // A comment line continues the block above it; anything else starts a unit.
    if (comment && open && !open.code) {
      open.text += ` ${text.trim()}`;
      continue;
    }
    units.push({ line: index + 1, text, code: !comment });
  }

  const hits: string[] = [];
  for (const unit of units) {
    const clean = EXCUSED.reduce((text, excused) => text.replace(excused, ' '), unit.text);
    for (const [kind, sign] of SIGNS) {
      const found = clean.match(sign);
      if (!found) continue;
      const at = Math.max(0, (found.index ?? 0) - 30);
      hits.push(`${kind} L${unit.line}: ${clean.slice(at, at + 110).trim()}`);
      break;
    }
    // Copy the reader sees is judged on the raw line: an excused sentence is still
    // apparatus if it was printed rather than commented.
    if (unit.code && APPARATUS.test(unit.text) && !unit.text.includes('<!--')) {
      hits.push(`copy L${unit.line}: ${unit.text.trim().slice(0, 110)}`);
    }
    if (hits.length >= 3) break;
  }
  if (!hits.length) continue;
  flagged++;
  console.log(`${slug}\t${hits.join(' · ')}`);
}
console.error(`\n${flagged}/${specimens} specimens flagged`);
