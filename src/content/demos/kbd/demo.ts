const COMMANDS = [
  { key: 'new', label: 'New document', caps: ['Ctrl', 'N'] },
  { key: 'find', label: 'Find in page', caps: ['Ctrl', 'F'] },
  { key: 'save', label: 'Save', caps: ['Ctrl', 'S'] },
];

/**
 * Keyboard key specimen: a command menu whose rows print the faster route, plus
 * the same primitive used in a sentence. The subject is one keycap, since the
 * word names the printed key and not the menu that happens to list three of them.
 *
 * Nothing here reacts, on purpose: a keycap is a legend, so a specimen that let
 * you click one would be demonstrating a button.
 */
export function mount(root: HTMLElement): void {
  const rows = COMMANDS.map(
    ({ key, label, caps }) => `
      <div class="sp-menu-item" data-part="row-${key}">
        <span class="sp-grow">${label}</span>
        <span class="sp-row" style="gap: 3px">${caps.map((cap) => `<kbd class="sp-kbd">${cap}</kbd>`).join('')}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 220px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Atlas</span></div>
        <div class="sp-body">
          <div class="sp-surface sp-context" data-part="menu" style="padding: 4px">${rows}</div>
          <p class="sp-text" style="margin: 14px 0 0">
            Press <kbd class="sp-kbd" data-part="key-esc" data-subject>Esc</kbd> to close the menu.
          </p>
        </div>
      </div>
    </div>
  `;
}
