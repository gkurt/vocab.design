import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const NOTES: Record<string, string> = {
  rtl: 'Reading starts on the right, and the bar fills the other way.',
  ltr: 'The same panel, the same markup, the other reading direction.',
};

/**
 * RTL mirroring specimen: one panel, one set of markup, shown under both reading directions.
 * The navigation order, the back arrow, the alignment of every row and the direction the
 * progress bar fills all swap; the checkmark, the star and the digits keep the shape and the
 * internal order they had.
 *
 * The subject is the panel, and it mounts mirrored, because the mirrored layout is what the
 * term names. The left to right state is the comparison the mirror is read against and is a
 * state the subject visibly is not the term in, so the honest condition is declared as
 * `data-pose="[dir=rtl]"`: identify refuses to pose the unmirrored state and the mount state
 * satisfies it (SPEC §6). The switcher, the legend and the caption are scenery (SPEC §5).
 *
 * Only the arrow is swapped by hand. Everything else follows `dir` on its own, which is the
 * argument the specimen is making: a layout written in logical terms mirrors itself.
 *
 * The frame is as tall as the panel, the legend beside it and the caption under them all
 * take, so the comparison is never cut at the bottom edge (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const legendItem = (text: string) => `<span class="sp-label">${text}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 312px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Direction</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="rtl" data-axis="Set to" data-term="rtl">
            <button class="sp-segment" type="button" data-part="seg-rtl" value="rtl">rtl</button>
            <button class="sp-segment" type="button" data-part="seg-ltr" value="ltr">ltr</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 6px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 20px">
            <div
              class="sp-surface"
              data-part="panel"
              data-subject
              data-pose="[dir=rtl]"
              dir="rtl"
              style="display: flex; flex-direction: column; gap: 10px; flex: 0 0 auto; width: 300px; height: 196px; padding: 10px"
            >
              <div class="sp-row" data-part="nav" style="gap: 2px">
                <span class="sp-nav-item">Charts</span>
                <span class="sp-nav-item" data-part="nav-tides" data-current>Tides</span>
                <span class="sp-nav-item">Winds</span>
              </div>
              <div class="sp-divider"></div>
              <div class="sp-row" data-part="back-row" style="gap: 8px">
                <span data-part="chev-rtl" style="display: inline-flex">${icon('chevronRight')}</span>
                <span data-part="chev-ltr" style="display: inline-flex" hidden>${icon('chevronLeft')}</span>
                <span class="sp-text sp-text--ink sp-grow">Back to the fleet</span>
                <span style="display: inline-flex">${icon('kebab')}</span>
              </div>
              <div class="sp-stack" style="gap: 6px">
                <div class="sp-row sp-row--between">
                  <span class="sp-label">Upload</span>
                  <span class="sp-label">62%</span>
                </div>
                <div class="sp-progress" data-part="progress" style="--sp-value: 62%">
                  <div class="sp-progress-fill"></div>
                </div>
              </div>
              <div class="sp-row" data-part="status-row" style="gap: 8px">
                ${icon('check')}
                <span class="sp-text sp-text--ink sp-grow">Berth confirmed</span>
                ${icon('star', 'sp-icon--filled')}
              </div>
              <div class="sp-row sp-row--between">
                <span class="sp-label" data-part="clock">12:40</span>
                <span class="sp-label" data-part="distance">1,240 m</span>
              </div>
            </div>
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 124px; gap: 7px">
              <span class="sp-label" style="color: var(--sp-ink); font-weight: 600">mirrors</span>
              ${legendItem('reading order')}
              ${legendItem('navigation order')}
              ${legendItem('the back arrow')}
              ${legendItem('progress direction')}
              <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; margin-top: 4px">holds</span>
              ${legendItem('the checkmark')}
              ${legendItem('the star')}
              ${legendItem('digits and times')}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const chevRtl = part(root, 'chev-rtl');
  const chevLtr = part(root, 'chev-ltr');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    panel.dir = key;
    // The one glyph a direction change cannot resolve on its own: an arrow that means
    // "back" has to be redrawn, not reflected by the layout.
    flag(chevRtl, 'hidden', key !== 'rtl');
    flag(chevLtr, 'hidden', key !== 'ltr');
    readout.textContent = note;
  };

  // Each segment names a direction, so the switch lands on that direction rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('rtl');
}
