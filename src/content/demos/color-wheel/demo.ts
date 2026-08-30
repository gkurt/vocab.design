import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Twelve named positions, which is the wheel most schemes are read off. */
const ANGLES = Array.from({ length: 12 }, (_, i) => i * 30);
const START = 210;

const colorAt = (angle: number) => `oklch(0.68 0.15 ${((angle % 360) + 360) % 360})`;

/* A conic gradient starts at the top and runs clockwise, so starting it a half sector
   early puts each hue's own sector centred on its angle. */
const SECTORS = ANGLES.map((angle, i) => `${colorAt(angle)} ${i * 30}deg ${(i + 1) * 30}deg`).join(', ');

/** Every spoke the overlay can draw; a scheme is which of them are on stage. */
const SPOKES = [
  { offset: 0, role: 'Base' },
  { offset: 120, role: 'Third, +120' },
  { offset: 180, role: 'Opposite, +180' },
  { offset: 240, role: 'Third, +240' },
];

const SCHEMES: Record<string, number[]> = {
  single: [0],
  complement: [0, 180],
  triad: [0, 120, 240],
};

const RADIUS = 56;
const SIZE = 150;

/**
 * Colour wheel specimen: the twelve hues laid on a circle, and a scheme drawn across
 * it as the shape it is. Choosing a hue turns the whole overlay as one piece, which is
 * the wheel's real claim: the relationship is the geometry, not the individual colours.
 *
 * The subject is the wheel with its overlay. The readout beside it is scenery that
 * reads the angles back out, headed the way a picker heads a list of colours: it used
 * to say "On the wheel", which is the article pointing at the diagram. Its height is
 * fixed, so a scheme with fewer members cannot move the controls under it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const picks = ANGLES.map((angle) => {
    const radians = (angle * Math.PI) / 180;
    const x = SIZE / 2 + RADIUS * Math.sin(radians);
    const y = SIZE / 2 - RADIUS * Math.cos(radians);
    return `
      <button data-part="pick-${angle}" aria-label="hue ${angle}"
              style="position: absolute; left: ${x}px; top: ${y}px; width: 24px; height: 24px; padding: 0; border: 0;
                     border-radius: 50%; translate: -50% -50%; cursor: pointer; background: transparent;
                     box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4)"></button>`;
  }).join('');

  const spokes = SPOKES.map(
    ({ offset }) => `
      <div data-part="spoke-${offset}" style="position: absolute; inset: 0; rotate: calc(var(--cw-base, 0deg) + ${offset}deg)">
        <span style="position: absolute; left: 50%; top: ${SIZE / 2 - RADIUS}px; bottom: 50%; width: 2px; translate: -50% 0;
                     background: var(--sp-surface)"></span>
        <span data-part="mark-${offset}"
              style="position: absolute; left: 50%; top: ${SIZE / 2 - RADIUS}px; width: 22px; height: 22px; translate: -50% -50%;
                     border: 3px solid var(--sp-surface); border-radius: 50%; background: ${colorAt(START + offset)}"></span>
      </div>`,
  ).join('');

  const readout = SPOKES.slice(0, 3)
    .map(
      (_, index) => `
      <div class="sp-row" data-part="read-${index}" style="gap: 8px" ${index === 0 ? '' : 'hidden'}>
        <span class="sp-swatch" data-part="read-swatch-${index}" style="width: 20px; height: 20px; border-radius: 50%; --sp-swatch: ${colorAt(START)}"></span>
        <span class="sp-grow sp-text sp-text--ink" data-part="read-role-${index}">Base</span>
        <span class="sp-text" data-part="read-angle-${index}" style="width: 46px; text-align: right">H ${START}</span>
      </div>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 372px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="single">
            <button class="sp-segment" data-part="seg-single" value="single">Single</button>
            <button class="sp-segment" data-part="seg-complement" value="complement">Complement</button>
            <button class="sp-segment" data-part="seg-triad" value="triad">Triad</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 18px; margin-top: 14px; align-items: flex-start">
          <div data-part="wheel" data-subject data-hue="${START}" data-scheme="single"
               style="position: relative; flex: 0 0 auto; width: ${SIZE}px; height: ${SIZE}px; border-radius: 50%;
                      --cw-base: ${START}deg; background: conic-gradient(from -15deg, ${SECTORS})">
            ${picks}${spokes}
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 10px; width: 160px; height: ${SIZE}px">
            <span class="sp-label">Palette</span>
            ${readout}
          </div>
        </div>
      </div>
    </div>
  `;

  const wheel = part(root, 'wheel');
  const chosen = ANGLES.map((angle) => ({ angle, el: part(root, `pick-${angle}`) }));

  const draw = (hue: number, scheme: string) => {
    const offsets = SCHEMES[scheme] ?? SCHEMES.single ?? [0];
    wheel.dataset.hue = String(hue);
    wheel.dataset.scheme = scheme;
    wheel.style.setProperty('--cw-base', `${hue}deg`);

    for (const spoke of SPOKES) {
      const on = offsets.includes(spoke.offset);
      part(root, `spoke-${spoke.offset}`).toggleAttribute('hidden', !on);
      part(root, `mark-${spoke.offset}`).style.background = colorAt(hue + spoke.offset);
    }

    SPOKES.slice(0, 3).forEach((_, index) => {
      const offset = offsets[index];
      const row = part(root, `read-${index}`);
      row.toggleAttribute('hidden', offset === undefined);
      if (offset === undefined) return;
      const spoke = SPOKES.find((s) => s.offset === offset);
      part(root, `read-swatch-${index}`).style.setProperty('--sp-swatch', colorAt(hue + offset));
      part(root, `read-role-${index}`).textContent = spoke?.role ?? 'Base';
      part(root, `read-angle-${index}`).textContent = `H ${(hue + offset) % 360}`;
    });

    for (const pick of chosen) flag(pick.el, 'data-selected', pick.angle === hue);
  };
  draw(START, 'single');

  for (const pick of chosen) pick.el.addEventListener('click', () => draw(pick.angle, wheel.dataset.scheme ?? 'single'));
  part(root, 'segmented').addEventListener('change', (event) =>
    draw(Number(wheel.dataset.hue ?? START), (event as CustomEvent<string>).detail),
  );
}
