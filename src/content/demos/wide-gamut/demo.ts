import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Family = {
  key: string;
  label: string;
  srgb: string;
  p3: string;
  /** Where that primary sits in each space's triangle, in the plotted coordinates below. */
  atSrgb: [number, number];
  atP3: [number, number];
};

/**
 * Three hue families where Display P3 genuinely reaches past sRGB. Cyan sits on the
 * green-to-blue edge rather than on a corner, which is why its two markers are closer
 * together than red's: the two spaces share a blue primary exactly.
 */
const FAMILIES: Family[] = [
  { key: 'red', label: 'Red', srgb: 'color(srgb 1 0 0)', p3: 'color(display-p3 1 0 0)', atSrgb: [160, 126.7], atP3: [170, 128.9] },
  { key: 'green', label: 'Green', srgb: 'color(srgb 0 1 0)', p3: 'color(display-p3 0 1 0)', atSrgb: [75, 66.7], atP3: [66.3, 46.7] },
  { key: 'cyan', label: 'Cyan', srgb: 'color(srgb 0 1 1)', p3: 'color(display-p3 0 1 1)', atSrgb: [56.3, 126.7], atP3: [51.9, 116.7] },
];

const START = 'red';

/**
 * The two triangles, in a 200 unit box: x scaled by 250 and y flipped, the same schematic
 * transform the colour gamut specimen uses. Only the outlines are drawn here. The spectral
 * horseshoe is that term's diagram and is not re-owned.
 */
const TRI_SRGB = '160,126.7 75,66.7 37.5,186.7';
const TRI_P3 = '170,128.9 66.3,46.7 37.5,186.7';

/**
 * Wide gamut specimen: one saturated colour asked for twice, once in sRGB and once in
 * Display P3, with the coordinates printed under each block and a chromaticity outline
 * beside them showing the larger space enclosing the smaller.
 *
 * The subject is the P3 block, the one that reaches outside sRGB. The sRGB block is the
 * comparison, and the outline, the hue control and the readouts are instrumentation, so
 * all of them sit in the context register (SPEC §5).
 *
 * The caption tells the truth the pixels cannot: on an sRGB display the two blocks are
 * identical, because the wider value has already been mapped back in. Faking a difference
 * would make the specimen a lie on the majority of screens that read it.
 *
 * Every box is fixed size and only paint, text and two marker positions change with the
 * family, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = FAMILIES.find((f) => f.key === START) ?? FAMILIES[0];
  if (!start) return;

  const block = (which: 'srgb' | 'p3', name: string, value: string, subject: boolean) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
      <div class="sp-swatch" data-part="swatch-${which}"${subject ? ` data-subject data-hue="${START}"` : ''}
           style="height: 72px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${value}"></div>
      <span class="sp-label sp-context">${name}</span>
      <span class="sp-text sp-context" data-part="code-${which}"
            style="font-size: 10px; line-height: 1.2; white-space: nowrap">${value}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Hue family" data-value="${START}">
            ${FAMILIES.map((f) => `<button class="sp-segment" data-part="seg-${f.key}" value="${f.key}">${f.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-row" style="flex: 1 1 auto; min-width: 0; gap: 10px; align-items: flex-start">
            ${block('srgb', 'sRGB', start.srgb, false)}
            ${block('p3', 'Display P3', start.p3, true)}
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; align-items: center">
            <div data-part="diagram" style="padding: 3px; border-radius: 6px; background: var(--sp-sunken)">
              <svg viewBox="28 36 160 162" style="display: block; width: 102px; height: 102px" aria-hidden="true">
                <polygon points="${TRI_P3}" fill="var(--sp-ink)" fill-opacity="0.34" stroke="var(--sp-ink)"
                         stroke-width="4" stroke-linejoin="round"></polygon>
                <polygon points="${TRI_SRGB}" fill="var(--sp-sunken)" stroke="var(--sp-muted)" stroke-width="4"
                         stroke-linejoin="round" stroke-dasharray="9 7"></polygon>
                <circle data-part="mark-srgb" cx="${start.atSrgb[0]}" cy="${start.atSrgb[1]}" r="6"
                        fill="var(--sp-sunken)" stroke="var(--sp-muted)" stroke-width="2.5"></circle>
                <circle data-part="mark-p3" cx="${start.atP3[0]}" cy="${start.atP3[1]}" r="6.5"
                        fill="var(--sp-ink)" stroke="var(--sp-sunken)" stroke-width="2.5"></circle>
              </svg>
            </div>
            <span class="sp-label" style="font-size: 10px">P3 encloses sRGB</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 9px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">
          On an sRGB display these two blocks are the same colour, because the wider value has already been mapped
          back in. Only a P3 screen separates them.
        </p>
      </div>
    </div>
  `;

  const wide = part(root, 'swatch-p3');
  const near = part(root, 'swatch-srgb');
  const markSrgb = part(root, 'mark-srgb');
  const markP3 = part(root, 'mark-p3');

  const show = (key: string) => {
    const family = FAMILIES.find((f) => f.key === key);
    if (!family) return;
    wide.dataset.hue = key;
    wide.style.setProperty('--sp-swatch', family.p3);
    near.style.setProperty('--sp-swatch', family.srgb);
    part(root, 'code-p3').textContent = family.p3;
    part(root, 'code-srgb').textContent = family.srgb;
    markSrgb.setAttribute('cx', String(family.atSrgb[0]));
    markSrgb.setAttribute('cy', String(family.atSrgb[1]));
    markP3.setAttribute('cx', String(family.atP3[0]));
    markP3.setAttribute('cy', String(family.atP3[1]));
  };
  show(START);

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
