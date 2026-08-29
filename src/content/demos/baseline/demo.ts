/*
 * A face with pronounced descenders, so the letters that hang below the line are
 * unmistakable at this size. The kit is sans-only on purpose (SPEC §5), and a
 * specimen about a vertical metric has to be set in a face whose metrics can be
 * seen: named families first, generic last.
 */
const FAMILY = "Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif";
/** The window's content width, so the ruling spans the specimen rather than the words. */
const RULE = 420;

/**
 * Baseline specimen: two sizes on one ruled line. The solid rule is the baseline,
 * drawn straight through the specimen so the descenders on `g` and `p` can be
 * seen crossing it, and both samples sit on it despite one being more than twice
 * the other's size. Below, in the scenery, the same pair with their boxes
 * centred instead: each keeps its own dashed baseline and the two no longer
 * agree, which is the alignment mistake the term exists to name.
 *
 * The rules are drawn without measuring anything. Each carrier is a zero-height
 * inline-block whose bottom edge lands on a baseline by inline layout, so the
 * ruling is where the font put the line rather than where the demo guessed it
 * (no read follows a style write, per SPEC §5).
 *
 * The subject is the ruled line. A baseline is a line shared by a row of text,
 * so the narrowest thing that shows one is that row with its rule on it; ringing
 * a single sample would claim the term names one piece of text.
 */
export function mount(root: HTMLElement): void {
  const carrier = (width: number, style: string) => `
    <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
      <span style="position: absolute; left: 0; bottom: 0; width: ${width}px; height: 0; border-top: ${style}"></span>
    </span>`;

  const sample = (name: string, text: string, size: number) => `
    <span data-part="${name}" style="font-family: ${FAMILY}; font-size: ${size}px; line-height: 1.3">${text}</span>`;

  /** Centred boxes: each sample carries its own baseline, and they drift apart. */
  const centred = (name: string, text: string, size: number, width: number) => `
    <span data-part="${name}" style="display: inline-block; vertical-align: middle; width: ${width}px;
          font-family: ${FAMILY}; font-size: ${size}px; line-height: 1.3">
      ${carrier(width, '1px dashed var(--sp-muted)')}${text}
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Two sizes, one line</span>
          <span class="sp-label">aligned on the baseline</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 8px; font-size: 0; white-space: nowrap">
          ${carrier(RULE, '1px solid var(--sp-accent)')}${sample('sample-small', 'Handgloves', 21)}&#8202;${sample('sample-large', 'Rpg', 52)}
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0 10px"></div>
        <div class="sp-context">
          <span class="sp-label">the same pair with their boxes centred</span>
          <div data-part="centred" style="margin-top: 4px; font-size: 0; white-space: nowrap">
            ${centred('centred-small', 'Handgloves', 22, 130)}${centred('centred-large', 'Rpg', 40, 110)}
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          Solid: the baseline both sizes sit on, descenders crossing below it. Dashed: each centred
          sample's own baseline, a few pixels apart.
        </p>
      </div>
    </div>
  `;
}
