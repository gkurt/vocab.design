import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const GAP = 6;
const PAD = 8;
/** The viewport outline is a real 2px edge, so it comes out of the room the blocks get. */
const EDGE = 2;
/** The reserved box every viewport is centred in, so nothing outside it moves (SPEC §5). */
const CANVAS = 420;
const VIEW_H = 176;
const INNER_H = VIEW_H - 2 * PAD - 2 * EDGE;

interface Plan {
  key: string;
  label: string;
  width: number;
  /** The composition itself: one area map per size, which is the pattern's whole claim. */
  areas: string;
  columns: string;
  rows: string;
  /** The same map at thumbnail scale, so the three plans can be compared at a glance. */
  thumbColumns: string;
  thumbRows: string;
  note: string;
}

const PLANS: Plan[] = [
  {
    key: 'wide',
    label: 'wide',
    width: CANVAS,
    areas: "'nav nav nav' 'promo main main' 'promo list list' 'foot foot foot'",
    columns: '104px 1fr 1fr',
    rows: '26px 43px 43px 26px',
    thumbColumns: '10px 1fr 1fr',
    thumbRows: '4px 5px 5px 4px',
    note: '420px: the promo is a full height rail down the left side.',
  },
  {
    key: 'medium',
    label: 'medium',
    width: 300,
    areas: "'nav nav' 'main main' 'promo list' 'foot foot'",
    columns: '1fr 1fr',
    rows: '26px 43px 43px 26px',
    thumbColumns: '1fr 1fr',
    thumbRows: '4px 5px 5px 4px',
    note: '300px: the promo is a card in a two up row under the main.',
  },
  {
    key: 'narrow',
    label: 'narrow',
    width: 190,
    areas: "'nav' 'promo' 'main' 'list' 'foot'",
    columns: '1fr',
    rows: '24px 30px 32px 22px 24px',
    thumbColumns: '1fr',
    thumbRows: '3px 3px 4px 3px 3px',
    note: '190px: the promo is a full width band right under the nav.',
  },
];

const BLOCKS = [
  { key: 'nav', label: 'Nav', bar: 0 },
  { key: 'promo', label: 'Promo', bar: 70 },
  { key: 'main', label: 'Main', bar: 82 },
  { key: 'list', label: 'List', bar: 0 },
  { key: 'foot', label: 'Footer', bar: 0 },
];

