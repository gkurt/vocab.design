import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const STEPS: Record<string, number> = { tight: 1.15, normal: 1.5, loose: 1.95 };

/**
 * Leading specimen: the same paragraph on three different rhythms, with the
 * rhythm itself drawn behind the text. The term names the space between the
 * lines, so the space is what the specimen makes visible.
 *
 * The paragraph is ordinary body copy on purpose. It used to explain leading
 * ("Type sits on an invisible grid..."), which put the article's words inside the
 * specimen and gave a reader two things to read at once. Any prose sets on a
 * rhythm, so the sample says nothing about itself.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Leading</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Line height" data-part="segmented" data-value="normal">
            <button class="sp-segment" data-part="seg-tight" value="tight">1.15</button>
            <button class="sp-segment" data-part="seg-normal" value="normal">1.5</button>
            <button class="sp-segment" data-part="seg-loose" value="loose">1.95</button>
          </sp-segmented>
        </div>
        <p class="sp-prose sp-prose--ruled" data-part="prose" data-subject data-leading="normal"
           style="--sp-leading: 1.5; max-width: none; margin-top: 14px">
          The harbour master keeps the tide tables in a ledger by the window, and the
          ferry crews copy each morning's figures onto the board at the top of the
          slipway, where anyone arriving late can still read them from the quay.
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
