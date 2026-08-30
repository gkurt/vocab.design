import { flag, part } from '#src/kit/parts.ts';

type Message = { from: string; subject: string; body: string[] };

const ORDER = ['inbox', 'flagged', 'archive'] as const;
type FolderKey = (typeof ORDER)[number];

/** Three scopes, each holding three messages, so the middle region always fills the same rows. */
const FOLDERS: Record<FolderKey, { name: string; messages: Message[] }> = {
  inbox: {
    name: 'Inbox',
    messages: [
      { from: 'Marta Vinck', subject: 'Berth confirmation', body: ['94%', '78%', '88%', '64%'] },
      { from: 'Harbour office', subject: 'Dues for March', body: ['86%', '92%', '70%', '80%'] },
      { from: 'Iwan Pryce', subject: 'Crane booking', body: ['90%', '66%', '84%', '58%'] },
    ],
  },
  flagged: {
    name: 'Flagged',
    messages: [
      { from: 'Lock keeper', subject: 'Gate closed Tuesday', body: ['88%', '72%', '92%', '60%'] },
      { from: 'Marta Vinck', subject: 'Winter lift out', body: ['76%', '90%', '68%', '86%'] },
      { from: 'Chandlery', subject: 'Part on order', body: ['92%', '64%', '80%', '74%'] },
    ],
  },
  archive: {
    name: 'Archive',
    messages: [
      { from: 'Harbour office', subject: 'Dues for February', body: ['84%', '88%', '62%', '90%'] },
      { from: 'Sail loft', subject: 'Main repaired', body: ['70%', '94%', '78%', '66%'] },
      { from: 'Iwan Pryce', subject: 'Mooring swap', body: ['96%', '68%', '82%', '72%'] },
    ],
  },
};

const SLOTS = [0, 1, 2];
const TRUNCATE = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap';

/**
 * Multi column layout specimen: a mail shell with three regions on screen at once. The folder
 * region names the scope, the list region shows what that scope holds, and the reading region
 * shows the one message picked from the list, so a pick on the left decides what the region to
 * its right is allowed to show.
 *
 * The subject is the three-region shell, which is what the term names: the window title and the
 * path readout are the scene it is read against and carry the context register (SPEC §5). The
 * title bar also carried a legend reading "navigation · list · reading pane", which was the site
 * naming the parts over a mail app's own chrome, so it went; the regions are visible as regions.
 *
 * It is not the top-level wrapper, so identify still has something to point at (SPEC §6).
 *
 * Every region keeps a fixed track, and each folder holds the same number of messages, so a
 * pick swaps content without moving a single boundary (SPEC §5). Folders and rows are picked
 * by name rather than stepped through, so a pass joined halfway lands in the same place
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const folderItems = ORDER.map(
    (key) =>
      `<li><span class="sp-nav-item" data-part="folder-${key}"${key === 'inbox' ? ' data-current' : ''}>${FOLDERS[key].name}</span></li>`,
  ).join('');

  const rowItems = SLOTS.map(
    (i) => `
      <li class="sp-list-item" data-part="row-${i}" style="align-items: flex-start; cursor: pointer">
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span data-part="row-from-${i}" style="font-size: 12px; font-weight: 500; ${TRUNCATE}"></span>
          <span class="sp-label" data-part="row-subject-${i}" style="${TRUNCATE}"></span>
        </span>
      </li>`,
  ).join('');

  const bodyLines = [0, 1, 2, 3].map((i) => `<div class="sp-line" data-part="body-${i}"></div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px">
          <div
            data-part="shell"
            data-subject
            style="display: grid; grid-template-columns: 104px 156px 1fr; width: 444px; height: 203px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px; border-right: 1px solid var(--sp-line); background: var(--sp-sunken)">
              <span class="sp-label">Folders</span>
              <ul class="sp-nav">${folderItems}</ul>
            </div>
            <div style="display: flex; flex-direction: column; min-width: 0; border-right: 1px solid var(--sp-line)">
              <span class="sp-label" data-part="list-header" style="flex: 0 0 auto; padding: 9px 10px 6px"></span>
              <ul class="sp-list" style="min-width: 0">${rowItems}</ul>
            </div>
            <div data-part="reader" style="display: flex; flex-direction: column; gap: 7px; min-width: 0; padding: 12px">
              <span class="sp-heading" data-part="reader-subject" style="font-size: 14px; ${TRUNCATE}"></span>
              <span class="sp-label" data-part="reader-from" style="${TRUNCATE}"></span>
              <div class="sp-divider" style="margin: 2px 0"></div>
              ${bodyLines}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center; ${TRUNCATE}"></span>
        </div>
      </div>
    </div>
  `;

  const folders = ORDER.map((key) => ({ key, el: part(root, `folder-${key}`) }));
  const rows = SLOTS.map((i) => ({
    el: part(root, `row-${i}`),
    from: part(root, `row-from-${i}`),
    subject: part(root, `row-subject-${i}`),
  }));
  const bodyEls = [0, 1, 2, 3].map((i) => part(root, `body-${i}`));
  const listHeader = part(root, 'list-header');
  const readerSubject = part(root, 'reader-subject');
  const readerFrom = part(root, 'reader-from');
  const readout = part(root, 'readout');

  let folderKey: FolderKey = 'inbox';
  let openIndex = 0;

  const render = () => {
    const folder = FOLDERS[folderKey];
    for (const folderItem of folders) flag(folderItem.el, 'data-current', folderItem.key === folderKey);
    listHeader.textContent = `${folder.name} · ${folder.messages.length} messages`;

    rows.forEach((row, i) => {
      const message = folder.messages[i];
      if (!message) return;
      flag(row.el, 'data-selected', i === openIndex);
      row.from.textContent = message.from;
      row.subject.textContent = message.subject;
    });

    const open = folder.messages[openIndex];
    if (!open) return;
    readerSubject.textContent = open.subject;
    readerFrom.textContent = `${open.from} · to Harbour crew`;
    bodyEls.forEach((line, i) => {
      line.style.width = open.body[i] ?? '80%';
    });
    readout.textContent = `${folder.name} › ${open.from} › ${open.subject}`;
  };

  // A folder is picked by name, and picking one puts the reading region back on that
  // folder's first message: the pick on the left decides what the regions to its right show.
  for (const folderItem of folders) {
    folderItem.el.addEventListener('click', () => {
      folderKey = folderItem.key;
      openIndex = 0;
      render();
    });
  }

  rows.forEach((row, i) => {
    row.el.addEventListener('click', () => {
      openIndex = i;
      render();
    });
  });

  render();
}
