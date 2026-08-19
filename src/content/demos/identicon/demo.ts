import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CELL = 16;
const SIDE = CELL * 5;

/**
 * FNV-1a, then one xorshift round to spread the low bits the pattern reads from.
 * Written out here as a tiny pure function on purpose: an identicon is only an
 * identicon if the same handle always lands on the same pattern, so this demo owes
 * the reader (and the identify snapshot) a result that cannot drift between runs.
 */
function seed(handle: string): number {
  let h = 2166136261;
  for (let i = 0; i < handle.length; i++) {
    h ^= handle.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function spread(hash: number): number {
  let x = hash;
  x ^= x << 13;
  x >>>= 0;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}

interface Mark {
  hash: number;
  hue: number;
  /** 25 cells, the left three columns mirrored into the right two. */
  cells: boolean[];
  /** The fifteen bits actually spent, as the pattern's own signature. */
  code: string;
}

function derive(handle: string): Mark {
  const hash = seed(handle);
  const bits = spread(hash);
  const cells: boolean[] = [];
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      const source = column > 2 ? 4 - column : column;
      cells.push(((bits >>> (row * 3 + source)) & 1) === 1);
    }
  }
  return { hash, hue: hash % 360, cells, code: (bits & 0x7fff).toString(16).padStart(4, '0') };
}

/** The pattern's own paint: a hue no kit token could carry, since the hash chooses it. */
function paint(mark: Mark, on: boolean): string {
  return on ? `hsl(${mark.hue} 54% 46%)` : 'var(--sp-sunken)';
}

const HANDLES = ['nils', 'marceau', 'tomas'] as const;

interface Picker extends HTMLElement {
  value: string;
}

/**
 * Identicon specimen: one handle, drawn twice in two places the product would draw it,
 * from a hash computed independently each time. Picking a different handle recomputes
 * both marks, and the caption reports the seed the two of them came out of.
 *
 * The subject is the generated pattern itself, `data-part="mark-review"`: the narrowest
 * element the term names. The square it sits in is an avatar, the row around it is a
 * review request, and the word names only the block pattern inside. The second mark is a
 * peer rather than scenery (it is the same thing, which is the point being made), so it
 * stays in the normal register; the panel chrome, the handle labels and the caption are
 * `.sp-context`.
 *
 * Every state is honestly an identicon, so no `data-pose` condition is needed. Both marks
 * are fixed 80px squares and the caption has a reserved height, so recomputing moves
 * nothing (SPEC §5), and the segmented picker names an absolute handle rather than
 * cycling, so a pass picked up anywhere lands the same way (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const square = (name: string, subject: boolean) => `
    <span
      data-part="${name}"
      ${subject ? 'data-subject' : ''}
      role="img"
      style="display: grid; grid-template-columns: repeat(5, ${CELL}px); grid-template-rows: repeat(5, ${CELL}px);
             flex: 0 0 auto; width: ${SIDE}px; height: ${SIDE}px; border-radius: 6px; overflow: hidden"
    ></span>`;

  const card = (name: string, place: string, subject: boolean) => `
    <div class="sp-surface" style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1 1 0; min-width: 0; padding: 12px">
      ${square(name, subject)}
      <span class="sp-heading sp-context" data-part="${name}-handle" style="font-size: 13px">@nils</span>
      <span class="sp-label sp-context" style="font-size: 11px; white-space: nowrap">${place}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-handle="nils" style="width: 452px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Northwind</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="nils">
            <button class="sp-segment" type="button" data-part="seg-nils" value="nils" style="padding: 4px 9px; font-size: 12px">@nils</button>
            <button class="sp-segment" type="button" data-part="seg-marceau" value="marceau" style="padding: 4px 9px; font-size: 12px">@marceau</button>
            <button class="sp-segment" type="button" data-part="seg-tomas" value="tomas" style="padding: 4px 9px; font-size: 12px">@tomas</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row" style="gap: 12px; align-items: stretch">
            ${card('mark-review', 'Review request', true)}
            ${card('mark-list', 'Members list', false)}
          </div>
          <span
            class="sp-label sp-context"
            data-part="seed"
            data-match="no"
            style="flex: 0 0 auto; height: 22px; font-size: 11px; line-height: 22px; white-space: nowrap; overflow: hidden"
          ></span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const caption = part(root, 'seed');
  const marks = ['mark-review', 'mark-list'] as const;

  const draw = (name: string, handle: string): Mark => {
    const mark = derive(handle);
    const el = part(root, name);
    el.dataset.handle = handle;
    el.dataset.code = mark.code;
    el.setAttribute('aria-label', `Generated avatar for @${handle}`);
    el.innerHTML = mark.cells.map((on) => `<span style="background: ${paint(mark, on)}"></span>`).join('');
    part(root, `${name}-handle`).textContent = `@${handle}`;
    return mark;
  };

  const show = (handle: string) => {
    scene.dataset.handle = handle;
    // Each mark is derived from the handle on its own, so the caption's claim that the
    // two agree is a fact the demo checked rather than one it arranged.
    const [first, second] = marks.map((name) => draw(name, handle));
    if (!first || !second) return;
    caption.dataset.match = first.code === second.code && first.hue === second.hue ? 'yes' : 'no';
    caption.textContent = `seed "@${handle}" · hash 0x${first.hash.toString(16).padStart(8, '0')} · hue ${first.hue} · 15 bits, mirrored`;
  };

  part(root, 'picker').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
  show((part(root, 'picker') as Picker).value || HANDLES[0]);
}
