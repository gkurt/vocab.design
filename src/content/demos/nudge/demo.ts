import { flag, part, partsOf } from '#src/kit/parts.ts';

/** The canvas the card is nudged around, and the two steps the arrows move by. */
const CANVAS = { w: 320, h: 150 };
const CARD = { w: 96, h: 54 };
const START = { x: 40, y: 32 };
const SMALL = 1;
const BIG = 10;

const MAX = { x: CANVAS.w - CARD.w, y: CANVAS.h - CARD.h };

const AXIS: Record<string, { axis: 'x' | 'y'; sign: number }> = {
  ArrowLeft: { axis: 'x', sign: -1 },
  ArrowRight: { axis: 'x', sign: 1 },
  ArrowUp: { axis: 'y', sign: -1 },
  ArrowDown: { axis: 'y', sign: 1 },
};

const HANDLE = 'position: absolute; width: 6px; height: 6px; background: var(--sp-accent); border-radius: 1px; opacity: 0';

const handles = ['left: -3px; top: -3px', 'right: -3px; top: -3px', 'left: -3px; bottom: -3px', 'right: -3px; bottom: -3px']
  .map((at) => `<span data-part="handle" style="${HANDLE}; ${at}"></span>`)
  .join('');

/**
 * Nudge specimen: a selected card on a small canvas that moves one pixel per arrow press
 * and ten with Shift held. The subject is the card, since the term names what the arrow
 * does to the selected object rather than the canvas it does it on; the grid, the legend,
 * and the step readout are the apparatus around it.
 *
 * One wiring answers everything: the big step is read as `shiftKey` off the arrow's own
 * keydown, the script performs the held key with a `withKey` Shift scope (SPEC §8), and a
 * reader who takes the stage over holds the real key. The canvas carries `tabindex="0"`
 * so a reader's keys can reach the demo at all, which is where focus belongs in an editor
 * anyway: the canvas is focused and the arrows move whatever is selected on it. A held key
 * is invisible, so the legend chip lights from the same keydown and keyup either way,
 * scripted or real.
 *
 * The card moves by a transform inside a fixed canvas and every readout holds its width,
 * so a nudge moves the card and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Poster</span>
          <span
            class="sp-text"
            data-part="readout"
            data-size="${SMALL}"
            style="width: 226px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums"
          >Select the card to nudge it</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="canvas"
            tabindex="0"
            role="group"
            aria-label="Poster canvas"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; border: 1px solid var(--sp-line); border-radius: 6px; background-color: var(--sp-surface); background-image: radial-gradient(var(--sp-line) 1px, transparent 1px); background-size: 10px 10px; background-position: -1px -1px"
          >
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-x="${START.x}"
              data-y="${START.y}"
              style="position: absolute; left: 0; top: 0; width: ${CARD.w}px; height: ${CARD.h}px; padding: 8px 10px; transform: translate(${START.x}px, ${START.y}px); transition: transform 0.08s linear; cursor: default; user-select: none"
            >
              <span class="sp-heading" style="font-size: 12px">Headline</span>
              <span class="sp-line" style="display: block; width: 60%; margin-top: 7px"></span>
              ${handles}
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="width: 100%">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-kbd">Arrow</span>
              <span class="sp-label">${SMALL} px</span>
              <span class="sp-kbd" data-part="key-shift" style="margin-left: 8px">Shift</span>
              <span class="sp-kbd">Arrow</span>
              <span class="sp-label">${BIG} px</span>
            </span>
            <span class="sp-label" data-part="step" style="width: 92px; text-align: right; font-variant-numeric: tabular-nums">Step ${SMALL} px</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const readout = part(root, 'readout');
  const stepOut = part(root, 'step');
  const shiftKey = part(root, 'key-shift');
  const at = { ...START };
  let selected = false;
  let shifted = false;

  const draw = () => {
    card.style.transform = `translate(${at.x}px, ${at.y}px)`;
    card.dataset.x = String(at.x);
    card.dataset.y = String(at.y);
    const step = shifted ? BIG : SMALL;
    readout.dataset.size = String(step);
    readout.textContent = selected ? `x ${at.x}, y ${at.y} · step ${step} px` : 'Select the card to nudge it';
    stepOut.textContent = `Step ${step} px`;
  };

  const showHandles = (on: boolean) => {
    for (const handle of partsOf(root, 'handle')) handle.style.opacity = on ? '1' : '0';
  };

  // Selection is reached, never flipped: a click always selects (SPEC §8).
  const select = () => {
    selected = true;
    flag(card, 'data-selected', true);
    card.style.boxShadow = '0 0 0 1.5px var(--sp-accent)';
    showHandles(true);
    draw();
  };

  card.addEventListener('click', select);
  card.addEventListener('pointerdown', select);

  // A held key is invisible, so the legend answers the real one: the chip lights while
  // Shift is down and goes out when it is released.
  const lightShift = (on: boolean) => {
    shifted = on;
    shiftKey.style.borderColor = on ? 'var(--sp-accent)' : '';
    shiftKey.style.color = on ? 'var(--sp-ink)' : '';
    flag(shiftKey, 'data-held', on);
    draw();
  };

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') lightShift(true);
    const move = AXIS[event.key];
    if (!move || !selected) return;
    event.preventDefault();
    // The key's own flag decides the step, so the scripted `withKey` scope and a reader's
    // thumb on Shift go through one path.
    const next = at[move.axis] + move.sign * (event.shiftKey ? BIG : SMALL);
    at[move.axis] = Math.max(0, Math.min(MAX[move.axis], next));
    draw();
  });

  root.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') lightShift(false);
  });

  draw();
}
