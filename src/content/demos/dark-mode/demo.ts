import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Palette = {
  base: string;
  raised: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentInk: string;
};

/** The light palette both dark candidates are made from. */
const LIGHT: Palette = {
  base: '#F4F6FA',
  raised: '#FFFFFF',
  ink: '#1B2130',
  muted: '#5A6474',
  line: '#D8DEE9',
  accent: '#3557E8',
  accentInk: '#FFFFFF',
};

/**
 * Two ways to reach a dark palette. `derived` rebalances: the base lifts off black so a
 * raised surface has somewhere lighter to go, and the accent is lightened and desaturated
 * to sit on it. `flipped` is the inversion, where white becomes the darkest thing on
 * screen and the accent is reused untouched.
 */
const DARK = {
  derived: {
    base: '#14171C',
    raised: '#22262E',
    ink: '#E7EAF0',
    muted: '#9AA3B2',
    line: '#333944',
    accent: '#7B93F5',
    accentInk: '#10131C',
  },
  flipped: {
    base: '#0A0A0A',
    raised: '#000000',
    ink: '#FFFFFF',
    muted: '#7A7A7A',
    line: '#1A1A1A',
    accent: '#3557E8',
    accentInk: '#FFFFFF',
  },
} satisfies Record<string, Palette>;

const NOTES: Record<string, string> = {
  derived: 'The base lifts off black, so a raised surface can be lighter, and the accent lightens to keep its contrast.',
  flipped: 'White inverts to the darkest value on screen, so elevation runs backwards and the accent is left glowing.',
};

const START = 'derived';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

/** CIE L*, so the specimen states which surface is lighter instead of asserting it. */
const lightness = (hex: string) => {
  const y = luminance(hex);
  return y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y;
};

/** The panel is written against these seven custom properties and nothing else. */
const PROPS: Record<string, keyof Palette> = {
  '--p-base': 'base',
  '--p-raised': 'raised',
  '--p-ink': 'ink',
  '--p-muted': 'muted',
  '--p-line': 'line',
  '--p-accent': 'accent',
  '--p-accent-ink': 'accentInk',
};

const vars = (p: Palette) =>
  Object.entries(PROPS)
    .map(([key, value]) => `${key}: ${p[value]}`)
    .join('; ');

const lift = (p: Palette) => `base ${Math.round(lightness(p.base))} to raised ${Math.round(lightness(p.raised))}`;

/**
 * Dark mode specimen: one small interface rendered twice, in the light palette it was
 * designed in and in a dark palette beside it, with the derivation of the dark one as an
 * absolute choice between rebalancing and inverting.
 *
 * The subject is the dark panel. The term names that rendering, not the scheme control
 * above it and not the light panel, which is the other half of the pair rather than the
 * thing being named, so it stays in the context register. Both panels are the same
 * markup at the same size and the readouts are fixed width, so switching derivation
 * repaints values and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  // Both halves are wrapped the same way and sized `1 1 0`, so the comparison is drawn at
  // one width whatever the context register does to the scenery half.
  const panel = (name: string, palette: Palette, subject = false) => `
    <div class="${name === 'light' ? 'sp-context ' : ''}sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
      <div data-part="${name}" ${subject ? 'data-subject' : ''} style="${vars(palette)}; padding: 10px; border-radius: var(--sp-radius);
           border: 1px solid var(--p-line); background: var(--p-base)">
        <div class="sp-row sp-row--between">
          <span style="font-size: 12px; font-weight: 600; color: var(--p-ink)">Today</span>
          <span style="font-size: 11px; color: var(--p-muted)">3 due</span>
        </div>
        <div style="margin-top: 8px; padding: 9px; border-radius: 6px; background: var(--p-raised); border: 1px solid var(--p-line)">
          <span style="font-size: 12px; color: var(--p-ink)">Raised card</span>
        </div>
        <div class="sp-row" style="margin-top: 9px">
          <span style="padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 500;
                       background: var(--p-accent); color: var(--p-accent-ink)">Accent</span>
        </div>
      </div>
      <div class="sp-row sp-row--between">
        <span class="sp-label" data-part="${name}-name">${name === 'light' ? 'Light' : 'Dark'}</span>
        <span class="sp-text" data-part="${name}-lift" style="font-size: 11px">L* ${lift(palette)}</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Dark palette" data-value="${START}">
            <button class="sp-segment" data-part="seg-derived" value="derived">Derived</button>
            <button class="sp-segment" data-part="seg-flipped" value="flipped">Flipped</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          ${panel('light', LIGHT)}
          ${panel('dark', DARK[START], true)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 40px">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const dark = part(root, 'dark');
  const darkLift = part(root, 'dark-lift');
  const darkName = part(root, 'dark-name');
  const note = part(root, 'note');

  const derive = (mode: string) => {
    const palette = mode === 'flipped' ? DARK.flipped : DARK.derived;
    dark.dataset.mode = mode;
    dark.dataset.lift = lightness(palette.raised) > lightness(palette.base) ? 'up' : 'down';
    for (const [key, value] of Object.entries(PROPS)) dark.style.setProperty(key, palette[value]);
    darkLift.textContent = `L* ${lift(palette)}`;
    darkName.textContent = mode === 'derived' ? 'Dark, derived' : 'Dark, flipped';
    note.textContent = NOTES[mode] ?? '';
  };
  derive(START);

  part(root, 'segmented').addEventListener('change', (event) => derive((event as CustomEvent<string>).detail));
}
