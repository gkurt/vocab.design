import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CANVAS = { w: 400, h: 168 };
const CARD = { w: 126, h: 52 };
const START = { x: 140, y: 100 };
/** Where the held state parks the card: flush with the left neighbour's left edge. */
const POSE = { x: 32, y: 108 };
/** How near an edge has to come before the tool admits the alignment, in screen pixels. */
const SNAP = 8;

const NEIGHBOURS = [
  { key: 'tide', x: 32, y: 14, w: 126, h: 58, title: 'Tide times' },
  { key: 'ferry', x: 246, y: 14, w: 126, h: 58, title: 'Ferry times' },
];

const EDGE_NAMES = { x: ['left', 'centre', 'right'], y: ['top', 'middle', 'bottom'] } as const;

type Axis = 'x' | 'y';
type Neighbour = (typeof NEIGHBOURS)[number];
interface Match {
  line: number;
  delta: number;
  kind: string;
  box: Neighbour;
}

/** The nearest coincidence between the moving card's three edges and a neighbour's three. */
function bestMatch(axis: Axis, at: number): Match | undefined {
  const size = axis === 'x' ? CARD.w : CARD.h;
  const edges = [at, at + size / 2, at + size];
  let best: Match | undefined;
  for (const box of NEIGHBOURS) {
    const from = axis === 'x' ? box.x : box.y;
    const span = axis === 'x' ? box.w : box.h;
    for (const line of [from, from + span / 2, from + span]) {
      for (const [index, edge] of edges.entries()) {
        const delta = line - edge;
        if (Math.abs(delta) > SNAP) continue;
        if (!best || Math.abs(delta) < Math.abs(best.delta)) best = { line, delta, kind: EDGE_NAMES[axis][index] ?? 'edge', box };
      }
    }
  }
  return best;
}

const neighbourCards = NEIGHBOURS.map(
  ({ key, x, y, w, h, title }) => `
    <div
      class="sp-surface sp-context"
      data-part="neighbour-${key}"
      style="position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px; padding: 8px 10px"
    >
      <span class="sp-heading" style="font-size: 12px">${title}</span>
      <span class="sp-line" style="display: block; width: 64%; margin-top: 8px"></span>
    </div>`,
).join('');

