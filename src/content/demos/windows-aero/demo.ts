import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const DESK_W = 476;
const DESK_H = 262;
const WIN_W = 252;
const WIN_H = 142;
const BAR_H = 34;
/** How close a window may be pushed to the edge of the desktop. */
const MARGIN = 10;

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

/** A field of hard-edged bars: high-frequency wallpaper, so a live blur has something to smear. */
function stripes(x: number, y: number, height: number, count: number): string {
  const bar = (i: number) => `<rect x="${x + i * 14}" y="${y}" width="4" height="${height}" fill="rgb(255 255 255 / 0.3)" />`;
  return Array.from({ length: count }, (_, i) => bar(i)).join('');
}

const SPARKS = [
  [58, 34],
  [128, 62],
  [206, 26],
  [300, 96],
  [352, 40],
  [416, 130],
  [92, 176],
  [268, 208],
  [388, 190],
  [162, 128],
] as const;

/** One desktop icon, and the anchor a drag aims the window at. */
function deskIcon(key: string, name: 'inbox' | 'calendar', label: string, left: number): string {
  return `
    <span data-part="icon-${key}"
          style="position: absolute; left: ${left}px; top: 22px; display: flex; flex-direction: column; align-items: center;
                 gap: 4px; width: 40px; color: #ffffff; text-shadow: 0 1px 3px rgb(0 0 0 / 0.7)">
      <span style="display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 6px;
                   background: rgb(255 255 255 / 0.24); border: 1px solid rgb(255 255 255 / 0.45)">${icon(name)}</span>
      <span style="font-size: 9px; line-height: 1">${label}</span>
    </span>`;
}

/**
 * Windows Aero specimen: a Vista and Windows 7 window sitting on a desktop, with the frame
 * doing all the work. The title bar is real glass, `backdrop-filter` blurring the wallpaper
 * behind it and a colour tint laid over the result, with a bright inner highlight along the
 * top edge, rounded top corners, oversized glass window controls, and a soft outer glow
 * instead of a hard shadow. The desktop shows through all around it.
 *
 * The subject is the glass title bar, `data-part="titlebar"`: it is the narrowest element the
 * term actually names, and the window body under it is deliberately opaque so the boundary is
 * obvious (SPEC §5). The wallpaper, the desktop icons and the caption are scenery.
 *
 * The drag is the demonstration rather than a widget: the whole difference between Aero and
 * Mica is that this blur is live, so the specimen moves the window and the reader watches the
 * frame re-sample what is now behind it. The window's position is computed from the pointer
 * and clamped to the desktop, so each drag ends at a fixed place however many times attract
 * loops (SPEC §8), and the title bar is glass at every resting position, so no `data-pose` is
 * needed. Nothing transitions: a dragged window that eases is a window lagging the pointer.
 *
 * The paint is inline because translucency, tint and the highlight are the term. The kit's
 * `.sp-glass` is one specific frosted look; Aero's is a thicker, tinted, top-lit one.
 *
 * No timers: the demo answers pointer events and nothing else.
 */
