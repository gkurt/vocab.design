import { part } from '#src/kit/parts.ts';

/*
 * A serif, written as a local stack, because the whole term is the shape of four
 * glyphs and the kit has one sans on purpose (SPEC §5).
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const SENTENCE = `He said "it's fine."`;
const CURLY = /[‘’“”]/;
/** Characters after which a quote is still an opening one. */
const OPENS_AFTER = new Set(['', ' ', '\n', '(', '[', '{']);

/** Curly back to straight, so the raw keystrokes can be recovered from the field. */
function straighten(text: string): string {
  return text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
}

/** What an editor with smart quotes on does to the characters as they land. */
function curlify(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i] ?? '';
    if (char !== '"' && char !== "'") {
      out += char;
      continue;
    }
    const opening = OPENS_AFTER.has(text[i - 1] ?? '');
    if (char === '"') out += opening ? '“' : '”';
    else out += opening ? '‘' : '’';
  }
  return out;
}

function paint(text: string): string {
  return [...text]
    .map((char) => {
      const escaped = char === '&' ? '&amp;' : char === '<' ? '&lt;' : char === '>' ? '&gt;' : char;
      const marked = char === '"' || char === "'" || CURLY.test(char);
      return marked ? `<span style="color: var(--sp-accent)">${escaped}</span>` : escaped;
    })
    .join('');
}

/**
 * Smart quotes specimen: the same sentence twice, once as the keys were pressed
 * and once as an editor with smart quotes on stores it. Typing into the field
 * substitutes each mark the moment its character lands, which is the only way to
 * see that the opening and closing forms are chosen from context rather than
 * looked up.
 *
 * The subject is the curly-quoted line. The straight line is what it is being
 * told apart from, and the field and its Clear control are the demo's own
 * instrumentation, so both stay in the context register (SPEC §5).
 *
 * Both lines are single lines in rows of fixed height, so a sentence growing a
 * character at a time cannot move the caption under it (SPEC §5). The field is
 * re-read on every input event and the pair recomputed from scratch, so one
 * character and a whole pasted string are handled by the same path.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px">
        <div class="sp-row sp-context" style="gap: 8px">
          <span class="sp-grow">
            <input class="sp-input" data-part="editor" type="text" aria-label="Editor with smart quotes on"
                   style="font-family: ${FACE}; font-size: 14px" />
          </span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="clear" type="button">Clear</button>
        </div>
        <div class="sp-stack sp-context" style="gap: 2px; margin-top: 16px">
          <span class="sp-label">keys pressed</span>
          <div class="sp-row" style="height: 30px">
            <span data-part="raw" style="font-family: ${FACE}; font-size: 19px; white-space: nowrap"></span>
          </div>
        </div>
        <div class="sp-stack" style="gap: 2px; margin-top: 10px">
          <span class="sp-label sp-context">what the editor stores</span>
          <div class="sp-row" style="height: 30px">
            <span data-part="stored" data-subject data-quotes="none"
                  style="font-family: ${FACE}; font-size: 19px; white-space: nowrap"></span>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          Four marks, not one: the opening pair leans into the quotation and the closing pair leans out of
          it. The apostrophe is the closing single quote, the same character in a different job.
        </p>
      </div>
    </div>
  `;

  const editor = part(root, 'editor') as HTMLInputElement;
  const raw = part(root, 'raw');
  const stored = part(root, 'stored');

  const render = () => {
    const typed = straighten(editor.value);
    const curly = curlify(typed);
    editor.value = curly;
    raw.innerHTML = paint(typed);
    stored.innerHTML = paint(curly);
    stored.dataset.quotes = CURLY.test(curly) ? 'curly' : 'none';
  };

  editor.addEventListener('input', render);
  part(root, 'clear').addEventListener('click', () => {
    editor.value = '';
    render();
  });

  editor.value = SENTENCE;
  render();
}
