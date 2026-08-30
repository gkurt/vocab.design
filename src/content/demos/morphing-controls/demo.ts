import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type State = 'paused' | 'playing' | 'ended';

/**
 * No play, pause, or replay glyph in the kit, and the kit is frozen, so the transport
 * draws its own. Each one is wrapped in a span rather than swapped on the `<svg>` itself:
 * `hidden` is an HTML element property and an SVG element does not carry it.
 */
const GLYPH = {
  play: '<path d="M8.5 5.6 18 12l-9.5 6.4z" fill="currentColor"/>',
  pause: '<path d="M9 5.6h2.5v12.8H9zM14.5 5.6H17v12.8h-2.5z" fill="currentColor"/>',
  replay:
    '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 12a6.5 6.5 0 1 1-2.4-5.05"/><path d="M17.2 3.7v3.6h-3.6"/></g>',
} as const;

const DRESS: Record<State, { name: string }> = {
  paused: { name: 'Play' },
  playing: { name: 'Pause' },
  ended: { name: 'Replay' },
};

/** Short enough that the whole sequence, including the end of the track, is watchable. */
const RUN_MS = 2400;
const TICK_MS = 120;

/**
 * Morphing control specimen: one transport button that is play while the recording is
 * stopped, pause while it runs, and replay once it ends. Never two buttons, and never
 * a disabled one. Under it, the accessible name, which changes with the glyph in the
 * same instant: the part that has to be true for a reader who never sees the drawing.
 * That utterance is marked `data-stage-announce`, so the stage speaks it in the strip
 * instead of the transport printing it inside its own bar.
 *
 * A two-row panel used to gloss the button for the reader ("What the glyph shows: Play
 * triangle" over "What a screen reader announces"), under a line reading "One slot, three
 * actions, and only ever the one that applies." None of it is anything a field recorder
 * would print beside its own transport, and the article makes the point at length, so the
 * panel went, the announcement moved to the strip, and the frame is cut to the bar itself.
 *
 * The subject is the button itself, the narrowest element the term names. The track and
 * the timings are scenery (SPEC §5). It carries `data-aim` so the
 * ghost cursor parks at its corner rather than covering the glyph that is the whole
 * point; nothing here resolves input by coordinate (SPEC §7).
 *
 * This is the one place a toggle is right (SPEC §8): the flip is the term, and the
 * script drives every direction of it itself. Playing advances on the stage's clock,
 * so a pose taken mid-track cannot run on underneath the reader, and the spoken line
 * holds its height so morphing moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 146px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field recording 04</span><span class="sp-text">Estuary, low tide</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row" style="gap: 12px; padding: 12px 14px">
            <button
              class="sp-button"
              data-part="morph"
              data-subject
              data-aim
              data-state="paused"
              type="button"
              aria-label="Play"
              style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 42px; height: 42px; padding: 0; border-radius: 999px"
            >
              <span data-part="glyph-play"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${GLYPH.play}</svg></span>
              <span data-part="glyph-pause" hidden><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${GLYPH.pause}</svg></span>
              <span data-part="glyph-replay" hidden><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${GLYPH.replay}</svg></span>
            </button>
            <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 7px; min-width: 0">
              <div class="sp-progress"><div class="sp-progress-fill" data-part="fill" style="--sp-value: 0%"></div></div>
              <div class="sp-row sp-row--between">
                <span class="sp-label" style="font-size: 10px">0:00</span>
                <span class="sp-label" style="font-size: 10px">2:14</span>
              </div>
            </div>
          </div>
          <p class="sp-text sp-text--ink" data-stage-announce data-part="name" data-value="Play"
             style="margin: 0; height: 20px; line-height: 20px; font-size: 13px; white-space: nowrap">&ldquo;Play&rdquo;</p>
        </div>
      </div>
    </div>
  `;

  const morph = part(root, 'morph');
  const fill = part(root, 'fill');
  const name = part(root, 'name');
  const glyphs: Record<State, HTMLElement> = {
    paused: part(root, 'glyph-play'),
    playing: part(root, 'glyph-pause'),
    ended: part(root, 'glyph-replay'),
  };

  let state: State = 'paused';
  let elapsed = 0;
  let timer: number | undefined;

  const paint = () => {
    morph.dataset.state = state;
    // The name and the glyph change in the same instant, which is the claim the readout makes.
    morph.setAttribute('aria-label', DRESS[state].name);
    name.dataset.value = DRESS[state].name;
    name.textContent = `“${DRESS[state].name}”`;
    for (const key of Object.keys(glyphs) as State[]) glyphs[key].hidden = key !== state;
    fill.style.setProperty('--sp-value', `${Math.round((elapsed / RUN_MS) * 100)}%`);
  };

  const stop = () => {
    clock.clearTimeout(timer);
    timer = undefined;
  };

  const tick = () => {
    elapsed = Math.min(RUN_MS, elapsed + TICK_MS);
    if (elapsed >= RUN_MS) {
      stop();
      state = 'ended';
      paint();
      return;
    }
    paint();
    timer = clock.setTimeout(tick, TICK_MS);
  };

  morph.addEventListener('click', () => {
    if (state === 'playing') {
      stop();
      state = 'paused';
      paint();
      return;
    }
    if (state === 'ended') elapsed = 0;
    state = 'playing';
    paint();
    stop();
    timer = clock.setTimeout(tick, TICK_MS);
  });

  paint();
}
