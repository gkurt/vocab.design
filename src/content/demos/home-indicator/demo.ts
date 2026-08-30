import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The bottom of a phone, held at one size, so only the content region inside it moves. */
const PHONE_W = 200;
const PHONE_H = 206;
const BEZEL = 6;
const DISPLAY_W = PHONE_W - BEZEL * 2;
/** The inset the device reports for the indicator, in the same units the demo draws in. */
const STRIP_H = 26;

interface Mode {
  key: string;
  label: string;
  /** Where the app's content region stops, measured from the bottom of the display. */
  stop: number;
  dim: boolean;
  note: string;
}

const MODES: Mode[] = [
  {
    key: 'inset',
    label: 'inset',
    stop: STRIP_H,
    dim: false,
    note: 'Inset: the content region stops at the reported inset, so the whole button is above the strip. A swipe that starts in the strip goes home, and nothing of yours is down there to lose it.',
  },
  {
    key: 'under',
    label: 'under it',
    stop: 0,
    dim: false,
    note: 'Under it: the button reaches the bottom edge, so its lower half sits beneath the indicator. It still looks tappable, and a swipe that starts on it goes home instead.',
  },
  {
    key: 'immersive',
    label: 'immersive',
    stop: 0,
    dim: true,
    note: 'Immersive: the system dims the indicator so it stops competing with full screen content. Dimmed is not gone. The strip keeps the gesture, and the first swipe up brings the bar back.',
  },
];

const row = (width: number) => `
  <span style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: 20px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 16px; height: 16px; border-radius: 50%; --sp-swatch: var(--sp-accent-soft)"></span>
    <span class="sp-line" style="flex: 0 0 auto; width: ${width}px; height: 6px"></span>
  </span>`;

const segment = (mode: Mode) => `
  <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 9px; font-size: 11px">
    ${mode.label}
  </button>`;

/**
 * Home indicator specimen: the bottom of a gesture driven phone, where the reserved strip can
 * have the app's content stop above it, run underneath it, or run underneath it on purpose while
 * the system dims the bar.
 *
 * The subject is the reserved strip itself, the band at the bottom edge the indicator claims,
 * rather than the pill drawn inside it: the pill is artwork the system owns, and what a layout
 * has to reckon with is the region and the gesture that starts there (SPEC §5). The strip is
 * honestly that region in all three states, including the dimmed one, so no `data-pose` condition
 * is needed. The phone shell and the swipe marker are scenery in the context register, and the
 * picker and the reading of each arrangement belong to the stage.
 *
 * Only the phone is cropped, at its top, so the specimen is unmistakably about the bottom edge.
 * The shell, the display and the strip all hold their boxes; the single moving part is where the
 * content region stops (SPEC §5). Each segment names the arrangement it produces rather than
 * flipping the one it found (SPEC §8).
 *
 * The phone used to sit inside a window titled "The bottom edge" with "reserved space, and one
 * gesture" beside it, and the note for each arrangement sat in a column headed "A swipe that
 * starts in the strip". All of that was the site talking inside the frame. The window and both
 * headings are gone, the phone stands on the stage ground on its own, and the note is marked
 * `data-stage-verdict` so the stage draws it above the switch that produced it.
 */
export function mount(root: HTMLElement): void {
  const first = MODES[0] as Mode;

  root.innerHTML = `
    <div class="sp-app">
      <div
        data-part="phone"
        style="position: relative; flex: 0 0 auto; width: ${PHONE_W}px; height: ${PHONE_H}px; padding: 0 ${BEZEL}px ${BEZEL}px;
               background: #23262b; border-radius: 0 0 24px 24px"
      >
        <div
          data-part="display"
          style="position: relative; width: ${DISPLAY_W}px; height: ${PHONE_H - BEZEL}px; overflow: hidden;
                 border-radius: 0 0 18px 18px; background: var(--sp-surface)"
        >
          <div
            data-part="content"
            style="position: absolute; left: 0; right: 0; top: 0; bottom: ${first.stop}px; display: flex; flex-direction: column;
                   gap: 8px; padding: 10px; transition: bottom 0.26s var(--sp-ease)"
          >
            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-height: 0; overflow: hidden">
              ${[132, 94, 138, 104, 124].map(row).join('')}
            </div>
            <button class="sp-button" type="button" data-part="action" style="flex: 0 0 auto; padding: 6px 12px; font-size: 12px">
              Continue
            </button>
          </div>

          <span
            class="sp-context"
            data-part="swipe"
            aria-hidden="true"
            style="position: absolute; left: 50%; bottom: 6px; translate: -50% 0; z-index: 2"
          >
            <svg viewBox="0 0 40 58" width="40" height="58" style="display: block; overflow: visible">
              <!-- Drawn twice: a light halo under the marker keeps it legible over the button as well
                   as over the page behind it. -->
              <path
                d="M20 54 L20 12 M12 20 L20 12 L28 20"
                fill="none" stroke="var(--sp-surface)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"
              />
              <path
                d="M20 54 L20 12 M12 20 L20 12 L28 20"
                fill="none" stroke="var(--sp-muted)" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 5"
              />
            </svg>
          </span>

          <div
            data-part="strip"
            data-subject
            data-mode="${first.key}"
            style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; height: ${STRIP_H}px;
                   display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px;
                   background: linear-gradient(to top, rgb(16 24 40 / 0.16), rgb(16 24 40 / 0))"
          >
            <span
              data-part="pill"
              style="width: 76px; height: 5px; border-radius: 3px; background: #23262b;
                     transition: opacity 0.26s var(--sp-ease)"
            ></span>
          </div>
        </div>
      </div>

      <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Content" data-value="${first.key}">
        ${MODES.map(segment).join('')}
      </sp-segmented>
      <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="max-width: 420px; text-align: center"></span>
    </div>
  `;

  const strip = part(root, 'strip');
  const content = part(root, 'content');
  const pill = part(root, 'pill');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const mode = MODES.find((entry) => entry.key === key);
    if (!mode) return;
    strip.dataset.mode = mode.key;
    content.style.bottom = `${mode.stop}px`;
    pill.style.opacity = mode.dim ? '0.28' : '1';
    readout.textContent = mode.note;
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply(first.key);
}
