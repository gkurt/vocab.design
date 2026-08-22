import { type IconName, icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Half the wobble, and how often it changes its mind. Small: a big one reads as broken. */
const ANGLE = 1.4;
const TICK_MS = 170;
const TILE = 56;

/** The press the mode is entered by, and how often the held icon's ring is repainted. */
const HOLD_MS = 480;
const RING_MS = 60;

const APPS: { name: string; glyph: IconName; wash: string }[] = [
  { name: 'Notes', glyph: 'pencil', wash: '#dc9a33' },
  { name: 'Mail', glyph: 'inbox', wash: '#3f74d8' },
  { name: 'Photos', glyph: 'copy', wash: '#2f9e6f' },
  { name: 'Search', glyph: 'search', wash: '#5a6270' },
  { name: 'Clock', glyph: 'calendar', wash: '#2b3038' },
  { name: 'Alerts', glyph: 'bell', wash: '#d0603f' },
  { name: 'Saved', glyph: 'heart', wash: '#c2477f' },
  { name: 'Rated', glyph: 'star', wash: '#7a56cf' },
];

const cells = APPS.map(
  ({ name, glyph, wash }, i) => `
    <div
      data-part="app-${i + 1}"
      style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 5px; rotate: 0deg;
             transition: rotate ${TICK_MS}ms linear; cursor: default; touch-action: none; user-select: none"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: ${TILE}px; height: ${TILE}px;
               border-radius: 14px; background: ${wash}; color: #ffffff"
      >${icon(glyph)}</span>
      <span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">${name}</span>
      <span
        data-part="ring-${i + 1}"
        aria-hidden="true"
        style="position: absolute; left: 50%; top: ${TILE / 2}px; width: 28px; height: 28px; margin: -14px 0 0 -14px;
               border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity 0.12s linear;
               background: conic-gradient(#ffffff calc(var(--sp-hold, 0) * 1turn), rgb(255 255 255 / 0.28) 0);
               mask: radial-gradient(circle, transparent 8px, #000 9px)"
      ></span>
      <span
        data-part="badge-${i + 1}"
        aria-hidden="true"
        style="position: absolute; left: -5px; top: -5px; display: flex; align-items: center; justify-content: center;
               width: 17px; height: 17px; border-radius: 50%; background: var(--sp-ink); opacity: 0; transition: opacity 0.16s linear"
      ><span style="width: 8px; height: 2px; border-radius: 1px; background: var(--sp-surface)"></span></span>
    </div>`,
).join('');

/**
 * Jiggle mode specimen: a home screen of app icons that announces its editing state with
 * motion alone. A hold on any icon puts every rearrangeable one into a small rotation
 * oscillation and grows a delete badge on each; Done ends the mode and everything settles
 * square.
 *
 * The subject is the grid, not one icon: the term names a state the whole field of
 * rearrangeable things is in, and one icon wobbling on a still screen would be an
 * animation rather than a mode. The frame and the readout are scenery. A home screen at
 * rest is not jiggle mode, so the honest condition lives in `data-pose` and identify
 * summons the mode rather than ringing a screen standing still (SPEC §6).
 *
 * The press is really wired, on `pointerdown` plus a clock timer, and really cancelled by
 * an early lift, so a reader who takes the stage over enters the mode the way a thumb
 * does. The scripted pass holds an icon for real with the `hold` step (SPEC §8), so
 * nothing here impersonates the gesture the mode is entered by.
 *
 * A tap is told from a hold by the platform's own verdict on the press: a lift the browser
 * calls a tap is followed by `click`, and a hold is not, which is exactly the shape the
 * `hold` step has (it ends at pointerup and never becomes a click). So the countdown is
 * cancelled by the click rather than by the lift, and one wiring answers a thumb, a mouse,
 * the scripted hold, and identify's fast-forward of it alike.
 *
 * The oscillation runs on the stage's clock rather than an endless `element.animate`,
 * which nothing above the demo could freeze: a pose parks the icons mid-tilt instead of
 * letting them wobble on under a reader inspecting them. Under reduced motion the wobble
 * is never started and the mode is carried by the badges and the readout, which is the
 * whole reason a mode should not be announced by movement alone. Nothing here changes
 * size or position: a rotation, a ring, and an opacity cannot move a neighbour (SPEC §5).
 * Done is always present and merely inert outside the mode, so entering it moves nothing
 * in the bar.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Home</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right; white-space: nowrap">Hold an app to edit</span>
          <button class="sp-button sp-button--sm" type="button" data-part="done" aria-disabled="true">Done</button>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            class="sp-grid"
            data-part="grid"
            data-subject
            data-mode="idle"
            data-pose="[data-mode=editing]"
            style="grid-template-columns: repeat(4, ${TILE}px); gap: 18px 22px"
          >${cells}</div>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const done = part(root, 'done');
  const readout = part(root, 'readout');
  const apps = APPS.map((_, i) => part(root, `app-${i + 1}`));
  const badges = APPS.map((_, i) => part(root, `badge-${i + 1}`));
  const rings = APPS.map((_, i) => part(root, `ring-${i + 1}`));
  const reduced = prefersReducedMotion(root);

  let timer: number | undefined;
  let phase = 0;

  let hold: number | undefined;
  let elapsed = 0;
  let held: HTMLElement | undefined;

  const tick = () => {
    phase = 1 - phase;
    for (const [i, app] of apps.entries()) app.style.rotate = `${(i + phase) % 2 === 0 ? ANGLE : -ANGLE}deg`;
    timer = clock.setTimeout(tick, TICK_MS);
  };

  const clearHold = () => {
    clock.clearTimeout(hold);
    hold = undefined;
    elapsed = 0;
    if (held) {
      held.style.setProperty('--sp-hold', '0');
      held.style.opacity = '0';
    }
    held = undefined;
  };

  const setMode = (editing: boolean) => {
    grid.dataset.mode = editing ? 'editing' : 'idle';
    for (const badge of badges) badge.style.opacity = editing ? '1' : '0';
    // Present in both states, inert in one: a control appearing would move the bar (SPEC §5).
    done.setAttribute('aria-disabled', String(!editing));
    readout.textContent = editing ? 'Editing: drag to rearrange' : 'Hold an app to edit';

    clock.clearTimeout(timer);
    timer = undefined;
    if (editing && !reduced) return tick();
    for (const app of apps) app.style.rotate = '0deg';
  };

  const say = (text: string) => {
    readout.textContent = text;
  };

  /** Count the press out on the held icon's own ring, which is the cancel affordance. */
  const ringTick = (ring: HTMLElement) => {
    elapsed += RING_MS;
    ring.style.setProperty('--sp-hold', String(Math.min(elapsed / HOLD_MS, 1)));
    if (elapsed >= HOLD_MS) {
      clearHold();
      return setMode(true);
    }
    hold = clock.setTimeout(() => ringTick(ring), RING_MS);
  };

  for (const [index, app] of apps.entries()) {
    const ring = rings[index];
    const name = APPS[index]?.name;
    if (!ring || !name) continue;
    app.addEventListener('pointerdown', () => {
      if (grid.dataset.mode === 'editing') return;
      clearHold();
      held = ring;
      ring.style.setProperty('--sp-hold', '0');
      ring.style.opacity = '1';
      say('Holding');
      hold = clock.setTimeout(() => ringTick(ring), RING_MS);
    });
    // An early lift is not a failed hold, it is the tap that opens the app, so it has to
    // be worth something of its own or every press short of the threshold reads as broken.
    app.addEventListener('click', () => {
      if (hold === undefined) return;
      clearHold();
      say(`Opened ${name}`);
    });
    for (const event of ['pointercancel', 'pointerleave'] as const) {
      app.addEventListener(event, () => {
        if (hold !== undefined) {
          clearHold();
          say('Hold an app to edit');
        }
      });
    }
  }

  done.addEventListener('click', () => {
    if (grid.dataset.mode === 'editing') setMode(false);
  });

  setMode(false);
}
