import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The screen never changes shape: the windowing mode divides it, and that is the whole point. */
const SCREEN_W = 440;
const SCREEN_H = 176;
/** The share of the screen the subject app may hold in split, as a percentage. */
const MIN = 30;
const MAX = 72;
const SPLIT = 58;
/** Below this many pixels of window the app drops its rail and runs as one column. */
const COMPACT = 240;
/** Restated on release, since a drag has to switch these off and then put them back. */
const APP_EASE = 'width 0.34s var(--sp-ease)';
const DIVIDER_EASE = 'left 0.34s var(--sp-ease)';

interface Mode {
  key: string;
  label: string;
  /** The share the subject app is given the moment this mode is entered. */
  share: number;
  neighbour: 'none' | 'beside' | 'floating';
  note: string;
}

const MODES: Mode[] = [
  {
    key: 'single',
    label: 'single',
    share: 100,
    neighbour: 'none',
    note: 'The whole screen. The only case an app that reads the display size at launch gets right.',
  },
  {
    key: 'split',
    label: 'split',
    share: SPLIT,
    neighbour: 'beside',
    note: 'Split screen: two apps, and a divider a person can drag while the app is running.',
  },
  {
    key: 'floating',
    label: 'floating',
    share: 100,
    neighbour: 'floating',
    note: 'Freeform: the neighbour floats over the screen instead of taking a share of it.',
  },
];

const segment = (mode: Mode) => `
  <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 11px; font-size: 11px">
    ${mode.label}
  </button>`;

const lines = (widths: number[], gap = 5) =>
  `<div style="display: flex; flex-direction: column; gap: ${gap}px">${widths.map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('')}</div>`;

/**
 * Multi-window mode specimen: one tablet screen, unchanged in shape, divided three ways. The app
 * on the left runs full screen, then beside a neighbour with a divider that can be dragged, then
 * under a freeform window floating over it.
 *
 * The subject is the app region that is resized, not the screen and not the divider (SPEC §5): the
 * term is about the room an app is given, and the divider is the platform's control rather than
 * the app's. Every mode is honestly the term, so no `data-pose` condition is needed. The tablet
 * shell, the neighbouring app, the mode picker and the caption are scenery in the context register.
 *
 * The screen holds one box in every mode, so only the division inside it moves (SPEC §5). Whether
 * the app runs expanded or compact is decided from the share arithmetic, never measured back off
 * the element after a style write (SPEC §5). Each segment names the mode it produces, and entering
 * split always lands on the same share rather than resuming whatever the last drag left (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = MODES[0] as Mode;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Tablet, windowing mode</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="${first.key}">
            ${MODES.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="screen"
            class="sp-context"
            style="position: relative; flex: 0 0 auto; width: ${SCREEN_W}px; height: ${SCREEN_H}px; overflow: hidden;
                   background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              data-part="app"
              data-subject
              data-mode="${first.key}"
              data-size="expanded"
              style="position: absolute; top: 0; bottom: 0; left: 0; width: ${first.share}%; display: flex; overflow: hidden;
                     background: var(--sp-surface); transition: ${APP_EASE}"
            >
              <div
                data-part="rail"
                style="display: flex; flex-direction: column; gap: 4px; flex: 0 0 92px; padding: 8px 7px; overflow: hidden;
                       border-right: 1px solid var(--sp-line)"
              >
                <span class="sp-nav-item" data-current style="font-size: 11px">Berths</span>
                <span class="sp-nav-item" style="font-size: 11px">Tides</span>
                <span class="sp-nav-item" style="font-size: 11px">Permits</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-width: 0; padding: 9px 10px; overflow: hidden">
                <span class="sp-heading" style="font-size: 12px">Berth register</span>
                ${lines([94, 80, 88, 70, 84, 62])}
              </div>
            </div>

            <div
              data-part="divider"
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize the split"
              style="position: absolute; top: 0; bottom: 0; left: calc(${first.share}% - 4px); width: 8px; display: flex;
                     align-items: center; justify-content: center; background: var(--sp-sunken); cursor: col-resize;
                     touch-action: none; transition: ${DIVIDER_EASE}"
            ><span aria-hidden="true" style="width: 3px; height: 26px; border-radius: 999px; background: var(--sp-line)"></span></div>

            <div
              data-part="neighbour"
              class="sp-context"
              style="position: absolute; top: 0; bottom: 0; right: 0; width: ${100 - SPLIT}%; display: flex; flex-direction: column;
                     gap: 7px; padding: 9px 10px; overflow: hidden; background: var(--sp-surface)"
            >
              <span class="sp-heading" data-part="neighbour-title" style="font-size: 12px">Notes</span>
              ${lines([88, 66, 78])}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 40px; width: 442px"></span>
        </div>
      </div>
    </div>
  `;

  const app = part(root, 'app');
  const rail = part(root, 'rail');
  const divider = part(root, 'divider');
  const neighbour = part(root, 'neighbour');
  const readout = part(root, 'readout');

  let mode = first;
  let share = first.share;

  const layout = () => {
    const pixels = Math.round((SCREEN_W * share) / 100);
    const compact = pixels < COMPACT;

    app.dataset.mode = mode.key;
    app.dataset.size = compact ? 'compact' : 'expanded';
    app.style.width = `${share}%`;
    rail.hidden = compact;

    divider.hidden = mode.neighbour !== 'beside';
    divider.style.left = `calc(${share}% - 4px)`;

    neighbour.hidden = mode.neighbour === 'none';
    const floating = mode.neighbour === 'floating';
    neighbour.style.top = floating ? 'auto' : '0';
    neighbour.style.bottom = floating ? '13px' : '0';
    neighbour.style.right = floating ? '13px' : '0';
    neighbour.style.width = floating ? '170px' : `${100 - share}%`;
    neighbour.style.height = floating ? '112px' : 'auto';
    neighbour.style.borderRadius = floating ? 'var(--sp-radius)' : '0';
    neighbour.style.border = floating ? '1px solid var(--sp-line)' : '0';
    neighbour.style.boxShadow = floating ? '0 6px 20px rgb(16 24 40 / 0.28)' : 'none';

    readout.textContent = `${mode.note} App window: ${pixels} px, ${compact ? 'compact' : 'expanded'}.`;
  };

  const set = (key: string) => {
    const next = MODES.find((entry) => entry.key === key);
    if (!next) return;
    mode = next;
    share = next.share;
    layout();
  };

  part(root, 'modes').addEventListener('change', (event) => set((event as CustomEvent<string>).detail));

  // The divider is the platform's control, and dragging it resizes the app while it runs.
  let grabbed: number | undefined;
  divider.addEventListener('pointerdown', (event) => {
    const rect = divider.getBoundingClientRect();
    grabbed = event.clientX - (rect.left + rect.width / 2);
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const rect = part(root, 'screen').getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((event.clientX - grabbed - rect.left) / rect.width) * 100;
    share = Math.round(Math.min(MAX, Math.max(MIN, next)));
    // A dragged divider that eases is a divider lagging the pointer.
    divider.style.transition = 'none';
    app.style.transition = 'none';
    layout();
  });

  const release = () => {
    if (grabbed === undefined) return;
    grabbed = undefined;
    divider.style.transition = DIVIDER_EASE;
    app.style.transition = APP_EASE;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  layout();
}
