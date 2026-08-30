import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** How far the pointer has to leave the trigger before the press counts as a drag. */
const MOVE_MIN = 12;

const MENU = { left: 12, top: 46, width: 172 };
/** Stated per item so the menu's height is known while authoring, not only at runtime. */
const ITEM_H = 30;

const ITEMS = [
  { key: 'newest', label: 'Newest first', value: 'Newest' },
  { key: 'oldest', label: 'Oldest first', value: 'Oldest' },
  { key: 'name', label: 'Name A to Z', value: 'Name A to Z' },
  { key: 'size', label: 'Largest first', value: 'Largest' },
];

const FILES = [
  { name: 'quarterly.pdf', meta: 'yesterday · 1.2 MB' },
  { name: 'notes.md', meta: '2 days ago · 18 KB' },
  { name: 'budget.xlsx', meta: 'last week · 640 KB' },
  { name: 'photo.heic', meta: '3 weeks ago · 4.8 MB' },
];

/** The order each sort puts the four files in, as indices into FILES. */
const ORDERS: Record<string, number[]> = {
  newest: [0, 1, 2, 3],
  oldest: [3, 2, 1, 0],
  name: [2, 1, 3, 0],
  size: [3, 0, 2, 1],
};

const items = ITEMS.map(
  ({ key, label }) => `
    <button class="sp-menu-item" type="button" data-part="item-${key}" style="line-height: 18px; white-space: nowrap">${label}</button>`,
).join('');

const rows = FILES.map(
  (_, i) => `
    <div class="sp-row" data-part="row-${i}" style="gap: 8px; height: 24px; align-items: center">
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 11px; white-space: nowrap">${FILES[i]?.name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px; white-space: nowrap">${FILES[i]?.meta}</span>
    </div>`,
).join('');

/** A coordinate for the script to stroke through, with no paint of its own (SPEC §5). */
const anchor = (name: string, x: number, y: number) =>
  `<span data-part="${name}" style="position: absolute; left: ${x - 4}px; top: ${y - 4}px; width: 8px; height: 8px; pointer-events: none"></span>`;

