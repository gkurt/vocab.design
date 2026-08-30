import { flag, part } from '#src/kit/parts.ts';

const CELLS = 18;
const CELL = 18;
const GAP = 3;
const PITCH = CELL + GAP;
const LAST = CELLS - 1;

const cellMarkup = Array.from(
  { length: CELLS },
  (_, i) =>
    `<span
       data-cell="${i}"
       style="flex: 0 0 auto; width: ${CELL}px; height: 26px; border-radius: 4px; background: var(--sp-sunken); transition: background-color 0.1s linear"
     ></span>`,
).join('');

/**
 * Key repeat specimen: a caret stepping along a row of character cells, once for a press and
 * over and over for a hold, with the initial delay and the repeat rate drawn as the two
 * phases of the timeline underneath. The subject is the track, since the term names what a
 * held key keeps doing to the thing under the caret rather than the key legend or the
 * timeline that measures it; the timeline and the legend are instrumentation and stay in
 * the context register.
 *
 * The hold is performed, not mimed: the `holdKey` step (SPEC §8) sends one keydown, waits
 * out the typematic delay, then repeats with `repeat: true` until its keyup, which is the
 * same shape an operating system sends. One handler answers the script and the reader
 * alike, and `event.repeat` is the flag an expensive handler is supposed to check before
 * it acts. The track carries `tabindex="0"` so a reader can focus it and hold the real
 * key: a keyboard demo an actual keyboard cannot drive would be scenery pretending.
 *
 * The caret moves by a transform and every readout holds its width, so a repeat moves the
 * caret and nothing else (SPEC §5).
 *
 * Four strings in the site's voice have gone from the frame. The two timeline segments read
 * "the initial delay" and "then repeat after repeat until release" and now carry the names
 * the settings actually have, Initial delay and Repeat rate. A line under them saying the
 * two belong to whoever owns the keyboard was deleted outright, since the article makes
 * that point. The key legend explained the term as well as the operation, and then told the
 * reader what to do with it ("Focus the track and hold to repeat."), which is an instruction
 * from the site rather than anything an editor prints. It is a shortcut legend now, naming
 * what the key does; the track's accessible name still says how to drive it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Line editor</span>
          <span
            class="sp-text"
            data-part="readout"
            data-source="none"
            style="width: 218px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums"
          >No repeats yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 14px">
          <div
            class="sp-surface"
            data-part="track"
            data-subject
            data-index="0"
            data-phase="idle"
            role="application"
            aria-label="Line editor track: hold ArrowRight to repeat"
            tabindex="0"
            style="position: relative; display: flex; gap: ${GAP}px; padding: 8px; overflow: hidden"
          >
            ${cellMarkup}
            <span
              data-part="caret"
              style="position: absolute; left: 6px; top: 6px; width: 3px; height: 30px; border-radius: 2px; background: var(--sp-accent); transform: translateX(0px); transition: transform 0.07s linear"
            ></span>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px">
            <div class="sp-row" style="gap: 6px">
              <span
                data-part="phase-delay"
                style="display: flex; align-items: center; justify-content: center; width: 128px; height: 24px; border-radius: 5px; background: var(--sp-sunken); font-size: 11px; font-weight: 500; color: var(--sp-muted)"
              >Initial delay</span>
              <span
                data-part="phase-rate"
                class="sp-grow"
                style="display: flex; align-items: center; justify-content: center; height: 24px; border-radius: 5px; background: var(--sp-sunken); font-size: 11px; font-weight: 500; color: var(--sp-muted)"
              >Repeat rate</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <span class="sp-kbd">ArrowRight</span>
            <span class="sp-label">Move by one, hold to repeat</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const caret = part(root, 'caret');
  const readout = part(root, 'readout');
  const delaySeg = part(root, 'phase-delay');
  const rateSeg = part(root, 'phase-rate');
  const cells = [...root.querySelectorAll<HTMLElement>('[data-cell]')];

  let index = 0;
  let repeats = 0;

  const draw = () => {
    for (const [i, cell] of cells.entries()) cell.style.background = i < index ? 'var(--sp-accent-soft)' : 'var(--sp-sunken)';
    caret.style.transform = `translateX(${index * PITCH}px)`;
    track.dataset.index = String(index);
  };

  const lit = (el: HTMLElement, on: boolean) => {
    el.style.background = on ? 'var(--sp-accent)' : 'var(--sp-sunken)';
    el.style.color = on ? 'var(--sp-accent-ink)' : 'var(--sp-muted)';
  };

  const phase = (next: 'idle' | 'delay' | 'repeating') => {
    track.dataset.phase = next;
    lit(delaySeg, next === 'delay');
    lit(rateSeg, next === 'repeating');
  };

  const say = (source: string, text: string) => {
    readout.dataset.source = source;
    readout.textContent = text;
  };

  const step = () => {
    index = Math.min(LAST, index + 1);
    draw();
  };

  // One handler for the scripted hold and the reader's: the first keydown is the press,
  // every one after it carries `repeat`, and the phases follow the events themselves.
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight') return;
    event.preventDefault();
    if (!event.repeat) {
      repeats = 0;
      flag(track, 'data-ran', false);
      // A fresh press on a full line starts the row over, so the demo cannot be
      // played dead: a reader arriving after a complete run still gets an answer.
      if (index >= LAST) index = -1;
      step();
      phase('delay');
      say('key', 'One press, one step');
      return;
    }
    repeats += 1;
    step();
    if (repeats >= 3) flag(track, 'data-ran', true);
    phase('repeating');
    say('key', `Held: 1 press, ${repeats} repeats`);
  });

  root.addEventListener('keyup', (event) => {
    if (event.key !== 'ArrowRight') return;
    phase('idle');
    if (repeats > 0) say('key', `Released: 1 press, ${repeats} repeats`);
  });

  phase('idle');
  draw();
}
