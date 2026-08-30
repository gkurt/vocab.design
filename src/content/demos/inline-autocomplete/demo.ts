import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** A known finite set, which is what separates this from a generated suggestion. */
const ENTRIES = ['vocabulary', 'vocal range', 'vocative case', 'voice onset', 'void ratio'] as const;

const RECENT = [
  ['vocabulary', 'visited yesterday'],
  ['vocal range', 'visited last week'],
] as const;

/**
 * Inline autocomplete specimen: three characters are typed and the field finishes the
 * word inside itself, with the supplied remainder drawn as a selected range. Two more
 * characters land over that selection rather than after it, and the guess changes to
 * match, which is the whole claim: the remainder is never text the reader owns.
 *
 * The subject is the remainder itself, given its own element, because that is the
 * feature the term names. The field is a text field, the list below is history, and
 * neither is this word.
 *
 * The line under the field used to count the characters and then explain the mechanism
 * ("3 typed, 10 shown. The rest is selected, so the next key lands over it."). It prints
 * what a jump field would print instead: what Enter would open, or that nothing matches.
 *
 * The visible field is drawn (a typed run, the selected remainder, a caret) over a
 * transparent real input that holds the value and receives the keystrokes. A styled
 * selection inside a native input is not addressable, and the selected remainder is
 * precisely the thing this specimen has to show. The row keeps one height and the
 * readout one box, so completing moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const history = RECENT.map(
    ([term, when]) => `
      <div class="sp-row sp-row--between" style="height: 26px">
        <span class="sp-row" style="gap: 6px; font-size: 12px">${icon('search')}${term}</span>
        <span class="sp-label" style="font-size: 10px">${when}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Glossary</span><span class="sp-text">${ENTRIES.length} entries</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <span class="sp-label sp-context">Jump to an entry</span>
          <div
            class="sp-input"
            data-part="field"
            data-guess=""
            style="position: relative; display: flex; align-items: center; height: 36px; padding: 0 10px; font-size: 15px; overflow: hidden"
          >
            <span class="sp-text--ink" data-part="typed" style="white-space: pre"></span>
            <span class="sp-caret" style="margin: 0 1px"></span>
            <span
              data-part="remainder"
              data-subject
              hidden
              style="white-space: pre; background: var(--sp-accent); color: var(--sp-accent-ink); border-radius: 2px"
            ></span>
            <input
              data-part="editor"
              type="text"
              autocomplete="off"
              spellcheck="false"
              aria-label="Jump to an entry"
              style="position: absolute; inset: 0; width: 100%; border: 0; padding: 0; background: transparent; font: inherit; opacity: 0"
            />
          </div>
          <div class="sp-surface sp-context" style="padding: 4px 10px">${history}</div>
          <span class="sp-text sp-context" data-part="readout" role="status" style="font-size: 11px">Type to jump to an entry</span>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const typed = part(root, 'typed');
  const remainder = part(root, 'remainder');
  const readout = part(root, 'readout');
  const editor = part(root, 'editor') as HTMLInputElement;

  const draw = () => {
    const value = editor.value;
    const guess = value === '' ? undefined : ENTRIES.find((entry) => entry.length > value.length && entry.startsWith(value.toLowerCase()));
    typed.textContent = value;
    remainder.textContent = guess ? guess.slice(value.length) : '';
    remainder.hidden = !guess;
    field.dataset.guess = guess ?? '';
    if (!value) readout.textContent = 'Type to jump to an entry';
    else if (!guess) readout.textContent = `No entry starts with ${value}`;
    else readout.textContent = `Enter to open ${guess}`;
  };

  editor.addEventListener('input', draw);
  draw();
}
