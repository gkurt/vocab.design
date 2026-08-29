import { localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const BODY =
  'A column ends where the last line still fits, and the paragraph carries whatever is left to the top of the next one. Set the same page a hair narrower and the break moves; set it wider and it moves back. ';

const FOLLOW =
  'Every other paragraph on this page breaks where it should. This one leaves its ending behind, and the reader meets the end of a thought before meeting anything to read it with.';

const STRANDED = 'Column two opens with one word, and the paragraph it finishes is on the other side of the break.';
const CARRIED = 'Column two opens with two lines, so the ending arrives with enough of its paragraph to read.';

/**
 * Widow specimen: a two column page where a paragraph's last line has been left at the
 * top of column two, holding one word. The control carries a second line over with it,
 * which is what the `widows` property asks for and what a typesetter does by hand.
 *
 * The break between the columns is authored rather than fragmented by CSS, because the
 * term is about which line lands on which side of a break: a specimen has to put it
 * there rather than hope a flow does, and the two columns are fixed height so the
 * carried line reflows only the column it lands in (SPEC §5).
 *
 * The subject is the widow line itself, the lone word at the top of column two, since
 * the term names that line and not the page it happened on. Column one, the paragraph
 * below, and the control are scenery. What the specimen claims is measured rather than
 * asserted: the carried paragraph reports how many lines it actually occupies.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 500px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Page 34</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Break" data-part="segmented" data-value="set">
            <button class="sp-segment" data-part="seg-set" value="set">As set</button>
            <button class="sp-segment" data-part="seg-carry" value="carry">Carry two lines</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 24px; align-items: flex-start; margin-top: 14px">
          <div class="sp-context" data-part="col-1" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="body" style="font-size: 12px; max-width: none; margin: 0">${BODY}<span
              data-part="pull">What crosses the break here is a single closing </span></p>
          </div>
          <div data-part="col-2" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="carried" style="font-size: 12px; max-width: none; margin: 0"><span
              data-part="widow" data-subject>word.</span></p>
            <p class="sp-prose sp-context" data-part="follow" style="font-size: 12px; max-width: none; margin: 12px 0 0">${FOLLOW}</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="readout" style="margin-top: 12px; font-size: 12px"></p>
      </div>
    </div>
  `;

  const body = part(root, 'body');
  const carried = part(root, 'carried');
  const pull = part(root, 'pull');
  const widow = part(root, 'widow');
  const readout = part(root, 'readout');
  const view = root.ownerDocument.defaultView ?? window;
  const lineHeight = Number.parseFloat(view.getComputedStyle(carried).lineHeight) || 18;

  const report = () => {
    const lines = Math.max(1, Math.round(localSize(carried).height / lineHeight));
    carried.dataset.lines = String(lines);
    flag(widow, 'data-stranded', lines === 1);
    readout.textContent = lines === 1 ? STRANDED : CARRIED;
  };

  report();

  part(root, 'segmented').addEventListener('change', (event) => {
    // Absolute states, not a flip: either the last full line is in column two with the
    // widow or it is back at the end of column one (SPEC §8).
    if ((event as CustomEvent<string>).detail === 'carry') carried.prepend(pull);
    else body.append(pull);
    report();
  });
}
