import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The measure the design decided on, expressed in the page's own drawn pixels. */
const CAP = 320;
const GAP = 12;
const PAD = 12;
const EDGE = 1;
/** The widest page the specimen draws, and the box every state is centred in (SPEC §5). */
const WIDE = 440;
const NARROW = 292;
const PAGE_HEIGHT = 176;

const inner = (width: number) => width - 2 * PAD - 2 * EDGE;

interface Screen {
  key: string;
  label: string;
  page: number;
  /** Whether the column is allowed past its cap, and whether the surplus is given a job. */
  stretch: boolean;
  sidebar: boolean;
}

const SCREENS: Screen[] = [
  { key: 'narrower', label: 'narrower', page: NARROW, stretch: true, sidebar: false },
  { key: 'stretched', label: 'stretched', page: WIDE, stretch: true, sidebar: false },
  { key: 'designed', label: 'designed', page: WIDE, stretch: false, sidebar: true },
];

const PROSE = [100, 96, 92, 100, 88, 97, 94, 100, 72];
const NAV = ['Overview', 'Tides', 'Berths', 'Fuel'];

/**
 * Responsive upscaling specimen: the same page above its last breakpoint, three ways, picked
 * absolutely. Narrower, the column has not reached its cap and fills what it is given.
 * Stretched, the extra width goes straight into the column and the line runs on past the cap.
 * Designed, the column stops at the cap and the surplus is given a job, a promoted sidebar
 * beside it, which is the whole argument of the term: the room above the last breakpoint is a
 * state somebody has to design.
 *
 * The subject is the column, `data-part="column"`, because it is the element whose behaviour
 * changes above that breakpoint: it either keeps growing or holds its measure. The surplus was
 * the other candidate, and the column wins because it exists in every state and is the thing
 * doing the deciding. The sidebar, the page and the picker are scenery in the context register.
 *
 * `data-cap` is measured, not declared: the demo compares the column's own box with the cap and
 * says `under`, `over`, or `held`. The stretched state is a counter-example the subject passes
 * through, so the column declares the honest condition in `data-pose` and identify refuses to
 * ring the version that ran on (SPEC §6); the mount state is the designed one, which satisfies
 * it. Nothing here transitions a width, so the read after the write is the real one (SPEC §5),
 * and the page is centred in a box the size of its widest state, so nothing outside it moves.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 242px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wide screen</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="screens" data-value="designed" data-axis="Treatment" data-term="designed">
            ${SCREENS.map(
              (screen) => `
              <button class="sp-segment" type="button" data-part="seg-${screen.key}" value="${screen.key}" style="padding: 4px 10px; font-size: 11px">${screen.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div style="display: flex; justify-content: center; width: ${WIDE}px; height: ${PAGE_HEIGHT}px">
            <div
              data-part="page"
              data-screen="wide"
              style="display: flex; align-items: stretch; justify-content: center; gap: ${GAP}px; width: ${WIDE}px; height: ${PAGE_HEIGHT}px;
                     padding: ${PAD}px; background: var(--sp-surface); border: ${EDGE}px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div
                data-part="column"
                data-subject
                data-cap="held"
                data-pose="[data-cap=held]"
                style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: ${CAP}px"
              >
                <div style="width: 54%; height: 11px; border-radius: 5px; background: color-mix(in oklab, var(--sp-ink) 58%, transparent)"></div>
                ${PROSE.map((w) => `<div class="sp-line" style="width: ${w}%; height: 6px"></div>`).join('')}
              </div>

              <div
                data-part="sidebar"
                class="sp-context"
                style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: 82px; padding: 8px;
                       background: var(--sp-sunken); border-radius: 6px"
              >
                <span class="sp-label" style="font-size: 10px">On this page</span>
                ${NAV.map((item) => `<span class="sp-nav-item" style="padding: 3px 5px; font-size: 10px">${item}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const page = part(root, 'page');
  const column = part(root, 'column');
  const sidebar = part(root, 'sidebar');
  const note = part(root, 'note');

  const apply = (key: string) => {
    const next = SCREENS.find((entry) => entry.key === key);
    if (!next) return;
    const room = inner(next.page);
    flag(sidebar, 'hidden', !next.sidebar);
    page.style.width = `${next.page}px`;
    page.dataset.screen = next.page >= WIDE ? 'wide' : 'narrow';
    column.style.width = `${next.stretch ? room : CAP}px`;

    // Read back on boxes nothing transitions: the column's own width against the cap it was given.
    const width = column.offsetWidth;
    column.dataset.cap = width > CAP + 2 ? 'over' : width < CAP - 2 ? 'under' : 'held';
    note.textContent =
      column.dataset.cap === 'under'
        ? `A ${next.page}px page: the column has not reached its ${CAP}px cap.`
        : column.dataset.cap === 'over'
          ? `A ${next.page}px page, and the column has taken all ${width}px of it.`
          : `The column holds at ${CAP}px, and the surplus becomes a sidebar.`;
  };

  part(root, 'screens').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('designed');
}
