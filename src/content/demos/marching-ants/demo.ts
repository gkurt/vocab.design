import { part } from '#src/kit/parts.ts';

const CANVAS = { w: 406, h: 172 };
const BOX = { w: 148, h: 84 };
const A = { x: 34, y: 30 };
const B = { x: 224, y: 30 };
/** How far the boundary is drawn outside the shape it holds. */
const PAD = 8;
/** Strip thickness: a box thinner than about two pixels is not there as far as the stage is concerned. */
const T = 3;
const DASH = 5;
/** Pixels a second. Slow on purpose: faster reads as an error state (see the article). */
const SPEED = 34;

type Rect = { x: number; y: number; w: number; h: number };

const around = (at: { x: number; y: number }): Rect => ({ x: at.x - PAD, y: at.y - PAD, w: BOX.w + PAD * 2, h: BOX.h + PAD * 2 });

/**
 * One edge of the boundary: a marquee strip carrying an endless dash pattern.
 *
 * The crawl is the kit's marquee rather than a keyframe set of the demo's own, because
 * an endless animation has to answer the stage: a CSS animation is paused off screen
 * and dropped under reduced motion, and `element.animate` is reached by neither. The
 * track travels exactly one group's width, and a group is a whole number of dash pairs,
 * so the pattern lands back on itself and the loop has no seam.
 */
function edge(len: number, place: string): string {
  const pairs = Math.ceil(len / (DASH * 2)) + 1;
  const cell = `<span style="flex: 0 0 ${DASH}px; height: 100%; background: var(--sp-accent)"></span><span style="flex: 0 0 ${DASH}px; height: 100%"></span>`;
  const group = cell.repeat(pairs);
  const seconds = ((pairs * DASH * 2) / SPEED).toFixed(2);
  return `
    <span class="sp-marquee" style="${place}">
      <span class="sp-marquee-track" style="--sp-marquee-time: ${seconds}s">
        <span class="sp-marquee-group" style="--sp-marquee-gap: 0px">${group}</span>
        <span class="sp-marquee-group" style="--sp-marquee-gap: 0px" aria-hidden="true">${group}</span>
      </span>
    </span>`;
}

/** The four edges, rotated so the dashes circulate the perimeter instead of arguing with each other. */
function ants(r: Rect): string {
  const strip = (len: number, extra: string) => `position: absolute; left: 0; top: 0; width: ${len}px; height: ${T}px; ${extra}`;
  return [
    edge(r.w, strip(r.w, '')),
    edge(r.w, strip(r.w, `top: ${r.h - T}px; transform: rotate(180deg)`)),
    edge(r.h, strip(r.h, `transform-origin: 0 0; transform: translateY(${r.h}px) rotate(-90deg)`)),
    edge(r.h, strip(r.h, `transform-origin: 0 0; transform: translateX(${r.w}px) rotate(90deg)`)),
  ].join('');
}

const shape = (name: string, at: { x: number; y: number }, wash: string, attrs: string) => `
  <div
    ${attrs}
    style="position: absolute; left: ${at.x}px; top: ${at.y}px; width: ${BOX.w}px; height: ${BOX.h}px; border-radius: 6px;
           border: 1px solid var(--sp-line); background: ${wash}; display: flex; align-items: flex-end; padding: 8px; user-select: none"
  >
    <span class="sp-label" style="font-size: 11px">${name}</span>
  </div>`;

/**
 * Marching ants specimen: a plan canvas holding two identical shapes, one selected and
 * one not. The selected shape wears a dashed boundary whose dashes walk around it; the
 * other wears a plain dashed frame that never moves, so the pair says out loud that the
 * motion, not the dashes, is what marks a selection.
 *
 * The subject is the crawling boundary itself, the narrowest thing the term names: not
 * the shape it holds, not the canvas it is drawn on. The still frame beside it and the
 * readout are the comparison and stay in the context register.
 *
 * Selecting and deselecting are both absolute: a press on the shape selects it, a press
 * on empty canvas clears the selection, so a pass that is resumed or fast-forwarded
 * lands on the state it asked for rather than the opposite of it (SPEC §8). The boundary
 * exists in the tree from mount and only its opacity changes, so nothing moves when a
 * selection is made (SPEC §5).
 *
 * The two shapes were captioned underneath ("Dashed, and standing still" under the frame
 * that never moves, "Selected: the dashes walk" under the one that does). A site plan
 * prints no such thing, and the two boundaries make the difference themselves, so both
 * captions and the helper that drew them are gone. They were absolutely positioned, so
 * nothing moved with them; the toolbar readout still names what is selected.
 */
export function mount(root: HTMLElement): void {
  const held = around(A);
  const still = around(B);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Site plan</span>
          <span class="sp-text" data-part="readout" data-selected="0" style="width: 200px; text-align: right; white-space: nowrap">Nothing selected</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="canvas"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden; touch-action: none"
          >
            ${shape('Terrace', A, 'var(--sp-accent-soft)', 'data-part="shape"')}
            ${shape('Courtyard', B, 'var(--sp-sunken)', 'data-part="other" class="sp-context"')}
            <span
              class="sp-context"
              data-part="still"
              style="position: absolute; left: ${still.x}px; top: ${still.y}px; width: ${still.w}px; height: ${still.h}px;
                     border: 2px dashed var(--sp-muted); border-radius: 4px; pointer-events: none"
            ></span>
            <span
              data-part="ants"
              data-subject
              style="position: absolute; left: ${held.x}px; top: ${held.y}px; width: ${held.w}px; height: ${held.h}px;
                     opacity: 0; transition: opacity 0.16s linear; pointer-events: none"
            >${ants(held)}</span>
            <span
              data-part="empty"
              aria-hidden="true"
              style="position: absolute; left: ${CANVAS.w / 2}px; top: ${CANVAS.h - 16}px; width: 1px; height: 1px; pointer-events: none"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const target = part(root, 'shape');
  const boundary = part(root, 'ants');
  const readout = part(root, 'readout');

  const select = (on: boolean) => {
    boundary.style.opacity = on ? '1' : '0';
    readout.dataset.selected = on ? '1' : '0';
    readout.textContent = on ? 'Terrace selected' : 'Nothing selected';
  };

  canvas.addEventListener('pointerdown', (event) => {
    const at = event.target;
    select(at instanceof Node && target.contains(at));
  });
}
