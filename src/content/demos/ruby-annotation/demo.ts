import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A real CJK stack rather than the kit sans, which carries no kanji at all. The
 * annotated run is one compound so the specimen has exactly one subject; the kana
 * around it need no reading, which is also how furigana is used in practice.
 */
const CJK = "'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, 'MS Gothic', sans-serif";

const LEAD = 'この';
const TAIL = 'はしずかです。';
const COMPOUND = '図書館';
const READING = 'としょかん';
/** The compound split the way mono ruby splits it, and whole the way group ruby takes it. */
const MONO: [string, string][] = [
  ['図', 'と'],
  ['書', 'しょ'],
  ['館', 'かん'],
];
const GROUP: [string, string][] = [[COMPOUND, READING]];

const READS: Record<string, string> = {
  off: 'no annotation: the reader is on their own',
  mono: 'mono ruby: one reading per character',
  group: 'group ruby: one reading for the compound',
  fallback: 'no ruby support: the rp parentheses show instead',
};

/** Room for the tallest line box, held at every setting, so nothing moves (SPEC §5). */
const RUN_H = 66;
const SIZE = 27;

/** The run's markup at one setting. `rp` carries the parentheses, which is the fallback. */
function runMarkup(mode: string): string {
  if (mode === 'off') return COMPOUND;
  const pairs = mode === 'mono' ? MONO : GROUP;
  const rt = mode === 'fallback' ? 'display: none' : 'font-size: 0.5em';
  const rp = mode === 'fallback' ? 'display: inline; font-size: 0.62em' : 'display: none';
  return pairs
    .map(([base, reading]) => `${base}<rp style="${rp}">(</rp><rt style="${rt}">${reading}</rt><rp style="${rp}">)</rp>`)
    .join('');
}

/**
 * Ruby annotation specimen: one Japanese line whose single kanji compound carries
 * a reading, shown with the reading split per character, taken as one group,
 * removed, and rendered the way a browser with no ruby support renders it. The
 * markup is real `ruby`, `rt` and `rp`, so the parenthesis state is the actual
 * fallback rather than a drawing of it.
 *
 * The annotation is a second line inside the line box, so the line genuinely grows.
 * The row holds the tallest arrangement and the sentence is set against its bottom
 * edge, which keeps the base text on one baseline at every setting and moves
 * nothing else on the page (SPEC §5).
 *
 * The subject is the annotated run. The setting that takes the annotation away is
 * the reference rather than the term, so the honest condition is declared in
 * `data-pose` and the specimen mounts annotated (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Ruby" data-part="segmented" data-value="mono">
            <button class="sp-segment" data-part="seg-off" value="off">off</button>
            <button class="sp-segment" data-part="seg-mono" value="mono">mono</button>
            <button class="sp-segment" data-part="seg-group" value="group">group</button>
            <button class="sp-segment" data-part="seg-fallback" value="fallback">fallback</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="line" style="align-items: flex-end; height: ${RUN_H}px; margin-top: 10px">
          <p data-part="sentence" data-mode="mono"
             style="margin: 0; font-family: ${CJK}; font-size: ${SIZE}px; line-height: normal"><span
             class="sp-context">${LEAD}</span><span data-part="run" data-subject data-annotated
             data-pose="[data-annotated]" style="display: inline-block"><ruby data-part="ruby"></ruby></span><span
             class="sp-context">${TAIL}</span></p>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="gap: 8px; height: 24px; margin-top: 8px">
          <span class="sp-chip" data-part="read" style="cursor: default"></span>
          <span class="sp-label" data-part="gloss">toshokan, "library"</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          Ruby is a reading aid with a fallback, not decoration. The rp elements hold parentheses that
          stay hidden wherever ruby renders, and read as ordinary text wherever it does not.
        </p>
      </div>
    </div>
  `;

  const sentence = part(root, 'sentence');
  const run = part(root, 'run');
  const ruby = part(root, 'ruby');
  const read = part(root, 'read');

  const apply = (value: string) => {
    const note = READS[value];
    if (!note) return;
    sentence.dataset.mode = value;
    ruby.innerHTML = runMarkup(value);
    flag(run, 'data-annotated', value !== 'off');
    read.textContent = note;
  };

  apply('mono');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
