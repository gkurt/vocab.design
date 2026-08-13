import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Scheme = {
  bg: string;
  surface: string;
  raised: string;
  line: string;
  ink: string;
  muted: string;
  shadow: string;
};

/**
 * The same three levels derived twice. In the light scheme the ladder runs up to white and
 * stops there, so the top level is separated by shadow; in the dark scheme every level up
 * is a lighter plane, because a shadow cast on a near black page is invisible.
 */
const SCHEMES: Record<string, Scheme> = {
  light: {
    bg: '#E9ECF2',
    surface: '#FFFFFF',
    raised: '#FFFFFF',
    line: '#D7DCE6',
    ink: '#1B2130',
    muted: '#5A6474',
    shadow: '0 6px 16px rgb(16 24 40 / 0.18)',
  },
  dark: {
    bg: '#101318',
    surface: '#1B1F26',
    raised: '#272C35',
    line: '#333944',
    ink: '#E7EAF0',
    muted: '#9AA3B2',
    shadow: 'none',
  },
};

const NOTES: Record<string, string> = {
  light: 'Nothing is lighter than white, so the top level repeats the surface below it and elevation is carried by shadow.',
  dark: 'A shadow does nothing against a near black page, so each level up is a lighter plane instead.',
};

const LEVELS = [
  { key: 'bg', token: 'background' },
  { key: 'surface', token: 'surface' },
  { key: 'raised', token: 'surface-raised' },
] as const;

const START = 'light';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;
const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) =>
  0.2126 * toLinear(channel(hex, 1)) + 0.7152 * toLinear(channel(hex, 3)) + 0.0722 * toLinear(channel(hex, 5));

/** CIE L*, so the specimen states which plane is lighter instead of asserting it. */
const lightness = (hex: string) => {
  const y = luminance(hex);
  return Math.round(y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y);
};

/**
 * Surface colour specimen: three planes nested inside one another, each labelled with the
 * token it fills and the lightness it landed on, with the scheme chosen as an absolute
 * state. The stack, the labels and the boxes are identical in both schemes; only the values
 * and the shadow are re-derived, which is where the rule about elevation becomes visible.
 *
 * The subject is the stack of planes. The term names those levels rather than the readout
 * that measures them or the scheme control above them, so both of those stay in the context
 * register. Every box is a fixed size and the readouts are tabular, so switching scheme
 * repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = SCHEMES[START] ?? SCHEMES.light;
  if (!start) return;

  const readout = LEVELS.map(
    (level) => `
      <div class="sp-row" style="gap: 6px">
        <span class="sp-swatch" data-part="chip-${level.key}" style="flex: 0 0 auto; width: 14px; height: 14px;
              box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.16); --sp-swatch: ${start[level.key]}"></span>
        <span class="sp-text" style="flex: 1 1 auto; font-size: 11px; color: var(--sp-ink)">${level.token}</span>
        <span class="sp-text" data-part="l-${level.key}"
              style="flex: 0 0 46px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">L* ${lightness(start[level.key])}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Scheme</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div data-part="stack" data-subject data-scheme="${START}"
               style="flex: 0 0 214px; height: 150px; padding: 10px; border-radius: var(--sp-radius);
                      border: 1px solid var(--s-line); background: var(--s-bg)">
            <span class="sp-label" style="color: var(--s-muted)">background</span>
            <div style="margin-top: 6px; padding: 10px; border-radius: 6px; border: 1px solid var(--s-line);
                        background: var(--s-surface)">
              <span class="sp-label" style="color: var(--s-muted)">surface</span>
              <div data-part="raised" style="margin-top: 6px; padding: 8px 10px; border-radius: 6px;
                   border: 1px solid var(--s-line); background: var(--s-raised); box-shadow: var(--s-shadow)">
                <span style="font-size: 12px; font-weight: 500; color: var(--s-ink)">surface-raised</span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <span class="sp-label">Levels</span>
            ${readout}
            <p class="sp-text" data-part="note" style="margin: 2px 0 0; min-height: 72px; font-size: 11px">${NOTES[START]}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const stack = part(root, 'stack');
  const note = part(root, 'note');

  const derive = (name: string) => {
    const scheme = SCHEMES[name];
    if (!scheme) return;
    stack.dataset.scheme = name;
    stack.dataset.elevation = scheme.raised === scheme.surface ? 'shadow' : 'lightness';
    for (const [key, value] of Object.entries(scheme)) stack.style.setProperty(`--s-${key}`, value);
    for (const level of LEVELS) {
      part(root, `chip-${level.key}`).style.setProperty('--sp-swatch', scheme[level.key]);
      part(root, `l-${level.key}`).textContent = `L* ${lightness(scheme[level.key])}`;
    }
    note.textContent = NOTES[name] ?? '';
  };
  derive(START);

  part(root, 'segmented').addEventListener('change', (event) => derive((event as CustomEvent<string>).detail));
}
