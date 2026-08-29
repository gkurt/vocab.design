import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The tile's own paint. A widget sits on a wallpaper nobody on the team chose, so the
 * backdrop is stated here rather than taken from the kit surface tokens, exactly as the
 * glass and aurora primitives state theirs.
 */
const WALLPAPER = 'linear-gradient(158deg, #3c5a76 0%, #22384c 55%, #4a6580 100%)';

/** Static, plausible, and not pretending to be live: no clock reads a real date here. */
const EVENTS = [
  { time: '09:30', title: 'Site visit', lead: true },
  { time: '11:00', title: 'Tide check', lead: false },
  { time: '14:15', title: 'Yard call', lead: true },
  { time: '16:45', title: 'Chart review', lead: false },
];

/** The largest footprint, reserved from mount so the dock beneath it never moves. */
const SLOT = 160;

const SIZES: Record<string, { w: number; h: number; cells: string; note: string }> = {
  small: { w: 76, h: 76, cells: '2 × 2 cells', note: 'One glance, one fact: the date, and the next thing on it.' },
  medium: { w: SLOT, h: 76, cells: '4 × 2 cells', note: 'Twice the width buys the times as well as the titles.' },
  large: { w: SLOT, h: SLOT, cells: '4 × 4 cells', note: 'The rest of the day, and a count of what comes after it.' },
};

const START = 'small';

const dot = (lead: boolean) =>
  `<span style="flex: 0 0 auto; width: 5px; height: 5px; border-radius: 50%; background: var(--sp-${lead ? 'accent' : 'muted'})"></span>`;

/** Line heights are stated everywhere, so each edit's height is known rather than measured. */
const eventRow = (index: number) => {
  const event = EVENTS[index];
  if (!event) return '';
  return `
    <div class="sp-row" data-part="row-${index + 1}" style="gap: 6px; min-width: 0; height: 13px">
      ${dot(event.lead)}
      <span style="flex: 0 0 auto; font-size: 9.5px; line-height: 13px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${event.time}</span>
      <span class="sp-grow" style="font-size: 10.5px; line-height: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${event.title}</span>
    </div>`;
};

const date = (px: number) => `
  <div class="sp-stack" style="gap: 1px">
    <span style="font-size: 9px; line-height: 11px; font-weight: 600; letter-spacing: 0.07em; color: var(--sp-accent)">TUE</span>
    <span style="font-size: ${px}px; line-height: ${px + 1}px; font-weight: 600">17</span>
  </div>`;

/** Each size is a different edit of the same day, never the large one scaled down. */
const COMPOSE: Record<string, () => string> = {
  small: () => `
    <div style="display: flex; flex-direction: column; height: 100%">
      ${date(22)}
      <div data-part="row-1" style="margin-top: auto; min-width: 0">
        <span style="display: block; font-size: 9px; line-height: 11px; color: var(--sp-muted)">${EVENTS[0]?.time}</span>
        <span style="display: block; font-size: 10.5px; line-height: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${EVENTS[0]?.title}</span>
      </div>
    </div>`,
  medium: () => `
    <div style="display: flex; height: 100%; gap: 9px">
      <div style="flex: 0 0 auto">${date(22)}</div>
      <div style="flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 7px">
        ${eventRow(0)}${eventRow(1)}
      </div>
    </div>`,
  large: () => `
    <div style="display: flex; flex-direction: column; height: 100%; gap: 7px">
      <div class="sp-row sp-row--between" style="align-items: flex-end">
        ${date(20)}
        <span style="font-size: 10px; line-height: 13px; color: var(--sp-muted)">August</span>
      </div>
      <div class="sp-divider"></div>
      <div class="sp-stack" style="gap: 7px">${EVENTS.map((_, i) => eventRow(i)).join('')}</div>
      <span style="margin-top: auto; font-size: 9.5px; line-height: 12px; color: var(--sp-muted)">3 more tomorrow</span>
    </div>`,
};

/**
 * Widget specimen: one calendar tile on a home screen, re-composing itself for each of the
 * three slot sizes the host offers.
 *
 * The subject is the tile: a widget is the app's view, not the surface it is placed on, so
 * the wallpaper, the dock and the size picker are the scene it is a guest in. The dock and
 * the readout beside the screen sit in the context register; the wallpaper carries no accent
 * and no elevation of its own, so it needs none.
 *
 * The largest footprint is reserved from mount, and the tile is anchored to its top left
 * corner inside it, so growing and shrinking never moves the dock below (SPEC §5). Each size
 * is a different edit of the same day rather than the large one scaled or clipped, which is
 * the claim the term rests on. Nothing here is live: the date and the events are static, so
 * the specimen never pretends to be reading a real calendar, and it keeps no timers at all.
 */
export function mount(root: HTMLElement): void {
  const first = SIZES[START] as (typeof SIZES)[string];

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home screen</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="sizer" data-axis="Size" data-value="${START}">
            ${Object.keys(SIZES)
              .map(
                (key) =>
                  `<button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 10px; font-size: 12px">${key[0]?.toUpperCase()}${key.slice(1)}</button>`,
              )
              .join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; gap: 16px; align-items: center">
          <div
            style="flex: 0 0 auto; width: 184px; padding: 12px; border-radius: 18px; background: ${WALLPAPER};
                   border: 1px solid rgb(255 255 255 / 0.16)"
          >
            <div data-part="slot" style="width: ${SLOT + 4}px; height: ${SLOT + 4}px; border: 2px dashed rgb(255 255 255 / 0.24); border-radius: 16px">
              <div
                data-part="widget"
                data-subject
                data-size="${START}"
                role="group"
                aria-label="Calendar widget"
                style="width: ${first.w}px; height: ${first.h}px; padding: 8px 10px; overflow: hidden;
                       background: var(--sp-surface); border-radius: 14px; box-shadow: var(--sp-shadow);
                       transition: width 0.3s var(--sp-ease), height 0.3s var(--sp-ease)"
              >${COMPOSE[START]?.()}</div>
            </div>
            <div class="sp-row" style="margin-top: 12px; gap: 10px; justify-content: center">
              ${Array.from({ length: 4 }, () => '<span style="width: 30px; height: 30px; border-radius: 9px; background: rgb(255 255 255 / 0.2)"></span>').join('')}
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; min-width: 0">
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 11px">slot the host gave it</span>
              <span data-part="cells" style="font-size: 13px">${first.cells}</span>
            </div>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; height: 54px; font-size: 12px">${first.note}</p>
            <p class="sp-text" style="margin: 0; font-size: 11px">
              Same app, same day. Each size is a different edit, not the big one shrunk.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const widget = part(root, 'widget');
  const cells = part(root, 'cells');
  const note = part(root, 'note');

  const resize = (name: string) => {
    const size = SIZES[name];
    const compose = COMPOSE[name];
    if (!size || !compose) return;
    widget.dataset.size = name;
    widget.style.width = `${size.w}px`;
    widget.style.height = `${size.h}px`;
    widget.innerHTML = compose();
    cells.textContent = size.cells;
    note.textContent = size.note;
  };

  part(root, 'sizer').addEventListener('change', (event) => resize((event as CustomEvent<string>).detail));
}
