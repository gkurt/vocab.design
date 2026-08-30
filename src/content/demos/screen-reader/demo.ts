import { flag, part } from '#src/kit/parts.ts';

type Stop = { part: string; state: string; line: string };

/** What a reader says at each stop: role, then accessible name, then state. */
const STOPS: Stop[] = [
  { part: 'item-heading', state: 'heading', line: 'heading level 2, “Trip planner”' },
  { part: 'item-link', state: 'link', line: 'link, “Change dates”' },
  { part: 'item-insurance', state: 'checkbox', line: 'checkbox, “Add travel insurance”, not checked' },
  { part: 'item-book', state: 'button', line: 'button, “Book trip”' },
];

const CHECKED_LINE = 'checkbox, “Add travel insurance”, checked';

/**
 * Screen reader specimen: the software's own cursor walked down a small page, with what
 * it says printed as it goes. Every stop is announced as role, name, and state, which is
 * the accessibility tree being read rather than the pixels being described.
 *
 * The subject is the announcement strip, and that is the inversion of the live region
 * specimen on purpose: there the strip was instrumentation beside the marked container,
 * here it is the term itself, since a screen reader is software and the only part of a
 * scene that can stand for it is its voice. The label belongs inside the subject for the
 * same reason, and the page being read is scenery (SPEC §5). It reads "Speech viewer",
 * which is the window a screen reader really opens to print what it is saying; it read
 * "Screen reader, virtual cursor" before, which was the site naming the mechanism rather
 * than the software naming its own panel.
 *
 * The ring is the reader's virtual cursor, not the browser's focus, and the demo owns it:
 * the script presses the reader's own keys (down for the next item in reading order,
 * Enter to activate the one it is on), never Tab, so the stage's simulated focus never
 * moves and nothing here touches real focus (SPEC §7). Advancing clamps at the last stop
 * instead of wrapping, and Enter only ever checks the box, so a pass joined halfway still
 * reaches the same state (SPEC §8). The strip holds one line of room from mount, so a
 * longer announcement cannot move the page above it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 432px">
        <span class="sp-label sp-context">The page</span>
        <div class="sp-surface sp-context" style="margin-top: 6px; padding: 12px">
          <h2 class="sp-heading" data-part="item-heading" style="margin: 0; font-size: 14px">Trip planner</h2>
          <div style="margin-top: 10px">
            <a href="#" data-part="item-link" style="font-size: 13px; color: var(--sp-accent)">Change dates</a>
          </div>
          <div class="sp-row" style="margin-top: 12px; gap: 10px">
            <button class="sp-checkbox" type="button" data-part="item-insurance" role="checkbox" aria-checked="false"
                    aria-labelledby="vd-sr-insurance"></button>
            <span class="sp-text sp-text--ink" id="vd-sr-insurance">Add travel insurance</span>
          </div>
          <div class="sp-row" style="margin-top: 12px">
            <button class="sp-button sp-button--sm" type="button" data-part="item-book">Book trip</button>
          </div>
        </div>
        <div class="sp-surface" data-part="reader" data-subject style="margin-top: 12px; padding: 8px 10px">
          <span class="sp-label">Speech viewer</span>
          <p class="sp-text sp-text--ink" data-part="voice" data-state="heading"
             style="margin: 4px 0 0; height: 20px; white-space: nowrap; overflow: hidden">${STOPS[0]?.line ?? ''}</p>
        </div>
      </div>
    </div>
  `;

  const voice = part(root, 'voice');
  const stops = STOPS.map((stop) => part(root, stop.part));
  const box = part(root, 'item-insurance');
  let at = 0;

  const announce = (state: string, line: string) => {
    voice.dataset.state = state;
    voice.textContent = line;
  };

  const moveTo = (next: number) => {
    at = Math.max(0, Math.min(next, STOPS.length - 1));
    const stop = STOPS[at];
    if (!stop) return;
    for (const [index, el] of stops.entries()) flag(el, 'data-sim-focus', index === at);
    const checked = box.getAttribute('aria-checked') === 'true';
    announce(stop.state, stop.part === 'item-insurance' && checked ? CHECKED_LINE : stop.line);
  };

  moveTo(0);

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') moveTo(at + 1);
    if (event.key === 'ArrowUp') moveTo(at - 1);
    if (event.key !== 'Enter') return;
    if (STOPS[at]?.part !== 'item-insurance') return;
    box.setAttribute('aria-checked', 'true');
    announce('checked', CHECKED_LINE);
  });
}
