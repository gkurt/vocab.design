import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three owned hues. Ember is the argument: its foreground is near black, so nothing may hardcode white. */
const BRANDS: Record<string, { name: string; mark: string; seed: string }> = {
  ledger: { name: 'Ledger', mark: 'L', seed: '#3B4FE4' },
  ember: { name: 'Ember', mark: 'E', seed: '#E2523B' },
  fern: { name: 'Fern', mark: 'F', seed: '#14795A' },
};

const START = 'ledger';

const INK = '#14161A';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** WCAG relative luminance, so the foreground is chosen by measurement rather than by habit. */
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
};

const onColor = (seed: string) => (ratio(seed, '#FFFFFF') >= ratio(seed, INK) ? '#FFFFFF' : INK);

/**
 * Brand colour specimen: one owned hue seeding a small product surface. The mark, the
 * primary action and the link all resolve from the seed, along with the foreground paired
 * with it and a wash of it behind the card, so swapping brand re-derives the whole surface
 * without anything in it being told a second value.
 *
 * The subject is the branded surface rather than the seed chip: the term names the colour
 * as a product wears it, and the chip below is the value being read out of it. The brand
 * control and the readout row stay in the context register. The panel, the chips and the
 * caption are all fixed size, so swapping brand repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Brand" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-ledger" value="ledger">Ledger</button>
            <button class="sp-segment" data-part="seg-ember" value="ember">Ember</button>
            <button class="sp-segment" data-part="seg-fern" value="fern">Fern</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-brand="${START}"
             style="margin-top: 12px; padding: 12px; border-radius: var(--sp-radius);
                    border: 1px solid var(--sp-line); background: var(--sp-bg)">
          <div class="sp-row" style="gap: 8px">
            <span data-part="mark"
                  style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px;
                         border-radius: 7px; font-size: 13px; font-weight: 700"></span>
            <span class="sp-heading" data-part="name" style="font-size: 14px"></span>
            <span class="sp-grow"></span>
            <span data-part="link" style="font-size: 12px; font-weight: 500; text-decoration: underline">Pricing</span>
          </div>

          <div data-part="tint" style="margin-top: 10px; padding: 9px 10px; border-radius: 6px; height: 52px;
                                       border: 1px solid var(--sp-line)">
            <span style="font-size: 12px; font-weight: 600">Two seats left on this plan</span>
            <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px">Renews on 3 March</span>
          </div>

          <div class="sp-row" style="gap: 8px; margin-top: 10px">
            <span data-part="primary" style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500">Upgrade</span>
            <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         border: 1px solid var(--sp-line); color: var(--sp-muted)">Compare</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-row" style="gap: 6px">
            <span class="sp-swatch" data-part="seed-chip" style="width: 14px; height: 14px"></span>
            <span class="sp-text" data-part="seed-hex" style="font-size: 11px">&nbsp;</span>
          </span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-text" data-part="on-hex" style="font-size: 11px">&nbsp;</span>
            <span class="sp-swatch" data-part="on-chip" style="width: 14px; height: 14px; box-shadow: inset 0 0 0 1px var(--sp-line)"></span>
          </span>
        </div>

        <p class="sp-text sp-context" style="margin: 10px 0 0; min-height: 39px">One owned hue seeds the mark, the
          primary action and the link. Everything else stays neutral.</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const mark = part(root, 'mark');
  const primary = part(root, 'primary');
  const link = part(root, 'link');
  const tint = part(root, 'tint');

  const dress = (key: string) => {
    const brand = BRANDS[key];
    if (!brand) return;
    const on = onColor(brand.seed);
    panel.dataset.brand = key;
    mark.style.background = brand.seed;
    mark.style.color = on;
    mark.textContent = brand.mark;
    part(root, 'name').textContent = brand.name;
    primary.style.background = brand.seed;
    primary.style.color = on;
    // Derived against the kit's own ink, so the link darkens in a light theme and lightens in a dark one.
    link.style.color = `color-mix(in oklab, ${brand.seed} 74%, var(--sp-ink))`;
    tint.style.background = `color-mix(in oklab, ${brand.seed} 12%, var(--sp-surface))`;
    part(root, 'seed-chip').style.setProperty('--sp-swatch', brand.seed);
    part(root, 'seed-hex').textContent = `seed ${brand.seed}`;
    part(root, 'on-chip').style.setProperty('--sp-swatch', on);
    part(root, 'on-hex').textContent = `on-brand ${on}`;
  };
  dress(START);

  part(root, 'segmented').addEventListener('change', (event) => dress((event as CustomEvent<string>).detail));
}
