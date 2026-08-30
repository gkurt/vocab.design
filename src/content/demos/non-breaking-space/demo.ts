import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Each pair is tinted, so the glue is visible without measuring anything: a pair
 * that falls across two lines drags its tint with it and is unmistakably torn,
 * and one held together stays a single unbroken block. Which pair lands at a
 * line end depends on the face the kit resolves, which is exactly the situation
 * the character exists for, so the readout names what the setting does rather
 * than which pair it saved. That readout changes with the pick, so it is the
 * stage's verdict now and is drawn in the strip. The heading that used to sit
 * over the switch ("the space in each pair") went with it: it was the site
 * labelling its own control inside the window, and the strip names the switch
 * already. The source row under the column ("written as bring the 10&nbsp;km chart")
 * went the same way: printing the entity spelling was the site teaching HTML inside a
 * window that is meant to be a document, and the article gives that spelling already.
 */
const PAIRS = ['Dr. Chen', '10 km', 'section 4.2', 'Figure 3'];
const NBSP = ' ';
const COLUMN = 150;
const LINE_PX = 17;
/** Six lines of room, so a rebreak cannot move the scenery under the column. */
const LINES = 6;

const NOTES: Record<string, string> = {
  space: 'Ordinary spaces: a pair is free to fall across two lines.',
  nbsp: 'No-break spaces: each pair stays whole wherever the line ends.',
};

/**
 * Non-breaking space specimen: one narrow column whose four glued pairs are
 * tinted, set once with ordinary spaces and once with U+00A0. The dashed rule
 * down the right edge is the measure the breaker is solving for.
 *
 * The subject is the column. Its `space` state is the counter-example the
 * character exists to fix, so the honest condition is declared in `data-pose`
 * (SPEC §6) and the specimen mounts glued: identify refuses to ring the torn
 * setting and plays on until the pick comes back round.
 */
export function mount(root: HTMLElement): void {
  const pair = (index: number) => `<span data-part="pair" style="background: var(--sp-accent-soft)">${PAIRS[index]}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="nbsp" data-axis="Character" data-term="nbsp">
          <button class="sp-segment" data-part="seg-space" value="space">space</button>
          <button class="sp-segment" data-part="seg-nbsp" value="nbsp">nbsp</button>
        </sp-segmented>
        <div class="sp-row" style="gap: 10px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">measure: ${COLUMN}px</span>
            <div data-part="measure" style="width: ${COLUMN}px; height: ${LINE_PX * LINES}px; border-right: 1px dashed var(--sp-line)">
              <p class="sp-text sp-text--ink" data-part="column" data-subject data-glue="nbsp" data-pose="[data-glue=nbsp]"
                 style="margin: 0; padding-right: 6px; font-size: 12px; line-height: ${LINE_PX}px">
                Meet ${pair(0)} on the pontoon, bring the ${pair(1)} chart, and read ${pair(2)} before ${pair(3)}.
              </p>
            </div>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 0; width: 96px; font-size: 12px; line-height: 16px"></p>
        </div>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const readout = part(root, 'readout');
  const pairs = partsOf(root, 'pair');

  const apply = (value: string) => {
    const note = NOTES[value];
    if (!note) return;
    column.dataset.glue = value;
    for (const [index, el] of pairs.entries()) {
      const text = PAIRS[index];
      if (text) el.textContent = value === 'nbsp' ? text.replaceAll(' ', NBSP) : text;
    }
    readout.textContent = note;
  };

  apply('nbsp');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
