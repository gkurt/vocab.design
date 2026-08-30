import { flag, part } from '#src/kit/parts.ts';

interface Item {
  key: string;
  letter: string;
  rest: string;
  name: string;
}

interface Menu {
  key: string;
  letter: string;
  rest: string;
  title: string;
  items: Item[];
}

const MENUS: Menu[] = [
  {
    key: 'file',
    letter: 'F',
    rest: 'ile',
    title: 'File',
    items: [
      { key: 'new', letter: 'N', rest: 'ew window', name: 'New window' },
      { key: 'open', letter: 'O', rest: 'pen recent', name: 'Open recent' },
      { key: 'save', letter: 'S', rest: 'ave as', name: 'Save as' },
      { key: 'close', letter: 'C', rest: 'lose', name: 'Close' },
    ],
  },
  {
    key: 'edit',
    letter: 'E',
    rest: 'dit',
    title: 'Edit',
    items: [
      { key: 'undo', letter: 'U', rest: 'ndo', name: 'Undo' },
      { key: 'redo', letter: 'R', rest: 'edo', name: 'Redo' },
      { key: 'prefs', letter: 'P', rest: 'references', name: 'Preferences' },
    ],
  },
  {
    key: 'view',
    letter: 'V',
    rest: 'iew',
    title: 'View',
    items: [
      { key: 'zoom', letter: 'Z', rest: 'oom in', name: 'Zoom in' },
      { key: 'full', letter: 'F', rest: 'ull screen', name: 'Full screen' },
      { key: 'side', letter: 'S', rest: 'idebar', name: 'Sidebar' },
    ],
  },
];

/**
 * One label with its mnemonic marked. The rule is drawn as a transparent border at rest, so
 * revealing it costs no layout, and the whole label is one box: `.sp-menu-item` is a flex
 * container, and a bare text node beside the span would be a second flex item with a gap
 * between it and its own first letter.
 */
const label = (name: string, letter: string, rest: string, subject = false) =>
  `<span><span data-part="mn-${name}"${subject ? ' data-subject' : ''} style="display: inline-block; border-bottom: 2px solid transparent">${letter}</span>${rest}</span>`;

const menuMarkup = (menu: Menu) => `
  <div class="sp-menu" data-part="menu-${menu.key}" style="transform-origin: top left; z-index: 4">
    ${menu.items
      .map(
        (item) =>
          `<button class="sp-menu-item" type="button" data-part="item-${item.key}">${label(item.key, item.letter, item.rest)}</button>`,
      )
      .join('')}
  </div>`;

