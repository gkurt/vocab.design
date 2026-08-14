import { type IconName, icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Half the wobble, and how often it changes its mind. Small: a big one reads as broken. */
const ANGLE = 1.4;
const TICK_MS = 170;
const TILE = 56;

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
             transition: rotate ${TICK_MS}ms linear"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: ${TILE}px; height: ${TILE}px;
               border-radius: 14px; background: ${wash}; color: #ffffff"
      >${icon(glyph)}</span>
      <span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">${name}</span>
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
 * motion alone. A hold puts every rearrangeable icon into a small rotation oscillation
 * and grows a delete badge on each; Done ends the mode and everything settles square.
 *
 * The subject is the grid, not one icon: the term names a state the whole field of
 * rearrangeable things is in, and one icon wobbling on a still screen would be an
 * animation rather than a mode. The frame, the readout, and the hold simulation are
 * scenery. A home screen at rest is not jiggle mode, so the honest condition lives in
 * `data-pose` and identify summons the mode rather than ringing a screen standing still
 * (SPEC §6).
 *
 * The oscillation runs on the stage's clock rather than an endless `element.animate`,
 * which nothing above the demo could freeze: a pose parks the icons mid-tilt instead of
 * letting them wobble on under a reader inspecting them. Under reduced motion the wobble
 * is never started and the mode is carried by the badges and the readout, which is the
 * whole reason a mode should not be announced by movement alone. Nothing here changes
 * size or position: a rotation and an opacity cannot move a neighbour (SPEC §5).
 *
 * There is no hold step in the choreography vocabulary (SPEC §8), so the scripted pass
 * enters the mode through a labelled simulation control, the same answer the long press
 * specimen gives to the same problem. Done is always present and merely inert outside
 * the mode, so entering it moves nothing in the bar.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Home</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right; white-space: nowrap">Tap an app to open it</span>
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
      <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="hold">Simulate a hold on an icon</button>
    </div>
  `;

  const grid = part(root, 'grid');
  const done = part(root, 'done');
  const readout = part(root, 'readout');
  const apps = APPS.map((_, i) => part(root, `app-${i + 1}`));
  const badges = APPS.map((_, i) => part(root, `badge-${i + 1}`));
  const reduced = prefersReducedMotion(root);

  let timer: number | undefined;
  let phase = 0;

  const tick = () => {
    phase = 1 - phase;
    for (const [i, app] of apps.entries()) app.style.rotate = `${(i + phase) % 2 === 0 ? ANGLE : -ANGLE}deg`;
    timer = clock.setTimeout(tick, TICK_MS);
  };

  const setMode = (editing: boolean) => {
    grid.dataset.mode = editing ? 'editing' : 'idle';
    for (const badge of badges) badge.style.opacity = editing ? '1' : '0';
    // Present in both states, inert in one: a control appearing would move the bar (SPEC §5).
    done.setAttribute('aria-disabled', String(!editing));
    readout.textContent = editing ? 'Editing: drag to rearrange' : 'Tap an app to open it';

    clock.clearTimeout(timer);
    timer = undefined;
    if (editing && !reduced) return tick();
    for (const app of apps) app.style.rotate = '0deg';
  };

  part(root, 'hold').addEventListener('click', () => setMode(true));
  done.addEventListener('click', () => {
    if (grid.dataset.mode === 'editing') setMode(false);
  });

  setMode(false);
}
