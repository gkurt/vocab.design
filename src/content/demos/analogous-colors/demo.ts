import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const WHEEL = 12;
const STEP = 360 / WHEEL;

/** Where the set of three starts, as an absolute position on the wheel. */
const SETS: Record<string, number> = { amber: 1, teal: 5, violet: 9 };

const START = 'amber';

const CX = 78;
const CY = 78;

const point = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(CX + r * Math.cos(a)).toFixed(2)} ${(CY + r * Math.sin(a)).toFixed(2)}`;
};

/** An annulus segment: the shape a hue occupies on a wheel drawn as a ring. */
const sector = (r0: number, r1: number, a0: number, a1: number) =>
  `M${point(r1, a0)} A${r1} ${r1} 0 0 1 ${point(r1, a1)} L${point(r0, a1)} A${r0} ${r0} 0 0 0 ${point(r0, a0)} Z`;

const swatch = (h: number, l = 0.68, c = 0.14) => `oklch(${l} ${c} ${h})`;

const hues = (start: number) => [0, 1, 2].map((i) => ((start + i) % WHEEL) * STEP);

/**
 * Analogous colours specimen: a twelve step hue wheel with three adjacent steps lifted out
 * of it, and those same three hues spent on a poster beside it. The set is rotated to
 * absolute positions on the wheel, so the scheme keeps its character wherever it lands.
 *
 * The subject is the lifted set, a group holding the three neighbouring sectors: the term
 * names those hues and their adjacency, not the wheel they were taken from and not the
 * poster they were spent on. The wheel underneath, the poster and the position control all
 * stay in the context register. Both the wheel and the poster are fixed boxes and the set
 * only changes which sectors it draws, so rotating it repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const ring = Array.from({ length: WHEEL }, (_, i) => {
    const a0 = i * STEP + 1.2;
    const a1 = (i + 1) * STEP - 1.2;
    return `<path data-part="wheel-step" d="${sector(40, 62, a0, a1)}" fill="${swatch(i * STEP)}" opacity="0.34"></path>`;
  }).join('');

  const lifted = [0, 1, 2].map((i) => `<path data-part="lifted-${i}" d="" fill="#000000"></path>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Set" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">Teal</button>
            <button class="sp-segment" data-part="seg-violet" value="violet">Violet</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <svg viewBox="0 0 156 156" style="flex: 0 0 auto; display: block; width: 152px; height: 152px" aria-hidden="true">
            <g class="sp-context">${ring}</g>
            <g data-part="set" data-subject data-set="${START}">${lifted}</g>
            <text data-part="span-label" x="78" y="82" text-anchor="middle"
                  style="font-size: 11px; font-weight: 600; fill: var(--sp-ink)">60&#176;</text>
          </svg>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <div data-part="poster" style="height: 118px; padding: 12px; border-radius: var(--sp-radius); overflow: hidden;
                 background: var(--an-1)">
              <span style="display: block; width: 46px; height: 46px; border-radius: 50%; background: var(--an-2)"></span>
              <span style="display: block; width: 82%; height: 9px; margin-top: 12px; border-radius: 999px; background: var(--an-3)"></span>
              <span style="display: block; width: 54%; height: 9px; margin-top: 6px; border-radius: 999px; background: var(--an-3); opacity: 0.55"></span>
              <span style="display: block; width: 34%; height: 6px; margin-top: 10px; border-radius: 999px; background: #23262b"></span>
            </div>
            <span class="sp-text" data-part="angles" style="font-size: 11px">30, 60, 90</span>
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 10px 0 0; font-size: 11px">Neighbours cannot separate
          anything by hue, so the poster separates by lightness and leans on one neutral.</p>
      </div>
    </div>
  `;

  const set = part(root, 'set');
  const poster = part(root, 'poster');
  const angles = part(root, 'angles');

  const rotate = (name: string) => {
    const start = SETS[name];
    if (start === undefined) return;
    set.dataset.set = name;
    const picked = hues(start);
    picked.forEach((hue, i) => {
      const index = (start + i) % WHEEL;
      const path = part(root, `lifted-${i}`);
      path.setAttribute('d', sector(38, 72, index * STEP + 1.2, (index + 1) * STEP - 1.2));
      path.setAttribute('fill', swatch(hue));
    });
    poster.style.setProperty('--an-1', swatch(picked[0] ?? 0, 0.93, 0.045));
    poster.style.setProperty('--an-2', swatch(picked[1] ?? 0, 0.66, 0.15));
    poster.style.setProperty('--an-3', swatch(picked[2] ?? 0, 0.44, 0.12));
    angles.textContent = picked.map((hue) => `${Math.round(hue)}`).join(', ');
  };
  rotate(START);

  part(root, 'segmented').addEventListener('change', (event) => rotate((event as CustomEvent<string>).detail));
}
