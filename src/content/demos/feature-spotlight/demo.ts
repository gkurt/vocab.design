import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const BUBBLE_W = 202;
const GAP = 10;
const IDLE = 'Nothing exported yet';
const DONE = 'Exported 24 rows as CSV';

/**
 * Feature spotlight specimen: one announcement, aimed at the one control that gained
 * something, cleared for good the moment it is acknowledged. There is no counter and
 * no Next, because there is only ever one stop, which is what separates this from the
 * tour it is a single step of.
 *
 * The subject is the announcement card. The ring and the dimming are how it aims, the
 * app underneath is what it is about, and the "Show the announcement again" control below
 * the frame is instrumentation the specimen needs in order to be watchable twice (SPEC §5).
 * This mirrors the choice the onboarding tour specimen makes about its own tip card, so the
 * two can be read against each other.
 *
 * That control used to be labelled "New teammate", with a line beside it reading "Gone for
 * good once acknowledged." Between them they asked the reader to infer a whole fiction to
 * explain a button that only puts the announcement back. The line is gone and the button
 * says plainly what it does, which is what demo instrumentation owes a reader.
 *
 * The context register sits on the scenery inside the topbar rather than on the
 * topbar itself, because the "New" dot rides on the export control and is part of the
 * announcement: dimming its accent would quiet a piece of the term.
 *
 * The ring and the card are placed against real element rects and are both out of
 * flow, so raising and clearing the announcement move nothing in the scene (SPEC §5).
 * One element carries both the cutout and the dimming, as an outline plus a shadow
 * spread wide enough to cover the frame, so the two can never disagree. It takes no
 * pointer events: an announcement that swallows clicks meant for the control it is
 * pointing at is the failure the article names, and drawing it that way here would
 * have made the specimen demonstrate the bug.
 */
export function mount(root: HTMLElement): void {
  const row = (name: string, when: string) => `
    <li class="sp-list-item">
      <span class="sp-grow">${name}</span>
      <span class="sp-text">${when}</span>
    </li>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" data-part="frame" style="width: 320px; height: 234px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Reports</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="app-export" type="button" style="position: relative">
            Export
            <span data-part="new-dot" aria-hidden="true"
                  style="position: absolute; top: -3px; right: -3px; width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent)"></span>
          </button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <ul class="sp-list sp-surface">
            ${row('Q3 revenue', '9:04')}
            ${row('Churn by plan', 'Yesterday')}
            ${row('Trial funnel', 'Monday')}
          </ul>
          <span class="sp-label" data-part="status" role="status">${IDLE}</span>
        </div>

        <div data-part="spot" style="position: absolute; z-index: 1; pointer-events: none; border-radius: 8px; outline: 2px solid var(--sp-accent); box-shadow: 0 0 0 999px var(--sp-scrim)"></div>

        <div class="sp-surface" data-part="bubble" data-subject role="dialog" aria-label="What is new"
             style="position: absolute; z-index: 2; width: ${BUBBLE_W}px; padding: 12px; box-shadow: var(--sp-shadow)">
          <span class="sp-chip" style="background: var(--sp-accent-soft); border-color: transparent; cursor: default; font-weight: 600">New</span>
          <p class="sp-text sp-text--ink" style="margin: 8px 0 10px">Export straight to CSV. No spreadsheet step, no reformatting.</p>
          <div class="sp-row sp-row--between">
            <span class="sp-label" style="font-size: 11px">Added this week</span>
            <button class="sp-button sp-button--sm" data-part="ack" type="button">Got it</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 8px">
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Show the announcement again</button>
      </div>
    </div>
  `;

  const frame = part(root, 'frame');
  const target = part(root, 'app-export');
  const spot = part(root, 'spot');
  const bubble = part(root, 'bubble');
  const dot = part(root, 'new-dot');
  const status = part(root, 'status');

  const aim = () => {
    const rect = localBox(target, frame);
    const inset = 5;
    spot.style.left = `${rect.left - inset}px`;
    spot.style.top = `${rect.top - inset}px`;
    spot.style.width = `${rect.width + inset * 2}px`;
    spot.style.height = `${rect.height + inset * 2}px`;
    const centred = rect.left + rect.width / 2 - BUBBLE_W / 2;
    bubble.style.left = `${Math.min(Math.max(centred, GAP), frame.offsetWidth - BUBBLE_W - GAP)}px`;
    bubble.style.top = `${rect.top + rect.height + GAP}px`;
  };

  /** Raise or clear the announcement. Each control reaches one of these, never both. */
  const announce = (showing: boolean) => {
    spot.hidden = !showing;
    bubble.hidden = !showing;
    dot.hidden = !showing;
    flag(frame, 'data-seen', !showing);
    if (showing) aim();
  };

  part(root, 'ack').addEventListener('click', () => announce(false));
  part(root, 'replay').addEventListener('click', () => announce(true));

  // The control the announcement points at keeps working throughout, ring or no ring.
  target.addEventListener('click', () => {
    status.textContent = DONE;
    status.dataset.done = '';
  });

  announce(true);
}
