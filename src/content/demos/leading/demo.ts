import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const STEPS: Record<string, number> = { tight: 1.15, normal: 1.5, loose: 1.95 };

/**
 * Leading specimen: the same paragraph on three different rhythms, with the
 * rhythm itself drawn behind the text. The term names the space between the
 * lines, so the space is what the specimen makes visible.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Leading</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="normal">
            <button class="sp-segment" data-part="seg-tight" value="tight">1.15</button>
            <button class="sp-segment" data-part="seg-normal" value="normal">1.5</button>
            <button class="sp-segment" data-part="seg-loose" value="loose">1.95</button>
          </sp-segmented>
        </div>
        <p class="sp-prose sp-prose--ruled" data-part="prose" data-subject data-leading="normal"
           style="--sp-leading: 1.5; max-width: none; margin-top: 14px">
          Type sits on an invisible grid. Set the lines too close and the eye trips
          from one to the next; set them too far apart and the paragraph stops being
          a block of text and becomes a stack of separate lines.
        </p>
        <p class="sp-text sp-context" data-part="readout" style="margin-top: 10px">line-height: 1.5 · 13px type on 19.5px lines</p>
      </div>
    </div>
  `;

  const prose = part(root, 'prose');
  const readout = part(root, 'readout');
  part(root, 'segmented').addEventListener('change', (event) => {
    const name = (event as CustomEvent<string>).detail;
    const value = STEPS[name];
    if (!value) return;
    prose.style.setProperty('--sp-leading', String(value));
    prose.dataset.leading = name;
    readout.textContent = `line-height: ${value} · 13px type on ${(13 * value).toFixed(1)}px lines`;
  });
}
