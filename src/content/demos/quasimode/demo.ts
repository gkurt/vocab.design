import { part } from '#src/kit/parts.ts';

const CANVAS = { w: 284, h: 172 };
const WORLD = { w: 640, h: 400 };
const START = { x: -140, y: -110 };

/** Anything shorter than this was a tap rather than a hold. */
const TAP_MS = 60;

const NODES = [
  { x: 180, y: 40, w: 104, label: 'Interviews' },
  { x: 340, y: 40, w: 88, label: 'Sign-off' },
  { x: 490, y: 40, w: 92, label: 'Handoff' },
  { x: 150, y: 110, w: 96, label: 'Kickoff' },
  { x: 320, y: 110, w: 86, label: 'Ship it' },
  { x: 470, y: 110, w: 86, label: 'Review' },
  { x: 190, y: 180, w: 100, label: 'Research' },
  { x: 360, y: 180, w: 80, label: 'Notes' },
  { x: 505, y: 180, w: 80, label: 'Retro' },
  { x: 160, y: 244, w: 118, label: 'Wireframes' },
  { x: 340, y: 244, w: 92, label: 'Backlog' },
  { x: 480, y: 244, w: 88, label: 'Launch' },
];

const nodes = NODES.map(
  ({ x, y, w, label }, i) => `
    <span
      class="sp-surface"
      data-part="node-${i}"
      style="position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; padding: 7px 9px; font-size: 11px; box-shadow: var(--sp-shadow)"
    >${label}</span>`,
).join('');

