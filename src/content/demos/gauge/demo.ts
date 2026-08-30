import { flag, part } from '#src/kit/parts.ts';

const W = 208;
const H = 120;
const CX = 104;
const CY = 104;
const R = 84;
const BAND = 10;
const NEEDLE = 58;

/**
 * The third band's colour is the demo's own claim: the kit keeps one accent and one
 * warn hue on purpose (SPEC §5), and a dial that runs out of zones at "warn" cannot
 * show the reading its own article is about. Chosen to read against both surfaces.
 */
const CRITICAL = '#d0473a';

const ZONES = [
  { from: 0, to: 70, zone: 'ok', word: 'Nominal', color: 'var(--sp-accent)' },
  { from: 70, to: 88, zone: 'warn', word: 'Elevated', color: 'var(--sp-warn)' },
  { from: 88, to: 100, zone: 'critical', word: 'Critical', color: CRITICAL },
] as const;

/** The zone a reading past the top of the scale still belongs to. */
const TOP_ZONE = ZONES[2];

const STEPS = [35, 72, 94];
const START = 35;

/** 0 sits at the left end of the semicircle, 100 at the right: half a turn of range. */
const radians = (value: number) => ((180 + value * 1.8) * Math.PI) / 180;
const point = (value: number, radius: number): [number, number] => [
  CX + radius * Math.cos(radians(value)),
  CY + radius * Math.sin(radians(value)),
];

const arc = (from: number, to: number, radius: number) => {
  const [x0, y0] = point(from, radius);
  const [x1, y1] = point(to, radius);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${radius} ${radius} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

const zoneOf = (value: number) => ZONES.find((z) => value <= z.to) ?? TOP_ZONE;
const rotation = (value: number) => value * 1.8 - 90;

/**
 * Gauge specimen: a dial reporting disk pressure on a semicircular scale, with ruled
 * ticks, three zones drawn on the arc, and a needle that lands on the value.
 *
 * The subject is the gauge itself, the scale and needle together with the number and
 * the status word beneath them, since a reading nobody can name is the abuse the
 * article warns about: colour is never the only thing carrying the verdict here. The
 * window and the buttons are scenery.
 *
 * A caption under the frame used to read "A dial measures a range. It never finishes.",
 * which is the article's definition standing beside the thing it defines, so it went.
 *
 * Each control names an absolute value rather than nudging whatever it finds (SPEC §8),
 * so a pass picked up anywhere reads the same. The needle's transition is a plain CSS
 * one, which is what puts it under the kit's reduced-motion rule for free. Nothing
 * moves as the value changes: the readout is a fixed box and the needle turns inside
 * the dial it already occupies (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const bands = ZONES.map(
    (z) => `
      <path
        d="${arc(z.from, z.to, R)}"
        fill="none"
        stroke="${z.color}"
        stroke-opacity="0.32"
        stroke-width="${BAND}"
      />`,
  ).join('');

  const ticks = Array.from({ length: 21 }, (_, i) => {
    const value = i * 5;
    const major = value % 25 === 0;
    const [x0, y0] = point(value, R - BAND / 2 - 3);
    const [x1, y1] = point(value, major ? 63 : 70);
    return `<line
        x1="${x0.toFixed(2)}" y1="${y0.toFixed(2)}" x2="${x1.toFixed(2)}" y2="${y1.toFixed(2)}"
        stroke="var(--sp-muted)" stroke-width="${major ? 2 : 1.2}" stroke-linecap="round"
      />`;
  }).join('');

  const buttons = STEPS.map(
    (value) => `
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="set-${value}">${value}%</button>`,
  ).join('');

  const first = zoneOf(START);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Cluster health</span>
          <span class="sp-label">node-04</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 14px; align-items: center; justify-content: center">
          <div
            data-part="gauge"
            data-subject
            data-value="${START}"
            data-zone="${first.zone}"
            role="meter"
            aria-label="Disk pressure"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${START}"
            style="display: flex; flex-direction: column; align-items: center; gap: 2px"
          >
            <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" style="display: block">
              <path d="${arc(0, 100, R)}" fill="none" stroke="var(--sp-sunken)" stroke-width="${BAND}" />
              ${bands}
              ${ticks}
              <text x="${CX - R}" y="${H - 3}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">0</text>
              <text x="${CX + R}" y="${H - 3}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">100</text>
              <g
                data-part="needle"
                style="transform-box: view-box; transform-origin: ${CX}px ${CY}px;
                       transform: rotate(${rotation(START)}deg); transition: transform 0.5s var(--sp-ease)"
              >
                <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - NEEDLE}" stroke="var(--sp-ink)" stroke-width="3" stroke-linecap="round" />
              </g>
              <circle cx="${CX}" cy="${CY}" r="6" fill="var(--sp-ink)" />
              <circle cx="${CX}" cy="${CY}" r="2.4" fill="var(--sp-surface)" />
            </svg>
            <div class="sp-row" style="gap: 8px; justify-content: center">
              <span
                data-part="readout"
                style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.1"
              >${START}%</span>
              <span
                data-part="status"
                style="width: 76px; font-size: 12px; font-weight: 600; color: ${first.color}"
              >${first.word}</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 8px; justify-content: center">${buttons}</div>
        </div>
      </div>
    </div>
  `;

  const gauge = part(root, 'gauge');
  const needle = part(root, 'needle');
  const readout = part(root, 'readout');
  const status = part(root, 'status');

  const set = (value: number) => {
    const zone = zoneOf(value);
    gauge.dataset.value = String(value);
    gauge.dataset.zone = zone.zone;
    gauge.setAttribute('aria-valuenow', String(value));
    needle.style.transform = `rotate(${rotation(value)}deg)`;
    readout.textContent = `${value}%`;
    status.textContent = zone.word;
    status.style.color = zone.color;
    for (const step of STEPS) flag(part(root, `set-${step}`), 'data-selected', step === value);
  };

  for (const step of STEPS) {
    part(root, `set-${step}`).addEventListener('click', () => set(step));
  }

  set(START);
}
