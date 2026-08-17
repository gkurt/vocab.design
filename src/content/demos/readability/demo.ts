import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The kit's own face, named for the canvas that measures it. */
const FAMILY = "'Geist Variable', ui-sans-serif, system-ui, sans-serif";

const BODY =
  'Reading is not a matter of looking at letters one at a time. The eye moves along a line in short hops, ' +
  'taking three or four words at a stride, and at the end of every line it has to swing back and down to a ' +
  'starting point it has never actually looked at.';

/** Size, leading and measure moved together, because that is how a column is actually set. */
const SETTINGS: Record<string, { size: number; leading: number; measure: number; note: string }> = {
  dense: { size: 12, leading: 1.2, measure: 404, note: 'no room between the lines' },
  comfortable: { size: 13, leading: 1.65, measure: 330, note: 'inside the usual range' },
  airy: { size: 13, leading: 2.3, measure: 404, note: 'the block loses its grip' },
};

/** Room for the tallest of the three, so the readout and caption never move (SPEC §5). */
const SLOT = { w: 404, h: 132 };

/**
 * Characters per line, estimated from the face's own average advance rather than
 * from the layout: the whole sample is measured once on a canvas and divided by
 * its length, so the number is the width of a typical character in this text and
 * not the width of a zero. Nothing here reads layout, so no measurement follows a
 * style write (SPEC §5).
 */
function perLine(size: number, width: number): number {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return 0;
  ctx.font = `${size}px ${FAMILY}`;
  const advance = ctx.measureText(BODY).width / BODY.length;
  return advance > 0 ? Math.round(width / advance) : 0;
}

/**
 * Readability specimen: one paragraph of prose, set three ways. The segmented
 * control picks an absolute setting rather than flipping one, and every pick
 * moves size, measure and leading together, because a column is set with all
 * three at once. The read-out states what the pick actually produced.
 *
 * The subject is the paragraph. Readability is a property of a body of text, so
 * the narrowest honest ring is the text block itself; the slot around it, the
 * read-out and the caption are the demo's own instrumentation and stay in the
 * context register. The slot holds the room the tallest setting needs, so nothing
 * below the paragraph moves when the setting changes.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">The same paragraph</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="comfortable">
            <button class="sp-segment" data-part="seg-dense" value="dense">Dense</button>
            <button class="sp-segment" data-part="seg-comfortable" value="comfortable">Comfortable</button>
            <button class="sp-segment" data-part="seg-airy" value="airy">Airy</button>
          </sp-segmented>
        </div>
        <div data-part="slot" style="width: ${SLOT.w}px; height: ${SLOT.h}px; margin-top: 10px">
          <p class="sp-prose sp-text--ink" data-part="paragraph" data-subject data-setting="comfortable"
             style="margin: 0">${BODY}</p>
        </div>
        <div class="sp-row sp-context" data-part="readout"
             style="gap: 16px; height: 20px; white-space: nowrap; font-variant-numeric: tabular-nums"></div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 6px">
          Nothing about the typeface changed. Size, measure and leading did, and 45 to 75 characters a
          line is the guidance most typographers converge on rather than a rule.
        </p>
      </div>
    </div>
  `;

  const paragraph = part(root, 'paragraph');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const setting = SETTINGS[value];
    if (!setting) return;
    paragraph.dataset.setting = value;
    paragraph.style.fontSize = `${setting.size}px`;
    paragraph.style.setProperty('--sp-leading', String(setting.leading));
    paragraph.style.setProperty('--sp-measure', `${setting.measure}px`);
    readout.innerHTML = [`${perLine(setting.size, setting.measure)} characters a line`, `leading ${setting.leading}`, setting.note]
      .map((text) => `<span class="sp-label">${text}</span>`)
      .join('');
  };

  apply('comfortable');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
