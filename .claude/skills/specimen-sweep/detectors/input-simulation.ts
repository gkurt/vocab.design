import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * input-simulation detector (recall-tuned; see COMPLAINTS.md). Finds demos whose
 * copy or parts admit to simulating: "Simulate a hold" buttons, sim-named parts,
 * captions saying the specimen pretends. Legitimate hits exist (a simulated
 * network failure is a condition no input could perform, SPEC §8) — the judge
 * separates impersonated INPUT from simulated ENVIRONMENT.
 * Run from the repo root: `bun .claude/skills/specimen-sweep/detectors/input-simulation.ts`
 */
const SIGNS = [
  /simulat/i,
  /data-part="sim[\w-]*"/i,
  /\bpretend/i,
  /labelled simulation/i,
  // The excuse, not the word. quasimode survived the 2026-08-23 sweep behind "Attract cannot
  // hold a key down" plus a "stand-in for the physical key", saying neither "simulate" nor
  // "pretend": every sign above is vocabulary, and an author explaining why a control is
  // necessary reaches for different vocabulary. A claim that the player CANNOT do something
  // is the tell, and it is worth checking even when it was true when written, because these
  // are exactly the claims the stage keeps outgrowing.
  /(attract|the player|the script|a script|the stage|choreography)[a-z ]{0,20}cannot/i,
  /\bstands? in for\b|\bstand-in for\b/i,
];

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
  const hits: string[] = [];
  for (const [index, line] of lines.entries()) {
    if (!SIGNS.some((sign) => sign.test(line))) continue;
    hits.push(`L${index + 1}: ${line.trim().slice(0, 90)}`);
    if (hits.length >= 3) break;
  }
  if (!hits.length) continue;
  flagged++;
  console.log(`${slug}\t${hits.join(' · ')}`);
}
console.error(`\n${flagged}/${specimens} specimens flagged`);
