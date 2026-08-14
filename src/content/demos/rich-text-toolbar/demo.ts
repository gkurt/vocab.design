import { flag, part } from '#src/kit/parts.ts';

type Format = 'bold' | 'italic' | 'strike';

const FORMATS: { key: Format; glyph: string; label: string; paint: string }[] = [
  { key: 'bold', glyph: 'B', label: 'Bold', paint: 'font-weight: 700' },
  { key: 'italic', glyph: 'I', label: 'Italic', paint: 'font-style: italic' },
  { key: 'strike', glyph: 'S', label: 'Strikethrough', paint: 'text-decoration: line-through' },
];

/** Each line is a run the caret can sit in, with the formatting it already carries. */
const RUNS = [
  { key: 'intro', text: 'Harbour survey, third pass', bold: false, italic: false, strike: false },
  { key: 'lede', text: 'The gulls came in ahead of the weather.', bold: true, italic: false, strike: false },
  { key: 'note', text: 'Boats tied short by four.', bold: false, italic: false, strike: false },
];

/**
 * Rich text toolbar specimen: a formatting strip over a small editor. The subject is
 * the strip, not any one button (that one is the toggle button) and not the editor
 * under it, since the term names the collection and the reading it does.
 *
 * The reading is the demonstration: moving the caret into the already bold line
 * brings Bold down with nobody pressing it, and moving it out lifts it again. State
 * is spelled twice, `aria-pressed` for the reader who hears the control and the kit's
 * selected attribute for the reader who sees it, since a synthesized press never
 * lights up `:active` (SPEC §7).
 *
 * A latch is what these controls are, so they toggle, and the script drives each one
 * only onto a line that is not already in that state (SPEC §8). Every line keeps a
 * fixed height and never wraps, so re-weighting the type moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tools = FORMATS.map(
    (format) => `
      <button
        class="sp-button sp-button--ghost sp-button--sm"
        type="button"
        data-part="fmt-${format.key}"
        data-aim
        aria-pressed="false"
        aria-label="${format.label}"
        style="width: 32px; padding: 5px 0; text-align: center; ${format.paint}"
      >${format.glyph}</button>`,
  ).join('');

  const lines = RUNS.map(
    (run) => `
      <p
        data-part="run-${run.key}"
        style="display: flex; align-items: center; margin: 0; height: 24px; padding: 0 6px; border-radius: 4px;
               font-size: 13px; white-space: nowrap; overflow: hidden; cursor: text"
      ><span data-part="text-${run.key}">${run.text}</span></p>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 208px">
        <div
          class="sp-row"
          role="toolbar"
          aria-label="Formatting"
          data-part="toolbar"
          data-subject
          style="flex: 0 0 auto; gap: 4px; padding: 7px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          ${tools}
          <div class="sp-divider" style="width: 1px; height: 20px; margin: 0 4px"></div>
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            type="button"
            data-part="fmt-link"
            aria-disabled="true"
          >Link</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-stack" data-part="editor" style="gap: 4px; padding: 10px 8px">${lines}</div>
          <span class="sp-text" data-part="where" data-run="intro" style="margin-top: auto; font-size: 12px">
            Caret in line 1. The strip reads it.
          </span>
        </div>
      </div>
    </div>
  `;

  const caret = root.ownerDocument.createElement('span');
  caret.className = 'sp-caret';
  caret.dataset.part = 'caret';
  caret.setAttribute('aria-hidden', 'true');
  caret.style.marginLeft = '1px';

  const where = part(root, 'where');
  const state = new Map(RUNS.map((run) => [run.key, { bold: run.bold, italic: run.italic, strike: run.strike }]));
  let at = RUNS[0]?.key ?? 'intro';

  const paint = () => {
    for (const run of RUNS) {
      const marks = state.get(run.key);
      if (!marks) continue;
      const line = part(root, `run-${run.key}`);
      const text = part(root, `text-${run.key}`);
      for (const format of FORMATS) flag(line, `data-${format.key}`, marks[format.key]);
      text.style.fontWeight = marks.bold ? '700' : '400';
      text.style.fontStyle = marks.italic ? 'italic' : 'normal';
      text.style.textDecoration = marks.strike ? 'line-through' : 'none';
      line.style.background = run.key === at ? 'var(--sp-sunken)' : 'transparent';
    }
    // The whole point of the strip: what it shows is read off the caret's run, never
    // remembered from the last press.
    const here = state.get(at);
    for (const format of FORMATS) {
      const button = part(root, `fmt-${format.key}`);
      const on = here?.[format.key] === true;
      button.setAttribute('aria-pressed', String(on));
      flag(button, 'data-selected', on);
    }
    const index = RUNS.findIndex((run) => run.key === at) + 1;
    where.dataset.run = at;
    where.textContent = `Caret in line ${index}. The strip reads it.`;
  };

  const placeCaret = (key: string) => {
    at = key;
    part(root, `text-${key}`).after(caret);
    paint();
  };

  for (const run of RUNS) {
    part(root, `run-${run.key}`).addEventListener('click', () => placeCaret(run.key));
  }

  for (const format of FORMATS) {
    part(root, `fmt-${format.key}`).addEventListener('click', () => {
      const marks = state.get(at);
      if (!marks) return;
      marks[format.key] = !marks[format.key];
      paint();
    });
  }

  placeCaret(at);
}
