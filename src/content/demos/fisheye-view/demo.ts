import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const ROWS = 30;
/** The column the whole directory has to fit inside, whatever the lens is doing to it. */
const LIST_H = 232;
/** The lens itself: how much taller the focused row gets, and how fast that gain decays. */
const PEAK = 11;
const SIGMA = 2.6;
/** The lens never parks where one side of the falloff would have no rows left in it. */
const MIN_P = 3;
const MAX_P = 26;
/** Aim anchors the choreography drags between: invisible, and fixed in the resting geometry. */
const ANCHORS = [6, 14, 16, 24] as const;

const NAMES = [
  'Ainsley, Marta',
  'Balfour, Dougal',
  'Bannerman, Iris',
  'Brodie, Callum',
  'Cargill, Senga',
  'Chalmers, Effie',
  'Cormack, Ruaridh',
  'Dalziel, Morag',
  'Drummond, Innes',
  'Eunson, Fergus',
  'Fairbairn, Nessa',
  'Gilfillan, Struan',
  'Halcro, Isla',
  'Inkster, Torquil',
  'Kirkpatrick, Eilidh',
  'Laidlaw, Hamish',
  'Leask, Rhona',
  'Macaulay, Coll',
  'Mowat, Bethia',
  'Nicolson, Angus',
  'Peterkin, Sorcha',
  'Rendall, Kirsty',
  'Sclater, Magnus',
  'Sinclair, Ailsa',
  'Tulloch, Gavin',
  'Umphray, Freya',
  'Vermeulen, Joss',
  'Wishart, Elspeth',
  'Yorston, Niall',
  'Zetland, Bridie',
];

/** The lens profile: a bell over the row index, so neighbours ramp down instead of stepping. */
const weightAt = (distance: number) => 1 + PEAK * Math.exp(-((distance / SIGMA) ** 2));

/**
 * Fisheye view specimen: a thirty-name directory in a column that can only hold thirty names if
 * most of them are slivers. The lens is dragged down the column and every row is sized by how far
 * it sits from the lens, so the focused name is legible, its neighbours ramp down through
 * readable and squashed, and the far ends of the list are ink with no letters left in them.
 *
 * The subject is the falloff, `data-part="falloff"`: the run of progressively compressed rows on
 * the far side of the lens. It has no element of its own in the list, so it is given one, a bar
 * spanning exactly that run's extent and moving with it (SPEC §5). Marking the magnified row
 * instead would claim the term is one item getting bigger, which is the dock magnification
 * specimen; marking the column would claim it is the focus-and-context split, which is the
 * focus plus context specimen. The progressive compression is the part only a fisheye has. The
 * list, its rows, the readout and the frame are scenery in the context register, which is why the
 * bar is the one thing in kit accent.
 *
 * The panel beside the column reports measurements and nothing else. A line under the readout
 * used to say that all thirty names are on screen and that none can be read away from the lens,
 * and the readout itself used to narrate the same point in sentences; the line is gone and the
 * readout now prints the lens row and the falloff's extent and smallest height.
 *
 * The lens position is a continuous parameter read from the pointer's y against the column's
 * resting geometry, never from which row happens to be under the pointer: the rows are the thing
 * being resized, so resolving the lens against them would feed this frame's distortion into the
 * next one. Heights are normalized to the column's fixed height, so the deformation is contained
 * and nothing outside the column moves however far the lens travels (SPEC §5). Nothing
 * transitions: the drag's own frames are the motion, so there is no animation to gate and no
 * settle to wait on.
 */
