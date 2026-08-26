import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; line-height: 19px';

/**
 * The theme is the term's own claim, so it is stated here rather than taken from the kit,
 * which has one accent on purpose (SPEC §5). Every hue sits at roughly the same luminance,
 * mid-way between the light surface and the dark one, so one set reads on both themes;
 * comments borrow the kit's muted ink, which already answers the theme.
 */
const HUE = {
  com: 'var(--sp-muted)',
  key: '#9163d8',
  str: '#1f9b8e',
  num: '#b07a1e',
  fn: '#3f7fe0',
  param: '#4f9b3d',
  txt: 'var(--sp-ink)',
};

/** The non-colour half of a theme: comments slant, keywords take weight (SPEC §2.4 prose). */
const SLANT: Partial<Record<keyof typeof HUE, string>> = { com: 'font-style: italic', key: 'font-weight: 700' };

type Kind = keyof typeof HUE;
/** [text, lexical class, semantic class]: the third is what the resolver knows and the grammar cannot. */
type Token = [string, Kind, Kind?];

const LINES: Token[][] = [
  [['// only the rows that cleared the floor', 'com']],
  [
    ['export', 'key'],
    [' ', 'txt'],
    ['function', 'key'],
    [' ', 'txt'],
    ['passing', 'fn'],
    ['(', 'txt'],
    ['rows', 'txt', 'param'],
    [', ', 'txt'],
    ['floor', 'txt', 'param'],
    [') {', 'txt'],
  ],
  [
    ['  ', 'txt'],
    ['const', 'key'],
    [' kept = ', 'txt'],
    ['rows', 'txt', 'param'],
    ['.filter((', 'txt'],
    ['r', 'txt', 'param'],
    [') => ', 'txt'],
    ['r', 'txt', 'param'],
    ['.score >= ', 'txt'],
    ['floor', 'txt', 'param'],
    [')', 'txt'],
  ],
  [
    ['  ', 'txt'],
    ['const', 'key'],
    [' note = ', 'txt'],
    ["'nothing dropped'", 'str'],
  ],
  [
    ['  ', 'txt'],
    ['if', 'key'],
    [' (kept.length === ', 'txt'],
    ['0', 'num'],
    [') ', 'txt'],
    ['return', 'key'],
    [' ', 'txt'],
    ['null', 'key'],
  ],
  [
    ['  ', 'txt'],
    ['return', 'key'],
    [' { kept, note }', 'txt'],
  ],
  [['}', 'txt']],
];

/** The one string literal in the file: the subject, and the class whose colour is easiest to read. */
const SUBJECT = { line: 3, index: 3 };
/** The first parameter in the body: plain to the grammar, a parameter to the resolver. */
const WATCHED = { line: 2, index: 3 };

const NOTES: Record<string, string> = {
  plain: 'No pass. One colour for every run, so the shape has to be read rather than seen.',
  syntax: 'Lexical pass. A grammar of patterns splits the line into keyword, string, number and name.',
  semantic: 'Semantic pass. A resolver re-colours the names it knows. Here, the parameters.',
};

const START = 'syntax';

/**
 * Syntax highlighting specimen: seven lines of the same file rendered by three passes, in a
 * bare code block rather than an editor, which is the fence the term needs (a code editor is
 * the widget, this is the convention, and it runs in docs, terminals and diffs where no
 * editor exists). Plain shows what the colour buys. Lexical colours by token class. Semantic
 * asks a resolver what the bare names are and re-colours the parameters, which is the demo's
 * own claim that the second pass may overrule the first.
 *
 * The subject is ONE token run, the string literal on line four, rather than the block: a
 * coloured block is not the term, the encoding is, and the narrowest element carrying an
 * encoding is a single classified run (SPEC §5). Plain is a state the subject itself passes
 * through and an uncoloured run is not the term, so the honest condition is declared in
 * `data-pose` and the mount state satisfies it (SPEC §6).
 *
 * Weight and slant land only where colour does, and the block is monospaced, so a bold
 * keyword takes exactly the advance its plain form did and no line reflows between passes
 * (SPEC §5). The readout keeps a fixed two-line box for the same reason.
 */
export function mount(root: HTMLElement): void {
  const cell = (token: Token, line: number, index: number) => {
    const attrs: string[] = [];
    if (line === SUBJECT.line && index === SUBJECT.index) attrs.push('data-part="tok-string" data-subject data-pose="[data-lit]"');
    if (line === WATCHED.line && index === WATCHED.index) attrs.push('data-part="tok-name" data-role="name"');
    return `<span ${attrs.join(' ')} data-kind="${token[1]}" data-semantic="${token[2] ?? token[1]}">${token[0]}</span>`;
  };

  const code = LINES.map(
    (tokens, line) => `<div style="white-space: pre">${tokens.map((token, index) => cell(token, line, index)).join('')}</div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-stack" style="width: 468px; gap: 9px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="color: var(--sp-ink)">Seven lines, three passes</span>
          <sp-segmented class="sp-segmented" data-part="pass" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain" style="font-size: 11px; padding: 4px 11px">plain</button>
            <button class="sp-segment" type="button" data-part="seg-syntax" value="syntax" style="font-size: 11px; padding: 4px 11px">lexical</button>
            <button class="sp-segment" type="button" data-part="seg-semantic" value="semantic" style="font-size: 11px; padding: 4px 11px">semantic</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="code" data-mode="${START}"
             style="padding: 11px 14px; background: var(--sp-sunken); ${MONO}; color: var(--sp-ink)">${code}</div>

        <div class="sp-stack sp-context" style="gap: 2px; height: 32px">
          <span class="sp-label" style="font-size: 10px">What the colour came from</span>
          <span class="sp-text sp-text--ink" data-part="note" data-mode="${START}" style="font-size: 11px; line-height: 15px"></span>
        </div>
      </div>
    </div>
  `;

  const code_ = part(root, 'code');
  const note = part(root, 'note');
  const subject = part(root, 'tok-string');
  const watched = part(root, 'tok-name');
  const spans = [...code_.querySelectorAll<HTMLElement>('span[data-kind]')];

  const show = (mode: string) => {
    for (const span of spans) {
      const kind = (mode === 'semantic' ? span.dataset.semantic : span.dataset.kind) as Kind;
      const paint = mode === 'plain' ? 'txt' : kind;
      span.style.cssText = `color: ${HUE[paint]}; ${mode === 'plain' ? '' : (SLANT[paint] ?? '')}`;
    }
    flag(subject, 'data-lit', mode !== 'plain');
    watched.dataset.role = mode === 'semantic' ? 'param' : 'name';
    code_.dataset.mode = mode;
    note.dataset.mode = mode;
    note.textContent = NOTES[mode] ?? '';
  };

  show(START);

  part(root, 'pass').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail);
  });
}
