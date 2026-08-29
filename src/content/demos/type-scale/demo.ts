import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const BASE = 12;
const ROLES = ['Display', 'Title', 'Body', 'Caption'];
const RATIOS: Record<string, number> = { '1.2': 1.2, '1.333': 1.333, '1.5': 1.5 };

const sizeAt = (ratio: number, i: number) => BASE * ratio ** (ROLES.length - 1 - i);

/**
 * Type scale specimen: four named steps generated from one ratio, with the
 * ratio itself switchable. The sizes are what change, so the column holding
 * them is given the room the largest ratio needs and nothing outside it moves
 * (SPEC §5). The readouts sit in a fixed column for the same reason.
 */
export function mount(root: HTMLElement): void {
  const rows = ROLES.map(
    (role, i) => `
      <div data-part="step-${i}" style="display: grid; grid-template-columns: 1fr 58px; align-items: baseline; column-gap: 10px">
        <span data-part="sample-${i}" style="font-weight: 600; line-height: 1.12">${role}</span>
        <span class="sp-label" data-part="readout-${i}" style="text-align: right">0px</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Type scale</span>
          <sp-segmented class="sp-segmented" data-axis="Ratio" data-part="segmented" data-value="1.2">
            <button class="sp-segment" data-part="seg-120" value="1.2">1.2</button>
            <button class="sp-segment" data-part="seg-133" value="1.333">1.333</button>
            <button class="sp-segment" data-part="seg-150" value="1.5">1.5</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" data-part="scale" data-subject data-ratio="1.2"
             style="gap: 10px; height: 150px; margin-top: 14px; overflow: hidden">
          ${rows}
        </div>
        <p class="sp-text sp-context" data-part="formula" style="margin-top: 10px">12px base</p>
      </div>
    </div>
  `;

  const scale = part(root, 'scale');
  const formula = part(root, 'formula');
  const samples = ROLES.map((_, i) => part(root, `sample-${i}`));
  const readouts = ROLES.map((_, i) => part(root, `readout-${i}`));

  const apply = (name: string) => {
    const ratio = RATIOS[name];
    if (!ratio) return;
    scale.dataset.ratio = name;
    ROLES.forEach((_, i) => {
      const px = sizeAt(ratio, i).toFixed(1);
      samples[i]?.style.setProperty('font-size', `${px}px`);
      const readout = readouts[i];
      if (readout) readout.textContent = `${px}px`;
    });
    formula.textContent = `${BASE}px base, ratio ${name}, four steps`;
  };

  apply('1.2');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
