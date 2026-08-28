import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Screen = 'a' | 'b';

const CAPTION: Record<Screen, string> = {
  a: 'Screen 1 is on. One control here is linked: Search. The field and the two filters are painted on, so pressing them goes nowhere.',
  b: 'Screen 2 is on, reached by that one link. Every result is the same row, the traveller has one typed-in name, and only Back is linked.',
};

/**
 * Prototype specimen: two screens on a board with the links drawn between them, which
 * is the whole of what the term names. Pressing Search follows the forward link and
 * screen 2 becomes the one that is on; Back follows the return link. Everything else on
 * screen 1 is painted on and answers nothing, and screen 2 carries the tell a wired
 * flow always carries: the same result row three times and a name somebody typed once.
 *
 * The subject is the board, the linked set rather than either screen, because a single
 * screen with nothing wired to it is a mockup. It is the box holding both screens and
 * the two connectors, not the top-level wrapper, so identify still has something
 * narrower than the scene to point at (SPEC §5). The picker-free caption, the label
 * above the board and the screens' own chrome are scenery in the context register.
 *
 * The board is always the prototype, in both states, so no `data-pose` is needed. Each
 * link reaches an absolute screen rather than toggling (SPEC §8): Search always means
 * screen 2 and Back always means screen 1. The "on screen" chip and the caption box are
 * both reserved at their full size, so following a link moves nothing (SPEC §5), and no
 * timers are used: every state is reached by a press.
 */
export function mount(root: HTMLElement): void {
  const badge = (s: Screen) => `
    <span data-part="badge-${s}"
          style="display: inline-flex; align-items: center; flex: 0 0 auto; height: 15px; padding: 0 6px;
                 border-radius: 999px; background: var(--sp-accent); color: var(--sp-accent-ink);
                 font-size: 8.5px; font-weight: 600; letter-spacing: 0.02em; opacity: 0;
                 transition: opacity 0.2s">ON SCREEN</span>`;

  const result = (n: number) => `
    <div data-part="result-${n}" class="sp-row"
         style="gap: 6px; height: 26px; padding: 0 7px; border-radius: 5px; background: var(--sp-sunken)">
      <span style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; overflow: hidden;
                   text-overflow: ellipsis; white-space: nowrap">Lisbon, 12 Mar</span>
      <span style="flex: 0 0 auto; font-size: 10.5px; color: var(--sp-muted)">128</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 11px 14px 13px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Two screens, two links, nothing behind them</span>
          <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">press a linked control</span>
        </div>

        <div data-part="board" data-subject
             style="position: relative; width: 428px; height: 158px; margin-top: 9px">

          <div class="sp-surface" data-part="screen-a" data-current
               style="position: absolute; left: 0; top: 0; width: 174px; height: 158px; padding: 9px;
                      display: flex; flex-direction: column; gap: 7px; overflow: hidden">
            <div class="sp-row" style="gap: 6px; height: 16px; flex: 0 0 auto">
              <span style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; font-weight: 600">Find a trip</span>
              ${badge('a')}
            </div>
            <input class="sp-input" data-part="field" type="text" placeholder="Where to?"
                   style="flex: 0 0 auto; height: 26px; padding: 0 8px; font-size: 11px" />
            <div class="sp-row" style="gap: 6px; flex: 0 0 auto">
              <button class="sp-chip" type="button" data-part="chip-flights"
                      style="padding: 2px 8px; font-size: 10px">Flights</button>
              <button class="sp-chip" type="button" data-part="chip-hotels"
                      style="padding: 2px 8px; font-size: 10px">Hotels</button>
            </div>
            <button class="sp-button" type="button" data-part="link-forward"
                    style="flex: 0 0 auto; height: 28px; margin-top: auto; padding: 0 12px; font-size: 11.5px">Search</button>
          </div>

          <svg data-part="wires" viewBox="0 0 80 158" width="80" height="158" aria-hidden="true"
               style="position: absolute; left: 174px; top: 0; overflow: visible">
            <g data-part="wire-back" stroke="var(--sp-line)" fill="var(--sp-line)">
              <circle cx="76" cy="17" r="2.6" stroke="none"/>
              <path d="M76 17H8" fill="none" stroke-width="2" stroke-linecap="round"/>
              <path d="M8 12.6 2 17l6 4.4z" stroke="none"/>
            </g>
            <g data-part="wire-forward" stroke="var(--sp-line)" fill="var(--sp-line)">
              <circle cx="4" cy="135" r="2.6" stroke="none"/>
              <path d="M4 135h68" fill="none" stroke-width="2" stroke-linecap="round"/>
              <path d="M72 130.6 78 135l-6 4.4z" stroke="none"/>
            </g>
          </svg>

          <div class="sp-surface" data-part="screen-b"
               style="position: absolute; left: 254px; top: 0; width: 174px; height: 158px; padding: 9px;
                      display: flex; flex-direction: column; gap: 6px; overflow: hidden">
            <div class="sp-row" style="gap: 6px; height: 16px; flex: 0 0 auto">
              <button class="sp-icon-button" type="button" data-part="link-back" aria-label="Back"
                      style="flex: 0 0 auto; width: 18px; height: 18px">${icon('chevronLeft')}</button>
              <span style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; font-weight: 600">Lisbon</span>
              ${badge('b')}
            </div>
            <span style="flex: 0 0 auto; font-size: 9.5px; color: var(--sp-muted)">3 results for Alex Rivera</span>
            ${result(1)}${result(2)}${result(3)}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-screen="a"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.a}</p>
      </div>
    </div>
  `;

  const screens: Record<Screen, HTMLElement> = { a: part(root, 'screen-a'), b: part(root, 'screen-b') };
  const badges: Record<Screen, HTMLElement> = { a: part(root, 'badge-a'), b: part(root, 'badge-b') };
  /** The link leaving each screen: lit while that screen is the one on, since that is
   *  the only press on it that resolves. */
  const outgoing: Record<Screen, HTMLElement> = { a: part(root, 'wire-forward'), b: part(root, 'wire-back') };
  const caption = part(root, 'caption');

  const paint = (el: HTMLElement, on: boolean) => {
    el.setAttribute('stroke', on ? 'var(--sp-accent)' : 'var(--sp-line)');
    el.setAttribute('fill', on ? 'var(--sp-accent)' : 'var(--sp-line)');
    flag(el, 'data-live', on);
  };

  const go = (next: Screen) => {
    for (const key of ['a', 'b'] as Screen[]) {
      const on = key === next;
      const screen = screens[key];
      flag(screen, 'data-current', on);
      screen.style.borderColor = on ? 'var(--sp-accent)' : 'var(--sp-line)';
      screen.style.boxShadow = on ? '0 0 0 2px var(--sp-accent-soft)' : 'none';
      badges[key].style.opacity = on ? '1' : '0';
      paint(outgoing[key], on);
    }
    caption.textContent = CAPTION[next];
    caption.dataset.screen = next;
  };

  go('a');

  part(root, 'link-forward').addEventListener('click', () => go('b'));
  part(root, 'link-back').addEventListener('click', () => go('a'));
}
