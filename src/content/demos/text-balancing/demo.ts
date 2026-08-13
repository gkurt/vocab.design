import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A heading whose greedy break strands its tail: filled line by line, the last
 * words drop into a stub, and equalising the lines pulls them back up. The exact
 * rag depends on the face the kit resolves, which is the honest situation the
 * article describes, so the readout states what each setting did rather than
 * naming a word count the metrics might not produce.
 */
const TITLE = 'Take the harbour survey with you today';
const COLUMN = 256;
const LINE_PX = 25;
/** Three lines of room, so a rebreak cannot move the readout under the heading. */
const LINES = 3;

const NOTES: Record<string, string> = {
  wrap: 'Greedy: each line fills before the next starts.',
  balance: 'Even: the breaker equalises the line lengths.',
};

/**
 * Text balancing specimen: one heading, one width, two line breakers. The dashed
 * rule down the right edge is the width both settings are solving for, so the
 * shape of the rag can be read against it.
 *
 * The subject is the heading. Its `wrap` state is the counter-example the term
 * exists to fix, so the honest condition is declared in `data-pose` (SPEC §6)
 * and the specimen mounts balanced: identify refuses to ring the greedy setting
 * and plays on until the pick comes back round. The box holds three lines of
 * room whichever setting is showing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">text-wrap</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="balance">
            <button class="sp-segment" data-part="seg-wrap" value="wrap">wrap</button>
            <button class="sp-segment" data-part="seg-balance" value="balance">balance</button>
          </sp-segmented>
        </div>
        <div data-part="measure" style="width: ${COLUMN}px; height: ${LINE_PX * LINES}px; margin-top: 12px;
             border-right: 1px dashed var(--sp-line)">
          <h3 data-part="headline" data-subject data-wrap="balance" data-pose="[data-wrap=balance]"
              style="margin: 0; padding-right: 8px; font-size: 19px; font-weight: 600; line-height: ${LINE_PX}px;
                     text-wrap: balance">${TITLE}</h3>
        </div>
        <p class="sp-text sp-context" data-part="readout" style="margin: 6px 0 0; height: 34px; font-size: 12px; line-height: 17px"></p>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <div class="sp-stack sp-context" data-part="body" style="gap: 3px">
          <span class="sp-label">body copy stays greedy</span>
          <p class="sp-text" style="margin: 0; font-size: 12px; line-height: 17px">
            Past a handful of lines the browser stops balancing, which is why a paragraph keeps
            the breaks it was given.
          </p>
        </div>
      </div>
    </div>
  `;

  const headline = part(root, 'headline');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const note = NOTES[value];
    if (!note) return;
    headline.dataset.wrap = value;
    headline.style.setProperty('text-wrap', value);
    readout.textContent = note;
  };

  apply('balance');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
