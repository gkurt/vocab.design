import { flag, part } from '#src/kit/parts.ts';

/** The panel's height, and the room the visible viewport loses to it. */
const KEYBOARD_H = 138;
const VIEWPORT_H = 268;
/** How far the form travels so the field being typed into stays above the keys. */
const SCROLL_Y = 70;

const LETTERS = ['qwertyuiop', 'asdfghjkl'];
const LAST_ROW = 'zxcvbnm';
const DIGIT_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'back'],
];

const KEY_STYLE =
  'height: 22px; padding: 0; border-radius: 4px; background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 11px; font-weight: 500';

const key = (label: string, name: string, grow = 1) => `
  <button class="sp-button" type="button" data-part="key-${name}" style="flex: ${grow} 1 0; color: var(--sp-ink); ${KEY_STYLE}">${label}</button>`;

const row = (inner: string) => `<div class="sp-row" style="gap: 3px">${inner}</div>`;

const letterKeys = [
  ...LETTERS.map((line) => row([...line].map((c) => key(c, c)).join(''))),
  row(key('⇧', 'shift', 1.5) + [...LAST_ROW].map((c) => key(c, c)).join('') + key('⌫', 'back', 1.5)),
  row(key('123', 'digits-key', 1.6) + key('space', 'space', 4) + key('Pay', 'enter', 1.8)),
].join('');

const digitKey = (c: string) => key(c === 'back' ? '⌫' : c, c);
const digitKeys = DIGIT_ROWS.map((line) => row(line.map(digitKey).join(''))).join('');

const field = (name: string, label: string, hint: string) => `
  <div class="sp-field" data-part="field-${name}-wrap">
    <span class="sp-label">${label}</span>
    <div
      data-part="field-${name}"
      role="textbox"
      aria-label="${label}"
      style="display: flex; align-items: center; height: 28px; padding: 0 9px; background: var(--sp-surface);
             border: 1px solid var(--sp-line); border-radius: 6px; font-size: 13px; cursor: text"
    >
      <span data-part="value-${name}"></span><span class="sp-caret" data-part="caret-${name}" hidden></span>
    </div>
    <span class="sp-label" style="font-size: 10px">${hint}</span>
  </div>`;

