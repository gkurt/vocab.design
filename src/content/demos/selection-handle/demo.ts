import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const WORDS =
  'Every workspace starts on the free tier, and the plans page compares what each tier includes before you upgrade from billing settings.'.split(
    ' ',
  );

/** The words the selection covers when the specimen mounts, chosen off the first line. */
const START = 8;
const END = 10;

/** The grip's own box: a ball on a bar, inside a target three times its width. */
const GRIP_W = 28;
const GRIP_H = 40;

const grip = (edge: 'start' | 'end') => `
  <button
    type="button"
    data-part="handle-${edge}"
    data-edge="${edge}"
    ${edge === 'end' ? 'data-subject' : ''}
    style="position: absolute; left: 0; top: 0; width: ${GRIP_W}px; height: ${GRIP_H}px; padding: 0; border: 0; background: transparent; cursor: ew-resize; touch-action: none"
  >
    <span style="position: absolute; left: 13px; top: 8px; width: 2px; height: 24px; background: var(--sp-accent)"></span>
    <span
      style="position: absolute; left: 8px; top: ${edge === 'start' ? 0 : 28}px; width: 12px; height: 12px; border-radius: 50%; background: var(--sp-accent)"
    ></span>
  </button>`;

/**
 * Selection handle specimen: a paragraph with a range painted across it and a grip at each
 * end, either of which can be dragged to move that end word by word. The words are laid out
 * as a wrapping row of spans that carry their own trailing gap, so a painted run reads as
 * one continuous highlight rather than as striped words, and the grips are placed from the
 * measured rectangles of the two edge words.
 *
 * The subject is the end grip. The term names one draggable grip, not the selection it
 * bounds and not the paragraph under it, and the grip's box is deliberately far larger than
 * the ball drawn inside it, so identify rings the target rather than the artwork. The
 * paragraph and the word count are the scene and stay in the context register.
 *
 * A loupe used to be drawn beside the count, as a still, under the sentence "A loupe rides
 * above the grip while it moves, because the finger is covering the boundary it is setting.
 * Drawn here as a still." That is the site explaining a second convention inside a notes
 * app, and the still exhibit means nothing once the sentence goes, so both went and the
 * frame lost the height they took. The status line reads as a notes app's would at rest
 * ("Edited 4 minutes ago") instead of telling the reader to drag something.
 *
 * A drag resolves to the nearest word by geometry rather than by hit testing, so a grip that
 * has moved under the pointer can never swallow its own drop. Nothing about a word changes
 * size when it joins the range, so painting a selection moves no text (SPEC §5), and the
 * grips are absolutely placed over the paragraph rather than inside its flow.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const words = WORDS.map(
    (word, i) => `
      <span
        data-part="word-${i}"
        data-index="${i}"
        style="padding: 2px 4px 2px 0; border-radius: 3px"
      >${word}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 225px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-text" data-part="readout" style="width: 272px; text-align: right; white-space: nowrap">Edited 4 minutes ago</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="page" style="position: relative; height: 122px; padding: 18px 14px">
            <div
              class="sp-context"
              data-part="text"
              style="display: flex; flex-wrap: wrap; row-gap: 4px; width: 340px; margin: 0 auto; font-size: 13px; line-height: 1.55; user-select: none"
            >${words}</div>
            ${grip('start')}${grip('end')}
          </div>
          <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
            <span class="sp-label" data-part="count" style="width: 96px; text-align: right">3 words</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const readout = part(root, 'readout');
  const count = part(root, 'count');
  const handles = { start: part(root, 'handle-start'), end: part(root, 'handle-end') };
  const words_ = WORDS.map((_, i) => part(root, `word-${i}`));

  let start = START;
  let end = END;
  let dragging: 'start' | 'end' | null = null;

  const say = (text: string) => {
    readout.textContent = text;
  };

  /** Paint the range, then stand each grip on the edge of the word it bounds. */
  const draw = () => {
    for (const [i, word] of words_.entries()) {
      const inside = i >= start && i <= end;
      flag(word, 'data-selected', inside);
      word.style.background = inside ? 'var(--sp-accent-soft)' : '';
    }
    const headEl = words_[start];
    const tailEl = words_[end];
    const head = headEl && localBox(headEl, page);
    const tail = tailEl && localBox(tailEl, page);
    if (head) {
      handles.start.style.left = `${head.left - GRIP_W / 2}px`;
      handles.start.style.top = `${head.top + head.height / 2 - GRIP_H / 2}px`;
    }
    if (tail) {
      handles.end.style.left = `${tail.left + tail.width - 4 - GRIP_W / 2}px`;
      handles.end.style.top = `${tail.top + tail.height / 2 - GRIP_H / 2}px`;
    }
    const span = end - start + 1;
    count.textContent = `${span} word${span === 1 ? '' : 's'}`;
    page.dataset.from = String(start);
    page.dataset.to = String(end);
  };

  /** The word nearest a point, measured against the word boxes rather than hit tested. */
  const wordAt = (x: number, y: number) => {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const [i, word] of words_.entries()) {
      const r = word.getBoundingClientRect();
      const dx = Math.max(r.left - x, 0, x - r.right);
      const dy = Math.max(r.top - y, 0, y - r.bottom);
      const distance = dx * dx + dy * dy;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }
    return best;
  };

  const moveEdge = (edge: 'start' | 'end', index: number) => {
    if (edge === 'start') start = Math.min(index, end);
    else end = Math.max(index, start);
    draw();
    say(`${edge === 'start' ? 'Start' : 'End'} grip on ${WORDS[edge === 'start' ? start : end]}`);
  };

  for (const edge of ['start', 'end'] as const) {
    handles[edge].addEventListener('pointerdown', (event) => {
      event.preventDefault();
      // The grip is dragged across a paragraph far wider than itself, so it captures the
      // pointer: uncaptured, the moves stop as soon as the drag leaves the grip's own box and
      // the drop lands on a word it never reached. Synthesized pointers cannot be captured.
      if (event.isTrusted) handles[edge].setPointerCapture(event.pointerId);
      dragging = edge;
      flag(page, 'data-dragging', true);
      say(`Holding the ${edge} grip`);
    });
  }

  root.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    moveEdge(dragging, wordAt(event.clientX, event.clientY));
  });

  const drop = (event: PointerEvent) => {
    if (!dragging) return;
    const edge = dragging;
    dragging = null;
    flag(page, 'data-dragging', false);
    moveEdge(edge, wordAt(event.clientX, event.clientY));
    const span = end - start + 1;
    say(`${span} word${span === 1 ? '' : 's'} selected: ${WORDS[start]} to ${WORDS[end]}`);
  };

  root.addEventListener('pointerup', drop);
  root.addEventListener('pointercancel', drop);

  draw();
  // The kit's typeface can arrive after the first paint, which would leave two grips
  // standing where the words used to be. One beat on the stage's clock puts them back.
  clock.setTimeout(draw, 90);
}
