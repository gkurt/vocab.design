import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The graph surface, stated rather than measured, so nothing reads back a write. */
const CANVAS = { w: 450, h: 226 };
const NODE = { w: 104, h: 48 };
/** How close a released wire has to land to count as dropped on a port. */
const CATCH = 22;

type NodeSpec = { id: string; label: string; kind: string; x: number; y: number; input: boolean; output: boolean };

const NODES: NodeSpec[] = [
  { id: 'a', label: 'Source', kind: 'reads a folder', x: 12, y: 88, input: false, output: true },
  { id: 'b', label: 'Filter', kind: 'drops duplicates', x: 168, y: 22, input: true, output: true },
  { id: 'c', label: 'Resize', kind: 'fits to 800px', x: 168, y: 152, input: true, output: true },
  { id: 'd', label: 'Sink', kind: 'writes a bucket', x: 330, y: 88, input: true, output: false },
];

/** The wiring the graph is mounted with. The one the reader adds is the demonstration. */
const WIRED: Array<[string, string]> = [
  ['a', 'b'],
  ['a', 'c'],
  ['b', 'd'],
];

const nodeOf = (id: string) => NODES.find((node) => node.id === id) as NodeSpec;
const outPort = (id: string) => ({ x: nodeOf(id).x + NODE.w, y: nodeOf(id).y + NODE.h / 2 });
const inPort = (id: string) => ({ x: nodeOf(id).x, y: nodeOf(id).y + NODE.h / 2 });

/** A wire's own geometry: a horizontal-tangent bezier, the routing this family defaults to. */
function wirePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const reach = Math.max(38, Math.abs(to.x - from.x) * 0.5);
  return `M ${from.x} ${from.y} C ${from.x + reach} ${from.y}, ${to.x - reach} ${to.y}, ${to.x} ${to.y}`;
}

/**
 * Node graph specimen: four nodes on a plane, three wires already drawn, and one wire
 * pulled out of a port and dropped on another to finish the graph.
 *
 * The subject is the graph surface itself, not the frame around it: the term names the
 * canvas of wired boxes, and the window chrome and the link count that reports on it are
 * scenery in the context register (SPEC §5). Marking the top-level wrapper would have
 * withdrawn identify, and the panel it sits in is not the term.
 *
 * The drop is resolved by COORDINATE rather than by event target, because that is what the
 * gesture really is: the player dispatches every event of a drag on the element the press
 * started on, and a reader's captured pointer retargets the same way, so the only honest
 * question at release is where the pointer was. Distances are read through `localPoint`, so
 * the wire tracks the pointer at a phone's scale as well as at full size.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Import pipeline</span>
          <span class="sp-label" data-part="count" data-links="${WIRED.length}" style="font-size: 11px">${WIRED.length} links</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            data-part="graph"
            data-subject
            data-links="${WIRED.length}"
            role="application"
            aria-label="Import pipeline graph"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius);
                   background-image: radial-gradient(circle, var(--sp-line) 1.3px, transparent 1.5px);
                   background-size: 24px 24px; background-position: 6px 6px"
          >
            <svg data-part="wires" aria-hidden="true" viewBox="0 0 ${CANVAS.w} ${CANVAS.h}"
                 style="position: absolute; left: 0; top: 0; width: ${CANVAS.w}px; height: ${CANVAS.h}px">
              <g data-part="wire-group" fill="none" stroke="var(--sp-accent)" stroke-width="2.4" stroke-linecap="round"></g>
              <path data-part="pull" fill="none" stroke="var(--sp-accent)" stroke-width="2.4" stroke-linecap="round"
                    stroke-dasharray="6 5" opacity="0" d="M 0 0"></path>
            </svg>
            ${NODES.map(
              (node) => `
              <div
                class="sp-surface"
                data-part="node-${node.id}"
                style="position: absolute; left: ${node.x}px; top: ${node.y}px; width: ${NODE.w}px; height: ${NODE.h}px;
                       padding: 7px 9px; box-shadow: var(--sp-shadow)"
              >
                <span class="sp-heading" style="font-size: 12px">${node.label}</span>
                <div class="sp-text" style="margin-top: 2px; font-size: 10px; line-height: 1.3">${node.kind}</div>
              </div>
              ${
                node.input
                  ? `<span data-part="port-${node.id}-in" data-side="in" data-node="${node.id}"
                        style="position: absolute; left: ${inPort(node.id).x - 7}px; top: ${inPort(node.id).y - 7}px;
                               width: 14px; height: 14px; border-radius: 50%; box-sizing: border-box;
                               background: var(--sp-surface); border: 2.5px solid var(--sp-accent); cursor: crosshair"></span>`
                  : ''
              }
              ${
                node.output
                  ? `<span data-part="port-${node.id}-out" data-side="out" data-node="${node.id}"
                        style="position: absolute; left: ${outPort(node.id).x - 7}px; top: ${outPort(node.id).y - 7}px;
                               width: 14px; height: 14px; border-radius: 50%; box-sizing: border-box;
                               background: var(--sp-accent); border: 2.5px solid var(--sp-accent); cursor: crosshair"></span>`
                  : ''
              }`,
            ).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const graph = part(root, 'graph');
  const group = part(root, 'wire-group');
  const pull = part(root, 'pull');
  const count = part(root, 'count');
  const inputs = [...graph.querySelectorAll<HTMLElement>('[data-side="in"]')];

  /** Ports lit while a wire is in flight: how the surface says where a line may land. */
  const armPorts = (on: boolean) => {
    for (const port of inputs) port.style.boxShadow = on ? '0 0 0 4px var(--sp-accent-soft)' : '';
  };

  const wires = [...WIRED];

  const render = () => {
    group.innerHTML = wires
      .map(([from, to]) => `<path data-part="wire-${from}-${to}" d="${wirePath(outPort(from), inPort(to))}"></path>`)
      .join('');
    graph.dataset.links = String(wires.length);
    count.dataset.links = String(wires.length);
    count.textContent = `${wires.length} links`;
  };

  /** Which input port a release landed on, decided by distance rather than by target. */
  const caught = (at: { x: number; y: number }): HTMLElement | undefined =>
    inputs.find((port) => {
      const centre = inPort(port.dataset.node ?? '');
      return Math.hypot(centre.x - at.x, centre.y - at.y) <= CATCH;
    });

  let source: string | null = null;

  for (const port of graph.querySelectorAll<HTMLElement>('[data-side="out"]')) {
    port.addEventListener('pointerdown', (event) => {
      // Captured on the port that was pressed, or a reader's wire dies the moment the
      // pointer leaves the 14px stub; a synthetic pointer has none to capture.
      if (event.isTrusted) port.setPointerCapture(event.pointerId);
      source = port.dataset.node ?? null;
      const at = localPoint(event, graph);
      pull.setAttribute('d', wirePath(outPort(source ?? ''), at));
      pull.style.opacity = '1';
      armPorts(true);
    });
  }

  graph.addEventListener('pointermove', (event) => {
    if (!source) return;
    pull.setAttribute('d', wirePath(outPort(source), localPoint(event, graph)));
  });

  const release = (event: PointerEvent) => {
    if (!source) return;
    const target = caught(localPoint(event, graph));
    const to = target?.dataset.node;
    if (to && to !== source && !wires.some(([from, into]) => from === source && into === to)) {
      wires.push([source, to]);
      render();
    }
    source = null;
    pull.style.opacity = '0';
    pull.setAttribute('d', 'M 0 0');
    armPorts(false);
  };

  graph.addEventListener('pointerup', release);
  graph.addEventListener('pointercancel', release);

  render();
}
