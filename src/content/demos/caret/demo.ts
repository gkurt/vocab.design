import { part } from '#src/kit/parts.ts';

const START_TEXT = 'harbour-notes';

/** A space has to hold its own box, since the caret can sit either side of one. */
const CHAR = 'white-space: pre';

/**
 * Caret specimen: a name field where the insertion point is placed by pressing,
 * moved by Home and End, and typed into wherever it happens to be. The subject is
 * the caret itself, and it is deliberately not the field or a wrapper around it:
 * the term names the bar between two characters, and a box drawn around anything
 * larger would be pointing at a text field instead. Its own box is two pixels
 * wide by a line tall, which the stage's ring pads out to something a reader can
 * see (SPEC §6).
 *
 * The characters are separate boxes so a press can be resolved to the gap it is
 * nearest rather than to the letter under it, which is the one piece of craft the
 * term is about. The caret element is moved between them rather than redrawn, so
 * it survives every edit, and its blink is the kit's, which means a stated motion
 * preference stops it. The magnified inset beside the field is scenery: it says
 * what the caret is between, the way a fingertip's magnifier does on touch.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Rename</span>
          <span class="sp-text" data-part="readout" style="width: 96px; text-align: right">13 of 13</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 14px">
          <div class="sp-field" style="width: 150px">
            <span class="sp-label sp-context">File name</span>
            <div
              class="sp-input"
              data-part="field"
              data-at="end"
              role="textbox"
              aria-label="File name"
              tabindex="0"
              style="width: 150px; line-height: 1.5; cursor: text; overflow: hidden; user-select: none"
            ></div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label">Between</span>
            <div
              class="sp-surface"
              data-part="zoom"
              style="display: flex; align-items: center; justify-content: center; gap: 1px; width: 96px; height: 44px; font-size: 24px; letter-spacing: 1px"
            ></div>
          </div>
          <span class="sp-label sp-context" style="text-align: center">
            The pointer is the cursor. This is the insertion point.
          </span>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const readout = part(root, 'readout');
  const zoom = part(root, 'zoom');

  const caret = document.createElement('span');
  caret.className = 'sp-caret';
  caret.setAttribute('data-part', 'caret');
  caret.setAttribute('data-subject', '');

  const box = (char: string) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.setAttribute('style', CHAR);
    return span;
  };

  let chars = [...START_TEXT].map(box);
  let offset = chars.length;

  const render = () => {
    field.replaceChildren(...chars);
    place();
  };

  /**
   * Moves only the caret, and only when its gap actually changed. A press lands
   * here via pointerdown, and re-inserting the node the press landed on between
   * pointerdown and pointerup swallows the click the reader is owed (the
   * drag-and-drop lesson); a full re-render would re-parent every box.
   */
  const place = () => {
    const anchor = chars[offset] ?? null;
    if (caret.nextSibling !== anchor || caret.parentElement !== field) field.insertBefore(caret, anchor);
    field.dataset.at = offset === 0 ? 'start' : offset === chars.length ? 'end' : 'middle';
    readout.textContent = `${offset} of ${chars.length}`;
    // What the caret is between, blown up: a space is drawn as a dot so the gap on
    // either side of it is legible, and the ends of the line are drawn as edges.
    const glyph = (index: number) => {
      const char = chars[index]?.textContent;
      if (char === undefined) return '<span style="color: var(--sp-muted)">|</span>';
      return char === ' ' ? '<span style="color: var(--sp-muted)">·</span>' : char;
    };
    zoom.innerHTML = `${glyph(offset - 1)}<span class="sp-caret" style="height: 26px"></span>${glyph(offset)}`;
  };

  const moveTo = (next: number) => {
    offset = Math.min(Math.max(next, 0), chars.length);
    place();
  };

  render();

  // A press lands on the nearest gap between characters, not on the character it is
  // over, which is why pressing just right of a letter puts the caret after it.
  field.addEventListener('pointerdown', (event) => {
    const at = chars.findIndex((char) => {
      const rect = char.getBoundingClientRect();
      return event.clientX < rect.left + rect.width / 2;
    });
    moveTo(at === -1 ? chars.length : at);
  });

  root.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key === 'Home') moveTo(0);
    else if (key === 'End') moveTo(chars.length);
    else if (key === 'ArrowLeft') moveTo(offset - 1);
    else if (key === 'ArrowRight') moveTo(offset + 1);
    else if (key === 'Backspace') {
      if (offset === 0) return;
      chars = [...chars.slice(0, offset - 1), ...chars.slice(offset)];
      offset -= 1;
      render();
    } else if (key.length === 1) {
      chars = [...chars.slice(0, offset), box(key), ...chars.slice(offset)];
      offset += 1;
      render();
    } else return;
    event.preventDefault();
  });
}
