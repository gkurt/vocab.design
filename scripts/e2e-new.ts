import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Runs the e2e suites for NEW specimens only: every demo directory without a
 * committed identify snapshot. The full suite over the whole collection costs
 * minutes per hundred specimens and an authoring round needs it exactly once,
 * at the end; this is the cheap first pass that writes the new snapshots and
 * surfaces behavioral failures while they are still a short list.
 *
 * Per-specimen test titles all begin "<slug>: ", so one title filter covers the
 * choreography, identify, and takeover suites at once. The reduced-motion guard
 * is collection-wide and is deliberately left to the full run.
 */
const DEMOS = 'src/content/demos';
const SNAPSHOTS = join('e2e', '__snapshots__');

const slugs = readdirSync(DEMOS, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => !Bun.file(join(SNAPSHOTS, `${slug}-subject.txt`)).size);

if (slugs.length === 0) {
  console.log('No new specimens: every demo directory has a committed subject snapshot.');
  process.exit(0);
}

console.log(`${slugs.length} new specimen(s): ${slugs.join(', ')}`);
console.log('First run on a new specimen fails its identify test while WRITING the snapshot; rerun to confirm green.\n');

// Playwright greps the joined title path (project, file, title), so the slug is
// bounded by whitespace on the left, never by the string start.
const grep = `\\s(${slugs.join('|')}): `;
const result = spawnSync(`bunx playwright test -g "${grep}"`, { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
