import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Measured in the browser before authoring, exactly as the round's other
 * typography specimens were: no face this site loads or this machine carries
 * exposes a colour palette. `font-palette: dark` against Apple Color Emoji is
 * pixel-for-pixel identical to `font-palette: normal`, because a bitmap emoji
 * face has no palettes to pick from, and no COLRv1 text face is installed. So
 * the layered glyph is DRAWN, as three copies of the same character in the same
 * face stacked and painted separately: the three copies stand for the font's own
 * colour layers, and the switch stands for `font-palette` choosing between two
 * palettes the family shipped. A caption under the samples used to admit all of
 * that to the reader ("No face here carries a palette, so the layers are drawn as
 * three painted copies..."), which is a note about how the specimen was made
 * rather than anything a type specimen prints, so it lives here now instead.
 *
 * What is real beside the drawing is the emoji: a glyph on this machine whose
 * colours genuinely live in the font, and which genuinely exposes no palette.
 */
const GLYPH = '&';
const SIZE = 78;
/** How far the back layer sits behind the fill, in px at the sample size. */
const EXTRUDE = 7;

type Palette = { key: string; name: string; layers: [string, string, string]; read: string };

const PALETTES: Palette[] = [
  { key: 'sunrise', name: '--sunrise', layers: ['#8a3413', '#e2662b', '#ffcb52'], read: 'font-palette: --sunrise' },
  { key: 'dusk', name: '--dusk', layers: ['#1d2a63', '#4570db', '#79dfe8'], read: 'font-palette: --dusk' },
];

const LAYER_NAMES = ['0', '1', '2'];

/**
 * Colour font specimen: the same glyph drawn once as a silhouette in one ink and
 * once as a stack of three painted layers, with a picker that swaps the palette
 * the layers read their colours from.
 *
 * The subject is the colour glyph (SPEC §5), the narrowest element the term
 * names: not the row it sits in and not the window, but the stacked drawing whose
 * colours come from the font rather than from `color`. Both palettes are honest
 * states of it, so it needs no `data-pose`. The one-ink copy beside it, the
 * palette swatches and the real emoji are the demo's own instrumentation and stay
 * in the context register, each labelled as the sample it is (Monochrome, Layered,
 * Emoji) rather than with the point the article makes about it.
 *
 * Nothing is measured and nothing moves: the two upper layers are absolutely
 * positioned against the in-flow fill, so a palette swap repaints and never
 * reflows (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const layer = (index: number, style: string) => `<span data-part="layer-${index}" style="${style}">${GLYPH}</span>`;

  const swatch = (index: number) => `
    <span class="sp-row" style="gap: 4px; flex: 0 0 auto">
      <span class="sp-swatch" data-part="swatch-${index}"
            style="width: 22px; height: 12px; --sp-swatch: ${PALETTES[0]?.layers[index]}"></span>
      <span class="sp-label" style="white-space: nowrap">${index}</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="font-palette" data-value="sunrise">
            ${PALETTES.map((p) => `<button class="sp-segment" data-part="seg-${p.key}" value="${p.key}">${p.name}</button>`).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="row" style="gap: 16px; align-items: flex-end; height: 108px; margin-top: 10px">
          <span class="sp-stack sp-context" style="gap: 4px; align-items: center; flex: 0 0 124px">
            <span data-part="flat" style="font-size: ${SIZE}px; line-height: 1; font-weight: 700; color: var(--sp-ink)">${GLYPH}</span>
            <span class="sp-label" style="white-space: nowrap">Monochrome</span>
          </span>
          <span class="sp-stack" style="gap: 4px; align-items: center; flex: 0 0 124px">
            <span data-part="glyph" data-subject data-palette="sunrise"
                  style="position: relative; display: inline-block; line-height: 1; font-weight: 700;
                         font-size: ${SIZE}px; padding: 0 ${EXTRUDE}px ${EXTRUDE}px 0">
              ${layer(0, `position: absolute; left: ${EXTRUDE}px; top: ${EXTRUDE}px; color: ${PALETTES[0]?.layers[0]}`)}
              ${layer(1, `position: relative; color: ${PALETTES[0]?.layers[1]}`)}
              ${layer(2, `position: absolute; left: 0; top: 0; color: ${PALETTES[0]?.layers[2]}; clip-path: inset(0 0 54% 0)`)}
            </span>
            <span class="sp-label sp-context" data-part="glyph-label" style="white-space: nowrap">Layered</span>
          </span>
          <span class="sp-stack sp-context" style="gap: 4px; align-items: center; flex: 0 0 124px">
            <span data-part="emoji" style="font-size: 40px; line-height: 1">&#x1F3A8;</span>
            <span class="sp-label" style="white-space: nowrap">Emoji</span>
          </span>
        </div>
        <div class="sp-row sp-context" data-part="swatches" style="gap: 10px; height: 30px">
          <span class="sp-label" style="white-space: nowrap">layers</span>
          ${LAYER_NAMES.map((_, i) => swatch(i)).join('')}
          <span class="sp-chip" data-part="readout"
                style="cursor: default; margin-left: auto; white-space: nowrap; flex: 0 0 auto">${PALETTES[0]?.read ?? ''}</span>
        </div>
      </div>
    </div>
  `;

  const glyph = part(root, 'glyph');
  const layers = [0, 1, 2].map((i) => part(root, `layer-${i}`));
  const swatches = [0, 1, 2].map((i) => part(root, `swatch-${i}`));
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const palette = PALETTES.find((p) => p.key === value);
    if (!palette) return;
    glyph.dataset.palette = palette.key;
    palette.layers.forEach((color, i) => {
      const el = layers[i];
      if (el) el.style.color = color;
      swatches[i]?.style.setProperty('--sp-swatch', color);
    });
    readout.textContent = palette.read;
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
