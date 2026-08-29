/**
 * Art Nouveau specimen: a poster panel drawn as line. An arched frame with an organic
 * outer border, a stylised flower on a whiplash stem, tendrils curling into the corners,
 * and the title set along the arch itself rather than on a baseline, which is the part of
 * the style that is structural rather than decorative.
 *
 * The poster is the subject; the caption below it is scenery. The muted palette and the
 * drawn ornament are stated inline because they are this term's own claim, and the curves
 * are SVG because that is the only honest way to draw a whiplash line.
 *
 * Static: a poster has no states to watch.
 */
const SERIF = "'Bookman Old Style', 'Baskerville', 'Times New Roman', Georgia, serif";
const CREAM = '#efe6cf';
const PANEL = '#f7f0da';
const PLUM = '#6d3b52';
const SAGE = '#6f7d4a';
const GOLD = '#b98b3d';

export function mount(root: HTMLElement): void {
  // Petals vary rather than repeat: the ornament is drawn, not stamped.
  const petals = [
    { a: 4, rx: 8, ry: 18 },
    { a: 52, rx: 6.5, ry: 14 },
    { a: 96, rx: 8.5, ry: 19 },
    { a: 142, rx: 6, ry: 13 },
    { a: 186, rx: 8, ry: 17 },
    { a: 232, rx: 7, ry: 15 },
    { a: 274, rx: 8.5, ry: 19 },
    { a: 320, rx: 6.5, ry: 14 },
  ]
    .map(
      (p) =>
        `<ellipse cx="0" cy="${-(p.ry + 3)}" rx="${p.rx}" ry="${p.ry}" transform="rotate(${p.a})" fill="${SAGE}" fill-opacity="0.28" stroke="${SAGE}" stroke-width="1.2"/>`,
    )
    .join('');

  const leaf = (x: number, y: number, a: number) =>
    `<ellipse cx="${x}" cy="${y}" rx="11" ry="5" transform="rotate(${a} ${x} ${y})" fill="${SAGE}" fill-opacity="0.3" stroke="${SAGE}" stroke-width="1.1"/>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 234px; height: 244px; background: radial-gradient(120% 90% at 50% 20%, ${PANEL}, ${CREAM} 78%); overflow: hidden">

        <svg viewBox="0 0 234 244" width="234" height="244" aria-hidden="true" style="display: block">
          <defs>
            <path id="vd-nouveau-arc" d="M50 108 A67 67 0 0 1 184 108" fill="none"/>
          </defs>

          <rect x="8" y="8" width="218" height="228" rx="18" ry="18" fill="none" stroke="${GOLD}" stroke-width="1"/>

          <path data-part="frame" d="M30 212 L30 108 A87 87 0 0 1 204 108 L204 212"
                fill="${PANEL}" stroke="${PLUM}" stroke-width="2.5"/>
          <path d="M38 212 L38 108 A79 79 0 0 1 196 108 L196 212" fill="none" stroke="${GOLD}" stroke-width="1"/>
          <path d="M20 212 H214" stroke="${PLUM}" stroke-width="3" stroke-linecap="round"/>

          <text data-part="title" font-family="${SERIF}" font-size="15" letter-spacing="2.6" fill="${PLUM}">
            <textPath href="#vd-nouveau-arc" startOffset="50%" text-anchor="middle">MAISON VERTE</textPath>
          </text>

          <g data-part="stems" fill="none" stroke="${SAGE}" stroke-width="1.8" stroke-linecap="round">
            <path d="M48 208 C68 198 70 172 96 168 C120 164 112 196 138 198 C160 200 178 186 190 170"/>
            <path d="M117 168 C117 178 114 182 108 186"/>
            <path d="M138 198 C144 208 152 210 164 206"/>
          </g>
          <g data-part="leaves">
            ${leaf(76, 186, -42)}${leaf(150, 194, 22)}${leaf(176, 180, -34)}${leaf(60, 202, -16)}
          </g>

          <g data-part="flower" transform="translate(117 150)">
            ${petals}
            <circle r="11" fill="${GOLD}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1.2"/>
            <circle r="4" fill="${PLUM}"/>
          </g>

          <g fill="none" stroke="${GOLD}" stroke-width="1.2" stroke-linecap="round">
            <path d="M30 205 C16 200 14 184 26 181 C35 179 37 191 29 191"/>
            <path d="M204 205 C218 200 220 184 208 181 C199 179 197 191 205 191"/>
          </g>
        </svg>

        <span data-part="foot"
              style="position: absolute; left: 0; right: 0; bottom: 14px; text-align: center; font-family: ${SERIF};
                     font-size: 9px; letter-spacing: 0.28em; text-indent: 0.28em; color: ${PLUM}">PARIS MDCCCXCVIII</span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 234px; margin: 0; text-align: center">
        Whiplash stems, botanical line, lettering drawn to the arch.
      </p>
    </div>
  `;
}
