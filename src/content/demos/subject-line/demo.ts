import { icon } from '#src/kit/icons.ts';

/** The same row, given three of the widths a client might hand it. */
const PANES: { key: string; label: string; width: number }[] = [
  { key: 'wide', label: 'desktop', width: 356 },
  { key: 'mid', label: 'tablet', width: 222 },
  { key: 'narrow', label: 'phone', width: 140 },
];

/** Two subjects, the same length, differing only in where the meaning sits. */
const FRONT = 'Shipped: order #4471, arrives Friday 12 Sept';
const BACK = 'A quick update about your recent order with us';

const oneLine = 'display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis';

function pane(spec: { key: string; label: string; width: number }): string {
  const narrow = spec.key === 'narrow';
  return `
    <div class="sp-row" style="gap: 8px">
      <span class="sp-label sp-context" style="flex: 0 0 auto; width: 52px; font-size: 10px; text-align: right">${spec.label}</span>
      <div class="sp-surface" data-part="pane-${spec.key}" style="flex: 0 0 auto; width: ${spec.width}px; padding: 5px 9px">
        <span class="sp-text sp-context" style="display: block; font-size: 10px">Quay Books</span>
        <span
          class="sp-text sp-text--ink"
          data-part="front-${spec.key}"
          data-load="front"
          ${narrow ? 'data-subject' : ''}
          style="margin-top: 1px; font-size: 12px; ${oneLine}"
        >${FRONT}</span>
        <span
          class="sp-text sp-text--ink"
          data-part="back-${spec.key}"
          data-load="back"
          style="margin-top: 2px; font-size: 12px; ${oneLine}"
        >${BACK}</span>
      </div>
    </div>`;
}

/**
 * Subject line specimen: one mail row handed three of the widths a client might give
 * it, stacked into a staircase, each pane carrying two subjects of the same length.
 * One puts the fact first and the other saves it for the end, so the cut is where the
 * comparison is decided: at desktop width the two lines look equivalent, and by phone
 * width only one of them still says anything.
 *
 * The subject is the front-loaded line in the narrowest pane, which is the instance
 * where the term's own decision pays for itself. The other five are peers of the same
 * comparison rather than scenery, so the ring stays on one line (SPEC §5); the width
 * labels and the sender above each subject are the composition it is read inside and
 * sit in the context register.
 *
 * Every pane is cut by its own box, so the demo stamps whether each line was actually
 * truncated, measured once on the state it mounts in (SPEC §5), which is what lets the
 * still script assert the cut rather than merely draw it (SPEC §8).
 *
 * The topbar read "Two mails, three windows", which counted the exhibit rather than
 * naming the screen; a mail client says "Inbox" there, so it does.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 314px">
        <div class="sp-topbar sp-context">
          ${icon('inbox')}<span class="sp-heading sp-grow">Inbox</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          ${PANES.map(pane).join('')}
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="margin-top: auto; font-size: 11px; line-height: 1.35">
            The client picks the width, never the sender. Only the line whose meaning arrived before the cut survives it.
          </span>
        </div>
      </div>
    </div>
  `;

  // Measured on the mounted state, never after a style write (SPEC §5).
  for (const line of root.querySelectorAll<HTMLElement>('[data-load]')) {
    line.dataset.cut = line.scrollWidth - line.clientWidth > 1 ? 'yes' : 'no';
  }
}
