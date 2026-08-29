import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Value = { key: string; label: string; groups: string[]; shape: string };

/** Three values people are routinely asked to read back, in the groups they are read in. */
const VALUES: Value[] = [
  { key: 'card', label: 'Card number', groups: ['4539', '1488', '0343', '6467'], shape: '4 + 4 + 4 + 4' },
  { key: 'phone', label: 'Phone', groups: ['07700', '900', '123'], shape: '5 + 3 + 3' },
  { key: 'code', label: 'One time code', groups: ['482', '913'], shape: '3 + 3' },
];

const CAPTION = {
  chunked: 'Four groups to hold, then three, then two. Each one is short enough to carry to the keyboard in a single glance.',
  run: 'The same characters with the groups closed up. Nothing was removed, and every value became one long thing to hold.',
} as const;

/**
 * Chunking specimen: three values a person is routinely asked to read off one surface and
 * type into another, shown in the groups they are read in and then with the groups closed
 * up. The readout counts what the reader has to hold in each state, which is the whole
 * claim of the term.
 *
 * The subject is the value block, the narrowest element that holds the grouping the term
 * names. The mode control, the shape column and the caption are scenery (SPEC §5). Running
 * the groups together is a state the subject itself passes through, so the honest condition
 * is declared in `data-pose` and the mount state satisfies it: identify refuses to ring the
 * unchunked version, which is the opposite of the term (SPEC §6).
 *
 * The groups are the same elements in both states, spaced or not spaced, so nothing is
 * added or removed and the rows never move (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const row = (v: Value) => `
    <div class="sp-row" data-part="row-${v.key}" style="gap: 10px; height: 30px">
      <span class="sp-label" style="flex: 0 0 96px">${v.label}</span>
      <span data-part="value-${v.key}" style="flex: 0 0 190px; display: flex; gap: 9px; font-size: 15px;
            font-variant-numeric: tabular-nums; letter-spacing: 0.02em; transition: gap 0.24s var(--sp-ease)">
        ${v.groups.map((g) => `<span>${g}</span>`).join('')}
      </span>
      <span class="sp-text" data-part="pieces-${v.key}" data-count="${v.groups.length}"
            style="flex: 1 1 auto; text-align: right; font-size: 11px; white-space: nowrap">${v.groups.length} groups</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Same characters, two shapes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Grouping" data-term="chunked" data-part="segmented" data-value="chunked">
            <button class="sp-segment" data-part="seg-chunked" value="chunked">Chunked</button>
            <button class="sp-segment" data-part="seg-run" value="run">One run</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="values" data-subject data-pose="[data-mode=chunked]" data-mode="chunked"
             style="margin-top: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px">
          ${VALUES.map(row).join('')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Read back as</span>
          <span class="sp-text sp-text--ink" data-part="shape" data-mode="chunked"
                style="font-size: 12px; white-space: nowrap">${VALUES[0]?.shape ?? ''}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="chunked"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${CAPTION.chunked}</p>
      </div>
    </div>
  `;

  const values = part(root, 'values');
  const shape = part(root, 'shape');
  const caption = part(root, 'caption');

  const apply = (chunked: boolean) => {
    values.dataset.mode = chunked ? 'chunked' : 'run';
    for (const v of VALUES) {
      // The gap is the chunking: the same spans, spaced or closed up, so nothing moves
      // but the groups themselves (SPEC §5).
      part(root, `value-${v.key}`).style.gap = chunked ? '9px' : '0px';
      const pieces = part(root, `pieces-${v.key}`);
      const characters = v.groups.join('').length;
      pieces.dataset.count = String(chunked ? v.groups.length : characters);
      pieces.textContent = chunked ? `${v.groups.length} groups` : `${characters} characters`;
    }
    shape.dataset.mode = chunked ? 'chunked' : 'run';
    shape.textContent = chunked ? (VALUES[0]?.shape ?? '') : 'one unbroken run';
    caption.dataset.case = chunked ? 'chunked' : 'run';
    caption.textContent = chunked ? CAPTION.chunked : CAPTION.run;
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail !== 'run');
  });
}
