import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SIZE = 150;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_TICK_IN = 62;
const R_TICK_OUT = 68;
const R_ARC = 54;
const R_BODY = 41;
/** Where the grab handle rides, and the radius every scripted drag target sits on. */
const R_GRIP = 28;
/** Strokes are drawn at 2px or more: the stage reads anything thinner as absent. */
const RULE = 2;

interface Geometry {
  /** The angle, in degrees clockwise from straight up, that zero sits at. */
  start: number;
  sweep: number;
  /** Detent size in value units, or zero for a continuous sweep. */
  snap: number;
  /** An endless encoder reports relative change and wraps rather than stopping. */
  endless: boolean;
  ticks: number;
  note: string;
}

const GEOMETRY: Record<string, Geometry> = {
  continuous: {
    start: -135,
    sweep: 270,
    snap: 0,
    endless: false,
    ticks: 11,
    note: 'A bounded sweep: 270 degrees with a gap at the bottom, so both end stops are visible.',
  },
  stepped: {
    start: -135,
    sweep: 270,
    snap: 10,
    endless: false,
    ticks: 11,
    note: 'Detents make a knob usable without reading the number, which is why hardware has them.',
  },
  endless: {
    start: -180,
    sweep: 360,
    snap: 0,
    endless: true,
    ticks: 12,
    note: 'An endless encoder reports how far you turned, not where you stopped, so it never ends.',
  },
};

const MODES = ['continuous', 'stepped', 'endless'];
const START = 'continuous';
const START_VALUE = 40;

const band = (value: number) => (value < 36 ? 'low' : value > 64 ? 'high' : 'mid');

/** Drag destinations, as angles: a scripted turn has to land somewhere nameable. */
const STOPS = [
  { key: 'hi', angle: 100 },
  { key: 'mid', angle: 20 },
  { key: 'lo', angle: -85 },
];

const polar = (r: number, deg: number): { x: number; y: number } => {
  const a = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
};

const point = (r: number, deg: number): string => {
  const { x, y } = polar(r, deg);
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
};

const arc = (r: number, from: number, to: number): string => {
  const delta = to - from;
  if (Math.abs(delta) < 0.3) return '';
  const large = Math.abs(delta) > 180 ? 1 : 0;
  return `M ${point(r, from)} A ${r} ${r} 0 ${large} ${delta > 0 ? 1 : 0} ${point(r, Math.min(to, from + 359.4))}`;
};

const tickMarks = (geo: Geometry): string =>
  Array.from({ length: geo.ticks }, (_, i) => {
    // An endless scale closes on itself, so its last notch must not land on its first.
    const span = geo.endless ? geo.sweep - geo.sweep / geo.ticks : geo.sweep;
    const at = geo.start + (i / (geo.ticks - 1 || 1)) * span;
    const inner = polar(R_TICK_IN, at);
    const outer = polar(R_TICK_OUT, at);
    return `<line
      x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}"
      x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}"
      stroke="var(--sp-muted)" stroke-width="${geo.snap ? 3 : RULE}" stroke-linecap="round"
    />`;
  }).join('');

