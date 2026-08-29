import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The page the player floats over, at a size the demo states rather than measures. */
const PAGE_W = 448;
const PAGE_H = 216;
const MINI_W = 136;
const MINI_H = 78;
const EDGE = 12;

const CORNERS: Record<string, { x: number; y: number }> = {
  br: { x: PAGE_W - MINI_W - EDGE, y: PAGE_H - MINI_H - EDGE },
  bl: { x: EDGE, y: PAGE_H - MINI_H - EDGE },
  tl: { x: EDGE, y: EDGE },
};

const FILM = 'linear-gradient(150deg, #2f3d63, #6d4f86 58%, #b8734d)';

/**
 * Picture in picture specimen: an article whose video pops out into a small window floating
 * over the page, movable between corners and closable back into the slot it left behind.
 *
 * The subject is the floating mini player, which is the only thing the term names: the
 * article under it, the reserved inline slot, the pop-out trigger and the corner switcher are
 * the scene (SPEC §5).
 *
 * The slot the player leaves keeps its exact size and says what happened to it, so popping
 * out and closing again moves nothing in the article. The player is placed by translating a
 * fixed box inside a page whose size the demo states, so no measurement is taken after a
 * style write (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Corner</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Position" data-value="br">
            <button class="sp-segment" type="button" data-part="seg-br" value="br">bottom right</button>
            <button class="sp-segment" type="button" data-part="seg-bl" value="bl">bottom left</button>
            <button class="sp-segment" type="button" data-part="seg-tl" value="tl">top left</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; justify-content: center; align-items: center">
          <div data-part="page" style="position: relative; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; gap: 12px; padding: 12px">
              <div class="sp-stack" style="flex: 0 0 auto; width: 186px; gap: 8px">
                <div
                  data-part="slot"
                  data-state="inline"
                  style="display: flex; align-items: center; justify-content: center; width: 186px; height: 104px; border-radius: 6px; background: ${FILM}"
                >
                  <span data-part="slot-note" class="sp-label" style="display: none; padding: 0 10px; text-align: center">playing in the mini player</span>
                </div>
                <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="pop" style="width: 100%">Pop out</button>
              </div>
              <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
                <span class="sp-heading">Tidal turbines</span>
                <div class="sp-line" style="width: 96%"></div>
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 74%"></div>
                <div class="sp-line" style="width: 90%"></div>
                <div class="sp-line" style="width: 62%"></div>
              </div>
            </div>
            <div
              data-part="mini"
              data-subject
              data-corner="br"
              hidden
              style="position: absolute; top: 0; left: 0; z-index: 2; width: ${MINI_W}px; height: ${MINI_H}px; padding: 6px; border-radius: 8px; background: ${FILM}; box-shadow: var(--sp-shadow); transition: translate 0.28s var(--sp-ease)"
            >
              <div class="sp-row sp-row--between" style="align-items: flex-start">
                <span class="sp-label" style="color: rgb(255 255 255 / 0.86)">Tidal turbines</span>
                <button class="sp-icon-button" type="button" data-part="close" style="width: 20px; height: 20px; color: #ffffff">
                  ${icon('close')}
                  <span class="sp-visually-hidden">Back to the article</span>
                </button>
              </div>
              <div style="position: absolute; left: 6px; right: 6px; bottom: 8px; height: 3px; border-radius: 999px; background: rgb(255 255 255 / 0.32)">
                <div style="width: 38%; height: 100%; border-radius: inherit; background: #ffffff"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const mini = part(root, 'mini');
  const slot = part(root, 'slot');
  const note = part(root, 'slot-note');

  const place = (key: string) => {
    const corner = CORNERS[key];
    if (!corner) return;
    mini.dataset.corner = key;
    mini.style.translate = `${corner.x}px ${corner.y}px`;
  };

  const setOpen = (open: boolean) => {
    mini.hidden = !open;
    slot.dataset.state = open ? 'popped' : 'inline';
    slot.style.background = open ? 'var(--sp-sunken)' : FILM;
    note.style.display = open ? 'block' : 'none';
  };

  part(root, 'pop').addEventListener('click', () => setOpen(true));
  part(root, 'close').addEventListener('click', () => setOpen(false));
  // Each segment names a corner, so the move lands on that corner rather than
  // cycling to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => place((event as CustomEvent<string>).detail));

  place('br');
  setOpen(false);
}
