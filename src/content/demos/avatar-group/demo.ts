import { flag, part } from '#src/kit/parts.ts';

const SHOWN = [
  { key: 'ada', initials: 'AM', name: 'Ada Marceau' },
  { key: 'jun', initials: 'JO', name: 'Jun Okafor' },
  { key: 'rk', initials: 'RK', name: 'Rosa Kelly' },
];

const REST = [
  { key: 'dana', initials: 'DP', name: 'Dana Peled', role: 'Content' },
  { key: 'ivo', initials: 'IS', name: 'Ivo Strand', role: 'Engineering' },
  { key: 'mei', initials: 'ME', name: 'Mei Eriksen', role: 'Research' },
];

/**
 * Avatar group specimen: five reviewers in the width of three, with the counter
 * standing for the two the row could not fit. The subject is the row, not one
 * circle in it: a single avatar is its own term, and what this word names is the
 * overlapped set plus the counter that completes it.
 *
 * The counter opens, and dismissal is explicit (SPEC §8): the list arrives in a
 * popover that is out of flow, so nothing in the card moves when it does.
 */
export function mount(root: HTMLElement): void {
  const faces = SHOWN.map(
    ({ key, initials, name }, i) =>
      `<span
        class="sp-avatar"
        data-part="face-${key}"
        role="img"
        aria-label="${name}"
        style="${i > 0 ? 'margin-left: -9px;' : ''} box-shadow: 0 0 0 2px var(--sp-surface)"
      >${initials}</span>`,
  ).join('');

  const rest = REST.map(
    ({ key, initials, name, role }) =>
      `<li class="sp-list-item" data-part="rest-${key}" style="padding: 6px 4px">
        <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${initials}</span>
        <span class="sp-grow">${name}</span>
        <span class="sp-text">${role}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context" data-part="screen-top"><span class="sp-heading sp-grow">Pull request 214</span></div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-label">Reviewers</span>
              <span class="sp-text">2 approved</span>
            </div>
            <div class="sp-row" data-part="group" data-subject role="group" aria-label="5 reviewers" style="gap: 0; margin-top: 10px">
              ${faces}
              <button
                class="sp-avatar"
                type="button"
                data-part="overflow"
                aria-expanded="false"
                aria-haspopup="dialog"
                aria-label="Show 3 more reviewers"
                style="margin-left: -9px; border: 0; font: inherit; font-size: 11px; font-weight: 600; background: var(--sp-sunken); color: var(--sp-muted); box-shadow: 0 0 0 2px var(--sp-surface); cursor: pointer"
              >+3</button>
            </div>
          </div>
          <div class="sp-row sp-context" style="margin-top: 12px">
            <span class="sp-text">Opened Tuesday by Ada Marceau</span>
          </div>
        </div>
        <div
          class="sp-popover"
          data-part="rest-popover"
          role="dialog"
          aria-label="More reviewers"
          style="top: 124px; left: 26px; width: 216px; padding: 6px 10px; --sp-arrow-x: 66px"
        >
          <ul class="sp-list sp-context">${rest}</ul>
        </div>
      </div>
    </div>
  `;

  const overflow = part(root, 'overflow');
  const popover = part(root, 'rest-popover');

  const setOpen = (open: boolean) => {
    flag(popover, 'data-open', open);
    overflow.setAttribute('aria-expanded', String(open));
  };

  // The counter opens; it never flips. The rest of the set leaves by a click outside
  // or by Escape, so a pass that is interrupted cannot invert the demonstration.
  overflow.addEventListener('click', () => setOpen(true));
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!popover.contains(target) && !overflow.contains(target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
