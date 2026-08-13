import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * The two faces the swap runs between, written as local stacks because a
 * specimen about which file is in force cannot be set in the kit's single sans
 * (SPEC §5). No file is fetched: the "downloaded" face is a family the machine
 * already has, picked for proportions the fallback visibly does not share.
 */
const FALLBACK = "'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif";
const LOADED = "Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif";
/** How long the simulated download takes before the text is re-set in it. */
const ARRIVE_MS = 1100;

const STATUS = {
  fallback: 'downloading Sample.woff2, text set in the fallback',
  loaded: 'Sample.woff2 arrived, text re-set in it',
};

const HEADLINE = 'Handgloves &amp; figures';
const BODY = 'The same two lines, at the same declared size, in whichever face is in force at this moment.';

/**
 * Web font specimen: a page that paints in the fallback stack while the file is
 * on its way and re-sets itself when the file lands. A control in the scenery
 * replays the load, so the swap can be watched rather than described.
 *
 * The subject is the block of text the file is applied to. The term names the
 * downloaded face, and the narrowest thing on stage that shows one is the text
 * it sets; the status readout and the replay control are the demo's own
 * instrumentation and stay outside it (SPEC §5).
 *
 * The block reserves its height from the start and clips, so the wider face
 * cannot push the caption below it around (SPEC §5). The swap is a font-family
 * write with no transition on it, so nothing has to be gated for reduced motion.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-display: swap</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 10px">
          <span class="sp-text" data-part="status" role="status">${STATUS.loaded}</span>
        </div>
        <div data-part="sample" data-subject data-phase="loaded"
             style="height: 92px; overflow: hidden; margin-top: 4px; font-family: ${LOADED}">
          <p data-part="headline" style="margin: 0; font-size: 24px; white-space: nowrap">${HEADLINE}</p>
          <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.5">${BODY}</p>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          Nothing is invisible while the file travels: the fallback is read immediately, and every line it
          measured is measured again when the real face arrives.
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

  part(root, 'replay').addEventListener('click', () => {
    clock.clearTimeout(pending);
    setPhase('fallback');
    pending = clock.setTimeout(() => setPhase('loaded'), ARRIVE_MS);
  });
}
