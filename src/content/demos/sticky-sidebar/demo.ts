import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The inset the card is asked to hold at, and the tolerance a rounded rect deserves. */
const TOP = 10;
const SLOP = 1.5;

const SECTIONS = [
  { title: 'Approaches', widths: [96, 88, 92, 74] },
  { title: 'Moorings', widths: [90, 96, 82, 88, 61] },
  { title: 'Tides and streams', widths: [94, 86, 90, 70] },
  { title: 'Ashore', widths: [92, 84, 96, 66] },
];

/**
 * Sticky sidebar specimen: an article scrolling under a rail whose card holds at the
 * top of the scroller and is let go when the rail beneath it runs out.
 *
 * The subject is the card, not the rail it lives in: the rail is an ordinary column,
 * and the sticking is what the term names. The article and the block below it are
 * scenery (SPEC §5), and the block is there for a reason, since it is what gives the
 * scroller enough travel for the release to happen on screen.
 *
 * Both states are read from the card's own geometry rather than assumed from the
 * `position: sticky` rule, following the sticky header specimen: holding at the inset
 * is `data-stuck`, and travelling above it (the container's bottom edge pushing the
 * card up) is `data-released`. Only geometry can tell those two apart, and the release
 * is the half of the term a fixed panel does not have.
 */
export function mount(root: HTMLElement): void {
  const article = SECTIONS.map(
    ({ title, widths }) => `
      <div class="sp-stack" style="gap: 8px">
        <span class="sp-heading">${title}</span>
        ${widths.map((w) => `<div class="sp-line" style="width: ${w}%"></div>`).join('')}
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Pilot notes</span>
          <span class="sp-label">4 sections</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto">
          <div style="display: flex; gap: 14px; padding: 14px">
            <div class="sp-stack sp-context sp-grow" data-part="article" style="gap: 16px">${article}</div>
            <aside data-part="rail" style="flex: 0 0 132px">
              <div
                class="sp-surface"
                data-part="card"
                data-subject
                style="position: sticky; top: ${TOP}px; padding: 10px; display: flex; flex-direction: column; gap: 6px"
              >
                <span class="sp-label">On this page</span>
                <ul class="sp-nav">
                  <li><span class="sp-nav-item" data-current>Approaches</span></li>
                  <li><span class="sp-nav-item">Moorings</span></li>
                  <li><span class="sp-nav-item">Tides</span></li>
                  <li><span class="sp-nav-item">Ashore</span></li>
                </ul>
              </div>
            </aside>
          </div>
          <div class="sp-context" data-part="tail" style="height: 130px; margin: 0 14px 14px; padding: 12px; background: var(--sp-sunken); border-radius: var(--sp-radius)">
            <span class="sp-label">Comments</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const card = part(root, 'card');

  const sync = () => {
    const offset = localBox(card, page).top;
    flag(card, 'data-stuck', Math.abs(offset - TOP) < SLOP);
    flag(card, 'data-released', offset < TOP - SLOP);
  };

  page.addEventListener('scroll', sync);
  sync();
}
