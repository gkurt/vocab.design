/**
 * Kawaii UI specimen: an app screen with nothing in it yet, drawn in the register. Every
 * corner is over-rounded, the palette is pastel and low contrast, the button is chunky and
 * sits on a hard candy shadow, and the empty state is carried by a face rather than by an
 * icon.
 *
 * The creature is a plain blob with oversized eyes and blush, invented for this specimen:
 * the register is a set of drawing moves, not any company's character, so nothing here
 * imitates a named mascot.
 *
 * The paint is inline because the palette is the term. The kit's neutrals are cool, its
 * radius is 8px and it has one accent, and a kawaii screen made of kit tokens would be
 * demonstrating the kit.
 *
 * The subject is the empty state, not the mascot alone and not the window: the register is
 * carried by the whole panel (the radii, the pastels, the face and the chunky button
 * together), while the face on its own is one move out of four (SPEC §5). The window
 * chrome is scenery.
 *
 * A legend beside the window headed "What makes it read cute" listed the four drawing
 * moves, and a caption under it read "Approachability by drawing: nothing on this screen
 * looks like it could go wrong." Both were the site annotating its own picture inside the
 * frame, and the article names the same moves, so both went and the window stands alone.
 *
 * Static: a poster has no states, so there is nothing to animate and no clock to take.
 */
const CREAM = '#fff7f1';
const PANEL = '#fffdfb';
const PINK = '#ffd9e6';
const BUTTON = '#ffbcd6';
const BUTTON_EDGE = '#f194b8';
const MINT = '#bfe8d5';
const INK = '#6b4b57';
const FACE = '#4a3b42';

const MASCOT = `
  <svg data-part="mascot" viewBox="0 0 96 72" width="84" height="63" role="presentation" style="display: block">
    <path d="M48 3c23 0 40 13 40 31 0 21-17 35-40 35S8 55 8 34C8 16 25 3 48 3Z" fill="${MINT}"/>
    <ellipse cx="31" cy="17" rx="11" ry="6" fill="#ffffff" opacity="0.5"/>
    <ellipse cx="20" cy="46" rx="7.5" ry="4.6" fill="#ffb3c9"/>
    <ellipse cx="76" cy="46" rx="7.5" ry="4.6" fill="#ffb3c9"/>
    <ellipse cx="35" cy="38" rx="6" ry="7.6" fill="${FACE}"/>
    <ellipse cx="61" cy="38" rx="6" ry="7.6" fill="${FACE}"/>
    <circle cx="37" cy="35" r="2.1" fill="#ffffff"/>
    <circle cx="63" cy="35" r="2.1" fill="#ffffff"/>
    <path d="M43 51q5 5.5 10 0" fill="none" stroke="${FACE}" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div data-part="window"
           style="width: 298px; height: 256px; overflow: hidden; border-radius: 24px;
                  background: ${CREAM}; color: ${INK}; box-shadow: 0 10px 22px rgb(150 110 125 / 0.22)">

        <div data-part="topbar" style="display: flex; align-items: center; justify-content: space-between;
                                       padding: 10px 14px; background: ${PINK}">
          <span style="padding: 3px 12px 4px; border-radius: 999px; background: rgb(255 255 255 / 0.7);
                       font-size: 12px; font-weight: 700">My snacks</span>
          <span class="sp-row" aria-hidden="true" style="gap: 5px">
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
          </span>
        </div>

        <div style="padding: 12px">
          <div data-part="empty" data-subject
               style="display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 13px 16px 16px;
                      border-radius: 20px; background: ${PANEL}; box-shadow: 0 5px 0 rgb(255 214 228 / 0.9)">
            ${MASCOT}
            <span data-part="empty-title" style="font-size: 14px; font-weight: 700">Nothing here yet</span>
            <span style="font-size: 11px; text-align: center; opacity: 0.8">Add your first one and it will show up here.</span>
            <button type="button" data-part="empty-button"
                    style="margin-top: 3px; padding: 8px 22px 9px; border: 0; border-radius: 999px; background: ${BUTTON};
                           color: ${INK}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
                           box-shadow: 0 4px 0 ${BUTTON_EDGE}, 0 8px 12px rgb(150 110 125 / 0.24)">
              Add one
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
