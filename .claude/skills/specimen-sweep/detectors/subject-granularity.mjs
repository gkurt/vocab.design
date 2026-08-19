import { readdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

/**
 * subject-granularity detector (recall-tuned shortlist for a judge; see
 * COMPLAINTS.md). Browser probe: needs the USER's dev server on 4321 (never
 * start one) and runs under node, not bun (Playwright's pipe hangs under bun).
 *   node .claude/skills/specimen-sweep/detectors/subject-granularity.mjs
 * Flags per specimen:
 *   (a) orphaned highlight: elements with inline `--sp-accent` paint that sit
 *       outside both [data-subject] and .sp-context, meaning the demo highlights
 *       a feature the ring does not cover;
 *   (b) canvas-sized subject: subject box >= 60% of the specimen root's area.
 */
const BASE = 'http://localhost:4321';
const CONCURRENCY = 6;

const head = await fetch(`${BASE}/`, { method: 'HEAD' }).catch(() => null);
if (!head?.ok) {
  console.error(`dev server not reachable at ${BASE}; ask the user, never start one`);
  process.exit(1);
}

const slugs = readdirSync('src/content/demos').sort();
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1100, height: 900 } });

const probe = () => {
  const shadowed = [];
  const walk = (root) => {
    for (const el of root.querySelectorAll('*')) if (el.shadowRoot) shadowed.push(el) && walk(el.shadowRoot);
  };
  walk(document);
  const host = shadowed.find((el) => el.shadowRoot.querySelector('[data-subject]'));
  if (!host) return document.querySelector('iframe') ? { iframe: true } : { missing: true };
  const root = host.shadowRoot;
  const subject = root.querySelector('[data-subject]');
  const orphans = [...root.querySelectorAll('[style*="--sp-accent"]')]
    .filter((el) => !el.closest('[data-subject]') && !el.closest('.sp-context'))
    .map((el) => el.dataset.part ?? el.closest('[data-part]')?.dataset.part ?? el.tagName.toLowerCase());
  const stage = root.firstElementChild?.getBoundingClientRect() ?? host.getBoundingClientRect();
  const box = subject.getBoundingClientRect();
  const share = stage.width && stage.height ? (box.width * box.height) / (stage.width * stage.height) : 0;
  return { orphans: [...new Set(orphans)], share: Math.round(share * 100) };
};

let flagged = 0;
let done = 0;
const queue = [...slugs];
const results = new Map();
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    const page = await context.newPage();
    for (let slug = queue.shift(); slug; slug = queue.shift()) {
      try {
        await page.goto(`${BASE}/${slug}/`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(400);
        results.set(slug, await page.evaluate(probe));
      } catch (error) {
        results.set(slug, { error: String(error).slice(0, 80) });
      }
      done++;
    }
    await page.close();
  }),
);
await browser.close();

for (const slug of slugs) {
  const r = results.get(slug) ?? {};
  const notes = [];
  if (r.error) notes.push(`probe error: ${r.error}`);
  if (r.iframe) notes.push('iframe specimen, probe skipped: judge by hand');
  if (r.missing) notes.push('no [data-subject] found by probe');
  if (r.orphans?.length) notes.push(`orphaned highlight outside subject: ${r.orphans.join(', ')}`);
  if (r.share >= 60) notes.push(`subject covers ${r.share}% of specimen`);
  if (!notes.length) continue;
  flagged++;
  console.log(`${slug}\t${notes.join(' · ')}`);
}
console.error(`\n${flagged}/${done} specimens flagged`);
