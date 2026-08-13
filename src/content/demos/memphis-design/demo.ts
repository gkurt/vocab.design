/**
 * Memphis specimen: the Milan group's parts list on one poster card. A zigzag rule, a
 * squiggle, confetti dots, a striped lozenge, a terrazzo panel, and chalky pastels put
 * next to primaries that argue with them. No figures anywhere, which is the whole of
 * the difference between this and the flat illustration style that borrowed the name.
 *
 * Every colour and shape is stated inline because the palette is the term: the kit has
 * one accent on purpose and a style built on colours that clash cannot be made of it.
 * The decoration carries `aria-hidden`, since none of it means anything.
 *
 * Static: a pattern has no states, so the specimen is looked at rather than watched.
 */
const CREAM = '#fdf8ef';
const BLACK = '#14161a';
const PINK = '#f7a6c4';
const MINT = '#7fe0cf';
const YELLOW = '#ffe66d';
const LILAC = '#b8a1ea';
const RED = '#ff5a5f';
const BLUE = '#2f5de0';

const STRIPES = `repeating-linear-gradient(45deg, ${BLACK} 0 4px, ${CREAM} 4px 8px)`;

const FLECKS: [number, number, string, number][] = [
  [22, 18, BLACK, 3],
  [68, 12, BLUE, 2.5],
  [40, 40, RED, 2],
  [80, 46, BLACK, 2.5],
  [18, 62, LILAC, 3],
  [60, 74, BLACK, 2],
  [30, 88, BLUE, 2.5],
];

export function mount(root: HTMLElement): void {
  const terrazzo = FLECKS.map(
    ([x, y, colour, r]) => `radial-gradient(circle at ${x}% ${y}%, ${colour} ${r}px, transparent ${r + 0.6}px)`,
  ).join(', ');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 296px; height: 212px; background: ${CREAM}; border: 3px solid ${BLACK}; color: ${BLACK}; overflow: hidden">

        <svg data-part="zigzag" aria-hidden="true" viewBox="0 0 296 16" preserveAspectRatio="none"
             style="position: absolute; left: 0; top: 12px; width: 100%; height: 16px">
          <polyline points="0,13 16,3 32,13 48,3 64,13 80,3 96,13 112,3 128,13 144,3 160,13 176,3 192,13 208,3 224,13 240,3 256,13 272,3 288,13"
                    fill="none" stroke="${BLUE}" stroke-width="3.5" />
        </svg>

        <div data-part="title" style="position: absolute; left: 18px; top: 42px">
          <span style="display: inline-block; padding: 1px 7px; background: ${MINT}; font-size: 10px; font-weight: 700; letter-spacing: 0.22em">MILANO 1981</span>
          <div style="margin-top: 6px; font-size: 31px; font-weight: 800; letter-spacing: -0.03em; line-height: 1">MEMPHIS</div>
          <div style="margin-top: 2px; font-size: 11px; font-weight: 600; color: #5c574f">Laminate, not marble.</div>
        </div>

        <svg data-part="squiggle" aria-hidden="true" viewBox="0 0 140 34"
             style="position: absolute; left: 16px; bottom: 20px; width: 140px; height: 34px">
          <path d="M4 22 C 16 2, 30 2, 42 22 S 68 42, 80 22 S 106 2, 118 22 S 134 34, 136 26"
                fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" />
        </svg>

        <span data-part="terrazzo" aria-hidden="true"
              style="position: absolute; right: 18px; top: 40px; width: 76px; height: 104px; border: 3px solid ${BLACK}; border-radius: 38px 38px 6px 6px; background-color: ${YELLOW}; background-image: ${terrazzo}"></span>

        <span aria-hidden="true">
          <span data-part="stripes" style="position: absolute; right: 30px; bottom: 26px; width: 50px; height: 24px; border: 3px solid ${BLACK}; border-radius: 999px; background-image: ${STRIPES}"></span>
          <span style="position: absolute; left: 168px; bottom: 66px; width: 0; height: 0; border-left: 13px solid transparent; border-right: 13px solid transparent; border-bottom: 22px solid ${PINK}"></span>
          <span style="position: absolute; left: 150px; top: 44px; width: 14px; height: 14px; border-radius: 50%; background: ${RED}"></span>
          <span style="position: absolute; left: 172px; bottom: 34px; width: 10px; height: 10px; border-radius: 50%; background: ${BLUE}"></span>
          <span style="position: absolute; left: 186px; bottom: 12px; width: 11px; height: 11px; background: ${LILAC}; transform: rotate(45deg)"></span>
          <span style="position: absolute; left: 246px; top: 30px; width: 9px; height: 9px; border-radius: 50%; background: ${YELLOW}; box-shadow: 0 0 0 2px ${BLACK}"></span>
        </span>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 296px; margin: 0; text-align: center">
        Squiggle, zigzag, terrazzo, stripes, confetti. Pastels and primaries chosen to fight, and nobody drawn.
      </p>
    </div>
  `;
}
