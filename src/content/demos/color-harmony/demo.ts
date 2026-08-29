import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const WHEEL = 12;
const STEP = 360 / WHEEL;

/** Every rule is stated as absolute positions on the wheel, so a pass picked up anywhere lands the same. */
const RULES: Record<string, { picks: number[]; note: string }> = {
  complementary: {
    picks: [1, 7],
    note: 'Opposite hues, the furthest apart the wheel allows, so the pair vibrates unless one of them is given far less room.',
  },
  analogous: {
    picks: [0, 1, 2],
    note: 'Neighbours inside sixty degrees. Nothing in the set can separate anything by hue, so lightness has to do that work.',
  },
  triadic: {
    picks: [1, 5, 9],
    note: 'Three hues a third of the wheel apart, evenly spaced and evenly loud, which is exactly why one of them has to lead.',
  },
  split: {
    picks: [1, 6, 8],
    note: 'The complement swapped for the two hues either side of it: the opposition survives, the vibration does not.',
  },
};

const START = 'complementary';

/** The share each member of the set takes, so the strip states dominance rather than three equal claims. */
const SHARE = [3, 2, 1];

const CX = 78;
const CY = 78;

const point = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(CX + r * Math.cos(a)).toFixed(2)} ${(CY + r * Math.sin(a)).toFixed(2)}`;
};

/** An annulus segment: the shape a hue occupies on a wheel drawn as a ring. */
const sector = (r0: number, r1: number, a0: number, a1: number) =>
  `M${point(r1, a0)} A${r1} ${r1} 0 0 1 ${point(r1, a1)} L${point(r0, a1)} A${r0} ${r0} 0 0 0 ${point(r0, a0)} Z`;

const swatch = (h: number, l = 0.68, c = 0.15) => `oklch(${l} ${c} ${h})`;

/**
 * Colour harmony specimen: one twelve step hue wheel, and four rules for taking a set out
 * of it. Each rule is an absolute pick of wheel positions, drawn as lifted sectors with a
 * chord across them, and spent on a strip whose widths state which member leads.
 *
 * The subject is the lifted set, mirroring the analogous specimen this one is the umbrella
 * over: the term names the chosen hues and the geometry that chose them, not the wheel they
 * came from and not the strip they were spent on. The wheel, the chord, the strip and the
 * rule control all stay in the context register. The wheel is a fixed box, the strip is a
 * fixed row and the note has a floor, so changing rule repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const ring = Array.from({ length: WHEEL }, (_, i) => {
    const a0 = i * STEP + 1.2;
    const a1 = (i + 1) * STEP - 1.2;
    return `<path d="${sector(40, 62, a0, a1)}" fill="${swatch(i * STEP)}" opacity="0.32"></path>`;
  }).join('');

  const lifted = [0, 1, 2].map((i) => `<path data-part="lifted-${i}" d="" fill="none" style="display: none"></path>`).join('');

  const cells = SHARE.map(
    (share, i) => `
      <span class="sp-swatch" data-part="cell-${i}" style="flex: ${share} 1 0; height: 92px; border-radius: 0; --sp-swatch: transparent"></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Rule" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-complementary" value="complementary">Comp</button>
            <button class="sp-segment" data-part="seg-analogous" value="analogous">Analog</button>
            <button class="sp-segment" data-part="seg-triadic" value="triadic">Triad</button>
            <button class="sp-segment" data-part="seg-split" value="split">Split</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <svg viewBox="0 0 156 156" style="flex: 0 0 auto; display: block; width: 152px; height: 152px" aria-hidden="true">
            <g class="sp-context">${ring}</g>
            <g data-part="set" data-subject data-rule="${START}">${lifted}</g>
            <polygon data-part="chord" points="" fill="none" stroke="var(--sp-muted)" stroke-width="1.2" opacity="0.75"></polygon>
          </svg>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <div class="sp-row" data-part="strip" style="gap: 0; border-radius: var(--sp-radius); overflow: hidden">${cells}</div>
            <div class="sp-row sp-row--between">
              <span class="sp-label" style="font-size: 10px">Hue angles</span>
              <span class="sp-text" data-part="angles" style="font-size: 11px">&nbsp;</span>
            </div>
            <span class="sp-label" style="font-size: 10px">Widths: 60 / 30 / 10</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; min-height: 58px">&nbsp;</p>
      </div>
    </div>
  `;

  const set = part(root, 'set');
  const chord = part(root, 'chord');
  const angles = part(root, 'angles');
  const note = part(root, 'note');

  const apply = (name: string) => {
    const rule = RULES[name];
    if (!rule) return;
    set.dataset.rule = name;
    for (const i of [0, 1, 2]) {
      const index = rule.picks[i];
      const path = part(root, `lifted-${i}`);
      const cell = part(root, `cell-${i}`);
      if (index === undefined) {
        // Taken out of rendering rather than emptied: a zero size path would still drag the
        // subject group's box back to the origin, and the identify ring measures that box.
        path.style.display = 'none';
        cell.hidden = true;
        continue;
      }
      path.style.display = '';
      path.setAttribute('d', sector(38, 72, index * STEP + 1.2, (index + 1) * STEP - 1.2));
      path.setAttribute('fill', swatch(index * STEP));
      cell.hidden = false;
      cell.style.setProperty('--sp-swatch', swatch(index * STEP, 0.7 - i * 0.09, 0.15));
    }
    chord.setAttribute('points', rule.picks.map((index) => point(30, (index + 0.5) * STEP)).join(' '));
    angles.textContent = rule.picks.map((index) => `${index * STEP}°`).join(', ');
    note.textContent = rule.note;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
