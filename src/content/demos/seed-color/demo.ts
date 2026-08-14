import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three seeds, and nothing else in the specimen carries a colour of its own. */
const SEEDS: Record<string, { name: string; hex: string }> = {
  indigo: { name: 'Indigo', hex: '#4A55D6' },
  coral: { name: 'Coral', hex: '#E3563F' },
  moss: { name: 'Moss', hex: '#2F7D4F' },
};

const START = 'indigo';

/** The rungs the ramp draws. Tone is the lightness ladder, so the same numbers serve every seed. */
const TONES = [10, 30, 40, 50, 70, 90, 95];

/**
 * One tone of a seed, mixed in a perceptual space so the ladder behaves the same at every
 * hue: below the middle the seed is carried towards black, above it towards white.
 */
const tone = (hex: string, t: number) => {
  if (t === 50) return hex;
  if (t < 50) return `color-mix(in oklab, ${hex} ${t * 2}%, #000000)`;
  return `color-mix(in oklab, ${hex} ${(100 - t) * 2}%, #FFFFFF)`;
};

const arrow = () => `<span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${icon('chevronRight')}</span>`;

/**
 * Seed colour specimen: one input value drawn through the chain it produces. The seed feeds a
 * tonal ramp, and two rungs of that ramp fill the roles a component would actually ask for,
 * so picking a different seed re-derives every block to the right of it.
 *
 * The subject is the chain. The term names the input, but a lone swatch is indistinguishable
 * from any other swatch: what makes a colour a seed is that everything after it is computed
 * from it, so the narrowest honest subject is the derivation itself. The seed control, the
 * readout and the caption are instrumentation and stay in the context register (SPEC §5).
 *
 * Every block is fixed size and only paint changes with the seed, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = SEEDS[START] ?? SEEDS.indigo;
  if (!start) return;

  const ramp = TONES.map(
    (t) => `<span class="sp-swatch" data-part="tone-${t}"
                  style="flex: 0 0 18px; height: 52px; border-radius: 0; --sp-swatch: ${tone(start.hex, t)}"></span>`,
  ).join('');

  const stage = (label: string, body: string) => `
    <div class="sp-stack" style="flex: 0 0 auto; gap: 5px; align-items: flex-start">
      ${body}
      <span class="sp-label" style="font-size: 10px">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 436px; padding: 14px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Seed</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            ${Object.entries(SEEDS)
              .map(([key, seed]) => `<button class="sp-segment" data-part="seg-${key}" value="${key}">${seed.name}</button>`)
              .join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="chain" data-subject data-seed="${START}" style="gap: 9px; margin-top: 14px; align-items: flex-start">
          ${stage(
            'Seed',
            `<span class="sp-swatch" data-part="seed-chip" style="width: 52px; height: 52px; border-radius: 7px;
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${start.hex}"></span>`,
          )}
          ${arrow()}
          ${stage(
            'Tonal ramp 10 to 95',
            `<span class="sp-row" data-part="ramp" style="gap: 0; overflow: hidden; border-radius: 5px;
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">${ramp}</span>`,
          )}
          ${arrow()}
          ${stage(
            'Roles',
            `<span class="sp-stack" style="gap: 4px; width: 124px">
               <span data-part="role-primary" style="height: 24px; display: flex; align-items: center; padding: 0 9px;
                     border-radius: 6px; font-size: 11px; font-weight: 500; background: ${tone(start.hex, 40)}; color: #FFFFFF">Primary</span>
               <span data-part="role-container" style="height: 24px; display: flex; align-items: center; padding: 0 9px;
                     border-radius: 6px; font-size: 11px; background: ${tone(start.hex, 90)}; color: ${tone(start.hex, 10)}">Container</span>
             </span>`,
          )}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px">
          <span class="sp-text" data-part="seed-hex" style="font-size: 11px">seed ${start.hex}</span>
          <span class="sp-text" style="font-size: 11px">primary = tone 40, container = tone 90</span>
        </div>

        <p class="sp-text sp-context" style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.4">Nothing to the right
          of the seed is written down. The ladder is fixed, so any seed lands on the same contrasts.</p>
      </div>
    </div>
  `;

  const chain = part(root, 'chain');
  const primary = part(root, 'role-primary');
  const container = part(root, 'role-container');

  const derive = (key: string) => {
    const seed = SEEDS[key];
    if (!seed) return;
    chain.dataset.seed = key;
    part(root, 'seed-chip').style.setProperty('--sp-swatch', seed.hex);
    for (const t of TONES) part(root, `tone-${t}`).style.setProperty('--sp-swatch', tone(seed.hex, t));
    primary.style.background = tone(seed.hex, 40);
    container.style.background = tone(seed.hex, 90);
    container.style.color = tone(seed.hex, 10);
    part(root, 'seed-hex').textContent = `seed ${seed.hex}`;
  };
  derive(START);

  part(root, 'segmented').addEventListener('change', (event) => derive((event as CustomEvent<string>).detail));
}
