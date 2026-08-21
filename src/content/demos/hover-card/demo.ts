import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const OPEN_DELAY = 240;
const CLOSE_GRACE = 200;

/**
 * Hover card specimen: a mention in a thread, and the preview the pointer summons.
 * The subject is the card. Hovering alone is the whole operation, so the mention is
 * `data-hover-driven` (SPEC §7) and a reader's own dwell takes the stage over.
 *
 * The card is absolutely positioned, so summoning it moves no text (SPEC §5), and it
 * is anchored flush under the mention with the grace period the pointer needs to
 * reach the Follow button: hoverable, dismissible with Escape, and never closing on a
 * timer of its own.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 236px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" data-part="away" style="font-size: 14px">#parser</span></div>
        <div class="sp-body" data-part="stage" style="position: relative">
          <div class="sp-prose sp-context" style="max-width: none">
            <p style="margin: 0">
              Ship it once
              <span
                data-part="mention"
                data-card="closed"
                data-hover-driven
                tabindex="0"
                role="button"
                aria-haspopup="dialog"
                style="color: var(--sp-accent); font-weight: 500; cursor: pointer"
              >@riya</span>
              signs off.
            </p>
          </div>
          <div
            class="sp-popover"
            data-part="card"
            data-subject
            role="dialog"
            aria-label="Riya Kapoor"
            style="width: 236px"
          >
            <div class="sp-row" style="gap: 10px; align-items: flex-start">
              <span class="sp-avatar">RK</span>
              <span class="sp-stack" style="gap: 1px">
                <span class="sp-text sp-text--ink" style="font-weight: 600">Riya Kapoor</span>
                <span class="sp-label">@riya</span>
              </span>
            </div>
            <p class="sp-text" style="margin: 8px 0 10px">Compilers and editor tooling.</p>
            <button class="sp-button sp-button--sm" data-part="follow" type="button">Follow</button>
          </div>
        </div>
      </div>
      <p class="sp-text sp-context" style="max-width: 400px; text-align: center; margin: 0">
        No click anywhere: the pointer rests, the preview arrives, and it stays put long enough to reach.
      </p>
    </div>
  `;

  const mention = part(root, 'mention');
  const card = part(root, 'card');
  const stage = part(root, 'stage');

  // Measured at mount, on the mounted state: the card hangs flush under the mention
  // so no gap can swallow the pointer on its way over (SPEC §5, hoverable).
  const anchor = mention.offsetLeft;
  const top = mention.offsetTop + mention.offsetHeight + 6;
  const maxLeft = stage.clientWidth - 236 - 12;
  const left = Math.max(0, Math.min(anchor - 10, maxLeft));
  card.style.left = `${left}px`;
  card.style.top = `${top}px`;
  card.style.setProperty('--sp-arrow-x', `${Math.max(12, anchor - left + 8)}px`);

  let closer: number | undefined;
  const setOpen = (open: boolean) => {
    flag(card, 'data-open', open);
    mention.dataset.card = open ? 'open' : 'closed';
  };
  const cancelClose = () => {
    if (closer !== undefined) clock.clearTimeout(closer);
    closer = undefined;
  };
  const scheduleClose = () => {
    cancelClose();
    closer = clock.setTimeout(() => setOpen(false), CLOSE_GRACE);
  };

  let opener: number | undefined;
  mention.addEventListener('pointerenter', () => {
    cancelClose();
    if (opener !== undefined) clock.clearTimeout(opener);
    opener = clock.setTimeout(() => setOpen(true), OPEN_DELAY);
  });
  mention.addEventListener('pointerleave', () => {
    if (opener !== undefined) clock.clearTimeout(opener);
    opener = undefined;
    scheduleClose();
  });
  // Focus is the keyboard's route to the same panel; hover alone would strand it.
  mention.addEventListener('focus', () => setOpen(true));
  mention.addEventListener('blur', () => setOpen(false));

  card.addEventListener('pointerenter', cancelClose);
  card.addEventListener('pointerleave', scheduleClose);

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
