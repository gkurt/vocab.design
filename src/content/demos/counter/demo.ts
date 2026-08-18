import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The letters are drawn here rather than set in a face, for two reasons. The
 * enclosed space has to be paintable as a shape of its own, which no glyph in a
 * font will hand over, and the three weights have to differ in exactly one
 * variable, which a real family's optical corrections would spoil.
 *
 * The construction is the one a type designer uses: the outer contour is fixed
 * and the stroke thickens inward, so raising the weight is spent entirely out of
 * the counter. Baseline 100, x-height top 36, so every letter is 64 tall and 60
 * wide whatever the weight.
 */
const CX = 42;
const CY = 68;
const RX = 30;
const RY = 32;
const LEFT = CX - RX;
/** The e's crossbar runs thinner than the ring, as it does in any drawn face. */
const BAR = 0.72;
/** Where the e's lower stroke stops, measured round the ring from three o'clock. */
const TERMINAL = 34;

const WEIGHTS = { light: 6, regular: 12, bold: 18 } as const;

type Weight = keyof typeof WEIGHTS;

const IS_WEIGHT = (value: string): value is Weight => value in WEIGHTS;

const BOARD = { w: 84, h: 120 };
const PANEL = 80;

/**
 * Counter specimen: o, b and e drawn at three weights with every enclosed space
 * filled as a shape in its own right. The outer contour never moves, so the
 * reader watches the weight get paid for out of the white. The e carries both
 * words at once: the lens above its crossbar is a closed counter and the gap
 * below it, where the stroke stops instead of closing, is an aperture.
 *
 * The subject is one counter, the o's enclosed space, not the letter around it
 * and not the row: the term names the white shape. The b and the e are the
 * comparison the specimen needs in order to be read, so they sit in the context
 * register, which is also what keeps the subject's own fill the accent while
 * theirs go neutral (SPEC §5). No setting is dishonest, so no `data-pose` is
 * needed: a counter is a counter at every weight.
 *
 * Every panel is a fixed box and the letters are the same size at every weight,
 * so changing weight moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const fill = 'fill: color-mix(in oklab, var(--sp-accent) 32%, var(--sp-surface))';
  const ink = 'fill="none" stroke="currentColor" stroke-linecap="butt"';
  const board = `viewBox="0 0 ${BOARD.w} ${BOARD.h}" width="${PANEL}" height="${Math.round((PANEL * BOARD.h) / BOARD.w)}"`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">weight</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="regular">
            <button class="sp-segment" data-part="seg-light" value="light">light</button>
            <button class="sp-segment" data-part="seg-regular" value="regular">regular</button>
            <button class="sp-segment" data-part="seg-bold" value="bold">bold</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 26px; align-items: flex-start; justify-content: center; margin-top: 4px">
          <div class="sp-stack" data-part="panel-o" style="gap: 2px; align-items: center">
            <svg data-part="letter-o" ${board} role="img" aria-label="A lowercase o with its counter filled" style="display: block">
              <ellipse data-part="counter" data-subject cx="${CX}" cy="${CY}" style="${fill}"></ellipse>
              <ellipse data-part="o-ring" ${ink} cx="${CX}" cy="${CY}"></ellipse>
            </svg>
            <span class="sp-label sp-context">one counter</span>
          </div>
          <div class="sp-stack sp-context" data-part="panel-b" style="gap: 2px; align-items: center">
            <svg ${board} aria-hidden="true" style="display: block">
              <ellipse data-part="b-counter" cx="${CX}" cy="${CY}" style="${fill}"></ellipse>
              <ellipse data-part="b-bowl" ${ink} cx="${CX}" cy="${CY}"></ellipse>
              <line data-part="b-stem" ${ink} y1="16" y2="100"></line>
            </svg>
            <span class="sp-label">one counter</span>
          </div>
          <div class="sp-stack sp-context" data-part="panel-e" style="gap: 2px; align-items: center">
            <svg ${board} aria-hidden="true" style="display: block">
              <path data-part="e-counter" style="${fill}"></path>
              <path data-part="e-ring" ${ink}></path>
              <line data-part="e-bar" ${ink} x1="${LEFT}" x2="${CX + RX}" y1="${CY}" y2="${CY}"></line>
            </svg>
            <span class="sp-label">counter and aperture</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
          <span class="sp-label">outer contour fixed</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 4px">
          The e has one of each: the lens above the crossbar is enclosed, the gap below it is where the
          stroke stops instead of closing.
        </p>
      </div>
    </div>
  `;

  const set = (el: HTMLElement, attrs: Record<string, string | number>) => {
    for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, String(value));
  };

  const counter = part(root, 'counter');
  const oRing = part(root, 'o-ring');
  const bCounter = part(root, 'b-counter');
  const bBowl = part(root, 'b-bowl');
  const bStem = part(root, 'b-stem');
  const eCounter = part(root, 'e-counter');
  const eRing = part(root, 'e-ring');
  const eBar = part(root, 'e-bar');
  const readout = part(root, 'readout');

  const round = (n: number) => Math.round(n * 100) / 100;

  const apply = (value: string) => {
    if (!IS_WEIGHT(value)) return;
    const w = WEIGHTS[value];
    // The stroke rides inside the fixed outer contour, so its centreline moves in by half.
    const rxs = RX - w / 2;
    const rys = RY - w / 2;
    const rxi = RX - w;
    const ryi = RY - w;
    const bar = w * BAR;

    counter.dataset.weight = value;
    set(counter, { rx: rxi, ry: ryi });
    set(oRing, { rx: rxs, ry: rys, 'stroke-width': w });

    set(bCounter, { rx: rxi, ry: ryi });
    set(bBowl, { rx: rxs, ry: rys, 'stroke-width': w });
    set(bStem, { x1: LEFT + w / 2, x2: LEFT + w / 2, 'stroke-width': w });

    const angle = (TERMINAL * Math.PI) / 180;
    const tx = round(CX + rxs * Math.cos(angle));
    const ty = round(CY + rys * Math.sin(angle));
    set(eRing, { d: `M ${tx} ${ty} A ${rxs} ${rys} 0 1 1 ${round(CX + rxs)} ${CY}`, 'stroke-width': w });
    set(eBar, { 'stroke-width': bar });

    const top = CY - bar / 2;
    const reach = ryi > 0 ? Math.sqrt(Math.max(0, 1 - (bar / 2 / ryi) ** 2)) : 0;
    const xo = round(rxi * reach);
    set(eCounter, { d: `M ${round(CX - xo)} ${round(top)} A ${rxi} ${ryi} 0 0 1 ${round(CX + xo)} ${round(top)} Z` });

    readout.textContent = `stroke ${w}, counter ${2 * rxi} of ${2 * RX} units across`;
  };

  apply('regular');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