/**
 * A fixed anchor the script aims at, over the canvas and never under the finger. It carries no
 * paint: a drawn mark would annotate the choreography rather than the term (SPEC §5).
 */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    aria-hidden="true"
    style="position: absolute; left: ${x - 7}px; top: ${y - 7}px; width: 14px; height: 14px; pointer-events: none; z-index: 4"
  ></span>`;

/**
 * Quasimode specimen: a board whose canvas means "select" until the space key is held, and
 * means "pan" for exactly as long as it is held. The same drag therefore does two different
 * things, and the mode badge is there on the press and gone on the release.
 *
 * The subject is the canvas: the term names the surface whose meaning is being changed, not
 * the key that changes it and not the window around it. The key, the readouts and the legend
 * are instrumentation in the context register, and the points the script drags between are
 * unpainted anchors.
 *
 * The keyboard wiring is real. `keydown` on space opens the mode and `keyup` closes it, and
 * the demo answers the code spelling as well as the character, which is what a handler for a
 * space bar has to do anyway. A reader who takes the stage over and holds space gets the pan
 * tool for the length of their own hold, and the readout says how long that was.
 *
 * Attract cannot hold a key down: its press step is a keydown and a keyup back to back, which
 * is a tap, and is reported here as one. The hold is therefore reached through a labelled key
 * control whose press opens the mode and whose release closes it, driven by a drag step
 * because a drag is the one thing the player holds down for its whole duration. The control
 * is a stand-in for the physical key and nothing more: it calls the same two functions the
 * real keydown and keyup call.
 *
 * The badge and the marquee are absolutely positioned over a fixed canvas, and the world moves
 * by a transform, so entering and leaving the mode moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 274px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Board</span>
          <span class="sp-text" data-part="readout" style="width: 336px; text-align: right; white-space: nowrap">Nothing held: a drag selects</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 12px">
          <div class="sp-stack" style="gap: 8px">
            <div
              data-part="canvas"
              data-subject
              data-mode="select"
              data-did="none"
              style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface); touch-action: none; user-select: none; cursor: crosshair"
            >
              <div
                data-part="world"
                style="position: absolute; left: 0; top: 0; width: ${WORLD.w}px; height: ${WORLD.h}px; transform: translate(${START.x}px, ${START.y}px); background-image: radial-gradient(var(--sp-line) 1.6px, transparent 1.7px); background-size: 26px 26px"
              >${nodes}</div>

              <span
                data-part="marquee"
                style="position: absolute; left: 0; top: 0; width: 0; height: 0; border: 1px solid var(--sp-accent); background: var(--sp-accent-soft); opacity: 0; visibility: hidden; pointer-events: none; z-index: 3"
              ></span>

              <span
                class="sp-chip"
                data-part="mode-chip"
                style="position: absolute; left: 8px; top: 8px; z-index: 5; cursor: default; background: var(--sp-accent); border-color: var(--sp-accent); color: var(--sp-accent-ink); opacity: 0; visibility: hidden; transition: opacity 0.12s, visibility 0.12s"
              >Pan, while held</span>

              <span style="position: absolute; inset: 0; pointer-events: none">
                ${dot('mark-a', 30, 20)}
                ${dot('mark-b', 196, 150)}
                ${dot('pan-to', 244, 112)}
              </span>
            </div>
            <span class="sp-label sp-context">Drag to marquee. Hold the key and it pans.</span>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px">
            <button
              class="sp-kbd"
              type="button"
              data-part="hold-key"
              style="width: 100%; height: 46px; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer"
            >Space</button>
            <span class="sp-label" style="text-align: center; white-space: nowrap">press and hold</span>
            <div class="sp-divider"></div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Mode</span>
              <span class="sp-heading" data-part="mode-value" style="font-size: 14px">Select</span>
            </div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label" style="white-space: nowrap">Last hold</span>
              <span class="sp-heading" data-part="held-for" style="font-size: 14px; font-variant-numeric: tabular-nums">0 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const world = part(root, 'world');
  const marquee = part(root, 'marquee');
  const chip = part(root, 'mode-chip');
  const key = part(root, 'hold-key');
  const readout = part(root, 'readout');
  const modeValue = part(root, 'mode-value');
  const heldFor = part(root, 'held-for');

  let held = false;
  let byKeyControl = false;
  let heldSince = 0;
  let panning: { x: number; y: number; ox: number; oy: number } | undefined;
  let picking: { x: number; y: number } | undefined;
  let at = { x: START.x, y: START.y };

  const report = (text: string) => {
    readout.textContent = text;
  };

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  const place = (x: number, y: number) => {
    at = {
      x: Math.max(CANVAS.w - WORLD.w, Math.min(0, x)),
      y: Math.max(CANVAS.h - WORLD.h, Math.min(0, y)),
    };
    world.style.transform = `translate(${at.x}px, ${at.y}px)`;
  };

  const enterMode = () => {
    if (held) return;
    held = true;
    heldSince = performance.now();
    canvas.dataset.mode = 'pan';
    canvas.style.cursor = 'grab';
    modeValue.textContent = 'Pan';
    key.style.background = 'var(--sp-accent)';
    key.style.borderColor = 'var(--sp-accent)';
    key.style.color = 'var(--sp-accent-ink)';
    show(chip, true);
    report('Space down: the canvas means pan while it is held');
  };

  const leaveMode = () => {
    if (!held) return;
    held = false;
    byKeyControl = false;
    panning = undefined;
    const ms = Math.round(performance.now() - heldSince);
    heldFor.textContent = `${ms} ms`;
    canvas.dataset.mode = 'select';
    canvas.style.cursor = 'crosshair';
    modeValue.textContent = 'Select';
    key.style.background = '';
    key.style.borderColor = '';
    key.style.color = '';
    show(chip, false);
    report(ms < TAP_MS ? 'Tapped, not held: the mode ended with the key' : `Held ${ms} ms, so the mode lasted ${ms} ms`);
  };

  // The real key. `code` is the honest test for a space bar; `key` is what the stage's
  // scripted press carries, and both spellings name the same physical key here.
  const isSpace = (event: KeyboardEvent) => event.code === 'Space' || event.key === ' ' || event.key === 'Space';

  root.addEventListener('keydown', (event) => {
    if (isSpace(event)) enterMode();
  });

  root.addEventListener('keyup', (event) => {
    if (isSpace(event)) leaveMode();
  });

  // The stand-in for the physical key: the press opens the mode and the release closes it,
  // through the same two functions the keyboard path calls.
  key.addEventListener('pointerdown', (event) => {
    // The pan that follows travels far from this control, so the pointer is captured: without
    // it the moves stop and the release never returns, leaving the mode held open. A
    // synthesized pointer has nothing to capture and the call throws, hence the guard.
    if (event.isTrusted) key.setPointerCapture(event.pointerId);
    byKeyControl = true;
    enterMode();
    panning = { x: event.clientX, y: event.clientY, ox: at.x, oy: at.y };
  });

  canvas.addEventListener('pointerdown', (event) => {
    // Both gestures started here (the marquee and the pan) track the pointer until it comes
    // up, so the canvas keeps it: uncaptured, a drag off the canvas strands mid-gesture.
    if (event.isTrusted) canvas.setPointerCapture(event.pointerId);
    if (held) {
      panning = { x: event.clientX, y: event.clientY, ox: at.x, oy: at.y };
      return;
    }
    const box = canvas.getBoundingClientRect();
    picking = { x: event.clientX - box.left, y: event.clientY - box.top };
    marquee.style.left = `${picking.x}px`;
    marquee.style.top = `${picking.y}px`;
    marquee.style.width = '0px';
    marquee.style.height = '0px';
    show(marquee, true);
    canvas.dataset.did = 'none';
    report('Dragging with nothing held: marquee select');
  });

  root.addEventListener('pointermove', (event) => {
    if (panning) {
      place(panning.ox + (event.clientX - panning.x), panning.oy + (event.clientY - panning.y));
      report('Panning, for as long as the key is down');
      return;
    }
    if (!picking) return;
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    marquee.style.left = `${Math.min(picking.x, x)}px`;
    marquee.style.top = `${Math.min(picking.y, y)}px`;
    marquee.style.width = `${Math.abs(x - picking.x)}px`;
    marquee.style.height = `${Math.abs(y - picking.y)}px`;
  });

  const release = () => {
    if (panning) {
      panning = undefined;
      if (held) canvas.dataset.did = 'panned';
    }
    if (picking) {
      picking = undefined;
      const box = marquee.getBoundingClientRect();
      const caught = NODES.filter((_, i) => {
        const node = part(root, `node-${i}`).getBoundingClientRect();
        return node.right > box.left && node.left < box.right && node.bottom > box.top && node.top < box.bottom;
      }).length;
      show(marquee, false);
      canvas.dataset.did = 'selected';
      report(caught === 1 ? 'Marquee took 1 card' : `Marquee took ${caught} cards`);
    }
    // The release ends the mode, which is the whole of the term: nothing latched, nothing left.
    if (byKeyControl) leaveMode();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
