import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'ui-monospace, monospace';

/** The parent's three rows, stated so the traced lines can be placed without measuring. */
const ROWS = [46, 40, 28] as const;
const GUIDES = [ROWS[0], ROWS[0] + ROWS[1]];

const CARDS = [
  { title: 'Day berth', body: [100, 78] },
  { title: 'Harbour mooring, winter rate', body: [100, 92, 64] },
  { title: 'Tender space', body: [96, 88, 70] },
];

const cell = (pad: string, content: string) =>
  `<div style="display: flex; flex-direction: column; justify-content: flex-start; gap: 5px; min-height: 0; padding: ${pad}">${content}</div>`;

/**
 * Subgrid specimen: three cards whose title, body and price rows line up across the row
 * because each card borrows the parent's tracks, beside the same three cards stacking
 * from their own tops.
 *
 * The subject is one card, which is the element the term actually names: a subgrid is the
 * nested grid, not the parent and not the row of them. Its siblings stay out of the
 * context register because the claim is alignment *across* them, and a dimmed neighbour
 * would undercut the only thing there is to see; the picker, the traced lines and the
 * caption are the instrumentation, and those are in it (SPEC §5). In the own-rows state
 * the card is no longer a subgrid, so it declares `data-subgrid` as its pose condition and
 * identify plays on rather than ringing it (SPEC §6). Mount satisfies the condition.
 *
 * Card padding would push the borrowed tracks off the parent's lines by its own width, so
 * every card here pads its cells instead and draws its edge with an inset outline, which
 * takes no space at all.
 */
export function mount(root: HTMLElement): void {
  const card = (index: number, extra: string) => {
    const spec = CARDS[index];
    if (!spec) return '';
    return `
      <div
        data-part="card-${index}"
        ${extra}
        data-subgrid
        style="display: grid; grid-template-rows: subgrid; grid-column: ${index + 1}; grid-row: 1 / span 3; background: var(--sp-surface); border-radius: 8px; outline: 1px solid var(--sp-line); outline-offset: -1px; overflow: hidden"
      >
        ${cell('8px 10px 4px', `<span style="font-size: 12.5px; font-weight: 600; line-height: 1.25">${spec.title}</span>`)}
        ${cell('2px 10px', spec.body.map((w) => `<span class="sp-line" style="width: ${w}%; height: 6px"></span>`).join(''))}
        ${cell(
          '0 10px 8px',
          '<span class="sp-row" style="gap: 6px"><span class="sp-heading" style="font-size: 13px">£24</span><span class="sp-label">per night</span></span>',
        )}
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <sp-segmented class="sp-segmented" data-axis="Card rows" data-term="subgrid" data-part="switcher" data-value="subgrid">
            <button class="sp-segment" type="button" data-part="seg-subgrid" value="subgrid">subgrid</button>
            <button class="sp-segment" type="button" data-part="seg-own" value="own">its own rows</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 12px">
          <div
            data-part="row"
            style="position: relative; flex: 0 0 auto; display: grid; width: 446px; grid-template-columns: repeat(3, 1fr); grid-template-rows: ${ROWS.map((r) => `${r}px`).join(' ')}; column-gap: 10px; row-gap: 0"
          >
            ${card(0, 'data-subject data-pose="[data-subgrid]"')}
            ${card(1, '')}
            ${card(2, '')}
            <div class="sp-context" data-part="guides" style="position: absolute; inset: 0; pointer-events: none">
              ${GUIDES.map(
                (y) => `<span style="position: absolute; left: 0; right: 0; top: ${y}px; border-top: 1px dashed var(--sp-accent)"></span>`,
              ).join('')}
            </div>
          </div>
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 26px">
            <span class="sp-label">card</span>
            <span
              data-part="chip"
              style="display: inline-flex; align-items: center; justify-content: center; width: 250px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-surface); font-family: ${MONO}; font-size: 11.5px"
            ></span>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const cards = [part(root, 'card-0'), part(root, 'card-1'), part(root, 'card-2')];
  const chip = part(root, 'chip');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const borrowed = key === 'subgrid';
    for (const box of cards) {
      flag(box, 'data-subgrid', borrowed);
      box.style.display = borrowed ? 'grid' : 'flex';
      box.style.gridTemplateRows = borrowed ? 'subgrid' : '';
      box.style.flexDirection = borrowed ? '' : 'column';
    }
    chip.textContent = borrowed ? 'grid-template-rows: subgrid' : 'grid-template-rows: auto auto auto';
    readout.textContent = borrowed
      ? 'Every card is on the parent lines, so the prices line up.'
      : 'Own rows. Each card stacks from its own title and the seams drift.';
  };

  // Each segment names which rows the cards use, so a step lands on that state rather
  // than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('subgrid');
}
