// Ambiguous data-part names, judged LIVE: does the duplication actually exist while the
// specimen plays, or are the two spellings mutually exclusive render branches?
//
//   node .claude/skills/specimen-sweep/detectors/duplicate-parts-live.mjs [--slugs=a,b] [--motion]
//
// Runs under reduced motion by default, which collapses transitions and so removes an
// outgoing branch instantly; --motion replays with animation on, which is where two
// branches of a crossfade can briefly coexist and a step can resolve the wrong one.
//
// duplicate-parts.ts is a source scan, so it cannot tell a real pair of siblings from a
// name written twice in two branches of a ternary. This probe watches every flagged name
// while the specimen plays its own choreography (stage.audit(), sampled) and reports the
// most copies that ever coexisted, plus whether the copy a `querySelector` resolves (the
// FIRST in document order, which is what part() and every choreography step get) was ever
// invisible while a later copy was on screen. Needs the USER's dev server on 4321.
//
// Verdicts, per (slug, name):
//   branch        never more than one in the DOM at once: duplicate-parts false positive
//   first-hidden  two or more coexist AND the first is invisible while a later one shows:
//                 the resolved element is not the one the reader sees
//   coexist       two or more VISIBLE at once: the resolution is arbitrary
//   coexist-dark  two or more coexist but only ever one is visible, and it is the first
//
// Output: `slug<TAB>name<TAB>readers<TAB>verdict<TAB>evidence`

