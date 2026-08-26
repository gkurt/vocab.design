import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The plot the arrangements are computed into, stated so nothing reads back a write. */
const CANVAS = { w: 450, h: 176 };
const PILL = { w: 54, h: 24 };

type Point = { x: number; y: number };

const NODES = [
  { id: 'a', label: 'Ingest' },
  { id: 'b', label: 'Clean' },
  { id: 'c', label: 'Enrich' },
  { id: 'd', label: 'Join' },
  { id: 'e', label: 'Report' },
  { id: 'f', label: 'Alert' },
] as const;

type NodeId = (typeof NODES)[number]['id'];
type Layout = { at: Record<NodeId, Point>; note: string };

const EDGES: ReadonlyArray<[NodeId, NodeId]> = [
  ['a', 'b'],
  ['a', 'c'],
  ['b', 'd'],
  ['c', 'd'],
  ['d', 'e'],
  ['d', 'f'],
];

/**
 * Four arrangements of the same six nodes: one placed by hand and three by algorithm. The
 * coordinates are each algorithm's OUTPUT, stated rather than solved live, because a spring
 * simulation running on the stage would be a run the specimen has to own (SPEC §8) and the
 * term is where the nodes end up, not how long the solver took to decide.
 */
const LAYOUTS = {
  dropped: {
    at: {
      a: { x: 206, y: 36 },
      b: { x: 66, y: 110 },
      c: { x: 326, y: 52 },
      d: { x: 156, y: 146 },
      e: { x: 388, y: 132 },
      f: { x: 58, y: 36 },
    },
    note: 'Placed by hand, one node at a time. Nothing about the picture says which way the work flows.',
  },
  layered: {
    at: {
      a: { x: 45, y: 88 },
      b: { x: 165, y: 46 },
      c: { x: 165, y: 130 },
      d: { x: 285, y: 88 },
      e: { x: 405, y: 46 },
      f: { x: 405, y: 130 },
    },
    note: 'Layered ranks each node by what it depends on, so every edge points the same way. The arrangement for a flow.',
  },
  radial: {
    at: {
      a: { x: 97, y: 88 },
      b: { x: 185, y: 147 },
      c: { x: 329, y: 124 },
      d: { x: 225, y: 88 },
      e: { x: 329, y: 52 },
      f: { x: 185, y: 29 },
    },
    note: 'Radial puts the busiest node at the centre and its neighbours on a ring. The arrangement for a hub.',
  },
  force: {
    at: {
      a: { x: 65, y: 136 },
      b: { x: 142, y: 72 },
      c: { x: 163, y: 157 },
      d: { x: 254, y: 89 },
      e: { x: 345, y: 21 },
      f: { x: 367, y: 106 },
    },
    note: 'Force-directed lets edges pull and nodes push apart until it settles. The arrangement for a mesh with no direction.',
  },
} satisfies Record<string, Layout>;

type LayoutName = keyof typeof LAYOUTS;

const START: LayoutName = 'layered';
const named = (name: string): LayoutName => (name in LAYOUTS ? (name as LayoutName) : START);
const GLIDE = '0.5s var(--sp-ease)';

/**
 * Graph layout specimen: the same six-node graph placed by hand, then arranged three ways.
 *
 * The subject is the arranged graph, since the term names where the nodes ended up rather than
 * any one of them: the picker and the two lines of copy reporting on it are instrumentation in
 * the context register (SPEC §5). This is deliberately not a node editor. There are no ports,
 * nothing to wire and nothing to drag, because the only question here is placement.
 *
 * Edges are drawn as rotated segments rather than as SVG lines so that they can travel with the
 * nodes: the cost the term has to state is that re-running a layout moves everything the reader
 * had learned the position of, and a picture that jumped would hide exactly that.
 *
 * The hand-placed arrangement is the counter-example the term is defined against, so the graph
 * declares the honest condition in `data-pose` and mounts arranged: identify refuses to ring a
 * graph nobody computed, and plays on until one has been (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Arrange</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-dropped" value="dropped">by hand</button>
            <button class="sp-segment" type="button" data-part="seg-layered" value="layered">layered</button>
            <button class="sp-segment" type="button" data-part="seg-radial" value="radial">radial</button>
            <button class="sp-segment" type="button" data-part="seg-force" value="force">force</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div
            data-part="graph"
            data-subject
            data-pose=":not([data-layout=dropped])"
            data-layout="${START}"
            role="img"
            aria-label="Six node pipeline graph"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            ${EDGES.map(
              ([from, to]) => `
              <span data-part="edge-${from}-${to}" aria-hidden="true"
                    style="position: absolute; height: 2px; background: var(--sp-line); transform-origin: 0 50%;
                           transition: left ${GLIDE}, top ${GLIDE}, width ${GLIDE}, transform ${GLIDE}"></span>`,
            ).join('')}
            ${NODES.map(
              (node) => `
              <span class="sp-chip" data-part="node-${node.id}"
                    style="position: absolute; width: ${PILL.w}px; height: ${PILL.h}px; justify-content: center;
                           padding: 0; font-size: 10px; transition: left ${GLIDE}, top ${GLIDE}">${node.label}</span>`,
            ).join('')}
          </div>
          <div class="sp-stack sp-context" style="gap: 2px">
            <span class="sp-text" data-part="note" style="height: 30px; font-size: 11px; line-height: 15px; overflow: hidden"></span>
            <span class="sp-label" data-part="cost" data-moved="0" style="height: 15px; font-size: 11px; overflow: hidden"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const graph = part(root, 'graph');
  const note = part(root, 'note');
  const cost = part(root, 'cost');
  const picker = part(root, 'picker') as HTMLElement & { value: string };

  let current = START;

  const arrange = (picked: string, count: boolean) => {
    const name = named(picked);
    const layout = LAYOUTS[name];
    const was = LAYOUTS[current].at;
    const moved = NODES.filter((node) => {
      const from = was[node.id];
      const to = layout.at[node.id];
      return Math.hypot(from.x - to.x, from.y - to.y) > 2;
    }).length;

    for (const node of NODES) {
      const at = layout.at[node.id];
      const pill = part(root, `node-${node.id}`);
      pill.style.left = `${at.x - PILL.w / 2}px`;
      pill.style.top = `${at.y - PILL.h / 2}px`;
    }

    for (const [from, to] of EDGES) {
      const a = layout.at[from];
      const b = layout.at[to];
      const line = part(root, `edge-${from}-${to}`);
      line.style.left = `${a.x}px`;
      line.style.top = `${a.y - 1}px`;
      line.style.width = `${Math.hypot(b.x - a.x, b.y - a.y)}px`;
      line.style.transform = `rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI}deg)`;
    }

    graph.dataset.layout = name;
    note.textContent = layout.note;
    // The honest cost, stated as a number: an arrangement is not free, it spends every
    // position the reader had learned.
    cost.dataset.moved = String(count ? moved : 0);
    cost.textContent = count
      ? `Re-arranged: ${moved} of ${NODES.length} nodes moved, and every position the reader had learned is gone.`
      : 'Six steps, six boxes, and not one coordinate until an algorithm decided them.';
    current = name;
  };

  picker.addEventListener('change', (event) => arrange((event as CustomEvent<string>).detail, true));

  // Mounted in the arrangement it renders: the first pass writes the hand-placed positions
  // the markup has not stated, so nothing glides into place on mount (SPEC §5).
  arrange(START, false);
}
