import { icon } from '#src/kit/icons.ts';

/**
 * Hand-drawn UI specimen: the same little form twice, sketched on the left and finished on
 * the right, so the wobble reads as a register rather than as a mistake. Every sketched
 * outline is two overlapping passes of a bowed, jittered path, which is what a pen doing
 * the same job twice actually leaves behind.
 *
 * The jitter comes from a seeded generator with a fixed seed per shape, never from
 * Math.random: the specimen has to look identical on every run for the identify still to
 * mean anything.
 *
 * The paint is inline because the look is the term. The kit draws one crisp line weight and
 * one radius on purpose, and a sketch assembled from kit classes would be demonstrating the
 * kit rather than the register.
 *
 * The subject is the sketched button, not the card and not the poster: the term names a way
 * of drawing a control, and the button is the narrowest control here that is drawn that way
 * (SPEC §5). The finished column, the labels and the caption are scenery.
 *
 * Static: a sketch has no states, so there is nothing to animate and no clock to take.
 */
const PAPER = '#fffdf6';
const PEN = '#2f2c33';
const PENCIL = '#8d8a93';
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', 'Chalkboard SE', cursive";

/** Deterministic jitter: the same seed draws the same wobble on every mount. */
function jitter(seed: number): (amount: number) => number {
  let state = (seed * 2654435761) >>> 0;
  return (amount: number) => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return (state / 4294967296 - 0.5) * amount * 2;
  };
}

type Point = { x: number; y: number };

