import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const WORDS: Record<string, string> = { waffle: 'waffle', office: 'office', stiff: 'stiff' };

/**
 * Ligature specimen: one word set twice at a size where the fused glyph is
 * unmistakable, ligatures on beside ligatures off, with a segmented control
 * choosing which pair to look at. The control changes the word, never the
 * feature: switching the term off and on would make the script's state depend
 * on where it was interrupted (SPEC §8).
 *
 * The kit typeface fuses ff, ffi and ffl and leaves fi alone, so the specimen
 * shows the pairs it genuinely ligates rather than the textbook one it does not.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Ligatures</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Cluster" data-part="segmented" data-value="waffle">
            <button class="sp-segment" data-part="seg-waffle" value="waffle">ffl</button>
            <button class="sp-segment" data-part="seg-office" value="office">ffi</button>
            <button class="sp-segment" data-part="seg-stiff" value="stiff">ff</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 16px">
          <div class="sp-stack" style="gap: 6px; width: 180px">
            <span class="sp-label sp-context">liga on</span>
            <div data-part="lig-on" data-subject data-word="waffle"
                 style="font-size: 54px; line-height: 1.25; font-variant-ligatures: common-ligatures">waffle</div>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 180px">
            <span class="sp-label">liga off</span>
            <div data-part="lig-off"
                 style="font-size: 54px; line-height: 1.25; font-variant-ligatures: none">waffle</div>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          This face fuses ff, ffi and ffl. The textbook fi pair it leaves as two letters.
        </p>
      </div>
    </div>
  `;

  const on = part(root, 'lig-on');
  const off = part(root, 'lig-off');
  part(root, 'segmented').addEventListener('change', (event) => {
    const name = (event as CustomEvent<string>).detail;
    const word = WORDS[name];
    if (!word) return;
    on.dataset.word = name;
    on.textContent = word;
    off.textContent = word;
  });
}
