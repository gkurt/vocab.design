import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the highlight rests on each target before moving on. */
const STEP_MS = 950;

type Target = { key: string; label: string; done: string };

const TARGETS: Target[] = [
  { key: 'email', label: 'Email field', done: 'Text entry opened' },
  { key: 'remember', label: 'Remember me', done: 'Remember me switched on' },
  { key: 'forgot', label: 'Forgot password', done: 'Forgot password followed' },
  { key: 'signin', label: 'Sign in', done: 'Signed in' },
];

/**
 * Switch access specimen: a sign-in form driven by one button. The highlight steps through
 * the four targets on the demo clock, and the switch selects whichever one it is resting on,
 * so the reader watches the only two facts a single switch has to work with: which target is
 * offered now, and how many steps it took to get there.
 *
 * The subject is the scanned group, the narrowest element the term names: switch access is
 * this set of targets being offered one at a time, and a ring around a single control would
 * name that control rather than the way it is reached. The switch, the readout, and the
 * caption are scenery (SPEC §5). The group is honest in both of its resting states, scanning
 * and stopped, so no `data-pose` is needed.
 *
 * The highlight is `data-sim-focus` and nothing here calls `.focus()`: attract never moves
 * real focus (SPEC §7). Its timer comes from the clock the mount was handed, so identify can
 * freeze the scan mid-cycle instead of having the highlight walk out from under the pose
 * (SPEC §6). Under reduced motion the scan rests on its first target rather than stepping.
 * The switch reaches "stopped" and Resume reaches "scanning", so neither control toggles
 * (SPEC §8), and every readout holds its height.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const targetRow = (t: Target, index: number) => `
    <div class="sp-row sp-row--between" data-part="row-${t.key}" style="gap: 10px; height: 30px; padding: 0 8px; border-radius: 6px">
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 12px">${t.label}</span>
      <span class="sp-label" data-part="num-${t.key}" style="flex: 0 0 auto; font-size: 10px">step ${index + 1}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One switch. No pointer, no keyboard.</span>
          <div class="sp-row" style="flex: 0 0 auto; gap: 6px">
            <button class="sp-button sp-button--sm" type="button" data-part="switch">Press switch</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="resume">Resume scan</button>
          </div>
        </div>

        <div class="sp-surface" data-part="group" data-subject data-state="scanning"
             style="margin-top: 10px; padding: 6px 8px; display: flex; flex-direction: column; gap: 2px">
          ${TARGETS.map(targetRow).join('')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The switch would activate</span>
          <span class="sp-text sp-text--ink" data-part="offer" style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Email field</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 3px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Result</span>
          <span class="sp-text" data-part="result" data-state="none"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Nothing selected yet</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 7px 0 0; height: 32px; font-size: 11px">
          The highlight is the whole interface. Anything four steps down the list costs four waits every single time.
        </p>
      </div>
    </div>
  `;

  const group = part(root, 'group');
  const offer = part(root, 'offer');
  const result = part(root, 'result');

  let at = 0;
  let timer: number | undefined;

  const paint = () => {
    TARGETS.forEach((t, index) => {
      const row = part(root, `row-${t.key}`);
      const on = index === at;
      flag(row, 'data-sim-focus', on);
      row.style.background = on ? 'var(--sp-accent-soft)' : 'transparent';
    });
    offer.textContent = TARGETS[at]?.label ?? '';
  };

  const step = () => {
    at = (at + 1) % TARGETS.length;
    paint();
    timer = clock.setTimeout(step, STEP_MS);
  };

  const scan = () => {
    clock.clearTimeout(timer);
    group.dataset.state = 'scanning';
    // A stated motion preference stops the cycle rather than shrinking it: the scan is
    // movement the reader did not ask for, and the switch still works without it.
    if (!prefersReducedMotion(root)) timer = clock.setTimeout(step, STEP_MS);
  };

  const press = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    group.dataset.state = 'stopped';
    const chosen = TARGETS[at];
    result.dataset.state = 'chosen';
    result.className = 'sp-text sp-text--ink';
    result.textContent = `${chosen?.done} after ${at + 1} ${at === 0 ? 'step' : 'steps'}`;
  };

  paint();
  scan();

  part(root, 'switch').addEventListener('click', press);
  part(root, 'resume').addEventListener('click', scan);
}
