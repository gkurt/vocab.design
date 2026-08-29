import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const STATES = {
  reflow: {
    scrolling: 'Vertical only',
    caption: 'One column at 320 CSS pixels. This is what 1.4.10 asks for.',
  },
  fixed: {
    scrolling: 'Vertical and horizontal',
    caption: 'A fixed-width row survives the zoom, so lines run off the side. The mistake.',
  },
} as const;

type State = keyof typeof STATES;

const CARD = 'padding: 10px; display: flex; flex-direction: column; gap: 6px';

/**
 * Reflow specimen: one page inside a viewport 320 CSS pixels wide, which is what a desktop
 * window becomes at 400 percent zoom. In the first state the two panels stack and the reader
 * scrolls one direction; in the second the same panels keep the widths they had on a wide
 * screen, and the page has to be dragged sideways to be read.
 *
 * The subject is the page region inside the viewport, since the term names what the content
 * does at that width rather than the window it is done in. It is the subject in both states,
 * the way the increased contrast specimen keeps its card: the failing state is the same
 * region failing, and the caption below says which one is which (SPEC §5).
 *
 * The viewport holds a fixed size in both states, so nothing outside it moves; the change is
 * contained to the content that is the term (SPEC §5). Each segment reaches its own state
 * rather than flipping the other's, and the horizontal offset is reset with the state, so a
 * pass joined halfway starts from the same place (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 434px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">At 400% zoom</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="reflow" data-axis="Page" data-term="reflow">
            <button class="sp-segment" data-part="seg-reflow" value="reflow">Reflows</button>
            <button class="sp-segment" data-part="seg-fixed" value="fixed">Stays wide</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; align-items: flex-start; gap: 12px">
          <div class="sp-context">
            <span class="sp-label" style="display: block">Viewport</span>
            <span class="sp-text" style="font-size: 11px">320 CSS px</span>
          </div>
          <div class="sp-surface sp-scroll" data-part="viewport"
               style="flex: 0 0 auto; width: 248px; height: 156px; background: var(--sp-sunken)">
            <div data-part="page" data-subject data-pose="[data-state=reflow]" data-state="reflow" style="padding: 10px">
              <span class="sp-heading" style="font-size: 14px">Tide table</span>
              <p class="sp-text" style="margin: 4px 0 0; font-size: 12px">Falmouth, week of 12 March.</p>
              <div class="sp-stack" data-part="cols" style="margin-top: 10px; gap: 8px">
                <div class="sp-surface" data-part="card-a" style="${CARD}">
                  <span class="sp-label">High water</span>
                  <span class="sp-text sp-text--ink">06:12 and 18:34</span>
                  <span class="sp-line" style="width: 70%"></span>
                </div>
                <div class="sp-surface" data-part="card-b" style="${CARD}">
                  <span class="sp-label">Low water</span>
                  <span class="sp-text sp-text--ink">00:05 and 12:27</span>
                  <span class="sp-line" style="width: 82%"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Scrolling needed</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="reflow"
                style="font-size: 12px; white-space: nowrap">${STATES.reflow.scrolling}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" data-case="reflow"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${STATES.reflow.caption}</p>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const page = part(root, 'page');
  const cols = part(root, 'cols');
  const cardA = part(root, 'card-a');
  const cardB = part(root, 'card-b');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  const apply = (state: State) => {
    const wide = state === 'fixed';
    page.dataset.state = state;
    // The whole failure in two declarations: a row that never wraps, holding widths it was
    // given for a screen four times this wide.
    cols.style.flexDirection = wide ? 'row' : 'column';
    for (const card of [cardA, cardB]) {
      card.style.flex = wide ? '0 0 auto' : '';
      card.style.width = wide ? '210px' : '';
    }
    viewport.scrollLeft = 0;
    readout.dataset.state = state;
    readout.textContent = STATES[state].scrolling;
    caption.dataset.case = state;
    caption.textContent = STATES[state].caption;
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'fixed' ? 'fixed' : 'reflow');
  });
}
