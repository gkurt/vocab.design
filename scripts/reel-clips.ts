import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

/**
 * Record the announcement video's raw footage: one clip per cast member, of the specimen
 * playing itself in attract mode on `/reel/<slug>`, into `video/public/clips/<slug>.mp4`,
 * plus `video/clips.json`, which tells the Remotion project in `video/` what it has to cut.
 *
 *   bun run reel                 # the cast named in video/reel.json
 *   bun run reel toast detent    # just these
 *   bun run reel --build         # build first (needed after any source change)
 *   bun run reel --min 14        # record at least this many seconds (default 12)
 *   bun run reel --passes 2      # ...and at least this many passes of the choreography
 *
 * The camera is the one the share images use, pointed at a set that PLAYS, and it shoots
 * the way a film camera does rather than the way a screen recorder does: one frame at a
 * time, with the page's clock in its hand. Chrome's virtual time is paused, advanced by
 * exactly one thirtieth of a second, and photographed at a device scale of 2, so every
 * frame is sharp, every timer and CSS transition in the specimen lands where its author
 * put it, and the recording is the same to the frame every time it is made. A screencast
 * could do none of that: it is capped at CSS pixels, and it drops and repeats frames as
 * the machine pleases.
 *
 * Second zero of every clip is the moment attract took the stage, so a clip opens on the
 * first pass, and `passes` lists when each pass ended in clip seconds, which is what lets
 * the edit show a specimen mid-demonstration rather than mid-cursor-approach.
 *
 * Reduced motion is NOT emulated here, deliberately: the stills want a demo in its end
 * state, the footage wants the demonstration itself.
 */

const DIST = 'dist';
const OUT = 'video/public/clips';
const MANIFEST = 'video/clips.json';
const CONFIG = 'video/reel.json';
const PORT = 4324;
/** The specimen's authored width, and room under it for the strip. */
const VIEWPORT = { width: 720, height: 400 };
const SCALE = 2;
const FPS = 30;
const STEP_MS = 1000 / FPS;
const READY_MS = 30_000;

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string, fallback: number) => {
  const at = args.indexOf(`--${name}`);
  const value = at >= 0 ? Number(args[at + 1]) : Number.NaN;
  return Number.isFinite(value) ? value : fallback;
};
const only = args.filter((arg, i) => !arg.startsWith('--') && !(i > 0 && ['--min', '--passes'].includes(args[i - 1] ?? '')));
const minSeconds = option('min', 12);
const minPasses = option('passes', 1);
const maxSeconds = 30;

if (flag('build')) {
  console.log('building');
  const build = Bun.spawn(['bun', 'run', 'build:nosearch'], { stdout: 'inherit', stderr: 'inherit' });
  if ((await build.exited) !== 0) throw new Error('the build failed, so there is nothing to record');
}

interface ReelConfig {
  cast: string[];
  open: string;
  linked: { slug: string };
  agent: string;
}

interface Term {
  slug: string;
  name: string;
  definition: string;
  aliases?: { name: string }[];
}

interface Clip {
  name: string;
  definition: string;
  aliases: string[];
  /** Where the stage body ends in the 1440x800 frame; below it are the strip and bare page. */
  height: number;
  /** Seconds of footage, from the start of attract. */
  duration: number;
  /** When each pass of the choreography ended, in clip seconds. */
  passes: number[];
  /** When each click landed in the specimen, in clip seconds: the moments a slot aims at. */
  clicks: number[];
}

interface Manifest {
  /** How many terms the site has, for the video to say. */
  terms: number;
  /** The first lines of the agent beat's markdown page. */
  agent: { slug: string; lines: string[] };
  clips: Record<string, Clip>;
}

const reels = 'dist/reel';
if (!(await stat(join(reels)).catch(() => undefined))) {
  throw new Error(`no reel pages in ${reels}: run \`bun run build:nosearch\` first, or pass --build`);
}

const config = (await Bun.file(CONFIG).json()) as ReelConfig;
const terms = ((await Bun.file(join(DIST, 'terms.json')).json()) as { terms: Term[] }).terms;
const bySlug = new Map(terms.map((term) => [term.slug, term]));

const available = new Set((await readdir(reels)).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5)));
const wanted = only.length > 0 ? only : [...new Set([config.open, ...config.cast, config.linked.slug, config.agent])];
const missing = wanted.filter((slug) => !available.has(slug));
if (missing.length > 0) throw new Error(`no reel page for: ${missing.join(', ')}`);

