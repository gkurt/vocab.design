import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Which = 'heading' | 'button' | 'checkbox' | 'label';

/** How many cells the display physically has. Twenty is a common portable size. */
const CELLS = 20;

/**
 * North American Computer Braille: letters a to z, digits dropped one row, and the two
 * brackets a state is drawn in. A capital adds dot 7, which is what the eighth pin is for.
 */
const LETTER: Record<string, string> = {
  a: '1',
  b: '12',
  c: '14',
  d: '145',
  e: '15',
  f: '124',
  g: '1245',
  h: '125',
  i: '24',
  j: '245',
  k: '13',
  l: '123',
  m: '134',
  n: '1345',
  o: '135',
  p: '1234',
  q: '12345',
  r: '1235',
  s: '234',
  t: '2345',
  u: '136',
  v: '1236',
  w: '2456',
  x: '1346',
  y: '13456',
  z: '1356',
};

const SYMBOL: Record<string, string> = {
  '0': '356',
  '1': '2',
  '2': '23',
  '3': '25',
  '4': '256',
  '5': '26',
  '6': '235',
  '7': '2356',
  '8': '236',
  '9': '35',
  '(': '12356',
  ')': '23456',
  ' ': '',
};

/** The pin order down each column, so a cell is drawn as the two columns of four. */
const PINS = [1, 4, 2, 5, 3, 6, 7, 8];

function dotsFor(ch: string): string {
  const lower = ch.toLowerCase();
  if (LETTER[lower]) return ch === lower ? LETTER[lower] : `${LETTER[lower]}7`;
  return SYMBOL[ch] ?? '';
}

type Element = { screen: string; speech: string; line: string };

/**
 * The same four elements a screen reader would be sitting on, in both of its output
 * channels. The braille lines carry the abbreviations braille users actually get.
 */
const ELEMENTS: Record<Which, Element> = {
  heading: { screen: 'heading', speech: '“Weekly report, heading level 1”', line: 'Weekly report h1' },
  button: { screen: 'button', speech: '“Save changes, button”', line: 'Save changes btn' },
  checkbox: { screen: 'checkbox', speech: '“Auto save, checkbox, checked”', line: 'Auto save chk (x)' },
  label: { screen: 'long', speech: '“Add to shopping cart, button”', line: 'cart btn' },
};

const CAPTION: Record<Which, string> = {
  heading:
    'The same accessibility tree speech reads from, rendered as pins. Role and level are abbreviated, because the line is only twenty cells wide.',
  button: 'Nothing here was authored for braille. Get the role and the name right for speech and this line is right too.',
  checkbox: 'State comes across in brackets. Braille is persistent, so the reader can go back over the line rather than ask for it again.',
  label:
    'aria-braillelabel shortens a name that is fine to hear and fills the whole strip to feel. A narrow exception, not a second place to write copy.',
};

/** One braille cell: eight pins, the raised ones drawn solid. */
function cell(ch: string): string {
  const dots = dotsFor(ch);
  const pins = PINS.map((pin) => {
    const up = dots.includes(String(pin));
    return `<span style="width: 4px; height: 4px; border-radius: 50%;
             background: ${up ? 'var(--sp-ink)' : 'var(--sp-line)'}"></span>`;
  }).join('');
  return `<span style="display: grid; grid-template-columns: repeat(2, 4px); gap: 2px">${pins}</span>`;
}

/**
 * Braille display specimen: a twenty cell strip showing what a refreshable display renders
 * for the element a screen reader is on. A segmented control picks the element and the pins
 * re-form, carrying the abbreviations braille users get (`h1`, `btn`, `chk`, a state in
 * brackets) beside the speech the same tree produces. The last setting is an
 * `aria-braillelabel` override, where the two channels deliberately disagree.
 *
 * The subject is the cell strip, the narrowest element the term names: the display is the
 * strip of pins, not the element being read and not the screen it sits on. The segmented
 * control, the on-screen element, the speech readout, the transcription line and the caption
 * are scenery (SPEC §5). A strip of pins is a braille display in all four of its resting
 * states, so no `data-pose` is needed (SPEC §6).
 *
 * The cell count is fixed at the size a real portable display has, so a shorter line leaves
 * flat cells rather than shrinking the strip and moving the rows below it (SPEC §5). Each
 * segment reaches its own element rather than cycling (SPEC §8), and no timer is needed.
 */
export function mount(root: HTMLElement): void {
  const strip = (line: string) => Array.from({ length: CELLS }, (_, i) => cell(line[i] ?? ' ')).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="heading" data-axis="Element" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-heading" value="heading"
                    style="padding: 5px 10px; font-size: 12px">Heading</button>
            <button class="sp-segment" data-part="seg-button" value="button"
                    style="padding: 5px 10px; font-size: 12px">Button</button>
            <button class="sp-segment" data-part="seg-checkbox" value="checkbox"
                    style="padding: 5px 10px; font-size: 12px">Checkbox</button>
            <button class="sp-segment" data-part="seg-label" value="label"
                    style="padding: 5px 10px; font-size: 12px">Braille label</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="screen" data-el="heading"
             style="margin-top: 9px; padding: 0 10px; height: 42px; display: flex; align-items: center">
          <span class="sp-heading" data-part="el-heading" style="font-size: 13px">Weekly report</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="el-button" hidden
                  style="font-size: 12px; cursor: default">Save changes</button>
          <span class="sp-row" data-part="el-checkbox" hidden style="gap: 7px">
            <span class="sp-checkbox" data-checked></span>
            <span class="sp-text sp-text--ink" style="font-size: 12px">Auto save</span>
          </span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="el-long" hidden
                  style="font-size: 12px; cursor: default">Add to shopping cart</button>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Speech says</span>
          <span class="sp-text sp-text--ink" data-part="speech" data-el="heading"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${ELEMENTS.heading.speech}</span>
        </div>

        <div class="sp-surface" data-part="strip" data-subject data-el="heading" data-cells="16"
             style="width: fit-content; margin: 10px auto 0; padding: 8px 10px; display: flex; gap: 4px;
                    background: var(--sp-sunken)">${strip(ELEMENTS.heading.line)}</div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The line reads</span>
          <span class="sp-text sp-text--ink" data-part="line" data-el="heading"
                style="flex: 0 0 auto; font-size: 11.5px; letter-spacing: 0.04em; white-space: nowrap">${ELEMENTS.heading.line}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-el="heading"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${CAPTION.heading}</p>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const stripEl = part(root, 'strip');
  const speech = part(root, 'speech');
  const line = part(root, 'line');
  const caption = part(root, 'caption');
  const shown = ['el-heading', 'el-button', 'el-checkbox', 'el-long'];

  const apply = (which: Which) => {
    const spec = ELEMENTS[which];
    screen.dataset.el = which;
    for (const key of shown) part(root, key).toggleAttribute('hidden', key !== `el-${spec.screen}`);
    speech.dataset.el = which;
    speech.textContent = spec.speech;
    stripEl.dataset.el = which;
    stripEl.dataset.cells = String(spec.line.length);
    stripEl.innerHTML = strip(spec.line);
    line.dataset.el = which;
    line.textContent = spec.line;
    caption.dataset.el = which;
    caption.textContent = CAPTION[which];
  };

  apply('heading');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Which);
  });
}
