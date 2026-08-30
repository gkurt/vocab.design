import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The window the cover is read in, so the minimum height means something visible. */
const VIEWPORT = { width: 292, height: 198 };
/** How many paragraphs exist in the principal element; each length shows a prefix of them. */
const PARAGRAPHS = 4;

interface Length {
  key: string;
  label: string;
  paragraphs: number;
  note: string;
}

const LENGTHS: Length[] = [
  {
    key: 'short',
    label: 'a line',
    paragraphs: 0,
    note: 'Nothing but the headline, and the free space is split evenly above and below it.',
  },
  {
    key: 'medium',
    label: 'a paragraph',
    paragraphs: 1,
    note: 'More to say, still centred: the region is at its minimum and the margins share what is left.',
  },
  {
    key: 'long',
    label: 'a lot',
    paragraphs: PARAGRAPHS,
    note: 'Past the minimum now, so the region grew and the footer went honestly below the fold.',
  },
];

/**
 * Cover specimen: Every Layout's primitive, shown inside a window of a fixed height so the
 * minimum has something to be a minimum of, with the principal element's length picked
 * absolutely.
 *
 * The subject is the cover region itself, `data-part="cover"`. This is one of the cases where
 * the container is the narrowest element the term names (SPEC §5): the primitive IS the region
 * with its minimum height and its auto margins, not the headline sitting in it. The window, the
 * picker and the note are scenery in the context register.
 *
 * A legend once stood beside the window under the heading "the whole recipe", pairing each
 * declaration with a gloss ("min-height / at least as tall as the window", and two more), and
 * the topbar read "Principal element holds". All of it was the site teaching from inside the
 * frame, and the article gives the recipe in full, so the legend went and the bar names what
 * the body shows. The window is centred on its own now.
 *
 * The claim is measured rather than implied: after every change the demo compares the region's
 * height with the window's and publishes `exact` or `over` on the region, so an assert can hold
 * it to staying at its minimum for the two short lengths and growing past it for the long one.
 * Nothing here transitions a height, so the read after a content change is the real one, and
 * the window keeps its box in every state, so nothing outside it ever moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const paragraphs = Array.from(
    { length: PARAGRAPHS },
    (_, i) => `
      <p class="sp-text" data-part="para-${i}" style="margin: 0; font-size: 12px"${i === 0 ? '' : ' hidden'}>
        Sailings leave the pontoon on the hour, weather permitting.
      </p>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="lengths" data-axis="Length" data-value="short">
            ${LENGTHS.map(
              (length) => `
              <button class="sp-segment" type="button" data-part="seg-${length.key}" value="${length.key}" style="padding: 4px 10px; font-size: 11px">${length.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 16px; padding: 10px 12px">
          <div
            class="sp-scroll"
            data-part="window"
            style="flex: 0 0 auto; width: ${VIEWPORT.width}px; height: ${VIEWPORT.height}px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              data-part="cover"
              data-subject
              data-length="short"
              data-fits="exact"
              style="display: flex; flex-direction: column; gap: 8px; min-height: 100%; padding: 12px"
            >
              <div class="sp-row" data-part="head" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-heading" style="font-size: 12px">Falmouth Ferries</span>
                <span class="sp-grow"></span>
                <span class="sp-label" style="font-size: 11px">Times</span>
              </div>

              <div data-part="principal" class="sp-stack" style="margin: auto 0; gap: 6px">
                <span class="sp-heading" style="font-size: 15px; line-height: 1.25">The winter crossing runs all year.</span>
                ${paragraphs}
                <span><button class="sp-button sp-button--sm" type="button" data-part="book">Book a crossing</button></span>
              </div>

              <div class="sp-row" data-part="foot" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-label" style="font-size: 11px">Harbour Commissioners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="height: 32px; width: 452px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const windowEl = part(root, 'window');
  const cover = part(root, 'cover');
  const note = part(root, 'note');
  const paras = Array.from({ length: PARAGRAPHS }, (_, i) => part(root, `para-${i}`));

  const apply = (key: string) => {
    const length = LENGTHS.find((entry) => entry.key === key);
    if (!length) return;
    for (const [i, para] of paras.entries()) flag(para, 'hidden', i >= length.paragraphs);
    cover.dataset.length = length.key;
    // Read back after the content change, on a box nothing transitions: this is the claim,
    // so it is measured rather than assumed.
    cover.dataset.fits = cover.offsetHeight > windowEl.clientHeight + 1 ? 'over' : 'exact';
    windowEl.scrollTop = 0;
    note.textContent = length.note;
  };

  part(root, 'lengths').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('short');
}
