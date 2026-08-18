import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const SCENE = { w: 434, h: 170 };
const PRESENT_MS = 300;

type Mode = 'sheet' | 'zoom' | 'cover';

type Box = { left: string; right: string; top: string; bottom: string; width: string; height: string; radius: string };

/** Each presentation as a box plus a pair of poses for one element. The dismissal is the entrance
    read backwards, which is the rule the whole term rests on. */
const MODES: Record<Mode, { box: Box; closed: string; open: string; fades: boolean; note: string }> = {
  sheet: {
    box: { left: '0', right: '0', top: 'auto', bottom: '0', width: 'auto', height: '124px', radius: '14px 14px 0 0' },
    closed: 'translateY(100%)',
    open: 'translateY(0)',
    fades: false,
    note: 'A sheet rises from the bottom edge and stops short of the top, and it leaves through the same edge.',
  },
  zoom: {
    box: { left: '50%', right: 'auto', top: '50%', bottom: 'auto', width: '260px', height: '124px', radius: '10px' },
    closed: 'translate(-50%, -50%) scale(0.92)',
    open: 'translate(-50%, -50%) scale(1)',
    fades: true,
    note: 'A centred zoom and fade grows in place, then shrinks back into it. This is the shape an alert uses.',
  },
  cover: {
    box: { left: '0', right: '0', top: '0', bottom: '0', width: 'auto', height: 'auto', radius: '0' },
    closed: 'translateY(100%)',
    open: 'translateY(0)',
    fades: false,
    note: 'A full-screen cover takes the whole scene, so the screen behind is out of sight rather than dimmed.',
  },
};

const lines = (widths: number[]) =>
  widths.map((w) => `<span class="sp-line" style="display: block; width: ${w}%; margin-bottom: 9px"></span>`).join('');

