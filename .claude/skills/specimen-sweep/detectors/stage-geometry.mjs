// Geometry auditor: overflow, clipping, wrapping, overlap, and incidental layout
// shift, measured live while each specimen plays its own choreography.
//
// Unlike the other detectors this one needs a real browser:
//
//   node .claude/skills/specimen-sweep/detectors/stage-geometry.mjs [flags]
//
//   --base-url=http://localhost:4322   audit an already-running server (skips build+preview)
//   --no-build                         preview the existing dist/ instead of rebuilding
//   --slugs=a,b,c                      audit a subset
//
// Default: builds the site and previews it on 4323 itself (ASTRO_PREVIEW_BACKGROUND=1,
// the documented opt-out of Astro's agentic auto-backgrounding).
//
// Output: one `slug<TAB>check<TAB>evidence` line per persistent finding, recall-tuned.
// Checks, sampled every ~220ms across a full stage.audit() play:
//   escape        a painted element leaves the stage clip box (the stage body, or the frame)
//   spill-x/-y    a container's content exceeds its box and it is not a designed scroller
//   wrap          a single-line kit control (.sp-button/.sp-chip/.sp-tab) folded to two lines
//   wrap-row      a flex-wrap row actually broke onto multiple lines
//   overlap       two content-bearing elements intersect substantially
//   layout-shift  a data-part moved or resized between stable states with no state change
//                 of its own (attributes and ancestor attributes unchanged)
// A finding must persist across consecutive samples (2; overlap 4) so transition
// transients drop out. Judges filter what remains: badges, overlays, marquees, and
// designed truncation are legitimate geometry this cannot know about.

import { execSync, spawn } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { chromium } from '@playwright/test';
import { parse } from 'yaml';

const PORT = 4323;
const CONCURRENCY = 6;
const INTERVAL_MS = 220;
const MAX_SAMPLES = 300;
const MIN_STREAK = 2;
const OVERLAP_STREAK = 4;

const args = new Map(process.argv.slice(2).map((a) => (a.includes('=') ? a.split(/=(.*)/s, 2) : [a, true])));
const baseUrl = typeof args.get('--base-url') === 'string' ? args.get('--base-url').replace(/\/$/, '') : null;
const only = typeof args.get('--slugs') === 'string' ? new Set(args.get('--slugs').split(',')) : null;

function specimens() {
  const found = [];
  for (const file of readdirSync('src/content/terms').sort()) {
    if (!file.endsWith('.mdx')) continue;
    const frontmatter = readFileSync(join('src/content/terms', file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1];
    if (!frontmatter) continue;
    const data = parse(frontmatter);
    if (!data?.name || !data.demo || data.demo === 'none') continue;
    const slug = basename(file, '.mdx');
    if (only && !only.has(slug)) continue;
    found.push(slug);
  }
  return found;
}

async function waitFor(url, ms) {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`no server at ${url} (a stray \`astro preview\` holds the global lock? run \`bunx astro preview stop\`)`);
}

