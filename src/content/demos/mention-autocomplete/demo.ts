import { flag, part } from '#src/kit/parts.ts';

const PEOPLE = [
  { key: 'mara', name: 'Mara Ito', role: 'Design', initials: 'MI' },
  { key: 'marcus', name: 'Marcus Bell', role: 'Data', initials: 'MB' },
  { key: 'maya', name: 'Maya Osei', role: 'Research', initials: 'MO' },
  { key: 'priya', name: 'Priya Raman', role: 'Design', initials: 'PR' },
  { key: 'tom', name: 'Tom Ferris', role: 'Support', initials: 'TF' },
] as const;

/**
 * The trigger, and how far it reaches. It counts only at a word boundary, so an
 * email address never opens the menu, and it ends at whitespace, which is the
 * conventional way to say the character was meant literally.
 */
const TRIGGER = /(^|\s)@([a-z]*)$/i;

/** The token a chosen mention becomes: accent tinted, and atomic once it is there. */
const TOKEN = 'background: var(--sp-accent-soft); border-color: transparent; color: var(--sp-ink); cursor: default';

/**
 * Mention autocomplete specimen: a comment box where typing `@` turns the next few
 * characters into a query against the people on the thread, and choosing one leaves a
 * token in the prose rather than the letters that were typed.
 *
 * The subject is the composer with its anchored list, since the term names the loop
 * between them and neither half is the word on its own: the box alone is a text field
 * and the list alone is a listbox. The thread above it and the Comment button below
 * are scenery (SPEC §5).
 *
 * The kit's `<sp-combobox>` is deliberately not used here. It filters on the whole
 * value of its field, which is exactly what this pattern cannot do: the query is a
 * fragment inside prose, and deciding on every keystroke whether a query is even in
 * progress is the term itself.
 *
 * The composer keeps one height and the list is drawn over the scene, so opening it
 * and inserting a token both move nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const options = PEOPLE.map(
    ({ key, name, role, initials }) => `
      <li class="sp-option" role="option" data-part="opt-${key}" data-key="${key}" aria-selected="false"
          style="display: flex; align-items: center; gap: 8px; padding: 5px 8px">
        <span class="sp-avatar" style="width: 20px; height: 20px; font-size: 9px">${initials}</span>
        <span class="sp-grow">${name}</span>
        <span class="sp-label">${role}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 292px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Ramp tokens</span><span class="sp-label">4 replies</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row sp-context" style="gap: 8px; align-items: flex-start">
            <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">JR</span>
            <span class="sp-text" style="flex: 1 1 auto">The greys are one step too warm at 600. Fine everywhere else.</span>
          </div>
          <div class="sp-row sp-context" style="gap: 8px; align-items: flex-start">
            <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">PK</span>
            <span class="sp-text" style="flex: 1 1 auto">Same reading here. Worth a second pair of eyes before we ship.</span>
          </div>

          <div data-part="mention" data-subject style="position: relative">
            <ul class="sp-listbox" data-part="list" role="listbox" aria-label="People on this thread"
                style="top: auto; bottom: calc(100% + 6px); max-height: 100px">${options}</ul>
            <div class="sp-row sp-row--wrap" data-part="composer" style="align-items: center; align-content: flex-start; gap: 4px; height: 68px; padding: 8px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
              <span class="sp-text sp-text--ink" data-part="lede">Agreed,</span>
              <input
                data-part="editor"
                type="text"
                autocomplete="off"
                spellcheck="false"
                aria-label="Write a reply"
                aria-expanded="false"
                style="flex: 1 1 96px; min-width: 96px; border: 0; padding: 0; background: transparent; color: var(--sp-ink); font: inherit; font-size: 13px"
              />
            </div>
          </div>

          <div class="sp-row sp-row--between sp-context" style="height: 30px">
            <span class="sp-label" data-part="hint" role="status" style="min-width: 0; overflow: hidden; white-space: nowrap">Type @ to bring someone in</span>
            <button class="sp-button sp-button--sm" type="button" data-part="send">Reply</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const wrap = part(root, 'mention');
  const list = part(root, 'list');
  const composer = part(root, 'composer');
  const editor = part(root, 'editor') as HTMLInputElement;
  const hint = part(root, 'hint');
  const rows = PEOPLE.map(({ key }) => part(root, `opt-${key}`));

  const close = () => {
    flag(list, 'data-open', false);
    editor.setAttribute('aria-expanded', 'false');
    for (const row of rows) row.setAttribute('aria-selected', 'false');
  };

  /** The fragment the trigger is currently claiming, or null when no query is open. */
  const queryOf = () => TRIGGER.exec(editor.value)?.[2]?.toLowerCase() ?? null;

  const filter = () => {
    const query = queryOf();
    if (query === null) {
      hint.textContent = 'Type @ to bring someone in';
      close();
      return;
    }
    // A name matches on any of its words, so a surname is as good a way in as a first
    // name, and an empty query (the bare trigger) offers everyone.
    let first: HTMLElement | undefined;
    for (const [index, person] of PEOPLE.entries()) {
      const row = rows[index];
      if (!row) continue;
      const hit =
        query === '' ||
        person.name
          .toLowerCase()
          .split(' ')
          .some((word) => word.startsWith(query));
      row.hidden = !hit;
      if (hit && !first) first = row;
    }
    for (const row of rows) row.setAttribute('aria-selected', String(row === first));
    const matches = rows.filter((row) => !row.hidden).length;
    hint.textContent = matches === 0 ? `Nobody matches "${query}"` : `${matches} of ${PEOPLE.length} on this thread`;
    flag(list, 'data-open', matches > 0);
    editor.setAttribute('aria-expanded', String(matches > 0));
  };

  /** Swap the open query for a token. The identity travels, the typed letters do not. */
  const insert = (key: string) => {
    const person = PEOPLE.find((entry) => entry.key === key);
    if (!person || queryOf() === null) return;
    const token = document.createElement('span');
    token.className = 'sp-chip';
    token.dataset.part = 'token';
    token.dataset.who = key;
    token.setAttribute('style', TOKEN);
    token.textContent = `@${person.name}`;
    composer.insertBefore(token, editor);
    editor.value = editor.value.replace(TRIGGER, '$1');
    wrap.dataset.mentioned = key;
    hint.textContent = `${person.name} will be notified`;
    close();
  };

  editor.addEventListener('input', filter);

  editor.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    close();
  });

  for (const row of rows) {
    row.addEventListener('click', () => insert(row.dataset.key ?? ''));
  }

  // Clicking the box puts the caret back in the field, the way a real composer does.
  composer.addEventListener('pointerdown', (event) => {
    if (event.target === editor || !event.isTrusted) return;
    editor.focus();
  });
}
