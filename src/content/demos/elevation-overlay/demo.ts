import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Material's dark table, at the two levels the stack draws. */
const FILM = { card: 0.05, dialog: 0.12 };

const DARK_BASE = '#121417';

const film = (alpha: number) => `linear-gradient(rgb(255 255 255 / ${alpha}), rgb(255 255 255 / ${alpha}))`;

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16);
const hex2 = (value: number) => Math.round(value).toString(16).padStart(2, '0');

/** The composite a white film at this opacity actually leaves, which is what the readout reports. */
const over = (hex: string, alpha: number) => `#${[1, 3, 5].map((at) => hex2(channel(hex, at) * (1 - alpha) + 255 * alpha)).join('')}`;

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) =>
  0.2126 * toLinear(channel(hex, 1) / 255) + 0.7152 * toLinear(channel(hex, 3) / 255) + 0.0722 * toLinear(channel(hex, 5) / 255);

/** CIE L*, so the specimen states which plane is lighter instead of asserting it. */
const lightness = (hex: string) => {
  const y = luminance(hex);
  return Math.round(y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y);
};

type Scheme = {
  page: string;
  base: string;
  ink: string;
  muted: string;
  line: string;
  cardFilm: string;
  dialogFilm: string;
  cardShadow: string;
  dialogShadow: string;
  cardNote: string;
  dialogNote: string;
  planes: [string, string, string];
  carrier: string;
};

/**
 * Dark keeps one base colour for all three planes and lets the film do the raising; light
 * paints both raised planes the same white and lets the shadow do it, because a shadow only
 * reads when there is something darker for it to darken.
 */
const SCHEMES: Record<string, Scheme> = {
  dark: {
    page: DARK_BASE,
    base: DARK_BASE,
    ink: '#E7EAF0',
    muted: '#9AA3B2',
    line: 'rgb(255 255 255 / 0.10)',
    cardFilm: film(FILM.card),
    dialogFilm: film(FILM.dialog),
    cardShadow: 'none',
    dialogShadow: 'none',
    cardNote: '5% white',
    dialogNote: '12% white',
    planes: [DARK_BASE, over(DARK_BASE, FILM.card), over(DARK_BASE, FILM.dialog)],
    carrier: 'overlay',
  },
  light: {
    page: '#EDEFF3',
    base: '#FFFFFF',
    ink: '#1B2130',
    muted: '#5A6474',
    line: '#D8DEE9',
    cardFilm: 'none',
    dialogFilm: 'none',
    cardShadow: '0 1px 2px rgb(16 24 40 / 0.18)',
    dialogShadow: '0 10px 22px rgb(16 24 40 / 0.22)',
    cardNote: 'shadow',
    dialogNote: 'shadow',
    planes: ['#EDEFF3', '#FFFFFF', '#FFFFFF'],
    carrier: 'shadow',
  },
};

const NOTES: Record<string, string> = {
  dark: 'All three planes are painted from one base. Only the white film thickens, and that is what makes the dialog read as higher.',
  light: 'The page is light, so a shadow has something to darken. Both raised planes are plain white and the shadow does the work.',
};

const LEVELS = [
  { key: 'page', name: 'Page' },
  { key: 'card', name: 'Card' },
  { key: 'dialog', name: 'Dialog' },
] as const;

const PROPS: Record<string, keyof Scheme> = {
  '--e-page': 'page',
  '--e-base': 'base',
  '--e-ink': 'ink',
  '--e-muted': 'muted',
  '--e-line': 'line',
  '--e-card-film': 'cardFilm',
  '--e-dialog-film': 'dialogFilm',
  '--e-card-shadow': 'cardShadow',
  '--e-dialog-shadow': 'dialogShadow',
};

const START = 'dark';

