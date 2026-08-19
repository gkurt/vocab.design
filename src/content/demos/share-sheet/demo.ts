import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Target = { key: string; label: string; glyph: IconName; sent: string };
type Action = { key: string; label: string; glyph: IconName; done: string };

/** Destinations the system found: apps, not a list this screen chose. */
const TARGETS = [
  { key: 'mail', label: 'Mail', glyph: 'inbox', sent: 'Sent to Mail' },
  { key: 'notes', label: 'Notes', glyph: 'pencil', sent: 'Sent to Notes' },
  { key: 'diary', label: 'Diary', glyph: 'calendar', sent: 'Sent to Diary' },
  { key: 'saved', label: 'Saved', glyph: 'heart', sent: 'Sent to Saved' },
] as const satisfies readonly Target[];

/** The other half a system sheet carries: actions registered against the item type. */
const ACTIONS = [
  { key: 'copy', label: 'Copy link', glyph: 'copy', done: 'Link copied' },
  { key: 'read', label: 'Add to reading list', glyph: 'eye', done: 'Added to reading list' },
] as const satisfies readonly Action[];

const PHOTO = 'linear-gradient(150deg, #5b8def, #9b6ef3 58%, #e0554f)';

/**
 * Share sheet specimen: a note with a share control, and the panel the system raises
 * over it. The panel carries the three things a share sheet has and an action sheet
 * does not: a preview of the item being sent, a row of destinations drawn from the apps
 * on the device, and a list of registered actions under them.
 *
 * The subject is the sheet itself, `data-part="sheet"`: the term names the panel, not
 * the button that asks for it and not the screen behind it. The note, the trigger, the
 * scrim and the status line are `.sp-context`.
 *
 * The sheet is out of flow along the bottom edge and slides over the screen, so nothing
 * makes room for it (SPEC §5). The trigger only ever opens; a destination, an action,
 * Cancel, the dimmed area, and Escape are all explicit ways out (SPEC §8), and what
 * happened is reported on the status line in the screen rather than inside the panel
 * that just closed.
 */
export function mount(root: HTMLElement): void {
  const tiles = TARGETS.map(
    (target) => `
      <button
        class="sp-button sp-button--quiet"
        type="button"
        data-part="to-${target.key}"
        style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1 1 0; padding: 3px 0; border-radius: 10px"
      >
        <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;
                     border-radius: 11px; background: var(--sp-sunken); color: var(--sp-ink)">${icon(target.glyph)}</span>
        <span style="font-size: 10px">${target.label}</span>
      </button>`,
  ).join('');

  const rows = ACTIONS.map(
    (action) => `
      <button class="sp-menu-item" type="button" data-part="do-${action.key}" style="padding: 5px 8px; font-size: 12px">${icon(action.glyph)}${action.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 272px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 8px 10px">
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Field notes</span>
          <button class="sp-icon-button" type="button" data-part="share" aria-haspopup="dialog" aria-label="Share this note">${icon('share')}</button>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; padding: 10px">
          <div class="sp-stack sp-grow" style="gap: 7px">
            <span class="sp-line" style="width: 86%"></span>
            <span class="sp-line" style="width: 94%"></span>
            <span class="sp-line" style="width: 68%"></span>
          </div>
          <span class="sp-text" data-part="status" data-value="none" role="status" style="flex: 0 0 auto; height: 18px; font-size: 11px; line-height: 18px; white-space: nowrap">Nothing shared yet</span>
        </div>

        <div class="sp-scrim sp-context" data-part="scrim"></div>

        <div
          class="sp-surface"
          data-part="sheet"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Share"
          style="position: absolute; left: 0; right: 0; bottom: 0; padding: 8px; border-width: 1px 0 0;
                 border-radius: 16px 16px 0 0; box-shadow: var(--sp-shadow); transform: translateY(100%);
                 visibility: hidden; transition: transform 0.26s var(--sp-ease), visibility 0.26s"
        >
          <div class="sp-row" data-part="preview" style="gap: 9px; padding: 0 2px 2px">
            <span class="sp-swatch" style="flex: 0 0 auto; width: 40px; height: 40px; --sp-swatch: ${PHOTO}"></span>
            <span class="sp-stack sp-grow" style="gap: 1px; min-width: 0">
              <span class="sp-heading" style="font-size: 12px">Tide times, Saturday</span>
              <span class="sp-label" style="font-size: 10px">Field notes, 2 photos</span>
            </span>
          </div>

          <div class="sp-divider" style="margin: 6px 0"></div>
          <div class="sp-row" data-part="targets" style="gap: 4px">${tiles}</div>
          <div class="sp-divider" style="margin: 6px 0"></div>
          <div data-part="actions">${rows}</div>
          <div class="sp-divider" style="margin: 5px 0"></div>

          <button class="sp-menu-item" type="button" data-part="cancel" style="justify-content: center; padding: 5px 8px; font-weight: 500">Cancel</button>
        </div>
      </div>
    </div>
  `;

  const sheet = part(root, 'sheet');
  const scrim = part(root, 'scrim');
  const status = part(root, 'status');
  const trigger = part(root, 'share');

  const setOpen = (open: boolean) => {
    sheet.style.transform = open ? 'translateY(0)' : 'translateY(100%)';
    sheet.style.visibility = open ? 'visible' : 'hidden';
    flag(scrim, 'data-open', open);
  };

  const report = (key: string, message: string) => {
    status.dataset.value = key;
    status.textContent = message;
    setOpen(false);
  };

  trigger.addEventListener('click', () => setOpen(true));
  for (const target of TARGETS) part(root, `to-${target.key}`).addEventListener('click', () => report(target.key, target.sent));
  for (const action of ACTIONS) part(root, `do-${action.key}`).addEventListener('click', () => report(action.key, action.done));
  part(root, 'cancel').addEventListener('click', () => setOpen(false));

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Element | null;
    if (target && (sheet.contains(target) || trigger.contains(target))) return;
    setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  setOpen(false);
}
