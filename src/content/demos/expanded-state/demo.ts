import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Expanded state specimen: a disclosure and a menu button side by side, each printing the
 * `aria-expanded` value it is actually carrying. The two surfaces open and close
 * independently, and the printed value is read back off the trigger rather than tracked
 * beside it, so the specimen cannot claim a state the markup does not hold.
 *
 * The subject is the disclosure trigger, the narrowest element the term names: the state
 * belongs to the control, which is the whole point the pair is making. It says something
 * true in both of its resting states, open and closed, so no `data-pose` is needed. The menu
 * button, the panel, the surfaces, and the caption are scenery (SPEC §5).
 *
 * Two lines of the site's own commentary have been taken out of the frame: a heading over the
 * pair reading "The state is on the control, not on what it reveals", and a line inside the
 * shipping panel reading "The panel carries no state of its own." Neither is anything a
 * checkout would print, and the article makes both points at length. What is left in the frame
 * is the two triggers and the `aria-expanded` value each is really carrying.
 *
 * This is the one place a toggling trigger is right, because the flip is the term (SPEC §8):
 * the script drives both directions itself. Every claim is made on the trigger, never on
 * something inside a surface the click has just closed. The panel and the menu are drawn into
 * room reserved from mount, so opening either moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row" style="gap: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trigger-disclosure"
                    data-subject aria-expanded="true" aria-controls="details"
                    style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%">
              <span>Shipping details</span>
              ${icon('chevronRight', 'sp-icon--chevron')}
            </button>
            <span class="sp-label" data-part="val-disclosure" data-value="false"
                  style="font-size: 10px; white-space: nowrap">aria-expanded="false"</span>

            <div style="position: relative; height: 104px">
              <div class="sp-surface sp-context" data-part="panel" id="details"
                   style="position: absolute; inset: 0; padding: 8px 10px; opacity: 0; visibility: hidden;
                          transition: opacity 0.18s, visibility 0.18s">
                <p class="sp-text" style="margin: 0; font-size: 11px">Standard delivery, 2 to 4 working days.</p>
                <p class="sp-text" style="margin: 6px 0 0; font-size: 11px">Free over 40 pounds.</p>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trigger-menu"
                    aria-expanded="false" aria-haspopup="menu"
                    style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%">
              <span>Actions</span>
              ${icon('chevronRight', 'sp-icon--chevron')}
            </button>
            <span class="sp-label" data-part="val-menu" data-value="false"
                  style="font-size: 10px; white-space: nowrap">aria-expanded="false"</span>

            <div style="position: relative; height: 104px">
              <div class="sp-menu" data-part="menu" role="menu" style="left: 0; right: 0; top: 0">
                <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-rename">Rename</button>
                <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-duplicate">Duplicate</button>
                <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-archive">Archive</button>
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 34px; font-size: 11px">
          Two controls, two surfaces, two independent states. A reader hears the state as part of the button, before pressing it.
        </p>
      </div>
    </div>
  `;

  const disclosure = part(root, 'trigger-disclosure');
  const menuTrigger = part(root, 'trigger-menu');
  const panel = part(root, 'panel');
  const menu = part(root, 'menu');

  // Read back from the attribute rather than from a variable beside it: the printed value
  // is then a report on the markup, not a second copy of the state that could drift.
  const publish = (trigger: HTMLElement, readout: string) => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    const line = part(root, readout);
    line.dataset.value = String(open);
    line.textContent = `aria-expanded="${open}"`;
  };

  const setDisclosure = (open: boolean) => {
    disclosure.setAttribute('aria-expanded', String(open));
    panel.style.opacity = open ? '1' : '0';
    panel.style.visibility = open ? 'visible' : 'hidden';
    publish(disclosure, 'val-disclosure');
  };

  const setMenu = (open: boolean) => {
    menuTrigger.setAttribute('aria-expanded', String(open));
    flag(menuTrigger, 'data-open', open);
    flag(menu, 'data-open', open);
    publish(menuTrigger, 'val-menu');
  };

  // The specimen rests with one surface open and one closed, so both values of the attribute
  // are on screen at once and neither box is empty while nothing is happening.
  setDisclosure(true);
  setMenu(false);

  // A toggling trigger, which is legal here because the flip is the term (SPEC §8).
  disclosure.addEventListener('click', () => setDisclosure(disclosure.getAttribute('aria-expanded') !== 'true'));
  menuTrigger.addEventListener('click', () => setMenu(menuTrigger.getAttribute('aria-expanded') !== 'true'));

  // Choosing a command is the menu's own dismissal, the way a real one behaves.
  for (const item of ['menu-rename', 'menu-duplicate', 'menu-archive']) {
    part(root, item).addEventListener('click', () => setMenu(false));
  }
}
