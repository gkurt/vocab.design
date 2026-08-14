import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Role = 'dominant' | 'secondary' | 'accent';
type Mix = 'balanced' | 'shout';

const WIDTH = 240;
const HEIGHT = 168;
const AREA = WIDTH * HEIGHT;

/** The three colours, and nothing in the painted screen carries any other. */
const PAINT: Record<Role, string> = {
  dominant: '#ffffff',
  secondary: '#46557f',
  accent: '#e2543a',
};

const PAGE = '#eef0f5';

type Region = { key: string; box: string; w: number; h: number; radius: string; roles: Record<Mix, Role> };

/**
 * The regions of one screen, with their sizes written down, so the proportions the readout
 * claims are arithmetic on this geometry rather than an assertion. A region painted in the
 * dominant colour is not counted separately: the dominant share is whatever the other two
 * leave behind.
 */
const REGIONS: Region[] = [
  { key: 'header', box: 'left: 0; top: 0', w: 240, h: 26, radius: '0', roles: { balanced: 'secondary', shout: 'accent' } },
  { key: 'sidebar', box: 'left: 0; top: 26px', w: 42, h: 142, radius: '0', roles: { balanced: 'secondary', shout: 'secondary' } },
  { key: 'panel', box: 'left: 54px; top: 38px', w: 150, h: 34, radius: '6px', roles: { balanced: 'dominant', shout: 'accent' } },
  { key: 'chip', box: 'left: 54px; top: 84px', w: 84, h: 22, radius: '999px', roles: { balanced: 'accent', shout: 'accent' } },
  { key: 'cta', box: 'left: 54px; top: 128px', w: 80, h: 28, radius: '7px', roles: { balanced: 'accent', shout: 'accent' } },
];

/** Whole percentages that still sum to 100 for both mixes, so the bar and the readout agree. */
const share = (mix: Mix): Record<Role, number> => {
  let secondary = 0;
  let accent = 0;
  for (const region of REGIONS) {
    const role = region.roles[mix];
    if (role === 'secondary') secondary += region.w * region.h;
    if (role === 'accent') accent += region.w * region.h;
  }
  const s = Math.round((secondary / AREA) * 100);
  const a = Math.round((accent / AREA) * 100);
  return { dominant: 100 - s - a, secondary: s, accent: a };
};

const CAPTION: Record<Mix, string> = {
  balanced: 'Sixty percent quiet, thirty percent structure, ten percent accent. Two small things are the only red on the screen.',
  shout: 'The same three colours, different amounts. With the accent on nearly forty percent of the surface it points at nothing.',
};

const ORDER: Role[] = ['dominant', 'secondary', 'accent'];
const NAMES: Record<Role, string> = { dominant: 'Dominant', secondary: 'Secondary', accent: 'Accent' };

/**
 * 60-30-10 specimen: one screen painted from three colours, and the proportion bar that
 * measures it. Switching the mix repaints two regions and re-proportions the bar, so the
 * rule is shown as an amount rather than as a palette.
 *
 * The subject is the painted screen. The bar is the instrument that reads it and the picker
 * and caption are scenery, so all three sit in the context register (SPEC §5). The
 * accent-heavy mix is a counter-example the subject itself passes through, so the honest
 * condition is declared in `data-pose` and the mount state satisfies it: identify refuses
 * to ring a screen that is breaking the rule (SPEC §6).
 *
 * The screen and every region in it are fixed size in both mixes; only paint changes there,
 * and only the bar's segment widths change beside it, so nothing moves.
 */
export function mount(root: HTMLElement): void {
  const start = share('balanced');

  const blocks = REGIONS.map(
    (r) => `<span data-part="${r.key}" style="position: absolute; ${r.box}; width: ${r.w}px; height: ${r.h}px;
                  border-radius: ${r.radius}; background: ${PAINT[r.roles.balanced]}"></span>`,
  ).join('');

  const legend = ORDER.map(
    (role) => `
      <div class="sp-row" style="gap: 7px; height: 18px">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${PAINT[role]}"></span>
        <span class="sp-text" style="flex: 1 1 auto; font-size: 11px">${NAMES[role]}</span>
        <span class="sp-text sp-text--ink" data-part="pct-${role}" style="font-size: 11px;
              font-variant-numeric: tabular-nums">${start[role]}%</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Mix</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="balanced">
            <button class="sp-segment" data-part="seg-balanced" value="balanced">60 30 10</button>
            <button class="sp-segment" data-part="seg-shout" value="shout">Accent heavy</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div data-part="screen" data-subject data-pose="[data-mix=balanced]" data-mix="balanced"
               style="position: relative; flex: 0 0 auto; width: ${WIDTH}px; height: ${HEIGHT}px; border-radius: 8px;
                      overflow: hidden; background: ${PAGE}">
            ${blocks}
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <span class="sp-label">Ink on the page</span>
            <div data-part="bar" style="display: flex; height: 15px; border-radius: 999px; overflow: hidden;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)">
              ${ORDER.map(
                (role) => `<span data-part="bar-${role}" style="width: ${start[role]}%; background: ${PAINT[role]};
                                 transition: width 0.32s var(--sp-ease)"></span>`,
              ).join('')}
            </div>
            ${legend}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mix="balanced"
           style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">${CAPTION.balanced}</p>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const caption = part(root, 'caption');

  const apply = (value: string) => {
    const mix: Mix = value === 'shout' ? 'shout' : 'balanced';
    const next = share(mix);
    screen.dataset.mix = mix;
    for (const region of REGIONS) part(root, region.key).style.background = PAINT[region.roles[mix]];
    for (const role of ORDER) {
      part(root, `bar-${role}`).style.width = `${next[role]}%`;
      part(root, `pct-${role}`).textContent = `${next[role]}%`;
    }
    caption.dataset.mix = mix;
    caption.textContent = CAPTION[mix];
  };
  apply('balanced');

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
