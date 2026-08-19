import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The one number the primitive is made of, used for both axes so the claim is checkable. */
const GAP = 10;

const TAGS = ['harbour', 'tide tables', 'berth 4', 'winter', 'moorings and anchorages', 'RNLI'];

interface Width {
  key: string;
  label: string;
  width: number;
}

const WIDTHS: Width[] = [
  { key: 'narrow', label: 'narrow', width: 210 },
  { key: 'medium', label: 'medium', width: 300 },
  { key: 'wide', label: 'wide', width: 420 },
];

/**
 * Cluster specimen: ten tags of deliberately unequal widths in a wrapping row, with the
 * container's width picked absolutely so the same items rewrap into a different number of
 * lines without a breakpoint being involved.
 *
 * The subject is the cluster container, `data-part="cluster"`. Like the cover, this primitive
 * IS its container: the rule set (wrap, one gap, start alignment) belongs to the box, not to
 * any tag inside it (SPEC §5). The frame, the picker, the width ruler and the caption are
 * scenery in the context register.
 *
 * The gap is stated once and used on both axes, and the container's own tint is what makes the
 * vertical gaps legible: the even channel between wrapped lines is the part a margin-spaced row
 * gets wrong. How many lines the tags took is measured from their rendered positions and
 * published as `data-lines`, so an assert can prove the rewrap really happened rather than
 * taking the container's width as a proxy for it. Nothing here transitions a width, so the read
 * after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tags = TAGS.map(
    (tag, i) => `<span class="sp-chip" data-part="tag-${i}" style="cursor: default; background: var(--sp-surface)">${tag}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Container is</span>
          <sp-segmented class="sp-segmented" data-part="widths" data-value="narrow">
            ${WIDTHS.map(
              (width) => `
              <button class="sp-segment" type="button" data-part="seg-${width.key}" value="${width.key}" style="padding: 4px 11px; font-size: 11px">${width.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px">
          <div
            data-part="cluster"
            data-subject
            data-width="narrow"
            data-lines="0"
            style="display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-start; gap: ${GAP}px;
                   width: ${WIDTHS[0]?.width}px; padding: ${GAP}px; background: var(--sp-accent-soft); border-radius: var(--sp-radius)"
          >${tags}</div>

          <span class="sp-label sp-context" data-part="readout" role="status" style="height: 17px; font-size: 11px; line-height: 17px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>

      <span class="sp-text sp-context" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">
        One gap on both axes: the channel between lines is the gap between neighbours.
      </span>
    </div>
  `;

  const cluster = part(root, 'cluster');
  const readout = part(root, 'readout');
  const tagEls = TAGS.map((_, i) => part(root, `tag-${i}`));

  const apply = (key: string) => {
    const width = WIDTHS.find((entry) => entry.key === key);
    if (!width) return;
    cluster.style.width = `${width.width}px`;
    cluster.dataset.width = width.key;
    // Read back on a box nothing transitions: the number of lines the tags actually took is
    // the claim, so it is counted from where they landed rather than predicted.
    const lines = new Set(tagEls.map((tag) => Math.round(tag.offsetTop))).size;
    cluster.dataset.lines = String(lines);
    readout.textContent = `${width.width}px wide, ${TAGS.length} tags, ${lines} lines, gap ${GAP}px`;
  };

  part(root, 'widths').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('narrow');
}
