import { part } from '#src/kit/parts.ts';

/** The drawing box inside the pad's border, which is also the trail's coordinate space. */
const PAD = { w: 300, h: 160 };

/** How far the pointer must travel before a direction is recorded, so a wobble is not a letter. */
const SEG_MIN = 26;
/** How far the whole stroke must run before a press counts as a gesture rather than a click. */
const STROKE_MIN = 20;

const GESTURES = [
  { shape: 'L', key: 'back', glyph: '←', name: 'Back', note: 'a stroke to the left' },
  { shape: 'R', key: 'forward', glyph: '→', name: 'Forward', note: 'a stroke to the right' },
  { shape: 'DR', key: 'close', glyph: '↓→', name: 'Close tab', note: 'down, then right' },
];

/**
 * A fixed anchor the script aims at, over the page and never on a control. It carries no
 * paint at all: a drawn mark would annotate the choreography rather than the term (SPEC §5).
 */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    aria-hidden="true"
    style="position: absolute; left: ${x - 7}px; top: ${y - 7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;

/**
 * Mouse gesture specimen: a page area where a stroke drawn with the right button held is the
 * command. Left runs Back, right runs Forward, and down then right closes the tab, and none of
 * the three was aimed at anything: the shape of the movement is the whole message.
 *
 * The subject is the pad. The term names the stroke, but a stroke is nothing at rest and a
 * polyline is thinner than the stage can ring, so the narrowest element that is honestly the
 * term is the surface that reads gestures. The page content behind it, the legend and the
 * readouts are the scene around it in the context register, and the points the script strokes
 * between are unpainted anchors.
 *
 * The recognizer is the real one, not a lookup of the three scripted paths. A stroke is reduced
 * to a sequence of cardinal directions as it is drawn, with one threshold for how far the
 * pointer must travel before a direction is recorded, and the resulting string is matched
 * against the table above. A wobbly stroke and a ruled one therefore produce the same command,
 * which is the property that makes gestures usable at all.
 *
 * The right button is what arms the pad, exactly as it would in a browser, and the pad
 * suppresses its own context menu so a right drag is a gesture rather than a menu. One press
 * is one gesture: the button goes down, the stroke is drawn, and the release reads it, which
 * is the single code path a reader's hand and the script's `drag: { button: 'right' }` both
 * take. A release that never travelled is not a stroke, so it disarms and says so.
 *
 * The pad, the legend and the readouts all hold fixed boxes, and the trail is painted on an
 * overlay, so drawing and clearing a gesture move nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Browser</span>
          <span class="sp-text" data-part="readout" style="width: 340px; text-align: right; white-space: nowrap">Hold the right button and draw a stroke</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 10px">
          <div
            class="sp-surface"
            data-part="pad"
            data-subject
            data-armed="no"
            data-command="none"
            style="position: relative; flex: 0 0 auto; width: ${PAD.w + 2}px; height: ${PAD.h + 2}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              <span class="sp-line" style="position: absolute; left: 14px; top: 14px; width: 148px"></span>
              <span class="sp-line" style="position: absolute; left: 14px; top: 28px; width: 96px"></span>
              <span class="sp-line" style="position: absolute; left: 14px; top: 138px; width: 176px"></span>
              <span class="sp-line" style="position: absolute; left: 200px; top: 138px; width: 86px"></span>
            </span>

            <div data-part="trail" style="position: absolute; inset: 0; pointer-events: none; z-index: 2">
              <svg viewBox="0 0 ${PAD.w} ${PAD.h}" width="${PAD.w}" height="${PAD.h}" style="display: block" aria-hidden="true">
                <polyline points="" fill="none" stroke="var(--sp-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
              </svg>
            </div>

            <span style="position: absolute; inset: 0; pointer-events: none; z-index: 3">
              ${dot('start', 150, 44)}
              ${dot('mark-left', 54, 44)}
              ${dot('mark-right', 246, 44)}
              ${dot('mark-down', 150, 124)}
              ${dot('mark-corner', 238, 124)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
            <span class="sp-label">Strokes</span>
            ${GESTURES.map(
              (gesture) => `
              <div class="sp-row" style="gap: 8px">
                <span class="sp-text sp-text--ink" style="width: 24px; font-size: 13px">${gesture.glyph}</span>
                <span class="sp-text" style="font-size: 12px; white-space: nowrap">${gesture.name}</span>
              </div>`,
            ).join('')}
            <div class="sp-divider"></div>
            <span class="sp-label">Recognized</span>
            <span class="sp-heading" data-part="command" style="font-size: 13px">Nothing yet</span>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 14px 9px; text-align: center; line-height: 1.4">
          Nothing here is aimed at: the shape of the stroke is the whole command, and the pad keeps the right button from opening a menu.
        </span>
      </div>
    </div>
  `;

  const pad = part(root, 'pad');
  const readout = part(root, 'readout');
  const command = part(root, 'command');
  const line = part(root, 'trail').querySelector('polyline') as SVGPolylineElement;

  let armed = false;
  let points: { x: number; y: number }[] = [];
  let anchor = { x: 0, y: 0 };
  let letters: string[] = [];
  let travelled = 0;

  const say = (text: string) => {
    readout.textContent = text;
  };

  /** Pointer coordinates in the pad's drawing box, with its border taken off both axes. */
  const at = (event: PointerEvent) => {
    const rect = pad.getBoundingClientRect();
    return { x: event.clientX - rect.left - pad.clientLeft, y: event.clientY - rect.top - pad.clientTop };
  };

  const draw = () => {
    line.setAttribute('points', points.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`).join(' '));
  };

  /** The nearest of the four cardinal directions, which is all a recognizer ever keeps. */
  const heading = (dx: number, dy: number) => (Math.abs(dx) >= Math.abs(dy) ? (dx < 0 ? 'L' : 'R') : dy < 0 ? 'U' : 'D');

  const arm = (from: { x: number; y: number }) => {
    armed = true;
    points = [from];
    anchor = from;
    letters = [];
    travelled = 0;
    pad.dataset.armed = 'yes';
    pad.dataset.command = 'none';
    command.textContent = 'Drawing';
    draw();
    say('Right button held: the pad is reading a stroke');
  };

  const extend = (to: { x: number; y: number }) => {
    const last = points.at(-1);
    if (last) travelled += Math.hypot(to.x - last.x, to.y - last.y);
    points.push(to);
    draw();
    const dx = to.x - anchor.x;
    const dy = to.y - anchor.y;
    if (Math.hypot(dx, dy) < SEG_MIN) return;
    const next = heading(dx, dy);
    if (letters.at(-1) !== next) letters.push(next);
    anchor = to;
    say(`Stroke so far: ${letters.join(' then ')}`);
  };

  const commit = () => {
    armed = false;
    pad.dataset.armed = 'no';
    const gesture = GESTURES.find((candidate) => candidate.shape === letters.join(''));
    if (!gesture) {
      pad.dataset.command = 'unknown';
      command.textContent = 'No match';
      return say('That shape is not in the table, so nothing ran');
    }
    pad.dataset.command = gesture.key;
    command.textContent = gesture.name;
    say(`${gesture.name} ran from ${gesture.note}`);
  };

  // A gesture layer takes the right button away from the context menu, which is the one real
  // cost of the pattern. The pad refuses the menu outright so a right drag is never eaten.
  pad.addEventListener('contextmenu', (event) => event.preventDefault());

  pad.addEventListener('pointerdown', (event) => {
    if (event.button === 2 && !armed) {
      // A stroke that leaves the pad is still this pad's stroke, so the pointer is captured:
      // without it the moves stop and the release lands elsewhere, stranding the gesture. The
      // player's synthesized pointer has nothing to capture and the call throws, hence the guard.
      if (event.isTrusted) pad.setPointerCapture(event.pointerId);
      return arm(at(event));
    }
    if (!armed) say('Nothing armed: hold the right button to draw a gesture');
  });

  // Listened for on the root, since the moves of a stroke are dispatched at the element the
  // gesture started on rather than at whatever the trail happens to be crossing.
  root.addEventListener('pointermove', (event) => {
    if (armed) extend(at(event));
  });

  pad.addEventListener('pointerup', (event) => {
    if (!armed || event.button !== 2) return;
    // A press that never travelled is not a stroke, so the pad ends the gesture with nothing
    // recognized rather than reading an empty shape.
    if (travelled < STROKE_MIN) {
      armed = false;
      pad.dataset.armed = 'no';
      command.textContent = 'Nothing yet';
      return say('The button came up without a stroke, so nothing ran');
    }
    commit();
  });

  pad.addEventListener('pointercancel', () => {
    if (!armed) return;
    armed = false;
    pad.dataset.armed = 'no';
    say('The stroke was cancelled before it was read');
  });
}
