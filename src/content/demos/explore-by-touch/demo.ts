import { part } from '#src/kit/parts.ts';

type Item = { key: string; name: string; meta: string; spoken: string };

const ITEMS: Item[] = [
  { key: 'priya', name: 'Priya Raman', meta: '2 new', spoken: 'Priya Raman. 2 new messages. Double tap to open.' },
  { key: 'marcus', name: 'Marcus Bell', meta: 'Yesterday', spoken: 'Marcus Bell. Yesterday. Double tap to open.' },
  { key: 'standup', name: 'Team standup', meta: 'Mon', spoken: 'Team standup. Monday. Double tap to open.' },
  { key: 'compose', name: 'Compose', meta: '', spoken: 'Compose. Button. Double tap to activate.' },
];

const IDLE = 'Nothing announced yet';

/**
 * Explore by touch specimen: a phone screen where dragging a finger reads whatever is under
 * it and nothing opens until a second, deliberate tap. The speech line reports what the
 * finger last reached, and the result line keeps the two gestures apart: a single tap only
 * reads, a double tap activates what was read.
 *
 * The subject is the screen being explored, the narrowest element the term names: the mode
 * belongs to the surface a finger is dragged across, and a ring around one row would name
 * that row rather than the way it was found. The phone shell, the mode chip, the speech and
 * result lines, and the caption are scenery (SPEC §5). The screen is honest in every state
 * this demo can rest in, so no `data-pose` is needed.
 *
 * Sweeping is the term, and a sweep holds nothing down, so the screen carries
 * `data-hover-driven`: a reader's dwell on it takes the stage over without a click, and
 * what gets announced follows their own pointer rather than the ghost's (SPEC §7).
 *
 * The row under the finger is found from the pointer's own coordinates against each row's
 * box, which is a read of boxes this demo never restyles, so nothing is measured after a
 * style write (SPEC §5). Both readouts hold their height from mount. A tap reaches "read"
 * and a double tap reaches "opened", so neither gesture toggles (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const row = (item: Item) => `
    <div class="sp-row sp-row--between" data-part="row-${item.key}" style="gap: 8px; height: 34px; padding: 0 8px;
         border-bottom: 1px solid var(--sp-line)">
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 11.5px">${item.name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${item.meta}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 20px">
          <span class="sp-label" style="flex: 0 0 auto">A phone with a screen reader running</span>
          <span class="sp-chip" data-part="mode" style="cursor: default; font-size: 10px; padding: 2px 8px">Explore by touch on</span>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 14px; align-items: flex-start">
          <!-- The shell stays outside the context register, because the screen inside it is
               the subject and a subject is styled normally (SPEC §5). -->
          <div style="flex: 0 0 176px; padding: 7px; border: 2px solid var(--sp-line);
               border-radius: 18px; background: var(--sp-surface)">
            <div data-part="screen" data-subject data-hover-driven data-reading="none"
                 style="height: 194px; border-radius: 12px; background: var(--sp-sunken); overflow: hidden; touch-action: none">
              <div class="sp-row" style="height: 26px; padding: 0 8px; background: var(--sp-surface);
                   border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading" style="font-size: 12px">Messages</span>
              </div>
              ${ITEMS.slice(0, 3).map(row).join('')}
              <div class="sp-row" style="height: 30px; padding: 0 8px; justify-content: flex-end">
                <span class="sp-chip" data-part="row-compose" style="cursor: default; font-size: 10px; padding: 3px 10px;
                      background: var(--sp-accent); border-color: var(--sp-accent); color: var(--sp-accent-ink)">Compose</span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <p class="sp-text sp-text--ink" data-stage-announce data-part="speech" data-said="none" data-state="idle"
               style="margin: 0">${IDLE}</p>

            <div class="sp-surface" style="padding: 7px 9px">
              <span class="sp-label" style="font-size: 10px">What the last gesture did</span>
              <p class="sp-text sp-text--ink" data-part="result" data-state="none" data-opened="none"
                 style="margin: 4px 0 0; height: 36px; font-size: 11.5px; color: var(--sp-muted)">
                Nothing yet. Dragging only reads.
              </p>
            </div>

            <p class="sp-text" data-part="caption" style="margin: 0; height: 68px; font-size: 11px">
              With this mode on, a single tap only reads what it lands on. Every control shifts by one gesture, which is why
              a target too small to sweep over is a target nobody finds.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const speech = part(root, 'speech');
  const result = part(root, 'result');

  let said: Item | undefined;

  const rowAt = (x: number, y: number): Item | undefined =>
    ITEMS.find((item) => {
      const box = part(root, `row-${item.key}`).getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    });

  const mark = (item: Item | undefined) => {
    for (const other of ITEMS) {
      const el = part(root, `row-${other.key}`);
      const on = other.key === item?.key;
      el.style.outline = on ? '2px solid var(--sp-accent)' : '';
      el.style.outlineOffset = on ? '-2px' : '';
    }
    screen.dataset.reading = item?.key ?? 'none';
  };

  const speak = (item: Item | undefined) => {
    if (!item || item.key === said?.key) return;
    said = item;
    mark(item);
    speech.dataset.said = item.key;
    speech.dataset.state = 'spoken';
    speech.style.color = 'var(--sp-ink)';
    speech.textContent = item.spoken;
  };

  const read = (item: Item | undefined) => {
    if (!item) return;
    speak(item);
    result.dataset.state = 'read';
    result.dataset.opened = 'none';
    result.style.color = 'var(--sp-ink)';
    result.textContent = `Read “${item.name}”. A single tap does not open it.`;
  };

  const open = () => {
    if (!said) return;
    result.dataset.state = 'opened';
    result.dataset.opened = said.key;
    result.style.color = 'var(--sp-ink)';
    result.textContent = `Opened “${said.name}” with the second tap.`;
  };

  // The finger is a probe: it reads while it moves, whether or not it is held down, which is
  // what makes sweeping the screen the way a reader finds anything at all.
  screen.addEventListener('pointermove', (event) => {
    const pointer = event as PointerEvent;
    speak(rowAt(pointer.clientX, pointer.clientY));
  });

  screen.addEventListener('click', (event) => {
    const pointer = event as MouseEvent;
    read(rowAt(pointer.clientX, pointer.clientY) ?? said);
  });

  // Double tap anywhere activates whatever was last announced, not whatever is underneath.
  screen.addEventListener('dblclick', open);
}
