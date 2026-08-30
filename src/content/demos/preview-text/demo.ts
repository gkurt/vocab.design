import { icon } from '#src/kit/icons.ts';

type Row = {
  part: string;
  from: string;
  time: string;
  subject: string;
  preview: string;
  source: 'written' | 'scraped';
};

const ROWS: Row[] = [
  {
    part: 'authored',
    from: 'Harbour Weekly',
    time: '09:14',
    subject: 'Your tide tables for September',
    preview: 'Spring tides on the 9th, the ferry timetable changes on the 14th, and the boatyard reopens.',
    source: 'written',
  },
  {
    part: 'scraped',
    from: 'Quay Books',
    time: '08:02',
    subject: 'New this week at Quay Books',
    preview: 'View this email in your browser. Unsubscribe. Add us to your address book to keep receiving.',
    source: 'scraped',
  },
];

const oneLine = 'display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis';

function row(item: Row): string {
  return `
    <li class="sp-list-item" data-part="row-${item.part}" style="align-items: flex-start; gap: 10px; padding: 10px 11px">
      <span class="sp-grow" style="min-width: 0">
        <span class="sp-row sp-context" style="gap: 8px">
          <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px; font-weight: 500; ${oneLine}">${item.from}</span>
          <span class="sp-text" style="flex: 0 0 auto; font-size: 11px">${item.time}</span>
        </span>
        <span class="sp-text sp-text--ink sp-context" style="margin-top: 2px; font-size: 13px; ${oneLine}">${item.subject}</span>
        <span
          class="sp-text"
          data-part="${item.part}-preview"
          data-source="${item.source}"
          ${item.part === 'authored' ? 'data-subject' : ''}
          style="margin-top: 2px; font-size: 12px; ${oneLine}"
        >${item.preview}</span>
      </span>
    </li>`;
}

/**
 * Preview text specimen: two rows of one inbox, printed by the same client, where the
 * only difference is whether anybody wrote the third line. The top row carries copy
 * authored for this exact slot; the bottom row shows what the client scrapes when
 * nobody did, which is the navigation and the unsubscribe boilerplate at the top of
 * the body.
 *
 * The subject is the preview line of the written row, not the row and not the list:
 * the term names that one line of copy, and the sender and the subject beside it are
 * the composition it is read inside, so they sit in the context register (SPEC §5).
 * The scraped line below is a peer instance rather than scenery, which is what makes
 * the pair a comparison, so the ring stays on one of them.
 *
 * A panel under the list once explained the mechanism ("The written line is hidden text at
 * the very top of the mail body, so the client prints it here instead of scraping what
 * follows."). No mail client prints that, and the article says the same thing at length, so
 * the panel is gone and the frame is shorter by its height.
 *
 * Each row also carried a badge on its right edge reading "written" or "scraped". That is
 * the site labelling its own exhibit: no inbox tells you where a preview line came from,
 * and telling the reader which is which removes the only thing there is to notice. The
 * badges are gone and the two lines are left to be read against each other.
 *
 * Both states are visible at rest and nothing here has a second state, so the script
 * is waits and asserts (SPEC §8) and the demo arms no clock.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 224px">
        <div class="sp-topbar sp-context">
          ${icon('inbox')}<span class="sp-heading sp-grow">Inbox</span><span class="sp-label">2 unread</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-surface" data-part="list" style="flex: 0 0 auto; padding: 0 2px">
            ${ROWS.map(row).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}