/**
 * Press-drag-release specimen: a sort menu that answers one continuous press. Pressing the
 * title opens the menu with the button still down, the highlight tracks whichever item the
 * pointer is over, and the release commits that item. Letting go on the title without
 * travelling leaves the menu standing instead, which is the two-click mode the term is set
 * against, and releasing away from every item abandons the gesture.
 *
 * The subject is the menu: the term names operating a menu in one gesture, so the surface
 * being tracked through is the thing the pin belongs on, not the trigger that opens it and
 * not the item that happens to win. The trigger and the file list are the scene around it,
 * in the context register. A topbar readout ("Released on the title, so the menu stays up")
 * and an echo line under the list ("The press ended where it began, so the menu waits.")
 * once narrated each outcome in the site's voice, along with a caption under the frame
 * describing the gesture. All three are gone: the article says it, and a file browser would
 * never print a running commentary on the reader's own button. What the gesture did is
 * still visible in the sort value and the reordered list. The menu is off stage at mount,
 * which identify handles by summoning it, and the script's two-click path leaves it open
 * at rest for exactly that.
 *
 * The wiring is the real gesture, so the item under the pointer is resolved by coordinate
 * against each item's box rather than by event target: once the pointer is captured every
 * move and the release are reported at the trigger, which is true of a reader's drag and of
 * the scripted one alike. Capture is mandatory or a reader's drag dies at the trigger's
 * edge, and the trusted guard with it: the player's synthetic pointers have no capture to
 * take and the call throws (SPEC §7). The release is answered on pointerup and
 * pointercancel, never on pointerleave, which does not fire while capture holds.
 *
 * A press always opens the menu from scratch rather than toggling it, so a pass resumed or
 * fast-forwarded at any point cannot press into the opposite of the term (SPEC §8). The
 * menu is absolutely positioned, so opening and closing it move nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Files</span>
        </div>
        <div
          class="sp-body"
          data-part="scene"
          data-menu="closed"
          data-mode="rest"
          data-path="none"
          data-choice="newest"
          data-swept="none"
          style="position: relative"
        >
          <button
            class="sp-button sp-button--ghost sp-button--sm"
            data-part="trigger"
            type="button"
            style="position: absolute; left: 12px; top: 12px; display: inline-flex; align-items: center; gap: 6px;
                   white-space: nowrap; touch-action: none; user-select: none"
          >
            <span style="flex: 0 0 auto">Sort</span>
            <span data-part="value" style="flex: 0 0 auto; width: 76px; text-align: left; color: var(--sp-muted)">Newest</span>
            ${icon('chevronDown')}
          </button>

          <div
            class="sp-menu"
            data-part="menu"
            data-subject
            style="left: ${MENU.left}px; top: ${MENU.top}px; width: ${MENU.width}px; transform-origin: top left"
          >${items}</div>

          ${anchor('enter-menu', MENU.left + 32, MENU.top + 4 + ITEM_H / 2)}
          ${anchor('off-menu', 100, MENU.top + 4 + ITEM_H * 4 + 26)}

          <div class="sp-surface sp-context" style="position: absolute; left: 206px; top: 12px; width: 246px; height: 146px; padding: 10px">
            <span class="sp-label" style="display: block; margin-bottom: 6px; font-size: 10px">4 files</span>
            <div class="sp-stack" data-part="list" style="gap: 2px">${rows}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const trigger = part(root, 'trigger');
  const menu = part(root, 'menu');
  const value = part(root, 'value');
  const itemEls = ITEMS.map(({ key }) => part(root, `item-${key}`));

  let origin: { x: number; y: number } | undefined;
  let travelled = false;
  let active: string | undefined;
  const swept = new Set<string>();

  const setActive = (key: string | undefined) => {
    active = key;
    for (const [i, el] of itemEls.entries()) flag(el, 'data-active', ITEMS[i]?.key === key);
  };

  const showMenu = (on: boolean) => {
    flag(menu, 'data-open', on);
    flag(trigger, 'data-selected', on);
    scene.dataset.menu = on ? 'open' : 'closed';
    if (!on) setActive(undefined);
  };

  /** Which item is under this point? Captured moves all report at the trigger, so the
      answer is geometry, exactly as it is for a real reader's drag. */
  const itemAt = (x: number, y: number) => {
    for (const [i, el] of itemEls.entries()) {
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return ITEMS[i]?.key;
    }
    return undefined;
  };

  const applyOrder = (key: string) => {
    const order = ORDERS[key] ?? ORDERS.newest;
    for (const [slot, index] of (order ?? []).entries()) {
      const file = FILES[index];
      const row = part(root, `row-${slot}`);
      const [nameEl, metaEl] = [...row.children] as HTMLElement[];
      if (nameEl && file) nameEl.textContent = file.name;
      if (metaEl && file) metaEl.textContent = file.meta;
    }
  };

  const commit = (key: string, path: 'gesture' | 'clicks') => {
    showMenu(false);
    scene.dataset.choice = key;
    scene.dataset.path = path;
    scene.dataset.mode = 'rest';
    value.textContent = ITEMS.find((it) => it.key === key)?.value ?? key;
    applyOrder(key);
  };

  trigger.addEventListener('pointerdown', (event) => {
    // A real drag has to keep reporting after the pointer leaves the trigger. Synthetic
    // pointers have no capture to take and the call throws, so the guard is mandatory.
    if (event.isTrusted) trigger.setPointerCapture(event.pointerId);
    origin = localPoint(event, root);
    travelled = false;
    swept.clear();
    // A press reaches the open state rather than flipping it, so a resumed pass can never
    // press the menu shut (SPEC §8).
    showMenu(true);
    scene.dataset.mode = 'holding';
    scene.dataset.path = 'none';
    scene.dataset.swept = 'none';
  });

  trigger.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const at = localPoint(event, root);
    if (Math.hypot(at.x - origin.x, at.y - origin.y) >= MOVE_MIN) {
      travelled = true;
      scene.dataset.mode = 'dragging';
    }
    const key = itemAt(event.clientX, event.clientY);
    setActive(key);
    if (key) {
      swept.add(key);
      scene.dataset.swept = swept.size > 1 ? 'many' : 'one';
    }
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    if (active) return commit(active, 'gesture');
    if (!travelled) {
      // Let go on the title without going anywhere: the menu is left standing, so a press
      // that turned out to be a click still ends with the items on screen.
      scene.dataset.mode = 'sticky';
      scene.dataset.path = 'sticky';
      return;
    }
    // Travelled, but let go clear of every item: the escape hatch pointer cancellation asks
    // for, and the reason a release is what commits.
    showMenu(false);
    scene.dataset.mode = 'rest';
    scene.dataset.path = 'cancelled';
  };

  trigger.addEventListener('pointerup', release);
  trigger.addEventListener('pointercancel', release);

  for (const [i, el] of itemEls.entries()) {
    const key = ITEMS[i]?.key;
    if (key) el.addEventListener('click', () => commit(key, 'clicks'));
  }
}
