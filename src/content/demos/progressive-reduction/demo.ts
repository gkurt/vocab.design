import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Stage = 'first' | 'familiar' | 'expert' | 'return';

interface Level {
  label: string;
  usage: string;
  note: string;
}

const LEVELS: Record<Stage, Level> = {
  first: {
    label: 'Publish draft',
    usage: 'Use 1, ever',
    note: 'First encounter: the glyph and the words together, because neither has been learned yet.',
  },
  familiar: {
    label: 'Publish',
    usage: 'Use 12, two weeks in',
    note: 'Twelve successful uses in, the label is shortened rather than dropped. The glyph is carrying more of it.',
  },
  expert: {
    label: 'Publish draft',
    usage: 'Use 41 this month',
    note: 'The label is gone and the shape is the word. The target did not shrink with it, and the row has not moved.',
  },
  return: {
    label: 'Publish draft',
    usage: 'Use 42, 7 weeks later',
    note: 'The part everyone forgets: proficiency decays, so an absence gives the label back rather than assuming it is still known.',
  },
};

/**
 * Progressive reduction specimen: one toolbar control at four points in one person's
 * history with it. The label runs full, then short, then away entirely, and comes back after
 * an absence.
 *
 * The subject is the control whose label reduces, not the toolbar it sits in and not the
 * usage readout that explains why. The stage picker is instrumentation for a condition no
 * input could perform (weeks of use, then weeks away), and it, the readout, the neighbouring
 * tools and the caption are scenery (SPEC §5, §8).
 *
 * The reduction is contained (SPEC §5): the control lives in a slot sized for its widest
 * state, so the label shrinking narrows the button and moves nothing beside or below it. The
 * label animates by max-width rather than by being swapped out, so the button's own width
 * follows it without any measurement, and the hit area never drops below the icon button's
 * own size. Each segment reaches its own named level rather than flipping the one it finds.
 */
export function mount(root: HTMLElement): void {
  const SLOT = 150;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 216px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Studio</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="stage" data-axis="Familiarity" data-value="first" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="stage-first" type="button" value="first" style="padding: 4px 8px; font-size: 11px">Use 1</button>
            <button class="sp-segment" data-part="stage-familiar" type="button" value="familiar" style="padding: 4px 8px; font-size: 11px">Use 12</button>
            <button class="sp-segment" data-part="stage-expert" type="button" value="expert" style="padding: 4px 8px; font-size: 11px">Use 41</button>
            <button class="sp-segment" data-part="stage-return" type="button" value="return" style="padding: 4px 8px; font-size: 11px">Back after 7 weeks</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 9px 10px; background: var(--sp-surface)">
            <div class="sp-row" style="gap: 10px">
              <span data-part="slot" style="display: flex; flex: 0 0 auto; width: ${SLOT}px">
                <button
                  class="sp-button sp-button--sm"
                  data-part="control"
                  data-subject
                  data-stage="first"
                  type="button"
                  style="display: inline-flex; align-items: center; flex: 0 0 auto; gap: 0; height: 28px; padding: 0 10px; transition: padding 0.24s var(--sp-ease)"
                >
                  ${icon('share')}
                  <span
                    data-part="label"
                    style="display: inline-block; max-width: 120px; margin-left: 7px; overflow: hidden; white-space: nowrap; transition: max-width 0.24s var(--sp-ease), margin-left 0.24s var(--sp-ease), opacity 0.18s"
                  >${LEVELS.first.label}</span>
                </button>
              </span>
              <span class="sp-divider sp-context" style="flex: 0 0 auto; width: 1px; height: 22px"></span>
              <span class="sp-row sp-context" style="flex: 0 0 auto; gap: 4px">
                <button class="sp-icon-button" type="button" aria-label="Add to favourites" style="width: 26px; height: 26px">${icon('star')}</button>
                <button class="sp-icon-button" type="button" aria-label="Duplicate" style="width: 26px; height: 26px">${icon('copy')}</button>
                <button class="sp-icon-button" type="button" aria-label="More" style="width: 26px; height: 26px">${icon('meatball', 'sp-icon--dots')}</button>
              </span>
              <span class="sp-grow"></span>
              <span class="sp-label sp-context" data-part="usage" style="flex: 0 0 auto; font-size: 10.5px; white-space: nowrap">${LEVELS.first.usage}</span>
            </div>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-height: 0; padding: 9px 10px">
            <span class="sp-label" style="display: block; font-size: 10px">This person's history with that one control</span>
            <span class="sp-text sp-text--ink" data-part="note" style="display: block; margin-top: 3px; font-size: 11px; line-height: 1.35">${LEVELS.first.note}</span>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="caption" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">
        The button narrows inside a slot sized for its widest state, so nothing beside or below it moves.
      </span>
    </div>
  `;

  const control = part(root, 'control');
  const label = part(root, 'label');
  const usage = part(root, 'usage');
  const note = part(root, 'note');

  const render = (stage: Stage) => {
    const level = LEVELS[stage];
    control.dataset.stage = stage;
    label.textContent = level.label;
    const reduced = stage === 'expert';
    label.style.maxWidth = reduced ? '0px' : '120px';
    label.style.marginLeft = reduced ? '0px' : '7px';
    label.style.opacity = reduced ? '0' : '1';
    // The label goes, the target does not: the button keeps the icon button's own width.
    control.style.padding = reduced ? '0 6px' : '0 10px';
    usage.textContent = level.usage;
    note.textContent = level.note;
  };

  part(root, 'stage').addEventListener('change', (event) => {
    render((event as CustomEvent<string>).detail as Stage);
  });
}
