import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const WORDS = ['OSLO', 'LIMA', 'KYIV', 'BALI', 'PISA'];
const CELL = { w: 58, h: 76 };
/** One flap, and the beat the whole board is timed on. */
const STEP_MS = 90;
/** Cells receive their instruction one beat apart, left to right, like a drum taking a command. */
const LEAD_STEPS = 1;
/** A board is black flaps and light characters; the kit has one accent and this is not it. */
const FLAP = '#22252c';
const FLAP_INK = '#f4f5f7';

type Cell = { el: HTMLElement; glyph: HTMLElement; at: number; target: number; wait: number };

/**
 * Split-flap animation specimen: a four character departure board that changes a destination by
 * flipping each cell through every letter between the old value and the new one, cells starting
 * one beat apart from the left. The board is drawn as physical flaps, dark cards with a seam
 * across the middle, because the whole term is an imitation of a mechanism.
 *
 * The subject is one character cell, the narrowest thing the term names: a split flap is a single
 * character's drum, and the board is four of them standing next to each other. The heading, the
 * readout, the Change control and the caption are the scene.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and lands the whole word at once for a reader who asked for less
 * movement: the letters in between were never information. The beat between flaps comes from the
 * stage's clock so a pose stops the board where it stands (SPEC §6), and every cell holds a fixed
 * width and height, so a board mid-flip never reflows the row or the caption under it (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const first = WORDS[0] as string;

  const cellMarkup = (char: string, index: number) => `
    <div
      data-part="cell-${index + 1}"
      ${index === 1 ? 'data-subject' : ''}
      style="position: relative; width: ${CELL.w}px; height: ${CELL.h}px; border-radius: 6px; overflow: hidden;
             background: ${FLAP}; perspective: 240px; display: flex; align-items: center; justify-content: center"
    >
      <span
        data-part="glyph-${index + 1}"
        style="display: block; color: ${FLAP_INK}; font-size: 40px; font-weight: 600; line-height: 1;
               transform-origin: center center; will-change: transform"
      >${char}</span>
      <span
        aria-hidden="true"
        style="position: absolute; left: 0; right: 0; top: 50%; height: 2px; margin-top: -1px; background: rgb(0 0 0 / 0.55)"
      ></span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Departures</span>
          <span class="sp-text" data-part="readout" style="width: 150px; text-align: right; white-space: nowrap">Now showing ${first}</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="change">Change</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row" data-part="board" data-state="settled" style="gap: 6px">
            ${[...first].map((char, i) => cellMarkup(char, i)).join('')}
          </div>
          <span class="sp-label sp-context" style="font-size: 11px">Each cell passes through every letter on the way</span>
        </div>
      </div>
    </div>
  `;

  const board = part(root, 'board');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);
  const cells: Cell[] = [...first].map((char, i) => ({
    el: part(root, `cell-${i + 1}`),
    glyph: part(root, `glyph-${i + 1}`),
    at: ALPHA.indexOf(char),
    target: ALPHA.indexOf(char),
    wait: 0,
  }));

  let word = 0;
  let ticking: number | undefined;

  /**
   * One flap dropping onto the seam: tipped away from the reader and darkened, then falling flat.
   * The tip stops well short of edge-on, because a board whose characters spend most of each beat
   * invisible reads as broken rather than as mechanical, and the flip is over inside the beat so
   * every character it passes through is actually legible.
   */
  const flap = (cell: Cell) => {
    cell.glyph.animate(
      [
        { transform: 'rotateX(-58deg)', filter: 'brightness(0.55)' },
        { transform: 'rotateX(-10deg)', filter: 'brightness(0.92)', offset: 0.5 },
        { transform: 'rotateX(0deg)', filter: 'brightness(1)' },
      ],
      { duration: STEP_MS * 0.7, easing: 'cubic-bezier(0.25, 0.9, 0.35, 1)' },
    );
  };

  const settle = () => {
    board.dataset.state = 'settled';
    readout.textContent = `Now showing ${WORDS[word]}`;
  };

  const tick = () => {
    let busy = false;
    for (const cell of cells) {
      if (cell.wait > 0) {
        cell.wait--;
        busy = true;
        continue;
      }
      if (cell.at === cell.target) continue;
      cell.at = (cell.at + 1) % ALPHA.length;
      cell.glyph.textContent = ALPHA[cell.at] ?? '';
      flap(cell);
      if (cell.at !== cell.target) busy = true;
    }
    ticking = busy ? clock.setTimeout(tick, STEP_MS) : undefined;
    if (!busy) settle();
  };

  const change = () => {
    // A change already under way owns the board: a second instruction mid-flip would leave
    // cells chasing two different words at once.
    if (board.dataset.state === 'flipping') return;
    word = (word + 1) % WORDS.length;
    const next = WORDS[word] as string;

    cells.forEach((cell, i) => {
      cell.target = ALPHA.indexOf(next[i] ?? 'A');
      cell.wait = i * LEAD_STEPS;
    });

    if (reduced) {
      for (const cell of cells) {
        cell.at = cell.target;
        cell.glyph.textContent = ALPHA[cell.at] ?? '';
        cell.wait = 0;
      }
      return settle();
    }

    board.dataset.state = 'flipping';
    readout.textContent = `Flipping to ${next}`;
    clock.clearTimeout(ticking);
    ticking = clock.setTimeout(tick, STEP_MS);
  };

  part(root, 'change').addEventListener('click', change);
}
