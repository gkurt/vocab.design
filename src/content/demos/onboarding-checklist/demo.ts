import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Task = { key: string; label: string; done: boolean };

const TASKS: readonly Task[] = [
  { key: '1', label: 'Name your workspace', done: true },
  { key: '2', label: 'Invite a teammate', done: false },
  { key: '3', label: 'Connect a repository', done: false },
];

const FOOTNOTES = {
  open: 'Finish these whenever you like. Nothing here expires.',
  complete: 'All set. Your workspace is ready to use.',
} as const;

const STATUS = { open: 'To do', done: 'Done' } as const;

const ROW_STYLE = 'width: 100%; border: 0; background: transparent; font: inherit; font-size: 13px; text-align: left; cursor: pointer';

/**
 * Onboarding checklist specimen: setup as a list you can leave, not a wizard that
 * holds you. The subject is the card, since the term is the whole apparatus (the
 * tasks, their state, and the reading of how far along they are) rather than any
 * one row of it.
 *
 * A task only ever completes: clicking one reaches a state instead of flipping it
 * (SPEC §8), which is also how the real pattern behaves, since completion is
 * detected rather than claimed. The footnote and the status words hold the room
 * their longest reading needs, so nothing moves as the card fills in (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  // Copied per mount: reset is destroy-and-remount, so no state may live in the module.
  const tasks: Task[] = TASKS.map((task) => ({ ...task }));

  const rows = tasks
    .map(
      (task) => `
      <button class="sp-list-item" type="button" data-part="task-${task.key}" ${task.done ? 'data-done' : ''} style="${ROW_STYLE}">
        <span class="sp-checkbox" data-part="mark-${task.key}" aria-hidden="true" ${task.done ? 'data-checked' : ''}></span>
        <span class="sp-grow">${task.label}</span>
        <span class="sp-text" data-part="status-${task.key}">${task.done ? STATUS.done : STATUS.open}</span>
        ${icon('chevronRight')}
      </button>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-stack" style="width: 320px; gap: 10px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Northwind</span>
          <span class="sp-text">Home</span>
        </div>
        <div class="sp-surface" data-part="card" data-subject style="padding: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading">Get set up</span>
            <span class="sp-text" data-part="count" role="status">1 of 3 done</span>
          </div>
          <div class="sp-progress" data-part="bar" style="margin-top: 10px; --sp-value: 33%">
            <div class="sp-progress-fill"></div>
          </div>
          <div class="sp-list" style="margin-top: 6px">${rows}</div>
          <div data-part="slot" style="margin-top: 6px">
            <span class="sp-text" data-part="footnote">${FOOTNOTES.open}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const count = part(root, 'count');
  const bar = part(root, 'bar');
  const slot = part(root, 'slot');
  const footnote = part(root, 'footnote');

  let reserved = 0;
  for (const text of Object.values(FOOTNOTES)) {
    footnote.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  slot.style.height = `${reserved}px`;
  footnote.textContent = FOOTNOTES.open;

  for (const task of tasks) {
    const status = part(root, `status-${task.key}`);
    let widest = 0;
    for (const text of Object.values(STATUS)) {
      status.textContent = text;
      widest = Math.max(widest, status.offsetWidth);
    }
    status.style.minWidth = `${widest}px`;
    status.style.textAlign = 'right';
    status.textContent = task.done ? STATUS.done : STATUS.open;
  }

  const complete = (task: Task) => {
    if (task.done) return;
    task.done = true;
    part(root, `task-${task.key}`).setAttribute('data-done', '');
    part(root, `mark-${task.key}`).setAttribute('data-checked', '');
    part(root, `status-${task.key}`).textContent = STATUS.done;

    const done = tasks.filter((t) => t.done).length;
    count.textContent = `${done} of ${tasks.length} done`;
    bar.style.setProperty('--sp-value', `${Math.round((done / tasks.length) * 100)}%`);
    if (done < tasks.length) return;
    // The checklist earns an ending: a card with nothing left to do says so.
    card.setAttribute('data-complete', '');
    footnote.textContent = FOOTNOTES.complete;
  };

  for (const task of tasks) part(root, `task-${task.key}`).addEventListener('click', () => complete(task));
}
