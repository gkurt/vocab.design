import { readdirSync, statSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { cpus } from 'node:os';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

/**
 * Shoot the share images (SPEC §10): one still per specimen, from the capture pages
 * at `/capture/<slug>`, into `public/og/<slug>.png` where the build copies them
 * straight through.
 *
 * Each image is the demo posed exactly as identify poses it, with the subject at full
 * strength and the rest of the canvas faded back. That is the whole reason this is a
 * browser and not a text card generator: the picture is the specimen, and the only
 * thing that can draw a specimen is the specimen.
 *
 *   bun run og                  # every specimen missing an image, plus the site card
 *   bun run og --force          # re-shoot everything
 *   bun run og toast dark-mode  # just these, always re-shot
 *   bun run og --site           # just the site card
 *   bun run og --build          # build first, then shoot
 *
 * The images are committed. Nothing gates them: no check notices a demo changing under
 * its own picture, which is a deliberate trade. Re-shoot a term whose demo you edited
 * (`bun run og <slug>`), and re-shoot the lot after a change to the kit.
 *
 * Reduced motion is emulated for the reason the identify stills use it: attract never
 * runs, kit animation is off, and a demo that animates in script jumps to its end
 * state, so the shutter falls on the same moment every time rather than on whenever it
 * happened to fall.
 *
 * The frame is 800x420 CSS pixels at a device scale of 1.5, which is the 1200x630 a
 * link preview wants. Laying the page out at 800 rather than at 1200 keeps the
 * specimen near the width it was authored against; the scale is what makes it sharp.
 */

const DIST = 'dist';
const OUT = 'public/og';
const PORT = 4323;
const VIEWPORT = { width: 800, height: 420 };
const SCALE = 1.5;
/** A page that never reports ready is a broken specimen, not a slow one. */
const READY_MS = 30_000;

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const only = args.filter((arg) => !arg.startsWith('--'));
const force = flag('force');
const siteOnly = flag('site');
const workers = Math.max(1, Math.min(6, cpus().length - 2));

if (flag('build')) {
  console.log('building');
  const build = Bun.spawn(['bun', 'run', 'build:nosearch'], { stdout: 'inherit', stderr: 'inherit' });
  if ((await build.exited) !== 0) throw new Error('the build failed, so there is nothing to photograph');
}

const captures = 'dist/capture';
if (!Bun.file(join(captures, 'site-card.html')).size) {
  throw new Error(`no capture pages in ${captures}: run \`bun run build:nosearch\` first, or pass --build`);
}

/**
 * The built site, served the way a host serves it. `build.format: 'file'` means
 * /capture/toast is capture/toast.html on disk, so the extension has to be tried
 * before the request is called a miss.
 */
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

const wanted = siteOnly ? [] : only.length > 0 ? slugs.filter((slug) => only.includes(slug)) : slugs;
const missing = only.filter((slug) => !slugs.includes(slug));
if (missing.length > 0) throw new Error(`no capture page for: ${missing.join(', ')}`);

const shoot = only.length > 0 || force ? wanted : wanted.filter((slug) => !Bun.file(join(OUT, `${slug}.png`)).size);
const card = siteOnly || force || !Bun.file(join(OUT, 'site.png')).size;

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
// One context, many pages: the settings that matter (the frame, the scale, reduced
// motion, the dark scheme) belong to the context, and sharing it shares the font cache.
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
  reducedMotion: 'reduce',
  colorScheme: 'dark',
});

interface Shot {
  slug: string;
  path: string;
  /** A specimen waits for its stage; the site card has no stage to wait for. */
  stage: boolean;
  file: string;
}

const queue: Shot[] = [
  ...(card ? [{ slug: 'site card', path: '/capture/site-card', stage: false, file: join(OUT, 'site.png') }] : []),
  ...shoot.map((slug) => ({ slug, path: `/capture/${slug}`, stage: true, file: join(OUT, `${slug}.png`) })),
];

if (queue.length === 0) {
  console.log(`nothing to shoot: ${slugs.length} specimens already have an image (--force re-shoots them)`);
  await context.close();
  await browser.close();
  server.stop(true);
  process.exit(0);
}

console.log(`shooting ${queue.length} image(s) at ${VIEWPORT.width * SCALE}x${VIEWPORT.height * SCALE} on ${workers} workers`);

const failures: string[] = [];
let done = 0;
let bytes = 0;
const started = Bun.nanoseconds();

async function worker(): Promise<void> {
  const page = await context.newPage();
  for (;;) {
    const shot = queue.shift();
    if (!shot) break;
    try {
      await page.goto(`http://localhost:${PORT}${shot.path}`, { waitUntil: 'load' });
      // The stage says when the specimen is mounted, summoned, frozen and faded; a
      // stage that never says it has failed, and a still of a half-built demo would
      // be worse than no still at all.
      if (shot.stage) await page.waitForSelector('vd-stage[data-capture-ready]', { timeout: READY_MS });
      await page.evaluate(() => document.fonts.ready);
      // The caption's serif and the specimen's own faces are two font loads in two
      // documents, and a frame's are not the page's. Both settle before the shutter.
      await page.evaluate(() => document.querySelector<HTMLIFrameElement>('vd-stage iframe')?.contentDocument?.fonts.ready);
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.screenshot({ path: shot.file, animations: 'disabled', scale: 'device' });
      bytes += Bun.file(shot.file).size;
      done += 1;
      if (done % 25 === 0 || queue.length === 0) console.log(`  ${done} shot, ${queue.length} left`);
    } catch (error) {
      failures.push(`${shot.slug}: ${error instanceof Error ? error.message.split('\n')[0] : String(error)}`);
    }
  }
  await page.close();
}

await Promise.all(Array.from({ length: workers }, worker));
await context.close();
await browser.close();
server.stop(true);

const seconds = ((Bun.nanoseconds() - started) / 1e9).toFixed(1);
console.log(`\n${done} image(s) in ${seconds}s, ${(bytes / 1e6).toFixed(1)}MB in ${OUT}/`);
if (failures.length > 0) {
  console.error(`\n${failures.length} failed:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
