import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * WCAG relative luminance and contrast ratio, measured from the two colours the browser is
 * painting. A static pair gets no on-colour re-derived for it, so the ratio beside it is the
 * only guarantee it has, and the specimen prints that ratio rather than claiming it.
 */
const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => decode(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
};

const ratio = (a: string, b: string): number => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return ((x ?? 0) + 0.05) / ((y ?? 0) + 0.05);
};

/** The roles that re-derive. Material 3 baseline light and dark, so both columns are real values. */
const SCHEMES = [
  {
    key: 'light',
    name: 'Light',
    surface: '#FFFBFF',
    raised: '#E7E0EC',
    ink: '#1D1B20',
    muted: '#49454F',
    accent: '#6750A4',
    onAccent: '#FFFFFF',
  },
  {
    key: 'dark',
    name: 'Dark',
    surface: '#141218',
    raised: '#2B2930',
    ink: '#E6E0E9',
    muted: '#CAC4D0',
    accent: '#D0BCFF',
    onAccent: '#381E72',
  },
] as const;

/**
 * The two values that do not re-derive, with the ink each one owns. A brand mark is drawn
 * outside the product, and a hazard colour means one specific thing in every scheme, so both
 * ship their own foreground instead of asking the theme for one.
 */
const STATIC = [
  { key: 'lockup', fill: '#FF5A00', ink: '#1A1200', token: 'brand-orange' },
  { key: 'badge', fill: '#B3170F', ink: '#FFFFFF', token: 'hazard-red' },
] as const;

const START = 'light';

const schemeOf = (key: string) => SCHEMES.find((s) => s.key === key) ?? SCHEMES[0];

const bare = (hex: string) => hex.slice(1);

/**
 * Static colour specimen: one small screen whose scheme flips between Material's baseline light
 * and dark, with the hex of every role printed on the element that uses it. Three roles re-derive
 * on the flip and two refuse to, and each element says which it is, so the exception is countable
 * rather than asserted.
 *
 * The two static values are the two cases that come up most: a brand lockup, which is owned
 * outside the product, and a hazard badge, whose colour means one specific thing in both schemes.
 * Each prints its own measured contrast ratio, because nothing is deriving an on-colour for it
 * and the pair has to carry its own guarantee.
 *
 * The subject is the static pair, the two plates taken together. One alone would read as a brand
 * rule rather than as a kind of colour, and the term is exactly the set of values held out of the
 * derivation. The screen around it, the scheme control, the role read-out and the caption all
 * re-derive, which is what the subject is being read against, so they sit in the context register
 * (SPEC §5). The pair is static in both schemes, so identify has nothing to refuse and the
 * subject needs no `data-pose`.
 *
 * Every element is a fixed size and only paint and text change with the scheme, so nothing moves
 * (SPEC §5). All values come from the tables above, so the specimen renders identically on every
 * run.
 */
export function mount(root: HTMLElement): void {
  const staticPlate = (item: (typeof STATIC)[number], inner: string) => `
    <div class="sp-row" data-part="${item.key}" data-hex="${bare(item.fill)}"
         style="flex: 1 1 0; min-width: 0; gap: 9px; height: 46px; padding: 0 11px; border-radius: 6px;
                background: ${item.fill}; color: ${item.ink}">
      ${inner}
      <span class="sp-grow"></span>
      <span style="flex: 0 0 auto; text-align: right; font-size: 8.5px; line-height: 1.3;
                   font-variant-numeric: tabular-nums">
        <span style="display: block; font-weight: 600">${item.fill}</span>
        <span data-part="ratio-${item.key}" style="display: block"></span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Scheme" data-value="${START}">
            ${SCHEMES.map((s) => `<button class="sp-segment" data-part="seg-${s.key}" value="${s.key}">${s.name}</button>`).join('')}
          </sp-segmented>

        <div data-part="screen" data-scheme="${START}"
             style="margin-top: 9px; padding: 12px; border-radius: 8px;
                    box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.28)">
          <div class="sp-row sp-row--between sp-context" style="height: 28px">
            <span data-part="app-title" style="font-size: 12px; font-weight: 600">Northwind field app</span>
            <span data-part="app-button" data-hex="${bare(SCHEMES[0].accent)}"
                  style="display: inline-flex; align-items: center; height: 24px; padding: 0 12px;
                         border-radius: 999px; font-size: 10.5px; font-weight: 600">Report</span>
          </div>

          <div class="sp-row sp-context" data-part="app-card" data-hex="${bare(SCHEMES[0].raised)}"
               style="gap: 9px; height: 38px; margin-top: 8px; padding: 0 11px; border-radius: 6px">
            <span data-part="app-line" style="flex: 1 1 auto; height: 7px; border-radius: 4px"></span>
            <span data-part="app-hex" style="flex: 0 0 auto; font-size: 8.5px; font-variant-numeric: tabular-nums"></span>
          </div>

          <div class="sp-row" data-subject data-part="static-pair" style="gap: 9px; margin-top: 9px">
            ${staticPlate(
              STATIC[0],
              `<span style="flex: 0 0 13px; width: 13px; height: 13px; border-radius: 3px; rotate: 45deg;
                            background: currentcolor"></span>
               <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.09em">NORTHWIND</span>`,
            )}
            ${staticPlate(
              STATIC[1],
              `${icon('alert')}
               <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.04em">400 V</span>`,
            )}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 15px">
          <span class="sp-text" data-part="readout" style="font-size: 9px; font-variant-numeric: tabular-nums"></span>
          <span class="sp-text" data-part="count" style="font-size: 9px"></span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 5px 0 0; height: 42px; font-size: 10px; line-height: 1.4">
          The two plates below the card are excluded from the scheme by declaration. Each carries its own ink and its
          own measured ratio, because nothing is deriving an on-colour for a value the theme cannot reach.
        </p>
      </div>
    </div>
  `;

  for (const item of STATIC) {
    const measured = ratio(item.fill, item.ink);
    part(root, `ratio-${item.key}`).textContent = `${measured.toFixed(1)}:1 held`;
  }

  const apply = (key: string) => {
    const scheme = schemeOf(key);
    if (!scheme) return;

    const screen = part(root, 'screen');
    screen.dataset.scheme = scheme.key;
    screen.style.background = scheme.surface;
    screen.style.color = scheme.ink;

    const title = part(root, 'app-title');
    title.dataset.hex = bare(scheme.ink);
    title.style.color = scheme.ink;

    const button = part(root, 'app-button');
    button.dataset.hex = bare(scheme.accent);
    button.style.background = scheme.accent;
    button.style.color = scheme.onAccent;

    const card = part(root, 'app-card');
    card.dataset.hex = bare(scheme.raised);
    card.style.background = scheme.raised;
    part(root, 'app-line').style.background = scheme.muted;
    const hex = part(root, 'app-hex');
    hex.style.color = scheme.muted;
    hex.textContent = `surface ${scheme.raised}`;

    part(root, 'readout').textContent = `surface ${scheme.surface} · accent ${scheme.accent} · on-surface ${scheme.ink}`;
    part(root, 'count').textContent = `3 roles re-derived · ${STATIC.length} held`;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
