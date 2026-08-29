import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'grouped' | 'ungrouped';
type Stop = { key: string; target: string; say: string };

/** Grouped, the card is the element; the announcement is its children read in order. */
const GROUPED: Stop[] = [{ key: 'card', target: 'card', say: '“Ada Lovelace, Reviewer, 2 hours ago”' }];

/** Ungrouped, every child is its own element, and three of the four say nothing alone. */
const UNGROUPED: Stop[] = [
  { key: 'avatar', target: 'kid-avatar', say: '“AL”' },
  { key: 'name', target: 'kid-name', say: '“Ada Lovelace”' },
  { key: 'role', target: 'kid-role', say: '“Reviewer”' },
  { key: 'time', target: 'kid-time', say: '“2 hours ago”' },
];

const CAPTION: Record<Mode, string> = {
  grouped: 'One stop. The card is announced as a single item, so the reader hears the whole row at once and swipes past it once.',
  ungrouped: 'Four stops, and three of them are fragments: a pair of initials, a job word, and a time with nothing attached to it.',
};

const KIDS = ['kid-avatar', 'kid-name', 'kid-role', 'kid-time'];

/**
 * Accessibility grouping specimen: one comment card whose avatar, name, role and timestamp
 * are either a single element the screen reader stops at once or four elements it stops at
 * four times. The Swipe right button walks the reader's cursor, so the count is watched
 * rather than asserted, and the announcement line shows what each stop is actually worth.
 *
 * The subject is the card, the narrowest element the term names: grouping is a property of
 * the container, not of any child and not of the screen around it. The segmented control,
 * the swipe button, the stop counter, the announcement line and the caption are scenery
 * (SPEC §5). Ungrouped is the counter-example, so the honest condition lives in `data-pose`
 * and the mount state satisfies it: identify refuses to ring a card that is not grouped and
 * plays on (SPEC §6).
 *
 * The cursor is `data-sim-focus` and nothing here calls `.focus()`: attract never moves real
 * focus (SPEC §7). The walk clamps at the last stop rather than wrapping, and each segment
 * reaches its own mode rather than toggling (SPEC §8). The card holds its height in both
 * modes and every readout is a reserved row, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Children" data-term="grouped" data-value="grouped" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-grouped" value="grouped">Grouped</button>
            <button class="sp-segment" data-part="seg-ungrouped" value="ungrouped">Ungrouped</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" style="margin-top: 5px; height: 14px">
          <span class="sp-label" style="font-size: 10px">Compose mergeDescendants · Android importantForAccessibility</span>
        </div>

        <div class="sp-surface" data-part="card" data-subject data-pose="[data-grouped]" data-grouped
             style="margin-top: 8px; padding: 9px 10px; display: flex; align-items: center; gap: 10px">
          <span class="sp-avatar" data-part="kid-avatar">AL</span>
          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 2px">
            <span class="sp-text sp-text--ink" data-part="kid-name" style="font-size: 12.5px">Ada Lovelace</span>
            <span class="sp-label" data-part="kid-role" style="font-size: 11px">Reviewer</span>
          </div>
          <span class="sp-label" data-part="kid-time" style="flex: 0 0 auto; font-size: 11px">2 hours ago</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="swipe">Swipe right</button>
          <span class="sp-text sp-text--ink" data-part="stops" data-n="1" data-at="card"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Stop 1 of 1</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The screen reader says</span>
          <span class="sp-text sp-text--ink" data-part="say" data-at="card"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${GROUPED[0]?.say}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="grouped"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${CAPTION.grouped}</p>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const stops = part(root, 'stops');
  const say = part(root, 'say');
  const caption = part(root, 'caption');

  let mode: Mode = 'grouped';
  let at = 0;

  const paint = () => {
    const list = mode === 'grouped' ? GROUPED : UNGROUPED;
    const here = list[at] ?? list[0];
    if (!here) return;

    flag(card, 'data-sim-focus', here.target === 'card');
    for (const kid of KIDS) flag(part(root, kid), 'data-sim-focus', kid === here.target);

    stops.dataset.n = String(list.length);
    stops.dataset.at = here.key;
    stops.textContent = `Stop ${at + 1} of ${list.length}`;
    say.dataset.at = here.key;
    say.textContent = here.say;
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;
    flag(card, 'data-grouped', next === 'grouped');
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  apply('grouped');

  // The walk clamps at the last stop, so a pass joined halfway proves the same count.
  part(root, 'swipe').addEventListener('click', () => {
    const list = mode === 'grouped' ? GROUPED : UNGROUPED;
    at = Math.min(at + 1, list.length - 1);
    paint();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
