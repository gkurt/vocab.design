import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const OPENING =
  'he oldest way to open a page is with a letter too big for the line it starts. ' +
  'Sinking it into the paragraph gives a reader somewhere to begin, and standing it on the ' +
  'first baseline does the same job while leaving every line below it alone, which is why the ' +
  'raised setting survives in a column too narrow for a sunk one to fit.';

/** The prose rhythm the whole specimen is measured against: 13px type on 19.5px lines. */
const LINE = 19.5;

/**
 * Both initials are floats, and the height of the float is what decides how many
 * lines make room for the letter: one line for the raised setting, three for the
 * sunk one. A float never changes the line boxes beside it, so the first
 * baseline stays exactly where it was at every setting, which is the claim the
 * rule in the specimen is there to let a reader check.
 *
 * The letter is a T, chosen because it has nothing below the baseline to hang.
 */
const MODES = {
  none: {
    css: 'float: none; font-size: inherit; line-height: inherit; margin: 0',
    read: 'no initial: the first letter is ordinary text',
  },
  drop: {
    css: `float: left; font-size: 68px; line-height: ${3 * LINE - 1.5}px; margin: 1px 8px 0 0`,
    read: 'drop cap: the foot lands three lines down',
  },
  raised: {
    css: 'float: left; font-size: 46px; line-height: 19.5px; margin: 0 6px 0 0',
    read: 'raised cap: the foot stands on the first baseline',
  },
} as const;

type Mode = keyof typeof MODES;

const IS_MODE = (value: string): value is Mode => value in MODES;

/** Headroom for the raised letter, so it rises into reserved space instead of moving the block (SPEC §5). */
const HEADROOM = 26;
/** Room for the tallest arrangement (the sunk letter costs the paragraph a line). */
const PAGE = 148;

/**
 * Raised cap specimen: one article opening set with no initial, with a drop cap,
 * and with a raised cap, against a rule drawn on the first line's baseline. Both
 * the rule and the raised letter's own rise are measured off the mounted
 * paragraph rather than declared, so what a reader checks (this foot is on that
 * line, the sunk one is two lines under it) is the specimen's own geometry.
 *
 * The subject is the capital itself. Two of the three settings are the reference
 * rather than the term, so the honest condition is declared in `data-pose` and
 * the specimen mounts raised (SPEC §6). The picker, the rule and the read-out are
 * the demo's instrumentation and stay in the context register (SPEC §5).
 *
 * The block holds the headroom the raised letter needs and the extra line the
 * sunk one costs, at every setting, so switching settings moves nothing but the
 * letter (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tick = 'display: inline-block; width: 0; height: 0';

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">opening letter</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="raised">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-drop" value="drop">drop</button>
            <button class="sp-segment" data-part="seg-raised" value="raised">raised</button>
          </sp-segmented>
        </div>
        <div data-part="page" style="position: relative; height: ${PAGE}px; padding-top: ${HEADROOM}px; margin-top: 8px">
          <span data-part="guide" aria-hidden="true"
                style="position: absolute; left: 0; right: 0; height: 3px; opacity: 0.5; background: var(--sp-ink)"></span>
          <div class="sp-prose" style="position: relative; max-width: none">
            <p data-part="opening" style="margin: 0"><span
              data-part="cap" data-subject data-mode="raised" data-raised data-pose="[data-raised]"
              style="${MODES.raised.css}">T<span data-part="cap-foot" aria-hidden="true" style="${tick}"></span></span><span
              data-part="line-tick" aria-hidden="true" style="${tick}"></span><span class="sp-context">${OPENING}</span></p>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${MODES.raised.read}</span>
          <span class="sp-label">rule: first baseline</span>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const cap = part(root, 'cap');
  const guide = part(root, 'guide');
  const readout = part(root, 'readout');

  /*
   * Measured on the state the markup mounted in, never after a style write
   * (AGENTS.md). A zero-height inline-block aligns its bottom edge to the
   * baseline it sits on, so one tick in the text reads the first line's baseline
   * and one inside the letter reads the letter's own.
   */
  const pageTop = page.getBoundingClientRect().top;
  const baseline = part(root, 'line-tick').getBoundingClientRect().bottom - pageTop;
  const foot = part(root, 'cap-foot').getBoundingClientRect().bottom - pageTop;
  const risen = `${Math.round((baseline - foot) * 10) / 10}px`;

  guide.style.top = `${Math.round(baseline) - 1}px`;
  cap.style.marginTop = risen;

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    cap.dataset.mode = value;
    flag(cap, 'data-raised', value === 'raised');
    cap.style.cssText = MODES[value].css;
    if (value === 'raised') cap.style.marginTop = risen;
    readout.textContent = MODES[value].read;
  });
}
