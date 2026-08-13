/**
 * Retro-futurism specimen: a travel poster for a tomorrow imagined in about 1957. A
 * ringed planet, a finned rocket with a porthole, an atom with three orbits, sparkles,
 * and space age copy set in condensed capitals on cream stock, in the turquoise, coral,
 * and mustard of the period.
 *
 * The palette and every shape are stated inline because the anachronism is the term: the
 * point of the specimen is that the future it shows is drawn with a past decade's
 * materials. The branch specimens on this site (cassette futurism, synthwave) pick other
 * decades on purpose, so this one stays with the atomic age.
 *
 * Static: a poster has no states, so the specimen is looked at rather than watched.
 */
const PAPER = '#f2e6cb';
const INK = '#24363d';
const TEAL = '#2c7f8c';
const CORAL = '#e2643c';
const MUSTARD = '#e0a52c';
const DISPLAY = "'Trade Gothic', 'Oswald', 'Arial Narrow', var(--sp-font)";

function sparkle(x: number, y: number, size: number): string {
  return `
    <span aria-hidden="true" style="position: absolute; left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px">
      <span style="position: absolute; left: 50%; top: 0; width: 2px; height: 100%; margin-left: -1px; background: ${MUSTARD}"></span>
      <span style="position: absolute; top: 50%; left: 0; height: 2px; width: 100%; margin-top: -1px; background: ${MUSTARD}"></span>
    </span>`;
}

export function mount(root: HTMLElement): void {
  const orbits = [0, 60, 120]
    .map(
      (angle) =>
        `<span style="position: absolute; left: 0; top: 16px; width: 48px; height: 18px; border: 2px solid ${INK}; border-radius: 50%; transform: rotate(${angle}deg)"></span>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 250px; height: 246px; overflow: hidden; background: radial-gradient(120% 90% at 50% 18%, #f8f0dd 0%, ${PAPER} 70%); border: 2px solid ${INK}; color: ${INK}; font-family: ${DISPLAY}">

        <span data-part="planet" aria-hidden="true"
              style="position: absolute; right: 26px; top: 18px; width: 92px; height: 92px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #63c0c8 0%, ${TEAL} 58%, #17596a 100%)">
          <span data-part="ring" style="position: absolute; left: -24px; top: 28px; width: 140px; height: 40px; border: 3px solid ${CORAL}; border-radius: 50%; transform: rotate(-19deg)"></span>
        </span>

        <span data-part="rocket" aria-hidden="true" style="position: absolute; left: 28px; top: 22px; width: 40px; height: 112px; transform: rotate(-15deg)">
          <span style="position: absolute; left: 6px; top: 0; width: 28px; height: 96px; border-radius: 50% 50% 26% 26% / 38% 38% 10% 10%; background: linear-gradient(90deg, #fbf5e8 18%, #d9cdb4 68%, #b3a78e)"></span>
          <span style="position: absolute; left: 6px; top: 0; width: 28px; height: 24px; border-radius: 50% 50% 0 0 / 90% 90% 0 0; background: ${CORAL}"></span>
          <span style="position: absolute; left: 14px; top: 34px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid ${INK}; background: ${TEAL}"></span>
          <span style="position: absolute; left: -4px; bottom: 8px; width: 18px; height: 30px; background: ${CORAL}; clip-path: polygon(100% 0, 100% 100%, 0 100%)"></span>
          <span style="position: absolute; right: -4px; bottom: 8px; width: 18px; height: 30px; background: ${CORAL}; clip-path: polygon(0 0, 100% 100%, 0 100%)"></span>
          <span style="position: absolute; left: 13px; bottom: -14px; width: 14px; height: 18px; border-radius: 0 0 50% 50%; background: ${MUSTARD}"></span>
        </span>

        <span data-part="atom" aria-hidden="true" style="position: absolute; left: 88px; top: 92px; width: 48px; height: 48px">
          ${orbits}
          <span style="position: absolute; left: 20px; top: 21px; width: 8px; height: 8px; border-radius: 50%; background: ${CORAL}"></span>
        </span>

        ${sparkle(112, 20, 16)}
        ${sparkle(206, 126, 11)}

        <span data-part="rule" aria-hidden="true" style="position: absolute; left: 16px; right: 16px; top: 150px; height: 3px; background: ${INK}"></span>

        <div data-part="title"
             style="position: absolute; left: 16px; right: 16px; top: 158px; font-size: 20px; font-weight: 700; line-height: 1.08; letter-spacing: 0.05em; text-transform: uppercase">
          The world of tomorrow
        </div>

        <div data-part="foot"
             style="position: absolute; left: 16px; right: 16px; bottom: 12px; font-size: 8px; line-height: 1.5; letter-spacing: 0.26em; text-transform: uppercase; color: ${CORAL}">
          Atomic express . daily departures
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 250px; margin: 0; text-align: center">
        Atomic motifs, a finned rocket, a fair poster's palette: tomorrow, drawn in 1957.
      </p>
    </div>
  `;
}
