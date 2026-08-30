import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const FLIP_MS = 620;

/**
 * Card flip specimen: one card, two faces, turned about its own vertical axis. The
 * container owns the perspective, the card owns `transform-style: preserve-3d`, and
 * each face hides its own backface, with the back pre-rotated so it is already facing
 * the viewer when the card gets there.
 *
 * The subject is the flipping card, not the scene: the term names the object that
 * turns, and the two faces are parts of it rather than scenery. The window around it
 * and the two controls are scenery.
 *
 * The window header carried "one object" and the back face opened with "On the back",
 * which is the site narrating a library card from inside it. Both are gone: the card
 * says what a card says, and the article makes the point that the two faces are one
 * element.
 *
 * Show front and Show back are absolute states rather than one toggle, so a pass that
 * is fast-forwarded or resumed lands on the face it named (SPEC §8). The resting
 * transform is written inline first and `element.animate` only plays the move between
 * the old angle and the new one, so a cancelled or reduced-motion run still leaves the
 * card correctly on the face it was asked for. `motion.css` cannot reach a keyframe
 * set, so the demo asks `prefersReducedMotion` itself (SPEC §5), and `data-state` is
 * cleared on the stage's clock so a pose cannot let the turn finish under a reader.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const face = (id: string, extra: string, body: string) => `
    <div
      data-part="face-${id}"
      class="sp-surface sp-stack"
      style="position: absolute; inset: 0; gap: 8px; padding: 14px; backface-visibility: hidden; ${extra}"
    >${body}</div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 316px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Membership card</span>
        </div>
        <div style="perspective: 900px; height: 150px; margin-top: 12px">
          <div
            data-part="card"
            data-subject
            data-face="front"
            data-state="settled"
            style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateY(0deg)"
          >
            ${face(
              'front',
              'border: 0; background: var(--sp-accent); color: var(--sp-accent-ink); justify-content: space-between',
              `<span class="sp-row sp-row--between">
                 <span style="font-size: 13px; font-weight: 600">Harbour Library</span>
                 ${icon('star', 'sp-icon--filled')}
               </span>
               <span class="sp-stack" style="gap: 4px">
                 <span style="font-size: 18px; font-weight: 600; letter-spacing: 0.06em">4417 2098</span>
                 <span style="font-size: 12px; opacity: 0.86">Rana Kaur</span>
               </span>`,
            )}
            ${face(
              'back',
              'transform: rotateY(180deg); justify-content: center',
              `<span class="sp-row sp-row--between" style="font-size: 13px"><span>Issued</span><span>4 Mar 2024</span></span>
               <span class="sp-row sp-row--between" style="font-size: 13px"><span>Branch</span><span>Quayside</span></span>
               <span class="sp-row sp-row--between" style="font-size: 13px"><span>Loans</span><span>3 of 12</span></span>`,
            )}
          </div>
        </div>
        <div class="sp-row sp-context" style="gap: 6px; margin-top: 12px">
          <button class="sp-button sp-button--sm" type="button" data-part="show-back">Show back</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="show-front">Show front</button>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const front = part(root, 'face-front');
  const back = part(root, 'face-back');
  let settling: number | undefined;

  const show = (to: 'front' | 'back') => {
    if (card.dataset.face === to) return;
    clock.clearTimeout(settling);
    for (const animation of card.getAnimations()) animation.cancel();

    const from = card.style.transform;
    const angle = to === 'back' ? 180 : 0;
    card.style.transform = `rotateY(${angle}deg)`;
    card.dataset.face = to;
    // The face turning away keeps its box, so it must stop answering the pointer.
    front.style.pointerEvents = to === 'front' ? '' : 'none';
    back.style.pointerEvents = to === 'back' ? '' : 'none';

    if (prefersReducedMotion(root)) {
      card.dataset.state = 'settled';
      return;
    }

    card.dataset.state = 'flipping';
    card.animate([{ transform: from }, { transform: `rotateY(${angle}deg)` }], {
      duration: FLIP_MS,
      easing: 'cubic-bezier(0.3, 0.8, 0.3, 1)',
    });
    settling = clock.setTimeout(() => {
      card.dataset.state = 'settled';
    }, FLIP_MS + 60);
  };

  back.style.pointerEvents = 'none';
  part(root, 'show-back').addEventListener('click', () => show('back'));
  part(root, 'show-front').addEventListener('click', () => show('front'));
}
