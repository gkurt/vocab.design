import { part } from '#src/kit/parts.ts';

const PORT = { w: 434, h: 168 };
const CARD_H = 150;
const GAP = 12;
const PAD = 12;
/** Each card sticks a little lower than the one before it, which is what leaves the covered cards a
    visible strip and turns a cover-up into a deck. */
const PEEK = 20;
const FIRST_STICK = 8;
/** Room after the last card, so the deck can be dealt all the way out. */
const TAIL = 120;

const CARDS = [
  { title: 'Sunrise', lines: [88, 66, 92] },
  { title: 'Harbour', lines: [74, 90, 62] },
  { title: 'Ferries', lines: [92, 70, 84] },
  { title: 'Timetable', lines: [80, 94, 68] },
];

/** Where a card sits in the scroller, and where it stops. Stated rather than measured, so the
    read-out and the layout can never disagree about which cards are down. */
const topOf = (i: number) => PAD + i * (CARD_H + GAP);
const stickOf = (i: number) => FIRST_STICK + i * PEEK;

const card = (i: number, subject: boolean) => {
  const entry = CARDS[i];
  if (!entry) return '';
  return `
    <section
      ${subject ? 'data-subject data-state="loose" ' : 'class="sp-context" '}data-part="card-${i + 1}"
      style="position: sticky; top: ${stickOf(i)}px; z-index: ${i + 1}; height: ${CARD_H}px;
             margin-bottom: ${GAP}px; border: 1px solid var(--sp-line); border-radius: 10px;
             background: var(--sp-surface); box-shadow: 0 -4px 14px rgb(16 24 40 / 0.13); overflow: hidden"
    >
      <div
        style="display: flex; align-items: center; gap: 8px; height: 24px; padding: 0 12px;
               background: var(--sp-surface)"
      >
        <span class="sp-label sp-text--ink" style="font-size: 12px">${entry.title}</span>
        <span class="sp-label" style="margin-left: auto; font-size: 11px">${i + 1} of ${CARDS.length}</span>
      </div>
      <div style="padding: 10px 12px">
        ${entry.lines.map((w) => `<span class="sp-line" style="display: block; width: ${w}%; margin-bottom: 9px"></span>`).join('')}
      </div>
    </section>`;
};

/**
 * Stacking cards specimen: four full-width sections in one scroller, each stuck a fifth of an inch
 * lower than the last, so scrolling deals them into a pile instead of carrying them away. The card
 * count in the bar and the row of pips beside it name how many are down at any moment, and the strips
 * left along the top are the whole reason the offsets are staggered rather than shared.
 *
 * The subject is the first card, the one whose stacking the reader watches: it is loose at the top of
 * the scroll, stuck the moment it reaches its offset, and covered once the next card rides over it,
 * while never leaving the scrollport. It is the term in every one of those states, so no `data-pose`
 * is needed. The other three cards, the read-out and the note are the scene.
 *
 * Nothing here is timed and nothing transitions: the stacking is `position: sticky` and a stacking
 * order, so there is no scripted animation to gate and no clock to keep. The read-out is derived from
 * the same constants the layout is built from rather than from measurement, and the scroller holds a
 * fixed box, so dealing the deck moves nothing outside it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-stacked="0" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Deck</span>
          <span class="sp-label sp-text--ink" data-part="count" style="font-size: 12px">0 of 4 stacked</span>
          <span class="sp-row" style="gap: 4px">
            ${CARDS.map(
              (_, i) => `
              <span
                data-part="pip-${i + 1}" data-down="no"
                style="width: 10px; height: 10px; border-radius: 3px; background: var(--sp-line)"
              ></span>`,
            ).join('')}
          </span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            class="sp-scroll" data-part="port"
            style="position: relative; flex: 0 0 auto; width: ${PORT.w}px; height: ${PORT.h}px;
                   border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
          >
            <div style="padding: ${PAD}px ${PAD}px 0">
              ${CARDS.map((_, i) => card(i, i === 0)).join('')}
              <div style="height: ${TAIL}px"></div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="flex: 0 0 auto; height: 34px; font-size: 12px; line-height: 1.3">
            Each card stops at its own offset and the next one rides over it, leaving a strip behind.
          </span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const port = part(root, 'port');
  const first = part(root, 'card-1');
  const count = part(root, 'count');
  const pips = CARDS.map((_, i) => part(root, `pip-${i + 1}`));

  const sync = () => {
    const s = port.scrollTop;
    let down = 0;
    for (let i = 0; i < CARDS.length; i++) if (topOf(i) - s <= stickOf(i) + 0.5) down += 1;

    scene.dataset.stacked = String(down);
    count.textContent = `${down} of ${CARDS.length} stacked`;
    for (const [i, pip] of pips.entries()) {
      pip.dataset.down = i < down ? 'yes' : 'no';
      pip.style.background = i < down ? 'var(--sp-accent)' : 'var(--sp-line)';
    }
    first.dataset.state = down === 0 ? 'loose' : down === 1 ? 'stuck' : 'covered';
  };

  port.addEventListener('scroll', sync);
  sync();
}
