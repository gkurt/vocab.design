import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const WINDOW_W = 452;
const WINDOW_H = 210;

const MODES = [
  { key: 'shown', label: 'window chrome' },
  { key: 'gone', label: 'content only' },
];

/**
 * Chrome specimen: one browser-like window whose furniture is either there or gone, picked
 * absolutely. With the chrome, a title bar with window controls and a tab, then a toolbar with
 * back, forward and an address field, and the page gets what is left. Without it, the same page
 * fills the window and there is nothing to navigate with, which is what makes the boundary
 * legible: the difference between the two states is exactly the chrome.
 *
 * The subject is the chrome, `data-part="chrome"`, one element holding every piece of furniture.
 * It is a child of the window rather than the window itself, so the term stays a scope element:
 * the window, the page inside it, the picker and the readout are the scene, in the context
 * register. The window keeps its own box in both states, so the only thing that changes size is
 * the page the chrome was taking room from (SPEC §5).
 *
 * `data-state` is measured, not declared: the demo reads the chrome's own height and reports
 * whether it is still taking room. Nothing here transitions a height, so the read after the
 * write is the real one (SPEC §5), and a chrome that has left the layout is read as absent,
 * which is what the choreography claims of it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${WINDOW_W}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Window</span>
        <sp-segmented class="sp-segmented" data-part="modes" data-axis="View" data-value="shown">
          ${MODES.map(
            (mode) => `
            <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
          ).join('')}
        </sp-segmented>
      </div>

      <div class="sp-frame" style="width: ${WINDOW_W}px; height: ${WINDOW_H}px">
        <div
          data-part="chrome"
          data-subject
          data-state="shown"
          style="flex: 0 0 auto; background: var(--sp-surface)"
        >
          <div data-part="title-bar" style="display: flex; align-items: center; gap: 10px; height: 30px; padding: 0 10px">
            <span style="display: flex; gap: 5px; flex: 0 0 auto">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            </span>
            <span
              data-part="tab"
              style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; width: 132px; height: 22px; padding: 0 8px;
                     border-radius: 6px 6px 0 0; background: var(--sp-sunken)"
            >
              <span style="width: 8px; height: 8px; border-radius: 2px; background: var(--sp-line)"></span>
              <span class="sp-line" style="flex: 1 1 auto; height: 5px"></span>
            </span>
            <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px; color: var(--sp-muted)">
              ${icon('plus')}
            </span>
          </div>

          <div
            data-part="toolbar"
            style="display: flex; align-items: center; gap: 6px; height: 34px; padding: 0 8px; border-top: 1px solid var(--sp-line);
                   border-bottom: 1px solid var(--sp-line)"
          >
            <span class="sp-icon-button" style="width: 24px; height: 24px; color: var(--sp-muted)">${icon('chevronLeft')}</span>
            <span class="sp-icon-button" style="width: 24px; height: 24px; color: var(--sp-muted)">${icon('chevronRight')}</span>
            <span
              data-part="address"
              style="display: flex; align-items: center; gap: 6px; flex: 1 1 auto; min-width: 0; height: 22px; padding: 0 10px;
                     border-radius: 11px; background: var(--sp-sunken)"
            >
              <span style="width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--sp-muted)"></span>
              <span class="sp-line" style="width: 46%; height: 5px"></span>
            </span>
            <span class="sp-icon-button" style="width: 24px; height: 24px; color: var(--sp-muted)">${icon('kebab')}</span>
          </div>
        </div>

        <div
          class="sp-context"
          data-part="page"
          style="flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; background: var(--sp-surface)"
        >
          <div style="width: 54%; height: 9px; border-radius: 4px; background: color-mix(in oklab, var(--sp-ink) 55%, transparent)"></div>
          <div
            data-part="figure"
            style="flex: 1 1 auto; min-height: 24px; border-radius: 6px; background: var(--sp-sunken); border: 1px solid var(--sp-line)"
          ></div>
          <div class="sp-line" style="width: 96%; height: 6px"></div>
          <div class="sp-line" style="width: 82%; height: 6px"></div>
        </div>
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        data-chrome="shown"
        role="status"
        style="display: block; width: ${WINDOW_W}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const chrome = part(root, 'chrome');
  const note = part(root, 'note');

  const apply = (key: string) => {
    // The furniture leaves the window's layout entirely: the same window, minus its chrome.
    chrome.style.display = key === 'gone' ? 'none' : '';

    // Read back on a box nothing transitions: is the chrome still taking room?
    const taking = chrome.getBoundingClientRect().height > 4;
    chrome.dataset.state = taking ? 'shown' : 'gone';
    note.dataset.chrome = taking ? 'shown' : 'gone';
    note.textContent = taking
      ? 'Title bar, tab, toolbar and address field: none of it is the page. The page gets what is left.'
      : 'The same window with its furniture gone. All content, and nothing to navigate with.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('shown');
}
