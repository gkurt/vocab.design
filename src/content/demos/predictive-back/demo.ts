import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The device's own viewport, the band the system has booked, and the point a release commits at. */
const SCREEN = { w: 184, h: 198 };
const ZONE = 18;
const COMMIT = 84;
/** How far the outgoing screen shrinks and slides at full progress. */
const SHRINK = 0.28;
const SLIDE = 22;
const SETTLE = 280;

const HATCH = 'repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 9px)';

/** The back stack, deepest first. The top of it is the screen the reader is looking at. */
const STACK = [
  { title: 'Home', lines: [86, 62, 78] },
  { title: 'Inbox', lines: [92, 70, 84, 58] },
  { title: 'Ferry timetable', lines: [94, 76, 88, 54, 70] },
];

const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 4}px; top: ${y - 4}px; width: 8px; height: 8px;
           border-radius: 50%; background: var(--sp-ink); opacity: 0.55"
  ></span>`;

const page = (index: number, back: boolean) => {
  const entry = STACK[index];
  if (!entry) return '<span class="sp-label" style="font-size: 11px">Nothing further back</span>';
  return `
    <div class="sp-row" style="gap: 4px; color: var(--sp-muted)">
      ${back ? icon('chevronLeft') : ''}
      <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 500">${entry.title}</span>
    </div>
    <div class="sp-stack" style="margin-top: 10px; gap: 8px">
      ${entry.lines.map((w) => `<div class="sp-line" style="width: ${w}%"></div>`).join('')}
    </div>`;
};

/**
 * Predictive back specimen: a device whose left band is the region a back stroke has to start in,
 * where dragging peels the current screen down and aside and draws the destination behind it before
 * anything has been decided. Let go past the commit point and the navigation happens; let go short of
 * it and the screen springs home with the stack untouched. The read-out carries the same progress
 * number the gesture reports, which is the value the whole pattern is built on.
 *
 * The subject is the screen being dragged, the narrowest element the term names: the band is where
 * the gesture starts (that is edge swipe's business) and the destination behind is what the peel
 * reveals, but the thing predictive back animates is the outgoing screen. While a commit is playing
 * out that screen is off the device for a moment, which is a state it should not be rung in, so the
 * honest condition is declared in `data-pose` and the mount state satisfies it (SPEC §6). The
 * device shell, the destination layer, the guides and the read-out are the scene.
 *
 * The viewport carries the touch persona (`data-touch`), because a back stroke from the edge
 * is a finger's gesture: every step aimed into the device performs as touch, the drag carries
 * `pointerType: 'touch'`, no hover is dispatched or mirrored inside it, and the kit hides the
 * native cursor, which is why the band states none of its own. The reset control sits outside
 * the device with the read-outs, so it stays a control a pointer clicks.
 *
 * The drag itself runs with no transition so the screen tracks the pointer rather than lagging it,
 * and only the release animates: a spring-shaped curve home, a plain ease out to commit. The stack
 * is popped on a beat from the stage's clock rather than on `transitionend`, which never fires under
 * reduced motion; `prefersReducedMotion` collapses that beat to nothing, since the transition it was
 * waiting out will not have played.
 *
 * The screen moves by a transform inside a clipped device and every read-out holds its own width and
 * height, so a peel moves nothing but the screen (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Back</span>
          <span class="sp-label" data-part="stackline" style="font-size: 11px">Home · Inbox · Ferry timetable</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 14px; padding: 12px">
          <div
            class="sp-context" data-part="device" data-top="article" data-outcome="none" data-preview="none"
            style="flex: 0 0 auto; padding: 8px; background: var(--sp-ink); border-radius: 26px"
          >
            <div
              data-part="viewport"
              data-touch
              style="position: relative; width: ${SCREEN.w}px; height: ${SCREEN.h}px; background: var(--sp-sunken);
                     border-radius: 19px; overflow: hidden; touch-action: none; user-select: none"
            >
              <div data-part="behind" style="position: absolute; inset: 0; padding: 16px 14px 12px 12px">${page(1, false)}</div>

              <div
                data-part="screen" data-subject data-pose=":not([data-state=committing])" data-state="rested"
                style="position: absolute; inset: 0; padding: 16px 14px 12px ${ZONE + 8}px; background: var(--sp-surface);
                       box-shadow: -8px 0 16px rgb(16 24 40 / 0.22); transform: none; will-change: transform"
              >${page(2, true)}</div>

              <span
                data-part="threshold"
                style="position: absolute; left: ${COMMIT}px; top: 0; bottom: 0; width: 2px; background: var(--sp-muted);
                       opacity: 0.55; z-index: 3; pointer-events: none"
              ></span>

              <span
                data-part="edge-zone"
                style="position: absolute; left: 0; top: 0; bottom: 0; width: ${ZONE}px; z-index: 4; display: flex;
                       align-items: center; justify-content: center; background: ${HATCH};
                       border-right: 1px dashed var(--sp-muted)"
              >
                <span class="sp-label" style="writing-mode: vertical-rl; font-size: 10px; letter-spacing: 0.4px">back</span>
                ${dot('edge-dot', ZONE / 2, 128)}
              </span>

              <span style="position: absolute; inset: 0; z-index: 5; pointer-events: none">
                ${dot('short-dot', 54, 128)}
                ${dot('far-dot', 152, 128)}
              </span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 7px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Gesture progress</span>
            <span
              class="sp-text--ink" data-part="pct"
              style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.15"
            >0%</span>
            <span style="position: relative; height: 6px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
              <span data-part="fill" style="display: block; width: 0%; height: 100%; border-radius: 999px; background: var(--sp-accent)"></span>
            </span>
            <span class="sp-text sp-text--ink" data-part="say" style="height: 34px; font-size: 12px; line-height: 1.4">Pull in from the left band.</span>
            <span class="sp-divider"></span>
            <span class="sp-label" data-stage-verdict data-part="legend" style="height: 46px; font-size: 11px; line-height: 1.4">Past ${COMMIT} px the navigation commits. Let go short of it and the screen springs back.</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset" style="align-self: flex-start">Reset the stack</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const device = part(root, 'device');
  const screen = part(root, 'screen');
  const behind = part(root, 'behind');
  const zone = part(root, 'edge-zone');
  const pct = part(root, 'pct');
  const fill = part(root, 'fill');
  const say = part(root, 'say');
  const stackline = part(root, 'stackline');
  const reduced = prefersReducedMotion(root);

  const NAMES = ['home', 'inbox', 'article'];

  let top = 2;
  let origin: number | undefined;
  let progress = 0;
  let settling: number | undefined;

  const report = (text: string) => {
    const shown = Math.round(progress * 100);
    pct.textContent = `${shown}%`;
    fill.style.width = `${shown}%`;
    say.textContent = text;
  };

  /** The peel itself: the outgoing screen shrinks and slides, drawn straight from progress. */
  const peel = (p: number, animated: 'none' | 'home' | 'away') => {
    progress = Math.min(Math.max(p, 0), 1);
    screen.style.transition =
      animated === 'none'
        ? 'none'
        : animated === 'home'
          ? `transform ${SETTLE}ms cubic-bezier(0.2, 1.5, 0.4, 1), border-radius ${SETTLE}ms ease, opacity ${SETTLE}ms ease`
          : `transform ${SETTLE}ms ease-out, border-radius ${SETTLE}ms ease, opacity ${SETTLE}ms ease`;
    screen.style.transform = `translateX(${progress * SLIDE}px) scale(${(1 - SHRINK * progress).toFixed(3)})`;
    screen.style.borderRadius = `${(progress * 18).toFixed(1)}px`;
    screen.style.opacity = '1';
  };

  const render = () => {
    screen.innerHTML = page(top, top > 0);
    behind.innerHTML = page(top - 1, false);
    device.dataset.top = NAMES[top] ?? 'home';
    stackline.textContent = STACK.slice(0, top + 1)
      .map((entry) => entry.title)
      .join(' · ');
  };

  /** Every ending that is not a peel: the screen is already where it belongs, so nothing animates. */
  const rest = (outcome: string, text: string) => {
    device.dataset.outcome = outcome;
    screen.dataset.state = 'rested';
    peel(0, 'none');
    report(text);
  };

  root.addEventListener('pointerdown', (event) => {
    if (!device.contains(event.target as Node)) return;
    clock.clearTimeout(settling);
    device.dataset.preview = 'none';
    // The origin test a system makes: the coordinate the contact landed at, not the node it hit.
    const from = localPoint(event, zone).x;
    if (from > ZONE) {
      origin = undefined;
      return rest('inside', `Started ${Math.round(from)} px in: the page keeps that stroke.`);
    }
    if (top === 0) {
      origin = undefined;
      return rest('blocked', 'Nothing further back, so there is nothing to preview.');
    }
    origin = localPoint(event, zone).x;
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) root.setPointerCapture(event.pointerId);
    device.dataset.outcome = 'previewing';
    screen.dataset.state = 'peeling';
    peel(0, 'none');
    report('Holding: the destination is drawn behind.');
  });

  root.addEventListener('pointermove', (event) => {
    if (origin === undefined) return;
    peel((localPoint(event, zone).x - origin) / COMMIT, 'none');
    if (progress > 0.2) device.dataset.preview = 'seen';
    report(`Peeled ${Math.round(progress * COMMIT)} px of ${COMMIT}.`);
  });

  const release = () => {
    if (origin === undefined) return;
    origin = undefined;
    const carried = progress;
    if (carried < 1) {
      screen.dataset.state = 'rested';
      device.dataset.outcome = 'cancelled';
      peel(0, 'home');
      return report('Let go short of the commit point: nothing navigated.');
    }
    // Past the commit point the outgoing screen leaves and the stack pops behind it.
    screen.dataset.state = 'committing';
    device.dataset.outcome = 'committed';
    screen.style.transition = `transform ${SETTLE}ms ease-out, opacity ${SETTLE}ms ease`;
    screen.style.transform = `translateX(${SCREEN.w}px) scale(${1 - SHRINK})`;
    screen.style.opacity = '0';
    report('Past the commit point: the destination becomes the screen.');
    // Timed on the stage's clock, never on transitionend, which never fires under reduced motion.
    settling = clock.setTimeout(
      () => {
        top = Math.max(0, top - 1);
        render();
        screen.dataset.state = 'rested';
        peel(0, 'none');
        report('Arrived. The screen behind is now the screen in front.');
      },
      reduced ? 0 : SETTLE + 40,
    );
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'reset').addEventListener('click', () => {
    clock.clearTimeout(settling);
    top = 2;
    render();
    device.dataset.preview = 'none';
    rest('none', 'Stack pushed back to three. Pull in from the left band.');
  });

  render();
  peel(0, 'none');
  report('Pull in from the left band.');
}
