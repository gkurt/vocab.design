import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The scene, stated: one connection, one pair of ends, and one box in the way. */
const CANVAS = { w: 450, h: 196 };
const FROM = { x: 124, y: 40 };
const TO = { x: 306, y: 124 };
/** The radius the staircase turns its corners at. */
const BEND = 8;

type Routing = 'bezier' | 'step' | 'straight';

/**
 * The three routings, each as its own path and its own answer to where the label goes.
 * `place` is the label's point: the middle of the path for a shape that has a readable
 * middle, and the middle of the longest straight leg for one that does not.
 */
const ROUTES: Record<Routing, { d: string; place: { x: number; y: number }; kind: 'mid' | 'leg'; note: string }> = {
  bezier: {
    d: `M ${FROM.x} ${FROM.y} C 215 ${FROM.y}, 215 ${TO.y}, ${TO.x} ${TO.y}`,
    place: { x: 215, y: 82 },
    kind: 'mid',
    note: 'A curve leaves each port along its own axis and reads as one gesture, with a middle a label can sit on.',
  },
  step: {
    d: `M ${FROM.x} ${FROM.y} L ${160 - BEND} ${FROM.y} Q 160 ${FROM.y} 160 ${FROM.y + BEND} L 160 ${TO.y - BEND} Q 160 ${TO.y} ${160 + BEND} ${TO.y} L ${TO.x} ${TO.y}`,
    place: { x: 233, y: TO.y },
    kind: 'leg',
    note: 'A staircase turns in right angles only, and its middle falls just past a corner, so the label moves to the longest leg.',
  },
  straight: {
    d: `M ${FROM.x} ${FROM.y} L ${TO.x} ${TO.y}`,
    place: { x: 215, y: 82 },
    kind: 'mid',
    note: 'The shortest line is the hardest to follow, and its label needs the paper behind it to stay legible.',
  },
};

const START: Routing = 'bezier';

/**
 * Edge routing specimen: one connection between one pair of nodes, drawn three ways.
 *
 * The subject is the routed edge itself, the drawn path, and not the nodes it joins: the term
 * names the line's geometry, so the two ends and the box in the way are scenery in the context
 * register (SPEC §5). The picker is instrumentation and each pick is absolute, since the term
 * is the choice between three routings rather than a flip between two.
 *
 * The label moves with the routing, because where a name sits on a bent connector is half the
 * design content of the term: a curve and a straight line have a middle a label can sit on,
 * and a staircase's middle falls just past a corner, so the name goes to its longest leg.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Connector</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-bezier" value="bezier">curve</button>
            <button class="sp-segment" type="button" data-part="seg-step" value="step">staircase</button>
            <button class="sp-segment" type="button" data-part="seg-straight" value="straight">straight</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div
            data-part="scene"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <svg aria-hidden="true" viewBox="0 0 ${CANVAS.w} ${CANVAS.h}"
                 style="position: absolute; left: 0; top: 0; width: ${CANVAS.w}px; height: ${CANVAS.h}px">
              <path
                data-part="edge"
                data-subject
                data-routing="${START}"
                fill="none"
                stroke="var(--sp-accent)"
                stroke-width="2.6"
                stroke-linecap="round"
                d="${ROUTES[START].d}"
              ></path>
            </svg>
            <div class="sp-context" style="position: absolute; left: 0; top: 0; width: ${CANVAS.w}px; height: ${CANVAS.h}px; pointer-events: none">
              <div class="sp-surface" style="position: absolute; left: 16px; top: 18px; width: 108px; height: 44px; padding: 7px 9px">
                <span class="sp-heading" style="font-size: 12px">Fetch</span>
                <div class="sp-line" style="width: 60%; margin-top: 6px"></div>
              </div>
              <span style="position: absolute; left: ${FROM.x - 5}px; top: ${FROM.y - 5}px; width: 10px; height: 10px;
                           border-radius: 50%; background: var(--sp-accent)"></span>
              <div class="sp-surface" style="position: absolute; left: ${TO.x}px; top: ${TO.y - 22}px; width: 108px; height: 44px; padding: 7px 9px">
                <span class="sp-heading" style="font-size: 12px">Render</span>
                <div class="sp-line" style="width: 45%; margin-top: 6px"></div>
              </div>
              <span style="position: absolute; left: ${TO.x - 5}px; top: ${TO.y - 5}px; width: 10px; height: 10px;
                           border-radius: 50%; background: var(--sp-accent)"></span>
            </div>
            <span
              data-part="label"
              data-place="${ROUTES[START].kind}"
              style="position: absolute; left: ${ROUTES[START].place.x}px; top: ${ROUTES[START].place.y}px; transform: translate(-50%, -50%);
                     padding: 1px 6px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 999px;
                     color: var(--sp-muted); font-size: 10px; white-space: nowrap"
            >on error</span>
          </div>
          <span class="sp-text sp-context" data-part="note" style="height: 30px; font-size: 11px; line-height: 15px; overflow: hidden">${ROUTES[START].note}</span>
        </div>
      </div>
    </div>
  `;

  const edge = part(root, 'edge');
  const label = part(root, 'label');
  const note = part(root, 'note');
  const picker = part(root, 'picker') as HTMLElement & { value: string };

  const draw = (routing: string) => {
    const route = ROUTES[routing as Routing] ?? ROUTES[START];
    edge.setAttribute('d', route.d);
    edge.dataset.routing = routing;
    label.style.left = `${route.place.x}px`;
    label.style.top = `${route.place.y}px`;
    label.dataset.place = route.kind;
    note.textContent = route.note;
  };

  picker.addEventListener('change', (event) => draw((event as CustomEvent<string>).detail));
}