/**
 * Modal presentation specimen: one dialog arriving three ways, each paired with the dismissal that
 * reads its own entrance backwards. The sheet rises from the bottom edge and leaves through it, the
 * centred zoom grows in place and shrinks back into it, and the cover takes the whole scene and slides
 * back down. The screen behind dims and recedes in every case, which is the part of the motion that
 * promises the reader they are getting it back.
 *
 * The subject is the presented modal itself. It is the same element in all three presentations, so the
 * term is never a state it stops being and no `data-pose` is needed; while it is closed the stage
 * summons it by playing the script forward to the trigger (SPEC §6). The screen behind, the scrim, the
 * picker and the note are the scene.
 *
 * Presenting and dismissing are CSS transitions between two poses stated per mode, which `motion.css`
 * switches off wholesale for a reader who asked for less movement, and the settle is finished on a
 * beat from the stage's clock rather than on `transitionend`, which never fires under reduced motion.
 * Closed is `visibility: hidden` rather than merely a transform off the edge, so the specimen's own
 * claim about what is on screen is the truth. The trigger is an explicit open and the modal's own
 * control is an explicit dismissal, so no step flips whatever state it finds (SPEC §8). Everything is
 * absolutely placed inside a clipped scene, so a presentation moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="sheet" data-state="closed" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Presentation</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="sheet">
            <button class="sp-segment" type="button" data-part="seg-sheet" value="sheet">Sheet</button>
            <button class="sp-segment" type="button" data-part="seg-zoom" value="zoom">Zoom</button>
            <button class="sp-segment" type="button" data-part="seg-cover" value="cover">Cover</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            data-part="stage-view"
            style="position: relative; flex: 0 0 auto; width: ${SCENE.w}px; height: ${SCENE.h}px; overflow: hidden;
                   border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
          >
            <div
              class="sp-context" data-part="behind"
              style="position: absolute; inset: 0; padding: 14px 16px; background: var(--sp-surface);
                     transform-origin: 50% 50%"
            >
              <span class="sp-heading" style="font-size: 14px">Profile</span>
              <div style="margin-top: 12px; width: 250px">${lines([88, 64, 92])}</div>
              <button
                class="sp-button sp-button--sm" type="button" data-part="open"
                style="position: absolute; left: 16px; bottom: 14px"
              >Edit profile</button>
            </div>

            <span
              data-part="scrim"
              style="position: absolute; inset: 0; background: var(--sp-scrim); opacity: 0; visibility: hidden;
                     pointer-events: none"
            ></span>

            <div
              data-part="modal" data-subject
              style="position: absolute; display: flex; flex-direction: column; gap: 6px; padding: 12px 14px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); box-shadow: var(--sp-shadow);
                     visibility: hidden; will-change: transform"
            >
              <span class="sp-heading" style="font-size: 14px">Edit profile</span>
              <span class="sp-text" style="font-size: 12px; line-height: 1.35">
                A task in front of the screen you were on, which is still there behind it.
              </span>
              <button
                class="sp-button sp-button--sm" type="button" data-part="done"
                style="align-self: flex-start; margin-top: auto"
              >Done</button>
            </div>
          </div>

          <span
            class="sp-text sp-context" data-part="note"
            style="flex: 0 0 auto; height: 32px; font-size: 12px; line-height: 1.3"
          >${MODES.sheet.note}</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const behind = part(root, 'behind');
  const scrim = part(root, 'scrim');
  const modal = part(root, 'modal');
  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);

  let mode: Mode = 'sheet';
  let settling: number | undefined;

  const ease = `transform ${PRESENT_MS}ms var(--sp-ease), opacity ${PRESENT_MS}ms ease, visibility ${PRESENT_MS}ms`;

  /** The box a presentation happens in, restated in full so no mode inherits the last one's edges. */
  const dress = () => {
    const spec = MODES[mode];
    const style = modal.style;
    style.transition = 'none';
    style.left = spec.box.left;
    style.right = spec.box.right;
    style.top = spec.box.top;
    style.bottom = spec.box.bottom;
    style.width = spec.box.width;
    style.height = spec.box.height;
    style.borderRadius = spec.box.radius;
    style.transform = spec.closed;
    style.opacity = spec.fades ? '0' : '1';
    style.visibility = 'hidden';
    note.textContent = spec.note;
  };

  const present = (open: boolean) => {
    clock.clearTimeout(settling);
    const spec = MODES[mode];
    scene.dataset.state = open ? 'presenting' : 'dismissing';
    modal.style.transition = ease;
    modal.style.visibility = open ? 'visible' : 'hidden';
    modal.style.transform = open ? spec.open : spec.closed;
    modal.style.opacity = open || !spec.fades ? '1' : '0';
    // What is behind recedes rather than leaving, which is the promise that it is coming back.
    behind.style.transition = `transform ${PRESENT_MS}ms var(--sp-ease)`;
    behind.style.transform = open ? 'scale(0.94)' : 'scale(1)';
    scrim.style.transition = `opacity ${PRESENT_MS}ms ease, visibility ${PRESENT_MS}ms`;
    scrim.style.opacity = open ? '1' : '0';
    scrim.style.visibility = open ? 'visible' : 'hidden';
    settling = clock.setTimeout(
      () => {
        scene.dataset.state = open ? 'presented' : 'closed';
      },
      reduced ? 0 : PRESENT_MS + 60,
    );
  };

  part(root, 'open').addEventListener('click', () => present(true));
  part(root, 'done').addEventListener('click', () => present(false));

  // Each segment names a presentation outright and dresses the modal for it while closed, so a
  // resumed pass lands on the presentation it asked for rather than stepping to the next one.
  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    clock.clearTimeout(settling);
    scene.dataset.mode = mode;
    scene.dataset.state = 'closed';
    behind.style.transition = 'none';
    behind.style.transform = 'scale(1)';
    scrim.style.transition = 'none';
    scrim.style.opacity = '0';
    scrim.style.visibility = 'hidden';
    dress();
  });

  dress();
}
