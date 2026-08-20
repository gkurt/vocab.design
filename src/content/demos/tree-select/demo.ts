import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const FIELD_W = 268;
const ROW_H = 24;

interface Folder {
  name: string;
  children?: Folder[];
}

const TREE: Folder[] = [
  {
    name: 'Marketing',
    children: [{ name: 'Campaigns', children: [{ name: 'Q3 launch' }, { name: 'Q4 launch' }] }, { name: 'Brand assets' }],
  },
  { name: 'Engineering', children: [{ name: 'Runbooks' }, { name: 'Design docs' }] },
  { name: 'Archive' },
];

const key = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * Tree select specimen: one field holding one destination, whose popup is the whole folder tree
 * indented in a single column. Marketing is open from the start, so a branch and its children
 * and a sibling branch are all on screen at once; the twisty on Engineering opens a second
 * branch without closing the first, and the choice the script commits is Campaigns, a PARENT
 * with its own children collapsed under it, which is the capability the component exists for.
 *
 * The subject is the control: the box holding the field and its tree popup, which is where
 * `select` and `combobox` put theirs, since neither half is the term on its own. The tree
 * alone is a tree view and the field alone is a select's field; what the word names is a field
 * whose popup is a tree. It is honestly a tree select open or shut, so no `data-pose` condition
 * is needed. The window chrome, the labels and the row of files are scenery.
 *
 * The popup is out of flow, so a branch opening grows the tree without moving anything in the
 * page behind it (SPEC §5), and one delegated listener reads the row off `data-node`, so a
 * rebuilt tree never needs rebinding and nothing synthesizes a second click (SPEC §8). The
 * twisty is the one control here that flips, because collapsing over its children is the
 * disclosure's own term; selection always names a node outright, and the evidence a commit
 * leaves is the field's own path readout, never a row inside the popup the commit just closed.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Move 3 files</span>
          <span class="sp-label" style="font-size: 11px">One field, any depth</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 12px 16px">
         <div class="sp-stack" style="flex: 0 0 auto; gap: 4px; width: ${FIELD_W}px">
          <span class="sp-label sp-context" id="vd-tree-select-label" style="font-size: 11px">Destination folder</span>

          <div data-part="control" data-subject style="position: relative; flex: 0 0 auto; width: 100%">
            <button
              class="sp-button sp-button--ghost sp-row sp-row--between"
              type="button"
              data-part="field"
              role="combobox"
              aria-haspopup="tree"
              aria-expanded="false"
              aria-labelledby="vd-tree-select-label"
              style="width: 100%; gap: 8px; padding: 6px 10px; font-size: 12.5px"
            >
              <span
                class="sp-grow"
                data-part="path"
                data-depth="0"
                data-value="none"
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; color: var(--sp-muted)"
                >Choose a folder</span
              >
              ${icon('chevronDown')}
            </button>

            <div
              class="sp-popover"
              data-part="popup"
              style="left: 0; top: calc(100% + 8px); min-width: 0; width: 100%; padding: 4px; --sp-arrow-x: 18px"
            >
              <ul
                class="sp-nav"
                data-part="tree"
                role="tree"
                aria-labelledby="vd-tree-select-label"
                style="gap: 0; margin: 0; padding: 0; list-style: none"
              ></ul>
            </div>
          </div>
         </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Moving</span>
            <div class="sp-surface" style="padding: 2px 8px">
              <div class="sp-list-item" style="padding: 7px 4px; font-size: 12px">brief.pdf</div>
              <div class="sp-list-item" style="padding: 7px 4px; font-size: 12px">hero-shot.png</div>
              <div class="sp-list-item" style="padding: 7px 4px; font-size: 12px">notes.md</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const popup = part(root, 'popup');
  const tree = part(root, 'tree');
  const path = part(root, 'path');

  /** Which branches are open, and which single node is committed. Marketing starts open so the
   *  popup shows a branch, its children, and a sibling branch the moment it appears. */
  const open = new Set<string>(['Marketing']);
  let chosen = '';

  const rows = (nodes: Folder[], depth: number, trail: string[]): string =>
    nodes
      .map((node) => {
        const branch = !!node.children?.length;
        const expanded = branch && open.has(node.name);
        const own = [...trail, node.name];
        const head = `
          <li
            class="sp-option"
            data-part="node-${key(node.name)}"
            data-node="${node.name}"
            data-trail="${own.join(' / ')}"
            data-depth="${depth}"
            role="treeitem"
            aria-selected="${node.name === chosen}"
            ${branch ? `aria-expanded="${expanded}"` : ''}
            style="display: flex; align-items: center; gap: 6px; height: ${ROW_H}px; padding: 0 6px 0 ${6 + depth * 15}px;
                   font-size: 12px; cursor: pointer"
          >
            ${
              branch
                ? `<span data-part="twisty-${key(node.name)}" aria-hidden="true"
                     style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px; cursor: pointer"
                     >${icon('chevronRight', 'sp-icon--chevron')}</span>`
                : '<span style="flex: 0 0 auto; width: 16px"></span>'
            }
            <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${node.name}</span>
            ${branch ? `<span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${node.children?.length}</span>` : ''}
          </li>`;
        const kids = expanded && node.children ? rows(node.children, depth + 1, own) : '';
        return head + kids;
      })
      .join('');

  const render = () => {
    tree.innerHTML = rows(TREE, 0, []);
  };

  const setOpen = (isOpen: boolean) => {
    flag(popup, 'data-open', isOpen);
    field.setAttribute('aria-expanded', String(isOpen));
  };

  const commit = (row: HTMLElement) => {
    chosen = row.dataset.node ?? '';
    const trail = row.dataset.trail ?? '';
    path.dataset.depth = String(trail.split(' / ').length);
    path.dataset.value = key(chosen);
    path.textContent = trail;
    path.style.color = 'var(--sp-ink)';
    render();
    setOpen(false);
  };

  // One delegated listener for both gestures the tree answers: the twisty expands, the row
  // selects. Keeping them apart is what makes a collapsed parent a valid value.
  tree.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const row = target?.closest<HTMLElement>('[data-node]');
    if (!row) return;
    if (target?.closest('[data-part^="twisty-"]')) {
      const name = row.dataset.node ?? '';
      if (open.has(name)) open.delete(name);
      else open.add(name);
      render();
      return;
    }
    commit(row);
  });

  // The field only ever opens; the popup is dismissed by committing a node or pressing away.
  field.addEventListener('click', () => setOpen(true));
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!popup.contains(target) && !field.contains(target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  render();
}
