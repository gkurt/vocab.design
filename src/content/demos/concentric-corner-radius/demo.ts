import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Concentric corner radius specimen: a card inside a card, with the inner radius computed
 * two ways. Concentric subtracts the padding from the outer radius, so both arcs are
 * struck from one centre and the gap holds all the way round; reusing the outer number
 * leaves the sides right and opens the corner out diagonally, which is the mistake the
 * rule exists to stop. The readout prints the inner radius the way an inspector would, so
 * the number can be checked rather than believed.
 *
 * Three strings were the site talking inside the frame and have gone. The topbar read
 * "Inner card, 18 px in" and now names the component. The readout spelled the derivation
 * ("inner = outer 40 - padding 18 = 22 px"), which no inspector prints, and now states the
 * value alone; the article gives the subtraction. A caption under the frame read "The sides
 * look right either way. Only the corner knows whether the subtraction was done." and was
 * deleted outright, along with the choreography assert that named it.
 *
 * The subject is the inner shape's corner, drawn as its own element sized to the radius
 * the rule computes (SPEC §5). Ringing the inner card would claim the card is the term and
 * ringing the pair would claim the nesting is; what the rule produces is one arc, and its
 * extent is what changes between the two states. The arc sits outside the outer card's
 * context register so it keeps the kit accent while the scenery goes quiet.
 *
 * Reusing the outer number is a counter-example the subject passes through, so the honest
 * condition is declared in `data-pose` and the mount state satisfies it (SPEC §6).
 */
const OUTER_R = 40;
const PAD = 18;
const CARD_W = 300;
const CARD_H = 140;
/** The outer card's own border: the inner card's corner starts one pixel further in. */
const EDGE = 1;

type Mode = 'concentric' | 'same';

const INNER_R: Record<Mode, number> = {
  concentric: OUTER_R - PAD,
  same: OUTER_R,
};

const READOUT: Record<Mode, { sum: string; note: string }> = {
  concentric: {
    sum: `Inner radius ${INNER_R.concentric} px`,
    note: 'One centre for both arcs: the gap holds at 18 px all the way round.',
  },
  same: {
    sum: `Inner radius ${INNER_R.same} px`,
    note: 'Sides still 18 px, corner now 25 px: the gap stops being a gap.',
  },
};

/** The traced arc: the quarter circle the rule computes, at the inner card's top left corner. */
function arc(r: number): string {
  return `<path d="M0 ${r} A${r} ${r} 0 0 1 ${r} 0" fill="none" stroke="var(--sp-accent)" stroke-width="2.6" stroke-linecap="round"></path>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 14px">Card</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Inner radius" data-term="concentric" data-part="switcher" data-value="concentric">
            <button class="sp-segment" type="button" data-part="seg-concentric" value="concentric">concentric</button>
            <button class="sp-segment" type="button" data-part="seg-same" value="same">same radius</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div data-part="scene" style="position: relative; width: ${CARD_W}px; height: ${CARD_H}px">
            <div class="sp-context" data-part="outer"
                 style="position: absolute; inset: 0; padding: ${PAD}px; background: var(--sp-surface);
                        border: ${EDGE}px solid var(--sp-line); border-radius: ${OUTER_R}px">
              <div data-part="inner"
                   style="display: flex; flex-direction: column; justify-content: center; gap: 9px;
                          width: 100%; height: 100%; padding: 0 22px; background: var(--sp-sunken);
                          border: 1px solid var(--sp-line); border-radius: ${INNER_R.concentric}px">
                <div class="sp-row" style="gap: 8px">
                  <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">KE</span>
                  <span class="sp-heading" style="font-size: 13px">Kestrel</span>
                </div>
                <span class="sp-line" style="width: 78%"></span>
                <span class="sp-line" style="width: 54%"></span>
              </div>
            </div>
            <svg data-part="corner" data-subject data-pose="[data-mode=concentric]" data-mode="concentric"
                 aria-hidden="true" viewBox="0 0 ${INNER_R.concentric} ${INNER_R.concentric}"
                 style="position: absolute; left: ${PAD + EDGE}px; top: ${PAD + EDGE}px;
                        width: ${INNER_R.concentric}px; height: ${INNER_R.concentric}px; overflow: visible">
              ${arc(INNER_R.concentric)}
            </svg>
          </div>

          <div class="sp-stack sp-context" data-part="readout" data-mode="concentric"
               style="gap: 2px; align-items: center; width: 420px; height: 36px; justify-content: center">
            <span class="sp-label" data-part="sum" style="color: var(--sp-ink); font-variant-numeric: tabular-nums">
              ${READOUT.concentric.sum}
            </span>
            <span class="sp-text" data-stage-verdict data-part="note" style="margin: 0; font-size: 11px; line-height: 1.3; text-align: center">
              ${READOUT.concentric.note}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const inner = part(root, 'inner');
  const corner = part(root, 'corner');
  const readout = part(root, 'readout');
  const sum = part(root, 'sum');
  const note = part(root, 'note');

  function show(mode: Mode): void {
    const r = INNER_R[mode];
    inner.style.borderRadius = `${r}px`;
    corner.dataset.mode = mode;
    corner.setAttribute('viewBox', `0 0 ${r} ${r}`);
    corner.style.width = `${r}px`;
    corner.style.height = `${r}px`;
    corner.innerHTML = arc(r);
    readout.dataset.mode = mode;
    sum.textContent = READOUT[mode].sum;
    note.textContent = READOUT[mode].note;
  }

  part(root, 'switcher').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail as Mode);
  });
}
