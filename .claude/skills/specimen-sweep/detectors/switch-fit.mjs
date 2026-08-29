// Does the axis legend push a comparison switch out of its container? The legend is
// drawn from `data-axis` INSIDE the pill, so every switch that gains one gets wider, and
// the stage body clips (SPEC §5): an overflowing pill is silently amputated rather than
// merely ugly. This is the one risk of the unkeyed-switch sweep that no static gate and
// no choreography can see.
//
//   node .claude/skills/specimen-sweep/detectors/switch-fit.mjs [--slugs=a,b]
//
// Measures in SPECIMEN pixels, never page pixels. The stage scales the whole 720x320
// picture to fit its column, so a client rect is in the page's space while a written
// length is in the demo's; `offsetWidth`/`offsetLeft` are already specimen pixels and a
// ratio of an element against its own offsetParent is scale-free (SPEC §5). Measuring
// the stage body's client rect instead reports width 0, because the body is not the box
// it looks like.
//
// BLIND SPOT: a `demo: iframe` specimen keeps its markup in a frame document rather than
// in the stage canvas's shadow root, so the wait below never resolves and the specimen
// reports `probe-failed` on a timeout. That is the probe failing, not the specimen: check
// those by hand through the frame. `route-announcement` is the known case.
//
// A `fits` verdict is also only ever about the state the specimen MOUNTS in. A control
// sized for its mount state can still clip in a state the switch reaches, and SPEC §5 asks
// for the widest state, so a narrow readout beside a switch still wants an eye.
//
// Output: `slug<TAB>verdict<TAB>evidence`
//   clipped   the pill needs more room than its container has: FIX
//   tight     under 12 specimen px of slack, so a longer axis word would clip
//   fits      room to spare
import { readdirSync, readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4321';
const DEMOS = 'src/content/demos';
const CONCURRENCY = 6;
const TIGHT_PX = 12;

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

const slugs = [];
for (const slug of readdirSync(DEMOS).sort()) {
  if (only && !only.includes(slug)) continue;
  let demo;
  try {
    demo = readFileSync(`${DEMOS}/${slug}/demo.ts`, 'utf8');
  } catch {
    continue;
  }
  if (demo.replace(/\/\*[\s\S]*?\*\//g, ' ').includes('<sp-segmented')) slugs.push(slug);
}
console.error(`${slugs.length} specimens to probe`);

const browser = await chromium.launch();
// Reduced motion so the thumb is not mid-slide when the pill is measured, and so a demo
// that animates has already jumped to its end state.
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 720 } });

const measure = (TIGHT_PX) => {
  const canvas = document.querySelector('[data-stage-canvas]');
  const root = canvas && canvas.shadowRoot;
  if (!root) return [{ verdict: 'no-root', evidence: 'stage canvas has no shadow root' }];
  const controls = [...root.querySelectorAll('sp-segmented')];
  if (!controls.length) return [{ verdict: 'no-switch', evidence: 'no sp-segmented on stage' }];
  return controls.map((seg) => {
    const axis = seg.dataset.axis || '';
    // Ask the boxes themselves whether they overflow rather than doing coordinate
    // arithmetic: offsetLeft is measured against the offsetParent, so comparing it with
    // some OTHER ancestor's clientWidth mixes two origins and invents overflow that is
    // not there. scrollWidth vs clientWidth is the same question with no origins in it.
    let worst = null;
    for (let host = seg.parentElement; host; host = host.parentElement) {
      if (!host.clientWidth) continue;
      const over = host.scrollWidth - host.clientWidth;
      if (over > 1 && (!worst || over > worst.over)) {
        worst = { over, host: host.className || host.tagName, box: host.clientWidth };
      }
      if (host.hasAttribute('data-stage-canvas')) break;
    }
    // Slack is only meaningful against the pill's own row, which is its offsetParent's
    // content box; that is one origin, so the arithmetic is honest.
    const parent = seg.offsetParent;
    const slack = parent ? parent.clientWidth - (seg.offsetLeft + seg.offsetWidth) : null;
    if (worst) {
      return { axis, verdict: 'clipped', evidence: `${worst.host} overflows by ${worst.over}px (box ${worst.box}px); pill=${seg.offsetWidth}px` };
    }
    if (slack !== null && slack < TIGHT_PX) {
      return { axis, verdict: 'tight', evidence: `slack=${Math.round(slack)}px in its row; pill=${seg.offsetWidth}px` };
    }
    return { axis, verdict: 'fits', evidence: `slack=${slack === null ? '?' : Math.round(slack)}px; pill=${seg.offsetWidth}px` };
  });
};

let clipped = 0;
let tight = 0;
let other = 0;
const queue = [...slugs];
const workers = Array.from({ length: CONCURRENCY }, async () => {
  const page = await context.newPage();
  for (;;) {
    const slug = queue.shift();
    if (!slug) break;
    try {
      await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForFunction(
        () => {
          const c = document.querySelector('[data-stage-canvas]');
          return !!(c && c.shadowRoot && c.shadowRoot.querySelector('sp-segmented'));
        },
        { timeout: 15000 },
      );
      for (const row of await page.evaluate(measure, TIGHT_PX)) {
        if (row.verdict === 'clipped') clipped++;
        else if (row.verdict === 'tight') tight++;
        else if (row.verdict !== 'fits') other++;
        if (row.verdict !== 'fits') console.log(`${slug}\t${row.verdict}\taxis="${row.axis ?? ''}"; ${row.evidence}`);
      }
    } catch (error) {
      other++;
      console.log(`${slug}\tprobe-failed\t${String(error).split('\n')[0]}`);
    }
  }
  await page.close();
});
await Promise.all(workers);
await browser.close();
console.error(`\n${clipped} clipped, ${tight} tight (<${TIGHT_PX}px slack), ${other} unmeasured`);
