import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Palette = {
  skin: string;
  shirt: string;
  pants: string;
  blobA: string;
  blobB: string;
  prop: string;
  detail: string;
};

/** The same drawing in three brand palettes, which is most of what the style is for
 *  and most of what the backlash was about. */
const PALETTES = {
  coral: { skin: '#8b7cf0', shirt: '#f4705c', pants: '#2b2d6b', blobA: '#ffe0b3', blobB: '#b7e5d3', prop: '#ffffff', detail: '#2b2d6b' },
  mint: { skin: '#3fb59a', shirt: '#f2c14e', pants: '#1f3a5f', blobA: '#d5e9ff', blobB: '#ffd6e0', prop: '#ffffff', detail: '#1f3a5f' },
  plum: { skin: '#e0745f', shirt: '#7b3fa0', pants: '#f2a541', blobA: '#f3d9f7', blobB: '#cdeac0', prop: '#ffffff', detail: '#4a2159' },
} satisfies Record<string, Palette>;

type PaletteName = keyof typeof PALETTES;
type Tone = keyof Palette;

/**
 * Corporate Memphis specimen: the illustration is the subject and the hero copy around
 * it is scenery, since the term names the drawing rather than the layout it landed in.
 * Every tell is in the geometry: no face, arms longer than the body and bent as curves
 * instead of at joints, no hands, a prop scaled far past life size, skin in whatever
 * colour the palette needed, flat fills throughout.
 *
 * The picker repaints from a brand palette rather than toggling one (SPEC §8). Only
 * fills change, so the drawing holds exactly still while its brand does not.
 */
export function mount(root: HTMLElement): void {
  const start = PALETTES.coral;

  root.innerHTML = `
    <div class="sp-app" style="gap: 12px">
      <div class="sp-surface" style="display: flex; align-items: center; gap: 14px; width: 424px; padding: 16px">
        <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px">
          <div class="sp-heading" style="font-size: 17px; line-height: 1.25">Payments that just work</div>
          <p class="sp-text" style="margin: 0">One integration, every currency your customers already use.</p>
          <button class="sp-button sp-button--sm" type="button" style="align-self: flex-start; margin-top: 4px">Start free</button>
        </div>

        <div data-part="illustration" data-subject data-palette="coral" style="flex: 0 0 auto; width: 202px; height: 148px">
          <svg viewBox="0 0 240 170" width="202" height="148" role="img" aria-label="Flat illustration of a figure leaning on an oversized card">
            <ellipse data-tone="blobA" data-paint="fill" cx="152" cy="82" rx="76" ry="68" fill="${start.blobA}"/>
            <circle data-tone="blobB" data-paint="fill" cx="52" cy="122" r="32" fill="${start.blobB}"/>

            <g transform="rotate(-8 176 62)">
              <rect data-tone="prop" data-paint="fill" x="150" y="24" width="64" height="76" rx="11" fill="${start.prop}"/>
              <rect data-tone="shirt" data-paint="fill" x="161" y="38" width="30" height="7" rx="3.5" fill="${start.shirt}"/>
              <rect data-tone="detail" data-paint="fill" x="161" y="53" width="42" height="5" rx="2.5" fill="${start.detail}"/>
              <rect data-tone="detail" data-paint="fill" x="161" y="65" width="34" height="5" rx="2.5" fill="${start.detail}"/>
            </g>

            <path data-tone="pants" data-paint="stroke" d="M102 114C94 136 90 150 96 162" fill="none" stroke="${start.pants}" stroke-width="11" stroke-linecap="round"/>
            <path data-tone="pants" data-paint="stroke" d="M113 114C127 136 131 148 125 162" fill="none" stroke="${start.pants}" stroke-width="11" stroke-linecap="round"/>
            <path data-tone="shirt" data-paint="stroke" d="M106 66C98 88 100 106 106 118" fill="none" stroke="${start.shirt}" stroke-width="27" stroke-linecap="round"/>
            <path data-tone="skin" data-paint="stroke" d="M106 80C88 100 76 118 84 136" fill="none" stroke="${start.skin}" stroke-width="9" stroke-linecap="round"/>
            <path data-tone="skin" data-paint="stroke" d="M108 78C138 88 166 76 182 56" fill="none" stroke="${start.skin}" stroke-width="9" stroke-linecap="round"/>
            <circle data-tone="skin" data-paint="fill" cx="106" cy="46" r="16" fill="${start.skin}"/>
            <path data-tone="pants" data-paint="fill" d="M90 45a16 16 0 0 1 32 0c-5-11-27-11-32 0z" fill="${start.pants}"/>

            <path data-tone="blobB" data-paint="stroke" d="M34 150C34 128 44 116 58 110" fill="none" stroke="${start.blobB}" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="palette" data-axis="Brand palette" data-value="coral">
          <button class="sp-segment" data-part="pal-coral" value="coral">Coral</button>
          <button class="sp-segment" data-part="pal-mint" value="mint">Mint</button>
          <button class="sp-segment" data-part="pal-plum" value="plum">Plum</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const illustration = part(root, 'illustration');

  part(root, 'palette').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    const name = (value in PALETTES ? value : 'coral') as PaletteName;
    const palette = PALETTES[name];
    for (const shape of illustration.querySelectorAll<SVGElement>('[data-tone]')) {
      const tone = shape.dataset.tone as Tone | undefined;
      if (!tone || !(tone in palette)) continue;
      shape.setAttribute(shape.dataset.paint === 'stroke' ? 'stroke' : 'fill', palette[tone]);
    }
    illustration.dataset.palette = name;
  });
}
