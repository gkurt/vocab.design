import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const FRAME = { w: 380, h: 258 };
const TOPBAR_H = 40;
const BODY = { w: FRAME.w - 2, h: FRAME.h - 2 - TOPBAR_H };

const THUMB = { w: 108, h: 84 };
const COL = [17, 135, 253];
const ROW = [19, 113];

/** The presented view's own rectangle, centred in the body. It is never the source's. */
const VIEW = { left: 24, top: 16, width: 330, height: BODY.h - 32 };
/** One uniform scale for both axes: scaling a view unevenly distorts everything in it. */
const START_SCALE = 0.33;

const ZOOM_MS = 520;
/** The kit's own curve, written out: an animation's easing cannot read a custom property. */
const EASE = 'cubic-bezier(0.3, 0.9, 0.3, 1)';

type Shot = { key: string; title: string; note: string; fill: string; col: number; row: number };

const SHOTS: readonly Shot[] = [
  { key: 'a', title: 'Low tide', note: 'Barmouth', fill: 'linear-gradient(140deg, #3f6cd1, #6f4fd6)', col: 0, row: 0 },
  { key: 'b', title: 'Dune fence', note: 'Ynyslas', fill: 'linear-gradient(140deg, #d1913f, #b8503c)', col: 1, row: 0 },
  { key: 'c', title: 'Slate steps', note: 'Blaenau', fill: 'linear-gradient(140deg, #4b6b63, #22343a)', col: 2, row: 0 },
  { key: 'd', title: 'Long harbour', note: 'Porthmadog', fill: 'linear-gradient(140deg, #7a4fb0, #33306e)', col: 0, row: 1 },
  { key: 'e', title: 'Gorse bank', note: 'Rhinogydd', fill: 'linear-gradient(140deg, #c8ab3a, #6a7a2c)', col: 1, row: 1 },
  { key: 'f', title: 'Estuary light', note: 'Mawddach', fill: 'linear-gradient(140deg, #3b8ca8, #1c4468)', col: 2, row: 1 },
];

