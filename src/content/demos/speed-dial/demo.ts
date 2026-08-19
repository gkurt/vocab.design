import { type IconName, icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';

type Action = { key: string; label: string; glyph: IconName; done: string };

const ACTIONS = [
  { key: 'note', label: 'Add note', glyph: 'pencil', done: 'Note added to the trip' },
  { key: 'receipt', label: 'Add receipt', glyph: 'copy', done: 'Receipt attached' },
  { key: 'flag', label: 'Flag for review', glyph: 'star', done: 'Flagged for review' },
  { key: 'share', label: 'Share trip', glyph: 'share', done: 'Trip shared' },
] as const satisfies readonly Action[];

const ROW_H = 42;
const FAN_H = ACTIONS.length * ROW_H;

const MINI = [
  'display: inline-flex',
  'align-items: center',
  'justify-content: center',
  'flex: 0 0 auto',
  'width: 34px',
  'height: 34px',
  'padding: 0',
  'border-radius: 50%',
  'box-shadow: var(--sp-shadow)',
].join('; ');

/**
 * Speed dial specimen: one floating action button on a trip screen, fanning into the
 * four things worth promoting there. The fan opens upward along the same edge, each
 * action a mini button with its label beside it rather than in a tooltip, staggered so
 * the group reads as unfolding.
 *
 * The subject is the fanned group, `data-part="fan"`: the term names the fan the button
 * grows, not the button itself (that word is `floating-action-button`) and not the
 * screen. It is off stage until the button is pressed, which identify handles by
 * summoning it (SPEC §6), and it is honestly a speed dial whenever it can be seen, so
 * no `data-pose` condition is needed. The button stays in the normal register because it
 * is the same control's other half rather than scenery; the trip list, the window chrome
 * and the status line are `.sp-context`.
 *
 * The fan is out of flow above the button, so its room is already there and opening it
 * moves nothing (SPEC §5). The button only ever opens: choosing an action, Escape, or a
 * press outside are the ways back (SPEC §8), so a pass resumed at any point lands in the
 * same place. The stagger is `element.animate`, which no stylesheet can gate, so it asks
 * `prefersReducedMotion` first and lands the fan in its open arrangement instead.
 */
export function mount(root: HTMLElement): void {
  const rows = ACTIONS.map(
    (action) => `
      <div class="sp-row" data-part="act-${action.key}" style="justify-content: flex-end; gap: 8px; height: ${ROW_H}px">
        <span class="sp-chip" style="cursor: default; padding: 3px 9px; font-size: 11px; box-shadow: var(--sp-shadow)">${action.label}</span>
        <button class="sp-button" type="button" data-part="do-${action.key}" aria-label="${action.label}" style="${MINI}">${icon(action.glyph)}</button>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Orkney, March</span>
          <span class="sp-label" style="font-size: 11px">3 entries</span>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; padding: 10px">
          <ul class="sp-list sp-surface" style="flex: 0 0 auto; padding: 2px 8px">
            <li class="sp-list-item"><span class="sp-grow">Ferry, Scrabster</span><span class="sp-text">£41.00</span></li>
            <li class="sp-list-item"><span class="sp-grow">Guest house</span><span class="sp-text">£128.00</span></li>
            <li class="sp-list-item"><span class="sp-grow">Fuel, Stromness</span><span class="sp-text">£62.40</span></li>
          </ul>
          <span class="sp-grow"></span>
          <span
            class="sp-text"
            data-part="status"
            data-value="none"
            role="status"
            style="flex: 0 0 auto; width: 150px; height: 18px; font-size: 11px; line-height: 18px; white-space: nowrap; overflow: hidden"
          >Nothing added yet</span>
        </div>

        <div
          class="sp-stack"
          data-part="fan"
          data-subject
          role="menu"
          aria-label="Add to this trip"
          style="position: absolute; right: 16px; bottom: 68px; gap: 0; height: ${FAN_H}px; align-items: flex-end;
                 opacity: 0; visibility: hidden; transition: opacity 0.14s, visibility 0.14s"
        >${rows}</div>

        <button
          class="sp-button"
          type="button"
          data-part="fab"
          aria-label="Add to this trip"
          aria-haspopup="menu"
          aria-expanded="false"
          style="position: absolute; right: 16px; bottom: 16px; display: inline-flex; align-items: center;
                 justify-content: center; width: 46px; height: 46px; padding: 0; border-radius: 50%; box-shadow: var(--sp-shadow)"
        >${icon('plus')}</button>
      </div>
    </div>
  `;

  const fan = part(root, 'fan');
  const fab = part(root, 'fab');
  const status = part(root, 'status');
  const rowsOf = ACTIONS.map((action) => part(root, `act-${action.key}`));

  const setOpen = (open: boolean) => {
    fan.style.opacity = open ? '1' : '0';
    fan.style.visibility = open ? 'visible' : 'hidden';
    fab.setAttribute('aria-expanded', String(open));
    flag(fan, 'data-open', open);
    if (!open || prefersReducedMotion(root)) return;
    // Nearest the button first, so the fan reads as unfolding from it.
    for (const [index, row] of [...rowsOf].reverse().entries()) {
      row.animate(
        [
          { opacity: 0, transform: 'translateY(16px) scale(0.86)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: 200,
          delay: index * 55,
          easing: 'cubic-bezier(0.3, 0.9, 0.3, 1)',
          fill: 'backwards',
        },
      );
    }
  };

  const choose = (action: Action) => {
    status.dataset.value = action.key;
    status.textContent = action.done;
    setOpen(false);
  };

  // The button only ever opens; every way back out is its own step (SPEC §8).
  fab.addEventListener('click', () => setOpen(true));
  for (const action of ACTIONS) part(root, `do-${action.key}`).addEventListener('click', () => choose(action));

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Element | null;
    if (target && (fan.contains(target) || fab.contains(target))) return;
    setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  setOpen(false);
}
