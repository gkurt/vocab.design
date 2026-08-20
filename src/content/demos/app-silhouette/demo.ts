import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const GAP = 3;
const PAD = 6;
const EDGE = 1;
/** The reserved box every silhouette is drawn in, so nothing outside it moves (SPEC §5). */
const WIDTH = 360;
const HEIGHT = 210;
const INNER_H = HEIGHT - 2 * PAD - 2 * EDGE;

interface Shape {
  key: string;
  label: string;
  areas: string;
  columns: string;
  rows: string;
  /** The navigation region: a full width band unless the silhouette says otherwise. */
  navWidth: string;
  tabs: boolean;
  extra: boolean;
  note: string;
}

const SHAPES: Shape[] = [
  {
    key: 'top',
    label: 'top nav',
    areas: "'chrome' 'nav' 'content'",
    columns: '1fr',
    rows: `18px 22px 1fr`,
    navWidth: '100%',
    tabs: false,
    extra: false,
    note: 'Top navigation: one horizontal nav band under the title bar.',
  },
  {
    key: 'menu',
    label: 'menu bar',
    areas: "'chrome' 'nav' 'extra' 'content'",
    columns: '1fr',
    rows: '18px 11px 16px 1fr',
    navWidth: '56%',
    tabs: false,
    extra: true,
    note: 'Menu bar: a short menu strip, then a command bar, then content.',
  },
  {
    key: 'left',
    label: 'left nav',
    areas: "'chrome chrome' 'nav content'",
    columns: '62px 1fr',
    rows: '18px 1fr',
    navWidth: '100%',
    tabs: false,
    extra: false,
    note: 'Left navigation: a full height pane beside the content.',
  },
  {
    key: 'tabs',
    label: 'tabs',
    areas: "'chrome' 'nav' 'content'",
    columns: '1fr',
    rows: '18px 24px 1fr',
    navWidth: '100%',
    tabs: true,
    extra: false,
    note: 'Tab view: tabs along the top edge of the content itself.',
  },
];

const BAND = 'background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: 3px';
const REGION = 'background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 3px';

/**
 * App silhouette specimen: the four silhouettes Fluent names, drawn as pure outline diagrams and
 * picked absolutely. Top navigation puts one horizontal band under the title bar. Menu bar puts a
 * short strip and then a command bar above the content. Left navigation stands a full height pane
 * beside it. Tab view attaches tabs to the top edge of the content itself. Blocks and bands only,
 * with nothing inside them, because the classification is the arrangement and not the contents.
 *
 * The subject is the silhouette, `data-part="silhouette"`: the drawn outline is the term, and it
 * has its own element rather than being the scene, so identify still has something narrower than
 * the stage to ring. The navigation region inside it carries the accent, since it is the part
 * that moves between the four; the picker and the caption are scenery in the context register.
 *
 * `data-shape` is measured, not declared: the demo reads the navigation region's own box against
 * the room inside the silhouette and reports `left` when it stands full height, `menu` when a
 * command bar sits below the strip, `tabs` when the region is several blocks rather than one
 * band, and `top` otherwise. A grid template change is not a transition, so the read after the
 * write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 266px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Silhouette</span>
          <sp-segmented class="sp-segmented" data-part="shapes" data-value="top">
            ${SHAPES.map(
              (shape) => `
              <button class="sp-segment" type="button" data-part="seg-${shape.key}" value="${shape.key}"
                      style="padding: 4px 8px; font-size: 11px; white-space: nowrap">${shape.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            data-part="silhouette"
            data-subject
            data-shape="top"
            style="display: grid; gap: ${GAP}px; width: ${WIDTH}px; height: ${HEIGHT}px; padding: ${PAD}px;
                   background: var(--sp-surface); border: ${EDGE}px solid var(--sp-line); border-radius: 5px"
          >
            <div data-part="chrome" style="grid-area: chrome; ${BAND}"></div>
            <div data-part="nav" style="grid-area: nav; justify-self: start; align-self: stretch; ${REGION}"></div>
            <div
              data-part="tabs"
              style="grid-area: nav; display: flex; align-items: flex-end; gap: ${GAP}px; margin-bottom: -${GAP}px"
              hidden
            >
              ${[64, 54, 48]
                .map(
                  (w, i) => `
                <span
                  data-part="tab-${i + 1}"
                  style="flex: 0 0 auto; width: ${w}px; height: ${i === 0 ? 24 : 19}px; border-radius: 3px 3px 0 0;
                         background: ${i === 0 ? 'var(--sp-accent-soft)' : 'var(--sp-sunken)'};
                         border: 1px solid ${i === 0 ? 'var(--sp-accent)' : 'var(--sp-line)'}; border-bottom: 0"
                ></span>`,
                )
                .join('')}
            </div>
            <div data-part="extra" style="grid-area: extra; ${BAND}" hidden></div>
            <div data-part="content" style="grid-area: content; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: 3px"></div>
          </div>
        </div>
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const silhouette = part(root, 'silhouette');
  const nav = part(root, 'nav');
  const tabs = part(root, 'tabs');
  const extra = part(root, 'extra');
  const note = part(root, 'note');

  const apply = (key: string) => {
    const next = SHAPES.find((shape) => shape.key === key);
    if (!next) return;

    // Mount every box in the state it is about to be measured in (SPEC §5).
    silhouette.style.gridTemplateAreas = next.areas;
    silhouette.style.gridTemplateColumns = next.columns;
    silhouette.style.gridTemplateRows = next.rows;
    nav.style.width = next.navWidth;
    flag(nav, 'hidden', next.tabs);
    flag(tabs, 'hidden', !next.tabs);
    flag(extra, 'hidden', !next.extra);

    // Read back on boxes nothing transitions: where the navigation region actually stands.
    const region = next.tabs ? tabs : nav;
    const tall = region.offsetHeight > INNER_H * 0.5;
    const banded = extra.offsetHeight > 1;
    const split = region.children.length > 1;
    silhouette.dataset.shape = tall ? 'left' : banded ? 'menu' : split ? 'tabs' : 'top';
    note.textContent = next.note;
  };

  part(root, 'shapes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('top');
}