/**
 * Access key specimen: a small window whose menu titles each carry one letter that reaches
 * them. Nothing armed, a letter is a letter and lands in the document. The modifier draws
 * every mnemonic in sight, the same letter then opens the menu it names, and inside the menu
 * a bare letter runs the item.
 *
 * The subject is the F in File, the narrowest element the term actually names. The term is the
 * letter, not the menu it opens and not the bar it sits in, and the letter stays the access key
 * whether or not its rule is currently drawn, so there is no dishonest state to pose against.
 * Edit and View are peers rather than scenery for the same reason focus-follows-mouse keeps its
 * second window: a mnemonic scheme is only legible as a set of distinct letters. The document,
 * the key trail and the readouts are instrumentation in the context register.
 *
 * **The real `accesskey` attribute is never used here, and that is the term's own caveat.** A
 * live binding would collide with the browser's Alt commands and with screen reader keys on the
 * page this specimen is embedded in, which is why most design systems draw their mnemonics
 * themselves. This one does the same: its own underline, its own armed mode, its own handling.
 * A caption under the body used to say that in the site's voice ("Mnemonics drawn by this
 * specimen, never the HTML accesskey attribute"), which is a note to the reader of the article
 * rather than anything the Notes window would print, so it is gone: the article already carries
 * the caveat. The topbar readout lost its aphorism for the same reason and now rests at
 * "Nothing armed".
 *
 * The mode latches on Alt rather than lasting for a hold, which is what real menu mnemonics do
 * and also what a scripted press can express: the player's press is a keydown and a keyup back
 * to back. Escape is the explicit way out, so no key toggles anything (SPEC §8).
 *
 * Menus are absolutely positioned over a fixed body, the mnemonic keeps the room its rule will
 * take, and the typed line is clipped, so nothing here moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="app" data-armed="no" data-ran="none" data-typed="no" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-text" data-part="readout" style="width: 330px; text-align: right; white-space: nowrap">Nothing armed</span>
        </div>

        <div class="sp-row" data-part="menubar" style="gap: 2px; flex: 0 0 auto; padding: 4px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)">
          ${MENUS.map(
            (menu) =>
              `<button class="sp-button sp-button--quiet sp-button--sm${menu.key === 'file' ? '' : ' sp-context'}" type="button" data-part="title-${menu.key}" style="padding: 4px 9px; font-size: 13px">${label(menu.key, menu.letter, menu.rest, menu.key === 'file')}</button>`,
          ).join('')}
        </div>

        <div class="sp-body" style="display: flex; align-items: stretch; gap: 12px">
          <div class="sp-surface sp-context" data-part="doc" style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 9px; padding: 12px">
            <span class="sp-heading" style="font-size: 13px">Untitled</span>
            <span class="sp-line" style="width: 88%"></span>
            <span class="sp-line" style="width: 66%"></span>
            <span class="sp-grow"></span>
            <span class="sp-label" style="font-size: 11px">Typed into the document</span>
            <span
              class="sp-text sp-text--ink"
              data-part="typed"
              style="height: 20px; line-height: 20px; font-size: 13px; white-space: nowrap; overflow: hidden; font-family: var(--sp-font)"
            >&nbsp;</span>
          </div>

          <div class="sp-stack sp-context" style="width: 150px; gap: 7px">
            <span class="sp-label">Keys pressed</span>
            <div class="sp-row sp-row--wrap" data-part="trail" style="gap: 5px; min-height: 24px; align-items: flex-start"></div>
            <div class="sp-divider"></div>
            <span class="sp-label">Last command</span>
            <span class="sp-heading" data-part="ran" style="font-size: 13px">None yet</span>
          </div>
        </div>

        ${MENUS.map(menuMarkup).join('')}
      </div>
    </div>
  `;

  const app = part(root, 'app');
  const menubar = part(root, 'menubar');
  const readout = part(root, 'readout');
  const trail = part(root, 'trail');
  const typed = part(root, 'typed');
  const ran = part(root, 'ran');

  // Measured on the mounted state, before anything is written back to it, so no style write
  // is ever read straight back (AGENTS.md). The titles never move afterwards.
  const menuTop = menubar.offsetTop + menubar.offsetHeight;
  for (const menu of MENUS) {
    const surface = part(root, `menu-${menu.key}`);
    surface.style.left = `${part(root, `title-${menu.key}`).offsetLeft}px`;
    surface.style.top = `${menuTop}px`;
  }

  let armed = false;
  let open: Menu | undefined;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const showMnemonics = (on: boolean) => {
    for (const menu of MENUS) {
      for (const name of [menu.key, ...menu.items.map((item) => item.key)]) {
        const span = part(root, `mn-${name}`);
        flag(span, 'data-shown', on);
        span.style.borderBottomColor = on ? 'currentColor' : 'transparent';
      }
    }
  };

  const setTrail = (keys: string[]) => {
    trail.innerHTML = keys.map((key) => `<span class="sp-kbd">${key}</span>`).join('');
  };

  const closeMenus = () => {
    open = undefined;
    for (const menu of MENUS) {
      part(root, `menu-${menu.key}`).removeAttribute('data-open');
      const title = part(root, `title-${menu.key}`);
      title.removeAttribute('data-open');
      title.removeAttribute('data-sim-focus');
    }
  };

  const leave = (text: string) => {
    armed = false;
    app.dataset.armed = 'no';
    closeMenus();
    showMnemonics(false);
    say(text);
  };

  const arm = () => {
    armed = true;
    app.dataset.armed = 'yes';
    app.dataset.ran = 'none';
    ran.textContent = 'None yet';
    showMnemonics(true);
    setTrail(['Alt']);
    say('Alt armed: the access keys are drawn');
  };

  const openMenu = (menu: Menu) => {
    closeMenus();
    open = menu;
    armed = true;
    app.dataset.armed = 'yes';
    showMnemonics(true);
    part(root, `menu-${menu.key}`).setAttribute('data-open', '');
    const title = part(root, `title-${menu.key}`);
    title.setAttribute('data-open', '');
    // Simulated, never real: attract mode must not move the reader's focus (SPEC §7).
    title.setAttribute('data-sim-focus', '');
    setTrail(['Alt', menu.letter]);
    say(`Alt, ${menu.letter} opened the ${menu.title} menu`);
  };

  const run = (menu: Menu, item: Item) => {
    app.dataset.ran = item.key;
    ran.textContent = item.name;
    // Running the item is also the way out of the mode: nothing latches past the command.
    leave(`${item.name} ran from Alt, ${menu.letter}, ${item.letter}`);
    setTrail(['Alt', menu.letter, item.letter]);
  };

  const typeInto = (char: string) => {
    const text = `${typed.textContent?.trim() ?? ''}${char}`.slice(-30);
    typed.textContent = text;
    app.dataset.typed = 'yes';
    setTrail([char]);
    say(`Nothing armed, so "${char}" went into the document`);
  };

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Alt') {
      event.preventDefault();
      return arm();
    }
    if (event.key === 'Escape') return leave('Escape left mnemonic mode');
    if (event.key.length !== 1) return;
    // A real reader holds the modifier, so `altKey` counts too; the scripted press cannot
    // carry one, which is what the latched mode is for.
    if (!armed && !event.altKey) return typeInto(event.key);
    event.preventDefault();
    const letter = event.key.toUpperCase();
    if (open) {
      const item = open.items.find((candidate) => candidate.letter === letter);
      if (item) return run(open, item);
      return say(`No item in ${open.title} answers ${letter}`);
    }
    const menu = MENUS.find((candidate) => candidate.letter === letter);
    if (menu) return openMenu(menu);
    say(`No menu answers ${letter}`);
  });

  // The pointer path a mnemonic is a shortcut for, so the same menus work without a keyboard.
  for (const menu of MENUS) {
    part(root, `title-${menu.key}`).addEventListener('click', () => {
      if (open === menu) return leave('Menu closed');
      openMenu(menu);
    });
    for (const item of menu.items) {
      part(root, `item-${item.key}`).addEventListener('click', () => run(menu, item));
    }
  }
}
