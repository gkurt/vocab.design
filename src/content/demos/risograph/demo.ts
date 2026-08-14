/**
 * Risograph specimen: a two-drum print, one pass per ink, with the second pass landing a
 * few pixels off. Flat fluorescent pink and teal, an overprint where the two cross, bare
 * paper haloes where the slip opened a gap, a grain overlay, and corner registration marks
 * that the print itself has failed to hit.
 *
 * The inks, the paper, and the grain are stated inline because they are the term: the kit
 * has one accent, a white surface, and no texture that mottles. Multiply is what makes the
 * crossing area a third colour neither drum carries, so the layers share an isolated
 * stacking context rather than blending with the stage behind them.
 *
 * Static: a printed sheet has no states, so the specimen is looked at rather than watched.
 */
const PAPER = '#f4f0e6';
const PINK = '#ff4fa3';
const TEAL = '#12b5b0';
const INK = '#2b2926';
const GRAIN = [
  'repeating-radial-gradient(circle at 0 0, rgb(40 36 30 / 0.2) 0 0.6px, transparent 0.6px 2.6px)',
  'repeating-radial-gradient(circle at 1.4px 2.2px, rgb(40 36 30 / 0.13) 0 0.5px, transparent 0.5px 3.3px)',
].join(', ');

/** A registration crosshair, printed on the teal pass and therefore missed by the pink one. */
function regmark(pos: string, colour: string, part?: string): string {
  const tag = part ? ` data-part="${part}"` : '';
  return `<span${tag} aria-hidden="true" style="position: absolute; ${pos}; width: 13px; height: 13px;
    background-image: linear-gradient(${colour}, ${colour}), linear-gradient(${colour}, ${colour});
    background-size: 13px 1px, 1px 13px; background-position: center, center; background-repeat: no-repeat"></span>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 268px; height: 218px; overflow: hidden; isolation: isolate;
                  background: ${PAPER}; color: ${INK}">

        <span data-part="ink-teal" aria-hidden="true"
              style="position: absolute; left: 20px; top: 24px; width: 96px; height: 96px; border-radius: 50%;
                     background: ${TEAL}; mix-blend-mode: multiply"></span>

        <span data-part="ink-pink" aria-hidden="true"
              style="position: absolute; left: 66px; top: 46px; width: 92px; height: 92px; background: ${PINK};
                     mix-blend-mode: multiply"></span>

        <span data-part="bars" aria-hidden="true"
              style="position: absolute; right: 18px; top: 26px; width: 74px; height: 92px; mix-blend-mode: multiply;
                     background-image: repeating-linear-gradient(180deg, ${TEAL} 0 9px, transparent 9px 18px)"></span>

        <span data-part="bars-offset" aria-hidden="true"
              style="position: absolute; right: 15px; top: 30px; width: 74px; height: 92px; mix-blend-mode: multiply;
                     background-image: repeating-linear-gradient(180deg, ${PINK} 0 9px, transparent 9px 18px)"></span>

        <div data-part="headline"
             style="position: absolute; left: 18px; bottom: 44px; font-size: 38px; font-weight: 800;
                    letter-spacing: -0.03em; line-height: 1; mix-blend-mode: multiply">
          <span data-part="headline-teal" style="position: absolute; left: -5px; top: -4px; color: ${TEAL}">TWO DRUMS</span>
          <span data-part="headline-pink" style="position: relative; color: ${PINK}">TWO DRUMS</span>
        </div>

        <p data-part="strap" style="position: absolute; left: 19px; right: 19px; bottom: 16px; margin: 0;
                  font-size: 11px; letter-spacing: 0.04em; line-height: 1.4">
          One pass per ink. Nothing lines up twice.
        </p>

        ${regmark('left: 6px; top: 6px', TEAL, 'regmark')}
        ${regmark('right: 6px; bottom: 6px', TEAL)}
        ${regmark('left: 8px; top: 8px', PINK)}
        ${regmark('right: 4px; bottom: 8px', PINK)}

        <span data-part="grain" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; opacity: 0.55;
                     background-image: ${GRAIN}; background-size: 3.1px 2.7px, 4.3px 3.7px"></span>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        Two flat inks, a pass each, and the slip between them left in.
      </p>
    </div>
  `;
}
