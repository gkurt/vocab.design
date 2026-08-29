import { flag, part } from '#src/kit/parts.ts';

const SIZE = 96;
const STROKE = 9;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

/** The twin's arc: a quarter lap that never grows, because it is measuring nothing. */
const TWIN = 64;
const TWIN_STROKE = 8;
const TWIN_R = (TWIN - TWIN_STROKE) / 2;
const TWIN_C = 2 * Math.PI * TWIN_R;

const STEPS = [25, 60, 100];
const START = 25;

/**
 * Progress ring specimen: an export reporting itself around a circle, beside the
 * indeterminate twin it is constantly mistaken for. The subject is the ring widget,
 * the track with its arc and the number inside it, since the percentage in the middle
 * is part of what the term names; the panel, the buttons and the twin are scenery.
 *
 * Each control lands on an absolute value rather than adding to whatever it finds
 * (SPEC §8), so a pass picked up anywhere reads the same. The arc is drawn the way
 * every implementation draws it: one lap of dash, walked around by `stroke-dashoffset`.
 *
 * The twin is the kit's `.sp-pending` pulse rather than a scripted rotation, which
 * keeps the one endless animation on stage answerable to reduced motion and to the
 * stage's own pause (SPEC §5). Nothing moves as the value changes: the readout is a
 * fixed box and the arc only redraws inside the track it already occupies.
 */
export function mount(root: HTMLElement): void {
  const buttons = STEPS.map(
    (value) => `
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="set-${value}" data-value="${value}">${value}%</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Export</span>
          <span class="sp-label">archive.zip</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 14px">
          <div class="sp-row" style="justify-content: space-around; gap: 12px">
            <div class="sp-stack" style="align-items: center; gap: 8px">
              <div
                data-part="ring"
                data-subject
                role="progressbar"
                aria-label="Export"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${START}"
                style="position: relative; width: ${SIZE}px; height: ${SIZE}px; flex: 0 0 auto"
              >
                <svg viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" aria-hidden="true" style="display: block">
                  <g transform="rotate(-90 ${SIZE / 2} ${SIZE / 2})">
                    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${R}" fill="none" stroke="var(--sp-sunken)" stroke-width="${STROKE}" />
                    <circle
                      data-part="arc"
                      cx="${SIZE / 2}"
                      cy="${SIZE / 2}"
                      r="${R}"
                      fill="none"
                      stroke="var(--sp-accent)"
                      stroke-width="${STROKE}"
                      stroke-linecap="round"
                      stroke-dasharray="${C.toFixed(2)}"
                      stroke-dashoffset="${(C * (1 - START / 100)).toFixed(2)}"
                      style="transition: stroke-dashoffset 0.42s var(--sp-ease)"
                    />
                  </g>
                </svg>
                <span
                  data-part="readout"
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                         font-size: 19px; font-weight: 600; font-variant-numeric: tabular-nums"
                >${START}%</span>
              </div>
              <span class="sp-label sp-context">Determinate</span>
            </div>
            <div class="sp-stack sp-context" style="align-items: center; gap: 8px">
              <svg
                data-part="twin"
                class="sp-pending"
                viewBox="0 0 ${TWIN} ${TWIN}"
                width="${TWIN}"
                height="${TWIN}"
                role="img"
                aria-label="Working"
                style="display: block; margin: ${(SIZE - TWIN) / 2}px 0"
              >
                <g transform="rotate(-90 ${TWIN / 2} ${TWIN / 2})">
                  <circle cx="${TWIN / 2}" cy="${TWIN / 2}" r="${TWIN_R}" fill="none" stroke="var(--sp-sunken)" stroke-width="${TWIN_STROKE}" />
                  <circle
                    cx="${TWIN / 2}"
                    cy="${TWIN / 2}"
                    r="${TWIN_R}"
                    fill="none"
                    stroke="var(--sp-accent)"
                    stroke-width="${TWIN_STROKE}"
                    stroke-linecap="round"
                    stroke-dasharray="${(TWIN_C * 0.26).toFixed(2)} ${TWIN_C.toFixed(2)}"
                  />
                </g>
              </svg>
              <span class="sp-label">Indeterminate</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="justify-content: center; gap: 8px">${buttons}</div>
          <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 0; text-align: center; font-size: 12px">
            The arc needs a denominator. Without one, the twin is the honest control.
          </p>
        </div>
      </div>
    </div>
  `;

  const ring = part(root, 'ring');
  const arc = part(root, 'arc');
  const readout = part(root, 'readout');

  const set = (value: number) => {
    ring.setAttribute('aria-valuenow', String(value));
    ring.dataset.value = String(value);
    arc.setAttribute('stroke-dashoffset', (C * (1 - value / 100)).toFixed(2));
    readout.textContent = `${value}%`;
    for (const step of STEPS) flag(part(root, `set-${step}`), 'data-selected', step === value);
  };

  for (const step of STEPS) {
    part(root, `set-${step}`).addEventListener('click', () => set(step));
  }

  set(START);
}
