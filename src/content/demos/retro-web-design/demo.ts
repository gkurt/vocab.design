/**
 * Retro web design specimen: a personal homepage from about 1997, rebuilt on purpose. A
 * grey window with a blue title bar sits on a teal desktop; inside it a tiled background,
 * a script-face welcome banner, a hazard-striped under construction sign, beveled grey
 * buttons, an odometer hit counter, and a webring at the foot.
 *
 * The window is the subject; the desktop behind it and the caption below are scenery. Every
 * colour, the tile, and the stripes are stated inline because period paint is this term's
 * own claim, and the kit's chrome-free neutrals could not spell any of it. Nothing blinks or
 * scrolls: the animated banner is the one part of the homage that stays in prose, since an
 * endless loop is a hazard rather than a joke (WCAG 2.2.2).
 */
const FACE = "'Comic Sans MS', 'Chalkboard SE', 'Segoe Print', var(--sp-font)";
const MONO = "'Courier New', ui-monospace, monospace";
const CHROME = '#c9c9c2';
const TILE =
  'repeating-linear-gradient(45deg, rgb(255 255 255 / 0.55) 0 3px, transparent 3px 6px), ' +
  'repeating-linear-gradient(-45deg, rgb(0 0 0 / 0.05) 0 3px, transparent 3px 6px)';
const STRIPES = 'repeating-linear-gradient(45deg, #f2c218 0 7px, #1b1b1b 7px 14px)';
const BUTTON =
  `border-radius: 0; background-color: ${CHROME}; color: #14161a; font-family: var(--sp-font); font-size: 11px; ` +
  'font-weight: 600; padding: 4px 10px';

export function mount(root: HTMLElement): void {
  const digits = ['0', '0', '1', '3', '4', '7']
    .map(
      (d) =>
        `<span style="padding: 1px 3px; background: #101010; color: #ffb020; font-family: ${MONO}; font-size: 11px; line-height: 1.2">${d}</span>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <span class="sp-context" aria-hidden="true"
            style="position: absolute; inset: 0; background-color: #0d7d7d; background-image: ${TILE}"></span>

      <div data-part="page" data-subject
           style="position: relative; width: 264px; border: 2px solid #7e7e78; background: ${CHROME}; box-shadow: 3px 3px 0 rgb(0 0 0 / 0.35)">

        <div data-part="titlebar" class="sp-row sp-row--between"
             style="padding: 3px 4px 3px 6px; background-image: linear-gradient(90deg, #0a2a8c, #4f8fd6);
                    color: #ffffff; font-family: var(--sp-font); font-size: 11px; font-weight: 700">
          <span>Ora's Home Page</span>
          <span aria-hidden="true"
                style="width: 14px; height: 12px; border: 1px solid #14161a; background: ${CHROME}; color: #14161a;
                       font-size: 9px; line-height: 10px; text-align: center">x</span>
        </div>

        <div style="padding: 8px; background-color: #f7f3d8; background-image: ${TILE}">
          <div data-part="banner"
               style="padding: 4px 0; text-align: center; font-family: ${FACE}; font-size: 15px; font-weight: 700;
                      color: #d61f6b; text-shadow: 1px 1px 0 #ffe14d">
            Welcome to my page!!!
          </div>

          <div data-part="stripe" aria-hidden="true"
               style="position: relative; height: 18px; margin-top: 6px; background-image: ${STRIPES}">
            <span style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; padding: 1px 6px;
                         background: #f7f3d8; font-family: var(--sp-font); font-size: 8.5px; font-weight: 700;
                         letter-spacing: 0.1em; color: #14161a">UNDER CONSTRUCTION</span>
          </div>

          <div class="sp-row" style="justify-content: center; gap: 8px; margin-top: 10px">
            <button class="sp-button sp-bevel" data-part="guestbook" type="button" style="${BUTTON}">Sign my guestbook</button>
            <button class="sp-button sp-bevel" data-part="email" type="button" style="${BUTTON}">E-mail me!</button>
          </div>

          <div data-part="counter" class="sp-row" style="justify-content: center; gap: 6px; margin-top: 10px">
            <span style="font-family: var(--sp-font); font-size: 9px; color: #3b3a34">You are visitor</span>
            <span class="sp-row" style="gap: 1px; padding: 2px; background: #101010">${digits}</span>
          </div>

          <div data-part="webring"
               style="margin-top: 10px; padding-top: 6px; border-top: 1px solid rgb(20 22 26 / 0.25); text-align: center;
                      font-family: var(--sp-font); font-size: 9px; color: #14161a">
            <span style="color: #1a1ac4; text-decoration: underline">Prev</span>
            &nbsp;|&nbsp;<span style="color: #1a1ac4; text-decoration: underline">Lighthouse Web Ring</span>
            &nbsp;|&nbsp;<span style="color: #1a1ac4; text-decoration: underline">Next</span>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption"
         style="position: relative; max-width: 264px; margin: 0; text-align: center; font-size: 11px; color: #eafbfb">
        Beveled chrome, tiled paper, a counter, a webring.
      </p>
    </div>
  `;
}
