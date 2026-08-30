import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The letterforms are drawn here rather than sampled from two real faces. An
 * aperture is a difference of a few tenths of a millimetre in a drawing, and a
 * specimen that asks for Helvetica and gets whatever the machine has installed
 * would be a screenshot of a fallback rather than of the term. Drawing both cuts
 * from one ring makes the gap the only variable there is, which is the claim.
 */
const BOX = 120;
const CX = 61;
const CY = 62;
const R = 38;
const STEM = 13;
/** The crossbar of an e sits just above centre; where it meets the ring is one terminal. */
const BAR_DY = -9;

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const at = (a: number) => ({ x: CX + R * Math.cos(rad(a)), y: CY + R * Math.sin(rad(a)) });

/** One stroked arc of the ring, from angle to angle, always the long way round. */
const arc = (from: number, to: number) => {
  const a = at(from);
  const b = at(to);
  const swept = (((to - from) % 360) + 360) % 360;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${R} ${R} 0 ${swept > 180 ? 1 : 0} 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

const BAR_ANGLE = -deg(Math.asin(-BAR_DY / R));

/**
 * Each letter, in the two cuts: the angles at which the ring stops. The `c` is
 * symmetrical about the right side, so its terminals are +/- the half gap; the
 * `e` runs from its tail up to where the crossbar leaves the ring.
 */
const LETTERS: Record<string, { open: [number, number]; closed: [number, number]; bar: boolean }> = {
  c: { open: [52, -52], closed: [25, -25], bar: false },
  e: { open: [62, BAR_ANGLE], closed: [28, BAR_ANGLE], bar: true },
};

type Cut = 'open' | 'closed';

/** The glyph as markup, plus where its aperture is: midpoint, span and tilt of the gap. */
function draw(letter: string, cut: Cut) {
  const spec = LETTERS[letter];
  if (!spec) throw new Error(`no letterform for "${letter}"`);
  const [tail, head] = spec[cut];
  const t1 = at(tail);
  const t2 = at(head);
  const ring = arc(tail, head + (head < tail ? 360 : 0));
  const bar = spec.bar ? `M ${(CX - R + 1).toFixed(1)} ${(CY + BAR_DY).toFixed(1)} L ${t2.x.toFixed(1)} ${t2.y.toFixed(1)}` : '';
  const dx = t2.x - t1.x;
  const dy = t2.y - t1.y;
  const span = Math.hypot(dx, dy);
  return {
    path: `${ring} ${bar}`,
    x: (t1.x + t2.x) / 2,
    y: (t1.y + t2.y) / 2,
    span,
    tilt: deg(Math.atan2(dy, dx)) - 90,
    share: Math.round((span / (2 * R)) * 100),
  };
}

/**
 * Aperture specimen: one letter drawn twice from the same ring at the same stem
 * width, with the terminals cut short in one cut and curled toward each other in
 * the other. The tinted bar between the terminals is the aperture itself, and the
 * readout gives its span as a share of the letter's width, so the closing is a
 * number rather than an impression.
 *
 * The subject is the tint on the open cut: the term names the opening, not the
 * letter that has one, and at this size the gap is a box tens of pixels across
 * rather than a hairline, so it can carry the ring. The closed cut beside it is
 * the counter-example and stays in the context register with the labels and the
 * caption. The window was headed "Where the ring stops" and each column was labelled with
 * a description of its own drawing ("terminals curled in", "terminals cut short"); the
 * heading was the site talking and is gone, and the columns are named for the two cuts.
 * Both cuts have an aperture at every state the picker can reach, so the subject is never
 * dishonest and needs no `data-pose`.
 */
export function mount(root: HTMLElement): void {
  const column = (cut: Cut, label: string) => `
    <div class="sp-stack${cut === 'closed' ? ' sp-context' : ''}" style="gap: 4px; align-items: center; width: 176px">
      <div class="sp-row" style="gap: 8px; height: 18px">
        <span class="sp-label">${label}</span>
        <span class="sp-label" data-part="read-${cut}"
              style="color: var(--sp-ink); font-variant-numeric: tabular-nums; width: 56px"></span>
      </div>
      <div style="position: relative; width: ${BOX}px; height: ${BOX}px">
        <svg viewBox="0 0 ${BOX} ${BOX}" width="${BOX}" height="${BOX}" aria-hidden="true"
             style="display: block; overflow: visible">
          <path data-part="glyph-${cut}" fill="none" stroke="currentColor" stroke-width="${STEM}" stroke-linecap="round" d=""></path>
        </svg>
        <span data-part="gap-${cut}"${cut === 'open' ? ' data-subject' : ''}
              style="position: absolute; width: 15px; border-radius: 9px;
                     background: color-mix(in oklab, var(--sp-accent) 30%, transparent);
                     translate: -50% -50%; rotate: 0deg"></span>
      </div>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="c" data-axis="Letter">
            <button class="sp-segment" data-part="seg-c" value="c">c</button>
            <button class="sp-segment" data-part="seg-e" value="e">e</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="pair" data-letter="c" style="gap: 18px; justify-content: center; margin-top: 6px">
          ${column('closed', 'Closed')}
          ${column('open', 'Open')}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          One ring, one stem width, two ways of ending it. The tint is the aperture: narrow it far enough
          and the c reads as an o long before the reader notices why.
        </p>
      </div>
    </div>
  `;

  const pair = part(root, 'pair');

  const apply = (letter: string) => {
    if (!LETTERS[letter]) return;
    pair.dataset.letter = letter;
    for (const cut of ['closed', 'open'] as Cut[]) {
      const shape = draw(letter, cut);
      part(root, `glyph-${cut}`).setAttribute('d', shape.path);
      const gap = part(root, `gap-${cut}`);
      gap.style.left = `${shape.x.toFixed(1)}px`;
      gap.style.top = `${shape.y.toFixed(1)}px`;
      gap.style.height = `${shape.span.toFixed(1)}px`;
      gap.style.rotate = `${shape.tilt.toFixed(1)}deg`;
      gap.dataset.letter = letter;
      part(root, `read-${cut}`).textContent = `gap ${shape.share}%`;
    }
  };

  apply('c');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
