import { icon } from '#src/kit/icons.ts';
import { localBox } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The whole pile, start to settled, and how long the colour flash holds. */
const RUN_MS = 620;
const FLASH_MS = 260;
const SPARKS = 14;
const SPARK_COLOURS = ['#e8534f', '#f2b134', '#3aa76d', '#3557e8', '#c2477f'];

/** Every response the press can fire, in the order it arrives. */
const RESPONSES = ['squash', 'overshoot', 'sparks', 'count', 'flash', 'settle'];

const chips = RESPONSES.map(
  (key) => `
    <span
      class="sp-chip"
      data-part="resp-${key}"
      style="flex: 0 0 auto; white-space: nowrap; font-size: 11px; padding: 2px 8px"
    >${key}</span>`,
).join('');

/**
 * Juiciness specimen: one Like button, and a picker for how much answer a press gets.
 * On Juicy a single click fires six responses at once (squash under the press, an
 * overshoot on release, a spray of sparks, the count stepping up, a colour flash, and a
 * wobble that settles); on Plain the same click fires one. The legend names each response
 * as it lands, because the term is the SIZE of the pile rather than any effect in it, and
 * a stack nobody can count reads as one well-made animation.
 *
 * The subject is the button: the term names how a control answers rather than the control,
 * and the response stack has no element of its own, so the responding button is the
 * narrowest honest answer. Plain is a counter-example the subject itself passes through, so
 * the honest condition is declared in `data-pose` and identify refuses to pose it (SPEC §6);
 * the mount state is Juicy, which satisfies it.
 *
 * The press owns the run and nothing autoplays on mount, so no click ever cuts a run the
 * reader can see (SPEC §8). Sparks, squash and settle go to `element.animate`, which
 * `motion.css` cannot reach, so the demo asks `prefersReducedMotion` itself and drops them:
 * a reader who asked for less movement gets the state change (the count, the flash) and
 * none of the party. All timing is on the DemoClock, and the sparks live in an absolutely
 * positioned layer that clips, so the loudest press moves nothing (SPEC §5).
 *
 * The count of responses is the author's reading of the state and changes with the mode
 * switch, so it is a `data-stage-verdict` and the stage draws it in the strip. It used to sit
 * in the post's own title bar, where "Juicy: press Like and count the answers" was the site
 * giving the reader an instruction in a product's type. A caption under the frame that began
 * "Both settings answer the press." went entirely: the article makes that argument.
 *
 * The legend of response names (squash, overshoot, sparks, count, flash, settle) is the
 * exhibit's own instrument and no post would print it, so it was sitting inside the fiction.
 * It now sits below the frame with the rest of the apparatus, unchanged otherwise, and the
 * frame is shorter by what it took.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 200px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Post</span>
        </div>
        <div class="sp-body" data-part="scene" data-mode="juicy" data-stack="0" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row sp-context" style="gap: 8px; align-items: center">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="juicy" data-axis="Feedback" data-term="juicy">
              <button class="sp-segment" data-part="seg-plain" value="plain">Plain</button>
              <button class="sp-segment" data-part="seg-juicy" value="juicy">Juicy</button>
            </sp-segmented>
          </div>

          <div style="position: relative; width: 300px; height: 92px">
            <span data-part="sparks" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden; pointer-events: none"></span>
            <button
              class="sp-button"
              type="button"
              data-part="like"
              data-subject
              data-mode="juicy"
              data-pose="[data-mode=juicy]"
              style="position: absolute; left: 50%; top: 26px; transform: translateX(-50%); width: 162px;
                     display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap;
                     transition: background-color ${FLASH_MS}ms var(--sp-ease)"
            >
              ${icon('heart', 'sp-icon--filled')}
              <span>Like</span>
              <span data-part="count" style="width: 26px; text-align: right; font-variant-numeric: tabular-nums">18</span>
            </button>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" data-part="legend" style="gap: 6px; justify-content: center">${chips}</div>
      <p data-stage-verdict data-part="readout" data-mode="juicy">Juicy: one press, six responses.</p>
    </div>
  `;

  const scene = part(root, 'scene');
  const like = part(root, 'like');
  const sparks = part(root, 'sparks');
  const count = part(root, 'count');
  const readout = part(root, 'readout');
  const chipEls = RESPONSES.map((key) => part(root, `resp-${key}`));

  const reduced = prefersReducedMotion(root);
  let mode = 'juicy';
  let likes = 18;
  let tidy: number | undefined;

  const light = (keys: string[]) => {
    for (const [i, el] of chipEls.entries()) {
      const on = keys.includes(RESPONSES[i] ?? '');
      flag(el, 'data-lit', on);
      // The kit has no rule for a chip that just fired, so the paint is stated here.
      el.style.background = on ? 'var(--sp-accent)' : '';
      el.style.borderColor = on ? 'var(--sp-accent)' : '';
      el.style.color = on ? 'var(--sp-accent-ink)' : '';
    }
    scene.dataset.stack = String(keys.length);
  };

  const setMode = (next: string) => {
    mode = next;
    scene.dataset.mode = next;
    like.dataset.mode = next;
    readout.dataset.mode = next;
    light([]);
    readout.textContent = next === 'juicy' ? 'Juicy: one press, six responses.' : 'Plain: one press, one response.';
  };

  const spray = (originX: number, originY: number) => {
    for (let i = 0; i < SPARKS; i++) {
      const angle = -Math.PI / 2 + (i / (SPARKS - 1) - 0.5) * 2.6;
      const reach = 34 + Math.random() * 30;
      const spark = document.createElement('span');
      spark.dataset.spark = '';
      spark.style.cssText = `position: absolute; left: ${originX}px; top: ${originY}px; width: 6px; height: 6px;
        border-radius: 50%; background: ${SPARK_COLOURS[i % SPARK_COLOURS.length]}`;
      sparks.append(spark);
      spark.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${(Math.cos(angle) * reach).toFixed(1)}px), calc(-50% + ${(Math.sin(angle) * reach).toFixed(1)}px)) scale(1)`,
            opacity: 0,
          },
        ],
        { duration: RUN_MS * (0.7 + Math.random() * 0.3), easing: 'cubic-bezier(0.15, 0.8, 0.3, 1)', fill: 'forwards' },
      );
    }
  };

  like.addEventListener('click', () => {
    // Measured before anything is written, never after a style write (AGENTS.md): the
    // sparks have to leave from the control that was actually pressed.
    const source = localBox(like, sparks);
    const originX = source.left + source.width / 2;
    const originY = source.top + source.height / 2;

    likes += 1;
    count.textContent = String(likes);
    flag(count, 'data-bumped', true);
    clock.clearTimeout(tidy);

    // What this press is answered with, decided once: Plain gets the state change and
    // nothing else, a stated motion preference gets the state change and the flash, and
    // Juicy gets the pile.
    const fired =
      mode === 'plain' ? ['count'] : reduced ? ['count', 'flash'] : ['squash', 'overshoot', 'sparks', 'count', 'flash', 'settle'];
    if (fired.includes('flash')) like.style.backgroundColor = 'var(--sp-warn)';
    if (fired.includes('sparks')) {
      spray(originX, originY);
      // One run, one owner: press, overshoot, wobble, rest, all in a single keyframe set.
      like.animate(
        [
          { transform: 'translateX(-50%) scale(1)' },
          { transform: 'translateX(-50%) scale(0.9, 0.86)', offset: 0.12 },
          { transform: 'translateX(-50%) scale(1.12, 1.1)', offset: 0.42 },
          { transform: 'translateX(-50%) scale(0.97, 0.99)', offset: 0.68 },
          { transform: 'translateX(-50%) scale(1.02, 1)', offset: 0.86 },
          { transform: 'translateX(-50%) scale(1)' },
        ],
        { duration: RUN_MS, easing: 'ease-out' },
      );
      count.animate(
        [
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-7px) scale(1.2)', offset: 0.35 },
          { transform: 'translateY(0) scale(1)' },
        ],
        {
          duration: RUN_MS * 0.7,
          easing: 'ease-out',
        },
      );
    }
    light(fired);
    readout.textContent = fired.length === 1 ? '1 response from one press' : `${fired.length} responses from one press`;

    tidy = clock.setTimeout(() => {
      like.style.backgroundColor = '';
      flag(count, 'data-bumped', false);
      for (const spark of [...sparks.querySelectorAll('[data-spark]')]) spark.remove();
    }, RUN_MS + 120);
  });

  part(root, 'mode').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode('juicy');
}
