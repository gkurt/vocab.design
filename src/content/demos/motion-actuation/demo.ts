import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'ok' | 'motion';

const NOTE = {
  edited: 'Milk, bread',
  restored: 'Milk, bread, coffee',
} as const;

const SETTING = {
  ok: 'Off here and the shake stops firing. Undo stays on the toolbar.',
  motion: 'No setting. A tremor fires it and nothing turns it off.',
} as const satisfies Record<Mode, string>;

const CAPTION = {
  ok: 'Both halves of the rule: the same undo sits on the toolbar, and the shake can be switched off.',
  motion: 'The toolbar button is gone and the setting with it, so a shake is the only route to an undo.',
} as const satisfies Record<Mode, string>;

/**
 * Motion actuation specimen: a note editor whose undo is also wired to a shake of the device. The
 * shake is a declared capability, stated in words and switchable, and never performed here: device
 * motion is a sensor condition rather than a pointer or a key, so it belongs to the environment
 * carve-out (SPEC §8) and this specimen has no need to stage it at all. The two segments pick a
 * CONFIGURATION, which is a setting rather than an input, so nothing here impersonates a gesture. What the criterion actually requires is what the specimen demonstrates, and
 * both halves are real here: a plain control that does the same undo, and a setting that turns the
 * motion trigger off. The pick removes both, which is the failing configuration.
 *
 * The subject is the plain-control alternative, the Undo button itself, because 2.5.4 is about that
 * control existing; identify summons it in the state where it has been taken away (SPEC §6). The
 * note, the toolbar's other buttons, the capability readout, the off switch, the picker and the
 * caption are scenery (SPEC §5). The button is only ever itself, so no `data-pose` is needed.
 *
 * The button keeps its room while hidden and every readout sits in a fixed box, so a pick moves
 * nothing (SPEC §5). No timers: each state is reached by a press.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Notes, undo also on a shake</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="ok" data-axis="Input" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-ok" value="ok"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Control and switch</button>
            <button class="sp-segment" type="button" data-part="seg-motion" value="motion"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Motion only</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-frame" data-part="editor" style="flex: 0 0 auto; width: 196px; height: 164px">
            <div class="sp-topbar sp-context" style="padding: 6px 10px; gap: 6px">
              <span class="sp-label" style="font-size: 11px">Notes</span>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 5px; padding: 9px 10px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">Groceries</span>
              <span class="sp-text sp-text--ink" data-part="note" data-state="edited"
                    style="height: 17px; font-size: 11.5px; line-height: 17px; white-space: nowrap">${NOTE.edited}</span>
              <span class="sp-label" data-part="source" data-by="none"
                    style="height: 14px; font-size: 10px; line-height: 14px; white-space: nowrap">Last undo: nothing yet</span>
            </div>

            <div class="sp-row sp-row--between" style="flex: 0 0 auto; gap: 8px; padding: 7px 10px 9px">
              <span class="sp-row sp-context" style="flex: 0 0 auto; gap: 4px">
                <button class="sp-icon-button" type="button" data-part="edit" aria-label="Edit"
                        style="width: 26px; height: 26px">${icon('pencil')}</button>
                <button class="sp-icon-button" type="button" data-part="share" aria-label="Share"
                        style="width: 26px; height: 26px">${icon('share')}</button>
              </span>
              <button class="sp-button sp-button--sm" type="button" data-part="undo" data-subject
                      style="flex: 0 0 auto; white-space: nowrap; font-size: 11.5px;
                             transition: opacity 0.2s, visibility 0.2s">Undo</button>
            </div>
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <div class="sp-surface sp-context" style="flex: 0 0 auto; height: 78px; padding: 8px 10px">
              <div class="sp-row sp-row--between" style="gap: 8px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">Motion trigger</span>
                <span class="sp-text sp-text--ink" data-part="motion" data-state="on"
                      style="flex: 0 0 auto; padding: 1px 8px; border-radius: 999px; background: var(--sp-sunken);
                             font-size: 10.5px; white-space: nowrap">Enabled</span>
              </div>
              <p class="sp-text" style="margin: 5px 0 0; font-size: 10.5px; line-height: 1.35">
                Shake the phone to undo, while the trigger is enabled. Nothing announces it.</p>
            </div>

            <div class="sp-surface sp-context" style="flex: 0 0 auto; height: 78px; padding: 8px 10px">
              <div class="sp-row sp-row--between" style="gap: 8px; height: 20px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">Off switch</span>
                <button class="sp-switch" type="button" data-part="off-switch" role="switch" aria-checked="true"
                        data-checked aria-label="Shake to undo"
                        style="flex: 0 0 auto; transition: opacity 0.2s, visibility 0.2s"></button>
              </div>
              <p class="sp-text" data-part="setting-note" data-mode="ok"
                 style="margin: 5px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${SETTING.ok}</p>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="ok"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.ok}</p>
      </div>
    </div>
  `;

  const note = part(root, 'note');
  const source = part(root, 'source');
  const undo = part(root, 'undo');
  const motion = part(root, 'motion');
  const offSwitch = part(root, 'off-switch');
  const settingNote = part(root, 'setting-note');
  const caption = part(root, 'caption');

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  const setMotion = (enabled: boolean) => {
    motion.dataset.state = enabled ? 'on' : 'off';
    motion.textContent = enabled ? 'Enabled' : 'Switched off';
    offSwitch.setAttribute('aria-checked', String(enabled));
    flag(offSwitch, 'data-checked', enabled);
  };

  undo.addEventListener('click', () => {
    note.dataset.state = 'restored';
    note.textContent = NOTE.restored;
    source.dataset.by = 'button';
    source.textContent = 'Last undo: the toolbar button';
  });

  offSwitch.addEventListener('click', () => {
    setMotion(offSwitch.getAttribute('aria-checked') !== 'true');
  });

  part(root, 'mode').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail as Mode;
    const compliant = mode === 'ok';
    // A pick is a whole configuration, so the edit and the trigger both return to their start state.
    show(undo, compliant);
    show(offSwitch, compliant);
    setMotion(true);
    settingNote.dataset.mode = mode;
    settingNote.textContent = SETTING[mode];
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
    note.dataset.state = 'edited';
    note.textContent = NOTE.edited;
    source.dataset.by = 'none';
    source.textContent = 'Last undo: nothing yet';
  });
}
