import { flag, part } from '#src/kit/parts.ts';

/** The room the focused notice takes, and where it takes it from: the rows either side of it. */
const FOCUS_HEIGHT = 80;

interface Notice {
  title: string;
  date: string;
  body: string;
}

const NOTICES: Notice[] = [
  { title: 'Fuel berth closed', date: '2 Nov', body: 'The fuel berth is out of service while the delivery line is replaced.' },
  {
    title: 'Dredging, inner basin',
    date: '6 Nov',
    body: 'The inner basin is being dredged to 2.4 metres; expect the survey launch on station.',
  },
  {
    title: 'Winter mooring fees',
    date: '14 Nov',
    body: 'Winter rates apply from the first of December and are billed by the month, not the season.',
  },
  {
    title: 'Pontoon C resurfacing',
    date: '19 Nov',
    body: 'Pontoon C is closed to foot traffic while the decking boards are lifted and relaid.',
  },
  {
    title: 'Night entry lights',
    date: '23 Nov',
    body: 'The leading lights on the north wall now show a fixed red until the sector lamp is repaired.',
  },
  {
    title: 'Slipway booking change',
    date: '28 Nov',
    body: 'Slipway slots are booked by the tide rather than the hour for the rest of the winter.',
  },
];

/** The notice already in full detail when the specimen mounts, so no state is subject-less. */
const START = 2;

/**
 * Focus plus context specimen: six harbour notices in one column, where picking a notice
 * expands it in place and the five around it compress to a title and a date. Nothing is
 * replaced and nothing leaves: the whole column is still there, still in order.
 *
 * The subject is the focused region, `data-part="row-<n>"`, and it travels with the focus:
 * the term names the region kept in full detail, not the column that holds it, and exactly
 * one row is that region in every resting state (SPEC §5). The frame and the five
 * compressed neighbours are scenery in the context register. A caption under the
 * column once read "The column keeps its height: the focus takes its room from its
 * neighbours."; that was the site talking inside the fiction, and the article makes the
 * same point, so it went.
 *
 * The picks are absolute, never a toggle (SPEC §8): clicking the focused notice again leaves
 * it focused, so a pass resumed at any point lands in the same state. The column has a fixed
 * height and the focused row's space comes out of its neighbours' `flex-grow`, so the
 * deformation is contained and nothing outside the column moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = NOTICES.map(
    (notice, i) => `
      <div
        class="sp-surface${i === START ? '' : ' sp-context'}"
        data-part="row-${i + 1}"
        data-state="${i === START ? 'focus' : 'context'}"
        ${i === START ? 'data-subject' : ''}
        role="button"
        aria-pressed="${i === START}"
        style="overflow: hidden; padding: 3px 10px; cursor: pointer;
               background: var(--sp-${i === START ? 'surface' : 'sunken'});
               flex: ${i === START ? `0 0 ${FOCUS_HEIGHT}px` : '1 1 0'};
               transition: flex-basis 0.3s var(--sp-ease), flex-grow 0.3s var(--sp-ease), background-color 0.3s ease"
      >
        <div class="sp-row" style="gap: 8px">
          <span
            class="sp-label"
            data-part="title-${i + 1}"
            style="font-size: 11px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                   color: var(--sp-${i === START ? 'ink' : 'muted'}); font-weight: ${i === START ? 600 : 500}"
          >${notice.title}</span>
          <span class="sp-grow"></span>
          <span class="sp-label" style="flex: 0 0 auto; font-size: 10px; line-height: 1.3">${notice.date}</span>
        </div>
        <div class="sp-stack" data-part="detail-${i + 1}" style="gap: 7px; margin-top: 7px"${i === START ? '' : ' hidden'}>
          <span class="sp-text" style="font-size: 11px; line-height: 1.4">${notice.body}</span>
          <div class="sp-line" style="width: 62%"></div>
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour notices</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">In full detail: ${NOTICES[START]?.title}</span>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div data-part="column" style="display: flex; flex-direction: column; gap: 4px; height: 100%">${rows}</div>
        </div>
      </div>
    </div>
  `;

  const rowEls = NOTICES.map((_, i) => part(root, `row-${i + 1}`));
  const titleEls = NOTICES.map((_, i) => part(root, `title-${i + 1}`));
  const detailEls = NOTICES.map((_, i) => part(root, `detail-${i + 1}`));
  const readout = part(root, 'readout');

  const focus = (index: number) => {
    for (const [i, row] of rowEls.entries()) {
      const on = i === index;
      row.dataset.state = on ? 'focus' : 'context';
      row.setAttribute('aria-pressed', String(on));
      row.classList.toggle('sp-context', !on);
      row.style.background = `var(--sp-${on ? 'surface' : 'sunken'})`;
      row.style.flex = on ? `0 0 ${FOCUS_HEIGHT}px` : '1 1 0';
      flag(row, 'data-subject', on);
      const title = titleEls[i];
      if (title) {
        title.style.color = `var(--sp-${on ? 'ink' : 'muted'})`;
        title.style.fontWeight = on ? '600' : '500';
      }
      const detail = detailEls[i];
      if (detail) flag(detail, 'hidden', !on);
    }
    readout.textContent = `In full detail: ${NOTICES[index]?.title}`;
  };

  for (const [i, row] of rowEls.entries()) row.addEventListener('click', () => focus(i));

  focus(START);
}
