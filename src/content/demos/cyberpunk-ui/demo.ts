/**
 * Cyberpunk UI specimen: one panel of a corporate terminal you were probably not meant to
 * be looking at. A neon frame with its corners cut off, near-black surfaces under scanlines,
 * monospaced capitals, two toxic accents doing all the colour work, a split title, hazard
 * chrome, and a serial number on something that has no reason to carry one.
 *
 * The panel is the subject; the caption below it is scenery. Every colour, the cut, and the
 * scanline grating are stated inline because the palette is this term's own claim, and the
 * kit has one accent on purpose. The panel is static: the interference this style implies is
 * described in prose rather than looped, since a permanent flicker is a hazard and a poster
 * is looked at rather than watched.
 */
const MONO = "'Courier New', ui-monospace, monospace";
const MAGENTA = '#ff2fb0';
const CYAN = '#25e3ff';
const AMBER = '#ffb020';
const CUT = 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))';
const NOTCH = 'polygon(0 0, 100% 0, 100% 100%, 7px 100%, 0 calc(100% - 7px))';
const SCANLINES = 'repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px)';
const HAZARD = 'repeating-linear-gradient(45deg, rgb(255 176 32 / 0.32) 0 6px, transparent 6px 12px)';

export function mount(root: HTMLElement): void {
  const meter = (name: string, label: string, value: string, fill: string) => `
    <div data-part="${name}" style="flex: 1 1 0; padding: 6px 7px; background: rgb(37 227 255 / 0.07);
         border-left: 1px solid ${CYAN}; clip-path: ${NOTCH}">
      <div style="font-family: ${MONO}; font-size: 7.5px; letter-spacing: 0.16em; color: ${CYAN}; opacity: 0.85">${label}</div>
      <div style="margin-top: 5px; height: 4px; background: rgb(255 255 255 / 0.12)">
        <div style="width: ${value}; height: 100%; background: ${fill}"></div>
      </div>
    </div>`;

  const ticks = Array.from({ length: 22 }, (_, i) => {
    const w = i % 4 === 0 ? 3 : 1;
    return `<span style="width: ${w}px; height: ${i % 3 === 0 ? 9 : 5}px; background: ${CYAN}; opacity: 0.6"></span>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="width: 270px; padding: 1px; background-image: linear-gradient(140deg, ${MAGENTA}, ${CYAN});
                  clip-path: ${CUT}; box-shadow: 0 0 22px rgb(255 47 176 / 0.28)">
        <div style="padding: 12px; background-color: #08060f; background-image: ${SCANLINES}; clip-path: ${CUT}">

          <div data-part="header" class="sp-row sp-row--between"
               style="font-family: ${MONO}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${CYAN}">
            <span>Kasei Holdings // node 12</span>
            <span data-part="serial" style="color: ${MAGENTA}">sn 4417-b</span>
          </div>

          <div data-part="title"
               style="margin-top: 10px; font-family: ${MONO}; font-size: 27px; font-weight: 700; letter-spacing: 0.06em;
                      line-height: 1.05; text-transform: uppercase; color: #f2f4fb;
                      text-shadow: 2px 0 rgb(255 47 176 / 0.9), -2px 0 rgb(37 227 255 / 0.9)">
            Ghostline
          </div>

          <div data-part="ticks" class="sp-row" aria-hidden="true"
               style="gap: 3px; margin-top: 8px; align-items: flex-end; height: 9px">${ticks}</div>

          <div class="sp-row" style="gap: 8px; margin-top: 10px; align-items: stretch">
            ${meter('meter-a', 'ICE', '72%', MAGENTA)}
            ${meter('meter-b', 'TRACE', '38%', CYAN)}
          </div>

          <div data-part="warning"
               style="margin-top: 10px; padding: 4px 8px; background-color: rgb(255 176 32 / 0.1); background-image: ${HAZARD};
                      border-left: 3px solid ${AMBER}; font-family: ${MONO}; font-size: 8px; letter-spacing: 0.14em;
                      text-transform: uppercase; color: ${AMBER}">
            Unauthorized access logged
          </div>

          <div class="sp-row" style="justify-content: flex-end; margin-top: 10px">
            <button class="sp-button sp-button--sm" data-part="jack" type="button"
                    style="border-radius: 0; background: transparent; border: 1px solid ${MAGENTA};
                           color: ${MAGENTA}; font-family: ${MONO}; font-size: 10px; letter-spacing: 0.18em;
                           text-transform: uppercase">Jack in</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="max-width: 270px; margin: 0; text-align: center; font-size: 11px">
        Cut corners, two toxic accents, hazard chrome, noir rather than nostalgia.
      </p>
    </div>
  `;
}