async function resolve(pathname: string): Promise<string | undefined> {
  const path = join(DIST, decodeURIComponent(pathname));
  for (const candidate of [path, `${path}.html`, join(path, 'index.html')]) {
    if ((await stat(candidate).catch(() => undefined))?.isFile()) return candidate;
  }
  return undefined;
}

const server = Bun.serve({
  port: PORT,
  async fetch(request) {
    const file = await resolve(new URL(request.url).pathname);
    return file ? new Response(Bun.file(file)) : new Response('not found', { status: 404 });
  },
});

await mkdir(OUT, { recursive: true });
const scratch = join(OUT, '.frames');
await rm(scratch, { recursive: true, force: true });
await mkdir(scratch, { recursive: true });

const existing = (await Bun.file(MANIFEST)
  .json()
  .catch(() => undefined)) as Manifest | undefined;
const manifest: Manifest = {
  terms: terms.length,
  agent: { slug: config.agent, lines: [] },
  clips: only.length > 0 ? (existing?.clips ?? {}) : {},
};

// The page opens with its frontmatter, which is for a parser; the terminal shows the
// prose that follows it, which is for a reader.
const agentPage = (await Bun.file(join(DIST, `${config.agent}.md`)).text()).split('\n');
const body = agentPage[0] === '---' ? agentPage.slice(agentPage.indexOf('---', 1) + 1) : agentPage;
manifest.agent.lines = body.join('\n').trim().split('\n').slice(0, 12);

async function encode(frames: string, mp4: string): Promise<void> {
  const proc = Bun.spawn(
    [
      'ffmpeg',
      '-v',
      'error',
      '-y',
      '-framerate',
      `${FPS}`,
      '-i',
      join(frames, 'f-%05d.jpg'),
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '17',
      '-pix_fmt',
      'yuv420p',
      mp4,
    ],
    { stdout: 'inherit', stderr: 'inherit' },
  );
  if ((await proc.exited) !== 0) throw new Error(`ffmpeg failed on ${frames}`);
}

// Compositor-thread animations are off. A pending CSS transition waits for the compositor
// to hand it a start time whenever a composited animation (the ghost cursor's travel) is
// in flight at the same moment, and under virtual time that start time arrives stale, so
// the transition is already over when it lands: sliding-indicator's 220 ms slide snapped.
// On the main thread every start time comes from the same virtual clock as the frames.
const browser = await chromium.launch({ args: ['--disable-threaded-animation'] });
const failures: string[] = [];
const started = Bun.nanoseconds();

console.log(
  `recording ${wanted.length} clip(s) at ${VIEWPORT.width * SCALE}x${VIEWPORT.height * SCALE}, ${minSeconds}s and ${minPasses} pass(es) at least`,
);

