import { flag, part } from '#src/kit/parts.ts';

const COMMANDS = [
  { key: 'heading', label: 'Heading', badge: 'H', hint: 'Large section title' },
  { key: 'highlight', label: 'Highlight', badge: 'Hi', hint: 'Mark the selection' },
  { key: 'todo', label: 'To-do list', badge: 'T', hint: 'Checkbox list' },
  { key: 'table', label: 'Table', badge: 'Tb', hint: 'Three by three' },
  { key: 'divider', label: 'Divider', badge: 'D', hint: 'Horizontal rule' },
] as const;

/**
 * The trigger, and how far it reaches. It counts only at a word boundary, so a date or a
 * path never opens the menu, and it ends at whitespace, which is the conventional way of
 * saying the character was meant literally.
 */
const TRIGGER = /(^|\s)\/([a-z]*)$/i;

const HINT = {
  idle: 'Type / to run a command',
  ran: 'Enter ran the command. The characters you typed went with it.',
  dismissed: 'Escape closed the menu and left the writing alone.',
} as const;

const BADGE = [
  'display: inline-flex',
  'align-items: center',
  'justify-content: center',
  'flex: 0 0 auto',
  'width: 20px',
  'height: 18px',
  'border-radius: 4px',
  'background: var(--sp-sunken)',
  'font-size: 10px',
  'font-weight: 600',
].join('; ');

