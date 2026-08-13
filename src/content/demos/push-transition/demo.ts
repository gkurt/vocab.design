import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const MOVE_MS = 400;
const MOVE = `translate ${MOVE_MS}ms var(--sp-ease)`;
const VEIL = `opacity ${MOVE_MS}ms linear`;
/** How far a screen that has been pushed under travels: less than the one arriving, so it
    reads as being covered rather than dragged along beside it. */
const BEHIND = -30;

const LEVELS = ['pane-0', 'pane-1', 'pane-2'];

/**
 * Push specimen: three screens of one stack sharing a single slot, where a navigation moves
 * both of them. The arriving screen comes in from the trailing edge while the one it
 * replaces leaves toward the leading edge, so the reader watches a screen be displaced
 * rather than covered, and each Back control runs the pair the other way.
 *
 * The subject is the slot the screens transition through, not any one screen: the term
 * names the move between them. The bar above it, the depth readout, and the rows the
 * screens are made of are scenery.
 *
 * Each screen's resting offset is arithmetic on its own index against the level asked for,
 * so no direction is ever stated and back is a level rather than a step backwards: every
 * control resolves to an absolute screen, which is what lets a fast-forwarded or resumed
 * pass land where it said (SPEC §8). The slot holds its own size and every screen is
 * absolutely positioned in it, so nothing outside moves (SPEC §5). The moves are CSS
 * transitions, so `motion.css` flattens them for a reader who asked for less movement, and
 * `data-state` is cleared on the stage's clock so a pose cannot let a navigation finish
 * under a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const veil = (level: number) =>
    `<span
       data-part="veil-${level}"
       aria-hidden="true"
       style="position: absolute; inset: 0; background: var(--sp-scrim); opacity: 0; pointer-events: none; transition: ${VEIL}"
     ></span>`;

  const pane = (level: number, background: string, body: string) => `
    <section
      data-part="pane-${level}"
      style="position: absolute; inset: 0; overflow: hidden; background: ${background}; translate: 0 0; transition: ${MOVE}"
    >
      ${body}
      ${veil(level)}
    </section>`;

  const row = (name: string, meta: string, partName?: string) => `
    <li class="sp-list-item" ${partName ? `data-part="${partName}"` : ''} style="cursor: ${partName ? 'pointer' : 'default'}">
      <span class="sp-grow">${name}</span>
      <span class="sp-text">${meta}</span>
      ${icon('chevronRight')}
    </li>`;

  const backBar = (level: number, title: string) => `
    <div class="sp-row" style="gap: 8px; padding: 8px 10px; border-bottom: 1px solid var(--sp-line)">
      <button class="sp-icon-button" type="button" data-part="back-${level}" aria-label="Back">${icon('chevronLeft')}</button>
      <span class="sp-heading" style="font-size: 14px">${title}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 396px; height: 266px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Song book</span>
          <span class="sp-label" data-part="depth">1 of 3</span>
        </div>
        <div
          data-part="slot"
          data-subject
          data-level="0"
          data-dir="push"
          data-state="settled"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden"
        >
          ${pane(
            0,
            'var(--sp-sunken)',
            `<ul class="sp-list" style="padding: 6px">
               ${row('Sea shanties', '12 songs', 'row-shanties')}
               ${row('Ballads', '9 songs')}
               ${row('Reels', '14 songs')}
             </ul>`,
          )}
          ${pane(
            1,
            'var(--sp-surface)',
            `${backBar(1, 'Sea shanties')}
             <ul class="sp-list" style="padding: 6px">
               ${row('Haul away Joe', '2:41', 'row-haul')}
               ${row('Spanish ladies', '3:12')}
               ${row('Leave her Johnny', '2:58')}
             </ul>`,
          )}
          ${pane(
            2,
            'var(--sp-surface)',
            `${backBar(2, 'Haul away Joe')}
             <div class="sp-stack" style="gap: 10px; padding: 12px">
               <span class="sp-swatch" style="height: 52px; --sp-swatch: var(--sp-accent-soft)"></span>
               <span class="sp-text">Capstan shanty, collected 1904. Two verses and a chorus.</span>
               <span class="sp-line" style="width: 78%"></span>
             </div>`,
          )}
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const depth = part(root, 'depth');
  let settling: number | undefined;

  const render = (animate: boolean) => {
    const level = Number(slot.dataset.level);
    LEVELS.forEach((name, index) => {
      const screen = part(root, name);
      const here = index === level;
      screen.style.transition = animate ? MOVE : 'none';
      // Ahead of the level asked for a screen waits off the trailing edge; behind it, a
      // screen has been pushed part of the way under the one covering it.
      screen.style.translate = here ? '0 0' : index > level ? '100% 0' : `${BEHIND}% 0`;
      screen.style.pointerEvents = here ? '' : 'none';
      screen.setAttribute('aria-hidden', String(!here));
      if (here) screen.dataset.current = '';
      else screen.removeAttribute('data-current');

      const shade = part(root, `veil-${index}`);
      shade.style.transition = animate ? VEIL : 'none';
      shade.style.opacity = index < level ? '0.5' : '0';
    });
    depth.textContent = `${level + 1} of ${LEVELS.length}`;
  };

  const go = (level: number) => {
    const from = Number(slot.dataset.level);
    if (from === level) return;
    clock.clearTimeout(settling);
    slot.dataset.level = String(level);
    slot.dataset.dir = level > from ? 'push' : 'pop';
    slot.dataset.state = 'moving';
    render(true);
    settling = clock.setTimeout(() => {
      slot.dataset.state = 'settled';
    }, MOVE_MS + 110);
  };

  part(root, 'row-shanties').addEventListener('click', () => go(1));
  part(root, 'row-haul').addEventListener('click', () => go(2));
  part(root, 'back-1').addEventListener('click', () => go(0));
  part(root, 'back-2').addEventListener('click', () => go(1));

  render(false);
}
