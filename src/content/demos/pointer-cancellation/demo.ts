import { part } from '#src/kit/parts.ts';

type Entry = { key: string; text: string };

const START: Entry = { key: 'none', text: 'Nothing has been pressed yet.' };

/**
 * Pointer cancellation specimen: two identical looking Delete buttons, one wired to `pointerdown`
 * and one to `pointerup`, with a log strip recording what each gesture actually did. Pressing the
 * release-event button and letting go on it deletes the draft; pressing it and sliding off before
 * release does nothing at all, while the press-event button has already acted by the time the
 * pointer moves.
 *
 * The subject is the release-event button, the narrowest element the term names: the criterion is
 * a property of the control, not of the scene. The press-event panel, the release area, the log
 * strip and the caption are scenery (SPEC §5). The button is honestly the term at every resting
 * state, fired or idle, so it needs no `data-pose`.
 *
 * Both buttons answer pointer events rather than `click`, which is the whole subject matter, and
 * neither synthesizes any event of its own: the release is judged by asking whether the pointer
 * let go inside the button's own box, because a drag's `pointerup` is dispatched on the element
 * the press started from (SPEC §8). The log holds two lines whether or not it has two entries, so
 * nothing moves as it fills (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 20px">
          <span class="sp-label" style="flex: 0 0 auto">Two Delete buttons, one difference: when they act</span>
          <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="reset"
                  style="font-size: 11px; padding: 2px 8px; color: var(--sp-muted)">Reset</button>
        </div>

        <div class="sp-row" style="margin-top: 8px; gap: 10px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="panel-down"
               style="flex: 1 1 0; min-width: 0; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Acts on press</span>
            <button class="sp-button sp-button--sm" type="button" data-part="down-btn"
                    style="justify-content: center; font-size: 11.5px">Delete draft</button>
            <span class="sp-text" data-part="state-down" data-state="idle" style="font-size: 10.5px">Draft intact</span>
          </div>

          <div class="sp-surface" data-part="panel-up"
               style="flex: 1 1 0; min-width: 0; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px">
            <span class="sp-label sp-context" style="font-size: 9.5px">Acts on release</span>
            <button class="sp-button sp-button--sm" type="button" data-part="up-btn" data-subject
                    style="justify-content: center; font-size: 11.5px">Delete draft</button>
            <span class="sp-text sp-context" data-part="state-up" data-state="idle" style="font-size: 10.5px">Draft intact</span>
          </div>
        </div>

        <div class="sp-surface sp-context" data-part="away"
             style="margin-top: 8px; height: 30px; display: flex; align-items: center; justify-content: center;
                    border-style: dashed; background: var(--sp-sunken)">
          <span class="sp-label" style="font-size: 10.5px">Slide off the button and let go in here</span>
        </div>

        <div class="sp-surface sp-context" data-part="log" data-last="none"
             style="margin-top: 8px; height: 44px; padding: 6px 10px; display: flex; flex-direction: column;
                    justify-content: center; gap: 3px; background: var(--sp-sunken)">
          <span class="sp-text" data-part="log-1" style="min-height: 14px; font-size: 10.5px">${START.text}</span>
          <span class="sp-text sp-text--ink" data-part="log-2" style="min-height: 14px; font-size: 10.5px"></span>
        </div>

        <p class="sp-text sp-context" style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">
          Landing on the wrong control is recoverable only while nothing has happened yet. Acting on press spends the
          recovery before the reader knows they need it.
        </p>
      </div>
    </div>
  `;

  const downBtn = part(root, 'down-btn');
  const upBtn = part(root, 'up-btn');
  const stateDown = part(root, 'state-down');
  const stateUp = part(root, 'state-up');
  const log = part(root, 'log');
  const line1 = part(root, 'log-1');
  const line2 = part(root, 'log-2');
  let entries: Entry[] = [START];

  const paintLog = () => {
    const shown = entries.slice(-2);
    line1.textContent = shown.length > 1 ? (shown[0]?.text ?? '') : '';
    line2.textContent = shown.length > 1 ? (shown[1]?.text ?? '') : (shown[0]?.text ?? '');
    log.dataset.last = entries[entries.length - 1]?.key ?? 'none';
  };

  const record = (key: string, text: string) => {
    entries = [...entries, { key, text }];
    paintLog();
  };

  const setState = (el: HTMLElement, fired: boolean) => {
    el.dataset.state = fired ? 'fired' : 'idle';
    el.textContent = fired ? 'Draft deleted' : 'Draft intact';
  };

  const inside = (el: HTMLElement, event: PointerEvent) => {
    const box = el.getBoundingClientRect();
    return event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  };

  paintLog();

  downBtn.addEventListener('pointerdown', () => {
    setState(stateDown, true);
    record('down-fired', 'Press button: deleted the draft the moment it was pressed.');
  });

  downBtn.addEventListener('pointerup', (event) => {
    if (inside(downBtn, event)) return;
    record('down-late', 'Press button: let go somewhere else, which is far too late.');
  });

  let held = false;
  upBtn.addEventListener('pointerdown', () => {
    held = true;
  });

  upBtn.addEventListener('pointerup', (event) => {
    if (!held) return;
    held = false;
    if (inside(upBtn, event)) {
      setState(stateUp, true);
      record('up-fired', 'Release button: let go on the control, so it acted.');
      return;
    }
    record('up-cancelled', 'Release button: let go off the control, so nothing happened.');
  });

  // A real pointer that leaves the button before letting go sends its release to whatever it is
  // over instead, so the cancellation is recorded here as well as on the button itself.
  root.addEventListener('pointerup', () => {
    if (!held) return;
    held = false;
    record('up-cancelled', 'Release button: let go off the control, so nothing happened.');
  });

  part(root, 'reset').addEventListener('click', () => {
    held = false;
    entries = [START];
    setState(stateDown, false);
    setState(stateUp, false);
    paintLog();
  });
}
