import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The published ladder: the value, and the name that carries its multiple of the base. */
const STEPS = [4, 8, 12, 16, 24, 32, 48];
const NAME = (value: number) => `space-${value / 4}`;

/** What the card spends, on the ladder and off it. */
const MODES: Record<string, { pad: number; row: number; block: number; note: string }> = {
  scale: {
    pad: 16,
    row: 8,
    block: 24,
    note: 'Padding 16, row gap 8, block gap 24: three steps off the ladder, and nothing invented.',
  },
  off: {
    pad: 13,
    row: 7,
    block: 22,
    note: 'Padding 13, row gap 7, block gap 22: each one defensible on its own, none of them on the ladder.',
  },
};

/**
 * Spacing scale specimen: the allowed steps drawn as a ruled ladder, beside a card that
 * spends them. Switching to the off-scale state rebuilds the card from values invented for
 * it, and the rungs it was using stop being marked.
 *
 * The subject is the ladder. The term names the set of allowed values rather than anything
 * built from them, so the narrowest honest element is the ruler; the card is the scene the
 * ruler is read against and carries the context register (SPEC §5). Marking the card would
 * have claimed that one arrangement of spacing is the term, which is the opposite of what
 * a scale says.
 *
 * The card's box is fixed, so a rebuild that changes its paddings cannot move the ladder
 * beside it (SPEC §5), and each segment names a source of values rather than flipping
 * between them (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rungs = STEPS.map(
    (value) => `
      <div class="sp-row" data-part="step-${value}" style="gap: 8px; height: 16px">
        <span class="sp-label" style="flex: 0 0 auto; width: 56px">${NAME(value)}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 24px; text-align: right; font-variant-numeric: tabular-nums">${value}</span>
        <span data-part="bar-${value}" style="height: 10px; width: ${value}px; border-radius: 3px; background: var(--sp-line)"></span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Card values</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="scale">
            <button class="sp-segment" type="button" data-part="seg-scale" value="scale">on the scale</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">off the scale</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 28px">
            <div class="sp-stack" data-part="ruler" data-subject data-mode="scale" style="gap: 6px">
              <span class="sp-label" style="color: var(--sp-ink)">Allowed steps</span>
              ${rungs}
            </div>
            <div
              class="sp-surface sp-context"
              data-part="card"
              data-mode="scale"
              style="width: 214px; height: 164px; padding: 16px; display: flex; flex-direction: column"
            >
              <div class="sp-row" data-part="card-head" style="gap: 8px">
                <span class="sp-avatar" style="width: 24px; height: 24px">KE</span>
                <span class="sp-heading" style="font-size: 13px">Kestrel</span>
              </div>
              <div class="sp-stack" data-part="card-body" style="gap: 8px; margin-top: 24px">
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 74%"></div>
              </div>
              <div class="sp-row" data-part="card-foot" style="margin-top: 24px">
                <span class="sp-button sp-button--sm" style="cursor: default">Open</span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 34px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const ruler = part(root, 'ruler');
  const card = part(root, 'card');
  const head = part(root, 'card-head');
  const body = part(root, 'card-body');
  const foot = part(root, 'card-foot');
  const readout = part(root, 'readout');
  const rows = STEPS.map((value) => ({ value, row: part(root, `step-${value}`), bar: part(root, `bar-${value}`) }));

  const apply = (key: string) => {
    const mode = MODES[key];
    if (!mode) return;
    ruler.dataset.mode = key;
    card.dataset.mode = key;
    card.style.padding = `${mode.pad}px`;
    head.style.gap = `${mode.row}px`;
    body.style.gap = `${mode.row}px`;
    body.style.marginTop = `${mode.block}px`;
    foot.style.marginTop = `${mode.block}px`;
    const spent = new Set([mode.pad, mode.row, mode.block]);
    for (const { value, row, bar } of rows) {
      const used = spent.has(value);
      flag(row, 'data-used', used);
      bar.style.background = used ? 'var(--sp-accent)' : 'var(--sp-line)';
    }
    readout.textContent = mode.note;
  };

  // Each segment names where the card's values come from, so the switch lands on that
  // source rather than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('scale');
}
