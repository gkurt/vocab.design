import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const TEXT =
  'Stop reading and look at the block. What you see is not words but a grey field, and its lightness is a decision you already made when you chose the weight, the leading and the tracking.';

/** How far the squint goes. Enough to take the words away and leave the texture. */
const BLUR = 1.7;
/** Room for the loosest setting, which is the tallest column (SPEC §5). */
const ROW = 128;
const WIDTH = 124;

type Column = { part: string; label: string; css: string };

const COLUMNS: Column[] = [
  { part: 'col-light', label: '300 · 1.9 · +0.06em', css: 'font-weight: 300; line-height: 1.9; letter-spacing: 0.06em' },
  { part: 'col-even', label: '400 · 1.55 · 0', css: 'font-weight: 400; line-height: 1.55; letter-spacing: 0' },
  { part: 'col-dark', label: '600 · 1.25 · -0.015em', css: 'font-weight: 600; line-height: 1.25; letter-spacing: -0.015em' },
];

/**
 * Typographic color specimen: the same paragraph set three ways, and a switch that
 * takes the words away. Squinting is the term's own instruction rather than a
 * gimmick: the grey value is not visible while you are still reading, so the blur
 * is the demonstration. Under it the middle block sits between a pale field and a
 * dark one, which is the only way the property is ever really judged.
 *
 * The subject is the middle block, the one whose grey value is being judged; the
 * pale and dark settings are what it is read against, so they are scenery
 * (SPEC §5). Both states are honest for the subject: a squinted paragraph is
 * still a paragraph with a grey value, so nothing here needs `data-pose`.
 *
 * A blur changes no box, so the columns cannot move when the switch flips, and the
 * row reserves the height of the loosest setting.
 */
export function mount(root: HTMLElement): void {
  const column = ({ part: name, label, css }: Column) => {
    const scenery = name !== 'col-even';
    return `
      <div class="sp-stack${scenery ? ' sp-context' : ''}" style="gap: 4px; width: ${WIDTH}px">
        <span style="font-size: 10px; color: var(--sp-muted); white-space: nowrap">${label}</span>
        <p data-part="${name}"${scenery ? '' : ' data-subject'}
           style="margin: 0; font-size: 8px; ${css}; transition: filter 0.3s ease">${TEXT}</p>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Viewing" data-part="segmented" data-value="read">
            <button class="sp-segment" data-part="seg-read" value="read">read</button>
            <button class="sp-segment" data-part="seg-squint" value="squint">squint</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="view" data-mode="read"
             style="gap: 14px; align-items: flex-start; height: ${ROW}px; margin-top: 12px; overflow: hidden">
          ${COLUMNS.map(column).join('')}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          Same words, same size, three settings. Squinting is how the property is judged, because the grey
          value is not visible while you are still reading.
        </p>
      </div>
    </div>
  `;

  const view = part(root, 'view');
  const blocks = COLUMNS.flatMap(({ part: name }) => partsOf(root, name));

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (value !== 'read' && value !== 'squint') return;
    view.dataset.mode = value;
    for (const block of blocks) block.style.filter = value === 'squint' ? `blur(${BLUR}px)` : 'none';
  });
}