export function mount(root: HTMLElement): void {
  const controls = `
    <span data-part="controls" class="sp-row" style="gap: 4px; margin-left: auto">
      <span style="display: flex; align-items: flex-end; justify-content: center; width: 26px; height: 18px; padding-bottom: 4px;
                   border-radius: 4px; border: 1px solid rgb(255 255 255 / 0.6);
                   background: linear-gradient(rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.12))">
        <span style="width: 9px; height: 2px; background: #ffffff"></span>
      </span>
      <span style="display: flex; align-items: center; justify-content: center; width: 26px; height: 18px; border-radius: 4px;
                   border: 1px solid rgb(255 255 255 / 0.6);
                   background: linear-gradient(rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.12))">
        <span style="width: 9px; height: 8px; border: 1.5px solid #ffffff"></span>
      </span>
      <span data-part="close" style="display: flex; align-items: center; justify-content: center; width: 32px; height: 18px;
                   border-radius: 4px; border: 1px solid rgb(255 255 255 / 0.6); color: #ffffff;
                   background: linear-gradient(rgb(232 96 84 / 0.85), rgb(178 38 32 / 0.8))">
        ${icon('close')}
      </span>
    </span>`;

  const rows = ['Quarterly review', 'Site photos', 'Invoices 2009']
    .map(
      (name) => `
      <span class="sp-row" style="gap: 8px; padding: 5px 4px">
        <span aria-hidden="true" style="width: 14px; height: 14px; border-radius: 3px; background: #9fb6cf"></span>
        <span style="font-size: 11px; color: #2c3a4b">${name}</span>
      </span>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div
        data-part="desktop"
        style="position: relative; width: ${DESK_W}px; height: ${DESK_H}px; overflow: hidden; border-radius: 8px;
               box-shadow: 0 0 0 1px var(--sp-line)"
      >
        <svg data-part="wallpaper" viewBox="0 0 ${DESK_W} ${DESK_H}" width="${DESK_W}" height="${DESK_H}" role="presentation"
             style="position: absolute; inset: 0; display: block">
          <defs>
            <linearGradient id="wa-sky" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0" stop-color="#062a52" />
              <stop offset="0.52" stop-color="#0a5f7e" />
              <stop offset="1" stop-color="#04203f" />
            </linearGradient>
            <radialGradient id="wa-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stop-color="#bff0ff" stop-opacity="0.4" />
              <stop offset="1" stop-color="#bff0ff" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="${DESK_W}" height="${DESK_H}" fill="url(#wa-sky)" />
          <ellipse cx="336" cy="58" rx="210" ry="128" fill="url(#wa-glow)" />
          <path d="M-20 206C90 126 152 244 262 154S404 44 500 96L500 262L-20 262Z" fill="rgb(58 190 222 / 0.26)" />
          <path d="M-20 206C90 126 152 244 262 154S404 44 500 96" fill="none" stroke="rgb(198 246 255 / 0.85)" stroke-width="3" />
          <path d="M-20 240C80 186 168 262 268 200S412 128 500 158" fill="none" stroke="rgb(150 226 255 / 0.6)" stroke-width="3" />
          ${stripes(34, 74, 66, 10)}
          ${stripes(244, 18, 54, 9)}
          ${SPARKS.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="2" fill="rgb(255 255 255 / 0.75)" />`).join('')}
        </svg>

        ${deskIcon('left', 'inbox', 'Docs', 28)}
        ${deskIcon('right', 'calendar', 'Diary', 404)}

        <div
          data-part="window"
          data-at="left"
          style="position: absolute; left: 14px; top: 88px; width: ${WIN_W}px; height: ${WIN_H}px; overflow: hidden;
                 border-radius: 9px 9px 4px 4px;
                 box-shadow: 0 0 0 1px rgb(255 255 255 / 0.34), 0 0 22px 4px rgb(120 200 255 / 0.28), 0 14px 30px rgb(0 12 28 / 0.5)"
        >
          <div
            data-part="titlebar"
            data-subject
            style="display: flex; align-items: center; gap: 8px; height: ${BAR_H}px; padding: 0 8px 0 12px;
                   border-radius: 8px 8px 0 0;
                   background: linear-gradient(rgb(146 196 238 / 0.5), rgb(96 152 206 / 0.44));
                   backdrop-filter: blur(13px) saturate(1.5);
                   -webkit-backdrop-filter: blur(13px) saturate(1.5);
                   box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.85), inset 0 -1px 0 rgb(255 255 255 / 0.3),
                               inset 1px 0 0 rgb(255 255 255 / 0.4), inset -1px 0 0 rgb(255 255 255 / 0.4);
                   cursor: grab; touch-action: none"
          >
            <span aria-hidden="true" style="width: 14px; height: 14px; border-radius: 3px; background: rgb(255 255 255 / 0.8)"></span>
            <span data-part="title"
                  style="font-size: 12px; font-weight: 600; color: #ffffff; text-shadow: 0 0 6px rgb(255 255 255 / 0.9), 0 1px 2px rgb(0 30 60 / 0.6)">
              Documents
            </span>
            ${controls}
          </div>

          <div data-part="window-body"
               style="height: ${WIN_H - BAR_H}px; padding: 8px 10px; background: #f2f6fb; border-top: 1px solid rgb(255 255 255 / 0.6)">
            <span class="sp-row" style="gap: 6px; margin-bottom: 4px">
              <span style="font-size: 10px; color: #5b6b7d">Libraries</span>
              <span style="font-size: 10px; color: #8b9aab">›</span>
              <span style="font-size: 10px; color: #5b6b7d">Documents</span>
            </span>
            ${rows}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 476px; margin: 0; text-align: center">
        Move the window and the frame re-samples whatever is now behind it.
      </p>
    </div>
  `;

  const desktop = part(root, 'desktop');
  const win = part(root, 'window');
  const titlebar = part(root, 'titlebar');

  let grab: { dx: number; dy: number } | undefined;

  titlebar.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) titlebar.setPointerCapture(event.pointerId);
    const at = localPoint(event, win);
    grab = { dx: at.x, dy: at.y };
  });

  titlebar.addEventListener('pointermove', (event) => {
    if (!grab) return;
    const at = localPoint(event, desktop);
    const left = clamp(at.x - grab.dx, MARGIN, DESK_W - WIN_W - MARGIN);
    const top = clamp(at.y - grab.dy, MARGIN, DESK_H - WIN_H - MARGIN);
    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
    win.dataset.at = left > (DESK_W - WIN_W) / 2 ? 'right' : 'left';
  });

  const drop = () => {
    grab = undefined;
  };
  titlebar.addEventListener('pointerup', drop);
  titlebar.addEventListener('pointercancel', drop);
}
