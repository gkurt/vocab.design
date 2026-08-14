/**
 * Grunge design specimen: a page from a mid nineties zine. The paper is torn along its
 * foot so the dark board behind it shows, the masthead is printed three times slightly out
 * of register, the deck is cut from mismatched letters, a halftone photo sits off the grid
 * at an angle, and a proof stamp is banged down over the lot.
 *
 * The card is the subject; the caption below it is scenery. The dirty palette, the toner
 * streaks, and the halftone are stated inline because they are this term's own claim: the
 * kit is clean by design and none of this could be spelled with it.
 *
 * Static: a printed page has no states to watch.
 */
const COND = "'Haettenschweiler', 'Impact', 'Arial Narrow', var(--sp-font)";
const TYPE = "'Times New Roman', Georgia, serif";
const MONO = "'Courier New', ui-monospace, monospace";
const PAPER = '#cec6b2';
const BOARD = '#2b2721';
const INK = '#17150f';
const BLOOD = '#7d2b22';
const MOSS = '#4c5a4a';
const GRAIN =
  'repeating-linear-gradient(96deg, rgb(23 21 15 / 0.06) 0 1px, transparent 1px 9px), ' +
  'radial-gradient(55% 40% at 22% 26%, rgb(23 21 15 / 0.14), transparent 70%), ' +
  'radial-gradient(45% 36% at 86% 72%, rgb(23 21 15 / 0.17), transparent 72%), ' +
  'radial-gradient(38% 30% at 58% 96%, rgb(23 21 15 / 0.12), transparent 74%)';
const TORN =
  'polygon(0 0, 100% 0, 100% 93%, 95% 96%, 91% 91%, 86% 97%, 81% 93%, 75% 98%, 69% 93%, ' +
  '63% 97%, 57% 92%, 51% 97%, 45% 93%, 39% 98%, 33% 93%, 27% 97%, 21% 92%, 15% 97%, ' +
  '10% 93%, 5% 97%, 0 93%)';
const HALFTONE = `radial-gradient(circle at center, ${INK} 0 1.5px, transparent 1.6px)`;

export function mount(root: HTMLElement): void {
  const cut = [
    { c: 'i', s: 15, r: -9, bg: 'transparent', fg: INK, f: TYPE },
    { c: 's', s: 12, r: 6, bg: INK, fg: PAPER, f: COND },
    { c: 's', s: 17, r: -3, bg: 'transparent', fg: BLOOD, f: COND },
    { c: 'u', s: 11, r: 11, bg: 'transparent', fg: INK, f: TYPE },
    { c: 'e', s: 16, r: -7, bg: MOSS, fg: PAPER, f: TYPE },
    { c: ' ', s: 12, r: 0, bg: 'transparent', fg: INK, f: TYPE },
    { c: 'n', s: 13, r: 8, bg: 'transparent', fg: INK, f: COND },
    { c: 'i', s: 16, r: -5, bg: 'transparent', fg: INK, f: TYPE },
    { c: 'n', s: 11, r: 4, bg: BLOOD, fg: PAPER, f: TYPE },
    { c: 'e', s: 15, r: -10, bg: 'transparent', fg: INK, f: COND },
  ]
    .map(
      (l) =>
        `<span style="display: inline-block; padding: 0 1px; font-family: ${l.f}; font-size: ${l.s}px; line-height: 1;
                      background: ${l.bg}; color: ${l.fg}; transform: rotate(${l.r}deg)">${l.c === ' ' ? '&nbsp;' : l.c}</span>`,
    )
    .join('');

  const mast = (color: string, x: number, y: number, extra = '') =>
    `<span aria-hidden="true" style="position: absolute; left: ${x}px; top: ${y}px; font-family: ${COND}; font-size: 40px;
            line-height: 1; letter-spacing: 0.01em; color: ${color}; ${extra}">STATIC</span>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 254px; height: 244px; background: ${BOARD}; overflow: hidden">

        <div data-part="paper"
             style="position: absolute; inset: 0; background-color: ${PAPER}; background-image: ${GRAIN};
                    clip-path: ${TORN}">

          <span aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: 0; height: 100%; opacity: 0.3;
                       background-image: repeating-linear-gradient(87deg, rgb(23 21 15 / 0.1) 0 2px, transparent 2px 27px)"></span>

          <div data-part="masthead" style="position: relative; height: 52px; margin: 14px 0 0 12px; transform: rotate(-1.6deg)">
            ${mast('rgb(76 90 74 / 0.8)', 4, 5)}
            ${mast('rgb(125 43 34 / 0.75)', 0, 2)}
            ${mast(INK, 2, 0, 'mix-blend-mode: multiply')}
          </div>

          <div data-part="cut" style="position: absolute; left: 14px; top: 76px; width: 150px; transform: rotate(1.4deg)">${cut}</div>

          <p data-part="body"
             style="position: absolute; left: 15px; top: 106px; width: 118px; margin: 0; font-family: ${TYPE}; font-size: 8.5px;
                    line-height: 1.45; color: rgb(23 21 15 / 0.85); transform: rotate(1deg)">
            Nobody asked for the grid and nobody kept it. The copier ate the second page,
            so the second page is the one you are holding, and it is
            <span style="text-decoration: line-through">perfectly</span> readable enough.
          </p>

          <span data-part="photo" aria-hidden="true"
                style="position: absolute; right: 10px; top: 96px; width: 86px; height: 78px; transform: rotate(3.5deg);
                       background-color: #9a927e; background-image: ${HALFTONE}; background-size: 4px 4px;
                       border: 1px solid rgb(23 21 15 / 0.4); box-shadow: 3px 3px 0 rgb(23 21 15 / 0.25)"></span>

          <span data-part="foot"
                style="position: absolute; left: 15px; bottom: 42px; font-family: ${MONO}; font-size: 8px; letter-spacing: 0.08em;
                       color: rgb(23 21 15 / 0.7)">PRINTED ON A BAD COPIER</span>
        </div>

        <span data-part="stamp"
              style="position: absolute; right: 52px; bottom: 58px; padding: 3px 9px; border: 2px solid ${BLOOD};
                     color: ${BLOOD}; font-family: ${COND}; font-size: 17px; letter-spacing: 0.14em; opacity: 0.72;
                     transform: rotate(-14deg)">PROOF</span>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 254px; margin: 0; text-align: center">
        Torn foot, out of register masthead, cut letters, nothing on the grid.
      </p>
    </div>
  `;
}
