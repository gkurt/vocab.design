import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const RUN_MS = 1600;
const SAMPLES = 9;
/** The three endpoints, one per animation type: a number, a colour, and a keyword. */
const WIDTH = { from: 96, to: 216 };
const COLOR = { from: [74, 99, 231], to: [190, 88, 58] };
const TILE = 40;
const BAR = { min: 10, max: 34 };

type Mode = 'number' | 'color' | 'keyword';

const at = (i: number) => i / (SAMPLES - 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rgb = (c: number[]) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
/** Per channel: the same blend the engine runs, so a printed sample is the sample beside it. */
const mix = (t: number) => COLOR.from.map((c, i) => Math.round(lerp(c, COLOR.to[i] ?? c, t)));

/**
 * Interpolation specimen: one card animated from one endpoint to the other, with the rule that
 * produces the in-between values laid out underneath as nine samples taken every 12.5%. The
 * segmented control picks the animation type rather than the effect: a number (`width`), a colour
 * (`background-color`), and a keyword (`text-transform`), which is the discrete case and the point
 * of the whole specimen. Four samples read lowercase, five read uppercase, and nothing sits between
 * them, because no letter does.
 *
 * The run is linear on purpose. With linear timing the elapsed fraction is the interpolation
 * progress, so the nine samples are the live card's own values rather than an illustration of them.
 * They are computed here with the same arithmetic the engine uses (per-channel blend, rounded half
 * up, and the discrete switch at exactly 50%), which was read back out of a browser rather than
 * assumed.
 *
 * The subject is the card being interpolated. Every mode is an honest one, since a discrete switch
 * is interpolation doing its job rather than failing at it, so no `data-pose` is needed. The
 * segmented control, the sample track and the readout are the scene.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and lands on the end value with no run at all. The lane holds the
 * card's largest size from mount and the track never changes size, so a width that grows moves
 * nothing (SPEC §5), and the settle beat comes from the stage's clock so a pose stops the run
 * where it stands. The readout is cut for the two lines its longest claim takes (the colour
 * endpoints, which are the wordiest), not for the one line the number mode fits in.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const tile = (i: number) => `
    <span
      data-part="tile-${i + 1}"
      style="position: relative; display: flex; align-items: flex-end; justify-content: center; flex: 0 0 auto;
             width: ${TILE}px; height: ${TILE}px; border: 1px solid var(--sp-line); border-radius: 5px;
             background: var(--sp-surface); overflow: hidden"
    >
      <span
        data-part="bar-${i + 1}"
        style="width: 18px; height: ${BAR.min}px; border-radius: 3px 3px 0 0; background: var(--sp-accent)"
      ></span>
      <span
        data-part="glyph-${i + 1}"
        hidden
        style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
               font-size: 17px; font-weight: 600"
      >a</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="number" data-state="rested" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Property</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Value type" data-part="mode" data-value="number">
            <button class="sp-segment" type="button" data-part="seg-number" value="number">Number</button>
            <button class="sp-segment" type="button" data-part="seg-color" value="color">Colour</button>
            <button class="sp-segment" type="button" data-part="seg-keyword" value="keyword">Keyword</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div data-part="lane" style="position: relative; width: 400px; height: 52px">
            <div
              data-part="card"
              data-subject
              style="position: absolute; left: 0; top: 4px; display: flex; align-items: center; width: ${WIDTH.to}px;
                     height: 44px; padding: 0 14px; border-radius: 8px; background: var(--sp-accent); color: var(--sp-accent-ink);
                     font-size: 15px; font-weight: 600; letter-spacing: 0.01em; white-space: nowrap; overflow: hidden"
            >handoff</div>
          </div>

          <div class="sp-stack sp-context" style="gap: 4px; width: 400px">
            <div class="sp-row" data-part="track" style="gap: 5px">
              ${Array.from({ length: SAMPLES }, (_, i) => tile(i)).join('')}
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label" style="font-size: 11px">0%</span>
              <span class="sp-label" style="font-size: 11px">50%</span>
              <span class="sp-label" style="font-size: 11px">100%</span>
            </div>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 2px; width: 400px; height: 56px">
            <span class="sp-label" data-part="property" style="font-size: 11px">width</span>
            <span class="sp-text sp-text--ink" data-part="claim" style="font-size: 12px; line-height: 1.35">A number has a halfway.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const card = part(root, 'card');
  const property = part(root, 'property');
  const claim = part(root, 'claim');
  const tiles = Array.from({ length: SAMPLES }, (_, i) => ({
    box: part(root, `tile-${i + 1}`),
    bar: part(root, `bar-${i + 1}`),
    glyph: part(root, `glyph-${i + 1}`),
  }));
  const reduced = prefersReducedMotion(root);

  let mode: Mode = 'number';
  let running: Animation | undefined;
  let settling: number | undefined;

  const paintSamples = () => {
    tiles.forEach((sample, i) => {
      const t = at(i);
      sample.bar.hidden = mode !== 'number';
      sample.glyph.hidden = mode !== 'keyword';
      sample.box.style.background = mode === 'color' ? rgb(mix(t)) : 'var(--sp-surface)';
      if (mode === 'number') {
        const value = lerp(WIDTH.from, WIDTH.to, t);
        const height = BAR.min + ((value - WIDTH.from) / (WIDTH.to - WIDTH.from)) * (BAR.max - BAR.min);
        sample.bar.style.height = `${Math.round(height)}px`;
      }
      // The engine flips a discrete property at exactly 50%, so sample five is already uppercase.
      if (mode === 'keyword') sample.glyph.style.textTransform = t >= 0.5 ? 'uppercase' : 'lowercase';
    });

    const halfway = Math.round(lerp(WIDTH.from, WIDTH.to, 0.5));
    property.textContent = mode === 'number' ? 'width' : mode === 'color' ? 'background-color' : 'text-transform';
    claim.textContent =
      mode === 'number'
        ? `${WIDTH.from}px to ${WIDTH.to}px. A number has a halfway, so the 50% sample is ${halfway}px.`
        : mode === 'color'
          ? `${rgb(COLOR.from)} to ${rgb(COLOR.to)}. Channels blend one by one, so the 50% sample is ${rgb(mix(0.5))}.`
          : 'lowercase to uppercase. Nothing sits between them, so the value switches once, at 50%.';
  };

  // The card carries its own paint in colour mode, so its label takes the ink that endpoint needs.
  const applyInk = () => {
    card.style.color = mode === 'color' ? '#ffffff' : 'var(--sp-accent-ink)';
  };

  const applyRest = () => {
    applyInk();
    card.style.width = `${WIDTH.to}px`;
    card.style.backgroundColor = mode === 'color' ? rgb(COLOR.to) : 'var(--sp-accent)';
    card.style.textTransform = mode === 'keyword' ? 'uppercase' : 'lowercase';
  };

  const applyStart = () => {
    applyInk();
    card.style.width = mode === 'number' ? `${WIDTH.from}px` : `${WIDTH.to}px`;
    card.style.backgroundColor = mode === 'color' ? rgb(COLOR.from) : 'var(--sp-accent)';
    card.style.textTransform = 'lowercase';
  };

  const framesFor = (): Keyframe[] =>
    mode === 'number'
      ? [{ width: `${WIDTH.from}px` }, { width: `${WIDTH.to}px` }]
      : mode === 'color'
        ? [{ backgroundColor: rgb(COLOR.from) }, { backgroundColor: rgb(COLOR.to) }]
        : [{ textTransform: 'lowercase' }, { textTransform: 'uppercase' }];

  const land = () => {
    running?.cancel();
    running = undefined;
    applyRest();
    scene.dataset.state = 'rested';
  };

  const play = () => {
    clock.clearTimeout(settling);
    running?.cancel();
    paintSamples();

    if (reduced) return land();

    applyStart();
    scene.dataset.state = 'running';
    // Linear, so elapsed time is interpolation progress and the samples below are this run's values.
    running = card.animate(framesFor(), { duration: RUN_MS, easing: 'linear', fill: 'forwards' });
    settling = clock.setTimeout(land, RUN_MS + 60);
  };

  // Each segment names an animation type outright, and Replay names a run: neither flips what it finds.
  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    scene.dataset.mode = mode;
    play();
  });
  part(root, 'replay').addEventListener('click', play);

  play();
}
