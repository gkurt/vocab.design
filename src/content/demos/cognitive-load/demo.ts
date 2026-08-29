import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Choice = { key: string; label: string; note: string };

/** The calm build: two grouped questions in plain words, each already answered. */
const FORMAT: Choice[] = [
  { key: 'csv', label: 'Spreadsheet', note: 'default' },
  { key: 'json', label: 'Data file', note: '' },
  { key: 'pdf', label: 'Printable', note: '' },
];

const RANGE: Choice[] = [
  { key: 'month', label: 'Last 30 days', note: 'default' },
  { key: 'quarter', label: 'This quarter', note: '' },
  { key: 'all', label: 'Everything', note: '' },
];

/** The dense build: the same export, unanswered, in the words of the file format. */
const DENSE = [
  'RFC 4180 delimited',
  'UTF-8 with BOM',
  'ISO 8601 timestamps',
  'NDJSON stream',
  'Gzip envelope',
  'Epoch seconds',
  'Rolling 30d window',
  'Fiscal Q window',
  'Unbounded extract',
];

const CAPTION = {
  calm: 'Two questions, grouped, in the reader’s own words, both already answered. The load left is the load the task really carries.',
  dense: 'One task, nine ungrouped options, named after the file format and answered by nobody. Everything added here is extraneous load.',
} as const;

type Mode = keyof typeof CAPTION;

const READOUT = {
  calm: 'Two decisions, both pre-answered',
  dense: 'Nine decisions, none pre-answered',
} as const;

const GROUP = 'padding: 6px 10px; border: 1px solid var(--sp-line); border-radius: 6px';

/**
 * Cognitive load specimen: one export task built twice. The calm build asks two grouped
 * questions in plain words and arrives with both already answered; the dense build asks the
 * same thing as nine ungrouped options named after the file format, with nothing filled in.
 * Nothing about the task changed between them, which is the point: the difference is the
 * load the design added.
 *
 * The subject is the task region, the narrowest element that holds the demand the term is
 * about. The state control, the decision readout, and the caption are scenery (SPEC §5).
 * The dense build is a state the subject itself passes through, so the honest condition is
 * declared in `data-pose` and the mount state satisfies it: identify refuses to ring the
 * expensive version, which would point at the opposite of what a designer is trying to
 * reduce (SPEC §6).
 *
 * Both builds fill the same fixed box and the caption holds a fixed height, so switching
 * states moves nothing (SPEC §5). Each segment reaches its own build and picking a format
 * sets that format rather than toggling it, so a pass joined halfway proves the same thing
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const chip = (group: string, choice: Choice, selected: boolean) => `
    <button class="sp-chip" type="button" role="radio" data-part="${group}-${choice.key}"
            data-pick="${group}" data-key="${choice.key}" aria-checked="${String(selected)}"
            ${selected ? 'data-selected' : ''} style="font-size: 11px; padding: 3px 9px">
      ${choice.label}${choice.note ? `<span class="sp-label" style="font-size: 10px">${choice.note}</span>` : ''}
    </button>`;

  const calm = () => `
    <div class="sp-stack" style="gap: 8px">
      <div style="${GROUP}">
        <span class="sp-label">What should it open in?</span>
        <div class="sp-row sp-row--wrap" style="margin-top: 4px; gap: 6px">
          ${FORMAT.map((c) => chip('fmt', c, c.key === 'csv')).join('')}
        </div>
      </div>
      <div style="${GROUP}">
        <span class="sp-label">How far back?</span>
        <div class="sp-row sp-row--wrap" style="margin-top: 4px; gap: 6px">
          ${RANGE.map((c) => chip('range', c, c.key === 'month')).join('')}
        </div>
      </div>
    </div>`;

  const dense = () => `
    <div>
      <span class="sp-label" style="font-size: 11px">
        Configure the extract profile. Unset fields inherit the workspace policy, which may differ per region.
      </span>
      <div class="sp-row sp-row--wrap" style="margin-top: 6px; gap: 5px">
        ${DENSE.map(
          (label, i) => `<button class="sp-chip" type="button" data-part="dense-${i}"
             style="font-size: 11px; padding: 3px 9px">${label}</button>`,
        ).join('')}
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Export your orders, built</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-term="calm" data-part="segmented" data-value="calm">
            <button class="sp-segment" data-part="seg-calm" value="calm">Chunked</button>
            <button class="sp-segment" data-part="seg-dense" value="dense">Dense</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="task" data-subject data-pose="[data-mode=calm]" data-mode="calm"
             style="margin-top: 10px; padding: 10px 12px; height: 156px; overflow: hidden">${calm()}</div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 18px">
          <span class="sp-label">Asked of the reader</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="calm"
                style="font-size: 12px; white-space: nowrap">${READOUT.calm}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" data-case="calm"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.calm}</p>
      </div>
    </div>
  `;

  const task = part(root, 'task');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  // Delegated, because the task's contents are rewritten whenever the build changes.
  task.addEventListener('click', (event) => {
    const picked = (event.target as HTMLElement).closest<HTMLElement>('[data-pick]');
    if (!picked) return;
    const group = picked.dataset.pick;
    for (const el of task.querySelectorAll<HTMLElement>(`[data-pick="${group}"]`)) {
      const on = el === picked;
      el.setAttribute('aria-checked', String(on));
      flag(el, 'data-selected', on);
    }
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'dense' ? 'dense' : 'calm';
    task.dataset.mode = next;
    task.innerHTML = next === 'dense' ? dense() : calm();
    readout.dataset.state = next;
    readout.textContent = READOUT[next];
    caption.dataset.case = next;
    caption.textContent = CAPTION[next];
  });
}
