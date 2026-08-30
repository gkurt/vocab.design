import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The width the card's own query is written against, and the two widths its slot steps between. */
const QUERY = 260;
const SLOT_WIDTHS: Record<string, number> = { narrow: 172, wide: 324 };

/** One card, laid out two ways. Which one applies is decided by the slot, never by the frame. */
const LAYOUTS = {
  stack: { direction: 'column', align: 'stretch', gap: '6px', media: { width: '100%', height: '22px' } },
  row: { direction: 'row', align: 'center', gap: '10px', media: { width: '64px', height: '44px' } },
} as const;

type LayoutName = keyof typeof LAYOUTS;

const SLOT = 'height: 92px; padding: 8px; background: var(--sp-sunken); border: 1px dashed var(--sp-line); border-radius: var(--sp-radius)';
const CARD = 'display: flex; height: 100%; padding: 8px';
const MEDIA = 'flex: 0 0 auto; border-radius: 5px; background: var(--sp-accent-soft)';

const cardBody = `
  <div data-media style="${MEDIA}"></div>
  <div class="sp-stack" style="gap: 6px; min-width: 0">
    <span class="sp-heading" style="font-size: 13px">Kelp forest survey</span>
    <div class="sp-line" style="width: 82%"></div>
  </div>`;

/**
 * Container query specimen: the same card in two slots, laid out by the width of the slot
 * it is in. The subject is the card in the slot that resizes, because the query is a rule
 * the card carries: the twin below it never changes width, so when the subject re-lays and
 * the twin does not, the viewport is visibly not what decided it.
 *
 * The twin's label read "Sidebar slot, held at 172px", which is the author explaining the
 * control condition inside the frame rather than naming the slot. It names the slot now; that
 * the sidebar never changes width is what the reader watches happen.
 *
 * A demo has no stylesheet (SPEC §5), so the `@container` rule itself cannot be written
 * here and the match is evaluated in script instead. The slot still declares
 * `container-type: inline-size`, and the width compared against the query is the one the
 * demo just set rather than a measurement taken straight after a style write.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Slot width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Width" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">172px</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">324px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row" style="gap: 10px">
            <span class="sp-label sp-context" style="flex: 0 0 auto; width: 84px">Feature slot</span>
            <div data-part="slot" data-width="narrow" style="container-type: inline-size; width: ${SLOT_WIDTHS.narrow}px; ${SLOT}">
              <div class="sp-surface" data-part="card" data-subject data-layout="stack" style="${CARD}">${cardBody}</div>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label" style="flex: 0 0 auto; width: 84px">Sidebar slot</span>
            <div data-part="twin-slot" style="container-type: inline-size; width: 172px; ${SLOT}">
              <div class="sp-surface" data-part="twin-card" data-layout="stack" style="${CARD}">${cardBody}</div>
            </div>
          </div>
          <div class="sp-row sp-context" style="height: 18px">
            <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const card = part(root, 'card');
  const readout = part(root, 'readout');

  const lay = (target: HTMLElement, name: LayoutName) => {
    const layout = LAYOUTS[name];
    target.dataset.layout = name;
    target.style.flexDirection = layout.direction;
    target.style.alignItems = layout.align;
    target.style.gap = layout.gap;
    const media = target.querySelector<HTMLElement>('[data-media]');
    if (!media) return;
    media.style.width = layout.media.width;
    media.style.height = layout.media.height;
  };

  const apply = (key: string) => {
    const width = SLOT_WIDTHS[key];
    if (!width) return;
    slot.style.width = `${width}px`;
    slot.dataset.width = key;
    const matched = width >= QUERY;
    lay(card, matched ? 'row' : 'stack');
    readout.textContent = matched
      ? `container ${width}px · min-width: ${QUERY}px matches`
      : `container ${width}px · min-width: ${QUERY}px does not match`;
  };

  // Each segment names a slot width, so the switch lands on that width rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  lay(part(root, 'twin-card'), 'stack');
  apply('narrow');
}
