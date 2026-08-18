import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const DESK = { w: 434, h: 132 };

/**
 * Click-through specimen: two overlapping windows and one setting that decides what the first
 * click on the one behind is allowed to do. With click-through off that click is spent raising
 * the window, and the Play button under the pointer never hears it. With it on, the same click
 * raises the window and presses the button, and the play count goes up on the first try.
 *
 * The subject is Player's Play button: the term names what happens to the control underneath
 * the activating click, not the window it belongs to and not the desktop around it. Both of the
 * demo's states are that control's own question (reached, or not reached), so there is no
 * dishonest state to declare in `data-pose`: a ring on this button while the readout says the
 * click was swallowed is showing exactly the term. Notes is the scenery that makes an inactive
 * window possible, and the setting, the counter and the captions are instrumentation, so those
 * carry the context register.
 *
 * The mechanism is written the way a window manager writes it. A capture listener on the window
 * sees the click before the button does, raises the window if it was not active, and, when
 * click-through is off, stops the propagation there: the button is never told. That is the whole
 * of the term in three lines, and it works for a real pointer exactly as it does for a scripted
 * one, since both send the same click.
 *
 * Raising a window changes only its stacking order, and every window holds its own box, so
 * nothing here moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desktop</span>
          <span class="sp-text" data-part="readout" style="width: 336px; text-align: right; white-space: nowrap">Player is behind, and Play is showing</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 10px">
            <span class="sp-label">First click on an inactive window</span>
            <sp-segmented class="sp-segmented" data-part="mode" data-value="raise">
              <button class="sp-segment" type="button" data-part="mode-raise" value="raise" style="padding: 5px 12px">Raises only</button>
              <button class="sp-segment" type="button" data-part="mode-through" value="through" style="padding: 5px 12px">Clicks through</button>
            </sp-segmented>
          </div>

          <div
            data-part="desk"
            data-mode="raise"
            data-hits="0"
            style="position: relative; flex: 0 0 auto; width: ${DESK.w}px; height: ${DESK.h}px; border-radius: var(--sp-radius); background: var(--sp-sunken)"
          >
            <div
              class="sp-surface sp-context"
              data-part="win-a"
              data-active
              style="position: absolute; left: 4px; top: 4px; width: 214px; height: 120px; z-index: 2; display: flex; flex-direction: column; overflow: hidden; cursor: default"
            >
              <div class="sp-row" data-part="bar-a" style="flex: 0 0 auto; gap: 8px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading" style="font-size: 12px">Notes</span>
              </div>
              <div class="sp-stack" style="gap: 8px; padding: 12px 10px">
                <span class="sp-line" style="width: 86%"></span>
                <span class="sp-line" style="width: 64%"></span>
                <span class="sp-line" style="width: 74%"></span>
              </div>
            </div>

            <div
              class="sp-surface"
              data-part="win-b"
              style="position: absolute; left: 196px; top: 16px; width: 230px; height: 112px; z-index: 1; display: flex; flex-direction: column; overflow: hidden; cursor: default"
            >
              <div class="sp-row" data-part="bar-b" style="flex: 0 0 auto; gap: 8px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading sp-context" style="font-size: 12px">Player</span>
              </div>
              <div class="sp-row" style="flex: 1 1 auto; justify-content: flex-end; gap: 10px; padding: 0 12px">
                <span class="sp-label sp-context" data-part="count" style="white-space: nowrap; font-variant-numeric: tabular-nums">0 plays</span>
                <button class="sp-button sp-button--sm" type="button" data-part="play" data-subject>Play</button>
              </div>
            </div>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 16px 9px; text-align: center; line-height: 1.4">
          Even where the first click does go through, destructive controls are usually left out of it.
        </span>
      </div>
    </div>
  `;

  const desk = part(root, 'desk');
  const readout = part(root, 'readout');
  const count = part(root, 'count');
  const mode = part(root, 'mode') as HTMLElement & { value: string };
  const windows = { a: part(root, 'win-a'), b: part(root, 'win-b') };
  const bars = { a: part(root, 'bar-a'), b: part(root, 'bar-b') };

  let active: 'a' | 'b' = 'a';
  let hits = 0;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const raise = (key: 'a' | 'b') => {
    active = key;
    for (const [name, box] of Object.entries(windows)) {
      const on = name === key;
      box.style.zIndex = on ? '2' : '1';
      if (on) box.setAttribute('data-active', '');
      else box.removeAttribute('data-active');
      const bar = bars[name as 'a' | 'b'];
      bar.style.background = on ? 'var(--sp-sunken)' : 'transparent';
      (bar.firstElementChild as HTMLElement).style.color = on ? 'var(--sp-ink)' : 'var(--sp-muted)';
    }
  };

  /**
   * The window manager's own decision, in the place it really happens: before the control
   * under the pointer is told anything. An inactive window is raised either way; whether the
   * click carries on to the button is the entire term.
   */
  const activateOn = (key: 'a' | 'b', title: string) => (event: MouseEvent) => {
    if (active === key) return;
    raise(key);
    if (mode.value === 'through') return say(`Raised ${title} and let the click carry on`);
    event.stopPropagation();
    event.preventDefault();
    say(`The click only raised ${title}, nothing was pressed`);
  };

  windows.a.addEventListener('click', activateOn('a', 'Notes'), true);
  windows.b.addEventListener('click', activateOn('b', 'Player'), true);

  part(root, 'play').addEventListener('click', () => {
    hits += 1;
    desk.dataset.hits = String(hits);
    count.textContent = hits === 1 ? '1 play' : `${hits} plays`;
    if (mode.value === 'through' && desk.dataset.raised === 'just-now') return say('Raised Player and pressed Play, in one click');
    say('Play was pressed: Player already had the click');
  });

  // The raise and the press arrive in the same click, so the button reads which one it was
  // from a mark the capture listener leaves rather than from the order of two handlers.
  windows.b.addEventListener(
    'pointerdown',
    () => {
      desk.dataset.raised = active === 'b' ? 'already' : 'just-now';
    },
    true,
  );

  mode.addEventListener('change', () => {
    const through = mode.value === 'through';
    desk.dataset.mode = through ? 'through' : 'raise';
    say(through ? 'Click-through on: one click will do both' : 'Click-through off: the first click is spent');
  });

  raise('a');
}
