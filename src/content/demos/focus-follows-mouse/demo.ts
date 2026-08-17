import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PANES = [
  { key: 'notes', title: 'Notes', hint: 'type a line' },
  { key: 'terminal', title: 'Terminal', hint: 'type a command' },
];

const paneMarkup = (key: string, title: string, hint: string, subject: boolean) => `
  <div
    class="sp-surface"
    data-part="pane-${key}"
    ${subject ? 'data-subject data-pose="[data-sim-focus]"' : ''}
    ${key === 'notes' ? 'data-sim-focus' : ''}
    style="display: flex; flex-direction: column; gap: 8px; width: 204px; height: 138px; padding: 10px 12px"
  >
    <span class="sp-heading" style="font-size: 13px">${title}</span>
    <div class="sp-stack" style="gap: 6px">
      <span class="sp-line" style="width: 84%"></span>
      <span class="sp-line" style="width: 62%"></span>
    </div>
    <span class="sp-grow"></span>
    <input class="sp-input" data-part="field-${key}" type="text" placeholder="${hint}" />
  </div>`;

/**
 * Focus follows mouse specimen: two windows side by side and one setting that decides which of
 * them the keyboard is talking to. Under click to focus, pointing at a window does nothing and
 * a click is what claims it. Under focus follows mouse, arriving is enough, and the characters
 * that follow land wherever the pointer happens to be.
 *
 * The subject is the Notes window: the term names the window that receives keyboard input, not
 * the pair and not the desktop around them. The second window is a peer rather than scenery,
 * because a focus model can only be shown by the ring moving off one window and onto another,
 * and dimming the destination would dim half the demonstration. The setting, the readouts and
 * the caption are the instrumentation, and those carry the context register.
 *
 * Nothing here ever calls `focus()`. Attract must never move real focus (SPEC §7), so the ring
 * is the kit's `data-sim-focus`, and the scripted typing is dispatched at whichever field the
 * ghost cursor is over, which is exactly the claim the term makes. A reader who takes the stage
 * over gets the browser's own focus behaviour, because the browser is click to focus and this
 * specimen is not allowed to argue with it.
 *
 * The variant drawn here is the forgiving one: focus stays with the last window entered rather
 * than evaporating when the pointer strays between them, which is what most desktops ship.
 *
 * Both windows hold their size and the ring is an outline, so focus changing moves nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desktop</span>
          <span class="sp-text" data-part="readout" style="width: 350px; text-align: right; white-space: nowrap">A click is what claims the keyboard</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label">Focus model</span>
            <sp-segmented class="sp-segmented" data-part="mode" data-value="click">
              <button class="sp-segment" type="button" data-part="mode-click" value="click" style="padding: 5px 12px">Click to focus</button>
              <button class="sp-segment" type="button" data-part="mode-follow" value="follow" style="padding: 5px 12px">Focus follows mouse</button>
            </sp-segmented>
          </div>

          <div class="sp-row" data-part="desk" data-mode="click" data-last="none" style="gap: 12px; align-items: flex-start">
            ${PANES.map(({ key, title, hint }) => paneMarkup(key, title, hint, key === 'notes')).join('')}
          </div>

          <span class="sp-label sp-context" data-part="caption">Keystrokes go to the window with the ring, and nowhere else.</span>
        </div>
      </div>
    </div>
  `;

  const desk = part(root, 'desk');
  const readout = part(root, 'readout');
  const mode = part(root, 'mode') as HTMLElement & { value: string };

  let focused = 'notes';

  const give = (key: string, how: string) => {
    focused = key;
    for (const window of PANES) flag(part(root, `pane-${window.key}`), 'data-sim-focus', window.key === key);
    const title = PANES.find((window) => window.key === key)?.title ?? '';
    readout.textContent = `${title} has the keyboard, ${how}`;
  };

  for (const { key, title } of PANES) {
    const box = part(root, `pane-${key}`);

    // Bubbling, not `pointerenter`: the pointer arrives at a field inside the window as often
    // as at the window itself, and under this model both mean the same thing.
    box.addEventListener('pointerover', () => {
      if (desk.dataset.mode !== 'follow' || focused === key) return;
      give(key, 'claimed by arriving');
    });

    box.addEventListener('click', () => {
      if (desk.dataset.mode !== 'click' || focused === key) return;
      give(key, 'claimed by a click');
    });

    part(root, `field-${key}`).addEventListener('input', () => {
      desk.dataset.last = key;
      readout.textContent = `Typed into ${title}, the window the pointer was over`;
    });
  }

  mode.addEventListener('change', () => {
    const follow = mode.value === 'follow';
    desk.dataset.mode = follow ? 'follow' : 'click';
    readout.textContent = follow ? 'Pointing at a window is enough to claim it' : 'A click is what claims the keyboard';
  });
}
