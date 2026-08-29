import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Setting = 'standard' | 'conspicuous';

/**
 * One offer, and the line that says what the headline left out, set two ways. Only the
 * first is the term: a qualifier moved up beside the claim and set at a size a reader
 * can hold is a conspicuous disclosure, which is the thing fine print is defined
 * against, so the subject declares the standard setting as its honest condition
 * (`data-pose`) and the switch names the same state to the reader (`data-term`).
 *
 * The subject is the qualifying LINE, the narrowest element the term names (SPEC §5).
 * The offer card, the segmented control and the caption are scenery, in the context
 * register.
 *
 * The two placements are two slots, each reserving the room the line takes, so picking
 * a treatment moves the line and nothing else: the claim, the button and the caption
 * hold their positions (SPEC §5). Placement is half of what the term is about, which is
 * why the line travels rather than merely restyling in place.
 */
const TREATMENT: Record<Setting, { size: string; color: string; caption: string }> = {
  standard: {
    size: '8.5px',
    color: 'color-mix(in oklab, var(--sp-muted) 52%, var(--sp-surface))',
    caption: 'Two sizes down, contrast dropped toward the ground, and set after the button. Present, and below the threshold of attention.',
  },
  conspicuous: {
    size: '12px',
    color: 'var(--sp-ink)',
    caption:
      'The same words, moved up beside the claim and set at a size a reader can hold: prominence, presentation, placement, proximity.',
  },
};

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 436px; padding: 12px 15px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="standard"
                        data-axis="Qualifier" data-term="standard">
            <button class="sp-segment" data-part="seg-standard" value="standard"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">As shipped</button>
            <button class="sp-segment" data-part="seg-conspicuous" value="conspicuous"
                    style="padding: 5px 10px; font-size: 12px; white-space: nowrap">Conspicuous</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 12px 14px">
          <div class="sp-context">
            <div style="font-size: 22px; font-weight: 650; line-height: 1.1; letter-spacing: -0.01em">Three months free</div>
            <div class="sp-text" style="margin-top: 4px">Pro, on us, on every device you own.</div>
          </div>

          <div data-part="slot-near" style="height: 26px; padding-top: 6px"></div>

          <div class="sp-row sp-context" style="margin-top: 2px">
            <button class="sp-button" type="button">Start free trial</button>
            <span class="sp-text" style="font-size: 11px">No card needed</span>
          </div>

          <div class="sp-divider sp-context" style="margin-top: 10px"></div>

          <div data-part="slot-foot" data-filled style="height: 26px; padding-top: 6px">
            <span class="sp-text" data-part="qualifier" data-subject data-set="standard" data-pose="[data-set=standard]"
                  style="display: block">Then $12 a month. Cancel any time before your renewal date.</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-set="standard"
           style="margin: 8px 0 0; height: 38px; font-size: 11px">${TREATMENT.standard.caption}</p>
      </div>
    </div>
  `;

  const qualifier = part(root, 'qualifier');
  const slots: Record<Setting, HTMLElement> = { conspicuous: part(root, 'slot-near'), standard: part(root, 'slot-foot') };
  const caption = part(root, 'caption');

  const apply = (set: Setting) => {
    const treatment = TREATMENT[set];
    qualifier.dataset.set = set;
    qualifier.style.fontSize = treatment.size;
    qualifier.style.color = treatment.color;
    slots[set].append(qualifier);
    for (const [name, slot] of Object.entries(slots)) {
      if (name === set) slot.setAttribute('data-filled', '');
      else slot.removeAttribute('data-filled');
    }
    caption.dataset.set = set;
    caption.textContent = treatment.caption;
  };

  apply('standard');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Setting);
  });
}
