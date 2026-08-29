import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox, localSize } from '#src/kit/measure.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * Both faces are real and both are checked at runtime rather than asserted: the
 * web font is the serif this site actually loads, and the stand-in is whatever
 * the reader's machine answers the fallback stack with. The tuning numbers below
 * are therefore measured off the two faces as they render here, which is exactly
 * what a fallback generator does before it writes the descriptors.
 */
const WEB = "'Source Serif 4 Variable', Georgia, serif";
const FALLBACK = "Georgia, 'Times New Roman', serif";

const HEADLINE = 'Metrics decide where the next line starts';
const SIZE = 30;
/** Room for the tallest arrangement, so the whole demonstration stays inside it (SPEC §5). */
const PAGE = 132;
/** A lane at the right for the measuring marks, so nothing is ever ruled through the text. */
const GUTTER = 56;

type Mode = 'web' | 'fallback' | 'tuned';

const IS_MODE = (value: string): value is Mode => value === 'web' || value === 'fallback' || value === 'tuned';

/**
 * Font metric override specimen: one headline set in the web font, in an untuned
 * fallback, and in the same fallback scaled and reshaped to occupy the web font's
 * space. The rule under the headline marks where the body sat with the real face,
 * so the untuned stand-in visibly drops the paragraph off it and the tuned one
 * puts it back. The shift is measured against that mark rather than declared.
 *
 * The layout shift is the term here, so it is contained: the page block holds the
 * room the tallest setting needs, and the picker, read-out and caption outside it
 * never move (SPEC §5).
 *
 * The subject is the headline, which is the text the descriptors reshape. Two of
 * the three settings are the problem rather than the term, so the honest condition
 * is declared in `data-pose` and the specimen mounts tuned (SPEC §6). A demo has
 * no stylesheet and so cannot ship an `@font-face` rule; the tuned setting applies
 * the same two corrections inline, a scaled size for `size-adjust` and a stated
 * line box for the ascent and descent overrides, and the caption says so.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Family" data-term="tuned" data-value="tuned" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-web" value="web">web font</button>
            <button class="sp-segment" data-part="seg-fallback" value="fallback">fallback</button>
            <button class="sp-segment" data-part="seg-tuned" value="tuned">tuned</button>
          </sp-segmented>
        </div>
        <div data-part="page" style="position: relative; height: ${PAGE}px; margin-top: 6px; padding-right: ${GUTTER}px">
          <h3 data-part="headline" data-subject data-mode="web" data-pose="[data-tuned]"
              style="margin: 0; font-family: ${WEB}; font-size: ${SIZE}px; line-height: normal; font-weight: 600">${HEADLINE}</h3>
          <p class="sp-text sp-context" data-part="body" style="margin: 10px 0 0; line-height: 19px">
            Everything under the headline is carried by it. The paragraph did not change; the line box
            above it did.
          </p>
          <span data-part="band" aria-hidden="true"
                style="position: absolute; right: 0; width: 46px; background: color-mix(in oklab, var(--sp-ink) 16%, transparent)"></span>
          <span data-part="guide" aria-hidden="true"
                style="position: absolute; right: 0; width: 46px; height: 3px; background: var(--sp-muted)"></span>
          <span data-part="mark" aria-hidden="true"
                style="position: absolute; right: 0; width: 46px; height: 3px; background: var(--sp-ink)"></span>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="height: 24px; margin-top: 4px">
          <span class="sp-chip" data-part="declaration" style="cursor: default"></span>
          <span class="sp-chip" data-part="shift" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The marks on the right are where the body sat with the real face, and where it sits now. With
          no stylesheet to hold an @font-face rule, the tuned setting states both corrections inline.
        </p>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const headline = part(root, 'headline');
  const body = part(root, 'body');
  const guide = part(root, 'guide');
  const mark = part(root, 'mark');
  const band = part(root, 'band');
  const declaration = part(root, 'declaration');
  const shift = part(root, 'shift');

  /** Where the body sits while the real face is in force: the mark everything is judged against. */
  const bodyTop = () => Math.round(localBox(body, page).top);

  // Mounted in the web-font state, so this reading is of the state on screen (AGENTS.md).
  const reference = bodyTop();
  guide.style.top = `${reference}px`;

  /**
   * What a fallback generator computes: how much wider the real face sets the same
   * string, and how tall its own line box is. Both come off a hidden copy of the
   * headline rather than from a table, since the stand-in is the reader's font.
   */
  const probe = page.ownerDocument.createElement('span');
  probe.setAttribute('aria-hidden', 'true');
  probe.textContent = HEADLINE;
  probe.style.cssText = `position: absolute; top: 0; left: 0; visibility: hidden; white-space: nowrap;
    font-size: ${SIZE}px; line-height: normal; font-weight: 600`;
  page.append(probe);
  const sizeOf = (family: string) => {
    probe.style.fontFamily = family;
    const box = localSize(probe);
    return { width: box.width, line: box.height };
  };
  const web = sizeOf(WEB);
  const stand = sizeOf(FALLBACK);
  probe.remove();

  const adjust = stand.width > 0 ? web.width / stand.width : 1;
  const percent = (adjust * 100).toFixed(1);

  const SETTINGS: Record<Mode, { family: string; size: number; line: string; read: string }> = {
    web: { family: WEB, size: SIZE, line: 'normal', read: 'the real face, no overrides' },
    fallback: { family: FALLBACK, size: SIZE, line: 'normal', read: 'the stand-in, no overrides' },
    tuned: { family: FALLBACK, size: SIZE * adjust, line: `${web.line.toFixed(1)}px`, read: `size-adjust: ${percent}%` },
  };

  const report = () => {
    const now = bodyTop();
    const moved = now - reference;
    mark.style.top = `${now}px`;
    band.style.top = `${Math.min(now, reference)}px`;
    band.style.height = `${Math.abs(moved)}px`;
    shift.textContent = moved === 0 ? 'shift: 0px' : `shift: ${moved > 0 ? '+' : ''}${moved}px`;
  };

  const apply = (value: string) => {
    if (!IS_MODE(value)) return;
    const setting = SETTINGS[value];
    headline.dataset.mode = value;
    flag(headline, 'data-tuned', value === 'tuned');
    headline.style.fontFamily = setting.family;
    headline.style.fontSize = `${setting.size.toFixed(2)}px`;
    headline.style.lineHeight = setting.line;
    declaration.textContent = setting.read;
    // A style write and a measurement never share a tick (AGENTS.md).
    clock.setTimeout(report, 0);
  };

  apply('tuned');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
