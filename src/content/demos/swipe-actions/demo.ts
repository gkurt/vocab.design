import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** How far the row slides once the gesture has committed, and the point of no return. */
const OPEN_PX = 132;
const COMMIT_PX = OPEN_PX / 2;
const ROW_HEIGHT = 48;

const ACTION = [
  'display: flex; flex-direction: column; align-items: center; justify-content: center',
  'gap: 3px; width: 66px; height: 100%; padding: 0; border-radius: 0; font-size: 11px',
].join('; ');

/** Held in a constant because the drag switches it off and has to put it back. */
const SHEET_EASE = 'transform 0.2s var(--sp-ease)';

const QUIET = [
  { from: 'Priya', subject: 'Design review notes' },
  { from: 'Otis', subject: 'Offsite logistics' },
];

/**
 * Swipe actions specimen: a mail row dragged sideways to uncover the two commands
 * parked behind it, one of which then acts and puts the row back. The subject is
 * the action pair rather than the row that hides it: the row is a list row, with
 * its own word, and what this term names is the buttons underneath.
 *
 * The offset is a transform on the row's own content, so a revealed row never
 * moves the rows around it (SPEC §5), and the mark an action leaves sits in a slot
 * reserved from the start. The gesture reaches an absolute position: past the
 * commit distance it settles open, and only pressing an action closes it (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const quiet = QUIET.map(
    ({ from, subject }) => `
      <li class="sp-list-item sp-context" style="height: ${ROW_HEIGHT}px">
        <span class="sp-avatar">${from.slice(0, 2).toUpperCase()}</span>
        <span class="sp-grow sp-text sp-text--ink">${subject}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inbox</span>
          <span class="sp-text" data-part="count" style="width: 92px; text-align: right">Archived: 0</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="overflow: hidden">
            <ul class="sp-list">
              <li class="sp-list-item sp-context" style="height: ${ROW_HEIGHT}px">
                <span class="sp-avatar">SA</span>
                <span class="sp-grow sp-text sp-text--ink">Invoice for March</span>
              </li>
              <li class="sp-list-item" data-part="row" style="position: relative; overflow: hidden; padding: 0; height: ${ROW_HEIGHT}px; touch-action: none">
                <div
                  class="sp-row"
                  data-part="actions"
                  data-subject
                  style="position: absolute; top: 0; right: 0; bottom: 0; gap: 0; visibility: hidden; opacity: 0; transition: opacity 0.14s, visibility 0.14s"
                >
                  <button class="sp-button" type="button" data-part="action-archive" style="${ACTION}">
                    ${icon('inbox')}
                    Archive
                  </button>
                  <button class="sp-button sp-button--ghost" type="button" data-part="action-delete" style="${ACTION}; border-width: 0 0 0 1px">
                    ${icon('trash')}
                    Delete
                  </button>
                </div>
                <div
                  class="sp-row sp-context"
                  data-part="sheet"
                  style="position: absolute; inset: 0; gap: 10px; padding: 0 12px; background: var(--sp-surface); cursor: grab; transition: ${SHEET_EASE}"
                >
                  <span class="sp-avatar" data-part="row-start">MK</span>
                  <span class="sp-grow sp-text sp-text--ink">Ferry timetable, revised</span>
                  <span style="display: inline-flex; justify-content: flex-end; width: 84px">
                    <span class="sp-chip" data-part="tag" hidden>Archived</span>
                  </span>
                </div>
              </li>
              ${quiet}
            </ul>
          </div>
          <span class="sp-label sp-context">A hidden gesture is an accelerator, never the only door.</span>
        </div>
      </div>
    </div>
  `;

  const row = part(root, 'row');
  const sheet = part(root, 'sheet');
  const actions = part(root, 'actions');
  const tag = part(root, 'tag');
  const count = part(root, 'count');
  let start: number | undefined;
  let reveal = 0;

  const setReveal = (px: number) => {
    reveal = Math.min(Math.max(px, 0), OPEN_PX);
    sheet.style.transform = `translateX(${-reveal}px)`;
    // The panel is only ever on stage while some of it is uncovered, so a script can
    // ask whether the actions are reachable rather than whether they exist.
    const shown = reveal > 2;
    actions.style.visibility = shown ? 'visible' : 'hidden';
    actions.style.opacity = shown ? '1' : '0';
    flag(row, 'data-open', reveal >= OPEN_PX);
  };

  row.addEventListener('pointerdown', (event) => {
    if (actions.contains(event.target as Node)) return;
    start = event.clientX;
    // Following the finger is the whole gesture, and an eased offset would lag it.
    sheet.style.transition = 'none';
  });

  row.addEventListener('pointermove', (event) => {
    if (start === undefined) return;
    setReveal(start - event.clientX);
  });

  const release = () => {
    if (start === undefined) return;
    start = undefined;
    sheet.style.transition = SHEET_EASE;
    // Absolute landing: past the commit distance it is open, short of it closed.
    setReveal(reveal >= COMMIT_PX ? OPEN_PX : 0);
  };

  row.addEventListener('pointerup', release);
  row.addEventListener('pointercancel', release);

  const archive = () => {
    tag.hidden = false;
    count.textContent = 'Archived: 1';
    setReveal(0);
  };

  part(root, 'action-archive').addEventListener('click', archive);
  part(root, 'action-delete').addEventListener('click', () => setReveal(0));

  // Light dismiss: a press anywhere else puts the row back, so the reveal is never
  // left open behind the reader's back.
  root.addEventListener('pointerdown', (event) => {
    if (!row.contains(event.target as Node)) setReveal(0);
  });
}
