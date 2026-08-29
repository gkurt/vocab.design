import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A serif with a wide spread between its x-height, its capitals and its body, so
 * the bands inside the box are far enough apart to be told from each other. The
 * kit is sans-only on purpose (SPEC §5), and a specimen about a vertical metric
 * has to be set in a face whose metrics can be seen. Named families first.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";
const WORD = 'Hamburg';
/** Points, the unit the term is named for. CSS fixes 1pt at exactly 4/3 of a pixel. */
const SIZES = [12, 24, 40] as const;
const PX_PER_PT = 4 / 3;

/** The room the largest body needs, with the baseline nailed to one line (SPEC §5). */
const SLOT = { w: 412, h: 86, baseline: 64 };

type Metrics = {
  /** The body: exactly the point size, which is what the term names. */
  em: number;
  /** How much of the body sits above the baseline, at the face's own ascent-to-descent ratio. */
  emTop: number;
  /** Where the word's own box has to start for its baseline to land on the slot's line. */
  top: number;
  cap: number;
  x: number;
  width: number;
};

/**
 * The face's own numbers at a given size, taken from glyph ink boxes and font
 * metrics rather than from layout, so nothing here is measured after a style
 * write (SPEC §5). The body box is exactly one em tall, because that is what the
 * point size names; where the baseline falls inside it is the designer's
 * decision, so it is placed at the face's own ascent-to-descent ratio.
 */
function metrics(pt: number): Metrics {
  const em = pt * PX_PER_PT;
  const fallback = { emTop: em * 0.81, top: em * 0.15, cap: em * 0.69, x: em * 0.48, width: em * 4 };
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return { em, ...fallback };
  ctx.font = `${em}px ${FAMILY}`;
  const line = ctx.measureText(WORD);
  const asc = line.fontBoundingBoxAscent;
  const desc = line.fontBoundingBoxDescent;
  if (!asc || !desc) return { em, ...fallback };
  // A line box of `line-height: 1` puts the baseline at half-leading plus ascent.
  const baselineInBox = (em - (asc + desc)) / 2 + asc;
  return {
    em,
    emTop: (em * asc) / (asc + desc),
    top: SLOT.baseline - baselineInBox,
    cap: ctx.measureText('H').actualBoundingBoxAscent || fallback.cap,
    x: ctx.measureText('x').actualBoundingBoxAscent || fallback.x,
    width: line.width || fallback.width,
  };
}

/**
 * Point size specimen: one word in one face, with the body its letters are drawn
 * on outlined around it. The outlined box is exactly as tall as the point size,
 * the tinted bands inside it are where the lowercase and the capitals actually
 * stop, and the baseline stays on one line, so picking a size grows the box by
 * exactly the number while everything inside it grows by whatever fraction of
 * the body this face happens to use.
 *
 * The subject is the outlined body box, which is what the point size names: the
 * height of the body the letters are drawn on, and not the height of anything you
 * can see. The box has no element of its own in a page of type, so the specimen
 * gives it one, sized to exactly one em (SPEC §5); a ring around the word would
 * name the ink instead, which is the reading the term exists to correct. The
 * legend, the read-out and the caption are the demo's own instrumentation
 * (SPEC §5) and stay in the context register; the rules themselves keep the
 * accent, because measuring the body is what the specimen is for. The slot holds
 * the room the largest size needs, so picking a size moves nothing below it.
 */
export function mount(root: HTMLElement): void {
  const key = (swatch: string, name: string) => `
    <span class="sp-row" style="gap: 6px">
      <span style="width: 16px; height: 10px; ${swatch}"></span>
      <span class="sp-label">${name}</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One word, three bodies</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="24" data-axis="Size">
            ${SIZES.map((s) => `<button class="sp-segment" data-part="seg-${s}" value="${s}">${s}pt</button>`).join('')}
          </sp-segmented>
        </div>
        <div data-part="slot" style="position: relative; width: ${SLOT.w}px; height: ${SLOT.h}px; margin-top: 6px">
          <div data-part="guides" style="position: absolute; inset: 0"></div>
          <span data-part="body" data-subject data-size="24"
                style="position: absolute; left: 0; border: 2px solid var(--sp-accent); border-radius: 2px;
                       pointer-events: none"></span>
          <span data-part="word" data-size="24"
                style="position: absolute; left: 0; line-height: 1; font-family: ${FAMILY};
                       white-space: nowrap">${WORD}</span>
        </div>
        <div class="sp-row sp-context" data-part="legend" style="gap: 16px; height: 18px; white-space: nowrap">
          ${key('border: 2px solid var(--sp-accent)', 'the body, one em tall')}
          ${key('background: color-mix(in oklab, var(--sp-accent) 14%, transparent)', 'x-height')}
          ${key('background: color-mix(in oklab, var(--sp-accent) 34%, transparent)', 'cap height')}
        </div>
        <div class="sp-row sp-context" data-part="readout"
             style="gap: 16px; height: 20px; margin-top: 4px; white-space: nowrap;
                    font-variant-numeric: tabular-nums"></div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          The box grows by exactly the number. What the capitals and the lowercase do inside it is the
          fraction of the body this face decided to use.
        </p>
      </div>
    </div>
  `;

  const word = part(root, 'word');
  const body = part(root, 'body');
  const guides = part(root, 'guides');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const pt = SIZES.find((s) => String(s) === value);
    if (!pt) return;
    const m = metrics(pt);
    const box = Math.round(m.width) + 6;

    word.dataset.size = String(pt);
    word.style.fontSize = `${m.em}px`;
    word.style.top = `${m.top}px`;

    // The body is the subject, so it is an element of its own rather than a line in the
    // guide layer: one em tall, exactly the number the picker names.
    body.dataset.size = String(pt);
    body.style.width = `${box}px`;
    body.style.top = `${SLOT.baseline - m.emTop}px`;
    body.style.height = `${m.em}px`;

    const band = (from: number, to: number, mix: number) =>
      `<span style="position: absolute; left: 0; width: ${box}px; top: ${SLOT.baseline - to}px;
             height: ${to - from}px; background: color-mix(in oklab, var(--sp-accent) ${mix}%, transparent)"></span>`;

    guides.innerHTML = [
      band(0, m.x, 14),
      band(m.x, m.cap, 34),
      `<span style="position: absolute; left: -8px; width: ${box + 24}px; top: ${SLOT.baseline - 1}px;
             height: 2px; background: var(--sp-ink)"></span>`,
    ].join('');

    readout.innerHTML = [`${pt}pt`, `body ${m.em.toFixed(1)}px`, `cap ${m.cap.toFixed(1)}px`, `x-height ${m.x.toFixed(1)}px`]
      .map((text) => `<span class="sp-label">${text}</span>`)
      .join('');
  };

  apply('24');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
