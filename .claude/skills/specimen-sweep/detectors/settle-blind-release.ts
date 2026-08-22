import { readdirSync, readFileSync } from 'node:fs';

/**
 * settle-blind-release detector (shortlist for a judge; see COMPLAINTS.md). Source scan,
 * zero tokens, no dev server needed:
 *   bun .claude/skills/specimen-sweep/detectors/settle-blind-release.ts
 *
 * Shortlists demos that judge a pointer RELEASE from a sample buffer, which is the only
 * shape the complaint can occur in. The judgeable question is WHERE the window is applied:
 * a demo filtering by the clock at release reads a settled drag honestly, while one reusing
 * a buffer pruned as moves arrived keeps pre-settle samples and coasts either way.
 */
const BUFFER = /\b(samples|history|recent|track(ed)?Points|trail)\b/;
const SPEED = /\b(velocity|speed|throw|fling|momentum|coast)\b/i;
const RELEASE = /addEventListener\(\s*'pointer(up|cancel)'/;
/** Filtering by the clock inside the release path is the honest shape, so it lowers suspicion.
 * Matched on the SHAPE of the comparison rather than on the timestamp's field name, which is
 * the demo's own choice (`sample.t` in fling, `sample.at` in momentum-scrolling). */
const AT_RELEASE = /\bnow\s*-\s*\w+\.\w+\s*<=?|performance\.now\(\)\s*-\s*\w+\.\w+\s*<=?/;

let flagged = 0;
const slugs = readdirSync('src/content/demos').sort();
for (const slug of slugs) {
  let source: string;
  try {
    source = readFileSync(`src/content/demos/${slug}/demo.ts`, 'utf8');
  } catch {
    continue;
  }
  if (!BUFFER.test(source) || !SPEED.test(source) || !RELEASE.test(source)) continue;
  const notes = [AT_RELEASE.test(source) ? 'filters by the clock somewhere: check it is the RELEASE path' : 'NO clock filter found: likely prunes on arrival only'];
  if (/release:\s*'moving'/.test(readFileSync(`src/content/demos/${slug}/choreography.ts`, 'utf8'))) notes.push('script already throws');
  flagged++;
  console.log(`${slug}\t${notes.join(' · ')}`);
}
console.error(`\n${flagged}/${slugs.length} specimens judge a release from a sample buffer`);