/**
 * Smart guides specimen: a card dragged across a small canvas, where coming within eight
 * pixels of a neighbour's edge draws the line the two now share, snaps the card onto it,
 * and prints the gap between them. The subject is the vertical guide line: the term names
 * the lines rather than the card that earns them or the canvas they are drawn over, and
 * the line is the narrowest element that is one.
 *
 * A guide exists only while a hand is moving something, which would leave identify with
 * nothing to ring, so the specimen carries a labelled control that holds the guides on
 * after the drop. That is the state the pose settles on, and it is instrumentation, so it
 * lives in the context register (SPEC §5-6). Holding the guides on used to make the board's
 * status line read "Held: the line and the gap, standing still", which is the site narrating
 * its own instrument; the line now reports the alignment and the gap in exactly the words a
 * live drag gets. Nothing is re-parented between the press and
 * the release; the card moves by a transform inside a fixed canvas, so a drag moves the
 * card and nothing else.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Board</span>
          <span class="sp-text" data-part="readout" style="width: 304px; text-align: right; white-space: nowrap">Drag the card near a neighbour</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div data-part="canvas" style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden">
            ${neighbourCards}
            <!-- Where the script drops the card. An anchor carries no paint: a drawn mark
                 would annotate the choreography rather than the term (SPEC §5). -->
            <span
              data-part="target"
              aria-hidden="true"
              style="position: absolute; left: 94px; top: 129px; width: 10px; height: 10px; pointer-events: none"
            ></span>
            <div
              class="sp-surface"
              data-part="card"
              data-x="${START.x}"
              data-y="${START.y}"
              data-snapped="none"
              style="position: absolute; left: 0; top: 0; width: ${CARD.w}px; height: ${CARD.h}px; padding: 8px 10px; transform: translate(${START.x}px, ${START.y}px); cursor: grab; touch-action: none; user-select: none"
            >
              <span class="sp-heading" style="font-size: 12px">Slipway notes</span>
              <span class="sp-line" style="display: block; width: 52%; margin-top: 7px"></span>
            </div>
            <span
              data-part="guide-v"
              data-subject
              style="position: absolute; top: 0; height: ${CANVAS.h}px; width: 2px; left: 0; background: var(--sp-accent); opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            ></span>
            <span
              data-part="guide-h"
              style="position: absolute; left: 0; width: ${CANVAS.w}px; height: 2px; top: 0; background: var(--sp-accent); opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            ></span>
            <span
              data-part="badge"
              style="position: absolute; left: 0; top: 0; padding: 1px 5px; border-radius: 4px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 11px; font-variant-numeric: tabular-nums; opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            >0</span>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="Guides" data-part="hold" data-value="drag">
              <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">While dragging</button>
              <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held for inspection</button>
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const guideV = part(root, 'guide-v');
  const guideH = part(root, 'guide-h');
  const badge = part(root, 'badge');
  const readout = part(root, 'readout');
  const hold = part(root, 'hold') as HTMLElement & { value: string };

  const at = { ...START };
  let origin: { x: number; y: number; from: { x: number; y: number } } | undefined;

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
  };

  /** The gap between the card and the neighbour it aligned with, along the other axis. */
  const gapTo = (box: Neighbour) => {
    if (at.y >= box.y + box.h) return Math.round(at.y - (box.y + box.h));
    if (at.y + CARD.h <= box.y) return Math.round(box.y - (at.y + CARD.h));
    return 0;
  };

  const draw = (mx: Match | undefined, my: Match | undefined) => {
    card.style.transform = `translate(${at.x}px, ${at.y}px)`;
    card.dataset.x = String(Math.round(at.x));
    card.dataset.y = String(Math.round(at.y));
    card.dataset.snapped = mx ? mx.kind : 'none';
    show(guideV, Boolean(mx));
    show(guideH, Boolean(my));
    show(badge, Boolean(mx));
    if (mx) {
      guideV.style.left = `${mx.line - 1}px`;
      const gap = gapTo(mx.box);
      badge.textContent = String(gap);
      badge.style.left = `${mx.line + 8}px`;
      badge.style.top = `${Math.min(CANVAS.h - 20, Math.max(4, at.y - gap / 2 - 9))}px`;
    }
    if (my) guideH.style.top = `${my.line - 1}px`;
  };

  const hideGuides = () => {
    show(guideV, false);
    show(guideH, false);
    show(badge, false);
  };

  card.addEventListener('pointerdown', (event) => {
    // A snap moves the card out from under the pointer, so the card captures it: uncaptured,
    // the moves stop the moment the pointer is off the card and the release never arrives,
    // leaving it lifted. A synthesized pointer cannot be captured, hence the guard.
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    origin = { ...localPoint(event, root), from: { ...at } };
    card.style.cursor = 'grabbing';
    card.style.boxShadow = 'var(--sp-shadow)';
    flag(card, 'data-lifted', true);
    readout.textContent = 'Dragging: nothing lines up yet';
  });

  root.addEventListener('pointermove', (event) => {
    const held = origin;
    if (!held) return;
    const now = localPoint(event, root);
    at.x = Math.max(0, Math.min(CANVAS.w - CARD.w, held.from.x + now.x - held.x));
    at.y = Math.max(0, Math.min(CANVAS.h - CARD.h, held.from.y + now.y - held.y));
    const mx = bestMatch('x', at.x);
    const my = bestMatch('y', at.y);
    if (mx) at.x += mx.delta;
    if (my) at.y += my.delta;
    draw(mx, my);
    readout.textContent = mx ? `Aligned: ${mx.kind} edges, ${gapTo(mx.box)} px apart` : 'Dragging: nothing lines up yet';
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    card.style.cursor = 'grab';
    card.style.boxShadow = '';
    flag(card, 'data-lifted', false);
    // The lines are feedback for a gesture, so they leave with it, unless the labelled
    // control is holding them on for a reader who wants to look.
    if (hold.value !== 'held') {
      hideGuides();
      readout.textContent = `Dropped on the ${card.dataset.snapped} alignment`;
    }
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  hold.addEventListener('change', () => {
    if (hold.value === 'held') {
      at.x = POSE.x;
      at.y = POSE.y;
      const mx = bestMatch('x', POSE.x);
      draw(mx, bestMatch('y', POSE.y));
      if (mx) readout.textContent = `Aligned: ${mx.kind} edges, ${gapTo(mx.box)} px apart`;
      return;
    }
    hideGuides();
    readout.textContent = 'Guides live only while a hand is moving something';
  });
}