const block = (key: string, label: string, bar: number, subject: boolean) => `
  <div
    data-part="${key}"
    ${subject ? 'data-subject data-slot="rail"' : 'class="sp-context"'}
    style="grid-area: ${key}; display: flex; flex-direction: column; gap: 3px; overflow: hidden; min-width: 0;
           padding: 4px 7px; border-radius: 5px; background: ${subject ? 'var(--sp-accent-soft)' : 'var(--sp-surface)'};
           border: 1px solid ${subject ? 'var(--sp-accent)' : 'var(--sp-line)'}"
  >
    <span style="flex: 0 0 auto; font-size: 10px; font-weight: 500; line-height: 1.2; white-space: nowrap;
                 color: ${subject ? 'var(--sp-ink)' : 'var(--sp-muted)'}">${label}</span>
    ${
      bar
        ? `<span style="flex: 0 0 auto; width: ${bar}%; height: 5px; border-radius: 3px;
             background: ${subject ? 'color-mix(in oklab, var(--sp-accent) 55%, transparent)' : 'var(--sp-line)'}"></span>`
        : ''
    }
  </div>`;

const thumb = (plan: Plan) => `
  <div class="sp-row" style="gap: 5px; flex: 0 0 auto">
    <div
      data-part="dia-${plan.key}"
      style="display: grid; grid-template-areas: ${plan.areas}; grid-template-columns: ${plan.thumbColumns};
             grid-template-rows: ${plan.thumbRows}; gap: 2px; flex: 0 0 auto; width: 44px; height: 28px; padding: 2px;
             border: 1px solid var(--sp-line); border-radius: 4px; background: var(--sp-surface)"
    >
      ${BLOCKS.map(
        (b) => `<span style="grid-area: ${b.key}; border-radius: 1px;
                 background: ${b.key === 'promo' ? 'var(--sp-muted)' : 'var(--sp-line)'}"></span>`,
      ).join('')}
    </div>
    <span data-part="dia-label-${plan.key}" class="sp-label" style="font-size: 10px; white-space: nowrap">${plan.label}</span>
  </div>`;

/**
 * Layout shifter specimen: the same five blocks under three genuinely different compositions,
 * picked absolutely. Wide, the promo is a full height rail down the left with the main and the
 * list stacked beside it. Medium, the main takes the full width and the promo becomes one card
 * of a two up row. Narrow, the promo is a full width band immediately under the nav, above
 * everything it used to sit beside. Three area maps, not one arrangement at three widths, which
 * is what separates this pattern from the other four in the set.
 *
 * The three thumbnails below the viewport carry each plan at diagram scale, with the current one
 * ringed, so the difference reads as structural rather than as a feeling about a resize.
 *
 * The subject is the promo, `data-part="promo"`: the block whose structural position is different
 * in every composition. The other four blocks, the viewport outline, the thumbnails, the picker
 * and the caption are scenery in the context register. Every plan fills the same reserved canvas
 * exactly, so the viewport never changes height and nothing outside it moves (SPEC §5).
 *
 * `data-slot` is measured, not declared: the demo reads the promo's own box against the room
 * inside the viewport and reports `rail`, `card`, or `band`. A grid template change is not a
 * transition, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented class="sp-segmented" data-part="plans" data-value="wide">
            ${PLANS.map(
              (plan) => `
              <button class="sp-segment" type="button" data-part="seg-${plan.key}" value="${plan.key}"
                      style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${plan.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div style="display: flex; justify-content: center; width: ${CANVAS}px; height: ${VIEW_H}px">
            <div
              data-part="viewport"
              data-bands="four"
              style="display: grid; gap: ${GAP}px; width: ${CANVAS}px; height: ${VIEW_H}px; padding: ${PAD}px;
                     background: var(--sp-sunken); border: ${EDGE}px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >${BLOCKS.map((b) => block(b.key, b.label, b.bar, b.key === 'promo')).join('')}</div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="thumbs" style="width: 452px; height: 28px; justify-content: center; gap: 16px">
        ${PLANS.map((plan) => thumb(plan)).join('')}
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const promo = part(root, 'promo');
  const note = part(root, 'note');
  const blocks = BLOCKS.map((b) => part(root, b.key));

  const apply = (key: string) => {
    const next = PLANS.find((plan) => plan.key === key);
    if (!next) return;

    viewport.style.width = `${next.width}px`;
    viewport.style.gridTemplateAreas = next.areas;
    viewport.style.gridTemplateColumns = next.columns;
    viewport.style.gridTemplateRows = next.rows;

    for (const plan of PLANS) {
      const current = plan.key === next.key;
      part(root, `dia-${plan.key}`).style.borderColor = current ? 'var(--sp-accent)' : 'var(--sp-line)';
      part(root, `dia-label-${plan.key}`).style.color = current ? 'var(--sp-ink)' : 'var(--sp-muted)';
    }

    // Read back on boxes nothing transitions: where the promo actually landed this time.
    const innerW = next.width - 2 * PAD - 2 * EDGE;
    const slot = promo.offsetHeight > INNER_H * 0.5 ? 'rail' : promo.offsetWidth > innerW * 0.8 ? 'band' : 'card';
    promo.dataset.slot = slot;
    const bands = new Set(blocks.map((el) => Math.round(el.offsetTop))).size;
    viewport.dataset.bands = bands === 5 ? 'five' : bands === 4 ? 'four' : 'three';
    note.textContent = next.note;
  };

  part(root, 'plans').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('wide');
}