/**
 * Elevation overlay specimen: a dark page holding a card and a dialog, where every plane is
 * painted from the same base colour and the raised ones carry a white film whose opacity
 * rises with elevation. The readout beside the stack reports the composite each film leaves,
 * so the ladder is stated in lightness rather than claimed. Switching to the light scheme
 * removes the films and gives the same two planes shadows instead, which is the job the
 * overlay exists to replace.
 *
 * The subject is the stack of planes: the term names those surfaces and their film, not the
 * scheme control, the readout that measures them, or the note (SPEC §5). The light scheme is
 * a state the subject itself passes through and it is not this term, so the honest condition
 * is declared in `data-pose` and the mount state satisfies it: identify keeps playing rather
 * than ringing a shadowed light card (SPEC §6).
 *
 * Every plane is the same box in both schemes, shadows and background films take no layout
 * room, and the readout and note hold fixed boxes, so switching scheme repaints and moves
 * nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = SCHEMES[START] ?? SCHEMES.dark;
  if (!start) return;

  const readout = LEVELS.map((level, i) => {
    const plane = start.planes[i] ?? start.base;
    return `
      <div class="sp-row" style="gap: 6px">
        <span class="sp-swatch" data-part="chip-${level.key}" style="flex: 0 0 auto; width: 14px; height: 14px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.45); --sp-swatch: ${plane}"></span>
        <span class="sp-text" style="flex: 1 1 auto; font-size: 11px; color: var(--sp-ink)">${level.name}</span>
        <span class="sp-text" data-part="l-${level.key}"
              style="flex: 0 0 46px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">L* ${lightness(plane)}</span>
      </div>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Theme" data-term="dark" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div data-part="stack" data-subject data-pose="[data-scheme=dark]" data-scheme="${START}" data-carrier="${start.carrier}"
               style="flex: 0 0 214px; height: 190px; padding: 10px; border-radius: var(--sp-radius);
                      border: 1px solid var(--e-line); background: var(--e-page)">
            <span class="sp-label" style="color: var(--e-muted)">Page &middot; 0dp</span>
            <div data-part="card" style="margin-top: 8px; padding: 10px; border-radius: 6px; border: 1px solid var(--e-line);
                 background-color: var(--e-base); background-image: var(--e-card-film); box-shadow: var(--e-card-shadow)">
              <span class="sp-label" style="color: var(--e-muted)">Card &middot; 1dp &middot; <span data-part="card-note">${start.cardNote}</span></span>
              <div data-part="dialog" style="margin-top: 8px; padding: 9px 10px; border-radius: 6px; border: 1px solid var(--e-line);
                   background-color: var(--e-base); background-image: var(--e-dialog-film); box-shadow: var(--e-dialog-shadow)">
                <span style="font-size: 12px; font-weight: 500; color: var(--e-ink)">Dialog &middot; 8dp &middot; <span data-part="dialog-note">${start.dialogNote}</span></span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" data-part="readout" data-scheme="${START}" style="gap: 6px">
            <span class="sp-label">Lightness</span>
            ${readout}
            <p class="sp-text" data-part="note" style="margin: 2px 0 0; height: 88px; font-size: 11px">${NOTES[START]}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const stack = part(root, 'stack');
  const readoutEl = part(root, 'readout');
  const cardNote = part(root, 'card-note');
  const dialogNote = part(root, 'dialog-note');
  const note = part(root, 'note');

  const paint = (name: string) => {
    const scheme = SCHEMES[name];
    if (!scheme) return;
    stack.dataset.scheme = name;
    stack.dataset.carrier = scheme.carrier;
    for (const [prop, key] of Object.entries(PROPS)) stack.style.setProperty(prop, String(scheme[key]));
    LEVELS.forEach((level, i) => {
      const plane = scheme.planes[i] ?? scheme.base;
      part(root, `chip-${level.key}`).style.setProperty('--sp-swatch', plane);
      part(root, `l-${level.key}`).textContent = `L* ${lightness(plane)}`;
    });
    cardNote.textContent = scheme.cardNote;
    dialogNote.textContent = scheme.dialogNote;
    readoutEl.dataset.scheme = name;
    note.textContent = NOTES[name] ?? '';
  };
  paint(START);

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
