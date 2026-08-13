import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * The face the simulated download delivers, written as a local stack because a
 * specimen about a font file arriving cannot be set in the kit's single sans
 * (SPEC §5). No file is fetched: the "downloaded" face is one the machine
 * already has, and the block period is a beat on the demo's clock.
 */
const LOADED = "Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif";
/** How long the block period lasts before the file lands and the text paints. */
const ARRIVE_MS = 1500;

const STATUS = {
  waiting: 'Brand.woff2 in flight, block period running',
  loaded: 'Brand.woff2 arrived, text painted',
};

const HEADLINE = 'Handgloves &amp; figures';
const BODY = 'Laid out, measured, and reserved. Every line box is already the size it will be when the words appear.';

/**
 * FOIT specimen: a page whose text block holds its space and paints nothing
 * while the file is on its way. A control in the scenery replays the load, so
 * the blank period can be watched rather than described.
 *
 * The subject is the block of text that goes invisible. The term names the
 * period a run of text spends unpainted, so the narrowest thing on stage that
 * has one is the block itself; the phase readout and the replay control are the
 * demo's own instrumentation and stay outside it (SPEC §5). The block keeps a
 * ruled box and full opacity throughout, which is the honest picture: the
 * layout is right the whole time and only the words are missing.
 *
 * The specimen mounts in the blank state, which is the state the term names, so
 * identify poses the flash rather than the page that comes after it
 * (`data-pose`, SPEC §6). The loaded state is a counter-example the subject
 * itself passes through: a ring around readable text would identify the
 * opposite of the word.
 *
 * The block reserves its height from the start and clips, so the words arriving
 * cannot push the caption below them around (SPEC §5). Visibility is written
 * with no transition on it, so nothing has to be gated for reduced motion.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-display: block</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Replay load</button>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 10px">
          <span class="sp-text" data-part="status" role="status">${STATUS.waiting}</span>
        </div>
        <div data-part="sample" data-subject data-phase="waiting" data-pose="[data-phase=waiting]"
             style="height: 104px; overflow: hidden; margin-top: 4px; padding: 10px 12px;
                    border: 1px dashed var(--sp-line); border-radius: var(--sp-radius); font-family: ${LOADED}">
          <p data-part="headline" style="margin: 0; font-size: 24px; white-space: nowrap; visibility: hidden">${HEADLINE}</p>
          <p data-part="body" style="margin: 8px 0 0; font-size: 13px; line-height: 1.5; visibility: hidden">${BODY}</p>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          The dashed box is the room the text already occupies. Nothing here is late or wrong, it is simply
          not painted, and a reader on a slow connection sees an empty page rather than a page in progress.
        </p>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const status = part(root, 'status');
  const text = [part(root, 'headline'), part(root, 'body')];
  let pending: number | undefined;

  const setPhase = (phase: 'waiting' | 'loaded') => {
    sample.dataset.phase = phase;
    status.textContent = STATUS[phase];
    for (const el of text) el.style.visibility = phase === 'loaded' ? 'visible' : 'hidden';
  };

  const load = () => {
    clock.clearTimeout(pending);
    setPhase('waiting');
    pending = clock.setTimeout(() => setPhase('loaded'), ARRIVE_MS);
  };

  load();
  part(root, 'replay').addEventListener('click', load);
}
