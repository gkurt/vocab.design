import { localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The reserved page box, so removing a bar changes what fits and never what moves (SPEC §5). */
const PAGE_W = 420;
const PAGE_H = 184;
const BAR_H = 20;
const NAV_H = 34;
const ROW_H = 30;
const ROW_GAP = 4;
const ROWS = ['Admissions', 'Term dates', 'Fees and funding', 'Open days'];

const SIBLINGS = ['Library', 'Careers', 'Give'];
const SUBSITE = ['Courses', 'Research', 'People', 'News'];

/**
 * Universal navigation specimen: one subsite page, with and without the slim bar above its own
 * global navigation. With it, the parent organisation is named and its sibling sites are one
 * click away, and the page has two stacked navigations to get past. Without it, the twenty pixels
 * come back to the content and the route to the parent is gone. The content area is a fixed box
 * holding four rows, so the cost is legible rather than asserted: with the bar in place the fourth
 * row is cut off by the bottom of the page, and without it all four fit.
 *
 * The subject is the universal bar, `data-part="universal"`. It is the only element carrying the
 * kit accent, because the subsite's own nav, its content rows, the page outline, the picker and
 * the caption are all scenery in the context register, where accent goes chroma-free.
 *
 * `data-fold` and the readout are measured, not declared: the demo compares the content region's
 * scroll height with its own box and counts how many rows actually finish above the fold. Showing
 * or hiding a bar is not a transition, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 240px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Subsite page</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Universal bar" data-part="modes" data-value="with">
            <button class="sp-segment" type="button" data-part="seg-with" value="with"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">with bar</button>
            <button class="sp-segment" type="button" data-part="seg-without" value="without"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            data-part="page"
            style="display: flex; flex-direction: column; overflow: hidden; width: ${PAGE_W}px; height: ${PAGE_H}px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 5px"
          >
            <div
              data-part="universal"
              data-subject
              style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: ${BAR_H}px; padding: 0 8px;
                     background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
            >
              <span style="flex: 1 1 auto; min-width: 0; font-size: 9px; font-weight: 600; color: var(--sp-accent); white-space: nowrap">Northgate University</span>
              ${SIBLINGS.map(
                (site) => `<span style="flex: 0 0 auto; font-size: 9px; color: var(--sp-muted); white-space: nowrap">${site}</span>`,
              ).join('')}
            </div>

            <div
              data-part="global"
              class="sp-context"
              style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: ${NAV_H}px; padding: 0 8px;
                     border-bottom: 1px solid var(--sp-line)"
            >
              <span style="flex: 0 0 auto; font-size: 11px; font-weight: 600; white-space: nowrap">School of Marine Science</span>
              <span class="sp-grow"></span>
              ${SUBSITE.map(
                (item) =>
                  `<span class="sp-nav-item" style="flex: 0 0 auto; padding: 2px 5px; font-size: 10px; white-space: nowrap">${item}</span>`,
              ).join('')}
            </div>

            <div
              data-part="content"
              class="sp-context"
              data-fold="clipped"
              style="display: flex; flex-direction: column; gap: ${ROW_GAP}px; flex: 1 1 auto; min-height: 0; overflow: hidden;
                     padding: 8px; background: var(--sp-bg)"
            >
              ${ROWS.map(
                (label, i) => `
                <div
                  data-part="row-${i + 1}"
                  style="display: flex; align-items: center; flex: 0 0 auto; height: ${ROW_H}px; padding: 0 8px; border-radius: 5px;
                         background: var(--sp-surface); border: 1px solid var(--sp-line)"
                >
                  <span style="font-size: 10px; white-space: nowrap">${label}</span>
                </div>`,
              ).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: 452px; justify-content: center; gap: 8px">
        ${['bar', 'content', 'rows']
          .map(
            (knob) => `
          <span
            data-part="val-${knob}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 138px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`,
          )
          .join('')}
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const universal = part(root, 'universal');
  const content = part(root, 'content');
  const note = part(root, 'note');
  const rows = ROWS.map((_, i) => part(root, `row-${i + 1}`));
  const values = { bar: part(root, 'val-bar'), content: part(root, 'val-content'), rows: part(root, 'val-rows') };

  const apply = (key: string) => {
    const present = key === 'with';

    // Mount the page in the state it is about to be measured in (SPEC §5).
    flag(universal, 'hidden', !present);

    // Read back on boxes nothing transitions: what the content region got, and how much of it
    // actually finishes above the bottom of the page.
    const box = content.getBoundingClientRect();
    const whole = rows.filter((row) => row.getBoundingClientRect().bottom <= box.bottom + 1).length;
    content.dataset.fold = content.scrollHeight > content.clientHeight + 1 ? 'clipped' : 'clear';
    values.bar.textContent = present ? `universal bar ${BAR_H}px` : 'universal bar removed';
    values.content.textContent = `content ${Math.round(localSize(content).height)}px`;
    values.rows.textContent = `rows ${whole} of ${rows.length}`;
    note.textContent = present
      ? "Two bars: the parent org above, the subsite's own nav below."
      : 'Bar removed: 20px back, and no route to the parent org.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('with');
}
