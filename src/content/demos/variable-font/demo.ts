import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SAMPLE = 'Handgloves';
const MIN = 100;
const MAX = 900;
const STOPS = ['300', '500', '800'];

/**
 * Variable font specimen: one line of text, one font file, and a weight axis the
 * picks move along. The marker under the sample is the point on the axis the
 * current value sits at, which is the part a list of separate files cannot draw.
 *
 * Verified against the stack this site actually loads: Geist Variable carries the
 * `wght` axis and nothing else, so the specimen claims weight only and the caption
 * says which registered axes this particular file does not ship. Claiming a width
 * axis here would be a screenshot of a fallback.
 *
 * The subject is the sample line: it is the design space made visible. The picker
 * and the axis rule are the demo's own instrumentation (SPEC §5) and stay in the
 * context register. The sample sits in a box of fixed height and starts at the
 * left, so a heavier setting grows to the right and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variation-settings: 'wght'</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="300">
            ${STOPS.map((v) => `<button class="sp-segment" data-part="seg-${v}" value="${v}">${v}</button>`).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: 50px; margin-top: 10px">
          <span data-part="sample" data-subject data-wght="300"
                style="font-size: 34px; line-height: 1.2; font-variation-settings: 'wght' 300">${SAMPLE}</span>
        </div>
        <div class="sp-stack sp-context" data-part="axis" style="gap: 5px">
          <div style="position: relative; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
            <span data-part="marker" style="position: absolute; top: 50%; left: 25%; width: 14px; height: 14px;
                  border-radius: 50%; background: var(--sp-accent); translate: -50% -50%; transition: left 0.28s var(--sp-ease)"></span>
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">${MIN} thin</span>
            <span class="sp-label" data-part="readout">wght 300</span>
            <span class="sp-label">${MAX} black</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px">
          One file answers every value on that line, not just the three picked here. This face ships the
          weight axis alone; width and optical size are registered axes it does not carry.
        </p>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const marker = part(root, 'marker');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    if (!STOPS.includes(value)) return;
    const weight = Number(value);
    sample.dataset.wght = value;
    sample.style.fontVariationSettings = `'wght' ${weight}`;
    marker.style.left = `${((weight - MIN) / (MAX - MIN)) * 100}%`;
    readout.textContent = `wght ${weight}`;
  };

  apply('300');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
