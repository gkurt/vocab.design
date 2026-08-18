import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Every box in the scene is stated once and never changes: a threshold firing moves nothing (SPEC §5). */
const SCENE = { w: 292, h: 148 };
const LIST_W = 118;
const GAUGE_W = 130;

/** The two lines the press crosses, as fractions of the force axis. */
const PEEK = 0.42;
const POP = 0.82;

/** Where each setting parks the press: under both marks, between them, past both. */
const LEVELS = { light: 0.2, firm: 0.58, deep: 0.95 } as const;
type Level = keyof typeof LEVELS;

const isLevel = (value: string): value is Level => value === 'light' || value === 'firm' || value === 'deep';

/** The simulated curve, one small step per tick, so a setting is travelled to rather than jumped to. */
const TICK_MS = 40;
const STEP = 0.06;
/** How long a crossing owns the readout before the stage's own sentence comes back. */
const SAY_MS = 1000;

/** The peek card's box, and the box it grows into when the press pops. */
const PEEK_BOX = { top: 26, right: 24, bottom: 26, left: 24 };
const POP_BOX = { top: 6, right: 6, bottom: 6, left: 6 };

const STAGES = {
  rest: { say: 'Under the peek mark: nothing has fired', name: 'Nothing lifted', box: PEEK_BOX },
  peek: { say: 'Past the peek mark: the preview lifts', name: 'Peek', box: PEEK_BOX },
  pop: { say: 'Past the pop mark: the message opens fully', name: 'Popped open', box: POP_BOX },
} as const;
type Stage = keyof typeof STAGES;

const MARKS = [
  { key: 'peek', at: PEEK, name: 'peek', label: 'Peek' },
  { key: 'pop', at: POP, name: 'pop', label: 'Pop' },
] as const;

const ROWS = [
  { key: 'ana', name: 'Ana Ruiz', line: 78 },
  { key: 'dana', name: 'Dana Okafor', line: 88 },
  { key: 'ops', name: 'Ops standup', line: 64 },
] as const;

/** The row the press lands on, which is the one element the term actually names. */
const SUBJECT = 'dana';

const listRow = ({ key, name, line }: (typeof ROWS)[number]) => {
  const subject = key === SUBJECT;
  const own = subject ? 'data-part="target" data-subject data-stage="rest" role="button" tabindex="0"' : '';
  const paint = subject
    ? 'cursor: pointer; touch-action: none; transition: transform 0.18s var(--sp-ease), background-color 0.18s ease'
    : '';
  return `
    <div class="sp-list-item${subject ? '' : ' sp-context'}" ${own} style="display: block; padding: 6px 8px; ${paint}">
      <span class="sp-text sp-text--ink" style="display: block; font-size: 12px; font-weight: 500; line-height: 1.3">${name}</span>
      <span class="sp-line" style="display: block; width: ${line}px; margin-top: 4px"></span>
    </div>`;
};

/**
 * A threshold drawn on the gauge, in two 2px pieces, since a hairline reads as absent and one bar
 * cannot stay legible over both an empty track and a full one: a notch cut across the track, and a
 * tick beside it that lights, with the label, once the press is past the line.
 */
const markup = ({ key, at, label }: (typeof MARKS)[number]) => `
  <span
    data-part="mark-${key}"
    style="position: absolute; left: 0; bottom: calc(${(at * 100).toFixed(0)}% - 1px); display: flex; align-items: center; width: 26px; height: 2px"
  >
    <span style="flex: 0 0 14px; height: 2px; background: var(--sp-surface)"></span>
    <span data-part="tick-${key}" style="flex: 1 1 auto; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
  </span>
  <span
    class="sp-label"
    data-part="mark-${key}-label"
    style="position: absolute; left: 30px; bottom: calc(${(at * 100).toFixed(0)}% - 7px); font-size: 11px; white-space: nowrap"
  >${label} ${at.toFixed(2)}</span>
`;

