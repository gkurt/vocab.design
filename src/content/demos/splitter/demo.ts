import { part } from '#src/kit/parts.ts';

/** The share of the split the leading pane may hold, as a percentage. */
const MIN = 25;
const MAX = 65;
const DEFAULT = 45;
const STEP = 5;

const lines = (widths: number[]) => widths.map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('');

/**
 * Splitter specimen: the bar between an editor pane and a preview pane. The subject
 * is the bar itself, not the panes and not the window: what the term names is the
 * control that moves the boundary, which is why it is drawn as a slider with limits
 * and reports its position as one.
 *
 * Every gesture reaches an absolute share (SPEC §8): dragging past either pane's
 * limit lands exactly on that limit, the arrow keys move whole steps from there, and
 * a double click returns the bar to the share it mounted at. The frame, the title
 * bar and the status line hold still while the two panes trade room, and the frame is
 * as tall as the taller pane's content, so neither pane is cut (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 420px; height: 276px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">index.html</span><span class="sp-label">Saved</span></div>
        <div class="sp-row" data-part="split" style="flex: 1 1 auto; gap: 0; min-height: 0; align-items: stretch">
          <div
            class="sp-stack sp-context"
            data-part="pane-editor"
            id="vd-sp-editor"
            style="width: ${DEFAULT}%; flex: 0 0 auto; gap: 7px; padding: 12px; overflow: hidden"
          >
            <span class="sp-label" data-part="editor-label">Editor</span>
            ${lines([88, 64, 78, 52, 70, 44])}
          </div>
          <div
            data-part="splitter"
            data-subject
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize the editor"
            aria-controls="vd-sp-editor"
            aria-valuemin="${MIN}"
            aria-valuemax="${MAX}"
            aria-valuenow="${DEFAULT}"
            tabindex="0"
            style="display: flex; align-items: center; justify-content: center; width: 9px; flex: 0 0 auto; background: var(--sp-sunken); border-left: 1px solid var(--sp-line); border-right: 1px solid var(--sp-line); cursor: col-resize; touch-action: none"
          ><span aria-hidden="true" style="width: 3px; height: 22px; border-radius: 999px; background: var(--sp-line)"></span></div>
          <div class="sp-stack sp-context sp-grow" data-part="pane-preview" style="gap: 8px; padding: 12px; background: var(--sp-sunken); overflow: hidden">
            <span class="sp-label">Preview</span>
            <div class="sp-surface sp-stack" style="gap: 6px; padding: 10px">
              <span class="sp-heading" style="font-size: 13px">Harbour survey</span>
              ${lines([92, 74])}
            </div>
            <div class="sp-surface sp-stack" style="gap: 6px; padding: 10px">${lines([80, 60])}</div>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 7px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label">UTF-8</span>
          <span class="sp-label" data-part="readout" style="width: 96px; text-align: right; font-variant-numeric: tabular-nums">Editor ${DEFAULT}%</span>
        </div>
      </div>
    </div>
  `;

  const split = part(root, 'split');
  const bar = part(root, 'splitter');
  const editor = part(root, 'pane-editor');
  const readout = part(root, 'readout');

  let share = DEFAULT;
  /** Pointer-to-bar distance, so the boundary never jumps to the pointer on press. */
  let grabbed: number | undefined;

  const set = (next: number) => {
    share = Math.round(Math.min(MAX, Math.max(MIN, next)));
    editor.style.width = `${share}%`;
    bar.setAttribute('aria-valuenow', String(share));
    bar.setAttribute('aria-valuetext', `Editor ${share} percent`);
    readout.textContent = `Editor ${share}%`;
  };

  bar.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) bar.setPointerCapture(event.pointerId);
    const rect = bar.getBoundingClientRect();
    grabbed = event.clientX - (rect.left + rect.width / 2);
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const rect = split.getBoundingClientRect();
    if (rect.width === 0) return;
    set(((event.clientX - grabbed - rect.left) / rect.width) * 100);
  });

  const release = () => {
    grabbed = undefined;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // The convention that gives a reader their layout back after a drag they regret.
  bar.addEventListener('dblclick', () => set(DEFAULT));

  // A splitter that only answers a pointer is a window only a mouse can rebalance.
  bar.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') set(share + STEP);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') set(share - STEP);
    else if (event.key === 'Home') set(MIN);
    else if (event.key === 'End') set(MAX);
    else return;
    event.preventDefault();
  });

  set(DEFAULT);
}