/** Runs inside the page for one specimen; returns [check, evidence] rows. */
async function probe({ interval, maxSamples, minStreak, overlapStreak }) {
  const stage = document.querySelector('vd-stage');
  if (!stage?.specimenRoot) return [['probe-error', 'no specimen root']];

  const isSvgInternal = (el) => el.namespaceURI === 'http://www.w3.org/2000/svg' && el.tagName.toLowerCase() !== 'svg';
  const REPLACED = new Set(['svg', 'img', 'input', 'textarea', 'select', 'canvas', 'video']);
  const directText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());

  const painted = (el, cs) => {
    if (directText(el) || REPLACED.has(el.tagName.toLowerCase())) return true;
    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') return true;
    if (cs.backgroundImage !== 'none' || cs.boxShadow !== 'none') return true;
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      if (cs[`border${side}Style`] !== 'none' && parseFloat(cs[`border${side}Width`]) > 0) return true;
    }
    return false;
  };

  const visibleNow = (el) => {
    try {
      return el.checkVisibility
        ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, opacityProperty: true, visibilityProperty: true })
        : true;
    } catch {
      return true;
    }
  };

  const intersect = (a, b) => {
    const left = Math.max(a.left, b.left);
    const top = Math.max(a.top, b.top);
    const right = Math.min(a.right, b.right);
    const bottom = Math.min(a.bottom, b.bottom);
    return right - left > 0 && bottom - top > 0 ? { left, top, right, bottom } : null;
  };

  const desc = (el, cs) => {
    const abs = cs && (cs.position === 'absolute' || cs.position === 'fixed') ? '~abs' : '';
    const part = el.getAttribute?.('data-part');
    if (part) return `[${part}]${abs}`;
    const cls = [...el.classList].slice(0, 2).map((c) => `.${c}`).join('');
    const txt = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24);
    const home = el.closest('[data-part]');
    const at = home && home !== el ? ` in [${home.getAttribute('data-part')}]` : '';
    return `${el.tagName.toLowerCase()}${cls}${txt ? ` "${txt}"` : ''}${at}${abs}`;
  };

  const findings = new Map();
  const hit = (sample, key, evidence, need) => {
    const f = findings.get(key) ?? { streak: 0, best: 0, last: -2, evidence, need };
    f.streak = f.last === sample - 1 ? f.streak + 1 : 1;
    if (f.streak > f.best) f.best = f.streak;
    f.last = sample;
    f.evidence = evidence;
    findings.set(key, f);
  };

  const history = new Map();

  const takeSample = (sample) => {
    const root = stage.specimenRoot;
    if (!root) return;
    const doc = root.ownerDocument;
    const win = doc.defaultView;
    const framed = doc !== document;
    const clip = framed
      ? { left: 0, top: 0, right: doc.documentElement.clientWidth, bottom: doc.documentElement.clientHeight }
      : (() => {
          const r = stage.querySelector('.vd-stage-body').getBoundingClientRect();
          return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
        })();

    // Effective visible rect: the element's box run through every clipping ancestor.
    const clippedRect = (el, rect) => {
      let box = { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
      for (let p = el.parentElement; p && box; p = p.parentElement) {
        const cs = win.getComputedStyle(p);
        const cx = cs.overflowX !== 'visible';
        const cy = cs.overflowY !== 'visible';
        if (cx || cy) {
          const pr = p.getBoundingClientRect();
          box = intersect(box, {
            left: cx ? pr.left : -1e9,
            right: cx ? pr.right : 1e9,
            top: cy ? pr.top : -1e9,
            bottom: cy ? pr.bottom : 1e9,
          });
        }
        if (p === root) break;
      }
      return box;
    };

    const partSeen = new Map();
    const candidates = [];

    for (const el of root.querySelectorAll('*')) {
      if (isSvgInternal(el)) continue;
      const rect = el.getBoundingClientRect();
      const cs = win.getComputedStyle(el);
      const seen = rect.width > 0 && rect.height > 0 && visibleNow(el);

      if (seen) {
        const vis = clippedRect(el, rect);
        if (vis && painted(el, cs)) {
          const out = Math.max(clip.left - vis.left, vis.right - clip.right, clip.top - vis.top, vis.bottom - clip.bottom);
          if (out > 1.5) hit(sample, `escape|${desc(el)}`, `escapes the stage clip by ${Math.round(out)}px: ${desc(el, cs)}`, minStreak);
          if (directText(el) || REPLACED.has(el.tagName.toLowerCase())) candidates.push({ el, cs, vis });
        }
      }

      // Spills are layout truth whether or not the element paints.
      if (el instanceof win.HTMLElement && el.clientWidth > 0) {
        const sx = el.scrollWidth - el.clientWidth;
        const sy = el.scrollHeight - el.clientHeight;
        const scrollerX = cs.overflowX === 'auto' || cs.overflowX === 'scroll';
        const scrollerY = cs.overflowY === 'auto' || cs.overflowY === 'scroll';
        const ellipsed = cs.textOverflow === 'ellipsis' && cs.whiteSpace === 'nowrap';
        if (sx > 2 && !scrollerX && !ellipsed)
          hit(sample, `spill-x|${desc(el)}`, `${el.scrollWidth}px of content in a ${el.clientWidth}px box (overflow-x ${cs.overflowX}): ${desc(el)}`, minStreak);
        if (sy > 2 && !scrollerY)
          hit(sample, `spill-y|${desc(el)}`, `${el.scrollHeight}px of content in a ${el.clientHeight}px box (overflow-y ${cs.overflowY}): ${desc(el)}`, minStreak);
      }

      // Single-line controls only: a flex-column button is a designed stack, not a fold.
      if (seen && el.matches('.sp-button, .sp-chip, .sp-tab') && !(cs.display.includes('flex') && cs.flexDirection.startsWith('column'))) {
        const lh = parseFloat(cs.lineHeight) || 1.4 * parseFloat(cs.fontSize);
        const inner =
          rect.height -
          parseFloat(cs.paddingTop) -
          parseFloat(cs.paddingBottom) -
          parseFloat(cs.borderTopWidth) -
          parseFloat(cs.borderBottomWidth);
        if (inner > lh * 1.7) hit(sample, `wrap|${desc(el)}`, `single-line control folded: ${Math.round(inner)}px content vs ${Math.round(lh)}px line: ${desc(el)}`, minStreak);
      }

      if (seen && cs.display.includes('flex') && cs.flexWrap === 'wrap' && cs.flexDirection.startsWith('row') && el.children.length > 1) {
        const boxes = [...el.children]
          .map((c) => c.getBoundingClientRect())
          .filter((r) => r.width > 0 && r.height > 0)
          .sort((a, b) => a.top - b.top);
        let rows = 0;
        let bandBottom = -1e9;
        for (const r of boxes) {
          if (r.top > bandBottom - 2) {
            rows++;
            bandBottom = r.bottom;
          } else bandBottom = Math.max(bandBottom, r.bottom);
        }
        if (rows > 1) hit(sample, `wrap-row|${desc(el)}`, `flex row broke onto ${rows} lines: ${desc(el)}`, minStreak);
      }

      const partName = el.getAttribute('data-part');
      if (partName) {
        const nth = (partSeen.get(partName) ?? 0) + 1;
        partSeen.set(partName, nth);
        const key = nth === 1 ? partName : `${partName}#${nth}`;
        // The part's own text is part of its state: a readout that resized because its
        // words changed is not an incidental shift.
        let sig = `t=${(el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)};`;
        for (let n = el; n; n = n.parentElement) {
          sig += n.tagName;
          for (const a of n.attributes) sig += `|${a.name}=${a.value}`;
          if (n instanceof win.HTMLElement) sig += `|s${Math.round(n.scrollTop)},${Math.round(n.scrollLeft)}`;
          sig += ';';
          if (n === root) break;
        }
        const rootRect = root.getBoundingClientRect();
        const r = [rect.left - rootRect.left, rect.top - rootRect.top, rect.width, rect.height].map((v) => Math.round(v * 2) / 2);
        if (!history.has(key)) history.set(key, []);
        history.get(key).push({ r, sig });
      }
    }

    // Overlap between content-bearing elements, neither containing the other.
    for (let i = 0; i < candidates.length && i < 120; i++) {
      for (let j = i + 1; j < candidates.length && j < 120; j++) {
        const a = candidates[i];
        const b = candidates[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        const x = intersect(a.vis, b.vis);
        if (!x) continue;
        const area = (x.right - x.left) * (x.bottom - x.top);
        const min = Math.min(
          (a.vis.right - a.vis.left) * (a.vis.bottom - a.vis.top),
          (b.vis.right - b.vis.left) * (b.vis.bottom - b.vis.top),
        );
        if (area > 20 && area > 0.25 * min) {
          const pair = [desc(a.el, a.cs), desc(b.el, b.cs)].sort();
          hit(sample, `overlap|${pair[0]}|${pair[1]}`, `${pair[0]} overlaps ${pair[1]} by ${Math.round(area)}px2`, overlapStreak);
        }
      }
    }
  };

  let done = false;
  stage
    .audit()
    .catch(() => {})
    .then(() => {
      done = true;
    });
  let sample = 0;
  while (!done && sample < maxSamples) {
    takeSample(sample++);
    await new Promise((r) => setTimeout(r, interval));
  }
  takeSample(sample++);

  const rows = [];
  for (const [key, f] of findings) if (f.best >= f.need) rows.push([key.split('|')[0], f.evidence]);

  // Layout shift: stable runs of a part's rect, grouped by full-ancestry signature;
  // two stable runs with the same signature and different rects mean something else
  // moved this part.
  for (const [part, samples] of history) {
    const runs = [];
    for (const s of samples) {
      const last = runs[runs.length - 1];
      if (last && last.sig === s.sig && last.r.every((v, i) => Math.abs(v - s.r[i]) <= 1)) last.len++;
      else runs.push({ sig: s.sig, r: s.r, len: 1 });
    }
    const bySig = new Map();
    for (const run of runs.filter((r) => r.len >= 2)) {
      const prev = bySig.get(run.sig);
      // Sub-3px movement is animation wobble and rounding, not a shift a reader sees.
      if (prev && run.r.some((v, i) => Math.abs(v - prev.r[i]) >= 3)) {
        const [dx, dy, dw, dh] = run.r.map((v, i) => Math.round(v - prev.r[i]));
        const moved = dx || dy ? `moved ${dx},${dy}px` : '';
        const grew = dw || dh ? `resized ${dw},${dh}px` : '';
        rows.push(['layout-shift', `[${part}] ${[moved, grew].filter(Boolean).join(' and ')} with no state change of its own`]);
        break;
      }
      bySig.set(run.sig, run);
    }
  }
  return rows.slice(0, 40);
}

const slugs = specimens();
if (!slugs.length) {
  console.error('no specimens matched');
  process.exit(1);
}

let server = null;
let url = baseUrl;
if (!url) {
  if (!args.get('--no-build')) {
    console.error('building...');
    execSync('bunx astro build', { stdio: ['ignore', 'inherit', 'inherit'] });
  }
  server = spawn(`bunx astro preview --port ${PORT}`, {
    shell: true,
    env: { ...process.env, ASTRO_PREVIEW_BACKGROUND: '1' },
    // stderr stays visible: Astro's preview lock is global, not per-port, so a stray
    // server from any other run refuses this one, and that message is the diagnosis.
    stdio: ['ignore', 'ignore', 'inherit'],
    // Own process group, so teardown can take the shell and astro down together.
    detached: process.platform !== 'win32',
  });
  url = `http://localhost:${PORT}`;
}
// Leaking this server poisons every later preview (see the lock note above), so kill the
// whole group, and do it on the signals a timeout or a Ctrl-C actually sends.
const stopServer = () => {
  if (!server) return;
  const { pid } = server;
  server = null;
  try {
    if (process.platform === 'win32') execSync(`taskkill /pid ${pid} /T /F`, { stdio: 'ignore' });
    else process.kill(-pid, 'SIGTERM');
  } catch {}
};
process.on('exit', stopServer);
for (const [signal, code] of [
  ['SIGINT', 130],
  ['SIGTERM', 143],
  ['SIGHUP', 129],
])
  process.on(signal, () => process.exit(code));

await waitFor(`${url}/`, 90_000);

const browser = await chromium.launch();
const rows = [];
let doneCount = 0;
const queue = [...slugs];

async function worker() {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  while (queue.length) {
    const slug = queue.shift();
    try {
      const response = await page.goto(`${url}/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()} for /${slug} (trailingSlash is 'never')`);
      await page.waitForFunction(() => !!document.querySelector('vd-stage')?.specimenRoot, null, { timeout: 20_000 });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => document.querySelector('vd-stage iframe')?.contentDocument?.fonts.ready);
      const found = await page.evaluate(probe, {
        interval: INTERVAL_MS,
        maxSamples: MAX_SAMPLES,
        minStreak: MIN_STREAK,
        overlapStreak: OVERLAP_STREAK,
      });
      for (const [check, evidence] of found) rows.push([slug, check, evidence]);
    } catch (error) {
      rows.push([slug, 'probe-error', String(error).replace(/\s+/g, ' ').slice(0, 120)]);
    }
    doneCount++;
    if (doneCount % 50 === 0) console.error(`...${doneCount}/${slugs.length}`);
  }
  await page.close();
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, slugs.length) }, worker));
await browser.close();
stopServer();

rows.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
for (const row of rows) console.log(row.join('\t'));

const byCheck = new Map();
const bySlug = new Set();
for (const [slug, check] of rows) {
  byCheck.set(check, (byCheck.get(check) ?? 0) + 1);
  bySlug.add(slug);
}
console.error(`\n${bySlug.size}/${slugs.length} specimens flagged`);
for (const [check, n] of [...byCheck].sort((a, b) => b[1] - a[1])) console.error(`  ${check}: ${n}`);
