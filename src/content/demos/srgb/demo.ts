import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Hue = { key: string; label: string; hex: string; rgb: string; unit: string };

/** One hue per state, written out in the three notations the web spells sRGB with. */
const HUES: Hue[] = [
  { key: 'red', label: 'Red', hex: '#E5342B', rgb: '229 52 43', unit: '0.898 0.204 0.169' },
  { key: 'green', label: 'Green', hex: '#2FA84F', rgb: '47 168 79', unit: '0.184 0.659 0.31' },
  { key: 'blue', label: 'Blue', hex: '#2F5FE0', rgb: '47 95 224', unit: '0.184 0.373 0.878' },
];

const START = 'red';

const NOTATIONS = [
  { key: 'hex', write: (h: Hue) => h.hex },
  { key: 'rgb', write: (h: Hue) => `rgb(${h.rgb})` },
  { key: 'srgb', write: (h: Hue) => `color(srgb ${h.unit})` },
] as const;

/**
 * sRGB specimen: one colour written three ways, all of them naming the same space, beside
 * the same coordinates handed to a wider one. The three spellings paint identically because
 * an untagged hex or `rgb()` value already means sRGB; the `display-p3` block takes the same
 * numbers into a bigger space, where they land on a colour sRGB cannot reach.
 *
 * The subject is the panel of sRGB spellings. The term names the space, and the closest a
 * specimen can get to a space is the set of values that resolve in it: the wider block below
 * is the comparison and the hue control is instrumentation, so both stay in the context
 * register. The horseshoe diagram belongs to colour gamut and the axes story to colour
 * space; neither is re-owned here.
 *
 * Every box is fixed size and only paint and text change with the hue, so nothing moves
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = HUES.find((h) => h.key === START) ?? HUES[0];
  if (!start) return;

  const rows = NOTATIONS.map(
    (n) => `
      <div class="sp-row" style="gap: 9px">
        <span class="sp-swatch" data-part="chip-${n.key}" style="flex: 0 0 auto; width: 20px; height: 20px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${n.write(start)}"></span>
        <span data-part="code-${n.key}" style="font-size: 11.5px; letter-spacing: 0.01em">${n.write(start)}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 432px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Hue" data-value="${START}">
            ${HUES.map((h) => `<button class="sp-segment" data-part="seg-${h.key}" value="${h.key}">${h.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <span class="sp-label sp-context" style="display: block; margin-top: 11px">Three spellings, one space</span>
        <div class="sp-stack" data-part="space" data-subject data-hue="${START}"
             style="gap: 6px; margin-top: 5px; padding: 9px 10px; border-radius: var(--sp-radius);
                    border: 1px solid var(--sp-line); background: var(--sp-surface)">
          ${rows}
        </div>

        <div class="sp-context">
          <span class="sp-label" style="display: block; margin-top: 10px">The same numbers in a wider space</span>
          <div class="sp-row" style="gap: 8px; margin-top: 5px">
            <div class="sp-swatch" data-part="near" style="flex: 1 1 0; height: 34px;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: color(srgb ${start.unit})"></div>
            <div class="sp-swatch" data-part="wide" style="flex: 1 1 0; height: 34px;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: color(display-p3 ${start.unit})"></div>
          </div>
          <div class="sp-row" style="gap: 8px; margin-top: 3px">
            <span class="sp-text" style="flex: 1 1 0; font-size: 10.5px">srgb</span>
            <span class="sp-text" style="flex: 1 1 0; font-size: 10.5px">display-p3</span>
          </div>
          <p class="sp-text" style="margin: 7px 0 0; height: 30px; font-size: 10.5px; line-height: 1.4">If the two blocks
            match, this screen is sRGB and the wider value was mapped back into it.</p>
        </div>
      </div>
    </div>
  `;

  const space = part(root, 'space');
  const near = part(root, 'near');
  const wide = part(root, 'wide');

  const write = (key: string) => {
    const hue = HUES.find((h) => h.key === key);
    if (!hue) return;
    space.dataset.hue = key;
    for (const n of NOTATIONS) {
      const value = n.write(hue);
      part(root, `chip-${n.key}`).style.setProperty('--sp-swatch', value);
      part(root, `code-${n.key}`).textContent = value;
    }
    near.style.setProperty('--sp-swatch', `color(srgb ${hue.unit})`);
    wide.style.setProperty('--sp-swatch', `color(display-p3 ${hue.unit})`);
  };
  write(START);

  part(root, 'segmented').addEventListener('change', (event) => write((event as CustomEvent<string>).detail));
}
