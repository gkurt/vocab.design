/**
 * Every word the STRIP draws, read off real term pages.
 *
 * `frame-prose.ts` reads what a specimen paints inside its own frame, which is where the
 * site's voice must never appear. This reads the other half: the announcement and verdict
 * lanes the stage lifts OUT of the fiction and draws under it. That prose is allowed to be
 * the author's, but allowed is not the same as good, and the strip is not a laundry: the
 * previous sweep moved sentences out here rather than deleting them, and moving a bad
 * sentence out of the frame does not make it a good one. Capture pages draw no strip
 * (SPEC §10), so this probes `/{slug}/` rather than `/capture/{slug}`.
 *
 * Run from the repo root against a BUILT site: `bun run build` then `bun <this file>`.
 */
import { readdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const PORT = 4325;
const ROOT = `${process.cwd()}/dist`;

const server = Bun.serve({
  port: PORT,
  async fetch(request) {
    // `build.format: 'file'` emits `dist/toast.html`, not `dist/toast/index.html`, so a URL
    // with a trailing slash misses every candidate and the probe reports a clean corpus.
    const path = new URL(request.url).pathname.replace(/\/$/, '');
    for (const candidate of [`${ROOT}${path}`, `${ROOT}${path}/index.html`, `${ROOT}${path}.html`]) {
      const file = Bun.file(candidate);
      if (await file.exists()) return new Response(file);
    }
    return new Response('not found', { status: 404 });
  },
});

// The slug list comes from the built capture set, exactly as `frame-prose.ts` takes it:
// `getTerms()` needs Astro's own runtime and there is none here.
const slugs = readdirSync(`${ROOT}/capture`)
  .filter((name) => name.endsWith('.html'))
  .map((name) => name.slice(0, -'.html'.length))
  .filter((slug) => slug !== 'site-card');
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1200, height: 900 } });
const page = await context.newPage();

let seen = 0;
for (const slug of slugs) {
  await page.goto(`http://localhost:${PORT}/${slug}`, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(400);
  const lanes = await page
    .evaluate(() => {
      const strip = document.querySelector('.vd-stage-strip');
      if (!strip || (strip as HTMLElement).hidden) return [];
      const out: Array<{ lane: string; text: string }> = [];
      for (const el of strip.querySelectorAll<HTMLElement>('.vd-stage-verdict, .vd-stage-say__text')) {
        const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
        if (text) out.push({ lane: el.className.includes('verdict') ? 'verdict' : 'say', text });
      }
      return out;
    })
    .catch(() => []);
  for (const one of lanes) console.log(`${slug}\t${one.lane}\t${one.text}`);
  if (lanes.length) seen += 1;
}

console.error(`${seen} specimens draw a strip lane, of ${slugs.length} probed`);
if (seen === 0) console.error('NOTHING FOUND: that is a broken probe, not a clean corpus. Check the server and the page.');
await context.close();
await browser.close();
server.stop(true);
