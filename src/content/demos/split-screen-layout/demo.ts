import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Wide enough for two halves side by side, and narrow enough for only one. */
const WIDTHS = { wide: 408, narrow: 214 };
/** One height at both widths, so stacking cannot move anything around the region. */
const HEIGHT = 186;

const NOTES: Record<string, string> = {
  wide: 'Two halves, equal in width, type and weight. Neither is the offer.',
  narrow: 'Stacked, whichever half leads is read first. The order is a decision.',
};

const HALVES = [
  { key: 'charter', title: 'Take the boat out', action: 'See the fleet', fill: 'var(--sp-sunken)' },
  { key: 'berth', title: 'Leave the boat here', action: 'See the berths', fill: 'var(--sp-surface)' },
];

/**
 * Split screen specimen: a page cut into two equal halves, each carrying its own path, and
 * a narrow width where the same two halves stack.
 *
 * The subject is the split region rather than the whole scene. The halves and the cut
 * between them are the term, but the width switcher above is the specimen's own
 * instrumentation and is never part of what the word names (SPEC §5), so the region is the
 * narrowest honest answer and identify keeps something to point at.
 *
 * The region holds one height at both widths, so stacking rearranges what is inside it and
 * moves nothing around it (SPEC §5). Each segment names a width, so the switch lands on
 * that width rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const halves = HALVES.map(
    (half) => `
      <div
        data-part="pane-${half.key}"
        style="display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; min-height: 0; padding: 10px 14px; background: ${half.fill}; overflow: hidden"
      >
        <span class="sp-heading" style="font-size: 15px">${half.title}</span>
        <span class="sp-row" style="margin-top: 4px">
          <button class="sp-button sp-button--sm" type="button" data-part="cta-${half.key}">${half.action}</button>
        </span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Window</span>
          <sp-segmented class="sp-segmented" data-axis="Width" data-part="switcher" data-value="wide">
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">wide</button>
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">narrow</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px">
          <div
            class="sp-grid"
            data-part="region"
            data-subject
            data-arrangement="side"
            style="flex: 0 0 auto; width: ${WIDTHS.wide}px; height: ${HEIGHT}px; gap: 0; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            ${halves}
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const readout = part(root, 'readout');
  const seam = part(root, 'pane-berth');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    const narrow = key === 'narrow';
    region.dataset.arrangement = narrow ? 'stacked' : 'side';
    region.style.width = `${narrow ? WIDTHS.narrow : WIDTHS.wide}px`;
    region.style.gridTemplateColumns = narrow ? '1fr' : '1fr 1fr';
    region.style.gridTemplateRows = narrow ? '1fr 1fr' : '1fr';
    // The cut is where the halves meet, so it moves with them rather than being drawn twice.
    seam.style.borderLeft = narrow ? '0' : '1px solid var(--sp-line)';
    seam.style.borderTop = narrow ? '1px solid var(--sp-line)' : '0';
    readout.textContent = note;
  };

  // Each segment names a width, so the switch lands on that width rather than flipping
  // whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('wide');
}
