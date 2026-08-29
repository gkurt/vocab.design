import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const MOVE_MS = 500;
const MOVE = `transform ${MOVE_MS}ms var(--sp-ease), opacity ${MOVE_MS}ms linear`;
/** How far a view travels: short enough that the fade carries the change (SPEC §5). */
const SHIFT = 34;

const AXES = [
  { id: 'x', label: 'X', note: 'siblings, side by side' },
  { id: 'y', label: 'Y', note: 'a sequence, top to bottom' },
  { id: 'z', label: 'Z', note: 'depth, drawn as scale' },
];

const VIEWS = [
  { id: 'step-1', label: 'Crew', title: 'Crew list', lines: ['86%', '62%', '74%'] },
  { id: 'step-2', label: 'Shifts', title: 'Shift plan', lines: ['70%', '90%', '58%'] },
];

/**
 * Shared axis specimen: two views that travel the same line in opposite directions while
 * fading past each other. The axis picker swaps which line that is, and the two view
 * controls name absolute destinations, so moving back plays the same pair reversed without
 * any step ever being a direction (SPEC §8).
 *
 * The subject is the slot the views transition through, not either view: the term names
 * what happens between them. The picker, the destination controls, and the axis note are
 * scenery.
 *
 * Each view's transform is arithmetic on its own index against the view asked for, so a
 * fast-forwarded or resumed pass lands where it said, and forward and back cannot disagree
 * about which way is deeper. Depth is spelled as scale rather than travel, which is what the
 * z axis means. Both views are absolutely positioned in a slot that holds its own size, so
 * an overlap can never move anything around it (SPEC §5); the moves are CSS transitions, so
 * `motion.css` flattens them for a reader who asked for less movement; and `data-state` is
 * cleared on the stage's clock, so a pose cannot let a transition finish under a reader
 * inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const axes = AXES.map(
    (axis) => `<button class="sp-segment sp-grow" data-part="axis-${axis.id}" value="${axis.id}">${axis.label}</button>`,
  ).join('');

  const destinations = VIEWS.map(
    (view) =>
      `<button class="sp-button sp-button--ghost sp-button--sm sp-grow" type="button" data-part="go-${view.id}">${view.label}</button>`,
  ).join('');

  const panels = VIEWS.map(
    (view) => `
      <section
        class="sp-surface sp-stack"
        data-part="panel-${view.id}"
        style="position: absolute; inset: 0; gap: 8px; padding: 12px; transition: ${MOVE}"
      >
        <span class="sp-heading" style="font-size: 14px">${view.title}</span>
        ${view.lines.map((width) => `<span class="sp-line" style="width: ${width}"></span>`).join('')}
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 312px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Roster</span>
          <span class="sp-label" data-part="note">siblings, side by side</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="Axis" data-value="x" style="width: 100%">
            ${axes}
          </sp-segmented>
          <div
            data-part="slot"
            data-subject
            data-at="step-1"
            data-axis="x"
            data-state="settled"
            style="position: relative; height: 108px; margin-top: 10px; overflow: hidden"
          >
            ${panels}
          </div>
          <div class="sp-row sp-context" style="gap: 6px; margin-top: 10px">${destinations}</div>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const note = part(root, 'note');
  let settling: number | undefined;

  /** Where a view waits, given how far it is from the one being shown. Positive is ahead. */
  const away = (rel: number, axis: string) => {
    if (rel === 0) return 'none';
    if (axis === 'y') return `translateY(${rel * SHIFT}px)`;
    if (axis === 'z') return rel > 0 ? 'scale(0.8)' : 'scale(1.12)';
    return `translateX(${rel * SHIFT}px)`;
  };

  const render = (animate: boolean) => {
    const axis = slot.dataset.axis ?? 'x';
    const here = VIEWS.findIndex((view) => view.id === slot.dataset.at);
    VIEWS.forEach((view, index) => {
      const panel = part(root, `panel-${view.id}`);
      const shown = index === here;
      panel.style.transition = animate ? MOVE : 'none';
      panel.style.transform = away(index - here, axis);
      panel.style.opacity = shown ? '1' : '0';
      panel.style.pointerEvents = shown ? '' : 'none';
      panel.setAttribute('aria-hidden', String(!shown));
      if (shown) panel.dataset.current = '';
      else panel.removeAttribute('data-current');
    });
    note.textContent = AXES.find((entry) => entry.id === axis)?.note ?? '';
  };

  const go = (id: string) => {
    if (slot.dataset.at === id) return;
    clock.clearTimeout(settling);
    slot.dataset.at = id;
    slot.dataset.state = 'moving';
    render(true);
    settling = clock.setTimeout(() => {
      slot.dataset.state = 'settled';
    }, MOVE_MS + 40);
  };

  part(root, 'picker').addEventListener('change', (event) => {
    slot.dataset.axis = (event as CustomEvent<string>).detail;
    // Only the waiting view is re-placed, and it is at zero opacity, so swapping the axis
    // never moves anything the reader can see.
    render(false);
  });

  for (const view of VIEWS) part(root, `go-${view.id}`).addEventListener('click', () => go(view.id));

  render(false);
}