export function mount(root: HTMLElement): void {
  const rows = NAMES.map(
    (name, i) => `
      <div
        data-part="row-${i + 1}"
        data-state="far"
        style="display: flex; align-items: center; height: ${LIST_H / ROWS}px; padding: 0 6px; overflow: hidden;
               white-space: nowrap; line-height: 1; color: var(--sp-ink);
               background: var(--sp-${i % 2 === 0 ? 'surface' : 'sunken'})"
      >${name}</div>`,
  ).join('');

  const anchors = ANCHORS.map(
    (index) => `
      <span
        data-part="at-${index}"
        aria-hidden="true"
        style="position: absolute; left: 94px; top: ${((index - 0.5) * LIST_H) / ROWS - 4}px; width: 8px; height: 8px; pointer-events: none"
      ></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour register</span>
          <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">30 names</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 12px">
          <div
            data-part="lens"
            data-zone="top"
            style="position: relative; display: flex; flex: 0 0 auto; width: 210px; height: ${LIST_H + 2}px;
                   touch-action: none; cursor: grab"
          >
            <div
              class="sp-context"
              data-part="rows"
              style="position: relative; flex: 1 1 auto; height: 100%; overflow: hidden;
                     border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)"
            >${rows}${anchors}</div>
            <div style="position: relative; flex: 0 0 auto; width: 16px">
              <div
                data-part="falloff"
                data-subject
                style="position: absolute; left: 5px; width: 6px; top: 0; height: 0; border-radius: 3px;
                       background: var(--sp-accent)"
              ></div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <span class="sp-label" style="font-size: 11px">the falloff</span>
            <span class="sp-text" data-part="readout" style="height: 96px; font-size: 12px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const lens = part(root, 'lens');
  const rowsEl = part(root, 'rows');
  const falloff = part(root, 'falloff');
  const readout = part(root, 'readout');
  const rowEls = NAMES.map((_, i) => part(root, `row-${i + 1}`));

  let dragging = false;

  const place = (p: number) => {
    const raw = rowEls.map((_, i) => weightAt(i + 1 - p));
    const scale = LIST_H / raw.reduce((sum, value) => sum + value, 0);
    const focus = Math.min(ROWS, Math.max(1, Math.round(p)));
    let offset = 0;
    let smallest = LIST_H;
    for (const [i, row] of rowEls.entries()) {
      const height = (raw[i] ?? 1) * scale;
      row.style.height = `${height.toFixed(2)}px`;
      row.style.fontSize = `${Math.min(11.5, height * 0.5).toFixed(2)}px`;
      row.dataset.state = i + 1 === focus ? 'focus' : Math.abs(i + 1 - p) <= 3.5 ? 'near' : 'far';
      if (i + 1 <= focus) offset += height;
      smallest = Math.min(smallest, height);
    }
    falloff.style.top = `${offset.toFixed(2)}px`;
    falloff.style.height = `${(LIST_H - offset).toFixed(2)}px`;
    lens.dataset.zone = p <= 10 ? 'top' : p <= 20 ? 'middle' : 'bottom';
    readout.textContent = `Lens on ${NAMES[focus - 1] ?? ''}, row ${focus} of ${ROWS}. Falloff below: rows ${focus + 1} to ${ROWS}, smallest ${smallest.toFixed(1)}px.`;
  };

  /** The lens reads the pointer against the column's resting geometry, not against the rows it has deformed. */
  const positionFrom = (clientY: number) => {
    const p = (localPoint({ clientX: 0, clientY }, rowsEl).y / LIST_H) * ROWS + 0.5;
    return Math.min(MAX_P, Math.max(MIN_P, p));
  };

  lens.addEventListener('pointerdown', (event: PointerEvent) => {
    dragging = true;
    // A real reader's drag has to keep reporting past the column's edge; the player's
    // synthetic pointers cannot be captured and the call would throw (SPEC §7).
    if (event.isTrusted) lens.setPointerCapture(event.pointerId);
    place(positionFrom(event.clientY));
  });

  // Only a held drag moves the lens: a pointer merely crossing the column is not input here.
  lens.addEventListener('pointermove', (event: PointerEvent) => {
    if (dragging) place(positionFrom(event.clientY));
  });

  const release = () => {
    dragging = false;
  };
  lens.addEventListener('pointerup', release);
  lens.addEventListener('pointercancel', release);

  place(6);
}
