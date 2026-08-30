import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The window the page is laid out inside, so both lengths are read at one viewport height. */
const VIEWPORT = { width: 308, height: 196 };
/** How many content blocks exist; the short page shows one, the long page shows them all. */
const BLOCKS = 6;

const NOTES: Record<string, string> = {
  short: 'One block of content, and the footer is still on the bottom edge.',
  long: 'Taller than the window now, so the footer sits below the fold.',
};

/**
 * Pancake stack specimen: one page, laid out as three rows with the middle one on `1fr`, shown
 * at two content lengths inside a window that never changes size. Short content leaves the
 * footer on the bottom edge because the middle row swallowed the slack; long content pushes it
 * past the fold, where it belongs.
 *
 * The subject is the stacked page, not the window it is read in: the window, the track legend,
 * the switcher and the caption are the scene (SPEC §5). The page is the term in both lengths,
 * since the arrangement is what the word names and neither length is a counter-example, so no
 * `data-pose` is needed (SPEC §6).
 *
 * The window keeps a fixed box, so the page growing past it changes nothing outside itself
 * (SPEC §5), and the scroll offset is reset with the length so a pass joined halfway starts
 * from the same place (SPEC §8).
 *
 * Two things were the site talking. The legend glossed each track ("as tall as it needs",
 * "all that is left"), so it now names the three tracks and nothing more, which is what a
 * layout legend is. The line under the window reads what the chosen length did to the footer
 * and changes with the switch, so it is a verdict: it carries `data-stage-verdict`, the stage
 * draws it in the strip, and the frame lost the room that was reserved for it.
 */
export function mount(root: HTMLElement): void {
  const blocks = Array.from(
    { length: BLOCKS },
    (_, i) => `
      <div class="sp-stack" data-part="block-${i}" style="gap: 6px"${i === 0 ? '' : ' hidden'}>
        <span class="sp-heading" style="font-size: 13px">Tide times</span>
        <div class="sp-line" style="width: 92%"></div>
        <div class="sp-line" style="width: 74%"></div>
      </div>`,
  ).join('');

  const legendRow = (track: string, name: string) => `
    <span class="sp-label" style="color: var(--sp-ink); font-weight: 600">${track}</span>
    <span class="sp-label">${name}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Content</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Length" data-value="short">
            <button class="sp-segment" type="button" data-part="seg-short" value="short">short</button>
            <button class="sp-segment" type="button" data-part="seg-long" value="long">long</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 20px">
            <div
              class="sp-scroll"
              data-part="viewport"
              style="flex: 0 0 auto; width: ${VIEWPORT.width}px; height: ${VIEWPORT.height}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div
                data-part="page"
                data-subject
                data-length="short"
                style="display: grid; grid-template-rows: auto 1fr auto; min-height: 100%"
              >
                <div
                  data-part="header"
                  style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
                >
                  <span class="sp-heading sp-grow" style="font-size: 13px">Falmouth Harbour</span>
                  <span class="sp-label" style="white-space: nowrap">auto</span>
                </div>
                <div data-part="main" style="position: relative; display: flex; flex-direction: column; gap: 8px; padding: 10px 34px 10px 10px">
                  ${blocks}
                  <span class="sp-label" style="position: absolute; top: 10px; right: 10px">1fr</span>
                </div>
                <div
                  data-part="footer"
                  style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--sp-sunken); border-top: 1px solid var(--sp-line)"
                >
                  <span class="sp-label sp-grow">Harbour Commissioners</span>
                  <span class="sp-label" style="white-space: nowrap">auto</span>
                </div>
              </div>
            </div>
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 116px; gap: 8px">
              <span class="sp-label" style="color: var(--sp-ink)">grid-template-rows</span>
              <div style="display: grid; grid-template-columns: 30px 1fr; gap: 8px 8px; align-items: start">
                ${legendRow('auto', 'header')}
                ${legendRow('1fr', 'main')}
                ${legendRow('auto', 'footer')}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const page = part(root, 'page');
  const extras = Array.from({ length: BLOCKS - 1 }, (_, i) => part(root, `block-${i + 1}`));
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    page.dataset.length = key;
    for (const block of extras) flag(block, 'hidden', key !== 'long');
    viewport.scrollTop = 0;
    readout.textContent = note;
  };

  // Each segment names a content length, so the switch lands on that length rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('short');
}
