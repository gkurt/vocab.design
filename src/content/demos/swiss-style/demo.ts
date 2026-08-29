/**
 * Swiss style specimen: a poster fragment built on the grid it is actually set on.
 * Four columns are drawn faintly and every element starts on one of them, flush left
 * with a ragged right edge, in a neo-grotesque stack, black on paper with a single red
 * accent and an oversized numeral. The bottom right quarter is left empty on purpose:
 * the asymmetry and the space are as much the style as the type is.
 *
 * The poster is the subject and the caption below it is scenery. Paint is stated inline
 * because it is this term's own claim: paper, ink, and one red are what the style is,
 * and the kit has one accent on purpose. The specimen is static, since a composition
 * has no state.
 */
const FACE = "'Helvetica Neue', Helvetica, Arial, 'Inter', var(--sp-font)";
const PAPER = '#f4f4f1';
const INK = '#16181c';
const RED = '#e2231a';

export function mount(root: HTMLElement): void {
  const column = '<span style="border-left: 1px solid rgb(22 24 28 / 0.13); border-right: 1px solid rgb(22 24 28 / 0.06)"></span>';
  const columns = column.repeat(4);

  root.innerHTML = `
    <div class="sp-app">
      <div data-part="poster" data-subject
           style="position: relative; width: 252px; height: 250px; padding: 16px; background: ${PAPER}; color: ${INK}; font-family: ${FACE}; overflow: hidden">
        <span data-part="guides" aria-hidden="true"
              style="position: absolute; inset: 16px; display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 8px">${columns}</span>

        <div style="position: relative; display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 8px; height: 100%; align-content: start">
          <span data-part="eyebrow"
                style="grid-column: 1 / span 2; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; line-height: 1">NEUE GRAFIK</span>
          <span style="grid-column: 4; font-size: 9px; font-weight: 400; letter-spacing: 0.08em; line-height: 1; text-align: left">Nr. 12</span>

          <span data-part="headline"
                style="grid-column: 1 / span 3; margin-top: 14px; font-size: 23px; font-weight: 700; letter-spacing: -0.025em; line-height: 1.04">
            Der Film<br>und die Form
          </span>

          <span data-part="numeral" aria-hidden="true"
                style="grid-column: 1 / span 2; margin-top: 6px; font-size: 88px; font-weight: 700; letter-spacing: -0.06em; line-height: 0.82">12</span>
          <p data-part="copy"
             style="grid-column: 3 / span 2; margin: 12px 0 0; font-size: 9.5px; font-weight: 400; line-height: 1.55; text-align: left">
            Sechs Abende, sechs Filme. Beginn zwanzig Uhr, Eintritt frei.
          </p>

          <span data-part="rule" style="grid-column: 1 / span 3; height: 7px; margin-top: 14px; background: ${RED}"></span>

          <span data-part="meta" style="grid-column: 1 / span 2; margin-top: 8px; font-size: 9px; font-weight: 400; line-height: 1.5">
            Kunstgewerbemuseum<br>Zürich
          </span>
          <span style="grid-column: 4; margin-top: 8px; font-size: 9px; font-weight: 700; color: ${RED}; line-height: 1.5">frei</span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 252px; margin: 0; text-align: center">
        Four columns, flush left, one red.
      </p>
    </div>
  `;
}
