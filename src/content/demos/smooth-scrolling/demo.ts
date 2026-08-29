import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const GLIDE_MS = 520;
/** How often the trip is redrawn. The clock speaks milliseconds, so the step is stated. */
const TICK_MS = 16;
/** Room left above a heading when it comes to rest, the demo's own scroll-margin. */
const MARGIN = 10;

const SECTIONS = [
  { id: 'tides', name: 'Tides' },
  { id: 'harbour', name: 'Harbour' },
  { id: 'anchorages', name: 'Anchorages' },
  { id: 'lights', name: 'Lights' },
];

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Smooth scrolling specimen: a contents list beside the panel it scrolls. Picking a
 * heading walks the panel's `scrollTop` to that heading over half a second instead of
 * assigning it in one frame, so the reader sees which way the document went and how far.
 * The Instant setting does the same navigation as a cut, which is the comparison the term
 * lives on.
 *
 * The subject is the gliding scroller, not the whole scene: the term names what the panel
 * does with a jump, and the contents list, the readout, and the setting are scenery around
 * it. Marking the frame would claim the contents list is part of the term and withdraw
 * identify (SPEC §5-6).
 *
 * The trip is walked on the stage's clock, a slice at a time, for the reason the attract
 * player walks its own scrolls: `scroll-behavior: smooth` is a no-op in some embedded
 * browsers and is off entirely under reduced motion, so a demo built on it could silently
 * do nothing. Because the animation is scripted, `motion.css` cannot reach it, and the demo
 * asks `prefersReducedMotion` itself and lands the destination immediately (SPEC §5). Every
 * link resolves to an absolute heading rather than stepping from wherever the panel is
 * (SPEC §8), and a trip already in flight is cancelled before another starts.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const links = SECTIONS.map(
    (section) => `<li><span class="sp-nav-item" role="link" data-part="link-${section.id}">${section.name}</span></li>`,
  ).join('');

  const sections = SECTIONS.map(
    (section) => `
      <section data-part="section-${section.id}" style="padding: 12px 14px 18px">
        <span class="sp-heading" style="font-size: 14px">${section.name}</span>
        <span class="sp-line" style="display: block; width: 92%; margin-top: 12px"></span>
        <span class="sp-line" style="display: block; width: 84%; margin-top: 9px"></span>
        <span class="sp-line" style="display: block; width: 88%; margin-top: 9px"></span>
        <span class="sp-line" style="display: block; width: 66%; margin-top: 9px"></span>
        <span class="sp-swatch" style="display: block; height: 40px; margin-top: 12px; --sp-swatch: var(--sp-accent-soft)"></span>
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Pilot handbook</span>
          <span class="sp-label" data-part="readout">at Tides</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <nav class="sp-context" style="flex: 0 0 124px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${links}</ul>
          </nav>
          <div
            class="sp-scroll"
            data-part="page"
            data-subject
            data-at="tides"
            data-state="idle"
            style="position: relative; flex: 1 1 auto; background: var(--sp-sunken)"
          >
            ${sections}
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Jump" data-part="mode" data-value="glide">
          <button class="sp-segment" data-part="mode-glide" value="glide">Glide</button>
          <button class="sp-segment" data-part="mode-instant" value="instant">Instant</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const readout = part(root, 'readout');
  let trip: number | undefined;
  // The setting is scenery, so it lives here rather than as an attribute on the subject.
  let mode = 'glide';

  const nameOf = (id: string) => SECTIONS.find((section) => section.id === id)?.name ?? '';

  const land = (id: string) => {
    clock.clearTimeout(trip);
    trip = undefined;
    page.dataset.at = id;
    page.dataset.state = 'idle';
    readout.textContent = `at ${nameOf(id)}`;
    for (const section of SECTIONS) {
      const link = part(root, `link-${section.id}`);
      if (section.id === id) link.dataset.current = '';
      else link.removeAttribute('data-current');
    }
  };

  const goTo = (id: string) => {
    const target = Math.max(part(root, `section-${id}`).offsetTop - MARGIN, 0);
    const from = page.scrollTop;
    clock.clearTimeout(trip);

    if (mode === 'instant' || prefersReducedMotion(root)) {
      page.scrollTop = target;
      land(id);
      return;
    }

    page.dataset.state = 'gliding';
    readout.textContent = `travelling to ${nameOf(id)}`;
    const started = performance.now();
    const step = () => {
      const t = Math.min((performance.now() - started) / GLIDE_MS, 1);
      page.scrollTop = from + (target - from) * ease(t);
      if (t < 1) trip = clock.setTimeout(step, TICK_MS);
      else land(id);
    };
    trip = clock.setTimeout(step, TICK_MS);
  };

  for (const section of SECTIONS) {
    part(root, `link-${section.id}`).addEventListener('click', () => goTo(section.id));
  }

  // A trip the reader steers away from is over: the panel follows the gesture, not the link.
  page.addEventListener('wheel', () => {
    if (trip === undefined) return;
    clock.clearTimeout(trip);
    trip = undefined;
    page.dataset.state = 'idle';
    readout.textContent = 'steered away';
  });

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail;
  });

  land('tides');
}
