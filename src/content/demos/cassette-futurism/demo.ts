/**
 * Cassette futurism specimen: a control panel from a future imagined in 1979. Beige
 * plastic with an olive stripe, an engraved brand plate, a recessed amber CRT with a
 * dot matrix readout, three paddle toggles, a rocker, and a lamp that is lit rather
 * than animated.
 *
 * Every colour, bevel, and typeface is stated inline because the hardware is the term:
 * the kit has one accent and no plastic. The tube deliberately carries no raster, since
 * the scanline overlay is its own term and dropping it here would redraw that one.
 *
 * Static: a panel at rest has no states, so the specimen is looked at rather than
 * watched, which also spares it a clock and a motion gate.
 */
const PLASTIC = 'linear-gradient(180deg, #e2d8be 0%, #cec3a6 58%, #bcb08f 100%)';
const KEYCAP = 'linear-gradient(180deg, #f2ecdd, #cfc6ae 62%, #b3a98f)';
const OLIVE = '#5c6142';
const AMBER = '#ffb64a';
const ENGRAVE = 'text-shadow: 0 1px 0 rgb(255 255 255 / 0.62); color: #56503c';
const MONO = "'DejaVu Sans Mono', 'Courier New', ui-monospace, monospace";

function toggle(name: string, label: string, up: boolean): string {
  const lever = up ? 'top: 3px' : 'bottom: 3px';
  return `
    <span data-part="${name}" style="display: flex; flex-direction: column; align-items: center; gap: 5px">
      <span aria-hidden="true"
            style="position: relative; width: 24px; height: 38px; border-radius: 5px; background: #2a2721; box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.65), 0 1px 0 rgb(255 255 255 / 0.5)">
        <span style="position: absolute; left: 3px; ${lever}; width: 18px; height: 20px; border-radius: 4px; background-image: ${KEYCAP}; box-shadow: 0 1px 2px rgb(0 0 0 / 0.5)"></span>
      </span>
      <span style="font-family: ${MONO}; font-size: 7px; letter-spacing: 0.14em; ${ENGRAVE}">${label}</span>
    </span>`;
}

export function mount(root: HTMLElement): void {
  const meter = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
    .map(
      (lit) =>
        `<span style="width: 7px; height: 9px; background: ${lit ? AMBER : 'rgb(255 182 74 / 0.16)'}; box-shadow: ${lit ? `0 0 6px rgb(255 182 74 / 0.5)` : 'none'}"></span>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="display: flex; flex-direction: column; gap: 10px; width: 306px; padding: 12px 14px 14px; border-radius: 12px; background-image: ${PLASTIC}; border: 1px solid #9c9179; box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7), inset 0 -2px 4px rgb(94 84 60 / 0.35), 0 10px 22px rgb(40 32 16 / 0.28)">

        <div style="display: flex; align-items: center; gap: 8px">
          <span data-part="plate"
                style="padding: 2px 7px; border-radius: 3px; border: 1px solid rgb(120 110 86 / 0.55); background: rgb(255 255 255 / 0.18); font-family: ${MONO}; font-size: 8px; letter-spacing: 0.22em; ${ENGRAVE}">TANDEM 400</span>
          <span style="flex: 1 1 auto; height: 4px; border-radius: 2px; background: ${OLIVE}; opacity: 0.75"></span>
          <span data-part="lamp" aria-hidden="true"
                style="width: 11px; height: 11px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #ffd9a1, #e4622a 62%, #8d2f11); box-shadow: 0 0 8px rgb(228 98 42 / 0.75), inset 0 1px 1px rgb(255 255 255 / 0.6)"></span>
        </div>

        <div data-part="screen"
             style="padding: 4px; border-radius: 10px; background: #9d9379; box-shadow: inset 0 2px 5px rgb(60 52 34 / 0.55)">
          <div data-part="readout"
               style="display: flex; flex-direction: column; gap: 7px; padding: 10px 11px; border-radius: 7px; background: radial-gradient(120% 120% at 50% 40%, #16180f 0%, #0a0b07 100%); color: ${AMBER}; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.16em; text-shadow: 0 0 7px rgb(255 182 74 / 0.55)">
            <div style="display: flex; justify-content: space-between">
              <span>SEQ 04</span>
              <span>T-00:19:47</span>
            </div>
            <div data-part="meter" aria-hidden="true" style="display: flex; gap: 3px">${meter}</div>
            <div style="font-size: 9px; letter-spacing: 0.2em; color: rgb(255 182 74 / 0.82)">ATMOS . . . NOMINAL</div>
          </div>
        </div>

        <div data-part="switches" style="display: flex; align-items: flex-end; gap: 14px">
          ${toggle('toggle-a', 'PWR', true)}
          ${toggle('toggle-b', 'PUMP', false)}
          ${toggle('toggle-c', 'AUX', true)}
          <span style="flex: 1 1 auto"></span>
          <span data-part="rocker" style="display: flex; flex-direction: column; align-items: center; gap: 5px">
            <span aria-hidden="true" style="display: flex; width: 54px; height: 24px; border-radius: 4px; overflow: hidden; border: 1px solid #8d8267; box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.4)">
              <span style="flex: 1 1 0; background-image: linear-gradient(180deg, #a89b7d, #8d8267); box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.45)"></span>
              <span style="flex: 1 1 0; background-image: ${KEYCAP}"></span>
            </span>
            <span style="font-family: ${MONO}; font-size: 7px; letter-spacing: 0.14em; ${ENGRAVE}">VENT I / O</span>
          </span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 306px; margin: 0; text-align: center">
        Beige plastic, engraved capitals, and an amber tube: hardware from a future imagined in 1979.
      </p>
    </div>
  `;
}
