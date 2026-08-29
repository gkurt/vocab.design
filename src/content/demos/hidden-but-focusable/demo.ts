import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'broken' | 'fixed';

type Stop = { key: string; name: string; off: boolean };

/** Source order of everything a keyboard can reach, drawer links included. */
const STOPS: Stop[] = [
  { key: 'home', name: 'Home', off: false },
  { key: 'search', name: 'Search', off: false },
  { key: 'account', name: 'Account', off: true },
  { key: 'signout', name: 'Sign out', off: true },
  { key: 'contact', name: 'Contact', off: false },
];

const MARK = {
  broken: 'aria-hidden',
  fixed: 'inert',
} as const;

const CAPTION = {
  broken: 'Pushed off screen and marked aria-hidden. The links keep their place in the tab sequence, so Tab stops twice on nothing.',
  fixed: 'The same drawer marked inert. Its links leave the tab sequence with it, and Tab goes straight from Search to Contact.',
} as const;

const IDLE = 'Nothing announced yet';

/**
 * Hidden but focusable specimen: a closed navigation drawer, drawn beside the viewport
 * because in the page it sits at a negative offset where nothing could be watched. In the
 * mounted build it is marked aria-hidden and still holds two links, so walking the tab
 * sequence puts the ring out there twice: the viewport shows nothing focused and the
 * screen reader line goes silent. The other build marks the same drawer inert and the walk
 * skips it.
 *
 * The subject is the Account link, the narrowest element the term actually names: one
 * element that is hidden from software and still reachable by keyboard. Sign out beside it
 * is its twin. The failing build is the one where that link is the term, so the honest
 * condition is declared in `data-pose` and the mount state satisfies it: identify refuses
 * to ring the inert version, which is a picture of the fix (SPEC §6).
 *
 * Both builds hold the same boxes, and the void notice is hidden in place rather than
 * removed, so switching or stepping moves nothing (SPEC §5). The walk is a button rather
 * than a scripted Tab, since real focus is never moved under attract (SPEC §7); each
 * segment reaches its own build and stepping clamps at the last stop (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const inViewport = (s: Stop) => `
    <a class="sp-nav-item" href="#" data-part="stop-${s.key}" style="font-size: 12px; padding: 4px 10px">${s.name}</a>`;

  const inDrawer = (s: Stop, subject: boolean) => `
    <a class="sp-nav-item" href="#" data-part="stop-${s.key}" style="font-size: 12px; padding: 4px 10px"
       ${subject ? 'data-subject data-pose="[data-mode=broken]" data-mode="broken"' : ''}>${s.name}</a>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Closed drawer is marked</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="broken" data-axis="Attribute" data-term="broken">
            <button class="sp-segment" data-part="seg-broken" value="broken">aria-hidden</button>
            <button class="sp-segment" data-part="seg-fixed" value="fixed">inert</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 10px; align-items: stretch">
          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; padding: 8px 10px 10px; height: 140px">
            <span class="sp-label sp-context" style="font-size: 10px">In the viewport</span>
            <div class="sp-nav" style="margin-top: 6px">
              ${inViewport(STOPS[0] as Stop)}
              ${inViewport(STOPS[1] as Stop)}
              ${inViewport(STOPS[4] as Stop)}
            </div>
            <p class="sp-text" data-part="void" style="margin: 6px 0 0; font-size: 10.5px; visibility: hidden">
              The ring is out there somewhere.
            </p>
          </div>

          <div data-part="offscreen"
               style="flex: 0 0 168px; padding: 8px 10px 10px; height: 140px; border: 2px dashed var(--sp-line); border-radius: 8px">
            <div class="sp-row sp-row--between sp-context" style="gap: 6px">
              <span class="sp-label" style="font-size: 10px; white-space: nowrap">Off screen</span>
              <span class="sp-label" data-part="mark"
                    style="font-size: 10px; white-space: nowrap; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 5px">${MARK.broken}</span>
            </div>
            <div class="sp-nav" data-part="drawer" aria-hidden="true" style="margin-top: 6px">
              ${inDrawer(STOPS[2] as Stop, true)}
              ${inDrawer(STOPS[3] as Stop, false)}
            </div>
            <p class="sp-text sp-context" style="margin: 6px 0 0; font-size: 10px">Really at left: -9999px.</p>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 7px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">Keyboard focus</span>
            <span class="sp-text sp-text--ink" data-part="focus" data-where="none" style="font-size: 12px">Nowhere yet</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">Screen reader</span>
            <span class="sp-text sp-text--ink" data-part="heard" data-state="idle" style="font-size: 12px">${IDLE}</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <p class="sp-text" data-stage-verdict data-part="caption" data-case="broken"
             style="margin: 0; flex: 1 1 auto; height: 34px; font-size: 11px">${CAPTION.broken}</p>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab"
                  style="flex: 0 0 auto">Press Tab</button>
        </div>
      </div>
    </div>
  `;

  const drawer = part(root, 'drawer');
  const mark = part(root, 'mark');
  const voidNote = part(root, 'void');
  const focus = part(root, 'focus');
  const heard = part(root, 'heard');
  const caption = part(root, 'caption');
  const account = part(root, 'stop-account');

  let mode: Mode = 'broken';
  let at = -1;

  const walk = () => STOPS.filter((s) => mode === 'broken' || !s.off);

  const draw = () => {
    const current = walk()[at];
    for (const stop of STOPS) flag(part(root, `stop-${stop.key}`), 'data-sim-focus', current?.key === stop.key);
    const off = current?.off === true;
    voidNote.style.visibility = off ? 'visible' : 'hidden';
    focus.dataset.where = current ? (off ? 'void' : 'viewport') : 'none';
    focus.textContent = current ? `${current.name}${off ? ', off screen' : ''}` : 'Nowhere yet';
    heard.dataset.state = current ? (off ? 'silent' : 'spoken') : 'idle';
    heard.textContent = current ? (off ? 'Silence. Nothing is announced.' : `“${current.name}, link”`) : IDLE;
  };

  const apply = (next: Mode) => {
    mode = next;
    at = -1;
    account.dataset.mode = next;
    mark.textContent = MARK[next];
    caption.dataset.case = next;
    caption.textContent = CAPTION[next];
    flag(drawer, 'inert', next === 'fixed');
    if (next === 'fixed') drawer.removeAttribute('aria-hidden');
    else drawer.setAttribute('aria-hidden', 'true');
    draw();
  };

  apply('broken');

  part(root, 'tab').addEventListener('click', () => {
    at = Math.min(at + 1, walk().length - 1);
    draw();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'fixed' ? 'fixed' : 'broken');
  });
}