/**
 * Knob specimen: one rotary control with a value arc, a printed scale, and a read-out,
 * turned by dragging its handle around the arc, with a picker for the three behaviours a
 * knob can have: a bounded continuous sweep, the same sweep stepped into detents, and an
 * endless encoder that reports relative change and never reaches an end.
 *
 * The subject is the knob, `data-part="knob"`: the body, the pointer line, the handle and
 * the value arc that reads back the angle. The printed scale around it is a term of its
 * own (tick marks), so the notches and the empty track sit in the context register along
 * with the read-out and the picker.
 *
 * The turn is resolved by coordinate: every pointer move is converted to an angle about
 * the knob's centre, which is what makes the scripted drag a real turn rather than a
 * flipped state. That is also why the handle carries no `data-aim`: the ghost cursor's
 * events have to land where they are drawn. Bounded modes read the pointer's angle
 * absolutely; the endless mode accumulates the change between moves, which is exactly the
 * difference between a knob that has a position and one that only has a direction. All
 * three are honest knobs, so no pose condition is needed (SPEC §6), and nothing outside
 * the SVG moves when the value does (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const first = GEOMETRY[START] as Geometry;

  const stops = STOPS.map(({ key, angle }) => {
    const at = polar(R_GRIP, angle);
    return `<circle
        data-part="stop-${key}" aria-hidden="true"
        cx="${at.x.toFixed(2)}" cy="${at.y.toFixed(2)}" r="5"
        fill="var(--sp-accent)" fill-opacity="0" style="pointer-events: none"
      />`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Bus compressor</span>
          <span class="sp-label" style="font-size: 12px">Insert 2</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            class="sp-surface"
            style="display: flex; align-items: center; justify-content: center; gap: 18px; width: 320px; padding: 10px 14px"
          >
            <svg
              data-part="dial"
              viewBox="0 0 ${SIZE} ${SIZE}"
              width="${SIZE}"
              height="${SIZE}"
              style="display: block; flex: 0 0 auto; touch-action: none"
            >
              <g class="sp-context">
                <path
                  data-part="track-arc"
                  d="${arc(R_ARC, first.start, first.start + first.sweep)}"
                  fill="none" stroke="var(--sp-line)" stroke-width="6" stroke-linecap="round"
                />
                <circle
                  data-part="track-ring"
                  cx="${CX}" cy="${CY}" r="${R_ARC}"
                  fill="none" stroke="var(--sp-line)" stroke-width="6"
                  hidden
                />
                <g data-part="ticks">${tickMarks(first)}</g>
              </g>

              ${stops}

              <g data-part="knob" data-subject data-mode="${START}">
                <path data-part="value-arc" d="" fill="none" stroke="var(--sp-accent)" stroke-width="6" stroke-linecap="round" />
                <circle cx="${CX}" cy="${CY}" r="${R_BODY}" fill="var(--sp-surface)" stroke="var(--sp-line)" stroke-width="${RULE}" />
                <line data-part="pointer" x1="0" y1="0" x2="0" y2="0" stroke="var(--sp-accent)" stroke-width="3" stroke-linecap="round" />
                <circle
                  data-part="grip"
                  role="slider"
                  aria-label="Mix"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  cx="0" cy="0" r="7"
                  fill="var(--sp-accent)"
                  style="cursor: grab; touch-action: none"
                />
              </g>
            </svg>

            <div class="sp-stack sp-context" style="gap: 2px; width: 96px">
              <span class="sp-label" style="font-size: 11px">Mix</span>
              <span
                data-part="readout"
                data-value="${START_VALUE}"
                data-band="${band(START_VALUE)}"
                data-mode="${START}"
                role="status"
                style="font-size: 30px; font-weight: 600; line-height: 1.1; font-variant-numeric: tabular-nums"
              >${START_VALUE}%</span>
              <span class="sp-label" data-part="behaviour" style="font-size: 11px; white-space: nowrap">Bounded sweep</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented class="sp-segmented" data-part="picker" data-value="${START}">
          <button class="sp-segment" type="button" data-part="seg-continuous" value="continuous" style="padding: 4px 10px; font-size: 12px">Continuous</button>
          <button class="sp-segment" type="button" data-part="seg-stepped" value="stepped" style="padding: 4px 10px; font-size: 12px">Stepped</button>
          <button class="sp-segment" type="button" data-part="seg-endless" value="endless" style="padding: 4px 10px; font-size: 12px">Endless</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-mode="${START}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${first.note}</span>
      </div>
    </div>
  `;

  const dial = part(root, 'dial');
  const knob = part(root, 'knob');
  const valueArc = part(root, 'value-arc');
  const pointerLine = part(root, 'pointer');
  const grip = part(root, 'grip');
  const trackArc = part(root, 'track-arc');
  const trackRing = part(root, 'track-ring');
  const ticks = part(root, 'ticks');
  const readout = part(root, 'readout');
  const behaviour = part(root, 'behaviour');
  const note = part(root, 'note');

  const BEHAVIOUR: Record<string, string> = {
    continuous: 'Bounded sweep',
    stepped: 'Ten detents',
    endless: 'Relative, no stops',
  };

  let mode = START;
  let value = START_VALUE;
  let held = false;
  /** The last angle the pointer was at, which is all an endless encoder can use. */
  let lastAngle = 0;

  const geo = () => GEOMETRY[mode] as Geometry;

  const draw = () => {
    const g = geo();
    const at = g.start + (value / 100) * g.sweep;
    valueArc.setAttribute('d', arc(R_ARC, g.start, at));
    const inner = polar(12, at);
    const outer = polar(R_GRIP, at);
    pointerLine.setAttribute('x1', inner.x.toFixed(2));
    pointerLine.setAttribute('y1', inner.y.toFixed(2));
    pointerLine.setAttribute('x2', outer.x.toFixed(2));
    pointerLine.setAttribute('y2', outer.y.toFixed(2));
    const handle = polar(R_GRIP, at);
    grip.setAttribute('cx', handle.x.toFixed(2));
    grip.setAttribute('cy', handle.y.toFixed(2));
    const shown = Math.round(value);
    grip.setAttribute('aria-valuenow', String(shown));
    readout.dataset.value = String(shown);
    readout.dataset.band = band(shown);
    readout.textContent = `${shown}%`;
  };

  const setValue = (next: number) => {
    const g = geo();
    let v = next;
    if (g.endless) v = ((v % 100) + 100) % 100;
    else v = Math.max(0, Math.min(100, v));
    if (g.snap) v = Math.round(v / g.snap) * g.snap;
    value = v;
    draw();
  };

  const setMode = (next: string) => {
    if (!MODES.includes(next)) return;
    mode = next;
    const g = geo();
    knob.dataset.mode = next;
    readout.dataset.mode = next;
    note.dataset.mode = next;
    note.textContent = g.note;
    behaviour.textContent = BEHAVIOUR[next] ?? '';
    ticks.innerHTML = tickMarks(g);
    trackArc.setAttribute('d', arc(R_ARC, g.start, g.start + g.sweep));
    if (g.endless) {
      trackArc.setAttribute('hidden', '');
      trackRing.removeAttribute('hidden');
    } else {
      trackRing.setAttribute('hidden', '');
      trackArc.removeAttribute('hidden');
    }
    setValue(value);
  };

  /** The pointer's angle about the knob's centre, in degrees clockwise from straight up. */
  const angleAt = (event: PointerEvent) => {
    const box = dial.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  };

  const turn = (event: PointerEvent) => {
    const g = geo();
    const a = angleAt(event);
    if (g.endless) {
      // Only the change between moves is meaningful, taken the short way round.
      const delta = (((a - lastAngle + 540) % 360) - 180) / g.sweep;
      lastAngle = a;
      setValue(value + delta * 100);
      return;
    }
    const clamped = Math.max(g.start, Math.min(g.start + g.sweep, a));
    setValue(((clamped - g.start) / g.sweep) * 100);
  };

  grip.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) grip.setPointerCapture((event as PointerEvent).pointerId);
    held = true;
    lastAngle = angleAt(event as PointerEvent);
    grip.setAttribute('r', '8');
  });

  root.addEventListener('pointermove', (event) => {
    if (held) turn(event as PointerEvent);
  });

  const release = (event: Event) => {
    if (!held) return;
    held = false;
    grip.setAttribute('r', '7');
    turn(event as PointerEvent);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'picker').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode(START);
}
