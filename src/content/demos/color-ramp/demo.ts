import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * One lightness and chroma curve, reused at every hue. Written in oklch precisely
 * because that is the argument for a ramp: the steps hold their perceived
 * lightness when the hue underneath them changes.
 */
const STEPS = [
  { step: '50', l: 0.97, c: 0.015 },
  { step: '100', l: 0.94, c: 0.03 },
  { step: '200', l: 0.88, c: 0.055 },
  { step: '300', l: 0.8, c: 0.085 },
  { step: '400', l: 0.71, c: 0.115 },
  { step: '500', l: 0.62, c: 0.14 },
  { step: '600', l: 0.54, c: 0.145 },
  { step: '700', l: 0.45, c: 0.13 },
  { step: '800', l: 0.36, c: 0.1 },
  { step: '900', l: 0.27, c: 0.07 },
];

const HUES: Record<string, number> = { slate: 255, indigo: 275, amber: 75 };

/**
 * Color ramp specimen: one hue at ten fixed lightness steps, and the roles a UI
 * pins to them. Switching hue repaints every swatch and leaves the numbering
 * exactly where it was, which is the whole reason the steps are numbered.
 *
 * The role line under the swatches is a palette page's own legend and reads like
 * one: it used to be written out as sentences ("100 fills a surface, 300 draws a
 * border..."), which is the article explaining the ramp rather than the palette
 * labelling itself.
 */
export function mount(root: HTMLElement): void {
  const swatches = STEPS.map(
    ({ step }) => `
      <div class="sp-stack" style="gap: 5px; flex: 1 1 0; min-width: 0">
        <div class="sp-swatch" data-part="tone-${step}" style="height: 46px"></div>
        <span class="sp-label" style="text-align: center; font-size: 10px">${step}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Palette</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Hue" data-part="segmented" data-value="slate">
            <button class="sp-segment" data-part="seg-slate" value="slate">Slate</button>
            <button class="sp-segment" data-part="seg-indigo" value="indigo">Indigo</button>
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="ramp" data-subject data-hue="slate" style="gap: 6px; margin-top: 14px; align-items: flex-start">
          ${swatches}
        </div>
        <p class="sp-text sp-context" data-part="roles" style="margin-top: 12px">
          100 Surface · 300 Border · 600 Accent · 900 Text
        </p>
      </div>
    </div>
  `;

  const ramp = part(root, 'ramp');
  const tones = STEPS.map((tone) => part(root, `tone-${tone.step}`));

  const paint = (name: string) => {
    const hue = HUES[name];
    if (hue === undefined) return;
    ramp.dataset.hue = name;
    tones.forEach((swatch, index) => {
      const tone = STEPS[index];
      if (tone) swatch.style.setProperty('--sp-swatch', `oklch(${tone.l} ${tone.c} ${hue})`);
    });
  };
  paint('slate');

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
