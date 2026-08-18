/**
 * Afrofuturism specimen: a poster panel beside a small interface fragment, so the register
 * is shown doing work rather than sitting in a swatch. Indigo ground, gold and copper light,
 * a star field, an orbit, and geometry used structurally: a patterned column holding the
 * left edge of the panel and a patterned band dividing the fragment.
 *
 * The pattern here is invented for the specimen, plain diamonds and triangles, and it is
 * deliberately not a copy of any people's textile: the article says where the real
 * traditions come from and why they should be credited rather than sampled.
 *
 * The paint is inline because the palette and the ornament are the term. The kit is cool,
 * flat, has one accent, no gold and no pattern at all.
 *
 * The subject is the interface fragment, not the tour and not the poster panel: this term
 * is a movement rather than a texture, and the narrowest thing on stage that shows the
 * register applied to a design is the fragment (SPEC §5). The panel, the labels and the
 * caption are the scenery that makes it legible.
 *
 * Everything is placed from fixed tables, never a value drawn at mount, so the identify
 * still is the same on every run. Static: a poster has no states and takes no clock.
 */
const NIGHT = '#151a4a';
const GOLD = '#e0a83c';
const GOLD_SOFT = '#f0cf8f';
const COPPER = '#c2542f';
const CREAM = '#f2e6d0';

const PW = 270;
const PH = 172;

/** The star field, written out once: x, y, radius, opacity. */
const STARS: readonly (readonly [number, number, number, number])[] = [
  [46, 18, 1.4, 0.9],
  [72, 40, 1, 0.6],
  [96, 14, 1.7, 0.85],
  [124, 34, 1.1, 0.55],
  [150, 20, 1.3, 0.75],
  [178, 12, 1, 0.5],
  [206, 30, 1.5, 0.8],
  [238, 16, 1.1, 0.6],
  [258, 44, 1.3, 0.7],
  [58, 62, 1.2, 0.5],
  [86, 84, 1, 0.45],
  [112, 60, 1.5, 0.7],
  [140, 92, 1.1, 0.5],
  [166, 106, 1.3, 0.6],
  [222, 84, 1, 0.45],
  [250, 104, 1.4, 0.65],
  [64, 122, 1.1, 0.5],
  [92, 140, 1.3, 0.6],
  [200, 128, 1, 0.45],
  [232, 138, 1.2, 0.55],
];

/** The structural column: stacked diamonds holding the panel's left edge. */
const COLUMN_INKS = [GOLD, COPPER, CREAM, GOLD, COPPER, CREAM, GOLD, COPPER] as const;

/** The band along the foot: alternating triangles, the same geometry laid horizontally. */
const BAND_INKS = [GOLD, CREAM, COPPER, GOLD, CREAM, COPPER, GOLD, CREAM, COPPER, GOLD, CREAM] as const;

function column(): string {
  return COLUMN_INKS.map((ink, i) => {
    const y = i * 22;
    return `<polygon points="14,${y} 25,${y + 11} 14,${y + 22} 3,${y + 11}" fill="${ink}" opacity="0.92"/>`;
  }).join('');
}

function band(): string {
  return BAND_INKS.map((ink, i) => {
    const x = 36 + i * 21;
    return `<polygon points="${x},170 ${x + 10.5},150 ${x + 21},170" fill="${ink}" opacity="0.9"/>`;
  }).join('');
}

/** Speculative architecture rather than chrome: a mast of stacked, narrowing decks. */
const TOWER = `
  <g stroke="${GOLD}" stroke-width="2" fill="none" stroke-linejoin="round">
    <path d="M62 148h48l-7-22H69Z"/>
    <path d="M70 126h32l-6-20H76Z"/>
    <path d="M77 106h18l-4-18h-10Z"/>
    <path d="M86 88V72"/>
  </g>
  <circle cx="86" cy="68" r="5" fill="${GOLD_SOFT}"/>`;

/**
 * The patterned rule the fragment is divided by: ornament carrying a structural job. Written
 * as the `background` shorthand because each layer states its own tile size, which
 * `background-image` on its own cannot carry.
 */