import { readFileSync, readdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4321';
const DEMOS = 'src/content/demos';
const CONCURRENCY = 6;
const INTERVAL_MS = 200;
const MAX_SAMPLES = 300;

const withMotion = process.argv.includes('--motion');
const only = process.argv
  .find((a) => a.startsWith('--slugs='))
  ?.slice('--slugs='.length)
  .split(',')
  .filter(Boolean);

const head = await fetch(`${BASE}/`, { method: 'HEAD' }).catch(() => null);
if (!head?.ok) {
  console.error(`dev server not reachable at ${BASE}; ask the user, never start one`);
  process.exit(1);
}

/** Same extraction as duplicate-parts.ts, so the two agree on what is flagged. */
const watched = new Map();
for (const slug of readdirSync(DEMOS).sort()) {
  if (only && !only.includes(slug)) continue;
  let demo;
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

  // Comments stripped exactly as duplicate-parts.ts does, so the two agree on the shortlist:
  // a demo header naming its own subject part is the house convention, not a second element.
  demo = demo.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');

  const plural = new Set(Array.from(demo.matchAll(/partsOf\(\s*[A-Za-z_$][\w$]*\s*,\s*'([^']+)'/g), (m) => m[1]));
  const singular = new Set(Array.from(demo.matchAll(/\bpart\(\s*[A-Za-z_$][\w$]*\s*,\s*'([^']+)'/g), (m) => m[1]));
  const written = new Map();
  for (const m of demo.matchAll(/data-part="([^"${}]+)"/g)) written.set(m[1], (written.get(m[1]) ?? 0) + 1);

  const names = [];
  for (const [name, times] of written) {
    if (!(times > 1 || plural.has(name))) continue;
    const aimed = new RegExp(`data-part=["']?${name.replace(/[.*+?^$()|[\]\\]/g, '\\$&')}[\\]"' ]`).test(script);
    const readers = [singular.has(name) && 'part()', aimed && 'script'].filter(Boolean);
    if (readers.length) names.push({ name, readers: readers.join('+'), times });
  }
  if (names.length) watched.set(slug, names);
}

const slugs = [...watched.keys()];
console.error(`${slugs.length} specimens to probe`);

const browser = await chromium.launch();
const context = await browser.newContext({
  reducedMotion: withMotion ? 'no-preference' : 'reduce',
  viewport: { width: 1280, height: 720 },
});

/** Runs in the page: sample copy counts for `names` across one audit() play. */
async function probe({ names, interval, maxSamples }) {
  const stage = document.querySelector('vd-stage');
  if (!stage?.specimenRoot) return { error: 'no specimen root' };

  const state = new Map(names.map((n) => [n, { maxTotal: 0, maxVisible: 0, firstHidden: false, shape: '' }]));
  const visible = (el) => {
    try {
      return el.checkVisibility
        ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, opacityProperty: true, visibilityProperty: true })
        : true;
    } catch {
      return true;
    }
  };
  const describe = (el) =>
    `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/)[0]}` : ''}` +
    `${(el.textContent ?? '').trim() ? `:"${(el.textContent ?? '').trim().slice(0, 18)}"` : ''}`;

  const sample = () => {
    const root = stage.specimenRoot;
    if (!root) return;
    for (const [name, s] of state) {
      const all = [...root.querySelectorAll(`[data-part="${name}"]`)];
      if (all.length > s.maxTotal) {
        s.maxTotal = all.length;
        s.shape = all
          .slice(0, 3)
          .map((el) => `${describe(el)}${visible(el) ? '' : '(hidden)'}`)
          .join(' | ');
      }
      const shown = all.filter(visible);
      if (shown.length > s.maxVisible) s.maxVisible = shown.length;
      if (all.length > 1 && !visible(all[0]) && shown.length > 0) s.firstHidden = true;
    }
  };

  let done = false;
  stage
    .audit()
    .catch(() => {})
    .then(() => {
      done = true;
    });
  let n = 0;
  sample();
  while (!done && n++ < maxSamples) {
    await new Promise((r) => setTimeout(r, interval));
    sample();
  }
  sample();
  return { rows: [...state].map(([name, s]) => [name, s.maxTotal, s.maxVisible, s.firstHidden, s.shape]) };
}

const rows = [];
const queue = [...slugs];
let doneCount = 0;

async function worker() {
  const page = await context.newPage();
  while (queue.length) {
    const slug = queue.shift();
    const names = watched.get(slug);
    try {
      const response = await page.goto(`${BASE}/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()} for /${slug}`);
      await page.waitForFunction(() => !!document.querySelector('vd-stage')?.specimenRoot, null, { timeout: 20_000 });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(probe, {
        names: names.map((n) => n.name),
        interval: INTERVAL_MS,
        maxSamples: MAX_SAMPLES,
      });
      if (result.error) {
        rows.push([slug, '-', '-', 'probe-error', result.error]);
      } else {
        for (const [name, maxTotal, maxVisible, firstHidden, shape] of result.rows) {
          const readers = names.find((n) => n.name === name)?.readers ?? '?';
          const verdict = maxTotal < 2 ? 'branch' : firstHidden ? 'first-hidden' : maxVisible > 1 ? 'coexist' : 'coexist-dark';
          rows.push([slug, name, readers, verdict, `max ${maxTotal} in DOM, ${maxVisible} visible · ${shape}`]);
        }
      }
    } catch (error) {
      rows.push([slug, '-', '-', 'probe-error', String(error).replace(/\s+/g, ' ').slice(0, 120)]);
    }
    doneCount++;
    if (doneCount % 20 === 0) console.error(`...${doneCount}/${slugs.length}`);
  }
  await page.close();
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, slugs.length) }, worker));
await browser.close();

rows.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
for (const row of rows) console.log(row.join('\t'));

const byVerdict = new Map();
const slugsByVerdict = new Map();
for (const [slug, , , verdict] of rows) {
  byVerdict.set(verdict, (byVerdict.get(verdict) ?? 0) + 1);
  if (!slugsByVerdict.has(verdict)) slugsByVerdict.set(verdict, new Set());
  slugsByVerdict.get(verdict).add(slug);
}
console.error(`\n${rows.length} findings over ${slugs.length} specimens`);
for (const [verdict, count] of [...byVerdict].sort((a, b) => b[1] - a[1])) {
  console.error(`  ${verdict}: ${count} findings, ${slugsByVerdict.get(verdict).size} specimens`);
}
