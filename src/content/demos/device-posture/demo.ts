import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The slot the device is reshaped inside: held at the largest posture, so nothing around it moves. */
const SLOT_W = 450;
const SLOT_H = 180;
/** The fold is drawn at 4px: the stage reads anything thinner as absent. */
const SEAM = 4;

interface Posture {
  key: string;
  label: string;
  /** The shape the hardware is in, in pixels of device. */
  w: number;
  h: number;
  /** Which way the hinge runs, which is also which way the app splits. */
  axis: 'row' | 'column';
  /** Whether the second half of the app is in use at all. */
  split: boolean;
  /** What the second half carries when there is one. */
  second: 'detail' | 'controls';
  note: string;
}

const POSTURES: Posture[] = [
  {
    key: 'flat',
    label: 'flat',
    w: 320,
    h: 150,
    axis: 'row',
    split: false,
    note: 'Flat: one continuous display, one pane. The fold is still there as a seam, so nothing that must be pressed goes on it.',
    second: 'detail',
  },
  {
    key: 'book',
    label: 'book',
    w: 286,
    h: 150,
    axis: 'row',
    split: true,
    second: 'detail',
    note: 'Book: the hinge runs vertically, so the app splits either side of it. Content left, detail right, and the fold falls in the gutter.',
  },
  {
    key: 'tabletop',
    label: 'tabletop',
    w: 176,
    h: SLOT_H,
    axis: 'column',
    split: true,
    second: 'controls',
    note: 'Tabletop: the hinge runs horizontally with the lower half on the desk, so content sits above the fold and the controls sit below it.',
  },
];

const segment = (posture: Posture) => `
  <button class="sp-segment" type="button" data-part="seg-${posture.key}" value="${posture.key}" style="padding: 4px 10px; font-size: 11px">
    ${posture.label}
  </button>`;

const lines = (widths: number[]) => widths.map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('');

/**
 * Device posture specimen: one foldable held flat, in book posture and in tabletop posture, with
 * the app inside it rearranging around the hinge each time.
 *
 * The subject is the app's content region, the thing that answers the posture, rather than the
 * device shell around it or the whole scene (SPEC §5). Every posture is honestly the term (an app
 * that ignores the fold is still in a posture), so no `data-pose` condition is needed. The bezel,
 * the posture picker and the caption are scenery in the context register.
 *
 * The device is reshaped inside a slot held at the largest posture and centred in it, so the panel
 * changes shape and nothing around it moves (SPEC §5). The seam is drawn over the app at the
 * physical middle in both orientations, which is where the hinge actually is whether or not the
 * layout splits there. Each segment names the posture it produces rather than cycling from the one
 * it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = POSTURES[0] as Posture;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Foldable, posture</span>
          <sp-segmented class="sp-segmented" data-part="postures" data-axis="Fold" data-value="${first.key}">
            ${POSTURES.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${SLOT_W}px; height: ${SLOT_H}px">
            <div
              class="sp-context"
              data-part="device"
              style="flex: 0 0 auto; width: ${first.w}px; height: ${first.h}px; padding: 5px; border-radius: 13px;
                     background: var(--sp-ink); box-shadow: var(--sp-shadow);
                     transition: width 0.42s var(--sp-ease), height 0.42s var(--sp-ease)"
            >
              <div
                data-part="app"
                data-subject
                data-posture="${first.key}"
                style="position: relative; display: flex; flex-direction: ${first.axis}; width: 100%; height: 100%;
                       border-radius: 8px; overflow: hidden; background: var(--sp-surface)"
              >
                <div
                  data-part="pane-a"
                  style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; min-height: 0;
                         padding: 7px 8px; overflow: hidden"
                >
                  <span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">Harbour survey</span>
                  <div style="display: flex; flex-direction: column; gap: 5px">${lines([94, 80, 88, 66])}</div>
                </div>
                <div
                  data-part="pane-b"
                  style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; min-height: 0;
                         padding: 7px 8px; overflow: hidden; background: var(--sp-sunken)"
                >
                  <div data-part="detail" style="display: flex; flex-direction: column; gap: 6px; min-width: 0">
                    <span class="sp-label" style="font-size: 11px">Detail</span>
                    <div class="sp-surface" style="display: flex; flex-direction: column; gap: 5px; padding: 8px">
                      ${lines([88, 62])}
                    </div>
                  </div>
                  <div data-part="controls" style="display: flex; flex-direction: column; gap: 8px; min-width: 0" hidden>
                    <span class="sp-label" style="font-size: 11px">Controls</span>
                    <div class="sp-row" style="gap: 4px">
                      <span class="sp-icon-button">${icon('chevronLeft')}</span>
                      <span class="sp-icon-button">${icon('plus')}</span>
                      <span class="sp-icon-button">${icon('chevronRight')}</span>
                    </div>
                    <div class="sp-progress" style="--sp-value: 46%"><div class="sp-progress-fill"></div></div>
                  </div>
                </div>
                <div
                  data-part="seam"
                  aria-hidden="true"
                  style="position: absolute; background: var(--sp-line); pointer-events: none"
                ></div>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 40px"></span>
        </div>
      </div>
    </div>
  `;

  const device = part(root, 'device');
  const app = part(root, 'app');
  const paneB = part(root, 'pane-b');
  const detail = part(root, 'detail');
  const controls = part(root, 'controls');
  const seam = part(root, 'seam');
  const readout = part(root, 'readout');

  const fold = (key: string) => {
    const posture = POSTURES.find((entry) => entry.key === key);
    if (!posture) return;
    const vertical = posture.axis === 'row';

    app.dataset.posture = posture.key;
    app.style.flexDirection = posture.axis;
    device.style.width = `${posture.w}px`;
    device.style.height = `${posture.h}px`;

    paneB.hidden = !posture.split;
    detail.hidden = posture.second !== 'detail';
    controls.hidden = posture.second !== 'controls';
    paneB.style.borderLeft = vertical ? `1px solid var(--sp-line)` : '0';
    paneB.style.borderTop = vertical ? '0' : `1px solid var(--sp-line)`;

    // The hinge sits at the physical middle of the panel in both orientations, whether or not
    // the layout chose to split there.
    seam.style.inset = vertical ? `0 auto 0 calc(50% - ${SEAM / 2}px)` : `calc(50% - ${SEAM / 2}px) 0 auto 0`;
    seam.style.width = vertical ? `${SEAM}px` : 'auto';
    seam.style.height = vertical ? 'auto' : `${SEAM}px`;

    readout.textContent = posture.note;
  };

  part(root, 'postures').addEventListener('change', (event) => fold((event as CustomEvent<string>).detail));

  fold(first.key);
}
