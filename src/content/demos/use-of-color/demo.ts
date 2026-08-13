import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const RED = '#d2453b';
const SERIES_A = '#2f7d5b';
const SERIES_B = '#c1443b';
const STRIPES = 'repeating-linear-gradient(45deg, rgb(255 255 255 / 0.62) 0 3px, transparent 3px 7px)';

const STATES = {
  redundant: {
    cues: 'Asterisk, underline, pattern',
    caption: 'Every difference is said twice, so none of it depends on telling one hue from another.',
  },
  hue: {
    cues: 'None. Hue is the only difference.',
    caption: 'The marks are gone and hue carries the meaning alone. This is the 1.4.1 failure.',
  },
} as const;

type Mode = keyof typeof STATES;

const BAR = 'width: 30px; border-radius: 3px 3px 0 0';
const SERIES_LABEL = 'width: 30px; text-align: center; font-size: 10px';

/**
 * Use of color specimen: three ordinary bits of interface, each of which says the same thing
 * twice. The required field is red and carries an asterisk, the link is accent-coloured and
 * underlined, the second chart series is red and striped with its bars named underneath. The
 * second state takes every one of those marks away and leaves the hue, which is exactly what
 * WCAG 1.4.1 forbids.
 *
 * The subject is the example region, the narrowest element that holds the coding the term is
 * about. The state control, the cue readout, and the caption are scenery (SPEC §5). The
 * failing state is a state the subject itself passes through, so the honest condition is
 * declared in `data-pose` and the mount state satisfies it: identify refuses to ring the
 * colour-only version, since a ring around it would point at the opposite of the term
 * (SPEC §6).
 *
 * Nothing is removed from the layout when a cue goes: the asterisk, the required word, and
 * the series labels are hidden in place, and the caption holds a fixed height, so switching
 * states moves nothing (SPEC §5). Each segment reaches its own state rather than flipping the
 * other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Coded with</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="redundant">
            <button class="sp-segment" data-part="seg-redundant" value="redundant">Colour plus a mark</button>
            <button class="sp-segment" data-part="seg-hue" value="hue">Colour only</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="example" data-subject data-pose="[data-mode=redundant]" data-mode="redundant"
             style="margin-top: 12px; padding: 12px 14px; display: flex; gap: 18px; align-items: flex-start">
          <div style="flex: 1 1 auto; min-width: 0">
            <div class="sp-row" style="gap: 4px; height: 16px">
              <span class="sp-text sp-text--ink" data-part="field-label" style="font-size: 12px">Work email</span>
              <span data-part="star" style="color: ${RED}; font-size: 12px; line-height: 1">*</span>
              <span data-part="required-word" style="color: ${RED}; font-size: 11px">required</span>
            </div>
            <div class="sp-input" style="margin-top: 5px; border-color: ${RED}; color: var(--sp-muted)">ada@</div>
            <p class="sp-text" style="margin: 10px 0 0; font-size: 12px">
              We only use it for <a href="#" data-part="link" data-cue="underline"
              style="color: var(--sp-accent); text-decoration: underline">delivery updates</a>.
            </p>
          </div>

          <div style="flex: 0 0 auto">
            <span class="sp-label" style="display: block">Deliveries</span>
            <div class="sp-row" style="gap: 10px; margin-top: 6px; height: 46px; align-items: flex-end">
              <span data-part="bar-a" style="${BAR}; height: 40px; background: ${SERIES_A}"></span>
              <span data-part="bar-b" style="${BAR}; height: 26px; background: ${SERIES_B}; background-image: ${STRIPES}"></span>
            </div>
            <div class="sp-row" data-part="series-labels" style="gap: 10px; margin-top: 4px; height: 14px">
              <span class="sp-text" style="${SERIES_LABEL}">Sent</span>
              <span class="sp-text" style="${SERIES_LABEL}">Late</span>
            </div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Second cue</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="redundant"
                style="font-size: 12px; white-space: nowrap">${STATES.redundant.cues}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" data-case="redundant"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${STATES.redundant.caption}</p>
      </div>
    </div>
  `;

  const example = part(root, 'example');
  const fieldLabel = part(root, 'field-label');
  const star = part(root, 'star');
  const requiredWord = part(root, 'required-word');
  const link = part(root, 'link');
  const barB = part(root, 'bar-b');
  const seriesLabels = part(root, 'series-labels');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  const apply = (mode: Mode) => {
    const marked = mode === 'redundant';
    example.dataset.mode = mode;
    // Hidden in place, never removed: the marks give their room back to nothing (SPEC §5).
    star.style.visibility = marked ? 'visible' : 'hidden';
    requiredWord.style.visibility = marked ? 'visible' : 'hidden';
    seriesLabels.style.visibility = marked ? 'visible' : 'hidden';
    // With the word gone, the colour-only build turns the label itself red, which is the
    // version this specimen is arguing with.
    fieldLabel.style.color = marked ? '' : RED;
    link.dataset.cue = marked ? 'underline' : 'hue';
    link.style.textDecoration = marked ? 'underline' : 'none';
    barB.style.backgroundImage = marked ? STRIPES : 'none';
    readout.dataset.state = mode;
    readout.textContent = STATES[mode].cues;
    caption.dataset.case = mode;
    caption.textContent = STATES[mode].caption;
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'hue' ? 'hue' : 'redundant');
  });
}