/**
 * Force touch specimen: a message row whose press has a depth, with the depth drawn as a gauge
 * carrying the two lines that fire something. Under the first mark a press is just contact. Past
 * it a preview lifts. Past the second the preview commits and fills the pane, and a tick lands at
 * each crossing, because a finger that has not moved has no other way to know it crossed anything.
 *
 * **This is a labelled simulation, and it says so on its face.** Nothing on this page can press
 * harder: a synthesized pointer carries no force at all and a mouse reports a constant. So the
 * setting parks the press at a depth and the gauge travels there on the clock `mount()` is handed,
 * firing each mark as it passes, which is the one thing about force touch worth watching. The row
 * itself is really wired for anyone who takes the stage over: holding it pushes the force up from
 * wherever the setting left it, and letting go drops it back.
 *
 * The subject is the row being pressed. The term names the target whose press has a depth, not the
 * preview that depth produces and not the gauge that reads it, and the row is the term in all three
 * states (a light press is as force sensing as a deep one), so there is no dishonest state to
 * declare in `data-pose`. The row gives under the press, which is the term's own behaviour rather
 * than annotation: the stage draws the pin and the spotlight itself. The list beside it, the
 * setting, the gauge and the caption are the scene around it in the context register.
 *
 * The preview never covers the row: it lifts into a pane of its own, absolutely positioned and
 * reserved from mount, so peeking and popping move nothing (SPEC §5). The row gives with a
 * transform for the same reason, and the actions a popped panel offers are pinned to its bottom
 * rather than taking a place in its flow.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
          <span class="sp-text" data-part="readout" style="width: 330px; text-align: right; white-space: nowrap">${STAGES.rest.say}</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label" style="white-space: nowrap">Press force</span>
            <sp-segmented class="sp-segmented" data-part="force" data-value="light">
              <button class="sp-segment" type="button" data-part="force-light" value="light">Light</button>
              <button class="sp-segment" type="button" data-part="force-firm" value="firm">Firm</button>
              <button class="sp-segment" type="button" data-part="force-deep" value="deep">Deep</button>
            </sp-segmented>
          </div>

          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            <div
              class="sp-surface"
              data-part="scene"
              style="flex: 0 0 auto; display: flex; width: ${SCENE.w}px; height: ${SCENE.h}px; overflow: hidden"
            >
              <div class="sp-list" style="flex: 0 0 ${LIST_W}px; padding: 6px; border-right: 1px solid var(--sp-line)">
                ${ROWS.map(listRow).join('')}
              </div>

              <div style="position: relative; flex: 1 1 auto; min-width: 0; background: var(--sp-sunken)">
                <span
                  class="sp-label"
                  data-part="idle"
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0 16px; text-align: center; line-height: 1.4; transition: opacity 0.18s"
                >Press past a mark to lift something</span>

                <div
                  class="sp-surface"
                  data-part="preview"
                  data-stage="rest"
                  style="position: absolute; top: ${PEEK_BOX.top}px; right: ${PEEK_BOX.right}px; bottom: ${PEEK_BOX.bottom}px; left: ${PEEK_BOX.left}px; display: flex; flex-direction: column; gap: 6px; padding: 10px; overflow: hidden; box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden; transition: top 0.22s var(--sp-ease), right 0.22s var(--sp-ease), bottom 0.22s var(--sp-ease), left 0.22s var(--sp-ease), opacity 0.18s, visibility 0.18s"
                >
                  <span class="sp-label" data-part="stage-name" style="font-size: 11px">${STAGES.peek.name}</span>
                  <span class="sp-heading" style="font-size: 13px; white-space: nowrap">Dana Okafor</span>
                  <span class="sp-line" style="display: block; width: 100%"></span>
                  <span class="sp-line" style="display: block; width: 74%"></span>
                  <div
                    class="sp-row"
                    data-part="actions"
                    style="position: absolute; left: 10px; right: 10px; bottom: 10px; gap: 6px; opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"
                  >
                    <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reply">Reply</button>
                    <button class="sp-button sp-button--sm" type="button" data-part="archive">Archive</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="sp-stack sp-context" style="width: ${GAUGE_W}px; height: ${SCENE.h}px; gap: 6px">
              <div class="sp-row sp-row--between">
                <span class="sp-label">Force</span>
                <span class="sp-heading" data-part="value" style="font-size: 15px; font-variant-numeric: tabular-nums">${LEVELS.light.toFixed(2)}</span>
              </div>
              <div style="position: relative; flex: 1 1 auto">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 14px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
                  <div
                    data-part="fill"
                    style="position: absolute; left: 0; right: 0; bottom: 0; height: ${(LEVELS.light * 100).toFixed(0)}%; border-radius: 999px; background: var(--sp-accent); transition: height 0.09s linear"
                  ></div>
                </div>
                ${MARKS.map(markup).join('')}
              </div>
            </div>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 14px 9px; text-align: center; line-height: 1.4">
          No pointer on this page can press harder, so the setting parks the force where a finger would hold it, and holding the row pushes it up from there.
        </span>
      </div>
    </div>
  `;

  const target = part(root, 'target');
  const preview = part(root, 'preview');
  const actions = part(root, 'actions');
  const idle = part(root, 'idle');
  const stageName = part(root, 'stage-name');
  const readout = part(root, 'readout');
  const value = part(root, 'value');
  const fill = part(root, 'fill');
  const segmented = part(root, 'force') as HTMLElement & { value: string };
  const marks = MARKS.map((mark) => ({
    ...mark,
    bar: part(root, `mark-${mark.key}`),
    tick: part(root, `tick-${mark.key}`),
    label: part(root, `mark-${mark.key}-label`),
  }));

  const reduced = prefersReducedMotion(root);

  let force = LEVELS.light;
  let aim = force;
  let stage: Stage = 'rest';
  let level: Level = 'light';
  let timer: number | undefined;
  let sayTimer: number | undefined;

  const say = (text: string) => {
    readout.textContent = text;
    clock.clearTimeout(sayTimer);
    sayTimer = clock.setTimeout(() => {
      readout.textContent = STAGES[stage].say;
    }, SAY_MS);
  };

  /** The tick a threshold owes the finger: a swell on the mark, and the crossing said out loud. */
  const crossed = (mark: (typeof marks)[number]) => {
    say(`Haptic tick at the ${mark.name} mark`);
    // A keyframe set built in script is out of `motion.css`'s reach, so the gate is asked here.
    if (!reduced) mark.bar.animate([{ scale: '1 1' }, { scale: '1.15 3' }, { scale: '1 1' }], { duration: 260, easing: 'ease-out' });
  };

  const setStage = (next: Stage) => {
    if (next === stage) return;
    stage = next;
    const { name, box } = STAGES[next];
    const open = next !== 'rest';
    const popped = next === 'pop';

    target.dataset.stage = next;
    // The row gives under the press with a transform, so the rows around it hold still (SPEC §5).
    target.style.transform = next === 'rest' ? 'none' : popped ? 'scale(0.94)' : 'scale(0.97)';
    target.style.backgroundColor = open ? 'var(--sp-accent-soft)' : 'transparent';

    preview.dataset.stage = next;
    preview.style.top = `${box.top}px`;
    preview.style.right = `${box.right}px`;
    preview.style.bottom = `${box.bottom}px`;
    preview.style.left = `${box.left}px`;
    preview.style.opacity = open ? '1' : '0';
    preview.style.visibility = open ? 'visible' : 'hidden';
    stageName.textContent = name;

    actions.style.opacity = popped ? '1' : '0';
    actions.style.visibility = popped ? 'visible' : 'hidden';
    idle.style.opacity = open ? '0' : '1';
    say(STAGES[next].say);
  };

  const setForce = (next: number) => {
    const previous = force;
    force = Math.round(Math.min(1, Math.max(0, next)) * 100) / 100;
    value.textContent = force.toFixed(2);
    fill.style.height = `${(force * 100).toFixed(0)}%`;
    for (const mark of marks) {
      const passed = force >= mark.at;
      mark.tick.style.background = passed ? 'var(--sp-ink)' : 'var(--sp-line)';
      mark.label.style.color = passed ? 'var(--sp-ink)' : 'var(--sp-muted)';
      if (passed && previous < mark.at) crossed(mark);
    }
    setStage(force >= POP ? 'pop' : force >= PEEK ? 'peek' : 'rest');
  };

  const travel = () => {
    timer = undefined;
    setForce(force < aim ? Math.min(aim, force + STEP) : Math.max(aim, force - STEP));
    if (force !== aim) timer = clock.setTimeout(travel, TICK_MS);
  };

  const press = (depth: number) => {
    aim = Math.round(depth * 100) / 100;
    clock.clearTimeout(timer);
    timer = undefined;
    if (force === aim) return;
    // Reduced motion gets the destination without the climb; the crossings still fire in order.
    if (reduced) return setForce(aim);
    timer = clock.setTimeout(travel, TICK_MS);
  };

  segmented.addEventListener('change', () => {
    if (!isLevel(segmented.value)) return;
    level = segmented.value;
    press(LEVELS[level]);
  });

  // The real wiring, live for a finger: holding the row pushes the press deeper, releasing it
  // hands the force back to the setting. A synthesized click is down and up in the same breath,
  // so it borrows a step of depth and gives it straight back, which is the honest answer to one.
  target.addEventListener('pointerdown', () => press(1));
  const release = () => press(LEVELS[level]);
  for (const event of ['pointerup', 'pointerleave', 'pointercancel'] as const) target.addEventListener(event, release);

  // A popped panel is dismissed by acting on it, never by a toggle (SPEC §8): either action
  // returns the press to rest through the setting, so the control and the gauge never disagree.
  const dismiss = (outcome: string) => {
    segmented.value = 'light';
    level = 'light';
    press(LEVELS.light);
    say(outcome);
  };
  part(root, 'reply').addEventListener('click', () => dismiss('Reply opened, and the press is released'));
  part(root, 'archive').addEventListener('click', () => dismiss('Archived, and the press is released'));

  setForce(LEVELS.light);
}
