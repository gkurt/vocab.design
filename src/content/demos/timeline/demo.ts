import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Entry = { key: string; date: string; iso: string; label: string; done: boolean; note?: string };

const ENTRIES: Entry[] = [
  { key: '1', date: '12 Mar', iso: '2025-03-12', label: 'Keel laid', done: true },
  { key: '2', date: '04 May', iso: '2025-05-04', label: 'Frames fitted', done: true },
  {
    key: '3',
    date: '19 Jun',
    iso: '2025-06-19',
    label: 'Hull launched',
    done: true,
    note: 'Towed to the fitting-out quay that evening; trials followed.',
  },
  { key: '4', date: '28 Aug', iso: '2025-08-28', label: 'Rig stepped', done: false },
  { key: '5', date: '15 Oct', iso: '2025-10-15', label: 'Sea trials', done: false },
];

/** The room the note will take, held from mount so revealing it moves nothing (SPEC §5). */
const SLOT_H = 42;

function entry(item: Entry, last: boolean): string {
  const fill = item.done ? 'background: var(--sp-accent); border-color: var(--sp-accent)' : 'background: var(--sp-surface)';
  const connector = last
    ? ''
    : '<span aria-hidden="true" style="position: absolute; left: 5px; top: 18px; bottom: -6px; width: 1px; background: var(--sp-line)"></span>';
  const slot = item.note
    ? `
      <div data-part="slot-${item.key}" style="height: ${SLOT_H}px; margin-top: 2px">
        <button
          class="sp-button sp-button--quiet sp-button--sm"
          type="button"
          data-part="details"
          aria-expanded="false"
          aria-controls="vd-tl-note"
          style="padding-left: 0"
        >Details</button>
        <div class="sp-row" data-part="note" id="vd-tl-note" hidden style="align-items: flex-start; gap: 6px">
          <span class="sp-text sp-grow" style="font-size: 12px">${item.note}</span>
          <button
            class="sp-icon-button"
            type="button"
            data-part="note-hide"
            aria-label="Hide detail"
            style="width: 22px; height: 22px"
          >${icon('close')}</button>
        </div>
      </div>`
    : '';

  return `
    <li data-part="entry-${item.key}" style="position: relative; padding: 0 0 14px 20px">
      ${connector}
      <span
        aria-hidden="true"
        style="position: absolute; left: 0; top: 5px; width: 11px; height: 11px; border: 1px solid var(--sp-line); border-radius: 50%; ${fill}"
      ></span>
      <div class="sp-row" style="gap: 10px">
        <time class="sp-label" datetime="${item.iso}" style="width: 46px; flex: 0 0 auto">${item.date}</time>
        <span class="sp-text sp-text--ink sp-grow">${item.label}</span>
      </div>
      ${slot}
    </li>`;
}

/**
 * Timeline specimen: five dated milestones on a spine, oldest first, with the third
 * carrying a detail its own control reveals. The subject is the list, since a timeline
 * is the sequence and its line rather than any one entry; the window around it is
 * scenery.
 *
 * The spine and the markers are drawn per entry and hidden from assistive technology:
 * the order is the list's, not the dots'. The detail sits in a slot that holds its
 * height from mount, so the button and the note trade places inside the same box and
 * the two entries below never move.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 320px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Hull 214</span>
          <span class="sp-label">2025</span>
        </div>
        <div class="sp-body" style="padding: 14px 16px">
          <ol
            class="sp-list sp-surface"
            data-part="timeline"
            data-subject
            style="padding: 14px 14px 2px; margin: 0; list-style: none"
          >
            ${ENTRIES.map((item, i) => entry(item, i === ENTRIES.length - 1)).join('')}
          </ol>
        </div>
      </div>
    </div>
  `;

  const details = part(root, 'details');
  const note = part(root, 'note');
  const hide = part(root, 'note-hide');

  // The control opens and the note's own control closes it: no step reaches a state by
  // flipping whatever it found (SPEC §8).
  const setOpen = (open: boolean) => {
    note.hidden = !open;
    details.hidden = open;
    details.setAttribute('aria-expanded', String(open));
  };

  details.addEventListener('click', () => setOpen(true));
  hide.addEventListener('click', () => setOpen(false));
}
