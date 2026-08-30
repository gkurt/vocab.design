/**
 * Every visible string INSIDE the specimen frame, read off the built site rather than
 * out of the source (SPEC §5.1).
 *
 * Source-reading detectors keep missing offenders because a demo's prose need not be a
 * literal in its markup: `bubble-toolbar` puts it in a bare `sp-label` with no part name,
 * and plenty of demos build it from a constant and interpolate it. What the reader sees
 * is the only complete list, so this mounts each capture page and reads the text nodes
 * that are actually painted, skipping anything hidden (the sources the strip replaced)
 * and anything drawn outside the canvas (the strip's own lanes, the caption band).
 *
 * It classifies nothing: an honest mock product is full of sentence-shaped strings, and
 * whether a line is the product speaking or the site speaking is not a property of its
 * grammar. One TSV row per string:
 *
 *   slug \t tag.classes \t text
 *
 * Needs a built site, like `bun run og` and for the same reason: Astro's preview lock is
 * global, so this serves `dist/` itself rather than driving `astro preview`.
 *
 *   bun run build:nosearch
 *   bun .claude/skills/specimen-sweep/detectors/frame-prose.ts
 */
import { readdirSync, statSync } from 'node:fs';
import { cpus } from 'node:os';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const DIST = 'dist';
const PORT = 4324;
const READY_MS = 30_000;
const MIN_WORDS = 3;

const captures = join(DIST, 'capture');
if (!Bun.file(join(captures, 'site-card.html')).size) {
  throw new Error(`no capture pages in ${captures}: run \`bun run build:nosearch\` first`);
}

function resolve(pathname: string): string | undefined {
  const path = join(DIST, decodeURIComponent(pathname));
  for (const candidate of [path, `${path}.html`, join(path, 'index.html')]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {}
  }
  return undefined;
}

const server = Bun.serve({
  port: PORT,
  fetch(request) {
    const file = resolve(new URL(request.url).pathname);
    return file ? new Response(Bun.file(file)) : new Response('not found', { status: 404 });
  },
});

const slugs = readdirSync(captures)
  .filter((file) => file.endsWith('.html') && file !== 'site-card.html')
  .map((file) => file.slice(0, -5))
  .sort();

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 800, height: 420 },
  reducedMotion: 'reduce',
  colorScheme: 'dark',
});

/** Runs in the page: the painted text of one specimen, innermost owner first. */
const READ = (minWords: number) => {
  const canvas = document.querySelector('[data-stage-canvas]');
  const scope: ParentNode | null | undefined =
    (canvas as HTMLElement & { shadowRoot: ShadowRoot | null })?.shadowRoot ??
    (document.querySelector('iframe') as HTMLIFrameElement | null)?.contentDocument;
  if (!scope) return [];

  const out: { where: string; text: string }[] = [];
  for (const el of scope.querySelectorAll<HTMLElement>('*')) {
    if (typeof el.checkVisibility === 'function' && !el.checkVisibility()) continue;
    const own = [...el.childNodes]
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent ?? '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!own || own.split(/\s+/).length < minWords) continue;
    if (!/[a-z]{3}/i.test(own)) continue;
    const classes = [...el.classList].filter((name) => name.startsWith('sp-')).join('.');
    out.push({ where: `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''}`, text: own });
  }

  // A second pass for prose broken into inline children. `bubble-toolbar` wraps every WORD
  // in its own span so a selection can be drawn, so the first pass sees a hundred one-word
  // fragments and reports none of them, while the paragraph they spell out is the site
  // explaining selection inside the mock document. Take the whole textContent of any element
  // whose element children are all inline, and drop it if an ancestor already reported it.
  const INLINE = new Set(['SPAN', 'B', 'I', 'EM', 'STRONG', 'A', 'ABBR', 'CODE', 'SMALL', 'SUP', 'SUB', 'MARK', 'BR', 'WBR']);
  const runs: { where: string; text: string }[] = [];
  for (const el of scope.querySelectorAll<HTMLElement>('*')) {
    if (typeof el.checkVisibility === 'function' && !el.checkVisibility()) continue;
    if (![...el.children].every((child) => INLINE.has(child.tagName))) continue;
    if (!el.children.length) continue;
    // `textContent` includes HIDDEN descendants, so a visible readout and the verdict the
    // strip took out of the frame get concatenated into one string that was never on screen
    // together ("Inner radius 22 px" + "One centre for both arcs..."). Walk the children and
    // skip what is not painted, or the probe invents offenders and reports its own artifacts.
    const visibleText = (node: Node): string => {
      if (node.nodeType === 3) return node.textContent ?? '';
      if (!(node instanceof Element)) return '';
      const painted = typeof (node as HTMLElement).checkVisibility === 'function' ? (node as HTMLElement).checkVisibility() : true;
      if (!painted) return '';
      return [...node.childNodes].map(visibleText).join('');
    };
    const text = visibleText(el).replace(/\s+/g, ' ').trim();
    if (text.split(/\s+/).length < 6) continue;
    if (out.some((one) => one.text === text) || runs.some((one) => one.text.includes(text))) continue;
    const classes = [...el.classList].filter((name) => name.startsWith('sp-')).join('.');
    runs.push({ where: `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''}+inline`, text });
  }
  return [...out, ...runs];
};

const workers = Math.max(1, Math.min(6, cpus().length - 2));
const queue = [...slugs];
let done = 0;

const rows: string[] = [];
const broken: string[] = [];

await Promise.all(
  Array.from({ length: workers }, async () => {
    const page = await context.newPage();
    for (let slug = queue.shift(); slug; slug = queue.shift()) {
      try {
        await page.goto(`http://localhost:${PORT}/capture/${slug}`, { waitUntil: 'load', timeout: READY_MS });
        await page.waitForFunction(() => document.querySelector('vd-stage')?.dataset.captureReady !== undefined, null, { timeout: READY_MS }).catch(() => {});
        await page.waitForTimeout(120);
        const found = (await page.evaluate(READ, MIN_WORDS)) as { where: string; text: string }[];
        for (const one of found) rows.push([slug, one.where, one.text].join('\t'));
      } catch (error) {
        broken.push(`${slug}: ${(error as Error).message.split('\n')[0]}`);
      }
      done += 1;
      if (done % 100 === 0) console.error(`  ${done}/${slugs.length}`);
    }
    await page.close();
  }),
);

for (const row of rows.sort()) console.log(row);
console.error(`${rows.length} strings across ${new Set(rows.map((r) => r.split('\t')[0])).size} specimens`);
for (const one of broken) console.error(`BROKEN ${one}`);

// Bun.serve holds the process open, and a server left running makes the NEXT run die on
// EADDRINUSE with an empty result, which reads exactly like a corpus with nothing in it.
await context.close();
await browser.close();
server.stop(true);
