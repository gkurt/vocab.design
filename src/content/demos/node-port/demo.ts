import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The zoomed-in scene, stated: two nodes close up, not a canvas to get lost on. */
const CANVAS = { w: 450, h: 196 };
const NODE = { w: 150, h: 150, y: 22 };
const ROWS = [58, 92, 126] as const;
/** A 16px stub needs a target a pointer can find, so the catch radius is far wider. */
const CATCH = 26;

/**
 * The type system the ports declare. Coded twice over, by colour and by shape, which is how
 * a graph makes its compatibility rule legible before a wire is pulled. The hues are stated
 * here for the reason `.sp-swatch` takes its paint from the demo: the kit has one accent,
 * and a socket set that could only be drawn in it would carry no type at all.
 */
const TYPES = {
  number: { name: 'Number', hue: '#8b93a1', diamond: false },
  color: { name: 'Color', hue: '#d9a52f', diamond: false },
  vector: { name: 'Vector', hue: '#8a72e0', diamond: true },
} as const;

type TypeName = keyof typeof TYPES;
type Port = { id: string; label: string; type: TypeName; row: 0 | 1 | 2 };

const OUTS: readonly [Port, Port, Port] = [
  { id: 'fac', label: 'Fac', type: 'number', row: 0 },
  { id: 'color', label: 'Color', type: 'color', row: 1 },
  { id: 'vector', label: 'Vector', type: 'vector', row: 2 },
];

const INS: readonly [Port, Port, Port] = [
  { id: 'normal', label: 'Normal', type: 'vector', row: 0 },
  { id: 'strength', label: 'Strength', type: 'number', row: 1 },
  { id: 'height', label: 'Height', type: 'number', row: 2 },
];

const LEFT_X = 14;
const RIGHT_X = 286;

const outAt = (port: Port) => ({ x: LEFT_X + NODE.w, y: NODE.y + ROWS[port.row] });
const inAt = (port: Port) => ({ x: RIGHT_X, y: NODE.y + ROWS[port.row] });

const VERDICTS = {
  rest: 'Every port declares a type. A wire lands only where its own type is accepted.',
  refused: 'Refused: a Color output has nothing a Number port could read.',
  linked: 'Vector into Vector, so the wire lands and the connection is made.',
} as const;

function stub(port: Port, side: 'in' | 'out'): string {
  const type = TYPES[port.type];
  const at = side === 'out' ? outAt(port) : inAt(port);
  const shape = type.diamond ? 'border-radius: 3px; transform: rotate(45deg)' : 'border-radius: 50%';
  const fill = side === 'out' ? type.hue : 'var(--sp-surface)';
  return `<span data-part="port-${side}-${port.id}" data-type="${port.type}" data-side="${side}"
                style="position: absolute; left: ${at.x - 8}px; top: ${at.y - 8}px; width: 16px; height: 16px;
                       box-sizing: border-box; background: ${fill}; border: 3px solid ${type.hue}; ${shape}; cursor: crosshair"></span>`;
}

function wirePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const reach = Math.max(46, Math.abs(to.x - from.x) * 0.55);
  return `M ${from.x} ${from.y} C ${from.x + reach} ${from.y}, ${to.x - reach} ${to.y}, ${to.x} ${to.y}`;
}

/**
 * Node port specimen: two nodes at close range, their sockets typed by colour and shape, and
 * two wires attempted. The first is refused because a Color output has nothing a Number port
 * could read, and it says so; the second carries a Vector into a Vector and lands.
 *
 * The subject is ONE socket, the narrowest element the term names, and the other five are
 * peers of it rather than scenery: an accent on peer instances is the comparison, so the ring
 * stays on one instance instead of climbing to the node or to the canvas. The legend and the
 * verdict line are instrumentation and wear the context register (SPEC §5).
 *
 * This is deliberately not a canvas: no dot grid, no camera, nothing to pan. The term is the
 * stub, so the specimen is zoomed in far enough that the stub is the biggest thing in it.
 *
 * The refusal is state rather than a flash on a timer, so it survives a pose and an assert
 * has room to read it; the next press clears it, which is the only reset it needs.
 */
