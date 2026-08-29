import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Type sizes, so a tracking value in ems can be reported in the pixels it lands as. */
const EYEBROW_SIZE = 11;
const HEADLINE_SIZE = 32;

interface Setting {
  /** Tracking on the caps eyebrow, in ems. */
  eyebrow: number;
  /** Tracking on the display line, in ems. */
  headline: number;
  note: string;
}

const TYPED: Setting = {
  eyebrow: 0,
  headline: 0,
  note: 'Both lines at the spacing the face itself was fitted with: the caps cramped, the headline loose.',
};

const TRACKED: Setting = {
  eyebrow: 0.16,
  headline: -0.02,
  note: 'The caps opened out by a sixth of their size, the headline pulled in by a fiftieth of its own.',
};

const SETTINGS: Record<string, Setting> = { typed: TYPED, set: TRACKED };

const em = (value: number) => (value === 0 ? '0' : `${value}em`);
const px = (value: number, size: number) => `${(value * size).toFixed(1)}px at ${size}px`;

/**
 * Tracking specimen: the pairing the craft actually turns up in, a small all-caps
 * eyebrow above a display line, with one uniform amount added to every letter of
 * the label and a smaller one taken away from every letter of the headline. The
 * segmented control picks an absolute setting rather than flipping one, and each
 * pick states the amount in ems beside the pixels that amount lands as, which is
 * the reason tracking is written in ems at all.
 *
 * The subject is the eyebrow, the run whose tracking the specimen is about: a
 * sixteen-hundredths-of-an-em correction on eleven-pixel capitals is the term at
 * a size where it can be seen, while two hundredths off a headline is the same
 * operation too quietly to ring. Tracking is a property of a run, so the run is
 * the narrowest honest element; the headline, the readouts and the caption are
 * the comparison and the instrumentation, and sit in the context register
 * (SPEC §5). One of the two settings is the uncorrected counter-example the
 * subject itself passes through, so the honest condition is declared in
 * `data-pose` and the specimen mounts on the corrected setting (SPEC §6).
 *
 * Both lines are left aligned inside a fixed block and set `nowrap`, so a run
 * that grows or shrinks moves nothing around it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = TRACKED;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One amount, every letter</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="set" data-axis="Spacing" data-term="set">
            <button class="sp-segment" data-part="seg-typed" value="typed">as typed</button>
            <button class="sp-segment" data-part="seg-set" value="set">tracked</button>
          </sp-segmented>
        </div>
        <div style="margin-top: 16px">
          <div style="height: 18px">
            <span data-part="eyebrow" data-subject data-track="set" data-pose="[data-track=set]"
                  style="display: inline-block; font-size: ${EYEBROW_SIZE}px; font-weight: 600; text-transform: uppercase;
                         line-height: 18px; white-space: nowrap; color: var(--sp-accent);
                         letter-spacing: ${em(start.eyebrow)}; transition: letter-spacing 0.3s var(--sp-ease)">Spring release</span>
          </div>
          <div class="sp-context" data-part="headline" data-track="set"
               style="margin-top: 2px; height: 40px; font-size: ${HEADLINE_SIZE}px; font-weight: 600; line-height: 40px;
                      white-space: nowrap; letter-spacing: ${em(start.headline)}; transition: letter-spacing 0.3s var(--sp-ease)">
            Everything in place
          </div>
        </div>
        <div class="sp-row sp-context" style="gap: 24px; margin-top: 14px; align-items: flex-start">
          <div class="sp-stack" style="gap: 3px; width: 194px">
            <span class="sp-label" data-part="value-eyebrow" style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
            <span class="sp-label" data-part="px-eyebrow" style="font-variant-numeric: tabular-nums"></span>
          </div>
          <div class="sp-stack" style="gap: 3px; width: 194px">
            <span class="sp-label" data-part="value-headline" style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
            <span class="sp-label" data-part="px-headline" style="font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 12px; height: 60px">
          <span data-part="note"></span> Every gap in the run moves by the same amount, stated as a fraction
          of the type size.
        </p>
      </div>
    </div>
  `;

  const eyebrow = part(root, 'eyebrow');
  const headline = part(root, 'headline');

  const apply = (value: string) => {
    const setting = SETTINGS[value];
    if (!setting) return;
    eyebrow.dataset.track = value;
    headline.dataset.track = value;
    eyebrow.style.letterSpacing = em(setting.eyebrow);
    headline.style.letterSpacing = em(setting.headline);
    part(root, 'value-eyebrow').textContent = `eyebrow, 11px caps: ${em(setting.eyebrow)}`;
    part(root, 'px-eyebrow').textContent = px(setting.eyebrow, EYEBROW_SIZE);
    part(root, 'value-headline').textContent = `headline, 32px: ${em(setting.headline)}`;
    part(root, 'px-headline').textContent = px(setting.headline, HEADLINE_SIZE);
    part(root, 'note').textContent = setting.note;
  };

  apply('set');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
