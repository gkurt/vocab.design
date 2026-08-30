import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The container holds one box in every template, so only the regions inside it move. */
const GRID_W = 268;
const GRID_H = 184;

interface Template {
  key: string;
  label: string;
  columns: string;
  rows: string;
  /** One string per grid row: the picture the stylesheet draws. */
  areas: string[];
}

const TEMPLATES: Template[] = [
  {
    key: 'wide',
    label: 'wide',
    columns: '62px 1fr 58px',
    rows: '28px 1fr 1fr 24px',
    areas: ['head head head', 'nav  main side', 'nav  main side', 'foot foot foot'],
  },
  {
    key: 'medium',
    label: 'medium',
    columns: '74px 1fr',
    rows: '28px 1fr 1fr 24px',
    areas: ['head head', 'nav  main', 'nav  side', 'foot foot'],
  },
  {
    key: 'narrow',
    label: 'narrow',
    columns: '1fr',
    rows: '28px 1fr 40px 34px 24px',
    areas: ['head', 'main', 'side', 'nav', 'foot'],
  },
];

/** DOM order is fixed, and the badge on each region says so. */
const REGIONS: { area: string; label: string }[] = [
  { area: 'head', label: 'header' },
  { area: 'nav', label: 'nav' },
  { area: 'main', label: 'main' },
  { area: 'side', label: 'aside' },
  { area: 'foot', label: 'footer' },
];

const segment = (template: Template) => `
  <button class="sp-segment" type="button" data-part="seg-${template.key}" value="${template.key}" style="padding: 4px 10px; font-size: 11px">
    ${template.label}
  </button>`;

/** One region: its name, and the badge carrying its position in the document. */
const region = (entry: { area: string; label: string }, index: number) => `
  <div
    class="sp-surface"
    data-part="area-${entry.area}"
    style="display: flex; align-items: center; justify-content: center; gap: 6px; min-width: 0; overflow: hidden;
           grid-area: ${entry.area}; background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)"
  >
    <span class="sp-label" style="font-size: 11px; color: var(--sp-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${entry.label}</span>
    <span
      class="sp-avatar"
      data-part="order-${entry.area}"
      style="width: 16px; height: 16px; font-size: 10px; background: var(--sp-surface)"
    >${index + 1}</span>
  </div>`;

/**
 * Named grid areas specimen: one component's five regions, placed by name, with the
 * `grid-template-areas` block that produced them printed beside the layout.
 *
 * The subject is the grid container, since the template and the names belong to it and a single
 * region is just a box (SPEC §5). Every template is honestly the term, so no `data-pose` condition
 * is needed. The template listing and the picker are scenery in the context register.
 *
 * A caption under the layout narrated each template ("Three columns: nav, main and aside side by
 * side...", and one per pick), over a listing headed "On the container". Neither is anything the
 * component would print about itself, and the order badges already show that source order does not
 * follow the drawing, so both went and the frame is cut to the layout and its listing.
 *
 * The container holds one box across all three templates, so the regions rearrange inside it and
 * nothing outside moves; the listing's slot is reserved at the height of the tallest template
 * (SPEC §5). Each child's `grid-area` is written once at mount and never touched again, which is
 * the claim the specimen is making: only the container is restated. The badges carry document
 * order and never change, so a template that draws nav near the bottom visibly leaves the tab
 * order where the markup left it. Each segment names the template it produces (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = TEMPLATES[0] as Template;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">grid-template-areas</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="templates" data-value="${first.key}" data-axis="Layout">
            ${TEMPLATES.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; gap: 12px; flex: 0 0 auto; height: ${GRID_H}px">
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 164px; gap: 4px">
              <span
                class="sp-surface"
                data-part="listing"
                style="display: block; height: 130px; padding: 8px 10px; font-family: ui-monospace, monospace; font-size: 11px;
                       line-height: 1.55; color: var(--sp-ink); white-space: pre; overflow: hidden"
              ></span>
            </div>

            <div
              class="sp-grid"
              data-part="grid"
              data-subject
              data-template="${first.key}"
              style="flex: 0 0 auto; width: ${GRID_W}px; height: ${GRID_H}px; gap: 6px"
            >
              ${REGIONS.map(region).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const listing = part(root, 'listing');

  const apply = (key: string) => {
    const template = TEMPLATES.find((entry) => entry.key === key);
    if (!template) return;
    grid.dataset.template = template.key;
    grid.style.gridTemplateColumns = template.columns;
    grid.style.gridTemplateRows = template.rows;
    grid.style.gridTemplateAreas = template.areas.map((row) => `"${row}"`).join(' ');
    listing.textContent = template.areas.map((row) => `"${row}"`).join('\n');
  };

  part(root, 'templates').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply(first.key);
}
