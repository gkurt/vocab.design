const LABEL = 'Shipping address';
const SIZE = 19;
/** The standard correction for capitals, which are drawn for mixed-case spacing. */
const TRACKING = '0.09em';

/**
 * All caps specimen: one label three ways. Mixed case keeps its outline, the
 * ascenders and descenders the eye matches a word by. The middle line is the same
 * label with `text-transform: uppercase` and nothing else, cramped because type is
 * spaced for lowercase. The bottom line adds the tracking capitals want, which is
 * the whole craft of the term.
 *
 * The subject is the tracked caps line. Caps as typed are the raw transform and
 * mixed case is what the reader is being compared against, so both are scenery
 * (SPEC §5). Nothing changes state, so there is no room to reserve. The sheet was
 * headed "One label, three settings", which describes the demonstration rather than
 * labelling any specimen, so only the size and the per-line settings are left.
 */
export function mount(root: HTMLElement): void {
  const row = (name: string, note: string, style: string, subject = false) => `
    <div class="sp-stack" style="gap: 3px; align-items: flex-start">
      <span class="sp-label sp-context">${note}</span>
      <span data-part="${name}"${subject ? ` data-subject data-tracking="${TRACKING}"` : ''}
            style="font-size: ${SIZE}px; font-weight: 600; ${style}">${LABEL}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="margin-left: auto">${SIZE}px</span>
        </div>
        <div class="sp-stack" style="gap: 12px; margin-top: 12px">
          <div class="sp-context">${row('sample-mixed', 'mixed case', 'text-transform: none')}</div>
          <div class="sp-context">${row('sample-tight', 'uppercase, default spacing', 'text-transform: uppercase')}</div>
          ${row('sample-tracked', `uppercase, letter-spacing: ${TRACKING}`, `text-transform: uppercase; letter-spacing: ${TRACKING}`, true)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The transform is one line of CSS. The spacing is the part people forget: capitals want more room.
        </p>
      </div>
    </div>
  `;
}
