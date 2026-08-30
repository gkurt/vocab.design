import { part } from '#src/kit/parts.ts';

/** The strip each fade covers. Deep enough to read as a fade, shallow enough to leave the
 *  partial row under it legible, which is the cue the fade exists to give. */
const DEPTH = 34;

const PEOPLE = [
  ['AR', 'Amara Reyes', 'Fitting room'],
  ['BK', 'Bo Kirby', 'Returns desk'],
  ['CN', 'Cal Nwosu', 'Alterations'],
  ['DV', 'Dana Villa', 'Fitting room'],
  ['EO', 'Esi Otieno', 'Waiting on stock'],
  ['FL', 'Finn Lasko', 'Alterations'],
  ['GM', 'Gia Marchetti', 'Returns desk'],
  ['HT', 'Hana Toma', 'Fitting room'],
  ['IK', 'Idris Kane', 'Collected'],
  ['JP', 'Jo Peral', 'Waiting on stock'],
  ['KS', 'Kit Solberg', 'Alterations'],
  ['LM', 'Lena Muir', 'Returns desk'],
  ['MF', 'Milo Farrow', 'Collected'],
  ['NB', 'Nia Bekele', 'Fitting room'],
] as const;

const rows = PEOPLE.map(
  ([initials, name, note]) => `
    <li class="sp-list-item">
      <span class="sp-avatar">${initials}</span>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px">${name}</span>
      <span class="sp-text" style="font-size: 11px">${note}</span>
    </li>`,
).join('');

/** One fade: a gradient in the panel's own colour, laid over the scroller's edge. */
const fade = (edge: 'top' | 'bottom', extra: string) => `
  <span
    data-part="fade-${edge}"
    ${extra}
    aria-hidden="true"
    style="position: absolute; left: 0; right: 0; ${edge}: 0; height: ${DEPTH}px; pointer-events: none;
           background: linear-gradient(to ${edge === 'top' ? 'bottom' : 'top'}, var(--sp-surface) 28%, transparent);
           opacity: ${edge === 'bottom' ? 1 : 0}; transition: opacity 0.18s var(--sp-ease)"
  ></span>`;

/**
 * Scroll edge fade specimen: a clipped list whose cut edges dissolve into the panel colour,
 * so the reader can tell a row passing under an edge from a list that has ended. Both fades
 * are read off the scroller's own position, which is the whole craft: a fade painted
 * unconditionally claims content that is not there, at the top before any scrolling and at
 * the bottom once the list runs out.
 *
 * The subject is the bottom fade overlay, the strip that is doing the hinting at mount. It
 * gets an element of its own (SPEC §5: a feature with no element is given one, sized to its
 * extent) rather than the term being pinned on the scroller, which is a different word. The
 * list, the header, and the readout are scenery. The top fade is the same feature at the
 * other edge and carries a `data-part` so the script can prove each strip appears only when
 * something is actually clipped that way.
 *
 * A line under the frame once read "Each edge fades only while something is clipped past
 * it.", which was the article's point standing inside the specimen rather than anything a
 * queue would ever print. The demonstration makes it without words, so the line went.
 *
 * The overlay-gradient implementation is the compatible one, and the one that is also called
 * a scroll shadow. `mask-image` on the scroller would fade to whatever is behind it instead
 * of to a stated colour; the panel here is flat, so the overlay tells no lie, and it gives
 * the feature the box the pin needs. `pointer-events: none` keeps the strip from swallowing
 * clicks on the row it dims.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Queue</span>
          <span class="sp-text" data-part="readout" style="width: 104px; text-align: right; white-space: nowrap">More below</span>
        </div>
        <div style="position: relative; flex: 1 1 auto; min-height: 0; display: flex">
          <ul class="sp-list sp-context sp-grow sp-scroll" data-part="page" style="padding: 0 8px">
            ${rows}
          </ul>
          ${fade('top', '')}
          ${fade('bottom', 'data-subject')}
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const fadeTop = part(root, 'fade-top');
  const fadeBottom = part(root, 'fade-bottom');
  const readout = part(root, 'readout');

  const sync = () => {
    const above = page.scrollTop > 1;
    const below = page.scrollTop < page.scrollHeight - page.clientHeight - 1;
    fadeTop.style.opacity = above ? '1' : '0';
    fadeBottom.style.opacity = below ? '1' : '0';
    readout.textContent = above && below ? 'More either way' : above ? 'More above' : 'More below';
  };

  page.addEventListener('scroll', sync);
  sync();
}
