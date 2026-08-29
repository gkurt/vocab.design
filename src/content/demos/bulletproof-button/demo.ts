import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** A brand fill and its ink, stated as values: a mail carries its own palette. */
const FILL = '#2F57D8';
const FILL_INK = '#FFFFFF';
/** What an unstyled anchor looks like when nothing is left to paint it. */
const RAW_LINK = '#1A4BC4';

const NOTES: Record<string, string> = {
  kept: 'Both render, and nothing on screen says which fill is load-bearing.',
  dropped: 'The fill on the cell is still there. The fill in the stylesheet went with it.',
};

/**
 * Bulletproof button specimen: one call to action built twice inside the same mail
 * body, under a regime the reader picks. The client either keeps the embedded
 * stylesheet or strips it, which is the condition the pattern is named against and
 * one no pointer could ever perform, so a labelled control is the honest way to
 * reach it (SPEC §8).
 *
 * The bulletproof one takes its fill from `bgcolor` on the cell and its size from
 * `cellpadding` and a `width` attribute, with the anchor set to fill the cell, so
 * the whole coloured rectangle is the target. The naive one takes its fill and its
 * padding from a stylesheet. A demo has no stylesheet of its own (SPEC §5), so the
 * paint a dropped `<style>` block would have carried is written as inline style and
 * removed when the regime refuses it: the removal is the simulation, the survivor
 * is real markup.
 *
 * The subject is the bulletproof button, the table that is the control. It is the
 * term in both regimes, which is the whole claim, so there is no dishonest state
 * for identify to refuse. Each button sits in a fixed slot, so the naive one
 * collapsing cannot move the mail body around it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="kept" data-axis="Embedded stylesheet" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-kept" value="kept">Kept</button>
            <button class="sp-segment" data-part="seg-dropped" value="dropped">Stripped</button>
          </sp-segmented>
        </div>

        <div class="sp-context" style="margin-top: 11px; padding: 10px 12px; background: var(--sp-sunken); border-radius: var(--sp-radius)">
          <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Your order is on its way</span>
          <div class="sp-stack" style="gap: 5px; margin-top: 7px">
            <div class="sp-line" style="width: 100%; height: 6px"></div>
            <div class="sp-line" style="width: 64%; height: 6px"></div>
          </div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="proof-slot" style="display: flex; align-items: center; justify-content: center; height: 56px">
              <table
                data-part="proof"
                data-subject
                data-mode="kept"
                role="presentation"
                cellpadding="11"
                cellspacing="0"
                border="0"
                style="border-collapse: collapse"
              >
                <tbody><tr>
                  <td data-part="proof-cell" bgcolor="${FILL}" align="center" width="168" style="border-radius: 6px">
                    <a data-part="proof-link" href="#"
                       style="display: block; color: ${FILL_INK}; font-size: 13px; font-weight: 600; text-decoration: none">Track your order</a>
                  </td>
                </tr></tbody>
              </table>
            </div>
            <span class="sp-label" style="font-size: 10.5px; line-height: 1.35">Fill on the cell, size in attributes, link fills the cell.</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="naive-slot" style="display: flex; align-items: center; justify-content: center; height: 56px">
              <a data-part="naive-link" data-styled="yes" href="#" style="font-size: 13px; font-weight: 600">Track your order</a>
            </div>
            <span class="sp-label" style="font-size: 10.5px; line-height: 1.35">Fill and padding in the stylesheet, on the link itself.</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 9px 0 0; height: 32px; font-size: 12px; line-height: 1.35">${NOTES.kept}</p>
      </div>
    </div>
  `;

  const proof = part(root, 'proof');
  const naive = part(root, 'naive-link');
  const note = part(root, 'note');

  const apply = (mode: string) => {
    const kept = mode !== 'dropped';
    proof.dataset.mode = kept ? 'kept' : 'dropped';
    naive.dataset.styled = kept ? 'yes' : 'no';
    naive.style.display = kept ? 'inline-block' : 'inline';
    naive.style.padding = kept ? '11px 22px' : '0';
    naive.style.background = kept ? FILL : 'transparent';
    naive.style.borderRadius = kept ? '6px' : '0';
    naive.style.color = kept ? FILL_INK : RAW_LINK;
    naive.style.textDecoration = kept ? 'none' : 'underline';
    note.textContent = NOTES[kept ? 'kept' : 'dropped'] ?? '';
  };
  apply('kept');

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
