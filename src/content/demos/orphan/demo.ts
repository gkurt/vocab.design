import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LEAD =
  'A paragraph does not know where the column it is sitting in stops. It fills the measure line by line until the space runs out, and whatever has not been set yet goes over the break.';

const CARRIED = 'one line before the column runs out, and finishes on the far side of the break, where nobody was reading yet.';

const FOLLOW = 'The paragraph after it is whole, which is what makes the one above look like an accident rather than a style.';

const STRANDED = 'One line of the paragraph is left at the foot of column one.';
const KEPT = 'The paragraph is whole in column two, and column one ends a line early.';

/**
 * Orphan specimen: a two column page where a paragraph's first line has been left at the
 * foot of column one. The control keeps the paragraph together, which is what
 * `orphans: 2` and `break-inside: avoid` ask a fragmenting layout for.
 *
 * The break between the columns is authored rather than fragmented by CSS, for the same
 * reason its sibling widow does it: the term is about which line lands on which side of
 * a break, so the specimen puts it there instead of hoping a flow does. Both columns are
 * fixed height, so the line moving reflows only the column it lands in (SPEC §5).
 *
 * The subject is the orphan line, the opening of the carried paragraph, since the term
 * names that line rather than the page it happened on. The lead paragraph, the paragraph
 * below, and the control are scenery. Which column the line is actually in is measured
 * rather than claimed.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 500px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Page 12</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="set">
            <button class="sp-segment" data-part="seg-set" value="set">As set</button>
            <button class="sp-segment" data-part="seg-keep" value="keep">Keep together</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 24px; align-items: flex-start; margin-top: 14px">
          <div data-part="col-1" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose sp-context" data-part="lead" style="font-size: 12px; max-width: none; margin: 0">${LEAD}</p>
            <p class="sp-prose" data-part="head" style="font-size: 12px; max-width: none; margin: 10px 0 0"><span
              data-part="orphan" data-subject>The next paragraph begins here, </span></p>
          </div>
          <div class="sp-context" data-part="col-2" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="carried" style="font-size: 12px; max-width: none; margin: 0">${CARRIED}</p>
            <p class="sp-prose" data-part="follow" style="font-size: 12px; max-width: none; margin: 10px 0 0">${FOLLOW}</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="readout" style="margin-top: 12px; font-size: 12px"></p>
      </div>
    </div>
  `;

  const head = part(root, 'head');
  const carried = part(root, 'carried');
  const orphan = part(root, 'orphan');
  const column2 = part(root, 'col-2');
  const readout = part(root, 'readout');

  const report = () => {
    const inSecond = orphan.getBoundingClientRect().left >= column2.getBoundingClientRect().left - 1;
    orphan.dataset.column = inSecond ? '2' : '1';
    readout.textContent = inSecond ? KEPT : STRANDED;
  };

  report();

  part(root, 'segmented').addEventListener('change', (event) => {
    // Absolute states, not a flip: the opening line is either at the foot of column one
    // or at the head of its own paragraph in column two (SPEC §8).
    const keep = (event as CustomEvent<string>).detail === 'keep';
    if (keep) carried.prepend(orphan);
    else head.prepend(orphan);
    head.hidden = keep;
    report();
  });
}
