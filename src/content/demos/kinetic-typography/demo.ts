import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The three treatments, and the one property each of them actually moves. */
const READS: Record<string, string> = {
  drop: 'transform, staggered: the letters arrive one after another',
  swell: 'one variation axis: wght travelling 200 to 800',
  stutter: 'position in hard steps, with no easing at all',
};

/** The falling word, split so each letter can be given a delay of its own. */
const DROP = 'drop';
const STAGGER = 55;
/** Where the stutter puts the word, step by step, and how bright it is at each. */
const STUTTER: { x: number; opacity: number }[] = [
  { x: 5, opacity: 0.5 },
  { x: -4, opacity: 1 },
  { x: 4, opacity: 0.45 },
  { x: -2, opacity: 1 },
  { x: 1, opacity: 0.6 },
  { x: 0, opacity: 1 },
];
const STEP = 58;

const LIGHT = 200;
const HEAVY = 800;
/** The display block's own box: two lines of room, and width for the heaviest setting. */
const LINE_W = 300;
const STAGE_H = 78;

/**
 * Kinetic typography specimen: one display line whose three verbs each perform
 * their own meaning, with the picker choosing which one is on. The word "drop"
 * falls letter by letter and overshoots, "swell" travels up the weight axis of the
 * variable font this page loads, and "stutter" moves in hard steps with no easing,
 * so each treatment is the sentence rather than an entrance played over it.
 *
 * The subject is the display line. Nothing moves that is not performing: the block
 * has a fixed box, the swelling word is last on its line and grows into empty room,
 * and the other two treatments are transforms, which take no space at all (SPEC §5).
 *
 * Motion comes from inline transitions wherever one write can express it, so the
 * kit's reduced-motion rule lands the end pose by itself. The stutter is a sequence
 * rather than a state, so it asks `prefersReducedMotion` and rests on its final
 * frame instead of playing (SPEC §6). Every beat is on the stage's clock.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const letters = [...DROP]
    .map((ch, i) => `<span data-part="drop-letter" data-i="${i}" style="display: inline-block">${ch}</span>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Motion" data-part="segmented" data-value="drop">
            <button class="sp-segment" data-part="seg-drop" value="drop">drop</button>
            <button class="sp-segment" data-part="seg-swell" value="swell">swell</button>
            <button class="sp-segment" data-part="seg-stutter" value="stutter">stutter</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="justify-content: center; height: ${STAGE_H}px; margin-top: 8px">
          <p data-part="phrase" data-subject data-mode="drop"
             style="margin: 0; width: ${LINE_W}px; font-size: 28px; line-height: 1.34; font-weight: 500">Type can <span
             data-part="word-drop" style="display: inline-block">${letters}</span>,<br><span
             data-part="word-stutter" style="display: inline-block">stutter</span>, or <span
             data-part="word-swell" style="display: inline-block; font-weight: ${HEAVY}">swell.</span></p>
        </div>
        <div class="sp-row sp-context" data-part="readout" style="height: 24px; margin-top: 4px">
          <span class="sp-chip" data-part="read" style="cursor: default"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 8px">
          Each verb is animated by the thing it names, and each one ends somewhere legible, because the
          resting frame is what most readers will see.
        </p>
      </div>
    </div>
  `;

  const phrase = part(root, 'phrase');
  const swell = part(root, 'word-swell');
  const stutter = part(root, 'word-stutter');
  const drops = partsOf(root, 'drop-letter');
  const read = part(root, 'read');

  let timers: number[] = [];
  const after = (ms: number, fn: () => void) => timers.push(clock.setTimeout(fn, ms));

  /** Every word back on its final frame, which is where each treatment leaves it. */
  const settle = () => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    for (const letter of drops) {
      letter.style.transition = 'none';
      letter.style.transitionDelay = '0ms';
      letter.style.translate = '0 0';
      letter.style.opacity = '1';
    }
    swell.style.transition = 'none';
    swell.style.fontWeight = String(HEAVY);
    stutter.style.translate = '0 0';
    stutter.style.opacity = '1';
  };

  const apply = (value: string) => {
    const note = READS[value];
    if (!note) return;
    phrase.dataset.mode = value;
    read.textContent = note;
    settle();
    if (prefersReducedMotion(root)) return;

    if (value === 'drop') {
      for (const letter of drops) {
        letter.style.translate = '0 -26px';
        letter.style.opacity = '0';
      }
      after(40, () => {
        for (const letter of drops) {
          letter.style.transition = 'translate 0.46s cubic-bezier(0.2, 1.5, 0.4, 1), opacity 0.26s linear';
          letter.style.transitionDelay = `${Number(letter.dataset.i ?? 0) * STAGGER}ms`;
          letter.style.translate = '0 0';
          letter.style.opacity = '1';
        }
      });
      return;
    }

    if (value === 'swell') {
      swell.style.fontWeight = String(LIGHT);
      after(40, () => {
        swell.style.transition = 'font-weight 0.62s var(--sp-ease)';
        swell.style.fontWeight = String(HEAVY);
      });
      return;
    }

    STUTTER.forEach((frame, i) => {
      after(i * STEP, () => {
        stutter.style.translate = `${frame.x}px 0`;
        stutter.style.opacity = String(frame.opacity);
      });
    });
  };

  apply('drop');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
