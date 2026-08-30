import { localPoint } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const SCREEN = { w: 200, h: 214 };
const SHEET_H = 176;
/** The distance between the two detents: the whole length of the transition, measured in gesture. */
const TRAVEL = 112;
/** Half of it. Past this on release the transition finishes; short of it, it runs backwards. */
const THRESHOLD = 0.5;
const SETTLE = 300;

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

const lines = (widths: number[]) =>
  widths.map((w) => `<span class="sp-line" style="display: block; width: ${w}%; margin-bottom: 9px"></span>`).join('');

/** A place on the screen the gesture can be carried to, so a script can pull a named distance. */
const dot = (name: string, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: 50%; top: ${y - 4}px; width: 8px; height: 8px; margin-left: -4px;
           border-radius: 50%; background: var(--sp-ink); opacity: 0.5"
  ></span>`;

/**
 * Interactive transition specimen: a sheet with two detents and a transition between them that has no
 * clock of its own. Every pixel of the drag writes the progress number the read-out prints, and the
 * sheet, the dimming behind it and the screen's own recede are all drawn from that one number, so the
 * reader can stop halfway and the interface is genuinely halfway. Only the release is timed: let go
 * past the halfway mark and it finishes, let go short of it and it runs backwards to the detent it
 * started from, and the read-out names which of the two happened.
 *
 * The subject is the sheet, the narrowest element the term names: the screen behind it recedes and the
 * dimming answers the same progress, but the thing whose transition is being held is the sheet. It is
 * at a detent in every resting state and never stops being the term, so no `data-pose` is needed.
 * The screen behind, the guide dots and the read-out are the scene.
 *
 * The title bar told the reader to "drag the handle, then let go" and the line under the
 * progress bar narrated every beat of the gesture ("Held by the gesture. Nothing runs on its
 * own now."). The instruction went, and the line prints the one word the readout is measuring
 * instead: Collapsed, Held, Scrubbing, Completing, Expanded.
 *
 * A legend under that stated the rule the release follows ("Released past halfway, the
 * transition finishes on its own. Released short of it, it runs backwards to the detent it
 * came from."). It never changed, so it was never a verdict, and watching two releases land
 * shows it better than reading it does. The readout column is centred against the screen now
 * that it is three lines shorter.
 *
 * The drag itself carries no transition at all, so the sheet tracks the pointer instead of lagging it,
 * and only the release animates. The settle is finished on a beat from the stage's clock rather than
 * on `transitionend`, which never fires under reduced motion; `prefersReducedMotion` collapses both
 * the animation and that beat, which is the correct end state for a reader who asked for less
 * movement. The sheet moves by a transform inside a clipped screen and every read-out holds its own
 * height, so scrubbing moves nothing but the sheet (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div
        class="sp-frame sp-frame--wide" data-part="scene"
        data-detent="collapsed" data-outcome="none" data-partway="no" style="height: 286px"
      >
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sheet</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 14px; padding: 12px">
          <div
            data-part="screen"
            style="position: relative; flex: 0 0 auto; width: ${SCREEN.w}px; height: ${SCREEN.h}px; overflow: hidden;
                   border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-surface);
                   touch-action: none; user-select: none"
          >
            <div
              class="sp-context" data-part="behind"
              style="position: absolute; inset: 0; padding: 14px 12px; transform-origin: 50% 34%"
            >
              <span class="sp-label sp-text--ink" style="font-size: 12px">Ferry timetable</span>
              <div style="margin-top: 10px">${lines([88, 70, 92, 64])}</div>
            </div>

            <span
              data-part="dim"
              style="position: absolute; inset: 0; background: var(--sp-scrim); opacity: 0; pointer-events: none"
            ></span>

            <div
              data-part="sheet" data-subject data-state="rested"
              style="position: absolute; left: 0; right: 0; bottom: 0; height: ${SHEET_H}px; padding: 12px;
                     background: var(--sp-surface); border-top: 1px solid var(--sp-line); border-radius: 14px 14px 0 0;
                     box-shadow: 0 -8px 20px rgb(16 24 40 / 0.18); transform: translateY(${TRAVEL}px);
                     cursor: grab; will-change: transform"
            >
              <span
                data-part="grabber"
                style="display: block; width: 40px; height: 5px; margin: 0 auto 12px; border-radius: 999px;
                       background: var(--sp-line)"
              ></span>
              <span class="sp-label sp-text--ink" style="font-size: 12px">Departures</span>
              <div style="margin-top: 10px">${lines([76, 90, 66])}</div>
            </div>

            <span style="position: absolute; inset: 0; z-index: 3; pointer-events: none">
              ${dot('dot-top', 58)}
              ${dot('dot-near', 78)}
              ${dot('dot-mid', 128)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; justify-content: center; gap: 7px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Transition progress</span>
            <span
              class="sp-text--ink" data-part="pct"
              style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.15"
            >0%</span>
            <span style="position: relative; height: 6px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
              <span
                data-part="fill"
                style="display: block; width: 0%; height: 100%; border-radius: 999px; background: var(--sp-accent)"
              ></span>
            </span>
            <span class="sp-text sp-text--ink" data-part="say" style="height: 18px; font-size: 12px; line-height: 18px">Collapsed</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const sheet = part(root, 'sheet');
  const behind = part(root, 'behind');
  const dim = part(root, 'dim');
  const pct = part(root, 'pct');
  const fill = part(root, 'fill');
  const say = part(root, 'say');
  const reduced = prefersReducedMotion(root);

  /** Which detent the sheet belongs to right now: 0 collapsed, 1 expanded. */
  let detent = 0;
  let progress = 0;
  let origin: number | undefined;
  let settling: number | undefined;

  const report = (text: string) => {
    const shown = Math.round(progress * 100);
    pct.textContent = `${shown}%`;
    fill.style.width = `${shown}%`;
    say.textContent = text;
  };

  /** Every moving property drawn from the one number, which is what makes it scrubbable. */
  const draw = (p: number, animated: boolean) => {
    progress = clamp(p);
    const ease = animated ? `transform ${SETTLE}ms cubic-bezier(0.2, 1.4, 0.4, 1)` : 'none';
    sheet.style.transition = ease;
    sheet.style.transform = `translateY(${((1 - progress) * TRAVEL).toFixed(1)}px)`;
    behind.style.transition = animated ? `transform ${SETTLE}ms var(--sp-ease)` : 'none';
    behind.style.transform = `scale(${(1 - 0.07 * progress).toFixed(3)})`;
    dim.style.transition = animated ? `opacity ${SETTLE}ms ease` : 'none';
    dim.style.opacity = (0.5 * progress).toFixed(3);
  };

  root.addEventListener('pointerdown', (event) => {
    if (!sheet.contains(event.target as Node)) return;
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) root.setPointerCapture(event.pointerId);
    clock.clearTimeout(settling);
    origin = localPoint(event, root).y;
    scene.dataset.outcome = 'scrubbing';
    scene.dataset.partway = 'no';
    sheet.dataset.state = 'held';
    draw(detent, false);
    report('Held');
  });

  root.addEventListener('pointermove', (event) => {
    if (origin === undefined) return;
    draw(detent + (origin - localPoint(event, root).y) / TRAVEL, false);
    if (Math.abs(progress - detent) > 0.12) scene.dataset.partway = 'seen';
    report('Scrubbing');
  });

  const release = () => {
    if (origin === undefined) return;
    origin = undefined;
    const target = progress >= THRESHOLD ? 1 : 0;
    const completed = target !== detent;
    scene.dataset.outcome = completed ? 'completed' : 'reversed';
    sheet.dataset.state = 'settling';
    detent = target;
    draw(target, !reduced);
    report(completed ? 'Completing' : 'Reversing');
    // Timed on the stage's clock, never on transitionend, which never fires under reduced motion.
    settling = clock.setTimeout(
      () => {
        scene.dataset.detent = detent === 1 ? 'expanded' : 'collapsed';
        sheet.dataset.state = 'rested';
        report(detent === 1 ? 'Expanded' : 'Collapsed');
      },
      reduced ? 0 : SETTLE + 40,
    );
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  draw(0, false);
  report('Collapsed');
}
