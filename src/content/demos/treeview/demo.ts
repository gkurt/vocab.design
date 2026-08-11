import { part } from '#src/kit/parts.ts';

/**
 * The twisty, borrowed from the disclosure-triangle specimen: the kit's icon set
 * carries chevrons rather than this filled solid, and the class it rides is what
 * turns it a quarter turn once the branch it belongs to reports itself expanded.
 */
const TRIANGLE =
  '<svg class="sp-icon sp-icon--filled sp-icon--chevron" viewBox="0 0 24 24" aria-hidden="true" style="width: 10px; height: 10px"><path d="M8 4.5 17 12l-9 7.5z" stroke-width="1"/></svg>';

interface Leaf {
  key: string;
  label: string;
}

const NODES: (Leaf & { children?: Leaf[] })[] = [
  {
    key: 'src',
    label: 'src',
    children: [
      { key: 'app', label: 'app.tsx' },
      { key: 'router', label: 'router.ts' },
    ],
  },
  {
    key: 'assets',
    label: 'assets',
    children: [
      { key: 'logo', label: 'logo.svg' },
      { key: 'hero', label: 'hero.png' },
    ],
  },
  { key: 'readme', label: 'README.md' },
];

interface Item {
  key: string;
  label: string;
  li: HTMLElement;
  row: HTMLElement;
  group: HTMLElement | undefined;
  parent: Item | undefined;
}

/**
 * Tree view specimen: a project tree whose branches open in place, with selection
 * and expansion kept as two separate gestures. The subject is the tree, since the
 * term names the whole nested list and its arrow-key contract, not one row of it.
 *
 * The tree is one tab stop carrying `aria-activedescendant`, so arrow keys move the
 * current row without any element inside it taking focus, which is also what lets
 * the scripted pass drive them (SPEC §7). The branches grow inside a body sized to
 * hold them and the status line is docked below it, so opening one moves rows within
 * the tree (which is the term) and nothing outside it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const leafRow = (leaf: Leaf, depth: number) =>
    `<li
      class="sp-nav-item"
      role="treeitem"
      aria-selected="false"
      id="vd-tree-${leaf.key}"
      data-part="row-${leaf.key}"
      data-key="${leaf.key}"
      style="padding-left: ${depth}px; cursor: pointer"
    >${leaf.label}</li>`;

  const tree = NODES.map((node) => {
    if (!node.children) return leafRow(node, 26);
    return `
      <li role="treeitem" aria-expanded="false" aria-selected="false" id="vd-tree-${node.key}" data-part="node-${node.key}" data-key="${node.key}">
        <div class="sp-row" style="gap: 0">
          <span class="sp-icon-button" data-part="twisty-${node.key}" aria-hidden="true" style="width: 20px; height: 26px; cursor: pointer">${TRIANGLE}</span>
          <span class="sp-nav-item sp-grow" data-part="label-${node.key}" style="padding-left: 4px; cursor: pointer">${node.label}</span>
        </div>
        <ul class="sp-nav" role="group" data-part="group-${node.key}" hidden>
          ${node.children.map((child) => leafRow(child, 42)).join('')}
        </ul>
      </li>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 284px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" style="font-size: 13px">Explorer</span></div>
        <div class="sp-body" style="padding: 10px 12px">
          <ul
            class="sp-nav"
            role="tree"
            tabindex="0"
            aria-label="Project files"
            aria-activedescendant="vd-tree-src"
            data-part="tree"
            data-subject
            style="gap: 1px"
          >${tree}</ul>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 9px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label">Selected</span>
          <span class="sp-text" data-part="status" data-file="src">src</span>
        </div>
      </div>
    </div>
  `;

  const treeEl = part(root, 'tree');
  const status = part(root, 'status');
  const items: Item[] = [];

  for (const node of NODES) {
    const branch = Boolean(node.children);
    const li = part(root, branch ? `node-${node.key}` : `row-${node.key}`);
    const parent: Item = {
      key: node.key,
      label: node.label,
      li,
      row: branch ? part(root, `label-${node.key}`) : li,
      group: branch ? part(root, `group-${node.key}`) : undefined,
      parent: undefined,
    };
    items.push(parent);
    for (const child of node.children ?? []) {
      const childLi = part(root, `row-${child.key}`);
      items.push({ key: child.key, label: child.label, li: childLi, row: childLi, group: undefined, parent });
    }
  }

  let current: Item | undefined = items[0];

  /** The rows a reader can actually move through: a collapsed branch hides its own. */
  const walkable = () => items.filter((item) => item.li.offsetParent !== null);

  const setCurrent = (item: Item | undefined) => {
    if (!item) return;
    current = item;
    for (const other of items) {
      const on = other === item;
      other.li.setAttribute('aria-selected', String(on));
      if (on) other.row.setAttribute('data-current', '');
      else other.row.removeAttribute('data-current');
    }
    treeEl.setAttribute('aria-activedescendant', `vd-tree-${item.key}`);
    status.dataset.file = item.key;
    status.textContent = item.label;
  };

  const setExpanded = (item: Item, open: boolean) => {
    if (!item.group) return;
    item.group.hidden = !open;
    item.li.setAttribute('aria-expanded', String(open));
  };

  const expanded = (item: Item) => item.li.getAttribute('aria-expanded') === 'true';

  setCurrent(items[0]);

  for (const item of items) {
    // Expansion and selection are different gestures (the twisty opens, the row
    // chooses), which is the distinction the term lives or dies by.
    item.row.addEventListener('click', () => setCurrent(item));
    if (!item.group) continue;
    const twisty = part(root, `twisty-${item.key}`);
    // A branch's whole point is opening and closing in place, so this one flips and
    // the script drives both directions itself (SPEC §8).
    twisty.addEventListener('click', () => setExpanded(item, !expanded(item)));
  }

  root.addEventListener('keydown', (event) => {
    const row = current;
    if (!row) return;
    const rows = walkable();
    const index = rows.indexOf(row);
    if (event.key === 'ArrowDown') setCurrent(rows[Math.min(index + 1, rows.length - 1)]);
    else if (event.key === 'ArrowUp') setCurrent(rows[Math.max(index - 1, 0)]);
    else if (event.key === 'Home') setCurrent(rows[0]);
    else if (event.key === 'End') setCurrent(rows[rows.length - 1]);
    else if (event.key === 'ArrowRight') {
      if (!row.group) return;
      if (!expanded(row)) setExpanded(row, true);
      else setCurrent(walkable()[index + 1]);
    } else if (event.key === 'ArrowLeft') {
      if (row.group && expanded(row)) setExpanded(row, false);
      else setCurrent(row.parent);
    } else return;
    event.preventDefault();
  });
}
