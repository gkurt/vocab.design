import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The two viewports every step interpolates between. */
const MIN_VW = 360;
const MAX_VW = 1200;

interface Step {
  key: string;
  label: string;
  min: number;
  max: number;
}

/** One ramp, six rungs, each with a value at the minimum viewport and one at the maximum. */
const STEPS: Step[] = [
  { key: 'xs', label: 'xs', min: 8, max: 12 },
  { key: 's', label: 's', min: 12, max: 18 },
  { key: 'm', label: 'm', min: 18, max: 28 },
  { key: 'l', label: 'l', min: 28, max: 44 },
  { key: 'xl', label: 'xl', min: 44, max: 70 },
  { key: 'xxl', label: '2xl', min: 72, max: 116 },
];

const VIEWPORTS = [
  { key: 'narrow', width: MIN_VW },
  { key: 'mid', width: 768 },
  { key: 'wide', width: MAX_VW },
];

const BAND_HEIGHT = 16;
const ROW_GAP = 14;

/**
 * Fluid space scale specimen: six space steps drawn at their real size, with the viewport
 * width picked absolutely. Every band is exactly as many pixels wide as the gap it stands for,
 * so the ramp is measured rather than illustrated, and changing the viewport moves all six at
 * once rather than stepping one of them at a breakpoint.
 *
 * A gap has no element of its own, so the demo draws one per step and the subject is the ramp
 * those bands make: `data-part="ramp"` holds the six bands and nothing else, sized to their own
 * extent by `width: fit-content` rather than to the panel they sit in (SPEC §5). The labels and
 * the computed values are absolutely placed either side of it, so the ramp can grow without
 * moving them (SPEC §5); the frame, the picker and the caption are scenery in the context
 * register.
 *
 * `data-moved` is the claim: after every pick the demo compares all six computed values with
 * the ones they had and says whether every step moved, some did, or none did. A ramp that
 * stepped at breakpoints instead of interpolating would leave most of them where they were and
 * the attribute would read `some`. The values are computed, never read back off the elements,
 * because the bands animate their width and a measurement taken after a style write would
 * return the old one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const labels = STEPS.map(
    (step) => `
      <span class="sp-label" style="height: ${BAND_HEIGHT}px; line-height: ${BAND_HEIGHT}px; font-size: 11px; text-align: right">${step.label}</span>`,
  ).join('');

  const bands = STEPS.map(
    (step) => `
      <div
        data-part="band-${step.key}"
        style="width: ${step.min}px; height: ${BAND_HEIGHT}px; border-radius: 3px; background: var(--sp-accent);
               transition: width 0.4s var(--sp-ease)"
      ></div>`,
  ).join('');

  const values = STEPS.map(
    (step) => `
      <span class="sp-label" data-part="value-${step.key}" style="height: ${BAND_HEIGHT}px; line-height: ${BAND_HEIGHT}px; font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">${step.min}px</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented class="sp-segmented" data-part="viewports" data-value="narrow">
            ${VIEWPORTS.map(
              (viewport) => `
              <button class="sp-segment" type="button" data-part="seg-${viewport.key}" value="${viewport.key}" style="padding: 4px 11px; font-size: 11px">${viewport.width}px</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 12px">
          <div style="position: relative; width: 260px; height: ${STEPS.length * BAND_HEIGHT + (STEPS.length - 1) * ROW_GAP}px">
            <div class="sp-stack sp-context" style="position: absolute; top: 0; left: 0; width: 26px; gap: ${ROW_GAP}px">${labels}</div>

            <div
              data-part="ramp"
              data-subject
              data-viewport="narrow"
              data-moved="rest"
              style="position: absolute; top: 0; left: 36px; display: flex; flex-direction: column; align-items: flex-start;
                     gap: ${ROW_GAP}px; width: fit-content"
            >${bands}</div>

            <div class="sp-stack sp-context" style="position: absolute; top: 0; right: 0; width: 54px; gap: ${ROW_GAP}px">${values}</div>
          </div>

          <span class="sp-label sp-context" style="font-size: 11px; letter-spacing: 0.02em">space-m: clamp(1.125rem, 0.857rem + 1.19vw, 1.75rem)</span>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const ramp = part(root, 'ramp');
  const note = part(root, 'note');
  const bandEls = STEPS.map((step) => part(root, `band-${step.key}`));
  const valueEls = STEPS.map((step) => part(root, `value-${step.key}`));

  /** One step's value at a given viewport: the floor, the ceiling, and a straight line between. */
  const at = (step: Step, width: number) => {
    const t = Math.min(Math.max((width - MIN_VW) / (MAX_VW - MIN_VW), 0), 1);
    return Math.round(step.min + (step.max - step.min) * t);
  };

  let previous: number[] | null = null;

  const apply = (key: string) => {
    const viewport = VIEWPORTS.find((entry) => entry.key === key);
    if (!viewport) return;
    const next = STEPS.map((step) => at(step, viewport.width));
    for (const [i, band] of bandEls.entries()) band.style.width = `${next[i]}px`;
    for (const [i, value] of valueEls.entries()) value.textContent = `${next[i]}px`;
    ramp.dataset.viewport = viewport.key;
    // Computed, never measured: the bands animate their width, so a read taken now would
    // return the width they are leaving rather than the one they are going to.
    const changed = previous ? next.filter((value, i) => value !== previous?.[i]).length : 0;
    ramp.dataset.moved = previous ? (changed === next.length ? 'all' : changed > 0 ? 'some' : 'none') : 'rest';
    note.textContent =
      viewport.width <= MIN_VW
        ? `At ${viewport.width}px every step sits on its floor, and none of them goes lower.`
        : viewport.width >= MAX_VW
          ? `At ${viewport.width}px every step sits at its ceiling, and none of them goes higher.`
          : `At ${viewport.width}px every step is part way up its own ramp, none of them stepped.`;
    previous = next;
  };

  part(root, 'viewports').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('narrow');
}
