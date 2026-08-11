import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const EXIT_MS = 700;
/** Accelerating, and shorter than an arrival would be: leaving is getting out of the way. */
const EXIT = `opacity ${EXIT_MS}ms ease-in, transform ${EXIT_MS}ms ease-in`;
const GONE = 'scale(0.88)';

const card = (subject: boolean) => `
  <article
    class="sp-surface sp-stack"
    data-part="${subject ? 'card' : 'twin'}"
    ${subject ? 'data-subject' : ''}
    style="position: absolute; inset: 0; gap: 8px; padding: 11px; ${subject ? `transition: ${EXIT}` : ''}"
  >
    <span class="sp-row sp-row--between">
      <span class="sp-heading" style="font-size: 13px">Build 4182</span>
      <span class="sp-label">2m</span>
    </span>
    <span class="sp-line" style="width: 86%"></span>
    <span class="sp-line" style="width: 54%"></span>
  </article>`;

const column = (label: string, note: string, subject: boolean) => `
  <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 1 1 0; gap: 6px">
    <span class="sp-label">${label}</span>
    <div data-part="${subject ? 'slot' : 'twin-slot'}" data-state="present" style="position: relative; height: 88px">
      ${card(subject)}
    </div>
    <span class="sp-label" style="font-size: 11px">${note}</span>
  </div>`;

/**
 * Exit specimen: one card that shrinks and fades before it goes, beside a scenery twin
 * that is simply taken out. Dismiss presses both at once, so the comparison is between
 * two answers to the same instruction rather than between two moments.
 *
 * The subject is the leaving card, not the slot: the slot is scenery holding the room
 * so nothing else in the frame moves (SPEC §5), and the term names the motion the card
 * itself plays. The card stays in the tree while it leaves, which is the whole
 * difficulty of the term, and only then is it taken out of the layout. The slot says
 * where in that sequence it is, as `data-state`.
 *
 * Removal is timed on the stage's clock rather than on `transitionend`, because under
 * reduced motion there is no transition and the event would never fire, leaving an
 * invisible card in the layout (SPEC §5, `motion.css`). The same preference is asked
 * directly so the removal does not sit through a delay whose animation never played.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 392px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notifications</span>
          <span class="sp-label">Deploys</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 12px">
          <div class="sp-row" style="align-items: flex-start; gap: 14px">
            ${column('With an exit', 'held until the motion ends', true)}
            ${column('Without one', 'taken out on the press', false)}
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <button class="sp-button sp-button--sm" type="button" data-part="dismiss">Dismiss</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="restore">Restore</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const leaving = part(root, 'card');
  const twin = part(root, 'twin');
  const slot = part(root, 'slot');
  const twinSlot = part(root, 'twin-slot');
  let removing: number | undefined;

  const dismiss = () => {
    clock.clearTimeout(removing);
    twin.hidden = true;
    twinSlot.dataset.state = 'gone';

    leaving.hidden = false;
    leaving.style.transition = EXIT;
    leaving.style.opacity = '0';
    leaving.style.transform = GONE;
    slot.dataset.state = 'leaving';

    const held = prefersReducedMotion(root) ? 0 : EXIT_MS;
    removing = clock.setTimeout(() => {
      leaving.hidden = true;
      slot.dataset.state = 'gone';
    }, held);
  };

  const restore = () => {
    clock.clearTimeout(removing);
    twin.hidden = false;
    twinSlot.dataset.state = 'present';

    // Coming back is not the term: no transition, so the specimen never quietly
    // demonstrates an entrance while claiming an exit.
    leaving.style.transition = 'none';
    leaving.hidden = false;
    leaving.style.opacity = '1';
    leaving.style.transform = 'none';
    slot.dataset.state = 'present';
  };

  part(root, 'dismiss').addEventListener('click', dismiss);
  part(root, 'restore').addEventListener('click', restore);
}
