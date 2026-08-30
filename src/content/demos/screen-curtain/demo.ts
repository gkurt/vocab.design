import { flag, part } from '#src/kit/parts.ts';
import { contactTap } from '#src/kit/touch.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Mode = 'off' | 'on';

/** The walk: each control, and what a reader says when focus reaches it. */
const STOPS = [
  { part: 'ctl-1', said: '“Pay someone, button”' },
  { part: 'ctl-2', said: '“Freeze card, switch, off”' },
  { part: 'ctl-3', said: '“Statements, button”' },
] as const;

const CAPTION = {
  off: 'The display is on, so the walk can be watched as well as heard. Triple tap the screen with three fingers to switch it off.',
  on: 'The display is off, not dimmed. The same three presses reach the same three controls and say the same three things. Tap again to bring it back.',
} as const;

/**
 * Screen curtain specimen: a wallet screen walked control by control, with the display switched off
 * and back on by the gesture that really does it, a three-finger triple tap on the screen. The
 * transcript keeps moving either way, which is the whole claim: the curtain takes away the picture
 * and nothing else.
 *
 * The subject is the curtain, the surface that blacks the display out. It exists only while the
 * curtain is on, so every state it is on stage in is honest and no `data-pose` is needed; in the
 * other state identify summons it (SPEC §6). The screen, its controls, the transcript, the key
 * legend and the caption are scenery.
 *
 * Two labels over the window announced the exhibit ("VoiceOver, walking one screen" and
 * "Three-finger triple tap: display off"). A label asserting an instrument nobody can see is
 * a stage direction in a product's clothes, so both went: the stage draws the three contacts
 * tapping, and the verdict in the strip names the gesture.
 *
 * The gesture is PORTRAYED as itself: `contactTap` from the kit reads the script's `tap` step and a
 * real three-finger triple tap through one wiring (SPEC §7), and one gesture reaches both named
 * states, because toggling is what the platform gesture does and here the toggling IS the term. It
 * passes `reader: false`, because VoiceOver consumes the three-finger triple tap before any document
 * sees it, so a mouse mapping would hand the reader a handler no real hardware can reach; that fact
 * is the article's to state. Nothing here draws a contact: the stage draws the ghost's discs and a
 * reader's own fingers (SPEC §7).
 *
 * Focus is simulated (`data-sim-focus`), because attract mode never moves real focus (SPEC §7); the
 * screen carries `tabindex="0"` so a reader can focus it and drive the same walk with a real arrow
 * key.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const line = (index: number, said: string) => `
    <p class="sp-text sp-text--ink" data-part="line-${index + 1}"
       style="margin: 0; height: 16px; line-height: 16px; font-size: 11.5px; white-space: nowrap;
              opacity: 0; transition: opacity 0.16s ease">${said}</p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row" style="align-items: stretch; gap: 12px">
          <div class="sp-frame" data-part="screen" data-curtain="off" data-touch tabindex="0"
               style="position: relative; flex: 0 0 auto; width: 202px; height: 158px; overflow: hidden;
                      touch-action: none; user-select: none">
            <div class="sp-topbar sp-context" style="padding: 6px 10px">
              <span class="sp-heading sp-grow" style="font-size: 12px">Wallet</span>
              <span class="sp-label" style="font-size: 10px">&#163;412.90</span>
            </div>
            <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 7px; padding: 10px">
              <button class="sp-button sp-button--sm" type="button" data-part="ctl-1"
                      style="height: 28px; font-size: 11.5px">Pay someone</button>
              <div class="sp-row sp-row--between" style="gap: 8px">
                <span class="sp-label" style="flex: 1 1 auto; font-size: 11px">Freeze card</span>
                <button class="sp-switch" type="button" data-part="ctl-2" role="switch"
                        aria-checked="false" aria-label="Freeze card" style="flex: 0 0 auto"></button>
              </div>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="ctl-3"
                      style="height: 28px; font-size: 11.5px">Statements</button>
            </div>
            <div data-part="curtain" data-subject aria-hidden="true"
                 style="position: absolute; inset: 0; background: #000; opacity: 0; visibility: hidden;
                        transition: opacity 0.22s ease, visibility 0.22s"></div>
          </div>

          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="gap: 8px; height: 16px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Speech</span>
              <span class="sp-row" style="flex: 0 0 auto; gap: 5px">
                <kbd class="sp-kbd" style="font-size: 10px">&#8594;</kbd>
                <span class="sp-label" style="font-size: 9.5px">next control</span>
              </span>
            </div>
            <div class="sp-stack" style="gap: 4px; margin-top: 6px">
              ${STOPS.map((stop, index) => line(index, stop.said)).join('')}
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="off"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.off}</p>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const curtain = part(root, 'curtain');
  const caption = part(root, 'caption');
  const controls = STOPS.map((stop) => part(root, stop.part));
  const lines = STOPS.map((_, index) => part(root, `line-${index + 1}`));
  let reached = -1;

  const walk = () => {
    if (reached >= STOPS.length - 1) return;
    reached += 1;
    for (const [index, control] of controls.entries()) flag(control, 'data-sim-focus', index === reached);
    const said = lines[reached];
    if (said) said.style.opacity = '1';
  };

  const rewind = () => {
    reached = -1;
    for (const control of controls) flag(control, 'data-sim-focus', false);
    for (const said of lines) said.style.opacity = '0';
  };

  const show = (mode: Mode) => {
    const on = mode === 'on';
    screen.dataset.curtain = mode;
    curtain.style.opacity = on ? '1' : '0';
    curtain.style.visibility = on ? 'visible' : 'hidden';
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
    // Each performance replays the same walk from its start in the new state, rather than leaving
    // the transcript wherever the last one stopped (SPEC §8).
    rewind();
  };

  // The arrow key rather than Tab: a real reader's Tab belongs to the page, and this walk is the
  // one a screen reader performs. Keys land on the element the player last touched and bubble here.
  root.addEventListener('keydown', (event) => {
    if ((event as KeyboardEvent).key !== 'ArrowRight') return;
    event.preventDefault();
    walk();
  });

  // Three contacts, three taps, on the screen itself: the gesture the platform gives this mode, and
  // the same one takes the display back. `reader: false` because VoiceOver never hands it to a page.
  contactTap(screen, clock, {
    fingers: 3,
    reader: false,
    onTap: (count: number) => {
      if (count !== 3) return;
      show(screen.dataset.curtain === 'on' ? 'off' : 'on');
    },
  });
}