/**
 * Slash command specimen: a document composer where typing a forward slash opens a menu of
 * blocks, each further character narrows it, and Enter runs the highlighted entry instead
 * of sending the characters that named it. Escape is the explicit dismissal, so nothing
 * here toggles a state it found (SPEC §8).
 *
 * The subject is the command menu. The trigger would be narrower still, but it is a single
 * character inside a text field and there is no element to ring; the menu is what the
 * term's other names all point at (slash menu, block menu) and it is the half a reader can
 * see (SPEC §5). The document above, the composer, the inserted block, and the hint line
 * are scenery.
 *
 * The menu is drawn over the document rather than inserted into the column, and the block
 * the command inserts lands in a slot that was already reserved for it, so neither opening
 * the menu nor running a command moves the composer under the reader (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const options = COMMANDS.map(
    ({ key, label, badge, hint }) => `
      <li class="sp-option" role="option" data-part="opt-${key}" data-key="${key}" aria-selected="false"
          style="display: flex; align-items: center; gap: 8px; padding: 3px 6px">
        <span style="${BADGE}">${badge}</span>
        <span class="sp-grow" style="min-width: 0">${label}</span>
        <span class="sp-label" style="font-size: 10px">${hint}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour notes</span>
          <span class="sp-label" style="font-size: 11px">Draft</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-stack sp-context" style="flex: 0 0 auto; height: 84px; gap: 9px">
            <span class="sp-heading" style="font-size: 14px">Tuesday, low water</span>
            <span class="sp-line" style="width: 94%"></span>
            <span class="sp-line" style="width: 86%"></span>
            <span class="sp-line" style="width: 91%"></span>
            <span class="sp-line" style="width: 62%"></span>
          </div>

          <div class="sp-row sp-context" data-part="block-slot" style="flex: 0 0 auto; height: 26px; gap: 8px">
            <span style="${BADGE}" data-part="block-badge" hidden>H</span>
            <span class="sp-heading" data-part="block" hidden style="font-size: 14px">Heading</span>
            <span class="sp-caret" data-part="block-caret" hidden></span>
          </div>

          <div data-part="composer" style="position: relative; flex: 0 0 auto">
            <ul
              class="sp-listbox"
              data-part="menu"
              data-subject
              role="listbox"
              aria-label="Commands"
              style="top: auto; bottom: calc(100% + 6px); max-height: 132px"
            >${options}</ul>
            <div class="sp-row" style="height: 38px; gap: 6px; padding: 0 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
              <input
                data-part="editor"
                type="text"
                autocomplete="off"
                spellcheck="false"
                aria-label="Write, or type a slash to run a command"
                aria-expanded="false"
                placeholder="Write, or type / for a command"
                style="flex: 1 1 auto; min-width: 0; border: 0; padding: 0; background: transparent; color: var(--sp-ink); font: inherit; font-size: 13px"
              />
            </div>
          </div>

          <span class="sp-label sp-context" data-part="hint" role="status"
                style="flex: 0 0 auto; height: 18px; font-size: 11px; white-space: nowrap; overflow: hidden">${HINT.idle}</span>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" style="width: 440px; font-size: 11px">The menu opens on the slash and leaves by a choice or by Escape.</span>
      </div>
    </div>
  `;

  const menu = part(root, 'menu');
  const composer = part(root, 'composer');
  const editor = part(root, 'editor') as HTMLInputElement;
  const hint = part(root, 'hint');
  const block = part(root, 'block');
  const blockBadge = part(root, 'block-badge');
  const blockCaret = part(root, 'block-caret');
  const rows = COMMANDS.map(({ key }) => part(root, `opt-${key}`));

  const close = () => {
    flag(menu, 'data-open', false);
    editor.setAttribute('aria-expanded', 'false');
    for (const row of rows) row.setAttribute('aria-selected', 'false');
  };

  /** The fragment the trigger is currently claiming, or null when no query is open. */
  const queryOf = () => TRIGGER.exec(editor.value)?.[2]?.toLowerCase() ?? null;

  const activeKey = () => rows.find((row) => row.getAttribute('aria-selected') === 'true')?.dataset.key ?? '';

  /** The query Escape was pressed on: the menu stays shut until that query ends. */
  let dismissed: string | null = null;

  const filter = () => {
    const query = queryOf();
    if (query === null) {
      dismissed = null;
      close();
      return;
    }
    if (dismissed !== null && query.startsWith(dismissed)) {
      close();
      return;
    }
    dismissed = null;
    let first: HTMLElement | undefined;
    for (const [index, command] of COMMANDS.entries()) {
      const row = rows[index];
      if (!row) continue;
      const hit = command.label.toLowerCase().startsWith(query);
      row.hidden = !hit;
      if (hit && !first) first = row;
    }
    for (const row of rows) row.setAttribute('aria-selected', String(row === first));
    const matches = rows.filter((row) => !row.hidden).length;
    hint.textContent = matches === 0 ? `No command starts with "${query}"` : `${matches} of ${COMMANDS.length} commands`;
    flag(menu, 'data-open', matches > 0);
    editor.setAttribute('aria-expanded', String(matches > 0));
  };

  /** Run the highlighted command: the block arrives, the characters that named it do not. */
  const run = () => {
    const command = COMMANDS.find((entry) => entry.key === activeKey());
    if (!command || queryOf() === null) return;
    blockBadge.textContent = command.badge;
    block.textContent = command.label;
    for (const el of [blockBadge, block, blockCaret]) el.hidden = false;
    editor.value = editor.value.replace(TRIGGER, '$1');
    composer.dataset.ran = command.key;
    close();
    hint.textContent = HINT.ran;
  };

  editor.addEventListener('input', filter);

  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      run();
      return;
    }
    if (event.key !== 'Escape') return;
    event.preventDefault();
    // Escape gives the keys back without deleting what was typed, and it sticks: the menu
    // stays shut until this query ends rather than reopening on the next character.
    dismissed = queryOf();
    close();
    hint.textContent = HINT.dismissed;
  });

  for (const row of rows) {
    row.addEventListener('click', () => {
      for (const other of rows) other.setAttribute('aria-selected', String(other === row));
      run();
    });
  }

  // Clicking the box puts the caret back in the field, the way a real composer does. Never
  // for a synthesized click: attract mode must not move real focus (SPEC §7).
  composer.addEventListener('pointerdown', (event) => {
    if (event.target === editor || !event.isTrusted) return;
    editor.focus();
  });
}
