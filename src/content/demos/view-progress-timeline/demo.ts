import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PORT = { w: 190, h: 178 };
const CARD = 66;
/** Room above and below the card, half a card short of the scrollport, so the card never
    leaves the scrollport entirely and the ring identify draws is always over something. */
const SPACER = 141;
const RAIL_H = PORT.h;

type Range = 'cover' | 'contain' | 'entry' | 'exit';

const NOTES: Record<Range, string> = {
  cover: 'cover: the whole overlap, from the card touching the far edge of the scrollport to its trailing edge clearing the near one.',
  contain: 'contain: only the stretch where the card is wholly inside the scrollport. Shorter than cover by one card at each end.',
  entry: 'entry: the arriving. It is finished the moment the card is wholly inside, and stays finished for the rest of the scroll.',
  exit: 'exit: the leaving. It sits at nought until the card starts crossing the near edge, however far the page has scrolled.',
};

const filler = (widths: number[]) =>
  widths.map((w) => `<span class="sp-line" style="display: block; width: ${w}%; margin-bottom: 9px"></span>`).join('');

/**
 * View progress timeline specimen: one scrollport, one card travelling through it, and a progress
 * read-out for that card's own journey rather than for the scroller's. The segmented control picks
 * the named range, and the same scroll position then reads completely differently: parked in the
 * middle the card is halfway through `cover`, halfway through `contain`, already finished with
 * `entry`, and has not begun `exit`. The rail beside the scrollport draws the whole journey once and
 * bands the part of it the selected range covers, with a marker on the card's current place in it.
 *
 * The subject is the card being animated. Its opacity, its scale and its own fill bar are the
 * progress value rendered three ways, so the element the timeline names is the element that moves.
 * Every range is honest, so no `data-pose` is needed. The scrollport's filler text, the rail and the
 * read-out are scenery and carry the context register.
 *
 * The card's travel deliberately stops half a card short at both ends, which is why `cover` here runs
 * between roughly 14% and 86% rather than end to end: an element that never fully leaves the
 * scrollport never sees the ends of its own cover range, which is the trap the article names. It also
 * keeps the subject on screen at every scroll position the script can rest at.
 *
 * Nothing is timed and nothing transitions, so the demo keeps no clock and reduced motion has nothing
 * to flatten: every frame is written straight from a position the reader chose, and an eased card
 * would be a card lagging its own scrollbar. The scrollport, the rail and the read-out all hold fixed
 * sizes, so scrolling moves nothing but the card (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-range="cover" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Range</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scope" data-part="range" data-value="cover">
            <button class="sp-segment" type="button" data-part="seg-cover" value="cover">Cover</button>
            <button class="sp-segment" type="button" data-part="seg-contain" value="contain">Contain</button>
            <button class="sp-segment" type="button" data-part="seg-entry" value="entry">Entry</button>
            <button class="sp-segment" type="button" data-part="seg-exit" value="exit">Exit</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <div
            class="sp-scroll" data-part="port"
            style="position: relative; flex: 0 0 auto; width: ${PORT.w}px; height: ${PORT.h}px;
                   border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)"
          >
            <div class="sp-context" style="height: ${SPACER}px; padding: 12px 14px 0">${filler([88, 72, 94, 64, 80, 90])}</div>

            <div
              data-part="card" data-subject data-range="cover" data-at="running" data-progress="50"
              style="height: ${CARD}px; margin: 0 14px; padding: 10px 12px; display: flex; flex-direction: column;
                     justify-content: center; gap: 9px; border: 1px solid var(--sp-accent); border-radius: 8px;
                     background: var(--sp-accent-soft); transform: scale(0.94); opacity: 0.7; will-change: transform"
            >
              <span class="sp-label sp-text--ink" style="font-size: 12px">Waypoint</span>
              <span style="position: relative; height: 5px; border-radius: 999px; background: var(--sp-surface); overflow: hidden">
                <span data-part="fill" style="display: block; width: 50%; height: 100%; border-radius: 999px; background: var(--sp-accent)"></span>
              </span>
            </div>

            <div class="sp-context" style="height: ${SPACER}px; padding: 12px 14px 0">${filler([76, 92, 68, 86, 74, 90])}</div>
          </div>

          <div
            class="sp-context" data-part="rail"
            style="position: relative; flex: 0 0 auto; width: 22px; height: ${RAIL_H}px; border-radius: 6px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden"
          >
            <span
              data-part="band"
              style="position: absolute; left: 0; right: 0; top: 0; height: 100%; background: var(--sp-sunken);
                     border-top: 2px solid var(--sp-accent); border-bottom: 2px solid var(--sp-accent);
                     border-left: 4px solid var(--sp-accent)"
            ></span>
            <span
              data-part="marker"
              style="position: absolute; left: 0; right: 0; top: 0; height: 3px; margin-top: -1px; background: var(--sp-ink)"
            ></span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Progress on this range</span>
            <span
              class="sp-text--ink" data-part="progress"
              style="font-size: 24px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.15"
            >50%</span>
            <span class="sp-label sp-text--ink" data-part="state" style="font-size: 12px">running</span>
            <span class="sp-divider" style="margin: 2px 0"></span>
            <span class="sp-text" data-stage-verdict data-part="note" style="height: 76px; font-size: 11px; line-height: 1.45">${NOTES.cover}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const port = part(root, 'port');
  const card = part(root, 'card');
  const fill = part(root, 'fill');
  const rail = part(root, 'rail');
  const band = part(root, 'band');
  const marker = part(root, 'marker');
  const progress = part(root, 'progress');
  const state = part(root, 'state');
  const note = part(root, 'note');

  // Measured once on the mounted state, before anything is written back to it: the scrollport's own
  // box is the unit every range is expressed in, and it is a pixel or two off its declared height.
  const H = port.clientHeight;
  const C = card.offsetHeight;
  const COVER = H + C;
  const RAIL = rail.clientHeight;

  let range: Range = 'cover';

  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

  /** How far the card has travelled through the scrollport, in the units `cover` is measured in. */
  const travelled = () => H - (card.offsetTop - port.scrollTop);

  const progressOf = (t: number): number => {
    if (range === 'entry') return clamp(t / C);
    if (range === 'exit') return clamp((t - H) / C);
    if (range === 'contain') return clamp((t - C) / (H - C));
    return clamp(t / COVER);
  };

  /** Where the selected range sits inside the whole journey, as a pair of percentages of it. */
  const bandOf = (): [number, number] => {
    if (range === 'entry') return [0, (C / COVER) * 100];
    if (range === 'exit') return [(H / COVER) * 100, 100];
    if (range === 'contain') return [(C / COVER) * 100, (H / COVER) * 100];
    return [0, 100];
  };

  const sync = () => {
    const t = travelled();
    const p = progressOf(t);
    const pct = Math.round(p * 100);

    card.style.opacity = String(0.45 + p * 0.55);
    card.style.transform = `scale(${(0.88 + p * 0.12).toFixed(3)})`;
    fill.style.width = `${pct}%`;

    card.dataset.range = range;
    card.dataset.progress = String(pct);
    card.dataset.at = p <= 0 ? 'before' : p >= 1 ? 'after' : 'running';
    progress.textContent = `${pct}%`;
    state.textContent = p <= 0 ? 'not started yet' : p >= 1 ? 'already finished' : 'running';

    marker.style.top = `${clamp(t / COVER) * (RAIL - 3)}px`;
  };

  const applyRange = () => {
    const [from, to] = bandOf();
    band.style.top = `${from}%`;
    band.style.height = `${to - from}%`;
    scene.dataset.range = range;
    note.textContent = NOTES[range];
    sync();
  };

  port.addEventListener('scroll', sync);

  // Each segment names a range outright, so a resumed pass lands on the range it asked for (SPEC §8).
  part(root, 'range').addEventListener('change', (event) => {
    range = (event as CustomEvent<string>).detail as Range;
    applyRange();
  });

  applyRange();
  // Parked halfway through the whole journey, so the card mounts wholly inside the scrollport and
  // every range has something different to say about the same position.
  port.scrollTop = SPACER + (C - H) / 2;
  sync();
}