export function mount(root: HTMLElement): void {
  const legend = (Object.keys(TYPES) as TypeName[])
    .map((key) => {
      const type = TYPES[key];
      const shape = type.diamond ? 'border-radius: 2px; transform: rotate(45deg)' : 'border-radius: 50%';
      return `<span class="sp-row" style="gap: 5px">
                <span style="width: 10px; height: 10px; background: ${type.hue}; ${shape}"></span>
                <span class="sp-label" style="font-size: 10px">${type.name}</span>
              </span>`;
    })
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Material</span>
          ${legend}
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div
            data-part="scene"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <svg aria-hidden="true" viewBox="0 0 ${CANVAS.w} ${CANVAS.h}"
                 style="position: absolute; left: 0; top: 0; width: ${CANVAS.w}px; height: ${CANVAS.h}px">
              <g data-part="wires" fill="none" stroke-width="3" stroke-linecap="round"></g>
              <path data-part="pull" fill="none" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0" d="M 0 0"></path>
            </svg>
            <div class="sp-surface" data-part="node-noise"
                 style="position: absolute; left: ${LEFT_X}px; top: ${NODE.y}px; width: ${NODE.w}px; height: ${NODE.h}px;
                        padding: 8px 0 0; box-shadow: var(--sp-shadow)">
              <span class="sp-heading" style="display: block; padding: 0 10px; font-size: 12px">Noise</span>
              <span class="sp-label" style="display: block; padding: 2px 10px 0; font-size: 10px">outputs</span>
            </div>
            ${OUTS.map(
              (port) => `
              <span class="sp-text sp-text--ink" style="position: absolute; left: ${LEFT_X}px; top: ${NODE.y + ROWS[port.row] - 9}px;
                           width: ${NODE.w - 14}px; text-align: right; font-size: 11px; line-height: 18px">${port.label}</span>
              ${stub(port, 'out')}`,
            ).join('')}
            <div class="sp-surface" data-part="node-bump"
                 style="position: absolute; left: ${RIGHT_X}px; top: ${NODE.y}px; width: ${NODE.w}px; height: ${NODE.h}px;
                        padding: 8px 0 0; box-shadow: var(--sp-shadow)">
              <span class="sp-heading" style="display: block; padding: 0 10px; font-size: 12px">Bump</span>
              <span class="sp-label" style="display: block; padding: 2px 10px 0; font-size: 10px">inputs</span>
            </div>
            ${INS.map(
              (port) => `
              <span class="sp-text sp-text--ink" style="position: absolute; left: ${RIGHT_X + 14}px; top: ${NODE.y + ROWS[port.row] - 9}px;
                           width: ${NODE.w - 14}px; font-size: 11px; line-height: 18px">${port.label}</span>
              ${stub(port, 'in')}`,
            ).join('')}
          </div>
          <span class="sp-text sp-context" data-part="verdict" data-state="rest" style="height: 19px; font-size: 11px; overflow: hidden">${VERDICTS.rest}</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const wires = part(root, 'wires');
  const pull = part(root, 'pull');
  const verdict = part(root, 'verdict');
  const stubs = (side: 'in' | 'out') => [...scene.querySelectorAll<HTMLElement>(`[data-side="${side}"]`)];

  /** The wire the graph mounts with: one Number output already feeding a Number input. */
  const linked: Array<{ from: Port; to: Port }> = [{ from: OUTS[0], to: INS[2] }];

  const render = () => {
    wires.innerHTML = linked
      .map(
        ({ from, to }) =>
          `<path data-part="wire-${from.id}-${to.id}" d="${wirePath(outAt(from), inAt(to))}" stroke="${TYPES[from.type].hue}"></path>`,
      )
      .join('');
  };

  const say = (state: keyof typeof VERDICTS) => {
    verdict.dataset.state = state;
    verdict.textContent = VERDICTS[state];
    verdict.style.color = state === 'refused' ? 'var(--sp-warn)' : '';
  };

  /** Which inputs a wire of this type may land on: the rule the surface teaches by lighting. */
  const arm = (type: TypeName | null) => {
    for (const el of stubs('in')) {
      const accepts = type !== null && el.dataset.type === type;
      el.style.boxShadow = accepts ? `0 0 0 5px color-mix(in srgb, ${TYPES[el.dataset.type as TypeName].hue} 30%, transparent)` : '';
    }
  };

  const clearRefusal = () => {
    for (const el of stubs('in')) {
      flag(el, 'data-refused', false);
      el.style.borderColor = TYPES[el.dataset.type as TypeName].hue;
    }
  };

  let source: Port | null = null;

  for (const el of stubs('out')) {
    el.addEventListener('pointerdown', (event) => {
      // Captured on the stub that was pressed, or a reader's wire dies 16px later; a
      // synthetic pointer has nothing to capture, hence the trusted guard.
      if (event.isTrusted) el.setPointerCapture(event.pointerId);
      source = OUTS.find((port) => `port-out-${port.id}` === el.dataset.part) ?? null;
      if (!source) return;
      clearRefusal();
      pull.setAttribute('stroke', TYPES[source.type].hue);
      pull.setAttribute('d', wirePath(outAt(source), localPoint(event, scene)));
      pull.style.opacity = '1';
      arm(source.type);
    });
  }

  scene.addEventListener('pointermove', (event) => {
    if (!source) return;
    pull.setAttribute('d', wirePath(outAt(source), localPoint(event, scene)));
  });

  const release = (event: PointerEvent) => {
    if (!source) return;
    const at = localPoint(event, scene);
    const target = INS.find((port) => Math.hypot(inAt(port).x - at.x, inAt(port).y - at.y) <= CATCH);
    if (target && target.type === source.type) {
      if (!linked.some(({ to }) => to.id === target.id)) linked.push({ from: source, to: target });
      render();
      say('linked');
    } else if (target) {
      // The refusal is the term: a wire that snapped back with no word reads as a broken
      // drag, so the port that declined says so and keeps saying it.
      const el = part(root, `port-in-${target.id}`);
      flag(el, 'data-refused', true);
      el.style.borderColor = 'var(--sp-warn)';
      say('refused');
    }
    source = null;
    pull.style.opacity = '0';
    pull.setAttribute('d', 'M 0 0');
    arm(null);
  };

  scene.addEventListener('pointerup', release);
  scene.addEventListener('pointercancel', release);

  // The subject is one socket: the Vector input, the narrowest element the term names.
  part(root, 'port-in-normal').setAttribute('data-subject', '');
  render();
}
