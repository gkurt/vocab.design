import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three nested boxes at fixed sizes, so only the badge ever moves. */
const PAGE_W = 264;
const PAGE_H = 164;
const CARD_W = 214;
const CARD_H = 108;
const CELL_W = 148;
const CELL_H = 62;

type Anchor = { box: 'page' | 'card' | 'cell'; position: string; verdict: string; note: string };

const ANCHORS: Record<string, Anchor> = {
  page: {
    box: 'page',
    position: 'absolute',
    verdict: 'the page',
    note: 'Nothing between the badge and the page is positioned, so the offsets skip the card and the cell entirely.',
  },
  card: {
    box: 'card',
    position: 'absolute',
    verdict: 'the card',
    note: 'position: relative on the card makes it the nearest positioned ancestor, and the badge moves without being touched.',
  },
  cell: {
    box: 'cell',
    position: 'absolute',
    verdict: 'the cell',
    note: 'The card is still relative here. Nearest wins, so adding relative to the cell takes the badge off the card.',
  },
  transform: {
    box: 'card',
    position: 'fixed',
    verdict: 'the card, by transform',
    note: 'A transform on the card makes it a containing block without any position at all, and it catches a fixed badge too.',
  },
};

const segment = (key: string, label: string) => `
  <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 8px; font-size: 11px">
    ${label}
  </button>`;

/** Labels stay in flow: absolute ones would all resolve against the same box and pile up. */
const boxLabel = (text: string) =>
  `<span class="sp-label" style="flex: 0 0 auto; height: 16px; padding: 2px 0 0 8px; font-size: 10px">${text}</span>`;

/**
 * Containing block specimen: one absolutely positioned badge inside three nested boxes, with a
 * picker for which ancestor is made into a containing block. The badge's own rules never
 * change, and it lands in three different places.
 *
 * The subject is the resolved box itself, the one the dashed outline is drawn on, and it travels
 * with the resolution rather than staying where it started: the term names that box, not the
 * badge whose offsets are measured against it, so the element tracing the feature is the one
 * that wears it (SPEC §5). Exactly one exists at any moment. The badge is the demo's instrument,
 * the picker, the verdict and the caption are scenery in the context register, and every state
 * has an honest containing block, so no state needs a `data-pose`.
 *
 * The nesting is fixed in size, so a pick moves the badge and outlines a different box and
 * nothing else shifts (SPEC §5). The fixed-position state always applies the transform that
 * contains it in the same write, so the badge can never resolve against the real viewport and
 * escape the stage (SPEC §5). Each segment names the ancestor it promotes (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">What the offsets resolve against</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="anchors" data-axis="Anchor" data-value="page">
            ${segment('page', 'none')}${segment('card', 'card')}${segment('cell', 'cell')}${segment('transform', 'transform')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="page"
            style="position: relative; display: flex; flex-direction: column; flex: 0 0 auto; width: ${PAGE_W}px;
                   height: ${PAGE_H}px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius)"
          >
            ${boxLabel('page')}
            <div
              data-part="card"
              style="position: static; display: flex; flex-direction: column; flex: 0 0 auto; width: ${CARD_W}px;
                     height: ${CARD_H}px; margin: 6px 0 0 18px; background: var(--sp-sunken);
                     border: 1px solid var(--sp-line); border-radius: 6px"
            >
              ${boxLabel('card')}
              <div
                data-part="cell"
                style="position: static; display: flex; flex-direction: column; flex: 0 0 auto; width: ${CELL_W}px;
                       height: ${CELL_H}px; margin: 6px 0 0 16px; background: var(--sp-surface);
                       border: 1px solid var(--sp-line); border-radius: 6px"
              >
                ${boxLabel('cell')}
                <span
                  class="sp-chip"
                  data-part="badge"
                  data-anchor="page"
                  data-position="absolute"
                  style="position: absolute; right: 8px; bottom: 8px; cursor: default; font-size: 11px;
                         background: var(--sp-accent); border-color: var(--sp-accent); color: var(--sp-accent-ink)"
                >absolute</span>
              </div>
            </div>
          </div>
          <div
            class="sp-context"
            style="display: flex; flex-direction: column; align-items: center; gap: 2px; flex: 0 0 auto; width: 100%; height: 62px"
          >
            <span style="display: flex; align-items: baseline; gap: 8px; flex: 0 0 auto; height: 20px">
              <span class="sp-label">Containing block</span>
              <span class="sp-heading" data-part="verdict" style="font-size: 13px"></span>
            </span>
            <span class="sp-text" data-part="readout" style="flex: 0 0 auto; height: 40px; width: 100%; text-align: center"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const badge = part(root, 'badge');
  const verdict = part(root, 'verdict');
  const readout = part(root, 'readout');
  const boxes = {
    page: part(root, 'page'),
    card: part(root, 'card'),
    cell: part(root, 'cell'),
  };

  const apply = (key: string) => {
    const anchor = ANCHORS[key];
    if (!anchor) return;
    // Position and transform are written together, so a fixed badge always has the transformed
    // ancestor that contains it and can never resolve against the reader's own viewport.
    // The cell state leaves the card relative as well: the claim is that the nearest one wins,
    // not that only one ancestor may be positioned.
    boxes.card.style.position = key === 'card' || key === 'cell' ? 'relative' : 'static';
    boxes.cell.style.position = key === 'cell' ? 'relative' : 'static';
    boxes.card.style.transform = key === 'transform' ? 'translateY(-4px)' : 'none';
    badge.style.position = anchor.position;
    badge.dataset.anchor = key;
    badge.dataset.position = anchor.position;
    badge.textContent = anchor.position;
    for (const [name, el] of Object.entries(boxes)) {
      const resolved = name === anchor.box;
      flag(el, 'data-subject', resolved);
      el.style.outline = resolved ? '2px dashed var(--sp-accent)' : '';
      el.style.outlineOffset = resolved ? '-1px' : '';
    }
    verdict.textContent = anchor.verdict;
    readout.textContent = anchor.note;
  };

  part(root, 'anchors').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('page');
}
