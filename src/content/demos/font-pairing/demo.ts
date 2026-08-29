import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Four faces a machine is likely to have, written as local stacks for the reason
 * every type specimen is: the kit has one sans on purpose (SPEC §5), and a
 * demonstration about two voices cannot be made in one. Named families first,
 * generic last. Georgia over Verdana is the working pairing (different
 * skeletons, close x-heights); Arial over Verdana is the near miss, two
 * grotesques that almost agree.
 */
const GEORGIA = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const VERDANA = "Verdana, 'DejaVu Sans', 'Bitstream Vera Sans', sans-serif";
const ARIAL = "Arial, Helvetica, 'Liberation Sans', sans-serif";

type Pairing = { display: string; text: string; names: string; note: string };

const PAIRINGS: Record<string, Pairing> = {
  paired: {
    display: GEORGIA,
    text: VERDANA,
    names: 'Georgia over Verdana',
    note: 'Different skeletons, close x-heights: the contrast reads as a decision.',
  },
  clashing: {
    display: ARIAL,
    text: VERDANA,
    names: 'Arial over Verdana',
    note: 'Two grotesques that nearly agree: the difference reads as a mistake.',
  },
};

const HEADLINE = 'Harbour Review';
const BODY = 'The survey team spent three weeks on the pontoon, reading the tide gauge against the staff gauge.';

/**
 * Font pairing specimen: one headline over one paragraph, set by a segmented
 * pick in a pairing that works and a pairing that nearly does. The type is the
 * only thing that changes, so the second state is the same layout in a different
 * pair of voices.
 *
 * The subject is the two samples together. A pairing is a relationship, so the
 * narrowest element that is one is the block holding both faces; ringing either
 * sample alone would claim the term names a typeface. The face names and the
 * note are scenery.
 *
 * Its `clashing` state is the counter-example the term exists to steer away
 * from, so the honest condition is declared in `data-pose` (SPEC §6) and the
 * specimen mounts on the working pair. Both boxes hold the room the wider face
 * needs, so a face swap moves nothing below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">pairing</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="paired" data-axis="Fit" data-term="paired">
            <button class="sp-segment" data-part="seg-paired" value="paired">works</button>
            <button class="sp-segment" data-part="seg-clashing" value="clashing">clashes</button>
          </sp-segmented>
        </div>
        <div data-part="specimen" data-subject data-pairing="paired" data-pose="[data-pairing=paired]" style="margin-top: 12px">
          <div data-part="display" style="height: 28px; font-size: 21px; line-height: 28px; font-family: ${GEORGIA}">${HEADLINE}</div>
          <p data-part="body" style="margin: 4px 0 0; height: 72px; font-size: 12.5px; line-height: 18px;
             font-family: ${VERDANA}">${BODY}</p>
        </div>
        <div class="sp-row sp-context" data-part="names" style="height: 18px">
          <span class="sp-label" data-part="names-text"></span>
        </div>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <p class="sp-text sp-context" data-part="readout" style="margin: 0; height: 34px; font-size: 12px; line-height: 17px"></p>
      </div>
    </div>
  `;

  const specimen = part(root, 'specimen');
  const display = part(root, 'display');
  const body = part(root, 'body');
  const names = part(root, 'names-text');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const pairing = PAIRINGS[value];
    if (!pairing) return;
    specimen.dataset.pairing = value;
    display.style.fontFamily = pairing.display;
    body.style.fontFamily = pairing.text;
    names.textContent = pairing.names;
    readout.textContent = pairing.note;
  };

  apply('paired');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
