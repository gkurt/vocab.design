import { localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const BODY =
  'The harbour master kept his ledger in a hand that leaned backwards, and every entry was the same three columns: the name of the boat, the berth it took, and the hour it left again. Nobody had asked him to. ';

/** The last full line of that paragraph, and the word it leaves behind: the pull is what the
    control carries across the break, so it has to end mid-sentence. */
const PULL = 'He simply believed a harbour should be able to ';
const WIDOW = 'remember.';

const FOLLOW =
  'By the time the season turned he had filled four of them, and the fourth was the one the insurers asked for. He handed it over and started the fifth that evening.';

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
 *
 * The page's own prose used to describe the demonstration ("A column ends where the last
 * line still fits...", "Every other paragraph on this page breaks where it should..."),
 * which is the site writing inside a book nobody would print it in. It is ordinary
 * narrative now, cut to the same line counts, and the line that crosses the break ends
 * mid-sentence so the stranded word finishes it. The readout under the columns changes
 * with the switch, so it is the author's verdict and the stage draws it in the strip
 * (SPEC §5.1) rather than inside the page.
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
              data-part="pull">${PULL}</span></p>
          </div>
          <div data-part="col-2" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="carried" style="font-size: 12px; max-width: none; margin: 0"><span
              data-part="widow" data-subject>${WIDOW}</span></p>
            <p class="sp-prose sp-context" data-part="follow" style="font-size: 12px; max-width: none; margin: 12px 0 0">${FOLLOW}</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 12px; font-size: 12px"></p>
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
