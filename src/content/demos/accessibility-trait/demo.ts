import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'none' | 'button' | 'selected';

/** The UIKit spelling, written out as the view would carry it. */
const TRAITS: Record<Mode, string> = {
  none: 'accessibilityTraits = []',
  button: 'accessibilityTraits = [.button]',
  selected: 'accessibilityTraits = [.selected]',
};

/** What VoiceOver reads. Each trait appends its own word after the label (Deque, iOS traits). */
const SAY: Record<Mode, string> = {
  none: '“Unread”',
  button: '“Unread, button”',
  selected: '“Unread, selected”',
};

const CAPTION: Record<Mode, string> = {
  none: 'Drawn as a chosen filter, announced as plain text. Nothing says it can be activated, and nothing says it is on.',
  button:
    'The .button trait adds the word button after the label. It is a control now, but the announcement still leaves out the state it is drawn in.',
  selected:
    'The .selected trait is the state half. A real chip sets both; one at a time here, so each word traces to the trait that produced it.',
};

/**
 * Accessibility trait specimen: one custom-drawn filter chip, drawn as chosen in every
 * state, under a segmented control that picks the traits its view carries. The chip never
 * changes; only the trait list and the announcement it produces do, which is the whole
 * claim of the term: a trait is what an assistive technology announces the thing AS, and a
 * view that draws its own state announces none of it until the trait is set by hand.
 *
 * The subject is the chip carrying the traits, the narrowest element the term names. A ring
 * around the trait list would name a readout, and a ring around the panel would name the
 * scene. The segmented control, the trait readout, the announcement line, and the caption
 * are scenery (SPEC §5). The no-traits state is the counter-example, so the honest
 * condition lives in `data-pose` and the mount state (`.button`) satisfies it: identify
 * refuses to ring a chip with no trait at all and plays on (SPEC §6).
 *
 * Each segment reaches its own trait set rather than cycling (SPEC §8). Every readout holds
 * a reserved height and the chip holds its place, so picking a set repaints and moves
 * nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Traits" data-value="button" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-none" value="none">No traits</button>
            <button class="sp-segment" data-part="seg-button" value="button">.button</button>
            <button class="sp-segment" data-part="seg-selected" value="selected">.selected</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="panel" data-mode="button"
             style="margin-top: 10px; padding: 10px 12px; display: flex; align-items: center; gap: 12px">
          <button class="sp-chip" type="button" data-part="control" data-subject data-pose="[data-traits]"
                  data-traits="button" data-selected style="flex: 0 0 auto; font-size: 12px; cursor: default">
            ${icon('check')}Unread
          </button>
          <span class="sp-label" data-part="traits"
                style="flex: 1 1 auto; min-width: 0; text-align: right; font-size: 10px; white-space: nowrap;
                       overflow: hidden; text-overflow: ellipsis">${TRAITS.button}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">VoiceOver announces</span>
          <span class="sp-text sp-text--ink" data-part="say" data-mode="button"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${SAY.button}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="button"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${CAPTION.button}</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const control = part(root, 'control');
  const traits = part(root, 'traits');
  const say = part(root, 'say');
  const caption = part(root, 'caption');

  const apply = (mode: Mode) => {
    panel.dataset.mode = mode;
    // The attribute is the trait list itself: with nothing set there is nothing to name.
    if (mode === 'none') flag(control, 'data-traits', false);
    else control.dataset.traits = mode;
    traits.textContent = TRAITS[mode];
    traits.style.color = mode === 'none' ? 'var(--sp-muted)' : 'var(--sp-ink)';
    say.dataset.mode = mode;
    say.textContent = SAY[mode];
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
  };

  apply('button');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
