import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * WCAG 2.x relative luminance and contrast, written out rather than quoted, because the
 * whole demonstration is a measurement: every ratio on screen is computed from the colour
 * the browser is actually painting, including the alpha composite the opacity technique
 * produces. Nothing here is copied from a table.
 */
type Rgb = [number, number, number];

const hexToRgb = (hex: string): Rgb => [
  Number.parseInt(hex.slice(1, 3), 16),
  Number.parseInt(hex.slice(3, 5), 16),
  Number.parseInt(hex.slice(5, 7), 16),
];

/** Source-over compositing, which is what `opacity` on a text run actually does. */
const composite = (fg: Rgb, bg: Rgb, alpha: number): Rgb => [
  alpha * fg[0] + (1 - alpha) * bg[0],
  alpha * fg[1] + (1 - alpha) * bg[1],
  alpha * fg[2] + (1 - alpha) * bg[2],
];

const channel = (c: number): number => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgb): number => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrast = (a: Rgb, b: Rgb): number => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** WCAG 1.4.3 for body text. Disabled text is exempt, which the specimen says rather than fails. */
const AA = 4.5;

type Rung = 'high' | 'medium' | 'disabled';

const RUNGS: { key: Rung; label: string; alpha: number }[] = [
  { key: 'high', label: 'High emphasis', alpha: 0.87 },
  { key: 'medium', label: 'Medium emphasis', alpha: 0.6 },
  { key: 'disabled', label: 'Disabled', alpha: 0.38 },
];

type Surface = {
  key: string;
  name: string;
  bg: string;
  /** The ink the opacity ladder uses here, by Material's own rule: black on light, white on dark. */
  opacityInk: string;
  tokens: Record<Rung, string>;
  /** Which ink the measurement column is printed in, so the numbers stay readable at every rung. */
  ratioInk: string;
};

const SURFACES: Surface[] = [
  {
    key: 'white',
    name: 'Surface: white',
    bg: '#FFFFFF',
    opacityInk: '#000000',
    tokens: { high: '#14171C', medium: '#4A505C', disabled: '#9AA0AC' },
    ratioInk: '#14171C',
  },
  {
    key: 'brand',
    name: 'Surface: brand',
    bg: '#3E56C4',
    opacityInk: '#FFFFFF',
    tokens: { high: '#FFFFFF', medium: '#E2E7FD', disabled: '#9AA6E8' },
    ratioInk: '#FFFFFF',
  },
];

const START = 'opacity';

/**
 * Emphasis level specimen: the same three-rung text hierarchy, high, medium and disabled,
 * built twice on two surfaces, with every rung's contrast ratio measured against the surface
 * it actually sits on. Under Opacity the ladder is one ink stepped to 87, 60 and 38 percent,
 * which is Material's original model; under Tokens each rung is a named on-surface colour
 * picked for that surface. The white card survives both. The brand card is where the promise
 * breaks: the opacity ladder's top rung still clears AA and its middle rung does not, because
 * an alpha is a claim about a background nobody checked.
 *
 * The subject is the medium-emphasis run on the brand surface, the narrowest element on stage
 * that the term is really about. It carries `data-pose="[data-technique=opacity]"` (SPEC §6):
 * the token version is the counter-example this term exists to explain, so identify refuses
 * to pose it and rings the opacity ladder the word names. The mount state is the opacity one.
 * The white card, the technique control and the caption are instrumentation and sit in the
 * context register (SPEC §5).
 *
 * Every row is a fixed height and only paint and text change with the technique, so nothing
 * moves (SPEC §5). All colours come from the tables above and every number is derived from
 * them, so the specimen renders identically on every run.
 */
export function mount(root: HTMLElement): void {
  const row = (surface: Surface, rung: (typeof RUNGS)[number]) => {
    const subject = surface.key === 'brand' && rung.key === 'medium';
    return `
      <div class="sp-row" data-part="row-${surface.key}-${rung.key}" style="height: 36px; gap: 8px">
        <span data-part="text-${surface.key}-${rung.key}" ${subject ? 'data-subject data-pose="[data-technique=opacity]"' : ''}
              style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${rung.label}</span>
        <span class="sp-grow"></span>
        <span class="sp-row" style="gap: 4px; flex: 0 0 auto; color: ${surface.ratioInk}">
          <span data-part="ratio-${surface.key}-${rung.key}" style="font-size: 11px; font-variant-numeric: tabular-nums"></span>
          <span data-part="mark-${surface.key}-${rung.key}" style="display: flex; width: 16px"></span>
        </span>
      </div>`;
  };

  const card = (surface: Surface) => `
    <div ${surface.key === 'white' ? 'class="sp-context"' : ''} data-part="card-${surface.key}" data-technique="${START}"
         style="flex: 0 0 202px; height: 150px; padding: 11px 13px; border-radius: 10px; background: ${surface.bg};
                box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
      <div style="font-size: 10.5px; font-weight: 600; height: 18px; color: ${surface.ratioInk}; opacity: 0.7">${surface.name}</div>
      ${RUNGS.map((rung) => row(surface, rung)).join('')}
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Built from" data-term="opacity" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-opacity" value="opacity">Opacity</button>
            <button class="sp-segment" data-part="seg-tokens" value="tokens">Tokens</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="cards" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          ${SURFACES.map(card).join('')}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 10px 0 0; height: 46px; font-size: 10.5px; line-height: 1.4">
          Each ratio is measured against the surface that run is painted on, alpha composited first. AA asks 4.5:1 of
          body text; disabled text is exempt, so it is marked rather than failed.
        </p>
      </div>
    </div>
  `;

  const apply = (technique: string) => {
    const useTokens = technique === 'tokens';
    for (const surface of SURFACES) {
      const bg = hexToRgb(surface.bg);
      part(root, `card-${surface.key}`).dataset.technique = technique;
      for (const rung of RUNGS) {
        const inkHex = useTokens ? surface.tokens[rung.key] : surface.opacityInk;
        const alpha = useTokens ? 1 : rung.alpha;
        const text = part(root, `text-${surface.key}-${rung.key}`);
        text.style.color = inkHex;
        text.style.opacity = String(alpha);
        text.dataset.technique = technique;

        const measured = contrast(composite(hexToRgb(inkHex), bg, alpha), bg);
        const verdict = rung.key === 'disabled' ? 'exempt' : measured >= AA ? 'pass' : 'fail';
        part(root, `row-${surface.key}-${rung.key}`).dataset.verdict = verdict;
        part(root, `ratio-${surface.key}-${rung.key}`).textContent = `${measured.toFixed(2)}:1`;
        part(root, `mark-${surface.key}-${rung.key}`).innerHTML =
          verdict === 'exempt' ? icon('minus') : verdict === 'pass' ? icon('check') : icon('alert');
      }
    }
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
