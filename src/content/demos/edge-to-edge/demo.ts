import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SCREEN_W = 130;
const SCREEN_H = 250;
/** The two system bands: the status bar at the top, the home indicator at the bottom. */
const STATUS = 26;
const HOME = 22;

const MODES = [
  { key: 'edge', label: 'edge to edge' },
  { key: 'inset', label: 'inset' },
];

/**
 * Edge to edge specimen: one phone screen whose app surface either spans the whole screen or
 * stops at the system bars, picked absolutely. Edge to edge, the picture and the surface behind
 * it run under the status bar and under the home indicator, and the bars read as ink over
 * content. Inset, the same surface is squeezed between them and the two bands go dead.
 *
 * The subject is the app surface itself, `data-part="canvas"`, since the term names the thing
 * that reaches the edges rather than the device around it. The bezel and the screen are the
 * scene it sits in; the bars, the inset content, the picker and the readout are scenery in the
 * context register. The inset state is a counter-example the subject passes through, so the
 * canvas declares the honest condition in `data-pose` and mounts satisfying it (SPEC §6).
 *
 * The buttons and text live in their own layer, inset from the screen in both states: that is
 * the pattern's whole split (backgrounds go to the edge, targets do not), and it also means
 * nothing the flip did not move moves (SPEC §5). `data-mode` is measured, not declared: the
 * demo reads where the canvas actually landed against the screen. Nothing here transitions a
 * position, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="flex-direction: row; align-items: center; justify-content: center; gap: 20px">
      <div
        style="position: relative; flex: 0 0 auto; padding: 5px; border-radius: 22px;
               background: color-mix(in oklab, var(--sp-ink) 80%, var(--sp-bg))"
      >
        <div
          data-part="screen"
          style="position: relative; width: ${SCREEN_W}px; height: ${SCREEN_H}px; border-radius: 17px;
                 overflow: hidden; background: color-mix(in oklab, var(--sp-ink) 16%, var(--sp-bg))"
        >
          <div
            data-part="canvas"
            data-subject
            data-mode="edge"
            data-pose="[data-mode=edge]"
            style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; flex-direction: column;
                   background: var(--sp-surface)"
          >
            <div
              data-part="picture"
              style="flex: 0 0 auto; height: 132px;
                     background: linear-gradient(155deg, var(--sp-accent-soft), var(--sp-accent) 130%)"
            ></div>
          </div>

          <div
            class="sp-context"
            data-part="content"
            style="position: absolute; left: 0; right: 0; top: ${STATUS}px; bottom: ${HOME}px;
                   display: flex; flex-direction: column; justify-content: flex-end; gap: 7px; padding: 10px"
          >
            <div class="sp-line" style="width: 68%; height: 7px; background: color-mix(in oklab, var(--sp-ink) 45%, transparent)"></div>
            <div class="sp-line" style="width: 92%; height: 5px"></div>
            <div class="sp-line" style="width: 80%; height: 5px"></div>
            <button
              class="sp-button sp-button--sm"
              data-part="action"
              type="button"
              style="margin-top: 3px; padding: 4px 10px; font-size: 11px; white-space: nowrap"
            >Continue</button>
          </div>

          <div
            class="sp-context"
            data-part="status-bar"
            style="position: absolute; left: 0; right: 0; top: 0; height: ${STATUS}px; display: flex; align-items: center;
                   justify-content: space-between; padding: 0 11px; font-size: 10px; font-weight: 600; color: var(--sp-ink)"
          >
            <span>9:41</span>
            <span style="display: flex; align-items: center; gap: 3px">
              <span style="width: 4px; height: 4px; border-radius: 50%; background: var(--sp-ink)"></span>
              <span style="width: 4px; height: 4px; border-radius: 50%; background: var(--sp-ink)"></span>
              <span style="width: 13px; height: 7px; border: 1px solid var(--sp-ink); border-radius: 2px"></span>
            </span>
          </div>

          <div
            class="sp-context"
            data-part="home-bar"
            style="position: absolute; left: 0; right: 0; bottom: 0; height: ${HOME}px; display: flex; align-items: center; justify-content: center"
          >
            <span style="width: 46px; height: 4px; border-radius: 2px; background: var(--sp-ink)"></span>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 244px; gap: 10px">
        <sp-segmented class="sp-segmented" data-part="modes" data-axis="App surface" data-term="edge" data-value="edge" style="align-self: flex-start">
          ${MODES.map(
            (mode) => `
            <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
          ).join('')}
        </sp-segmented>
        <span
          class="sp-text"
          data-part="note"
          role="status"
          style="display: block; width: 244px; height: 48px; font-size: 12px; line-height: 16px"
        ></span>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const canvas = part(root, 'canvas');
  const note = part(root, 'note');

  const apply = (key: string) => {
    const edge = key === 'edge';
    canvas.style.top = edge ? '0px' : `${STATUS}px`;
    canvas.style.bottom = edge ? '0px' : `${HOME}px`;

    // Read back on boxes nothing transitions: where the surface actually landed.
    const screenBox = screen.getBoundingClientRect();
    const canvasBox = canvas.getBoundingClientRect();
    const under = canvasBox.top <= screenBox.top + 1 && canvasBox.bottom >= screenBox.bottom - 1;
    canvas.dataset.mode = under ? 'edge' : 'inset';
    note.textContent = under
      ? 'The surface runs under both bars, out to the screen edge. The text and the button keep their insets.'
      : 'The surface stops at the bars, and the two bands above and below it go dead.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('edge');
}
