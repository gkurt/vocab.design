import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** The divider stops short of both labels, so neither ever sits over the wrong half. */
const MIN = 16;
const MAX = 84;
const START = 50;
const STEP = 4;

type Palette = { sky: string; sun: string; glow: string; hill: string; ridge: string; sea: string };

const GRADED: Palette = {
  sky: 'linear-gradient(180deg, #ffdca8 0%, #ffab6b 46%, #ef7360 68%)',
  sun: '#fff6d5',
  glow: 'rgb(255 208 106 / 0.55)',
  hill: '#7b3f52',
  ridge: '#54304a',
  sea: 'linear-gradient(180deg, #2d7290 0%, #123c58 100%)',
};

const FLAT: Palette = {
  sky: 'linear-gradient(180deg, #cdd0d6 0%, #adb1b8 46%, #90949c 68%)',
  sun: '#e6e8ec',
  glow: 'rgb(220 222 226 / 0.5)',
  hill: '#5f636b',
  ridge: '#4b4f57',
  sea: 'linear-gradient(180deg, #787d86 0%, #555a63 100%)',
};

/** The same headland twice, in two grades, drawn at identical geometry on purpose. */
const scene = (key: string, p: Palette, extra: string) => `
  <div data-part="scene-${key}" style="position: absolute; inset: 0; background: ${p.sky}; ${extra}">
    <div style="position: absolute; left: 62%; top: 14%; width: 46px; height: 46px; border-radius: 50%; background: ${p.sun}; box-shadow: 0 0 24px 9px ${p.glow}"></div>
    <div style="position: absolute; left: -8%; bottom: 34%; width: 58%; height: 32%; border-radius: 50% 50% 0 0; background: ${p.hill}"></div>
    <div style="position: absolute; left: 36%; bottom: 34%; width: 50%; height: 24%; border-radius: 50% 50% 0 0; background: ${p.ridge}"></div>
    <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 34%; background: ${p.sea}"></div>
  </div>`;

const chip = (key: string, text: string, side: string) => `
  <span
    data-part="chip-${key}"
    style="position: absolute; ${side}; bottom: 10px; padding: 3px 9px; border-radius: 999px;
           background: rgb(16 24 40 / 0.55); color: #ffffff; font-size: 11px; font-weight: 500; letter-spacing: 0.02em"
  >${text}</span>`;

/**
 * Image comparison slider specimen: one headland in two grades, stacked in a single
 * frame with a divider that wipes between them. The subject is the comparison frame,
 * the narrowest element the term names: the divider alone is a splitter, and either
 * scene alone is a picture.
 *
 * Two scenes are painted rather than loaded, since the specimen has no network
 * (SPEC §5), and both are drawn at identical geometry, because pixels landing in the
 * same place is the entire argument for this control over two pictures side by side.
 *
 * A caption under the frame read "Drag the divider, or nudge it with the arrow keys.", an
 * instruction to the reader dressed as the product's own copy. Nothing about it changed with
 * the control, so it was never a verdict, and the handle and the two chips say what the frame
 * is for without it. The percentage readout beside it stays: it is the control's own value.
 *
 * Every gesture reaches an absolute position (SPEC §8): a drag past either label lands
 * exactly on that limit, and the arrow keys move whole steps from wherever the drag
 * left the divider. Nothing transitions, because a divider that eases is a divider
 * lagging the pointer, and nothing outside the frame moves at all: the wipe happens
 * inside a box that keeps its size (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-stack" style="gap: 10px">
        <div
          data-part="frame"
          data-subject
          style="position: relative; width: 430px; height: 186px; border: 1px solid var(--sp-line);
                 border-radius: var(--sp-radius); overflow: hidden; touch-action: none"
        >
          ${scene('after', GRADED, '')}
          ${scene('before', FLAT, `clip-path: inset(0 ${100 - START}% 0 0)`)}
          ${chip('before', 'Before', 'left: 10px')}
          ${chip('after', 'After', 'right: 10px')}
          <div
            data-part="divider"
            role="slider"
            tabindex="0"
            aria-label="Reveal the original"
            aria-valuemin="${MIN}"
            aria-valuemax="${MAX}"
            aria-valuenow="${START}"
            data-at="${START}"
            style="position: absolute; top: 0; bottom: 0; left: ${START}%; width: 2px; margin-left: -1px;
                   background: #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.28); cursor: col-resize"
          >
            <span
              data-part="handle"
              style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; display: flex; align-items: center;
                     justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: #ffffff;
                     color: #23262b; box-shadow: 0 1px 5px rgb(16 24 40 / 0.4); cursor: col-resize"
            ><span style="display: flex; margin: 0 -4px">${icon('chevronLeft')}</span><span style="display: flex; margin: 0 -4px">${icon('chevronRight')}</span></span>
          </div>
        </div>
        <div class="sp-row sp-context" style="width: 430px; justify-content: flex-end">
          <span class="sp-label" data-part="readout" style="width: 80px; text-align: right; font-variant-numeric: tabular-nums">Original ${START}%</span>
        </div>
      </div>
    </div>
  `;

  const frame = part(root, 'frame');
  const divider = part(root, 'divider');
  const before = part(root, 'scene-before');
  const readout = part(root, 'readout');

  let at = START;
  /** Pointer-to-divider distance, so the wipe never jumps to the pointer on press. */
  let grabbed: number | undefined;

  const set = (next: number) => {
    at = Math.round(Math.min(MAX, Math.max(MIN, next)));
    divider.style.left = `${at}%`;
    divider.dataset.at = String(at);
    divider.setAttribute('aria-valuenow', String(at));
    divider.setAttribute('aria-valuetext', `Original ${at} percent`);
    before.style.clipPath = `inset(0 ${100 - at}% 0 0)`;
    readout.textContent = `Original ${at}%`;
  };

  divider.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) divider.setPointerCapture(event.pointerId);
    const rect = divider.getBoundingClientRect();
    grabbed = event.clientX - (rect.left + rect.width / 2);
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    set(((event.clientX - grabbed - rect.left) / rect.width) * 100);
  });

  const release = () => {
    grabbed = undefined;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // A comparison only a mouse can make is a comparison half the readers never see.
  divider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') set(at + STEP);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') set(at - STEP);
    else if (event.key === 'Home') set(MIN);
    else if (event.key === 'End') set(MAX);
    else return;
    event.preventDefault();
  });

  set(START);
}
