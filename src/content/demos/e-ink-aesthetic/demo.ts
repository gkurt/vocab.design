/**
 * E-ink specimen: a reader held open at a page, with the two things that make the look
 * unmistakable exhibited beside it. The screen is warm paper grey rather than white, the
 * text is one ink colour, structure is carried by hairlines, and the illustration is a
 * 1-bit ordered dither because the panel has no tones to shade with. The footer counts
 * pages rather than offering a scrollbar.
 *
 * The dither is computed rather than drawn: an image function sampled on a 4px grid and
 * thresholded against a 4x4 Bayer matrix, which is the algorithm a real reader applies,
 * so the pattern is the term's own rather than a texture that resembles it.
 *
 * The paint is stated inline because it is the term. The kit's neutrals are cool and its
 * surface is white, and an e-ink page that was either of those would be demonstrating
 * something else.
 *
 * The subject is the screen, not the device: the term names the page of reflective ink,
 * while the bezel, the page keys, the ghosting exhibit, the grey ramp, and the caption
 * are the scenery that explains it (SPEC §5). Each exhibit used to carry a sentence
 * under it ("A partial refresh leaves the page before faintly showing through." and
 * "Four steps, so pictures are dithered."), which was the site captioning its own
 * pictures inside the frame; the pictures show both, and the article says both, so the
 * two exhibits are drawn a little larger instead and the column is centred beside the
 * device. The grey ramp is labelled "Grey levels" rather than "Greys on hand". Static: a panel that redraws twice a
 * minute has nothing to animate.
 */
const PAPER = '#e9e7e0';
const INK = '#191813';
const RULE = '#c9c6bd';
const FAINT = '#c3c0b7';
const DIM = '#6d6a62';
const BEZEL = '#2f2e2b';
const KEY = '#48463f';

const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";

const ART_W = 160;
const ART_H = 76;
const CELL = 4;

/** Ordered dither threshold map, read row-major. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** A peak of the given height and width, centred on x. */
const peak = (x: number, at: number, width: number, height: number) => height * Math.max(0, 1 - Math.abs(x - at) / width);

/** How much ink a point of the illustration wants, before the panel refuses to give it. */
function ink(x: number, y: number): number {
  const far = 50 - peak(x, 70, 34, 9) - peak(x, 18, 22, 6);
  const near = 62 - peak(x, 44, 30, 16) - peak(x, 112, 34, 22);
  if (y > near) return 0.95;
  if (y > far) return 0.45;

  const moon = Math.hypot(x - 120, y - 16);
  if (moon < 13) {
    if (Math.hypot(x - 115, y - 12) < 4.5) return 0.32;
    return 0.03 + 0.18 * (moon / 13) ** 3;
  }

  const halo = moon < 23 ? 0.11 * (1 - (moon - 13) / 10) : 0;
  return Math.max(0, 0.42 * (1 - y / 54) - halo) + 0.04;
}

/** One path of hard 4px cells: every tone in the picture spelled as presence or absence. */
function dither(): string {
  const cells: string[] = [];
  for (let row = 0; row * CELL < ART_H; row++) {
    for (let col = 0; col * CELL < ART_W; col++) {
      const x = col * CELL;
      const y = row * CELL;
      const threshold = ((BAYER[(row % 4) * 4 + (col % 4)] ?? 0) + 0.5) / 16;
      if (ink(x + CELL / 2, y + CELL / 2) > threshold) cells.push(`M${x} ${y}h${CELL}v${CELL}h-${CELL}z`);
    }
  }
  return cells.join('');
}

/** A line of type as texture, in whichever ink the page still has for it. */
function bar(top: number, width: number, paint: string, height: number): string {
  return `
    <span aria-hidden="true"
          style="position: absolute; left: 0; top: ${top}px; width: ${width}%; height: ${height}px; background: ${paint}"></span>`;
}

