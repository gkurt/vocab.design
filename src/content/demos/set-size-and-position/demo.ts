import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat before the reader speaks the row it landed on. */
const SPEAK_MS = 460;

/** The window: six rendered rows out of five hundred records, starting at 245. */
const TOTAL = 500;
const FIRST = 245;
const WINDOW = 6;

type Mode = 'omitted' | 'declared';

const CAPTION = {
  omitted:
    'No attributes, so the reader counts the rows it can see: the total it announces is the size of the render window, not of the list.',
  declared:
    'Each row declares aria-posinset and aria-setsize, so the count comes from the data: six rows in the tree, five hundred in the announcement.',
} as const;

/**
 * Set size and position specimen: a windowed list holding six of five hundred records, beside a
 * transcript of what the reader says about the row the ring is on. Without the attributes the
 * announcement is a true statement about the DOM and a false one about the list.
 *
 * The transcript is a portrayal, labelled as one, following the live region and atomic live
 * region specimens rather than inventing a second convention for the same job.
 *
 * The subject is the counted announcement itself, given its own element: the term names the
 * position and size a reader speaks, not the row it was reached from and not the picker that
 * chose the markup. The list, the picker and the caption are scenery (SPEC §5). The specimen
 * mounts with the counts declared, so the state identify rests on is the term itself, and the
 * token is the announced count in every state the script visits.
 *
 * The speech delay comes from the DemoClock, so a pose can hold the transcript still. The
 * arrows move a simulated ring (`data-sim-focus`), because attract never moves real focus
 * (SPEC §7), and the list carries `tabindex="0"` so a reader's own arrows reach it; Tab is left
 * alone, so the specimen can never trap a keyboard. The count sits at the end of its line and
 * every readout holds a fixed box, so no state moves anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const number = (n: number) => String(n).padStart(4, '0');

  const row = (index: number) => {
    const record = FIRST + index;
    return `
      <li class="sp-list-item" role="option" data-part="row-${index}" data-record="${record}"
          aria-posinset="${record}" aria-setsize="${TOTAL}" aria-selected="${index === 2}"
          style="padding: 3px 8px; font-size: 11.5px; gap: 8px; border-radius: 5px">
        <span class="sp-grow">Invoice ${number(record)}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Kellerman & Co</span>
      </li>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 476px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Rows ${FIRST} to ${FIRST + WINDOW - 1} of ${TOTAL}, six in the DOM</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Markup" data-part="mode" data-value="declared">
            <button class="sp-segment" type="button" data-part="seg-omitted" value="omitted"
                    style="padding: 4px 11px; font-size: 11.5px; white-space: nowrap">Omitted</button>
            <button class="sp-segment" type="button" data-part="seg-declared" value="declared"
                    style="padding: 4px 11px; font-size: 11.5px; white-space: nowrap">Declared</button>
          </sp-segmented>
        </div>

        <ul class="sp-listbox sp-listbox--static" data-part="list" role="listbox" aria-label="Invoices"
            tabindex="0" style="margin-top: 9px; max-height: none; padding: 4px">
          ${Array.from({ length: WINDOW }, (_, index) => row(index)).join('')}
        </ul>

        <div class="sp-surface" style="margin-top: 9px; padding: 7px 10px">
          <div class="sp-row" style="gap: 8px">
            <span class="sp-label sp-context" style="flex: 0 0 auto">Screen reader</span>
            <span class="sp-text sp-text--ink sp-grow" data-part="utterance" data-state="spoken"
                  style="font-size: 11.5px; white-space: nowrap">“Invoice <span
                data-part="record">0247</span>, item <span data-part="count" data-subject data-mode="declared"
                style="font-weight: 600">247 of ${TOTAL}</span>”</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="declared"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.declared}</p>
      </div>
    </div>
  `;

  const rows = Array.from({ length: WINDOW }, (_, index) => part(root, `row-${index}`));
  const utterance = part(root, 'utterance');
  const record = part(root, 'record');
  const count = part(root, 'count');
  const caption = part(root, 'caption');

  let mode: Mode = 'declared';
  let at = 2;
  let pending: number | undefined;

  const speak = () => {
    const on = rows[at];
    if (!on) return;
    const real = FIRST + at;
    // The line keeps the last thing said until the new announcement is out, so the subject is
    // never a placeholder (SPEC §6).
    clock.clearTimeout(pending);
    utterance.dataset.state = 'queued';
    pending = clock.setTimeout(() => {
      utterance.dataset.state = 'spoken';
      record.textContent = number(real);
      count.dataset.mode = mode;
      count.textContent = mode === 'declared' ? `${real} of ${TOTAL}` : `${at + 1} of ${WINDOW}`;
    }, SPEAK_MS);
  };

  const land = (index: number) => {
    const next = Math.min(Math.max(index, 0), WINDOW - 1);
    for (const [i, el] of rows.entries()) {
      el.setAttribute('aria-selected', String(i === next));
      if (i === next) el.setAttribute('data-sim-focus', '');
      else el.removeAttribute('data-sim-focus');
    }
    at = next;
    speak();
  };

  const apply = (next: Mode) => {
    mode = next;
    for (const [index, el] of rows.entries()) {
      if (next === 'declared') {
        el.setAttribute('aria-posinset', String(FIRST + index));
        el.setAttribute('aria-setsize', String(TOTAL));
      } else {
        el.removeAttribute('aria-posinset');
        el.removeAttribute('aria-setsize');
      }
    }
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    speak();
  };

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') land(at + 1);
    else if (event.key === 'ArrowUp') land(at - 1);
    else return;
    // The list has answered the key, so the page must not also scroll on it.
    event.preventDefault();
  });

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  land(2);
}
