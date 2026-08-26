import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Palette = {
  bg: string;
  mark: string;
  head: string;
  body: string;
  safeBg: string;
  safePlate: string;
  safeMark: string;
  safeInk: string;
};

/**
 * The palette the mail was authored in: a pure white ground, a dark wordmark with no
 * ground of its own, a grey for the copy, and beside it the defended version, a
 * mid-tone block whose mark sits on a plate of brand colour and whose text is a
 * near-black rather than black.
 */
const LIGHT: Palette = {
  bg: '#FFFFFF',
  mark: '#14161A',
  head: '#000000',
  body: '#3A3A3A',
  safeBg: '#E8ECF4',
  safePlate: '#2F57D8',
  safeMark: '#FFFFFF',
  safeInk: '#0E0E0E',
};

/**
 * Two client behaviours, written out as palettes rather than computed: a simulation of
 * what clients do, not a claim about a particular build. `partial` flips the pure
 * values and leaves everything else, which is what strands a grey. `full` inverts the
 * lightness of every declared colour. Neither can touch `mark` or `safeMark`, because
 * those are the pixels of an image and no inversion recolours them.
 */
const INVERTED: Record<string, Palette> = {
  partial: {
    bg: '#121212',
    mark: '#14161A',
    head: '#F2F2F2',
    body: '#3A3A3A',
    safeBg: '#E8ECF4',
    safePlate: '#2F57D8',
    safeMark: '#FFFFFF',
    safeInk: '#0E0E0E',
  },
  full: {
    bg: '#0F1114',
    mark: '#14161A',
    head: '#EDEFF2',
    body: '#C9CCD1',
    safeBg: '#262C38',
    safePlate: '#2F57D8',
    safeMark: '#FFFFFF',
    safeInk: '#F0F1F3',
  },
};

const NOTES: Record<string, string> = {
  partial: 'Grounds flipped and the declared fills kept, so the grey copy stayed dark on a dark ground.',
  full: 'Every declared colour inverted, so the copy came with it. Image pixels never do, so the bare mark did not.',
};

const NAMES: Record<string, string> = { partial: 'Inverted, partial', full: 'Inverted, full' };
const START = 'partial';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

/** WCAG contrast, so the specimen measures what survived instead of asserting it. */
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
};

const PROPS: Record<string, keyof Palette> = {
  '--c-bg': 'bg',
  '--c-mark': 'mark',
  '--c-head': 'head',
  '--c-body': 'body',
  '--c-safe-bg': 'safeBg',
  '--c-safe-plate': 'safePlate',
  '--c-safe-mark': 'safeMark',
  '--c-safe-ink': 'safeInk',
};

const vars = (p: Palette) =>
  Object.entries(PROPS)
    .map(([key, value]) => `${key}: ${p[value]}`)
    .join('; ');

const reading = (p: Palette) => `mark ${ratio(p.mark, p.bg).toFixed(1)}:1 · copy ${ratio(p.body, p.bg).toFixed(1)}:1`;

/**
 * Dark mode email specimen: one mail card rendered twice, in the palette it was
 * authored in and as a client repaints it, with the client's behaviour picked as an
 * absolute state. Both cards carry the same two blocks: a bare wordmark over the
 * card's own ground with grey copy under it, and the defended version, plated mark
 * and near-black text on a mid-tone block of its own.
 *
 * The inversion is a labelled simulation, which is the legitimate kind: no pointer
 * can make a mail client repaint a document (SPEC §8). What it does to the picture is
 * measured rather than claimed, as WCAG contrast between the mark and the ground
 * behind it and between the copy and the same ground, which is what `data-mark` and
 * `data-copy` report.
 *
 * The subject is the inverted card. The term names that rendering, not the control
 * above it and not the authored card, which is the half being compared against and
 * stays in the context register (SPEC §5). Both cards are the same markup at the same
 * size and every readout is one line, so switching behaviour repaints and moves
 * nothing.
 */
export function mount(root: HTMLElement): void {
  const card = (name: string, palette: Palette, subject = false) => `
    <div class="${subject ? '' : 'sp-context '}sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
      <div data-part="${name}" ${subject ? 'data-subject' : ''}
           style="${vars(palette)}; padding: 9px; border-radius: var(--sp-radius);
                  border: 1px solid var(--sp-line); background: var(--c-bg)">
        <div data-part="${name}-bare">
          <div class="sp-row" style="gap: 7px">
            <span style="display: flex; color: var(--c-mark)">${icon('inbox')}</span>
            <span style="font-size: 11px; font-weight: 600; color: var(--c-head)">Northwind</span>
          </div>
          <p style="margin: 5px 0 0; font-size: 10.5px; line-height: 1.35; color: var(--c-body)">Your March statement is ready.</p>
        </div>
        <div data-part="${name}-plated" style="margin-top: 9px; padding: 7px; border-radius: 6px; background: var(--c-safe-bg)">
          <div class="sp-row" style="gap: 7px">
            <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;
                         border-radius: 6px; background: var(--c-safe-plate); color: var(--c-safe-mark)">${icon('inbox')}</span>
            <span style="font-size: 11px; font-weight: 600; color: var(--c-safe-ink)">Northwind</span>
          </div>
          <p style="margin: 5px 0 0; font-size: 10.5px; line-height: 1.35; color: var(--c-safe-ink)">Your March statement is ready.</p>
        </div>
      </div>
      <span class="sp-label" data-part="${name}-name" style="font-size: 10px">${subject ? NAMES[START] : 'As authored'}</span>
      <span class="sp-text" data-part="${name}-reading" style="font-size: 10px">${reading(palette)}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">What the client does</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-partial" value="partial">Partial invert</button>
            <button class="sp-segment" data-part="seg-full" value="full">Full invert</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          ${card('authored', LIGHT)}
          ${card('inverted', INVERTED[START] ?? LIGHT, true)}
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 9px 0 0; height: 32px; font-size: 12px; line-height: 1.35">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const inverted = part(root, 'inverted');
  const invertedName = part(root, 'inverted-name');
  const invertedReading = part(root, 'inverted-reading');
  const note = part(root, 'note');

  const apply = (mode: string) => {
    const palette = INVERTED[mode];
    if (!palette) return;
    inverted.dataset.mode = mode;
    inverted.dataset.mark = ratio(palette.mark, palette.bg) < 3 ? 'lost' : 'kept';
    inverted.dataset.copy = ratio(palette.body, palette.bg) < 3 ? 'lost' : 'kept';
    for (const [key, value] of Object.entries(PROPS)) inverted.style.setProperty(key, palette[value]);
    invertedName.textContent = NAMES[mode] ?? mode;
    invertedReading.textContent = reading(palette);
    note.textContent = NOTES[mode] ?? '';
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
