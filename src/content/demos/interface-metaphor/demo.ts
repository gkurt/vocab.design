import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Where = 'inbox' | 'archive' | 'trash';

const PATH: Record<Where, string> = {
  inbox: '/inbox/notes.txt',
  archive: '/archive/notes.txt',
  trash: '/trash/notes.txt',
};

const MOVES: { key: Where; part: string; label: string }[] = [
  { key: 'inbox', part: 'to-inbox', label: 'Move to /inbox' },
  { key: 'archive', part: 'to-archive', label: 'Move to /archive' },
  { key: 'trash', part: 'to-trash', label: 'Move to /trash' },
];

/**
 * Interface metaphor specimen: one file in one place, drawn twice. The desk borrows a
 * situation the reader already knows (a page, a folder with a tab, a can you can fish
 * things back out of) and the list beside it names the same operation in the system's
 * own words. Both renderings read and write the same state, so dragging the page into
 * the folder moves the path, and picking a path moves the page: the metaphor is the
 * model borrowed, not decoration laid over it.
 *
 * The subject is the desk scene, the narrowest element the term names. The literal list
 * is what the metaphor is being compared against, so it is scenery (SPEC §5). No
 * `data-pose`: every state the desk reaches is still a borrowed situation standing in
 * for a file operation.
 *
 * A line under the desk used to say where the page had got to ("The page is out on the desk.",
 * and so on) and the title bar carried "One file, two renderings". Both were the site reading
 * the scene out: the path beside the file already prints where it is, and the two columns are
 * now labelled for what they are, "Desk" and "File system".
 *
 * The page keeps its slot when it leaves the desk and the folder and can hold the room
 * their contents will take, so a move changes what is drawn and never the geometry
 * (SPEC §5). The list's three destinations are absolute picks rather than a toggle, and
 * the pass returns to the inbox the specimen mounts in (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const moves = MOVES.map(
    (move) => `
      <button class="sp-button sp-button--ghost sp-button--sm" data-part="${move.part}" type="button" style="width: 100%; text-align: left">
        ${move.label}
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Files</span>
        </div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 10px">

          <div style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: 212px">
            <span class="sp-label sp-context" style="height: 16px; font-size: 11px">Desk</span>
            <div
              class="sp-surface"
              data-part="desk"
              data-subject
              data-where="inbox"
              style="display: flex; align-items: center; justify-content: space-between; gap: 8px; height: 122px; padding: 10px"
            >
              <div style="position: relative; flex: 0 0 auto; width: 50px; height: 64px">
                <div
                  data-part="page"
                  style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 7px 6px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 4px; box-shadow: var(--sp-shadow); cursor: grab; touch-action: none"
                >
                  <span class="sp-line" style="height: 5px"></span>
                  <span class="sp-line" style="height: 5px; width: 80%"></span>
                  <span class="sp-line" style="height: 5px; width: 60%"></span>
                  <span class="sp-label" style="margin-top: auto; font-size: 10px">Notes</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 0 0 auto; width: 62px">
                <div data-part="folder" style="position: relative; width: 58px; height: 46px">
                  <span style="position: absolute; left: 0; top: 0; width: 24px; height: 9px; border-radius: 3px 3px 0 0; background: var(--sp-accent)"></span>
                  <span
                    data-part="folder-page"
                    style="position: absolute; left: 13px; top: -7px; width: 32px; height: 24px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 2px; visibility: hidden"
                  ></span>
                  <span style="position: absolute; left: 0; right: 0; top: 8px; bottom: 0; border: 1px solid var(--sp-accent); border-radius: 0 4px 4px 4px; background: var(--sp-accent-soft)"></span>
                </div>
                <span class="sp-label" style="font-size: 11px">Archive</span>
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 0 0 auto; width: 52px">
                <div data-part="trash" style="position: relative; display: flex; align-items: flex-end; justify-content: center; width: 48px; height: 46px">
                  <span
                    data-part="trash-page"
                    style="position: absolute; left: 12px; top: 0; width: 24px; height: 16px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 2px; visibility: hidden"
                  ></span>
                  <span style="display: flex; margin-bottom: 4px; transform: scale(1.8); transform-origin: bottom center">${icon('trash')}</span>
                </div>
                <span class="sp-label" style="font-size: 11px">Trash</span>
              </div>
            </div>
          </div>

          <div class="sp-context" style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0">
            <span class="sp-label" style="height: 16px; font-size: 11px">File system</span>
            <div class="sp-surface" data-part="readout" data-where="inbox" style="display: flex; flex-direction: column; gap: 6px; padding: 8px 10px">
              <div class="sp-row" style="gap: 6px">
                ${icon('copy')}
                <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">notes.txt</span>
              </div>
              <span class="sp-text" data-part="path-text" style="height: 16px; font-size: 11px">${PATH.inbox}</span>
              <span class="sp-divider"></span>
              <div class="sp-stack" style="gap: 5px">${moves}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  const desk = part(root, 'desk');
  const page = part(root, 'page');
  const folder = part(root, 'folder');
  const trash = part(root, 'trash');
  const folderPage = part(root, 'folder-page');
  const trashPage = part(root, 'trash-page');
  const readout = part(root, 'readout');
  const pathText = part(root, 'path-text');
  const buttons = MOVES.map((move) => ({ key: move.key, el: part(root, move.part) }));

  let carrying = false;

  const show = (where: Where) => {
    desk.dataset.where = where;
    readout.dataset.where = where;
    page.style.visibility = where === 'inbox' ? 'visible' : 'hidden';
    folderPage.style.visibility = where === 'archive' ? 'visible' : 'hidden';
    trashPage.style.visibility = where === 'trash' ? 'visible' : 'hidden';
    pathText.textContent = PATH[where];
    for (const button of buttons) flag(button.el, 'data-selected', button.key === where);
  };

  const over = (el: HTMLElement, x: number, y: number) => {
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  /** The target saying let go now. Outline only, so a highlight cannot move the scene. */
  const aim = (el: HTMLElement, on: boolean) => {
    flag(el, 'data-over', on);
    el.style.outline = on ? '2px solid var(--sp-accent)' : '';
    el.style.outlineOffset = '3px';
  };

  page.addEventListener('pointerdown', (event) => {
    if (desk.dataset.where !== 'inbox') return;
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) page.setPointerCapture(event.pointerId);
    carrying = true;
  });

  root.addEventListener('pointermove', (event) => {
    if (!carrying) return;
    aim(folder, over(folder, event.clientX, event.clientY));
    aim(trash, over(trash, event.clientX, event.clientY));
  });

  const release = (event: PointerEvent) => {
    if (!carrying) return;
    carrying = false;
    const onFolder = over(folder, event.clientX, event.clientY);
    const onTrash = over(trash, event.clientX, event.clientY);
    aim(folder, false);
    aim(trash, false);
    // Let go anywhere else and the page stays on the desk, exactly as a real one would.
    if (onFolder) show('archive');
    else if (onTrash) show('trash');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  for (const button of buttons) button.el.addEventListener('click', () => show(button.key));

  show('inbox');
}
