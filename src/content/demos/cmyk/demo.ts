import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Real process inks rather than the idealized primaries. Each one reflects a little of the
 * band it is supposed to absorb, which is what keeps the three colours from reaching a true
 * black together, and it is also what makes the multiply honest: with ideal primaries every
 * channel has a zero in it and any overlap comes out exactly #000000 for the wrong reason.
 * The plates below carry their own ink values inline; these two are the pair the gamut
 * strip's arithmetic needs.
 */
const PAPER = '#f7f4ea';
const CYAN = '#1ba5dc';

/** A saturated screen cyan, the kind a picker flags as unprintable. */
const SCREEN = '#00e5ff';

const channels = (value: string): number[] => [1, 3, 5].map((i) => Number.parseInt(value.slice(i, i + 2), 16));

const toHex = (rgb: number[]): string => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

/**
 * Subtractive stacking done the way the browser's `multiply` does it: the channel-wise
 * product. The printed swatch below is this value, so the hex beside it cannot drift from
 * the paint, and the claim that ink only ever subtracts is arithmetic rather than assertion.
 */
const stackInks = (...layers: string[]): string =>
  toHex(layers.map(channels).reduce((acc, ink) => acc.map((c, i) => (c * (ink[i] ?? 0)) / 255)));

const PRINTED = stackInks(PAPER, CYAN);

type Plate = { key: string; name: string; paint: string };

/**
 * Four plates that compose into one picture: a low sun over water. Each plate is one ink at
 * varying density, so a plate shown alone is a tint of a single colour on paper, exactly what
 * comes off a press on one pass. The key plate carries the horizon rule, the keyline and the
 * silhouette, which is the detail the three colour plates are too light to hold.
 */
const PLATES: Plate[] = [
  {
    key: 'cyan',
    name: 'Cyan',
    paint: `background-image:
      linear-gradient(to bottom,
        rgb(27 165 220 / 0.4) 0 12%,
        rgb(27 165 220 / 0.12) 32%,
        rgb(27 165 220 / 0.03) 50%,
        rgb(27 165 220 / 0.42) 56%,
        rgb(27 165 220 / 0.68) 78%,
        rgb(27 165 220 / 0.88) 100%)`,
  },
  {
    key: 'magenta',
    name: 'Magenta',
    paint: `background-image:
      linear-gradient(to bottom,
        rgb(222 46 140 / 0.05) 0%,
        rgb(222 46 140 / 0.3) 30%,
        rgb(222 46 140 / 0.5) 48%,
        rgb(222 46 140 / 0.14) 57%,
        rgb(222 46 140 / 0.2) 76%,
        rgb(222 46 140 / 0.05) 100%)`,
  },
  {
    key: 'yellow',
    name: 'Yellow',
    paint: `background-image:
      radial-gradient(circle 66px at 32% 30%,
        rgb(251 233 74 / 0.95) 0 20%,
        rgb(251 233 74 / 0.6) 20% 44%,
        rgb(251 233 74 / 0.24) 44% 72%,
        rgb(251 233 74 / 0.05) 72% 100%),
      linear-gradient(to bottom,
        rgb(251 233 74 / 0.26) 0 38%,
        rgb(251 233 74 / 0.06) 52%,
        rgb(251 233 74 / 0) 58%)`,
  },
  {
    key: 'key',
    name: 'Key',
    paint: `background-image:
      linear-gradient(to bottom,
        rgb(17 17 17 / 0) 0 53%,
        rgb(17 17 17 / 0.5) 53% 55%,
        rgb(17 17 17 / 0) 55% 80%,
        rgb(17 17 17 / 0.12) 90%,
        rgb(17 17 17 / 0.26) 100%);
      box-shadow: inset 0 0 0 1px rgb(17 17 17 / 0.34)`,
  },
];

const NOTES: Record<string, string> = {
  all: 'Four plates in register. Every ink only ever subtracts, so wherever two of them overlap the sheet gets darker, never brighter.',
  cyan: 'The cyan plate alone. Density is the only variable a plate has: more ink, less paper showing back through it.',
  magenta: 'The magenta plate alone. On press this is one pass of one ink, and it can darken the paper but never lighten it.',
  yellow: 'The yellow plate alone, the weakest absorber of the three, which is why it reads as light rather than as colour.',
  key: 'The key plate alone: the horizon rule, the keyline and the silhouette. The three colour plates register against this one.',
};

