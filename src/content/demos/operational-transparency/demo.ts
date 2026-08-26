import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long one unit of work takes, and the whole job is four of them. */
const STEP_MS = 620;

const STEPS: { key: string; label: string; result: string }[] = [
  { key: 'step-fares', label: 'Airline fares', result: '218 found' },
  { key: 'step-agency', label: 'Agency prices', result: '4 agencies' },
  { key: 'step-bags', label: 'Baggage rules', result: 'checked' },
  { key: 'step-seats', label: 'Seat availability', result: '31 seats' },
];

const ARC = `
  <svg data-part="arc" viewBox="0 0 24 24" style="width: 26px; height: 26px; fill: none; stroke: var(--sp-muted); stroke-width: 2.4; stroke-linecap: round">
    <circle cx="12" cy="12" r="9" stroke-opacity="0.28" />
    <path d="M21 12a9 9 0 0 0-9-9" />
  </svg>`;

const row = ({ key, label }: { key: string; label: string }): string => `
  <div class="sp-row" data-part="${key}" style="gap: 8px; height: 22px">
    <span data-part="${key}-mark" style="display: flex; flex: 0 0 auto; width: 16px; height: 16px; align-items: center; justify-content: center">
      <span
        style="width: 11px; height: 11px; border: 1.5px solid var(--sp-line); border-radius: 50%"
      ></span>
    </span>
    <span class="sp-grow" style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${label}</span>
    <span
      data-part="${key}-result"
      style="flex: 0 0 auto; width: 74px; text-align: right; font-size: 11px; color: var(--sp-muted); white-space: nowrap"
    ></span>
  </div>`;

const CHECK = `<span style="display: flex; color: var(--sp-accent)">${icon('check')}</span>`;

/**
 * Operational transparency specimen: the same wait, twice. On the left it is a spinner, which
 * says only that something is happening and says it identically at second two and second
 * twenty. On the right the work is named, four real units of it, each one keeping its result on
 * screen once it lands, so the wait leaves the reader knowing more than they did.
 *
 * The subject is the list of named work, which is the narrowest element the term names: not the
 * panel around it and not the scene, since the spinner beside it is the thing being compared
 * against rather than a peer instance. The spinner panel and the Search control are scenery.
 *
 * Nothing runs at mount, so the scripted press is the only owner of the run (SPEC §8), and the
 * mount state is honest: the units of work are named and waiting, which is already the term.
 * Each step's result column keeps its width from the start, so a landed step moves nothing
 * (SPEC §5), and the spinner's rotation asks about reduced motion before it turns.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px; padding: 14px">
        <div class="sp-row" data-part="run" data-state="idle" style="align-items: stretch; gap: 20px">
          <div class="sp-context" style="width: 158px; display: flex; flex-direction: column; gap: 4px">
            <span class="sp-label">A spinner</span>
            <div
              class="sp-surface"
              data-part="spin"
              style="flex: 1 1 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px"
            >
              <span data-part="glyph" style="display: flex; width: 26px; height: 26px; align-items: center; justify-content: center">${ARC}</span>
              <span class="sp-text" data-part="spin-status" style="font-size: 12px">Ready</span>
            </div>
          </div>

          <div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 4px">
            <span class="sp-label">The work, named</span>
            <div class="sp-surface" style="flex: 1 1 auto; display: flex; flex-direction: column; padding: 12px">
              <div data-part="list" data-subject style="display: flex; flex-direction: column; gap: 6px">
                ${STEPS.map(row).join('')}
              </div>
              <div style="margin-top: auto">
                <div class="sp-divider" style="margin: 8px 0 6px"></div>
                <div style="height: 16px">
                  <span class="sp-text sp-text--ink" data-part="summary" style="font-size: 11px" hidden></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-text" style="font-size: 12px">One wait, told two ways.</span>
          <button class="sp-button sp-button--sm" type="button" data-part="search">Search</button>
        </div>
      </div>
    </div>
  `;

  const reduced = prefersReducedMotion(root);
  const run = part(root, 'run');
  const glyph = part(root, 'glyph');
  const status = part(root, 'spin-status');
  const summary = part(root, 'summary');

  let spin: Animation | undefined;
  let timer: number | undefined;

  const setStep = (index: number, done: boolean) => {
    const step = STEPS[index];
    if (!step) return;
    flag(part(root, step.key), 'data-done', done);
    part(root, `${step.key}-mark`).innerHTML = done
      ? CHECK
      : '<span style="width: 11px; height: 11px; border: 1.5px solid var(--sp-line); border-radius: 50%"></span>';
    part(root, `${step.key}-result`).textContent = done ? step.result : '';
  };

  const setSpinning = (spinning: boolean) => {
    spin?.cancel();
    spin = undefined;
    if (!spinning) return;
    // A rotation `motion.css` cannot reach, so the demo asks the question itself (SPEC §6).
    if (reduced) {
      glyph.style.transform = 'rotate(40deg)';
      return;
    }
    glyph.style.transform = '';
    spin = glyph.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
      duration: 900,
      iterations: Number.POSITIVE_INFINITY,
    });
  };

  const settle = () => {
    run.dataset.state = 'done';
    setSpinning(false);
    glyph.innerHTML = CHECK;
    status.textContent = 'Done';
    summary.textContent = '218 fares from 4 agencies';
    summary.hidden = false;
  };

  const step = (index: number) => {
    setStep(index, true);
    if (index + 1 >= STEPS.length) return settle();
    timer = clock.setTimeout(() => step(index + 1), STEP_MS);
  };

  /** Always a fresh job from the start, so a resumed pass shows the same thing (SPEC §8). */
  const begin = () => {
    clock.clearTimeout(timer);
    run.dataset.state = 'running';
    summary.hidden = true;
    summary.textContent = '';
    glyph.innerHTML = ARC;
    status.textContent = 'Searching';
    setSpinning(true);
    for (let i = 0; i < STEPS.length; i += 1) setStep(i, false);
    timer = clock.setTimeout(() => step(0), STEP_MS);
  };

  part(root, 'search').addEventListener('click', begin);

  for (let i = 0; i < STEPS.length; i += 1) setStep(i, false);
}
