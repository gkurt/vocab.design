import { flag, part } from '#src/kit/parts.ts';

type Node = { key: string; role: string; name: string; state: string; target: string };

/** One row per node the browser derives, in tree order, with its state at the end. */
const NODES: Node[] = [
  { key: 'heading', role: 'heading', name: 'Notifications', state: 'level 2', target: 'ui-heading' },
  { key: 'checkbox', role: 'checkbox', name: 'Email digest', state: 'not checked', target: 'ui-checkbox' },
  { key: 'button', role: 'button', name: 'Save changes', state: '', target: 'ui-save' },
];

const CHECKED_STATE = 'checked';
const LINK_OUTLINE = '2px dashed var(--sp-accent)';

function row({ key, role, name, state, target }: Node): string {
  return `
    <button class="sp-menu-item" type="button" data-part="node-${key}" data-target="${target}"
            data-state="${key === 'checkbox' ? 'unchecked' : key}" style="padding-left: 18px; gap: 6px">
      <span style="color: var(--sp-accent); font-weight: 600">${role}</span>
      <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">“${name}”</span>
      <span class="sp-text" data-part="state-${key}"
            style="flex: 0 0 auto; width: 66px; text-align: right; font-size: 11px">${state}</span>
    </button>`;
}

/**
 * Accessibility tree specimen: a small settings card beside the tree a browser derives from
 * it, one row per node, each row printing the role, the name, and the state. Checking the box
 * changes no markup the reader can see and changes the row, which is the point: the state is
 * in the tree whether or not the paint moved. Picking a row draws a line back to the element
 * that produced it.
 *
 * The subject is the tree panel rather than the whole scene. The card is what the tree is
 * derived from, not what the term names, so it stays scenery (SPEC §5) and the panel keeps
 * its own title, since a tree with no label is a list. The card used to close with a line
 * saying that in the site's voice ("The card is what the tree is derived from. Its wrappers
 * and its spacing produce no nodes at all."), which a settings card would never print; the
 * article carries it, so the card now ends at Save changes.
 *
 * The state column holds a fixed width from mount and the rows never change height, so a node
 * changing state cannot move the tree under it (SPEC §5). Checking is one way inside a pass:
 * the box reaches checked rather than flipping whatever it found, so a run joined halfway
 * still ends in the same state (SPEC §8). The link a row draws is an outline, which takes no
 * room, and it is drawn on the scenery element, never on the subject.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: stretch; gap: 14px">
        <div class="sp-window sp-context" style="width: 206px; padding: 12px 14px">
          <span class="sp-label">The page</span>
          <h2 class="sp-heading" data-part="ui-heading" style="margin: 8px 0 0; font-size: 14px">Notifications</h2>
          <div class="sp-row" style="margin-top: 12px; gap: 10px">
            <button class="sp-checkbox" type="button" data-part="ui-checkbox" role="checkbox" aria-checked="false"
                    aria-labelledby="vd-at-digest"></button>
            <span class="sp-text sp-text--ink" id="vd-at-digest" style="font-size: 13px">Email digest</span>
          </div>
          <div class="sp-row" style="margin-top: 14px">
            <button class="sp-button sp-button--sm" type="button" data-part="ui-save">Save changes</button>
          </div>
        </div>
        <div class="sp-window" data-part="tree" data-subject style="width: 268px; padding: 12px 14px">
          <span class="sp-label">Accessibility tree</span>
          <div class="sp-stack" style="margin-top: 8px; gap: 2px">
            <div class="sp-text sp-text--ink" style="padding: 6px 8px; font-size: 13px; font-weight: 600">document</div>
            ${NODES.map(row).join('')}
          </div>
          <p class="sp-text" data-stage-verdict data-part="hint" style="margin: 10px 0 0; height: 32px; font-size: 11px">
            Role, name, state. Pick a node to see the element it came from.
          </p>
        </div>
      </div>
    </div>
  `;

  const box = part(root, 'ui-checkbox');
  const checkboxState = part(root, 'state-checkbox');
  const rows = NODES.map((node) => part(root, `node-${node.key}`));

  const linkTo = (target: string) => {
    for (const node of NODES) {
      const el = part(root, node.target);
      const on = node.target === target;
      flag(el, 'data-linked', on);
      el.style.outline = on ? LINK_OUTLINE : '';
      el.style.outlineOffset = on ? '3px' : '';
    }
    for (const el of rows) flag(el, 'data-active', el.dataset.target === target);
  };

  for (const el of rows) el.addEventListener('click', () => linkTo(el.dataset.target ?? ''));

  // Checking reaches its own state rather than flipping the one it found (SPEC §8); the
  // row is what the reader's software would have heard change.
  box.addEventListener('click', () => {
    box.setAttribute('aria-checked', 'true');
    checkboxState.textContent = CHECKED_STATE;
    part(root, 'node-checkbox').dataset.state = 'checked';
  });
}