/**
 * Virtual keyboard specimen: a phone whose keyboard is chosen by the field that asked
 * for it. Tapping the card number raises a digit pad, tapping the name raises letters,
 * and the panel takes a third of the screen away in both cases.
 *
 * The subject is the keyboard panel, which is what the term names: not the phone, not
 * the form, not one key. The readout beside the phone reports the height the visible
 * area is left with, which is the whole of what a keyboard does to a layout.
 *
 * The shrink is the term, so it is contained inside the phone (SPEC §5): the visible
 * area loses its bottom to the panel, the pay bar rides up with it rather than sitting
 * under the keys, and the form slides so the field being typed into stays above them.
 * Nothing outside the phone moves. Every control reaches a state: a field always raises
 * its own key set, Done always lowers the panel (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="gap: 22px; align-items: center">
        <div
          data-part="phone"
          style="position: relative; width: 214px; height: 288px; flex: 0 0 auto; overflow: hidden;
                 background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 18px"
        >
          <div class="sp-row sp-row--between sp-context" style="height: 20px; padding: 0 12px">
            <span class="sp-label" style="font-size: 10px">9:41</span>
            <span class="sp-label" style="font-size: 10px">Checkout</span>
          </div>

          <div
            data-part="viewport"
            style="position: absolute; left: 0; right: 0; top: 20px; bottom: 0; overflow: hidden;
                   background: var(--sp-sunken); transition: bottom 0.26s var(--sp-ease)"
          >
            <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 40px; overflow: hidden">
              <div
                class="sp-stack sp-context"
                data-part="form"
                style="gap: 10px; padding: 10px; transition: transform 0.26s var(--sp-ease)"
              >
                ${field('card', 'Card number', 'inputmode="numeric"')}
                ${field('name', 'Name on card', 'inputmode="text"')}
                <span class="sp-text" style="font-size: 10px">Billed once. Cancel any time.</span>
              </div>
            </div>
            <div
              class="sp-row sp-context"
              data-part="paybar"
              style="position: absolute; left: 0; right: 0; bottom: 0; height: 40px; padding: 6px 10px;
                     background: var(--sp-surface); border-top: 1px solid var(--sp-line)"
            >
              <button class="sp-button sp-button--sm sp-grow" type="button" data-part="pay">Pay 42.00</button>
            </div>
          </div>

          <div
            data-part="keyboard"
            data-subject
            data-layout="text"
            role="group"
            aria-label="On screen keyboard"
            style="position: absolute; left: 0; right: 0; bottom: 0; height: ${KEYBOARD_H}px; background: var(--sp-bg);
                   border-top: 1px solid var(--sp-line); transform: translateY(100%); visibility: hidden;
                   transition: transform 0.26s var(--sp-ease), visibility 0.26s"
          >
            <div class="sp-row" style="height: 26px; gap: 6px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label sp-grow" data-part="kb-name" style="font-size: 10px">Letters</span>
              <button class="sp-button sp-button--quiet" type="button" data-part="next" style="padding: 2px 8px; font-size: 11px">Next</button>
              <button class="sp-button sp-button--quiet" type="button" data-part="done" style="padding: 2px 8px; font-size: 11px">Done</button>
            </div>
            <div class="sp-stack" data-part="keys-text" style="gap: 4px; padding: 5px">${letterKeys}</div>
            <div class="sp-stack" data-part="keys-digits" hidden style="gap: 4px; padding: 5px">${digitKeys}</div>
          </div>
        </div>

        <div class="sp-stack sp-context" style="width: 218px; gap: 10px">
          <span class="sp-heading" style="font-size: 14px">The field picks the keys</span>
          <span class="sp-text" style="font-size: 12px">
            The device owns the panel. All the page gets to say is what kind of value it wants, and the
            return key is labelled from that too.
          </span>
          <div class="sp-surface sp-stack" style="gap: 4px; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">Visible area</span>
            <span class="sp-text sp-text--ink" data-part="readout" style="font-variant-numeric: tabular-nums">${VIEWPORT_H} px, keyboard down</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const keyboard = part(root, 'keyboard');
  const viewport = part(root, 'viewport');
  const form = part(root, 'form');
  const readout = part(root, 'readout');
  const kbName = part(root, 'kb-name');
  const textKeys = part(root, 'keys-text');
  const digitPad = part(root, 'keys-digits');

  const values: Record<string, string> = { card: '', name: '' };
  let focused: 'card' | 'name' | undefined;

  const draw = (name: 'card' | 'name') => {
    part(root, `value-${name}`).textContent = values[name] ?? '';
    flag(part(root, `field-${name}`), 'data-filled', (values[name] ?? '').length > 0);
  };

  const lower = () => {
    if (focused) {
      part(root, `field-${focused}`).removeAttribute('data-sim-focus');
      part(root, `caret-${focused}`).hidden = true;
    }
    focused = undefined;
    keyboard.style.transform = 'translateY(100%)';
    keyboard.style.visibility = 'hidden';
    viewport.style.bottom = '0';
    form.style.transform = 'translateY(0)';
    readout.textContent = `${VIEWPORT_H} px, keyboard down`;
  };

  const raise = (name: 'card' | 'name') => {
    if (focused && focused !== name) {
      part(root, `field-${focused}`).removeAttribute('data-sim-focus');
      part(root, `caret-${focused}`).hidden = true;
    }
    focused = name;
    // Simulated focus, never real: attract mode must not move the keyboard of a
    // reader scrolling past (SPEC §7).
    part(root, `field-${name}`).setAttribute('data-sim-focus', '');
    part(root, `caret-${name}`).hidden = false;

    const digits = name === 'card';
    keyboard.dataset.layout = digits ? 'digits' : 'text';
    textKeys.hidden = digits;
    digitPad.hidden = !digits;
    kbName.textContent = digits ? 'Number pad' : 'Letters';

    keyboard.style.transform = 'translateY(0)';
    keyboard.style.visibility = 'visible';
    viewport.style.bottom = `${KEYBOARD_H}px`;
    form.style.transform = digits ? 'translateY(0)' : `translateY(-${SCROLL_Y}px)`;
    readout.textContent = `${VIEWPORT_H - KEYBOARD_H} px, keyboard up`;
  };

  for (const name of ['card', 'name'] as const) {
    part(root, `field-${name}`).addEventListener('click', () => raise(name));
  }

  const typeInto = (char: string) => {
    if (!focused) return;
    values[focused] = `${values[focused] ?? ''}${char}`.slice(0, focused === 'card' ? 16 : 14);
    draw(focused);
  };

  for (const el of keyboard.querySelectorAll<HTMLElement>('[data-part^="key-"]')) {
    const name = el.dataset.part?.slice(4) ?? '';
    el.addEventListener('click', () => {
      if (!focused) return;
      if (name === 'back') {
        values[focused] = (values[focused] ?? '').slice(0, -1);
        draw(focused);
        return;
      }
      if (name === 'space') return typeInto(' ');
      if (name === 'shift' || name === 'digits-key' || name === 'enter') return;
      typeInto(name);
    });
  }

  // The accessory bar's own moves: Next always lands on the name, Done always lowers
  // the panel, so a script joined at any point reaches the same state (SPEC §8).
  part(root, 'next').addEventListener('click', () => raise('name'));
  part(root, 'done').addEventListener('click', lower);

  draw('card');
  draw('name');
}