/** The transform that parks the view over one thumbnail, scaled down to about its size. */
function fromShot(shot: Shot): string {
  const dx = (COL[shot.col] as number) + THUMB.w / 2 - (VIEW.left + VIEW.width / 2);
  const dy = (ROW[shot.row] as number) + THUMB.h / 2 - (VIEW.top + VIEW.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${START_SCALE})`;
}

/**
 * Zoom transition specimen: a grid of thumbnails, and one presented view that scales up out
 * of whichever thumbnail was pressed. The view is a separate surface with its own layout and
 * its own header, so nothing is shared through the move: it starts parked over the source at
 * a third of its size, grows to its own rectangle, and the source fades out beneath it while
 * the rest of the grid stays there under a scrim, waiting to be returned to. The script opens
 * two different thumbnails, which is the whole claim, since the only thing saying where the
 * view came from is where its growth started.
 *
 * The subject is the presented view. It is off stage at mount, which identify handles by
 * summoning it (SPEC §6); the grid, the scrim and the bar are the scene it is presented over.
 *
 * Every rectangle is written down rather than measured, and the view is absolutely positioned
 * over a body fixed at mount, so the presentation cannot move anything (SPEC §5). Open and
 * close are separate controls reaching separate states (SPEC §8), and a thumbnail press is
 * ignored while a view is already up rather than swapping one presentation for another.
 *
 * The zoom is `element.animate` rather than a transition, because the start transform differs
 * per source and a transition would have to be re-parked and measured in the same tick to run
 * from the right place. `motion.css` cannot reach a keyframe set, so the demo asks
 * `prefersReducedMotion` itself and simply lands in the end state. `data-state` is cleared on
 * the stage's clock, so a pose cannot let a zoom finish under someone inspecting it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const thumb = (shot: Shot) => `
    <button
      type="button"
      class="sp-context"
      data-part="thumb-${shot.key}"
      aria-label="${shot.title}"
      style="position: absolute; left: ${COL[shot.col]}px; top: ${ROW[shot.row]}px; width: ${THUMB.w}px;
             height: ${THUMB.h}px; padding: 0; border: 0; border-radius: 6px; background: ${shot.fill};
             cursor: pointer; opacity: 1; transition: opacity 260ms linear"
    ></button>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: ${FRAME.w}px; height: ${FRAME.h}px">
        <div class="sp-topbar sp-context" style="height: ${TOPBAR_H}px">
          <span class="sp-heading sp-grow">Coast</span>
          <span class="sp-label" data-part="readout">grid</span>
        </div>
        <div class="sp-body" data-part="body" style="position: relative; padding: 0; overflow: hidden">
          ${SHOTS.map(thumb).join('')}

          <div class="sp-scrim" data-part="scrim"></div>

          <div
            data-part="view"
            data-subject
            data-from="a"
            data-state="settled"
            style="position: absolute; left: ${VIEW.left}px; top: ${VIEW.top}px; width: ${VIEW.width}px;
                   height: ${VIEW.height}px; overflow: hidden; border-radius: 10px; background: var(--sp-surface);
                   box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden;
                   transform: ${fromShot(SHOTS[0] as Shot)}"
          >
            <div data-part="view-hero" style="height: 94px; background: ${(SHOTS[0] as Shot).fill}"></div>
            <div style="padding: 11px 14px; display: flex; flex-direction: column; gap: 6px">
              <span class="sp-heading" data-part="view-title">Low tide</span>
              <span class="sp-text" data-part="view-note" style="margin: 0">Barmouth, an hour before dark.</span>
            </div>
            <button
              class="sp-icon-button"
              type="button"
              data-part="close"
              aria-label="Back to the grid"
              style="position: absolute; right: 6px; top: 6px; color: #ffffff; background: rgb(12 16 34 / 0.42)"
            >${icon('close')}</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 380px; margin: 0; text-align: center">
        Two surfaces, not one: the grid waits under the view it opened.
      </p>
    </div>
  `;

  const view = part(root, 'view');
  const hero = part(root, 'view-hero');
  const title = part(root, 'view-title');
  const note = part(root, 'view-note');
  const scrim = part(root, 'scrim');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);
  let settling: number | undefined;
  let source: Shot = SHOTS[0] as Shot;

  const zoom = (from: string, opening: boolean): void => {
    for (const animation of view.getAnimations()) animation.cancel();
    if (reduced) return;
    const parked = { transform: from, opacity: 0 };
    const full = { transform: 'none', opacity: 1 };
    view.animate(opening ? [parked, full] : [full, parked], { duration: ZOOM_MS, easing: EASE });
  };

  const present = (shot: Shot): void => {
    if (view.dataset.open !== undefined) return;
    clock.clearTimeout(settling);
    source = shot;

    hero.style.background = shot.fill;
    title.textContent = shot.title;
    note.textContent = `${shot.note}, an hour before dark.`;
    view.dataset.from = shot.key;
    view.dataset.state = 'moving';
    view.dataset.open = '';
    view.style.transform = 'none';
    view.style.opacity = '1';
    view.style.visibility = 'visible';
    flag(scrim, 'data-open', true);
    part(root, `thumb-${shot.key}`).style.opacity = '0';
    readout.textContent = shot.title.toLowerCase();

    zoom(fromShot(shot), true);
    settling = clock.setTimeout(() => {
      view.dataset.state = 'settled';
    }, ZOOM_MS + 100);
  };

  const dismiss = (): void => {
    if (view.dataset.open === undefined) return;
    clock.clearTimeout(settling);

    const parked = fromShot(source);
    view.removeAttribute('data-open');
    view.dataset.state = 'moving';
    view.style.transform = parked;
    view.style.opacity = '0';
    flag(scrim, 'data-open', false);
    part(root, `thumb-${source.key}`).style.opacity = '1';
    readout.textContent = 'grid';

    zoom(parked, false);
    // Visibility waits out the shrink, so the view is still drawn while it travels back.
    settling = clock.setTimeout(() => {
      view.style.visibility = 'hidden';
      view.dataset.state = 'settled';
    }, ZOOM_MS + 100);
  };

  for (const shot of SHOTS) part(root, `thumb-${shot.key}`).addEventListener('click', () => present(shot));
  part(root, 'close').addEventListener('click', dismiss);
}
