/**
 * Vaporwave specimen: the parts list in one frame, deliberately not the Y2K one. A violet
 * to peach sunset with a striped sun on the horizon, a cyan and pink grid laid flat in
 * perspective, a plaster bust built from four CSS shapes, katakana beside the Latin word,
 * chrome lettering in a serif rather than a grotesque, and the whole thing inside a mid
 * nineties window frame that is a prop rather than a control.
 *
 * The card is the subject and the caption below it is scenery. Every colour is stated
 * inline because the palette is the term. Nothing moves: the endless grid scroll is the
 * one animated cliche this style has, and a specimen that has to be looked at rather than
 * watched does not need it, which also spares it a motion gate.
 */
const CHROME =
  'background-image: linear-gradient(180deg, #ffffff 6%, #a8f5ff 30%, #2b2a6e 50%, #ffd9f4 58%, #ff74d2 78%, #ffffff); ' +
  '-webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-stroke: 0.7px rgb(58 12 74 / 0.92)';

const GRID =
  'repeating-linear-gradient(90deg, rgb(126 249 255 / 0.8) 0 1px, transparent 1px 30px), ' +
  'repeating-linear-gradient(0deg, rgb(255 106 213 / 0.75) 0 1px, transparent 1px 20px)';

const MARBLE = 'linear-gradient(140deg, #f6f4f2, #d9d5d2 46%, #a9a5a4)';

export function mount(root: HTMLElement): void {
  const stripes = [58, 68, 78, 88]
    .map(
      (top) =>
        `<span style="position: absolute; left: -2px; right: -2px; top: ${top}px; height: 5px; background: rgb(90 30 122 / 0.85)"></span>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div data-part="card" data-subject
           style="position: relative; width: 300px; height: 232px; border: 1px solid #7e8190; border-radius: 5px; background: #c9ccd6; box-shadow: 4px 4px 0 rgb(24 16 44 / 0.32); overflow: hidden">
        <div data-part="titlebar"
             style="display: flex; align-items: center; gap: 6px; height: 19px; padding: 0 5px; border-bottom: 1px solid #7e8190; background-image: repeating-linear-gradient(180deg, #f1f2f6 0 1px, #b6b9c6 1px 2px); font-family: Verdana, Geneva, sans-serif; font-size: 9px; color: #2a2740">
          <span style="width: 9px; height: 9px; border: 1px solid #4a4a5e; background: #dcdde4"></span>
          <span style="flex: 1; text-align: center; letter-spacing: 0.04em">untitled (1996)</span>
          <span style="width: 9px; height: 9px; border: 1px solid #4a4a5e; background: #dcdde4"></span>
        </div>

        <div data-part="scene"
             style="position: absolute; inset: 20px 0 0; overflow: hidden; background-image: linear-gradient(180deg, #1c0a3d 0%, #57197a 34%, #c8449b 58%, #f5885f 80%, #ffd4a3 100%)">
          <span data-part="sun" aria-hidden="true"
                style="position: absolute; left: 50%; top: 24px; width: 104px; height: 104px; margin-left: -52px; border-radius: 50%; background-image: linear-gradient(180deg, #fff3bc 6%, #ffb066 46%, #ff5fa8); overflow: hidden">${stripes}</span>

          <span data-part="grid" aria-hidden="true"
                style="position: absolute; left: -60%; right: -60%; bottom: -18px; height: 128px; background-image: ${GRID}; transform: perspective(140px) rotateX(66deg); transform-origin: bottom center"></span>

          <span data-part="bust" aria-hidden="true" style="position: absolute; left: 26px; bottom: 12px; width: 62px; height: 104px">
            <span style="position: absolute; left: 12px; bottom: 78px; width: 34px; height: 42px; border-radius: 50% 50% 46% 46%; background-image: ${MARBLE}"></span>
            <span style="position: absolute; left: 24px; bottom: 68px; width: 12px; height: 14px; background-image: ${MARBLE}"></span>
            <span style="position: absolute; left: 4px; bottom: 34px; width: 54px; height: 38px; border-radius: 26px 26px 5px 5px; background-image: ${MARBLE}"></span>
            <span style="position: absolute; left: 12px; bottom: 20px; width: 38px; height: 14px; background-image: linear-gradient(180deg, #cfcbc8, #8e8a8b)"></span>
          </span>

          <span data-part="kana"
                style="position: absolute; right: 16px; top: 16px; font-size: 12px; letter-spacing: 0.22em; color: #ffe6fb; text-shadow: 0 0 8px rgb(255 106 213 / 0.9)">ヴェイパー</span>

          <div data-part="wordmark"
               style="position: absolute; left: 0; right: 0; bottom: 34px; text-align: center; font-family: Georgia, 'Times New Roman', serif; font-size: 34px; font-weight: 700; letter-spacing: 0.02em; line-height: 1; ${CHROME}">
            V A P O R
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        Sunset gradient, striped sun, perspective grid, plaster bust, and a window from 1996.
      </p>
    </div>
  `;
}
