import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const CALLOUT_W = 196;
const GAP = 12;

/**
 * Coach mark specimen: one beacon on one control, and the message it opens.
 *
 * The subject is the callout. The beacon is how the mark advertises itself and the
 * button underneath is what it teaches, but the term names the message, which is also
 * the choice the feature spotlight specimen makes about its announcement card, so the
 * two can be read against each other.
 *
 * The thing to watch for is what is missing: no scrim. Everything outside the callout
 * keeps its colour and keeps working, which is the line between this and a spotlight
 * that dims the world. The demo SHOWS that by leaving the anchor live, and the article
 * says it in prose; the specimen used to say it a third time in a label of its own
 * ("No scrim, no Next, no counter that matters"), which is the site talking inside the
 * fiction and reads as nonsense to anyone who has not just read the article (SPEC §5.1).
 * The status line is the reports screen's own, at rest and after the grouping.
 *
 * The re-arm button is instrumentation, so it says what it does. It was labelled "New
 * teammate", which asked the reader to infer a whole fiction (a second person, opening
 * this screen for the first time) from two words, to explain a button that only puts
 * the beacon back.
 *
 * The callout takes its position from the anchor's real rect and
 * sits out of flow, so raising and clearing it move nothing in the scene (SPEC §5).
 *
 * The beacon opens and Got it dismisses; neither toggles (SPEC §8). The pulse is the
 * kit's, so it answers reduced motion and the stage's own pause rather than running on
 * a timer of its own.
 */
export function mount(root: HTMLElement): void {
  const row = (name: string, when: string) => `
    <li class="sp-list-item">
      <span class="sp-grow">${name}</span>
      <span class="sp-text">${when}</span>
    </li>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" data-part="frame" style="width: 420px; height: 236px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Reports</span>
          <div style="position: relative">
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" data-part="anchor" type="button">Group by</button>
            <button
              data-part="beacon"
              type="button"
              aria-label="What does Group by do?"
              style="position: absolute; top: -9px; right: -9px; display: flex; align-items: center; justify-content: center;
                     width: 20px; height: 20px; padding: 0; border: 0; border-radius: 50%; background: transparent; cursor: pointer"
            >
              <span
                class="sp-pulse"
                aria-hidden="true"
                style="width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent);
                       box-shadow: 0 0 0 3px var(--sp-accent-soft)"
              ></span>
            </button>
          </div>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <ul class="sp-list sp-surface">
            ${row('Q3 revenue', '9:04')}
            ${row('Churn by plan', 'Yesterday')}
            ${row('Trial funnel', 'Monday')}
          </ul>
          <span class="sp-label" data-part="status">3 reports, newest first.</span>
        </div>

        <div
          class="sp-popover"
          data-part="callout"
          data-subject
          role="dialog"
          aria-label="Group by"
          style="z-index: 2; width: ${CALLOUT_W}px"
        >
          <span class="sp-heading" style="font-size: 13px">Group by</span>
          <p class="sp-text" style="margin: 6px 0 10px">Stack rows under a shared owner or plan.</p>
          <div class="sp-row sp-row--between">
            <span class="sp-label" style="font-size: 11px">Tip 1 of 1</span>
            <button class="sp-button sp-button--sm" data-part="ack" type="button">Got it</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 8px">
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="rearm" type="button">Show the mark again</button>
      </div>
    </div>
  `;

  const frame = part(root, 'frame');
  const beacon = part(root, 'beacon');
  const anchor = part(root, 'anchor');
  const callout = part(root, 'callout');
  const status = part(root, 'status');

  const aim = () => {
    const rect = localBox(anchor, frame);
    const centre = rect.left + rect.width / 2;
    const left = Math.min(Math.max(centre - CALLOUT_W + 40, GAP), frame.offsetWidth - CALLOUT_W - GAP);
    callout.style.left = `${left}px`;
    callout.style.top = `${rect.top + rect.height + GAP}px`;
    callout.style.setProperty('--sp-arrow-x', `${Math.round(centre - left - 4)}px`);
  };

  /** Open or clear the mark. Each control reaches one of these, never both. */
  const show = (open: boolean) => {
    if (open) aim();
    flag(callout, 'data-open', open);
  };

  const arm = (armed: boolean) => {
    beacon.hidden = !armed;
    if (!armed) show(false);
  };

  part(root, 'beacon').addEventListener('click', () => show(true));
  part(root, 'ack').addEventListener('click', () => arm(false));
  part(root, 'rearm').addEventListener('click', () => arm(true));

  // The control the mark teaches keeps working while the mark is up.
  anchor.addEventListener('click', () => {
    status.textContent = 'Grouped by owner.';
    status.dataset.grouped = '';
  });

  arm(true);
}
