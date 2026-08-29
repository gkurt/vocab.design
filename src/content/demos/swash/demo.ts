import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The letters are drawn here rather than set in a face. Checked against the files
 * this site actually loads: neither Geist Variable nor Source Serif 4 Variable
 * carries a swash table, and asking for `"swsh" 1` where there is none changes
 * nothing at all. A specimen of a feature failing silently would be a specimen of
 * the wrong term, so the swashed cuts are built the way a swash is built, by
 * carrying the exit stroke on past where the letter needed it.
 */
/** Cap line 24, baseline 86, so the capitals stand 62 units tall. */
const STROKE = 6;

/** The word's own coordinate space, wide enough on the right for the K's swash. */
const BOARD = { w: 410, h: 122 };
/** Drawn width of the word, and the same Q beside it at about half again the size. */
const WORD_W = 306;
const DETAIL = { view: '2 20 144 96', w: 150, h: 100 };

type Cut = 'plain' | 'swash';

/** Q: one ring and one tail, and the tail is the whole term. */
function letterQ(cut: Cut): string {
  const ring = 'M 11 55 a 28 28 0 1 0 56 0 a 28 28 0 1 0 -56 0';
  const tail = cut === 'swash' ? 'M 47 69 C 64 104, 112 110, 140 78' : 'M 47 69 L 68 94';
  return `${ring} ${tail}`;
}

/** R: stem, bowl, and a leg that either lands or keeps going. */
function letterR(cut: Cut): string {
  const body = 'M 220 24 V 86 M 220 24 H 244 A 16 16 0 0 1 244 56 H 220';
  const leg = cut === 'swash' ? 'M 240 56 C 256 78, 264 104, 300 98' : 'M 240 56 L 262 86';
  return `${body} ${leg}`;
}

/** K: stem and arm are fixed; the lower diagonal is the one that flies. */
function letterK(cut: Cut): string {
  const body = 'M 288 24 V 86 M 328 24 L 294 55';
  const leg = cut === 'swash' ? 'M 302 47 C 322 68, 344 102, 396 80' : 'M 302 47 L 334 86';
  return `${body} ${leg}`;
}

/** U and A carry no swash form in this cut, so they are drawn once. */
const LETTER_U = 'M 86 24 V 65 A 21 21 0 0 0 128 65 V 24';
const LETTER_A = 'M 148 86 L 175 24 L 202 86 M 159 63 H 191';

/** Which capitals take their swash form at each setting. */
const MODES: Record<string, { q: Cut; r: Cut; k: Cut; read: string }> = {
  off: { q: 'plain', r: 'plain', k: 'plain', read: '"swsh" 0: the ordinary drawings' },
  initial: { q: 'swash', r: 'plain', k: 'plain', read: '"swsh" 1 on the first capital only' },
  every: { q: 'swash', r: 'swash', k: 'swash', read: '"swsh" 1 on every capital in the word' },
};

/**
 * Swash specimen: one display word whose capitals are redrawn with their exit
 * strokes carried on, at three settings. Nothing else about the letters moves:
 * the ring of the Q, the bowl of the R and the arm of the K are the same paths at
 * every setting, so the only variable is where the stroke stops. The detail
 * beside the word enlarges the one junction that decides it.
 *
 * The subject is the drawn line, which is what the term names. The setting that
 * takes the flourishes away is the reference rather than the term, so the honest
 * condition is declared in `data-pose` and the specimen mounts swashed (SPEC §6).
 * The picker, the detail and the caption are the demo's own instrumentation and
 * stay in the context register (SPEC §5). Both drawings sit in fixed boxes, so a
 * stroke growing by ninety units moves nothing on the page (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const ink = `fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Swash forms" data-part="segmented" data-value="initial">
            <button class="sp-segment" data-part="seg-off" value="off">off</button>
            <button class="sp-segment" data-part="seg-initial" value="initial">initial</button>
            <button class="sp-segment" data-part="seg-every" value="every">every</button>
          </sp-segmented>
        </div>
        <svg data-part="line" data-subject data-mode="initial" data-swashed data-pose="[data-swashed]"
             viewBox="0 0 ${BOARD.w} ${BOARD.h}" width="${WORD_W}" height="${Math.round((WORD_W * BOARD.h) / BOARD.w)}"
             role="img" aria-label="The word QUARK drawn with swash capitals"
             style="display: block; margin-top: 6px">
          <path data-part="glyph-q" ${ink} d=""></path>
          <path ${ink} d="${LETTER_U}"></path>
          <path ${ink} d="${LETTER_A}"></path>
          <path data-part="glyph-r" ${ink} d=""></path>
          <path data-part="glyph-k" ${ink} d=""></path>
        </svg>
        <div class="sp-row sp-context" style="gap: 14px; align-items: flex-start; margin-top: 4px">
          <svg data-part="detail" viewBox="${DETAIL.view}" width="${DETAIL.w}" height="${DETAIL.h}"
               aria-hidden="true" style="flex: 0 0 auto; display: block">
            <path data-part="glyph-detail" ${ink} d=""></path>
          </svg>
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label" data-part="read" style="color: var(--sp-ink)"></span>
            <p class="sp-text" data-stage-verdict data-part="caption" style="margin: 0">
              The ring, the bowl and the arm never change. A swash is the same letter with its exit
              stroke carried on, so it needs room to travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const line = part(root, 'line');
  const glyphQ = part(root, 'glyph-q');
  const glyphR = part(root, 'glyph-r');
  const glyphK = part(root, 'glyph-k');
  const detail = part(root, 'glyph-detail');
  const read = part(root, 'read');

  const apply = (value: string) => {
    const mode = MODES[value];
    if (!mode) return;
    line.dataset.mode = value;
    flag(line, 'data-swashed', value !== 'off');
    glyphQ.setAttribute('d', letterQ(mode.q));
    glyphR.setAttribute('d', letterR(mode.r));
    glyphK.setAttribute('d', letterK(mode.k));
    detail.setAttribute('d', letterQ(mode.q));
    read.textContent = mode.read;
  };

  apply('initial');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