const RULE = `linear-gradient(45deg, ${GOLD} 25%, transparent 25%) 0 0 / 9px 9px,
  linear-gradient(-45deg, ${COPPER} 25%, transparent 25%) 0 0 / 9px 9px, ${NIGHT}`;

export function mount(root: HTMLElement): void {
  const panel = `
    <svg data-part="panel" viewBox="0 0 ${PW} ${PH}" width="${PW}" height="${PH}" role="presentation" style="display: block">
      <defs>
        <linearGradient id="af-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#101438"/>
          <stop offset="0.55" stop-color="#1d2464"/>
          <stop offset="1" stop-color="#2b1d4e"/>
        </linearGradient>
        <radialGradient id="af-glow" cx="0.72" cy="0.26" r="0.52">
          <stop offset="0" stop-color="${GOLD}" stop-opacity="0.46"/>
          <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${PW}" height="${PH}" fill="url(#af-sky)"/>
      <rect width="${PW}" height="${PH}" fill="url(#af-glow)"/>
      <g fill="${CREAM}">${STARS.map(([x, y, r, o]) => `<circle cx="${x}" cy="${y}" r="${r}" opacity="${o}"/>`).join('')}</g>
      <g data-part="orbit">
        <ellipse cx="192" cy="66" rx="64" ry="25" fill="none" stroke="${GOLD}" stroke-width="2" transform="rotate(-19 192 66)"/>
        <circle cx="192" cy="66" r="27" fill="${COPPER}"/>
        <path d="M192 39a27 27 0 0 1 0 54Z" fill="${GOLD}" opacity="0.85"/>
      </g>
      ${TOWER}
      <g data-part="pattern">${column()}${band()}</g>
      <rect x="28" y="0" width="3" height="${PH}" fill="${GOLD}" opacity="0.85"/>
    </svg>`;

  const fragment = `
    <div data-part="fragment" data-subject
         style="display: flex; flex-direction: column; width: 154px; height: ${PH}px; overflow: hidden; background: ${NIGHT};
                color: ${CREAM}; box-shadow: 0 6px 16px rgb(12 10 30 / 0.4)">
      <span aria-hidden="true" style="flex: 0 0 auto; height: 7px; background: ${RULE}"></span>
      <div style="display: flex; flex-direction: column; flex: 1 1 auto; padding: 11px 12px 12px">
        <span data-part="fragment-eyebrow"
              style="font-size: 9px; font-weight: 700; letter-spacing: 0.2em; line-height: 1.2; color: ${GOLD}">ORBITAL LINE</span>
        <span data-part="fragment-heading"
              style="margin-top: 4px; font-size: 17px; font-weight: 800; letter-spacing: 0.02em; line-height: 1.15">
          DEPARTURES
        </span>
        <span data-part="fragment-rule" aria-hidden="true"
              style="height: 10px; margin: 9px 0 10px; background: ${RULE}"></span>
        <span style="font-size: 11px; line-height: 1.45">22:40 &middot; Ring station</span>
        <span style="font-size: 11px; line-height: 1.45; opacity: 0.7">Gate 4, boarding</span>
        <button type="button" data-part="fragment-button"
                style="align-self: flex-start; margin-top: auto; padding: 6px 16px 7px; border: 0; border-radius: 2px;
                       background: ${GOLD}; color: #241804; font: inherit; font-size: 11px; font-weight: 700;
                       letter-spacing: 0.12em; line-height: 1.1; cursor: pointer">
          BOARD
        </button>
      </div>
    </div>`;

  const tourColumn = (label: string, note: string, body: string, context: boolean, width: number): string => `
    <div class="sp-stack${context ? ' sp-context' : ''}" style="flex: 0 0 ${width}px; gap: 5px; align-items: stretch">
      ${body}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 10px 14px 11px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Ornament doing structural work</span>

        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${tourColumn('The register', 'Indigo ground, gold light, an orbit.', panel, true, PW)}
          ${tourColumn('Spent on a screen', 'Pattern divides, never tiles.', fragment, false, 154)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Sixty years of music and writing behind it, not a colour scheme.
      </p>
    </div>
  `;
}
