import { flag, part } from '#src/kit/parts.ts';

/** The pane the chosen arrangement is drawn at full size in. Fixed, so a pick moves nothing. */
const PANE_H = 192;

const FILL = 'background: var(--sp-line); border-radius: 2px';
const STRONG = 'background: color-mix(in srgb, var(--sp-muted) 55%, transparent); border-radius: 2px';

/** The three schematics, drawn at one size so the set can be compared before one is enlarged. */
const MINIS: Record<string, string> = {
  'list-detail': `
    <span style="display: flex; gap: 3px; width: 100%; height: 100%">
      <span style="flex: 0 0 30px; ${FILL}"></span>
      <span style="flex: 1 1 auto; ${STRONG}"></span>
    </span>`,
  'supporting-pane': `
    <span style="display: flex; gap: 3px; width: 100%; height: 100%">
      <span style="flex: 1 1 auto; ${STRONG}"></span>
      <span style="flex: 0 0 26px; ${FILL}"></span>
    </span>`,
  feed: `
    <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px; width: 100%; height: 100%">
      <span style="${STRONG}"></span><span style="${STRONG}"></span>
      <span style="${STRONG}"></span><span style="${STRONG}"></span>
    </span>`,
};

const LABELS: [string, string][] = [
  ['list-detail', 'list detail'],
  ['supporting-pane', 'supporting pane'],
  ['feed', 'feed'],
];

const NOTES: Record<string, string> = {
  'list-detail': 'List detail: a list of peers beside the one that is open, on one screen.',
  'supporting-pane': 'Supporting pane: a main pane with a narrower companion that serves it.',
  feed: 'Feed: equivalent items in a grid, where no position outranks another.',
};

/** Stand-in copy at hand-written widths, so every identify run draws the same panes. */
const DETAIL_LINES = [92, 84, 96, 71, 88];
const MAIN_LINES = [95, 88, 74, 92, 66, 81];

const listRow = (open: boolean) => `
  <span style="flex: 0 0 auto; height: 18px; border-radius: 4px; border: 1px solid var(--sp-line);
               background: var(--sp-${open ? 'accent-soft' : 'surface'})"></span>`;

const card = () => `
  <span class="sp-surface" style="display: flex; flex-direction: column; justify-content: flex-end; gap: 5px; height: 48px; padding: 7px 8px">
    <span class="sp-line" style="width: 78%; height: 6px"></span>
    <span class="sp-line" style="width: 52%; height: 6px"></span>
  </span>`;

const prose = (widths: number[]) =>
  widths.map((w) => `<span class="sp-line" style="flex: 0 0 auto; width: ${w}%; height: 7px"></span>`).join('');

const pick = ([key, label]: [string, string]) => `
  <button
    class="sp-button sp-button--ghost"
    type="button"
    data-part="pick-${key}"
    data-key="${key}"
    style="display: flex; flex-direction: column; gap: 4px; width: 128px; padding: 5px; font-size: 11px"
  >
    <span style="width: 100%; height: 26px">${MINIS[key]}</span>
    <span>${label}</span>
  </button>`;

/**
 * Canonical layout specimen: the three arrangements a platform has already solved, drawn as
 * one set of schematics, with the chosen one enlarged beside them.
 *
 * The subject is the enlarged pane, not the trio: the term names one arrangement out of the
 * recommended set, so the ring lands on the arrangement being read rather than on the
 * comparison that introduces it. The schematics are the picker and wear the context
 * register with the caption (SPEC §5), which is also what keeps the set from competing with
 * the pane it selects.
 *
 * All three arrangements are honest canonical layouts, so no state needs a `data-pose`. The
 * pane is a fixed box holding all three, only one shown at a time, so choosing an
 * arrangement swaps what is inside it and moves nothing around it (SPEC §5). Picking is
 * absolute rather than a step through the list (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Canonical layouts</span>
          <span class="sp-label">three solved shapes, not thirty</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div style="display: flex; gap: 14px; flex: 0 0 auto; width: 440px; height: ${PANE_H}px">
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 128px; gap: 6px">
              ${LABELS.map(pick).join('')}
            </div>
            <div
              data-part="pane"
              data-subject
              data-arrangement="list-detail"
              style="flex: 1 1 auto; min-width: 0; height: 100%; overflow: hidden; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div data-part="arr-list-detail" style="display: flex; height: 100%">
                <div
                  data-part="list-column"
                  style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 100px; padding: 9px 8px;
                         border-right: 1px solid var(--sp-line); background: var(--sp-sunken)"
                >
                  ${[false, true, false, false, false].map(listRow).join('')}
                </div>
                <div data-part="detail-pane" style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto; min-width: 0; padding: 12px">
                  <span class="sp-heading" style="flex: 0 0 auto; font-size: 12px">Berth 2</span>
                  ${prose(DETAIL_LINES)}
                </div>
              </div>
              <div data-part="arr-supporting-pane" hidden style="display: flex; height: 100%">
                <div style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto; min-width: 0; padding: 12px">
                  <span class="sp-heading" style="flex: 0 0 auto; font-size: 12px">Transfer notes</span>
                  ${prose(MAIN_LINES)}
                </div>
                <div
                  data-part="support-rail"
                  style="display: flex; flex-direction: column; gap: 8px; flex: 0 0 92px; padding: 9px 8px;
                         border-left: 1px solid var(--sp-line); background: var(--sp-sunken)"
                >
                  <span class="sp-label" style="font-size: 10px">tools</span>
                  ${[0, 1, 2]
                    .map(
                      () =>
                        `<span style="flex: 0 0 auto; height: 34px; border-radius: 5px; border: 1px solid var(--sp-line); background: var(--sp-surface)"></span>`,
                    )
                    .join('')}
                </div>
              </div>
              <div data-part="arr-feed" hidden style="height: 100%; padding: 10px">
                <div data-part="feed-grid" class="sp-grid" style="grid-template-columns: 1fr 1fr">
                  ${[0, 1, 2, 3, 4, 5].map(card).join('')}
                </div>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 34px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const pane = part(root, 'pane');
  const readout = part(root, 'readout');
  const arrangements = LABELS.map(([key]) => [key, part(root, `arr-${key}`)] as const);
  const buttons = LABELS.map(([key]) => part(root, `pick-${key}`));

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    pane.dataset.arrangement = key;
    for (const [name, el] of arrangements) flag(el, 'hidden', name !== key);
    for (const button of buttons) flag(button, 'data-selected', button.dataset.key === key);
    readout.textContent = note;
  };

  // Each schematic names an arrangement, so a scripted step lands on that arrangement
  // rather than stepping to whichever one comes next (SPEC §8).
  for (const button of buttons) button.addEventListener('click', () => apply(button.dataset.key ?? 'list-detail'));

  apply('list-detail');
}