/**
 * CMYK specimen: one printed picture whose four ink plates can be looked at one at a time or
 * all together, plus the boundary the four inks stop at.
 *
 * The mixing is real rather than illustrated. Each plate is a layer of one ink colour at
 * varying alpha with `mix-blend-mode: multiply` over the paper, and the stack is isolated so
 * it clamps this sheet and nothing behind it, which makes the overlaps genuinely the product
 * of the inks above them. The two hexes in the strip are the same arithmetic: the printed
 * swatch is `stackInks(PAPER, CYAN)` and prints that value, so the number and the paint are
 * one thing.
 *
 * The subject is the ink stack, the region where the plates overlap and mix, which is the
 * composite the term names. The sheet's paper margin, the plate control, the gamut strip and
 * the note are all outside it. A single separation is one ink rather than the model, a state
 * the subject passes through without being the term, so the honest condition is declared in
 * `data-pose` and the mount state satisfies it (SPEC §6).
 *
 * Every box is a fixed size and only paint and text change, so switching plates moves nothing
 * (SPEC §5). No timers, so `mount` takes no clock.
 */
export function mount(root: HTMLElement): void {
  const plates = PLATES.map(
    (plate) => `
      <span data-part="plate-${plate.key}" aria-hidden="true"
            style="position: absolute; inset: 0; mix-blend-mode: multiply; transition: opacity 0.2s linear; ${plate.paint}"></span>`,
  ).join('');

  const swatch = (name: string, label: string, colour: string) => `
    <div class="sp-stack" style="flex: 0 0 auto; gap: 2px">
      <span class="sp-label" style="font-size: 9px; line-height: 1.2">${label}</span>
      <span class="sp-swatch" data-part="${name}" style="width: 54px; height: 20px; --sp-swatch: ${colour}"></span>
      <span class="sp-text" data-part="${name}-hex"
            style="font-size: 8.5px; line-height: 1.2; font-variant-numeric: tabular-nums">${colour}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="height: 31px">
          <span class="sp-label">Plate</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="all">
            ${PLATES.map((p) => `<button class="sp-segment" data-part="seg-${p.key}" value="${p.key}">${p.name}</button>`).join('')}
            <button class="sp-segment" data-part="seg-all" value="all">All</button>
          </sp-segmented>
        </div>

        <div data-part="sheet" style="margin-top: 10px; height: 124px; padding: 9px; border-radius: 2px;
             background: ${PAPER}; box-shadow: 0 0 0 1px rgb(120 110 84 / 0.28)">
          <span data-part="stack" data-subject data-pose="[data-mode=all]" data-mode="all"
                style="position: relative; display: block; height: 100%; isolation: isolate; background: ${PAPER}">
            ${plates}
            <span data-part="sail" aria-hidden="true"
                  style="position: absolute; left: 288px; top: 25px; width: 22px; height: 32px;
                         mix-blend-mode: multiply; transition: opacity 0.2s linear;
                         background: rgb(17 17 17 / 0.82); clip-path: polygon(0 0, 0 100%, 100% 100%)"></span>
            <span data-part="hull" aria-hidden="true"
                  style="position: absolute; left: 280px; top: 57px; width: 38px; height: 5px;
                         mix-blend-mode: multiply; transition: opacity 0.2s linear;
                         background: rgb(17 17 17 / 0.78); border-radius: 0 0 4px 4px"></span>
          </span>
        </div>

        <div class="sp-row sp-context" data-part="gamut"
             style="gap: 10px; margin-top: 10px; padding: 7px 11px; border-radius: 6px; background: var(--sp-sunken)">
          ${swatch('screen', 'Screen', SCREEN)}
          <span data-part="warn" style="display: inline-flex; flex: 0 0 auto; align-items: center; gap: 4px;
                color: var(--sp-warn); font-size: 9px; line-height: 1.2">
            ${icon('alert')}<span>outside<br>CMYK</span>
          </span>
          ${swatch('printed', 'Ink', PRINTED)}
          <span class="sp-text sp-grow" style="font-size: 9px; line-height: 1.35">
            Solid cyan on this paper is as far as the four inks reach in that direction, so the screen value has nowhere to land.
          </span>
        </div>

        <p class="sp-text sp-context" data-part="note"
           style="margin: 8px 0 0; height: 30px; font-size: 10px; line-height: 1.4">${NOTES.all}</p>
      </div>
    </div>
  `;

  const stack = part(root, 'stack');
  const note = part(root, 'note');
  const sail = part(root, 'sail');
  const hull = part(root, 'hull');

  const apply = (mode: string) => {
    stack.dataset.mode = mode;
    for (const plate of PLATES) {
      const inked = mode === 'all' || mode === plate.key;
      part(root, `plate-${plate.key}`).style.opacity = inked ? '1' : '0';
    }
    // The silhouette is line work, so it belongs to the key plate and leaves with it.
    const keyed = mode === 'all' || mode === 'key';
    for (const mark of [sail, hull]) mark.style.opacity = keyed ? '1' : '0';
    note.textContent = NOTES[mode] ?? NOTES.all ?? '';
  };

  apply('all');

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
