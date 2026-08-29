import { flag, part } from '#src/kit/parts.ts';

const NAV = ['Home', 'News', 'Sport', 'Culture', 'Weather', 'Contact'];

const CAPTION = {
  rest: 'First in the DOM and invisible, so nothing above the article moves. One Tab from the top of the page reaches it.',
  revealed: 'Focus arrived and the link painted itself. Six repeated links still stand between here and the article.',
  jumped: 'Enter moved focus, not just the scroll position: the ring is inside the article, past all six of them.',
} as const;

const RING = {
  rest: 'nothing yet',
  revealed: 'the skip link',
  jumped: 'the article, past all six links',
} as const;

type State = keyof typeof CAPTION;

/**
 * Skip link specimen: a masthead with six navigation links repeated on every page of the
 * paper, and the shortcut past them. The link is the first focusable thing in the frame and
 * is parked out of sight until focus arrives, so the first Tab paints it; Enter puts the ring
 * inside the article rather than scrolling to it, which is the half most implementations
 * miss.
 *
 * The subject is the link itself. It is invisible at rest, which is no objection: identify
 * summons it by playing the Tab that reveals it (SPEC §6), and it is a skip link in every
 * state, so no `data-pose` is needed. The masthead, the navigation, the article, the readout
 * and the caption are scenery (SPEC §5).
 *
 * The tab sequence is real: the link and the six nav items are elements carrying
 * `tabindex="0"`, the article carries `tabindex="-1"` exactly as a skip target must, and the
 * walk is the stage's own over that sequence (SPEC §7), so the ring lands where a browser
 * would put focus. Nothing calls `.focus()` under attract; the trusted branch is the real
 * jump a reader who takes over gets, which is the technique working rather than a picture of
 * it. The link is revealed with opacity and a translate, never by entering the layout, so
 * the masthead cannot move under it (SPEC §5), and the readout row holds its height from
 * mount.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 444px; height: 202px">
        <div class="sp-button sp-button--sm" role="link" tabindex="0" data-part="skip" data-subject
             style="position: absolute; z-index: 2; top: 9px; left: 12px; opacity: 0; translate: 0 -22px;
                    transition: opacity 0.16s var(--sp-ease), translate 0.16s var(--sp-ease)">
          Skip to main content
        </div>

        <div class="sp-topbar sp-context" style="flex-direction: column; align-items: stretch; gap: 7px; padding: 9px 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 13px">The Harbour Gazette</span>
            <span class="sp-label" style="font-size: 10px">Thursday</span>
          </div>
          <div class="sp-row" data-part="nav" style="gap: 2px">
            ${NAV.map(
              (label, index) =>
                `<div class="sp-nav-item" role="link" tabindex="0" data-part="nav-${index + 1}"
                      style="padding: 3px 7px; font-size: 11px">${label}</div>`,
            ).join('')}
          </div>
        </div>

        <div class="sp-body sp-context" style="padding: 12px">
          <div class="sp-surface" data-part="main" tabindex="-1"
               style="padding: 10px 12px; display: flex; flex-direction: column; gap: 7px">
            <span class="sp-label">Main content</span>
            <span class="sp-heading" style="font-size: 13px">Storm delays the 7.10 ferry</span>
            <div class="sp-stack" style="gap: 7px">
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 84%"></div>
              <div class="sp-line" style="width: 46%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-surface sp-context" style="width: 444px; padding: 7px 10px">
        <div class="sp-row sp-row--between" style="height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The ring is on</span>
          <span class="sp-text sp-text--ink" data-part="ring" data-at="rest"
                style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${RING.rest}</span>
        </div>
        <p class="sp-text" data-stage-verdict data-part="caption" data-state="rest"
           style="margin: 4px 0 0; height: 34px; font-size: 11px">${CAPTION.rest}</p>
      </div>
    </div>
  `;

  const skip = part(root, 'skip');
  const main = part(root, 'main');
  const ring = part(root, 'ring');
  const caption = part(root, 'caption');

  const say = (state: State) => {
    ring.dataset.at = state;
    ring.textContent = RING[state];
    caption.dataset.state = state;
    caption.textContent = CAPTION[state];
  };

  const reveal = (on: boolean) => {
    flag(skip, 'data-revealed', on);
    skip.style.opacity = on ? '1' : '0';
    skip.style.translate = on ? '0 0' : '0 -22px';
  };

  /** The jump: focus is placed on the article, which is why the target carries tabindex -1. */
  const jump = (trusted: boolean) => {
    reveal(false);
    skip.removeAttribute('data-sim-focus');
    main.setAttribute('data-sim-focus', '');
    if (trusted) main.focus();
    say('jumped');
  };

  // A scripted Tab moves the stage's own ring, so the link reads its state back off the
  // attribute rather than keeping a copy that could disagree with the ring on screen.
  const sync = () => {
    main.removeAttribute('data-sim-focus');
    const on = skip.hasAttribute('data-sim-focus');
    reveal(on);
    say(on ? 'revealed' : 'rest');
  };

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') sync();
    if (event.key === 'Enter' && skip.hasAttribute('data-sim-focus')) jump(event.isTrusted);
  });

  // A real reader gets the real thing: their own focus reveals it and their own click jumps.
  skip.addEventListener('focus', () => {
    reveal(true);
    say('revealed');
  });
  skip.addEventListener('blur', () => {
    if (!skip.hasAttribute('data-sim-focus')) reveal(false);
  });
  skip.addEventListener('click', () => jump(true));
}
