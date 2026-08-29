import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Intrinsic size declared on the element, and the box the layout gets from it. */
const NATURAL = { w: 640, h: 400 };
const BOX = 240;

const ALT = 'Low tide at Harbour Point: one sailing dinghy aground on the mud, hills behind it.';

/*
 * The picture is an inline SVG carried in a data URI. A specimen makes no network
 * requests (SPEC §5), and the point being made here is about the element rather than
 * about any particular photograph.
 */
const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="${NATURAL.w}" height="${NATURAL.h}" viewBox="0 0 640 400">
  <rect width="640" height="400" fill="#cbdff0"/>
  <circle cx="518" cy="92" r="40" fill="#f5d78e"/>
  <path d="M0 258 L150 176 L286 258 Z" fill="#5d7f6c"/>
  <path d="M244 258 L392 162 L548 258 Z" fill="#47695a"/>
  <rect y="252" width="640" height="148" fill="#3d6b90"/>
  <rect y="300" width="640" height="100" fill="#7a6a52"/>
  <path d="M232 300 h132 l-24 30 h-84 Z" fill="#2c3a45"/>
  <path d="M292 300 V196" stroke="#2c3a45" stroke-width="7"/>
  <path d="M300 204 V292 H358 Z" fill="#f2f5f3"/>
</svg>`;

/** The same box with nothing in it: an empty picture of the declared intrinsic size. */
const EMPTY = `<svg xmlns="http://www.w3.org/2000/svg" width="${NATURAL.w}" height="${NATURAL.h}"></svg>`;

const uri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const STATES: Record<string, { src: string; shimmer: boolean; note: string }> = {
  loaded: { src: uri(SCENE), shimmer: false, note: 'Decoded, into a box that was already the right shape for it.' },
  loading: { src: uri(EMPTY), shimmer: true, note: 'Nothing has decoded yet, and the box is already the right size.' },
  // Not a PNG, so it fails to decode immediately. No request leaves the page.
  broken: { src: 'data:image/png;base64,QQ==', shimmer: false, note: 'It will never arrive. The alt string is all that is left.' },
};

const START = 'loaded';

/**
 * Image specimen: one `<img>` in a fixed content slot, shown as it loads, once it has
 * loaded, and when it never will, with its alt string available on request.
 *
 * The subject is the `<img>` element itself, the narrowest thing the word names: the slot
 * around it is the layout's, and the alt panel is the demo showing you what the element is
 * carrying. The state picker, the intrinsic-size readout and the alt panel are scenery.
 *
 * The source is an inline SVG in a data URI, so nothing is fetched (SPEC §5), and the
 * broken state is a data URI that genuinely fails to decode rather than a picture of a
 * failure. The element declares its intrinsic width and height, which is what holds the
 * box at 240 by 150 in all three states, so switching between them moves nothing (SPEC §5).
 * Every state is honestly an image, so no pose condition is needed. Device pixel ratio and
 * the several-widths question belong to their own entry and are deliberately absent here.
 */
export function mount(root: HTMLElement): void {
  const first = STATES[START] as (typeof STATES)[string];

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading" style="font-size: 13px">Field notes, Harbour Point</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-axis="State" data-value="${START}">
            ${Object.keys(STATES)
              .map(
                (key) =>
                  `<button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 10px; font-size: 12px">${key[0]?.toUpperCase()}${key.slice(1)}</button>`,
              )
              .join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 14px; align-items: flex-start">
          <div
            data-part="slot"
            data-state="${START}"
            style="position: relative; flex: 0 0 auto; width: ${BOX}px; border-radius: 6px; overflow: hidden; background: var(--sp-sunken)"
          >
            <span class="sp-skeleton" data-part="shimmer" style="position: absolute; inset: 0; border-radius: 0" hidden></span>
            <img
              data-part="image"
              data-subject
              src="${first.src}"
              width="${NATURAL.w}"
              height="${NATURAL.h}"
              alt="${ALT}"
              style="position: relative; display: block; width: ${BOX}px; height: auto; font-size: 11px; color: var(--sp-muted)"
            />
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px; min-width: 0">
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 11px">declared on the element</span>
              <span style="font-size: 12.5px; font-variant-numeric: tabular-nums">${NATURAL.w} × ${NATURAL.h}</span>
            </div>
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 11px">box the layout reserves</span>
              <span style="font-size: 12.5px; font-variant-numeric: tabular-nums">${BOX} × ${Math.round((BOX * NATURAL.h) / NATURAL.w)}</span>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="alt-show" style="align-self: flex-start; margin-top: 2px">
              Show the alt text
            </button>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; height: 18px; font-size: 12px; line-height: 18px; overflow: hidden">${first.note}</p>

        <div style="height: 44px; margin-top: 8px">
          <div
            class="sp-row"
            data-part="alt-box"
            hidden
            style="height: 44px; gap: 8px; padding: 5px 8px; border: 1px dashed var(--sp-accent); border-radius: 6px"
          >
            <span class="sp-label" style="flex: 0 0 auto; font-family: 'Geist Mono Variable', ui-monospace, monospace">alt</span>
            <span class="sp-text sp-text--ink sp-grow" data-part="alt-text" style="font-size: 11.5px; line-height: 1.35">${ALT}</span>
            <button class="sp-icon-button" type="button" data-part="alt-hide" aria-label="Hide the alt text" style="flex: 0 0 auto; width: 22px; height: 22px">
              ${icon('close').replace('<svg ', '<svg style="width: 13px; height: 13px" ')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const image = part(root, 'image') as HTMLImageElement;
  const shimmer = part(root, 'shimmer');
  const note = part(root, 'note');
  const altBox = part(root, 'alt-box');

  const apply = (name: string) => {
    const state = STATES[name];
    if (!state) return;
    slot.dataset.state = name;
    image.src = state.src;
    shimmer.hidden = !state.shimmer;
    note.textContent = state.note;
  };

  part(root, 'picker').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // The trigger always opens and the close always dismisses: neither one flips (SPEC §8).
  part(root, 'alt-show').addEventListener('click', () => {
    altBox.hidden = false;
  });
  part(root, 'alt-hide').addEventListener('click', () => {
    altBox.hidden = true;
  });
}
