import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const UNREAD = '3';

const entry = (name: string, mark: string, title: string, meta: string, age: string) => `
  <div class="sp-list-item" data-part="${name}" style="gap: 9px; padding: 5px 8px; align-items: center">
    <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">${mark}</span>
    <span class="sp-grow" style="display: flex; flex-direction: column; gap: 1px">
      <span style="font-size: 12.5px; font-weight: 500">${title}</span>
      <span class="sp-label" style="font-size: 11px">${meta}</span>
    </span>
    <span class="sp-label" data-part="${name}-age" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${age}</span>
  </div>`;

const member = (text: string, age: string) => `
  <span class="sp-label" style="display: flex; gap: 8px; font-size: 11px; line-height: 12px">
    <span class="sp-grow">${text}</span>
    <span style="flex: 0 0 auto">${age}</span>
  </span>`;

/**
 * Notification center specimen: the tray behind the bell, holding two single entries and
 * one grouped one, each carrying a relative timestamp. The group header expands to show
 * its members, "Clear all" empties the tray to a written empty state, and undoing the
 * clear brings the record back.
 *
 * The subject is the tray itself, the panel that collects the entries: the term names the
 * durable record rather than any one notification in it, and it is honestly that record
 * whether it is holding three entries or reporting that it holds none, so no `data-pose`
 * condition is needed. The window chrome, the app name and the bell with its unread count
 * are scenery outside it.
 *
 * Neither control toggles (SPEC §8): the header only ever expands, and clearing and undoing
 * are two separate buttons, so a pass picked up anywhere lands the same way. The members
 * open into room reserved from mount and the empty state is drawn over the list rather than
 * in place of it, so the tray keeps its height through every state (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour workspace</span>
          <span style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px" data-part="bell" data-unread="${UNREAD}">
            ${icon('bell')}
            <span
              data-part="badge"
              style="position: absolute; top: 1px; right: 0; min-width: 14px; height: 14px; padding: 0 3px; border-radius: 999px;
                     background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 9px; font-weight: 600; line-height: 14px; text-align: center"
            >${UNREAD}</span>
          </span>
        </div>

        <div class="sp-body" style="padding: 8px">
          <div class="sp-surface" data-part="tray" data-subject style="display: flex; flex-direction: column; height: 100%; overflow: hidden">
            <div class="sp-row" style="gap: 8px; padding: 7px 8px 7px 12px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-heading sp-grow" style="font-size: 13px">Notifications</span>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="clear"
                style="padding: 3px 9px; font-size: 12px"
              >Clear all</button>
            </div>

            <div style="position: relative; flex: 1 1 auto; min-height: 0">
              <div
                data-part="list"
                style="position: absolute; inset: 0; padding: 4px 6px; transition: opacity 0.2s, visibility 0.2s"
              >
                ${entry('row-deploy', 'WA', 'Deploy finished', 'web-app · production', '4 min ago')}
                ${entry('row-mention', 'PJ', 'Priya mentioned you', 'Design review', '22 min ago')}

                <button
                  class="sp-list-item"
                  type="button"
                  data-part="group"
                  aria-expanded="false"
                  aria-controls="vd-nc-members"
                  style="width: 100%; gap: 9px; padding: 6px 8px; align-items: center; border: 0; background: transparent;
                         color: inherit; font: inherit; text-align: left; cursor: pointer"
                >
                  <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">BI</span>
                  <span class="sp-grow" style="display: flex; flex-direction: column; gap: 1px">
                    <span style="font-size: 12.5px; font-weight: 500">Billing</span>
                    <span class="sp-label" style="font-size: 11px">3 receipts</span>
                  </span>
                  <span class="sp-label" data-part="group-age" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">1 hr ago</span>
                  ${icon('chevronRight', 'sp-icon--chevron')}
                </button>

                <div
                  data-part="members"
                  id="vd-nc-members"
                  style="display: flex; flex-direction: column; gap: 1px; height: 40px; padding: 2px 12px 0 41px;
                         opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"
                >
                  ${member('Invoice 4821 paid', '1 hr ago')}
                  ${member('Invoice 4822 paid', '1 hr ago')}
                  ${member('Card ending 4417 expires soon', '3 hr ago')}
                </div>
              </div>

              <div
                class="sp-empty"
                data-part="empty"
                style="position: absolute; inset: 0; gap: 6px; padding: 12px; opacity: 0; visibility: hidden;
                       transition: opacity 0.2s, visibility 0.2s"
              >
                <span class="sp-empty-mark">${icon('bell')}</span>
                <span class="sp-text sp-text--ink" style="font-size: 13px">You are all caught up</span>
                <span class="sp-label" style="font-size: 11px">Cleared items stay in Archive for 30 days</span>
                <button
                  class="sp-button sp-button--ghost sp-button--sm"
                  type="button"
                  data-part="restore"
                  style="margin-top: 2px; padding: 3px 9px; font-size: 12px"
                >Undo clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const empty = part(root, 'empty');
  const group = part(root, 'group');
  const members = part(root, 'members');
  const bell = part(root, 'bell');
  const badge = part(root, 'badge');

  const setExpanded = (open: boolean) => {
    // The chevron turns off `aria-expanded` through the kit's own rule, which is the
    // mechanism rather than a transform this demo invented.
    group.setAttribute('aria-expanded', String(open));
    members.style.opacity = open ? '1' : '0';
    members.style.visibility = open ? 'visible' : 'hidden';
  };

  const setCleared = (cleared: boolean) => {
    list.style.opacity = cleared ? '0' : '1';
    list.style.visibility = cleared ? 'hidden' : 'visible';
    empty.style.opacity = cleared ? '1' : '0';
    empty.style.visibility = cleared ? 'visible' : 'hidden';
    // The count means unseen items, so clearing the record clears the count with it.
    bell.dataset.unread = cleared ? '0' : UNREAD;
    badge.style.visibility = cleared ? 'hidden' : 'visible';
    if (cleared) setExpanded(false);
  };

  // Reaching a state, never flipping one: the header expands and stays expanded, and
  // dismissal is the explicit Clear all beside it (SPEC §8).
  group.addEventListener('click', () => setExpanded(true));
  part(root, 'clear').addEventListener('click', () => setCleared(true));
  part(root, 'restore').addEventListener('click', () => setCleared(false));

  setExpanded(false);
  setCleared(false);
}
