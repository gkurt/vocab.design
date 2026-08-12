import { part } from '#src/kit/parts.ts';

type Stop = { key: string; hex: string; pos: number };

/** Three stops, the middle one the term points at. */
const STOPS: Stop[] = [
  { key: 'a', hex: '#1D63D2', pos: 0 },
  { key: 'b', hex: '#C0459B', pos: 50 },
  { key: 'c', hex: '#F2B23A', pos: 100 },
];

/** Positions the rail is labelled at, and the only places a scripted drag ends. */
const TICKS = [25, 50, 75];

/** The gap a stop keeps from its neighbours, so dragging can never reorder the list. */
const MARGIN = 10;

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

/** Multiples of five, so a drag that lands on a tick reports that tick's position. */
const snap = (pct: number) => Math.round(pct / 5) * 5;

/**
 * Colour stop specimen: a gradient built from three stops, each drawn as a marker standing
 * at its own position, with the middle one draggable to stated positions along the rail.
 *
 * The subject is the middle marker, not the strip. The strip is the gradient, which is a
 * term of its own, and a stop is one colour pinned at one place in it: the marker is the
 * smallest thing here that is that pin, which is why it stands on the strip rather than
 * beside it. Markers move within a rail of fixed height and the readout is fixed width, so
 * dragging one repaints the fill and moves nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  // Positions are mount-local: a remount is the reset (SPEC §6), so the list the demo
  // moves around must not be the module's own copy.
  const stops: Stop[] = STOPS.map((stop) => ({ ...stop }));

  const markers = stops
    .map(
      ({ key, hex, pos }) => `
      <button data-part="stop-${key}" data-pos="${pos}" ${key === 'b' ? 'data-subject' : ''} type="button" aria-label="Stop ${key}"
              style="position: absolute; left: ${pos}%; top: -20px; translate: -50% 0; display: flex; flex-direction: column;
                     align-items: center; gap: 0; padding: 0; border: 0; background: transparent; cursor: grab; touch-action: none">
        <span style="width: 2px; height: 18px; background: var(--sp-ink)"></span>
        <span data-part="knob-${key}"
              style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--sp-surface);
                     box-shadow: 0 0 0 1px var(--sp-ink); background: ${hex}"></span>
      </button>`,
    )
    .join('');

  const ticks = TICKS.map(
    (pct) => `
      <span class="sp-label" data-part="tick-${pct}" style="position: absolute; left: ${pct}%; translate: -50% 0; font-size: 11px">${pct}%</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Stops</span>
          <span class="sp-text sp-text--ink" data-part="readout" style="width: 150px; text-align: right; font-size: 12px">&nbsp;</span>
        </div>

        <div style="margin-top: 12px">
          <div data-part="strip" style="height: 64px; border-radius: var(--sp-radius)"></div>
          <div data-part="rail" style="position: relative; height: 24px; margin-top: 14px">${markers}</div>
          <div class="sp-context" style="position: relative; height: 14px">${ticks}</div>
        </div>

        <p class="sp-text sp-context" style="margin: 12px 0 0">
          A bare percentage between two stops is an interpolation hint, not a stop: it moves the halfway mixture without pinning a colour.
        </p>
      </div>
    </div>
  `;

  const strip = part(root, 'strip');
  const rail = part(root, 'rail');
  const readout = part(root, 'readout');
  const handles = stops.map((stop) => ({ stop, el: part(root, `stop-${stop.key}`) }));

  let selected = 'b';

  const paint = () => {
    strip.style.background = `linear-gradient(90deg, ${stops.map((s) => `${s.hex} ${s.pos}%`).join(', ')})`;
    for (const { stop, el } of handles) {
      el.style.left = `${stop.pos}%`;
      el.dataset.pos = String(stop.pos);
      if (stop.key === selected) el.setAttribute('data-selected', '');
      else el.removeAttribute('data-selected');
      part(root, `knob-${stop.key}`).style.boxShadow = stop.key === selected ? '0 0 0 2px var(--sp-ink)' : '0 0 0 1px var(--sp-ink)';
    }
    const shown = stops.find((s) => s.key === selected);
    readout.textContent = shown ? `${shown.hex} at ${shown.pos}%` : '';
  };
  paint();

  let dragging: Stop | undefined;

  const move = (event: PointerEvent) => {
    const stop = dragging;
    if (!stop) return;
    const rect = rail.getBoundingClientRect();
    if (rect.width === 0) return;
    const index = stops.indexOf(stop);
    const low = index === 0 ? 0 : (stops[index - 1]?.pos ?? 0) + MARGIN;
    const high = index === stops.length - 1 ? 100 : (stops[index + 1]?.pos ?? 100) - MARGIN;
    stop.pos = clamp(snap(((event.clientX - rect.left) / rect.width) * 100), low, high);
    paint();
  };

  for (const { stop, el } of handles) {
    el.addEventListener('pointerdown', (event) => {
      selected = stop.key;
      dragging = stop;
      paint();
      move(event);
    });
  }

  root.addEventListener('pointermove', move);

  const release = () => {
    dragging = undefined;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