/** One pass of a pen around a box: corners nudged, each edge bowed by its own control point. */
function pass(w: number, h: number, wob: (amount: number) => number, amount: number): string {
  const pts: Point[] = [
    { x: 1.5 + wob(amount), y: 1.5 + wob(amount) },
    { x: w - 1.5 + wob(amount), y: 1.5 + wob(amount) },
    { x: w - 1.5 + wob(amount), y: h - 1.5 + wob(amount) },
    { x: 1.5 + wob(amount), y: h - 1.5 + wob(amount) },
  ];
  const first = pts[0];
  if (!first) return '';
  let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    if (!a || !b) continue;
    const cx = (a.x + b.x) / 2 + wob(amount * 1.8);
    const cy = (a.y + b.y) / 2 + wob(amount * 1.8);
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

/** A sketched outline: two passes, because one pen stroke never lands twice the same. */
function outline(w: number, h: number, seed: number, opts: { amount?: number; stroke?: string; fill?: boolean } = {}): string {
  const amount = opts.amount ?? 1.6;
  const stroke = opts.stroke ?? PEN;
  const wob = jitter(seed);
  const hatch: string[] = [];
  if (opts.fill) {
    for (let x = -h; x < w; x += 6) {
      const x1 = x + wob(1.4);
      const x2 = x + h + wob(1.4);
      hatch.push(`M${Math.max(2, x1).toFixed(1)} ${h - 2} L${Math.min(w - 2, x2).toFixed(1)} 2`);
    }
  }
  return `
    <svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"
         style="position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none">
      ${opts.fill ? `<path d="${hatch.join(' ')}" fill="none" stroke="${stroke}" stroke-width="1.1" opacity="0.42"/>` : ''}
      <path d="${pass(w, h, wob, amount)}" fill="none" stroke="${stroke}" stroke-width="1.7" stroke-linecap="round"/>
      <path d="${pass(w, h, wob, amount)}" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round" opacity="0.62"/>
    </svg>`;
}

/** A ruled line of "text", drawn as a pencil squiggle rather than set in type. */
function squiggle(w: number, seed: number): string {
  const wob = jitter(seed);
  let d = 'M2 5';
  for (let x = 10; x <= w - 4; x += 9) d += ` Q${(x - 4).toFixed(1)} ${(5 + wob(2.6)).toFixed(1)} ${x} ${(5 + wob(1.2)).toFixed(1)}`;
  return `<svg viewBox="0 0 ${w} 10" width="${w}" height="10" aria-hidden="true" style="display: block">
      <path d="${d}" fill="none" stroke="${PENCIL}" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`;
}

export function mount(root: HTMLElement): void {
  const sketched = `
    <div data-part="sketch-card" class="sp-stack"
         style="position: relative; flex: 0 0 auto; width: 262px; height: 194px; gap: 9px; padding: 13px 15px 15px;
                background: ${PAPER}; color: ${PEN}; font-family: ${HAND}; rotate: -0.9deg">
      ${outline(262, 194, 11, { amount: 2.4 })}

      <div style="position: relative">
        <span data-part="sketch-heading" style="font-size: 16px; font-weight: 700; letter-spacing: 0.01em">New task</span>
        <span style="position: absolute; left: -2px; top: 19px; width: 92px">${squiggle(92, 3)}</span>
      </div>

      <div class="sp-stack" style="gap: 4px; margin-top: 5px">
        <span style="font-size: 11px; color: ${PENCIL}">Title</span>
        <span data-part="sketch-field" style="position: relative; display: block; width: 230px; height: 30px; padding: 10px 8px 0">
          ${outline(230, 30, 27, { amount: 1.5 })}
          <span style="position: relative; display: block; width: 128px">${squiggle(128, 41)}</span>
        </span>
      </div>

      <span class="sp-row" data-part="sketch-check" style="gap: 8px">
        <span style="position: relative; display: inline-block; width: 17px; height: 17px">
          ${outline(17, 17, 59, { amount: 1.3 })}
          <svg viewBox="0 0 17 17" width="17" height="17" aria-hidden="true" style="position: absolute; left: 3px; top: -3px; overflow: visible">
            <path d="M2 9.5 6.4 14 15.5 1.5" fill="none" stroke="${PEN}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span style="font-size: 12px">Remind me</span>
      </span>

      <span class="sp-row" style="gap: 12px; margin-top: 2px">
        <button type="button" data-part="sketch-button" data-subject
                style="position: relative; width: 86px; height: 31px; padding: 0; border: 0; background: transparent;
                       color: ${PEN}; font: inherit; font-family: ${HAND}; font-size: 13px; font-weight: 700; cursor: pointer">
          ${outline(86, 31, 73, { amount: 1.8, fill: true })}
          <span style="position: relative">Add</span>
        </button>
        <span style="font-size: 12px; color: ${PENCIL}">Cancel</span>
      </span>
    </div>`;

  const finished = `
    <div class="sp-stack sp-context" data-part="finished" style="flex: 0 0 auto; width: 158px; gap: 9px">
      <span class="sp-label" style="color: var(--sp-ink)">Same screen, finished</span>
      <div class="sp-surface" style="padding: 11px 12px 13px">
        <div class="sp-stack" style="gap: 9px">
          <span class="sp-heading" style="font-size: 13px">New task</span>
          <span class="sp-field">
            <span class="sp-label" style="font-size: 11px">Title</span>
            <span class="sp-input" style="display: block; color: var(--sp-muted); font-size: 12px">Buy paper</span>
          </span>
          <span class="sp-row" style="gap: 8px">
            <span class="sp-checkbox" data-checked aria-hidden="true"></span>
            <span style="font-size: 12px">Remind me</span>
          </span>
          <span class="sp-row" style="gap: 10px">
            <span class="sp-button sp-button--sm">Add</span>
            <span class="sp-text" style="font-size: 12px">Cancel</span>
          </span>
        </div>
      </div>
      <span class="sp-row" style="gap: 6px; color: var(--sp-muted); font-size: 11px">
        ${icon('check')}<span>Reads as decided</span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 12px 14px 14px">
        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          ${sketched}
          ${finished}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        The wobble is the claim: nothing here is settled, so argue with the structure and not the colour.
      </p>
    </div>
  `;
}
