import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const SCENE = { w: 240, h: 180 };
const FACE_H = 84;
const PANEL_H = SCENE.h - FACE_H;

/** Long enough that a claim can sit mid-fold, short enough to read as one crease opening. */
const FOLD_MS = 620;
/** The flat swap's only move: a cross-fade has no travel to be timed against. */
const FADE_MS = 240;

type Mode = 'dimensional' | 'flat';

const SAY: Record<Mode, Record<'shown' | 'hidden', string>> = {
  dimensional: {
    shown: "unfolded along the card's bottom edge, and that is the edge it folds back into.",
    hidden: 'tucked behind the card, one crease away from being back on screen.',
  },
  flat: {
    shown: 'faded up in place. It came from nowhere, so there is nowhere to put it back.',
    hidden: 'gone, without having gone anywhere.',
  },
};

const row = (label: string, amount: string, name?: string) => `
  <span class="sp-row sp-row--between" ${name ? `data-part="${name}"` : ''} style="font-size: 12px">
    <span style="color: var(--sp-muted)">${label}</span>
    <span>${amount}</span>
  </span>`;

/**
 * Dimensionality specimen: one breakdown panel reached two ways. On the dimensional setting the
 * panel is a flap creased along the card's bottom edge, folded back behind it at rest and unfolding
 * about that edge into view, shaded as it comes round because a surface facing away from the reader
 * catches less light. On the flat setting the same panel simply cross-fades into the same rectangle,
 * which is the counter-example: nothing about the move says where it was or where it goes.
 *
 * The subject is the folding panel, the object the term gives a place in depth. Flat is a state the
 * subject itself passes through, so the honest condition is declared in `data-pose` and the mount
 * state satisfies it (SPEC §6): identify refuses to ring a panel whose arrival claims no depth.
 * The card it folds from, the picker, the readout and the two controls are the scene.
 *
 * Show and Hide are absolute states rather than one toggle, so a pass that is resumed or
 * fast-forwarded lands where it was asked to (SPEC §8). The move is a CSS transition, so
 * `motion.css` flattens it for a reader who asked for less movement and the two states simply swap;
 * no keyframe set is built here, and nothing is measured. The panel is absolutely placed in a scene
 * whose box is written down at mount, so unfolding it moves nothing else (SPEC §5), and the settle
 * beat comes from the stage's clock so a pose cannot let the fold finish under an inspection.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fares</span>
          <sp-segmented class="sp-segmented" data-axis="Depth" data-term="dimensional" data-part="mode" data-value="dimensional">
            <button class="sp-segment" type="button" data-part="seg-dimensional" value="dimensional">Dimensional</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat">Flat</button>
          </sp-segmented>
        </div>

        <div class="sp-body sp-row" style="align-items: flex-start; gap: 14px">
          <div
            data-part="scene" data-mode="dimensional"
            style="position: relative; flex: 0 0 auto; width: ${SCENE.w}px; height: ${SCENE.h}px;
                   perspective: 760px; perspective-origin: 50% 0%"
          >
            <div
              class="sp-surface sp-context"
              style="position: absolute; left: 0; top: 0; z-index: 2; width: ${SCENE.w}px; height: ${FACE_H}px;
                     display: flex; flex-direction: column; justify-content: space-between; padding: 12px 14px"
            >
              <span class="sp-heading" style="font-size: 13px">Kastellorizo ferry</span>
              <span class="sp-row sp-row--between" style="align-items: baseline">
                <span class="sp-label" style="font-size: 11px">Total</span>
                <span style="font-size: 17px; font-weight: 600">38.50</span>
              </span>
            </div>

            <div
              data-part="panel" data-subject data-pose="[data-mode=dimensional]"
              data-mode="dimensional" data-state="settled"
              style="position: absolute; left: 0; top: ${FACE_H}px; z-index: 1; width: ${SCENE.w}px;
                     height: ${PANEL_H}px; padding: 11px 14px; display: flex; flex-direction: column;
                     justify-content: space-between; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-top: 0; border-radius: 0 0 var(--sp-radius) var(--sp-radius);
                     transform-origin: top center; transform: rotateX(-90deg); visibility: hidden;
                     backface-visibility: hidden; will-change: transform"
            >
              ${row('Adult fare', '26.00')}
              ${row('Port fee', '7.50', 'row-fee')}
              ${row('Booking', '5.00')}
              <span
                data-part="shade"
                style="position: absolute; inset: 0; pointer-events: none; opacity: 1;
                       border-radius: 0 0 var(--sp-radius) var(--sp-radius);
                       background: linear-gradient(to bottom, rgb(16 24 40 / 0.34), rgb(16 24 40 / 0.04))"
              ></span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Breakdown</span>
            <span class="sp-text--ink" data-part="where" style="font-size: 15px; font-weight: 600; line-height: 1.2">Hidden</span>
            <span class="sp-divider" style="margin: 1px 0"></span>
            <span class="sp-label" style="font-size: 11px">The panel is</span>
            <span class="sp-text sp-text--ink" data-part="say" style="height: 62px; font-size: 12px; line-height: 1.4">
              ${SAY.dimensional.hidden}
            </span>
            <div class="sp-row" style="gap: 6px">
              <button class="sp-button sp-button--sm" type="button" data-part="show">Show</button>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="hide">Hide</button>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        Depth is a promise: it folds back into the edge it came out of.
      </p>
    </div>
  `;

  const scene = part(root, 'scene');
  const panel = part(root, 'panel');
  const shade = part(root, 'shade');
  const where = part(root, 'where');
  const say = part(root, 'say');
  let mode: Mode = 'dimensional';
  let shown = false;
  let settling: number | undefined;

  /**
   * Written as one style pass over both settings, so the two arrivals differ only in what the
   * closed state is: a flap creased away from the reader, or the same rectangle at zero opacity.
   * `visibility` rides the transition because it stays visible for the whole of a move that ends
   * hidden, which is what keeps the fold watchable all the way home.
   */
  const render = (animate: boolean): void => {
    clock.clearTimeout(settling);
    const dimensional = mode === 'dimensional';
    panel.style.transition = animate
      ? `transform ${FOLD_MS}ms var(--sp-ease), opacity ${FADE_MS}ms linear, visibility ${FOLD_MS}ms linear`
      : 'none';
    shade.style.transition = animate ? `opacity ${FOLD_MS}ms var(--sp-ease)` : 'none';

    panel.style.transform = shown || !dimensional ? 'rotateX(0deg)' : 'rotateX(-90deg)';
    panel.style.opacity = shown || dimensional ? '1' : '0';
    panel.style.visibility = shown ? 'visible' : 'hidden';
    shade.style.opacity = dimensional && !shown ? '1' : '0';

    panel.dataset.mode = mode;
    scene.dataset.mode = mode;
    flag(scene, 'data-open', shown);
    where.textContent = shown ? 'Showing' : 'Hidden';
    say.textContent = SAY[mode][shown ? 'shown' : 'hidden'];

    if (!animate) {
      panel.dataset.state = 'settled';
      return;
    }
    panel.dataset.state = 'moving';
    settling = clock.setTimeout(() => {
      panel.dataset.state = 'settled';
    }, FOLD_MS + 80);
  };

  const set = (next: boolean): void => {
    if (shown === next) return;
    shown = next;
    render(true);
  };

  part(root, 'show').addEventListener('click', () => set(true));
  part(root, 'hide').addEventListener('click', () => set(false));

  // Each segment names a setting outright and leaves the panel where the reader left it, so a
  // resumed pass lands on the setting it asked for (SPEC §8). Switching is not itself the term,
  // so it re-poses the closed state with no travel rather than animating between two rest poses.
  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    render(false);
  });
}
