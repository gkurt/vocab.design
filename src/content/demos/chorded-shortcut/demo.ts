import { part } from '#src/kit/parts.ts';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px';
const ROW_H = 19;
/** Room for the longest the file ever gets, so a duplicate never moves what is under it. */
const ROWS_RESERVED = 5;

const DELETE_LINE = 'Ctrl+Shift+K';
const DUPLICATE_LINE = 'Ctrl+D';

const START = ['const rows = load();', 'const total = sum(rows);', 'report(total);', 'return total;'];
const START_CARET = 1;

const MODIFIERS = new Set(['Control', 'Shift', 'Alt', 'Meta']);

const cap = (slot: number) => `
  <span
    class="sp-kbd"
    data-part="cap-${slot}"
    style="min-width: 48px; height: 24px; font-size: 12px"
  ></span>
  <span class="sp-label" data-part="plus-${slot}" style="font-size: 12px">+</span>`;

/**
 * Chorded shortcut specimen: a small editor whose two commands are chords, with the keys that
 * arrived together drawn as caps that light at the same moment.
 *
 * The subject is the chord readout, not the editor. The term names a run of keys that are all
 * down at once, and that has no other body on screen: the file is what these particular chords
 * happen to do here, and the readout is the only place the simultaneity itself is visible. The
 * editor, the legend and the frame are scenery in the context register. Key sequence, the
 * neighbouring specimen, marks its subject the same way and for the same reason.
 *
 * The chord is read off the event rather than matched against a string, which is what keeps
 * the specimen honest in both directions. A real keyboard sends one keydown with `ctrlKey` and
 * `shiftKey` set and `key` holding the letter, and the demo assembles "Ctrl+Shift+K" from
 * those flags. The stage's scripted press carries the whole chord in `key` and no flags, and
 * the same assembly produces the same name, so the script and a reader's own hands run the
 * identical code path.
 *
 * The two near misses are demonstrated as well, because they are what the term is defined
 * against: a modifier pressed on its own commands nothing, and a modifier released before the
 * letter is a sequence rather than a chord, which the arriving event says outright by carrying
 * no flags at all.
 *
 * Every cap slot holds its width and the file pane reserves room for its longest state, so a
 * chord firing moves nothing (SPEC §5).
 *
 * A line under the caps read "All of them arrive on one keydown, which is what makes it a
 * chord.", which is the article's definition printed inside an editor. The caps light
 * together and the verdict names what fired, so the definition has gone and the frame lost
 * the row it took.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Editor</span>
          <span class="sp-text" data-part="readout" style="width: 336px; text-align: right; white-space: nowrap">No chord pressed yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="chord"
            data-subject
            data-state="none"
            style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px"
          >
            <div class="sp-row" style="gap: 6px">
              ${cap(1)}${cap(2)}
              <span class="sp-kbd" data-part="cap-3" style="min-width: 48px; height: 24px; font-size: 12px"></span>
              <span class="sp-grow"></span>
              <span
                class="sp-text sp-text--ink"
                data-stage-verdict data-part="verdict"
                style="width: 214px; text-align: right; white-space: nowrap; font-size: 12px"
              >Nothing held</span>
            </div>
          </div>

          <div
            class="sp-surface sp-context"
            data-part="editor"
            data-lines="4"
            style="height: ${ROWS_RESERVED * ROW_H + 20}px; padding: 10px 12px; overflow: hidden"
          ></div>

          <div class="sp-row sp-context" style="gap: 14px">
            <span class="sp-label"><span class="sp-kbd">Ctrl</span> <span class="sp-kbd">Shift</span> <span class="sp-kbd">K</span> delete line</span>
            <span class="sp-label"><span class="sp-kbd">Ctrl</span> <span class="sp-kbd">D</span> duplicate line</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const chord = part(root, 'chord');
  const editor = part(root, 'editor');
  const verdict = part(root, 'verdict');
  const readout = part(root, 'readout');

  let lines = [...START];
  let caret = START_CARET;
  let modifierAlone = false;

  const draw = () => {
    editor.dataset.lines = String(lines.length);
    editor.innerHTML = lines
      .map(
        (text, i) => `
        <div
          ${i === caret ? 'data-sim-focus' : ''}
          style="display: flex; gap: 10px; height: ${ROW_H}px; align-items: center; border-radius: 3px; ${MONO}"
        >
          <span class="sp-label" style="width: 12px; text-align: right; ${MONO}">${i + 1}</span>
          <span>${text}</span>
          ${i === caret ? '<span class="sp-caret"></span>' : ''}
        </div>`,
      )
      .join('');
  };

  /** Light exactly the keys that were down together, and hide the slots that stayed empty. */
  const showKeys = (keys: string[], lit: boolean) => {
    for (const slot of [1, 2, 3]) {
      const box = part(root, `cap-${slot}`);
      const name = keys[slot - 1];
      box.textContent = name ?? '';
      box.style.visibility = name ? 'visible' : 'hidden';
      box.style.background = lit && name ? 'var(--sp-accent-soft)' : '';
      box.style.borderColor = lit && name ? 'var(--sp-accent)' : '';
      box.style.color = lit && name ? 'var(--sp-ink)' : '';
      if (slot < 3) part(root, `plus-${slot}`).style.visibility = keys[slot] ? 'visible' : 'hidden';
    }
  };

  const say = (state: string, keys: string[], claim: string, line: string) => {
    chord.dataset.state = state;
    showKeys(keys, true);
    verdict.textContent = claim;
    readout.textContent = line;
  };

  // The chord's name, assembled from the event: a real keyboard puts the modifiers in the
  // flags and the letter in `key`, and the stage's scripted press puts the whole name in
  // `key` with no flags. Both spellings arrive here as the same string.
  const nameOf = (event: KeyboardEvent) => {
    const held = [event.ctrlKey && 'Ctrl', event.shiftKey && 'Shift', event.altKey && 'Alt'].filter(Boolean) as string[];
    const key = event.key.length === 1 ? event.key.toUpperCase() : event.key;
    return [...held, key].join('+');
  };

  root.addEventListener('keydown', (event) => {
    const name = nameOf(event);

    if (name === DUPLICATE_LINE) {
      modifierAlone = false;
      if (lines.length < ROWS_RESERVED) {
        lines = [...lines.slice(0, caret + 1), lines[caret] ?? '', ...lines.slice(caret + 1)];
        caret += 1;
      }
      draw();
      return say('duplicated', ['Ctrl', 'D'], 'fired once, on the D', `${DUPLICATE_LINE} duplicated the line`);
    }

    if (name === DELETE_LINE) {
      modifierAlone = false;
      if (lines.length > 1) {
        lines = lines.filter((_, i) => i !== caret);
        caret = Math.min(caret, lines.length - 1);
      }
      draw();
      return say('deleted', ['Ctrl', 'Shift', 'K'], 'fired once, on the K', `${DELETE_LINE} deleted the line`);
    }

    if (MODIFIERS.has(event.key)) {
      modifierAlone = true;
      return say(
        'modifier',
        [event.key === 'Control' ? 'Ctrl' : event.key],
        'a modifier, not a command',
        'Ctrl down on its own: nothing to fire yet',
      );
    }

    if (modifierAlone && event.key.length === 1 && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      modifierAlone = false;
      return say('sequence', [event.key.toUpperCase()], 'arrived alone: a sequence', 'Ctrl was up already: a sequence, not a chord');
    }

    modifierAlone = false;
    say('stray', [name], 'not bound to anything', `${name} is not a chord this editor answers`);
  });

  showKeys(['Ctrl', 'Shift', 'K'], false);
  draw();
}
