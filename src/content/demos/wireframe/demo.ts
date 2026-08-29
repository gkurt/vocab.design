import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Convention = 'block' | 'image' | 'text';

/** The three drawing conventions, and what each one stands in for. */
const NOTES: Record<Convention, string> = {
  block: 'A grey block is a region of content. Something goes here; what goes here is not the argument yet.',
  image: 'A box with a cross drawn through it is a picture. Nobody has chosen which picture, or cropped it.',
  text: 'Ruled lines are text: one heavy line for a heading, a stack of short ones for a paragraph.',
};

const LABEL: Record<Convention, string> = { block: 'content block', image: 'image', text: 'text' };

/**
 * Wireframe specimen: one home screen drawn in the shorthand and nothing else. Grey
 * blocks where content goes, a crossed box for the picture, ruled lines for the words,
 * and no colour, typeface or copy decided anywhere in it.
 *
 * The subject is the drawing region: the term names the drawn screen itself, so the
 * window around it, the picker, the legend and the footnote are scenery in the context
 * register (SPEC §5). The drawing is greyscale by definition, which is what the stage's
 * identify control exists for, exactly as it does for a skeleton screen.
 *
 * The pick is a legend rather than a state of the screen: choosing a convention marks
 * every part drawn that way and names what it stands in for, which is the one thing a
 * still picture of grey blocks cannot say for itself. Each segment reaches an absolute
 * state rather than flipping one (SPEC §8), and the legend text sits in a box sized for
 * its longest line, so switching moves nothing (SPEC §5).
 *
 * The marker is a neutral dashed outline, never an accent: a colour drawn on a wireframe
 * would contradict the definition the specimen is demonstrating. No timers: both the
 * drawing and the legend are reached by a pick.
 */
const GREY = 'color-mix(in oklab, var(--sp-muted) 42%, transparent)';

export function mount(root: HTMLElement): void {
  const crossedBox = `
    <span data-part="image-box" data-conv="image"
          style="position: relative; display: block; height: 48px; border: 1.5px solid ${GREY}; border-radius: 3px">
      <svg viewBox="0 0 242 48" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true" style="display: block">
        <path d="M0 0 242 48M242 0 0 48" fill="none" stroke="${GREY}" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
      </svg>
    </span>`;

  const navBlock = (n: number) => `
    <span data-part="block-nav-${n}" data-conv="block"
          style="display: block; width: 26px; height: 9px; border-radius: 3px; background: var(--sp-line)"></span>`;

  const card = (n: number) => `
    <span data-part="block-card-${n}" data-conv="block"
          style="display: block; flex: 1 1 0; height: 38px; border-radius: 4px; background: var(--sp-line)"></span>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Home screen, structure only</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Convention" data-part="convention" data-value="block" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-block" value="block"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Blocks</button>
            <button class="sp-segment" type="button" data-part="seg-image" value="image"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Image</button>
            <button class="sp-segment" type="button" data-part="seg-text" value="text"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Text</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div data-part="drawing" data-subject
               style="display: flex; flex-direction: column; gap: 9px; flex: 0 0 auto; width: 262px; height: 189px;
                      padding: 10px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                      border-radius: var(--sp-radius)">
            <span class="sp-row" style="gap: 6px; height: 14px">
              <span data-part="block-logo" data-conv="block"
                    style="display: block; width: 34px; height: 13px; border-radius: 3px; background: var(--sp-line)"></span>
              <span class="sp-grow"></span>
              ${navBlock(1)}${navBlock(2)}${navBlock(3)}
            </span>
            ${crossedBox}
            <span data-part="text-heading" data-conv="text"
                  style="display: block; width: 118px; height: 11px; border-radius: 4px; background: ${GREY}"></span>
            <span class="sp-stack" style="gap: 5px">
              <span class="sp-line" data-part="text-line-1" data-conv="text"></span>
              <span class="sp-line" data-part="text-line-2" data-conv="text" style="width: 72%"></span>
            </span>
            <span class="sp-row" style="gap: 8px; margin-top: auto">
              ${card(1)}${card(2)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 7px">
            <span class="sp-label" data-part="legend-label" data-convention="block" style="font-size: 10px">
              Marked: ${LABEL.block}
            </span>
            <p class="sp-text" data-part="legend" data-convention="block"
               style="margin: 0; height: 74px; font-size: 11px; line-height: 1.35">${NOTES.block}</p>
            <span class="sp-divider"></span>
            <p class="sp-text" data-part="footnote" style="margin: 0; font-size: 10.5px; line-height: 1.35">
              No colour, no typeface, no copy. Everything drawn here can be moved in a minute, which is
              the only property that makes it worth drawing.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const legend = part(root, 'legend');
  const legendLabel = part(root, 'legend-label');
  const marks = [...part(root, 'drawing').querySelectorAll<HTMLElement>('[data-conv]')];

  const apply = (next: Convention) => {
    for (const el of marks) {
      const on = el.dataset.conv === next;
      flag(el, 'data-marked', on);
      el.style.outline = on ? '1.5px dashed var(--sp-ink)' : 'none';
      el.style.outlineOffset = on ? '2px' : '0';
    }
    legend.textContent = NOTES[next];
    legend.dataset.convention = next;
    legendLabel.textContent = `Marked: ${LABEL[next]}`;
    legendLabel.dataset.convention = next;
  };

  apply('block');

  part(root, 'convention').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    apply(value === 'image' ? 'image' : value === 'text' ? 'text' : 'block');
  });
}
