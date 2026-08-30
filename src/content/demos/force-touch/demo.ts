import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import { pressureHold } from '#src/kit/touch.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Every box in the scene is stated once and never changes: a threshold firing moves nothing (SPEC §5). */
const SCENE = { w: 292, h: 148 };
const LIST_W = 118;
const GAUGE_W = 130;

/** The two lines the press crosses, as fractions of the force axis. */
const PEEK = 0.42;
const POP = 0.82;

/** The released press falls back one small step per tick; the climb is the gesture's own. */
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
  const own = `data-part="${subject ? 'target' : `row-${key}`}"${subject ? ' data-subject' : ''} data-stage="rest" role="button" tabindex="0"`;
  return `
    <div class="sp-list-item${subject ? '' : ' sp-context'}" ${own} style="display: block; padding: 6px 8px; touch-action: none; transition: transform 0.18s var(--sp-ease), background-color 0.18s ease">
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
 * Force touch specimen: a message row whose press has a depth, performed rather than picked. The
 * scene is a touch surface (`data-touch`), so the script presses it with a fingertip: a `hold`
 * step's pressure climbs at a finger's rate, the gauge reads it live, and each mark fires as it is
 * crossed, with a haptic tick, because a finger that has not moved has no other way to know. A
 * brief hold crosses only the peek mark and the preview settles back on release; a long hold
 * bottoms out, and past the pop mark the preview commits and stays for its actions.
 *
 * A real reader makes the same gesture through `pressureHold` (SPEC §7): force hardware drives it
 * with pressure, and a plain mouse or pressureless finger buys depth with time, held on the demo's
 * own clock. One wiring answers the script, a finger, and a held button; a bare click is down and
 * up in the same breath and honestly fires nothing.
 *
 * Every row answers a press the same way: the neighbours sit in the context register, quieter but
 * live, and pressing one of them retargets the preview to it. The subject is the row the script
 * presses. The term names the target whose press has a depth, not the preview that depth produces
 * and not the gauge that reads it, and the row is the term in all three states (a light press is
 * as force sensing as a deep one), so there is no dishonest state to declare in `data-pose`. The
 * row gives under the press, which is the term's own behaviour rather than annotation: the stage
 * draws the pin and the spotlight itself. The gauge is scenery.
 *
 * The gauge's readout sits under the gauge, not in the Mail window's title bar, where it used
 * to be dressed as the product's own chrome: no title bar prints which side of a pressure
 * threshold a finger is on. It stays inside the frame because this demo DRAWS the instrument
 * that produces it, the force track with its two marks, which is the whole of the term.
 *
 * Two strings were the site talking inside the Mail window. The empty pane read "Hold a
 * row to press into it", an instruction to the reader rather than an empty state, and it
 * says "No message selected" now. A line along the bottom of the frame explained that a
 * pointer with no force sensor buys depth with time; the article covers that, and the
 * substitution is written up above for the next author, so it went.
 *
 * The preview never covers the row: it lifts into a pane of its own, absolutely positioned and
 * reserved from mount, so peeking and popping move nothing (SPEC §5). The row gives with a
 * transform for the same reason, and the actions a popped panel offers are pinned to its bottom
 * rather than taking a place in its flow.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-touch style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
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
                >No message selected</span>

                <div
                  class="sp-surface"
                  data-part="preview"
                  data-stage="rest"
                  style="position: absolute; top: ${PEEK_BOX.top}px; right: ${PEEK_BOX.right}px; bottom: ${PEEK_BOX.bottom}px; left: ${PEEK_BOX.left}px; display: flex; flex-direction: column; gap: 6px; padding: 10px; overflow: hidden; box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden; transition: top 0.22s var(--sp-ease), right 0.22s var(--sp-ease), bottom 0.22s var(--sp-ease), left 0.22s var(--sp-ease), opacity 0.18s, visibility 0.18s"
                >
                  <span class="sp-label" data-part="stage-name" style="font-size: 11px">${STAGES.peek.name}</span>
                  <span class="sp-heading" data-part="preview-name" style="font-size: 13px; white-space: nowrap">Dana Okafor</span>
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
                <span class="sp-heading" data-part="value" style="font-size: 15px; font-variant-numeric: tabular-nums">0.00</span>
              </div>
              <div style="position: relative; flex: 1 1 auto">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 14px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
                  <div
                    data-part="fill"
                    style="position: absolute; left: 0; right: 0; bottom: 0; height: 0%; border-radius: 999px; background: var(--sp-accent); transition: height 0.09s linear"
                  ></div>
                </div>
                ${MARKS.map(markup).join('')}
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="width: ${SCENE.w + 10 + GAUGE_W}px">
            <span class="sp-text" data-part="readout" style="height: 16px; font-size: 12px; white-space: nowrap">${STAGES.rest.say}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const rows = ROWS.map((row) => ({ ...row, el: part(root, row.key === SUBJECT ? 'target' : `row-${row.key}`) }));
  const preview = part(root, 'preview');
  const previewName = part(root, 'preview-name');
  const actions = part(root, 'actions');
  const idle = part(root, 'idle');
  const stageName = part(root, 'stage-name');
  const readout = part(root, 'readout');
  const value = part(root, 'value');
  const fill = part(root, 'fill');
  const marks = MARKS.map((mark) => ({
    ...mark,
    bar: part(root, `mark-${mark.key}`),
    tick: part(root, `tick-${mark.key}`),
    label: part(root, `mark-${mark.key}-label`),
  }));

  const reduced = prefersReducedMotion(root);

  let force = 0;
  let stage: Stage = 'rest';
  /** The row under the press: every row answers one, and the preview follows it. */
  let active = rows.find((row) => row.key === SUBJECT) as (typeof rows)[number];
  /** Past the pop mark the preview has committed: the finger leaving no longer closes it. */
  let committed = false;
  let fallTimer: number | undefined;
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
    // The evidence an assert can hold onto after the gesture is over (SPEC §8).
    readout.dataset.last = mark.key;
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

    active.el.dataset.stage = next;
    // The row gives under the press with a transform, so the rows around it hold still (SPEC §5).
    active.el.style.transform = next === 'rest' ? 'none' : popped ? 'scale(0.94)' : 'scale(0.97)';
    active.el.style.backgroundColor = open ? 'var(--sp-accent-soft)' : 'transparent';

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
    if (force >= POP) committed = true;
    // A committed pop no longer follows the force down; only acting on it closes it.
    setStage(committed ? 'pop' : force >= PEEK ? 'peek' : 'rest');
  };

  /** The released press falls back on the clock; the climb only ever comes from the gesture. */
  const fall = () => {
    fallTimer = undefined;
    setForce(force - STEP);
    if (force > 0) fallTimer = clock.setTimeout(fall, TICK_MS);
  };
  const release = () => {
    clock.clearTimeout(fallTimer);
    fallTimer = undefined;
    if (force === 0) return;
    // Reduced motion gets the destination without the descent.
    if (reduced) return setForce(0);
    fallTimer = clock.setTimeout(fall, TICK_MS);
  };

  // The gesture is the input: script, finger, and held mouse button all arrive here as one
  // rising force signal (SPEC §7). A bare click is down and up in the same breath, so it
  // borrows a flicker of depth and gives it straight back, which is the honest answer to one.
  // Every row answers a press; the preview follows whichever one the finger is on, and a
  // press landing on a new row hands the old one, commitment included, back to rest first.
  for (const row of rows) {
    pressureHold(row.el, clock, {
      onForce: (pressed) => {
        clock.clearTimeout(fallTimer);
        fallTimer = undefined;
        if (active !== row) {
          committed = false;
          setForce(0);
          active = row;
          previewName.textContent = row.name;
        }
        setForce(pressed);
      },
      onEnd: (reached) => {
        if (committed) say('Released past the pop: the panel stays open');
        else if (reached >= PEEK) say('Released before the pop mark: the peek settles back');
        release();
      },
    });
  }

  // A popped panel is dismissed by acting on it, never by a toggle (SPEC §8): either action
  // releases the commitment and hands the scene back to rest.
  const dismiss = (outcome: string) => {
    committed = false;
    clock.clearTimeout(fallTimer);
    fallTimer = undefined;
    setForce(0);
    setStage('rest');
    say(outcome);
  };
  part(root, 'reply').addEventListener('click', () => dismiss('Reply opened, and the press is released'));
  part(root, 'archive').addEventListener('click', () => dismiss('Archived, and the press is released'));

  setStage('rest');
  setForce(0);
}
