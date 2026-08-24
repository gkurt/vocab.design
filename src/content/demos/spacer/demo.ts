import { icon } from '#src/kit/icons.ts';
import { localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The channel between the panes, whether an element or a plain gap is holding it open. */
const CHANNEL = 16;

const MODES = [
  { key: 'filler', label: 'toolbar filler' },
  { key: 'gutter', label: 'pane gutter' },
];

/** An empty element has nothing to see, so the demo draws it: hatch plus a tint, and no more. */
const HATCH = `background-color: color-mix(in oklab, var(--sp-accent) 9%, transparent);
  background-image: repeating-linear-gradient(45deg, color-mix(in oklab, var(--sp-accent) 30%, transparent) 0 2px, transparent 2px 6px);
  border-radius: 4px`;

const lines = (widths: number[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}%; height: 6px"></div>`).join('');

/**
 * Spacer specimen: one empty element, two jobs, picked absolutely. As a toolbar filler it takes
 * the room between the title and the actions and pushes them apart; as a pane gutter it is the
 * channel between two panes and carries the drag handle that resizes them. The pick moves the
 * same element between those two homes rather than drawing two of them, so the reader watches
 * one spacer change job.
 *
 * The subject is that element, `data-part="spacer"`. It has no content and no paint of its own,
 * which is exactly why the demo gives it a box and hatches it (SPEC §5: a feature with no
 * element of its own is given one sized to its extent). Everything else is scenery in the
 * context register, applied to the bar's groups and the panes rather than to an ancestor of the
 * spacer, so the subject keeps the full kit palette.
 *
 * The geometry is deliberately identical in both states: the panes sit 16px apart either
 * way, and the actions sit hard right either way. Only the mechanism moves, which is the honest
 * version of the term's own caution: whichever separation the spacer is not doing is being done
 * by a plain gap or an auto margin, with no element at all. `data-role` and the handle's
 * presence are what a choreography can see; `data-size` is measured off the box, and nothing
 * here transitions a width, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Spacer as</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="filler">
            ${MODES.map(
              (mode) => `
              <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px">${mode.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div data-part="app" class="sp-surface" style="display: flex; flex-direction: column; width: 428px; height: 190px; overflow: hidden">
            <div data-part="bar" style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: 36px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-row sp-context" data-part="bar-left" style="gap: 6px">
                <span class="sp-icon-button" style="width: 24px; height: 24px">${icon('menu')}</span>
                <span class="sp-heading" style="font-size: 13px">Ledger</span>
              </span>

              <span
                data-part="spacer"
                data-subject
                data-role="filler"
                data-size="0"
                style="flex: 1 1 auto; align-self: center; height: 22px; min-width: 0; ${HATCH}"
              ><span data-part="handle" hidden style="display: block; width: 4px; height: 30px; margin: 0 auto; border-radius: 999px; background: var(--sp-muted)"></span></span>

              <span class="sp-row sp-context" data-part="bar-right" style="gap: 6px; flex: 0 0 auto">
                <span class="sp-button sp-button--ghost sp-button--sm" style="font-size: 12px">Share</span>
                <span class="sp-icon-button" style="width: 24px; height: 24px">${icon('kebab', 'sp-icon--dots')}</span>
              </span>
            </div>

            <div data-part="panes" style="display: flex; align-items: stretch; gap: ${CHANNEL}px; flex: 1 1 auto; min-height: 0; padding: 10px; background: var(--sp-sunken)">
              <div class="sp-surface sp-context" data-part="pane-a" style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; padding: 9px">
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Accounts</span>
                ${lines([100, 82, 66])}
              </div>
              <div class="sp-surface sp-context" data-part="pane-b" style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; padding: 9px">
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Entries</span>
                ${lines([90, 100, 58])}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const spacer = part(root, 'spacer');
  const handle = part(root, 'handle');
  const bar = part(root, 'bar');
  const barRight = part(root, 'bar-right');
  const panes = part(root, 'panes');
  const paneB = part(root, 'pane-b');
  const note = part(root, 'note');

  const apply = (key: string) => {
    const gutter = key === 'gutter';
    spacer.dataset.role = gutter ? 'gutter' : 'filler';
    flag(handle, 'hidden', !gutter);

    if (gutter) {
      // The channel between the panes becomes an element, so the panes lose their own gap.
      panes.insertBefore(spacer, paneB);
      panes.style.gap = '0px';
      barRight.style.marginLeft = 'auto';
      spacer.style.cssText = `flex: 0 0 auto; align-self: stretch; width: ${CHANNEL}px; display: flex; align-items: center; cursor: col-resize; ${HATCH}`;
    } else {
      // Back to the bar, where the empty element is the whole distance between the two groups.
      bar.insertBefore(spacer, barRight);
      panes.style.gap = `${CHANNEL}px`;
      barRight.style.marginLeft = '0px';
      spacer.style.cssText = `flex: 1 1 auto; align-self: center; height: 22px; min-width: 0; ${HATCH}`;
    }

    // Measured, not declared: the box the empty element actually occupies.
    const size = gutter ? spacer.offsetWidth : Math.round(localSize(spacer).width);
    spacer.dataset.size = String(size);
    note.textContent = gutter
      ? `A ${size}px channel, and the bar above is spaced by an auto margin instead.`
      : `A ${size}px filler, and the panes below are held apart by a plain gap.`;
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('filler');
}
