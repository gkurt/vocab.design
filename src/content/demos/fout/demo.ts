import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * The two faces the swap runs between, as local stacks: a specimen about which
 * drawing is on screen cannot be set in the kit's single sans (SPEC §5). They
 * were picked for visibly different x-heights and widths, because the metric
 * shift is the part of a FOUT that costs anything.
 */
const FALLBACK = "'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif";
const LOADED = "Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif";
/** How long the file takes to arrive before the text is set again in it. */
const ARRIVE_MS = 1500;

const HEADLINE = 'Handgloves &amp; figures';
const SIZE = 26;

const STATUS = {
  fallback: 'Brand.woff2 in flight, text painted in the fallback',
  loaded: 'Brand.woff2 arrived, text set again in it',
};

/** A bar exactly as wide as the headline set in one face: the browser measures it, not the demo. */
const widthBar = (name: string, family: string, fill: string) => `
  <div class="sp-row" style="gap: 10px">
    <span class="sp-label" style="width: 96px">${name}</span>
    <span data-part="bar-${name.split(' ')[0]}"
          style="display: inline-block; height: 7px; border-radius: 4px; overflow: hidden; background: ${fill}">
      <span style="font-family: ${family}; font-size: ${SIZE}px; visibility: hidden">${HEADLINE}</span>
    </span>
  </div>`;

/**
 * FOUT specimen: a page that paints its headline in the fallback the moment it
 * can and sets it again when the file lands. Two bars under the text carry the
 * width each face gives the same string, so the swap can be seen as a
 * measurement changing rather than only as a drawing changing.
 *
 * The width bars are not drawn from a measurement the demo took. Each one wraps
 * an invisible copy of the headline set in that face, so the bar shrink-wraps to
 * whatever the browser makes of it and no read follows a style write (SPEC §5).
 *
 * The subject is the text block that swaps. The term names a run of text
 * changing face, so the block is the narrowest thing that has one; the bars,
 * the status readout, and the replay control are scenery (SPEC §5).
 *
 * The specimen mounts in the fallback state and declares it in `data-pose`
 * (SPEC §6), so identify holds the moment the term is about instead of the
 * settled page it turns into, which no longer shows a swap at all.
 *
 * The block holds one height and clips, so a face two thirds wider cannot push
 * the bars or the caption around (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-display: swap</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 10px">
          <span class="sp-text" data-part="status" role="status">${STATUS.fallback}</span>
        </div>
        <div data-part="sample" data-subject data-phase="fallback" data-pose="[data-phase=fallback]"
             style="height: 74px; overflow: hidden; margin-top: 4px; font-family: ${FALLBACK}">
          <p data-part="headline" style="margin: 0; font-size: ${SIZE}px; white-space: nowrap">${HEADLINE}</p>
          <p data-part="body" style="margin: 6px 0 0; font-size: 13px; line-height: 1.5">
            Readable at first paint, and measured twice.
          </p>
        </div>
        <div class="sp-stack sp-context" data-part="widths" style="gap: 7px; margin-top: 10px">
          ${widthBar('fallback width', FALLBACK, 'var(--sp-line)')}
          ${widthBar('web font width', LOADED, 'var(--sp-muted)')}
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          The words never go missing, but they never stay put either: the same string is a different
          length in each face, so the swap re-wraps the line and moves everything under it.
        </p>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const status = part(root, 'status');
  let pending: number | undefined;

  const setPhase = (phase: 'fallback' | 'loaded') => {
    sample.dataset.phase = phase;
    sample.style.fontFamily = phase === 'loaded' ? LOADED : FALLBACK;
    status.textContent = STATUS[phase];
  };

  const load = () => {
    clock.clearTimeout(pending);
    setPhase('fallback');
    pending = clock.setTimeout(() => setPhase('loaded'), ARRIVE_MS);
  };

  load();
  part(root, 'replay').addEventListener('click', load);
}
