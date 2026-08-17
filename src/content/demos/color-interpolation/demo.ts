import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One pair of endpoints, held for every mode: only the route between them changes. */
const FROM = 'oklch(0.55 0.19 264)';
const TO = 'oklch(0.85 0.155 95)';
const FROM_HUE = 264;
const TO_HUE = 95;

type Mode = { key: string; label: string; method: string; note: string; path: string; chord: boolean };

const DEG = Math.PI / 180;
const R = 33;
const at = (h: number): [number, number] => [50 + R * Math.cos(h * DEG), 50 - R * Math.sin(h * DEG)];
const point = (h: number) =>
  at(h)
    .map((n) => n.toFixed(1))
    .join(',');

/** The travelled arc, sampled rather than drawn with an SVG sweep, so the direction is explicit. */
const arc = (from: number, to: number) => Array.from({ length: 41 }, (_, i) => point(from + ((to - from) * i) / 40)).join(' ');

const MODES: Mode[] = [
  {
    key: 'srgb',
    label: 'sRGB',
    method: 'in srgb',
    note: 'the middle lands on grey',
    path: `${point(FROM_HUE)} ${point(TO_HUE)}`,
    chord: true,
  },
  {
    key: 'shorter',
    label: 'Shorter',
    method: 'in oklch shorter hue',
    note: 'the smaller arc, through cyan',
    path: arc(FROM_HUE, TO_HUE),
    chord: false,
  },
  {
    key: 'longer',
    label: 'Longer',
    method: 'in oklch longer hue',
    note: 'the long way, through magenta',
    path: arc(FROM_HUE, TO_HUE + 360),
    chord: false,
  },
];

const START = 'srgb';

const ramp = (method: string) => `linear-gradient(to right ${method}, ${FROM}, ${TO})`;

/** The hue circle itself, kept inside sRGB so the diagram is not quietly being mapped. */
const WHEEL = `conic-gradient(${Array.from({ length: 25 }, (_, i) => `oklch(0.72 0.12 ${(90 - i * 15 + 360) % 360}) ${i * 15}deg`).join(', ')})`;

/**
 * Colour interpolation specimen: one gradient between one pair of endpoints, rendered three
 * ways. The wheel beside it draws the route each method takes, which is the part a ramp
 * alone cannot show: the sRGB blend leaves the wheel and crosses the middle, where the
 * colours cancel, while the two OKLCH blends stay on the rim and differ only in which way
 * round they go.
 *
 * The subject is the ramp, the element whose interpolation is being changed. The wheel, the
 * method readout and the picker are instrumentation and sit in the context register
 * (SPEC §5). Every mode is an honest interpolation, so no state needs a `data-pose`.
 *
 * The ramp holds one fixed box and only its background image changes, so switching methods
 * moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = MODES.find((m) => m.key === START) ?? MODES[0];
  if (!start) return;

  const [fromX, fromY] = at(FROM_HUE);
  const [toX, toY] = at(TO_HUE);
  const mid: [number, number] = [(fromX + toX) / 2, (fromY + toY) / 2];

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Interpolation</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            ${MODES.map((m) => `<button class="sp-segment" data-part="seg-${m.key}" value="${m.key}">${m.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
            <div data-part="ramp" data-subject data-mode="${START}"
                 style="height: 62px; border-radius: 6px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35);
                        background-image: ${ramp(start.method)}"></div>
            <div class="sp-row sp-row--between sp-context" style="gap: 8px">
              <span class="sp-text sp-text--ink" data-part="method" style="font-size: 11px">${start.method}</span>
              <span class="sp-text" data-part="note" style="font-size: 10.5px">${start.note}</span>
            </div>
            <div class="sp-row sp-row--between sp-context" style="gap: 8px">
              <span class="sp-text" style="font-size: 10px">${FROM}</span>
              <span class="sp-text" style="font-size: 10px">${TO}</span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; align-items: center">
            <div data-part="wheel" style="position: relative; width: 92px; height: 92px; border-radius: 50%;
                 background-image: ${WHEEL}">
              <svg viewBox="0 0 100 100" style="position: absolute; inset: 0; width: 100%; height: 100%" aria-hidden="true">
                <polyline data-part="route" points="${start.path}" fill="none" stroke="var(--sp-ink)" stroke-width="3.5"
                          stroke-linecap="round" stroke-linejoin="round"></polyline>
                <circle data-part="mid" cx="${mid[0].toFixed(1)}" cy="${mid[1].toFixed(1)}" r="4.5"
                        fill="#8a8a8a" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="${fromX.toFixed(1)}" cy="${fromY.toFixed(1)}" r="5"
                        fill="${FROM}" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="${toX.toFixed(1)}" cy="${toY.toFixed(1)}" r="5"
                        fill="${TO}" stroke="#ffffff" stroke-width="2"></circle>
              </svg>
            </div>
            <span class="sp-label" style="font-size: 10px">Route taken</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The same two endpoints every time. Only the route changes: which space the blend is walked in, and which way
          round the hue wheel it goes.
        </p>
      </div>
    </div>
  `;

  const rampEl = part(root, 'ramp');
  const route = part(root, 'route');
  const midDot = part(root, 'mid');

  const show = (key: string) => {
    const mode = MODES.find((m) => m.key === key);
    if (!mode) return;
    rampEl.dataset.mode = key;
    rampEl.style.backgroundImage = ramp(mode.method);
    route.setAttribute('points', mode.path);
    route.setAttribute('stroke-dasharray', mode.chord ? '7 5' : 'none');
    // The grey midpoint belongs to the chord: an arc never passes through the neutral axis.
    if (mode.chord) midDot.removeAttribute('hidden');
    else midDot.setAttribute('hidden', '');
    part(root, 'method').textContent = mode.method;
    part(root, 'note').textContent = mode.note;
  };
  show(START);

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
