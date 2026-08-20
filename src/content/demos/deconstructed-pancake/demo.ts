import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The whole recipe: this basis, no growth, and a parent that wraps. */
const BASIS = 130;
const GAP = 10;
const PAD = 10;

interface Width {
  key: string;
  label: string;
  width: number;
}

/** Widest first: three cards across is an exact fit, so nothing shrinks there. */
const WIDTHS: Width[] = [
  { key: 'wide', label: 'wide', width: 3 * BASIS + 2 * GAP + 2 * PAD },
  { key: 'medium', label: 'medium', width: 320 },
  { key: 'narrow', label: 'narrow', width: 170 },
];

const CARDS = [
  { title: 'Charts', lines: [86, 58] },
  { title: 'Alerts', lines: [72, 64] },
  { title: 'Exports', lines: [80, 52] },
];

const ROWS = ['one', 'two', 'three'];

/**
 * Deconstructed pancake specimen: three equal cards in a wrapping row, with the container's
 * width picked absolutely. As the room runs out the row wraps to two and one, and then to one
 * per line, and the card left alone on the last line keeps the width it had.
 *
 * The subject is the wrapping row, `data-part="row"`. The pattern IS the parent and its rule
 * (wrap, one gap, no growth), not any card inside it (SPEC §5); the frame, the picker, the
 * readout and the caption are scenery in the context register. The row's own tint is what makes
 * the refusal legible: the space the orphan declines to fill stays visible beside it.
 *
 * Both claims are measured rather than declared. The demo counts the distinct lines the cards
 * landed on, and compares the last card's width with the first card's, publishing `data-orphan`
 * as `natural` or `stretched`: with the growth switched back on, the same script would leave the
 * orphan filling its line and the attribute would read `stretched`. The row reserves the room
 * its tallest arrangement needs, so nothing below it moves (SPEC §5), and nothing here
 * transitions a width, so the read after the write is the real one.
 */
export function mount(root: HTMLElement): void {
  const cards = CARDS.map(
    (card, i) => `
      <div
        class="sp-surface"
        data-part="card-${i + 1}"
        style="flex: 0 1 ${BASIS}px; min-width: 0; padding: 8px 10px"
      >
        <span class="sp-label" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 12px; line-height: 1.25">${card.title}</span>
        <div class="sp-stack" style="gap: 4px; margin-top: 6px">
          ${card.lines.map((width) => `<div class="sp-line" style="width: ${width}%; height: 6px"></div>`).join('')}
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Container is</span>
          <sp-segmented class="sp-segmented" data-part="widths" data-value="wide">
            ${WIDTHS.map(
              (width) => `
              <button class="sp-segment" type="button" data-part="seg-${width.key}" value="${width.key}" style="padding: 4px 11px; font-size: 11px">${width.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="width: ${WIDTHS[0]?.width}px; height: 100%">
            <div
              data-part="row"
              data-subject
              data-width="wide"
              data-rows="one"
              data-orphan="natural"
              style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: flex-start; gap: ${GAP}px;
                     width: ${WIDTHS[0]?.width}px; padding: ${PAD}px;
                     background: var(--sp-accent-soft); border-radius: var(--sp-radius)"
            >${cards}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const row = part(root, 'row');
  const note = part(root, 'note');
  const cardEls = CARDS.map((_, i) => part(root, `card-${i + 1}`));

  const apply = (key: string) => {
    const width = WIDTHS.find((entry) => entry.key === key);
    if (!width) return;
    row.style.width = `${width.width}px`;
    row.dataset.width = width.key;
    // Read back on boxes nothing transitions: the line count and the orphan's width are the
    // two things being claimed, so both are measured from where the cards actually landed.
    const tops = cardEls.map((card) => Math.round(card.offsetTop));
    const lines = new Set(tops).size;
    const first = cardEls[0];
    const last = cardEls[cardEls.length - 1];
    const alone = last && tops.filter((top) => top === tops[tops.length - 1]).length === 1;
    const stretched = !!alone && !!first && !!last && last.offsetWidth > first.offsetWidth + 1;
    row.dataset.rows = ROWS[lines - 1] ?? 'three';
    row.dataset.orphan = stretched ? 'stretched' : 'natural';
    if (lines === 1) note.textContent = `${width.width}px wide: all three cards share one line.`;
    else if (lines === CARDS.length) note.textContent = `${width.width}px wide: one card per line, and none of them stretched.`;
    else if (alone) note.textContent = `${width.width}px wide: the last card is alone, and stays ${Math.round(last?.offsetWidth ?? 0)}px.`;
    else note.textContent = `${width.width}px wide: ${lines} lines, every card at its own size.`;
  };

  part(root, 'widths').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('wide');
}
