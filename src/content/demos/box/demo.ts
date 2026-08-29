import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MODES = [
  { key: 'bare', label: 'spacing only' },
  { key: 'boxed', label: 'one box' },
  { key: 'nested', label: 'a box each' },
];

const ROWS = [
  { label: 'Email digest', on: true },
  { label: 'Push alerts', on: false },
  { label: 'Sound', on: true },
];

/** Every row keeps this height in every mode, so nesting repaints rather than reflows. */
const ROW_HEIGHT = 42;

const NOTES: Record<string, string> = {
  bare: 'Spacing alone: a careful reader can infer the group, and nothing states it.',
  boxed: 'One drawn box, with a title that names what the three controls have in common.',
  nested: 'A border per control: four boxes, and the grouping they were for has gone.',
};

/**
 * Box specimen: the same three controls grouped three ways, picked absolutely. Spacing only,
 * where the grouping is an inference; one titled box, where it is drawn; and a box per control,
 * the over-boxing failure, where four borders say less than one did.
 *
 * The subject is the box itself, `data-part="box"`. It carries `data-pose="[data-drawn]"`
 * because the bare state is a counter-example the subject passes through: ringing an undrawn
 * container would identify the absence of the term. The mount state is the drawn one, so the
 * pose holds there (SPEC §6).
 *
 * The controls inside are scenery in the context register, applied to the rows rather than to
 * an ancestor of the box, so the subject keeps the full kit palette. Row heights and the title
 * slot are fixed, and the bare state's border is transparent rather than absent, so switching
 * modes never moves a box edge (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (row, i) => `
      <div
        class="sp-context"
        data-part="row-${i + 1}"
        style="display: flex; align-items: center; justify-content: space-between; flex: 0 0 auto;
               height: ${ROW_HEIGHT}px; padding: 0 10px; border: 1px solid transparent; border-radius: 6px"
      >
        <span class="sp-text sp-text--ink" style="font-size: 13px">${row.label}</span>
        <button class="sp-switch" type="button" role="switch" aria-checked="${row.on}" aria-label="${row.label}"></button>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Grouped by</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Grouping" data-term="boxed" data-value="boxed">
            ${MODES.map(
              (mode) => `
              <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            data-part="box"
            data-subject
            data-mode="boxed"
            data-drawn
            data-pose="[data-drawn]"
            style="display: flex; flex-direction: column; gap: 8px; width: 300px; height: 192px; padding: 12px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div style="flex: 0 0 auto; height: 18px">
              <span class="sp-label" data-part="box-title" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 12px; line-height: 18px">Notifications</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px">${rows}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${NOTES.boxed}</span>
    </div>
  `;

  const box = part(root, 'box');
  const title = part(root, 'box-title');
  const note = part(root, 'note');
  const rowEls = ROWS.map((_, i) => part(root, `row-${i + 1}`));

  const apply = (key: string) => {
    const drawn = key !== 'bare';
    box.dataset.mode = key;
    if (drawn) box.dataset.drawn = '';
    else delete box.dataset.drawn;

    box.style.background = key === 'nested' ? 'var(--sp-sunken)' : drawn ? 'var(--sp-surface)' : 'transparent';
    box.style.borderColor = drawn ? 'var(--sp-line)' : 'transparent';
    title.hidden = !drawn;

    for (const row of rowEls) {
      const nested = key === 'nested';
      if (nested) row.dataset.nested = '';
      else delete row.dataset.nested;
      row.style.borderColor = nested ? 'var(--sp-line)' : 'transparent';
      row.style.background = nested ? 'var(--sp-surface)' : 'transparent';
    }

    note.textContent = NOTES[key] ?? '';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // Mount in the drawn state, which is both the term and the state the pose requires.
  apply('boxed');
}
