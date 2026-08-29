import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The three presets, as a hue plus how much of it survives in the neutrals. Neutral is
 * the same hue at zero chroma, so switching to it proves the bias was the only thing
 * doing any work.
 */
const TEMPS: Record<string, { hue: number; chroma: number; reading: string }> = {
  warm: { hue: 62, chroma: 1, reading: 'hue 62, warm' },
  neutral: { hue: 62, chroma: 0, reading: 'no hue, inert' },
  cool: { hue: 250, chroma: 1, reading: 'hue 250, cool' },
};
const START = 'warm';

/**
 * Colour temperature specimen: one panel whose neutrals are biased warm, cooled, or left
 * at zero chroma. Every step keeps its lightness, which is the claim: only the hue in the
 * greys moves, so nothing about the panel's contrast changes when the white point does.
 *
 * The neutrals are pinned rather than derived from the kit's, and they stay light in both
 * themes, for the reason glass and clay are: the wash is the term, and a specimen whose
 * white point followed the page's theme would have nothing to show.
 */
const LEVELS = [
  { l: 0.975, chroma: 0.014, label: 'L .98' },
  { l: 0.94, chroma: 0.02, label: 'L .94' },
  { l: 0.88, chroma: 0.024, label: 'L .88' },
];

const neutral = (l: number, chroma: number, hue: number, k: number) => `oklch(${l} ${chroma * k} ${hue})`;

export function mount(root: HTMLElement): void {
  const tiles = LEVELS.map(
    (level, index) => `
      <div class="sp-stack" style="gap: 4px; flex: 1 1 0">
        <span class="sp-swatch" data-part="tile-${index}" style="height: 34px; border: 1px solid var(--sp-line)"></span>
        <span class="sp-label" style="text-align: center; font-size: 10px">${level.label}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" data-subject data-temp="${START}" style="width: 306px">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Reading list</span>
          <span class="sp-label" data-part="readout" style="width: 92px; text-align: right">${TEMPS[START]?.reading}</span>
        </div>

        <div class="sp-row" style="margin-top: 10px; padding: 10px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-sunken)">
          <span class="sp-grow sp-stack" style="gap: 3px">
            <span class="sp-text sp-text--ink">The Elements of Color</span>
            <span class="sp-text" style="font-size: 12px">Every neutral on this panel shares one bias.</span>
          </span>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 8px; align-items: flex-start">${tiles}</div>
      </div>

      <sp-segmented data-stage-mode class="sp-segmented sp-context" data-axis="Temperature" data-part="segmented" data-value="${START}">
        <button class="sp-segment" data-part="seg-warm" value="warm">Warm</button>
        <button class="sp-segment" data-part="seg-neutral" value="neutral">Neutral</button>
        <button class="sp-segment" data-part="seg-cool" value="cool">Cool</button>
      </sp-segmented>
    </div>
  `;

  const panel = part(root, 'panel');
  const readout = part(root, 'readout');
  const tileEls = LEVELS.map((_, index) => part(root, `tile-${index}`));

  const wash = (name: string) => {
    const temp = TEMPS[name];
    if (!temp) return;
    const { hue, chroma } = temp;
    panel.dataset.temp = name;
    panel.style.setProperty('--sp-surface', neutral(0.975, 0.014, hue, chroma));
    panel.style.setProperty('--sp-sunken', neutral(0.94, 0.02, hue, chroma));
    panel.style.setProperty('--sp-line', neutral(0.88, 0.024, hue, chroma));
    panel.style.setProperty('--sp-ink', neutral(0.32, 0.022, hue, chroma));
    panel.style.setProperty('--sp-muted', neutral(0.56, 0.022, hue, chroma));
    tileEls.forEach((tile, index) => {
      const level = LEVELS[index];
      if (level) tile.style.setProperty('--sp-swatch', neutral(level.l, level.chroma, hue, chroma));
    });
    readout.textContent = temp.reading;
  };
  wash(START);

  part(root, 'segmented').addEventListener('change', (event) => wash((event as CustomEvent<string>).detail));
}