function level(value: string, name: string): string {
  return `
    <span class="sp-stack" style="flex: 1 1 0; gap: 3px; align-items: center">
      <span aria-hidden="true" style="width: 100%; height: 26px; background: ${value}; border: 1px solid ${RULE}"></span>
      <span class="sp-label" style="font-size: 9px">${name}</span>
    </span>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-row" style="align-items: stretch; gap: 12px">

        <div data-part="device"
             style="flex: 0 0 auto; width: 206px; padding: 11px 11px 0; background: ${BEZEL}; border-radius: 10px">

          <div data-part="screen" data-subject
               style="display: flex; flex-direction: column; width: 184px; height: 218px; padding: 10px 11px 8px;
                      background: ${PAPER}; color: ${INK}; border: 1px solid #cfccc3">

            <span data-part="running-head"
                  style="font-size: 7.5px; letter-spacing: 0.16em; text-indent: 0.16em; color: ${DIM}">THE WEATHER MACHINE</span>
            <span aria-hidden="true" style="height: 1px; margin: 5px 0 8px; background: ${RULE}"></span>

            <svg data-part="art" viewBox="0 0 ${ART_W} ${ART_H}" width="162" height="${ART_H}" aria-hidden="true"
                 shape-rendering="crispEdges" style="display: block; flex: 0 0 auto; margin: 0 -1px">
              <path d="${dither()}" fill="${INK}"/>
            </svg>

            <span data-part="headline" style="margin-top: 9px; font-family: ${SERIF}; font-size: 13px; font-weight: 700">
              Chapter Three
            </span>
            <p data-part="body"
               style="height: 46px; margin: 5px 0 0; overflow: hidden; font-family: ${SERIF}; font-size: 8.5px;
                      line-height: 1.75; text-align: justify">
              It had been running since before the town had a name, and nobody now alive remembered switching it on.
            </p>

            <span aria-hidden="true" style="height: 1px; margin-top: auto; background: ${RULE}"></span>
            <span class="sp-row sp-row--between" data-part="pager" style="margin-top: 5px; font-size: 8px; color: ${DIM}">
              <span>Paged</span><span data-part="folio">37 of 214</span>
            </span>
          </div>

          <div class="sp-row sp-row--between sp-context" data-part="keys" style="padding: 6px 2px 7px">
            <span aria-hidden="true" style="width: 34px; height: 8px; border-radius: 4px; background: ${KEY}"></span>
            <span aria-hidden="true" style="width: 34px; height: 8px; border-radius: 4px; background: ${KEY}"></span>
          </div>
        </div>

        <div class="sp-stack sp-context" style="flex: 0 0 214px; gap: 10px; justify-content: center">

          <div class="sp-surface" data-part="ghost-exhibit" style="padding: 9px 10px 10px">
            <span class="sp-label" style="display: block">Refresh ghosting</span>
            <div data-part="ghost-screen"
                 style="position: relative; height: 72px; margin-top: 6px; padding: 7px 8px; overflow: hidden;
                        background: ${PAPER}; border: 1px solid ${RULE}">
              <span data-part="ghost-residue" aria-hidden="true" style="position: absolute; left: 8px; right: 8px; top: 7px; height: 44px">
                ${bar(8, 72, FAINT, 3)}${bar(19, 96, FAINT, 3)}${bar(30, 61, FAINT, 3)}${bar(41, 88, FAINT, 3)}
              </span>
              <span data-part="ghost-page" aria-hidden="true" style="position: absolute; left: 8px; right: 8px; top: 7px; height: 44px">
                ${bar(2, 100, INK, 4)}${bar(13, 92, INK, 4)}${bar(24, 97, INK, 4)}${bar(35, 46, INK, 4)}
              </span>
            </div>
          </div>

          <div class="sp-surface" data-part="levels" style="padding: 9px 10px 10px">
            <span class="sp-label" style="display: block">Grey levels</span>
            <div class="sp-row" style="gap: 6px; margin-top: 6px">
              ${level(PAPER, 'Paper')}${level('#b3b0a8', 'Light')}${level('#6b6961', 'Dark')}${level(INK, 'Ink')}
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 432px; margin: 0; text-align: center">
        Reflective ink, not light: warm ground, one ink colour, hairlines instead of shadows, pages instead of scrolling.
      </p>
    </div>
  `;
}
