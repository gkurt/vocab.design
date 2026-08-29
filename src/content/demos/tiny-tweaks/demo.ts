import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The reserved box every viewport is centred in, so nothing outside it moves (SPEC §5). */
const CANVAS = 452;
const HEIGHT = 196;

interface Size {
  key: string;
  label: string;
  width: number;
  /** The three knobs, and the only three: type size, image height, side margin. */
  type: number;
  picture: number;
  margin: number;
}

const SIZES: Size[] = [
  { key: 'wide', label: 'wide', width: CANVAS, type: 14, picture: 74, margin: 30 },
  { key: 'medium', label: 'medium', width: 320, type: 13, picture: 60, margin: 18 },
  { key: 'narrow', label: 'narrow', width: 214, type: 11, picture: 46, margin: 10 },
];

const COPY = 'One column, three widths. The type steps, the picture shrinks, the margins close in.';

/**
 * Tiny tweaks specimen: one column of content in a viewport whose width is picked absolutely.
 * Across all three widths the arrangement is identical (picture, heading, copy, in that order,
 * one column) and only three numbers move: the type size, the picture's height, and the margin
 * on either side. The readout states all three, because the restraint is the pattern's whole
 * claim and the eye is bad at noticing a point of type.
 *
 * The subject is the column, `data-part="column"`. The viewport outline, the picker, the readout
 * and the caption are scenery in the context register. Every size keeps the same reserved canvas,
 * so the viewport never changes height and nothing outside it moves (SPEC §5).
 *
 * `data-flow` and the readout are measured, not declared: the demo reads the column's own
 * computed type size and side margin, and reads back whether the picture is still stacked above
 * the copy rather than beside it, which is the claim a reflow would break. Nothing here
 * transitions a size, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${CANVAS}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="sizes" data-axis="Width" data-value="wide">
          ${SIZES.map(
            (size) => `
            <button class="sp-segment" type="button" data-part="seg-${size.key}" value="${size.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${size.label}</button>`,
          ).join('')}
        </sp-segmented>
      </div>

      <div style="display: flex; justify-content: center; width: ${CANVAS}px; height: ${HEIGHT}px">
        <div
          data-part="viewport"
          style="display: flex; justify-content: center; width: ${CANVAS}px; height: ${HEIGHT}px; padding: 8px 0;
                 background: var(--sp-sunken); border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
        >
          <div
            data-part="column"
            data-subject
            data-flow="stacked"
            style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0; padding: 10px 12px;
                   background: var(--sp-surface); border-radius: 6px"
          >
            <div
              data-part="picture"
              style="flex: 0 0 auto; border-radius: 4px; background: linear-gradient(150deg, var(--sp-accent-soft), var(--sp-accent) 150%)"
            ></div>
            <div data-part="copy" style="display: flex; flex-direction: column; gap: 4px">
              <span data-part="headline" style="font-weight: 600; line-height: 1.3">Field notes</span>
              <span data-part="body" style="color: var(--sp-muted); line-height: 1.45">${COPY}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: ${CANVAS}px; justify-content: center; gap: 8px">
        ${['type', 'picture', 'margin']
          .map(
            (knob) => `
          <span
            data-part="val-${knob}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 112px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`,
          )
          .join('')}
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: ${CANVAS}px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const column = part(root, 'column');
  const picture = part(root, 'picture');
  const copy = part(root, 'copy');
  const headline = part(root, 'headline');
  const body = part(root, 'body');
  const note = part(root, 'note');
  const values = {
    type: part(root, 'val-type'),
    picture: part(root, 'val-picture'),
    margin: part(root, 'val-margin'),
  };

  const apply = (key: string) => {
    const next = SIZES.find((size) => size.key === key);
    if (!next) return;

    viewport.style.width = `${next.width}px`;
    viewport.style.paddingLeft = `${next.margin}px`;
    viewport.style.paddingRight = `${next.margin}px`;
    picture.style.height = `${next.picture}px`;
    headline.style.fontSize = `${next.type + 3}px`;
    body.style.fontSize = `${next.type}px`;

    // Read back on boxes nothing transitions: the numbers, and whether anything reflowed.
    const pictureBox = picture.getBoundingClientRect();
    const copyBox = copy.getBoundingClientRect();
    const stacked = pictureBox.bottom <= copyBox.top + 1;
    column.dataset.flow = stacked ? 'stacked' : 'side';
    const type = Math.round(Number.parseFloat(getComputedStyle(body).fontSize));
    const margin = Math.round(Number.parseFloat(getComputedStyle(viewport).paddingLeft));
    values.type.textContent = `type ${type}px`;
    values.picture.textContent = `picture ${Math.round(pictureBox.height)}px`;
    values.margin.textContent = `margins ${margin}px`;
    note.textContent = `${next.width}px: still one column, picture above copy, in that order.`;
  };

  part(root, 'sizes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('wide');
}