for (const slug of wanted) {
  const term = bySlug.get(slug);
  if (!term) {
    failures.push(`${slug}: not in terms.json`);
    continue;
  }
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE, colorScheme: 'dark' });
  const page = await context.newPage();
  const frames = join(scratch, slug);
  await mkdir(frames, { recursive: true });
  let frame = 0;
  const passes: number[] = [];
  const clicks: number[] = [];
  try {
    await page.exposeFunction('__reelPass', () => passes.push(frame));
    await page.exposeFunction('__reelClick', () => clicks.push(frame));
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('vd-stage')?.addEventListener('vd-pass', () => {
          (window as unknown as { __reelPass: () => void }).__reelPass();
        });
      });
    });
    const cdp = await context.newCDPSession(page);
    const advance = async (ms: number) => {
      const expired = new Promise<void>((resolve) => cdp.once('Emulation.virtualTimeBudgetExpired', () => resolve()));
      await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: ms });
      await expired;
    };
    await page.goto(`http://localhost:${PORT}/reel/${slug}`, { waitUntil: 'load' });
    // The specimen mounts in real time, because a framed one (`demo: iframe`) is a second
    // document whose load the paused clock would otherwise hold up, and a screenshot waits
    // on every frame in the page. From the mount on, the page's time is ours: the reel page
    // holds the stage until the specimen's faces are in, then lets go, and the moment
    // attract takes over is frame zero.
    await page.waitForFunction(() => !!(document.querySelector('vd-stage') as { specimenRoot?: unknown } | null)?.specimenRoot, undefined, {
      timeout: READY_MS,
    });
    // Every declared face is fetched now, in real time. `@font-face` is lazy, so a face a
    // demo only sets mid-choreography (neon-glow's sign) would otherwise be fetched under
    // the paused clock, and a capture that waits on that fetch never returns.
    await page.evaluate(() => Promise.all([...document.fonts].map((face) => face.load().catch(() => undefined))));
    // A click is where a demonstration happens, so the edit is told when each one landed.
    // The listener sits on the stage's shadow root: the player's click bubbles but is not
    // composed, so the document never hears it, and the mount root under the shadow root
    // is replaced every time attract remounts. A framed specimen logs none.
    await page.evaluate(() => {
      const shadow = [...document.querySelectorAll('vd-stage *')].find((el) => el.shadowRoot)?.shadowRoot;
      shadow?.addEventListener('click', () => (window as unknown as { __reelClick: () => void }).__reelClick());
    });
    await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
    for (let waited = 0; !(await page.$('vd-stage[data-state="attract"]')); waited += 50) {
      if (waited > READY_MS) throw new Error('attract never started');
      await advance(50);
    }
    // The edit shows the specimen and nothing under it: the strip (a mode switch, a
    // verdict) is the exhibit's own row and stays out of the picture, so the clip is cut
    // at the stage body's bottom edge, which the edit is told rather than left to guess.
    const height = await page.evaluate(() =>
      Math.ceil(document.querySelector('vd-stage .vd-stage-body')?.getBoundingClientRect().bottom ?? 400),
    );
    const total = Math.round(maxSeconds * FPS);
    for (frame = 0; frame < total; frame++) {
      const seconds = frame / FPS;
      if (seconds >= minSeconds && passes.length >= minPasses) break;
      // The shutter is CDP's own capture rather than Playwright's screenshot, which
      // wraps it in waits (fonts, stability, a caret pass) that a paused clock can hold
      // up on some specimens. Under virtual time nothing else is moving anyway. The clip
      // is what makes the frame 2x: a bare capture comes back at CSS size whatever the
      // context's device scale says. And the frame is JPEG because PNG is the deadlock: a
      // PNG capture now and then never returns (neon-glow every time, others once a clip
      // is asked for) and virtual time stops with it, while JPEG at this quality never has.
      // A capture now and then never answers: the budget ran out with a compositor frame
      // pending, and the capture waits on a frame the paused clock will not deliver. Letting
      // one display frame's worth of time through gets it, and that sixtieth of a second is
      // taken off the next step, so the clip's timeline is not moved by it.
      let shot: { data: string } | undefined;
      let debt = 0;
      for (let attempt = 0; !shot; attempt++) {
        shot = await Promise.race([
          cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 95, clip: { x: 0, y: 0, ...VIEWPORT, scale: SCALE } }),
          new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 3_000)),
        ]);
        if (shot) break;
        if (attempt >= 3) throw new Error(`frame ${frame} never rendered`);
        await advance(1000 / 60);
        debt += 1000 / 60;
      }
      await Bun.write(join(frames, `f-${String(frame).padStart(5, '0')}.jpg`), Buffer.from(shot.data, 'base64'));
      await advance(Math.max(1, STEP_MS - debt));
    }
    await context.close();
    const mp4 = join(OUT, `${slug}.mp4`);
    await encode(frames, mp4);
    await rm(frames, { recursive: true, force: true });
    manifest.clips[slug] = {
      name: term.name,
      definition: term.definition,
      aliases: (term.aliases ?? []).map((alias) => alias.name),
      height: Math.min(VIEWPORT.height, height) * SCALE,
      duration: Number((frame / FPS).toFixed(2)),
      passes: passes.map((at) => Number((at / FPS).toFixed(2))),
      clicks: clicks.map((at) => Number((at / FPS).toFixed(2))),
    };
    const { duration, passes: ends, clicks: hits } = manifest.clips[slug];
    console.log(`  ${slug}: ${duration}s, passes at ${ends.join(', ') || 'none'}, clicks at ${hits.join(', ') || 'none'}`);
  } catch (error) {
    await context.close().catch(() => undefined);
    failures.push(`${slug}: ${error instanceof Error ? error.message.split('\n')[0] : String(error)}`);
  }
}

await browser.close();
server.stop(true);
await rm(scratch, { recursive: true, force: true });
await Bun.write(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

const seconds = ((Bun.nanoseconds() - started) / 1e9).toFixed(1);
console.log(`\n${Object.keys(manifest.clips).length} clip(s) in ${seconds}s, manifest in ${MANIFEST}`);
if (failures.length > 0) {
  console.error(`\n${failures.length} failed:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
