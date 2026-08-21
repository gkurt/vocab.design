import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The five positions the control settles into, and what each one is worth. */
const STOPS = [
  { label: 'Off', value: '0%' },
  { label: 'Low', value: '25%' },
  { label: 'Medium', value: '50%' },
  { label: 'High', value: '75%' },
  { label: 'Max', value: '100%' },
];

/** The rail, in px, and the span the thumb's centre may travel along it. */
const RAIL = 380;
const THUMB = { w: 32, h: 24 };
const TRAVEL = { from: THUMB.w / 2 + 4, to: RAIL - THUMB.w / 2 - 4 };
/** How close the centre has to come before the well takes hold, and how long the tick shows. */
const CATCH = 14;
const TICK_MS = 200;

const centreOf = (i: number) => TRAVEL.from + (i * (TRAVEL.to - TRAVEL.from)) / (STOPS.length - 1);

const wells = STOPS.map(
  (_, i) => `
    <span
      data-part="well-${i}"
      ${i === 2 ? 'data-subject' : ''}
      style="position: absolute; left: ${centreOf(i) - 11}px; top: 27px; width: 22px; height: 16px; border-radius: 5px;
             box-shadow: inset 0 0 0 2px var(--sp-line)"
    ></span>`,
).join('');

const names = STOPS.map(
  ({ label }, i) => `
    <span class="sp-label" style="position: absolute; left: ${centreOf(i)}px; top: 50px; transform: translateX(-50%); font-size: 10px; white-space: nowrap">${label}</span>`,
).join('');

/**
 * Detent specimen: a rail with five drawn wells, and a thumb whose needle drops into
 * whichever well it comes near. Dragging sweeps the needle across; within 14 px of a
 * well the value refuses to move at all, which is the resistance the word names, and
 * letting go between two wells is answered by a pull onto the nearer one.
 *
 * The subject is one well, the middle one: the term names a position a control settles
 * into, and a position has no element of its own, so it is given one (SPEC §5). Not the
 * rail, which is the control, and not the thumb, which is the part that gets caught. The
 * wells are drawn at rest and ride below the thumb rather than under it, so the pin never
 * has to ring something the reader cannot see, at mount or at any state the script visits.
 *
 * The drag is really computed from the pointer. Capture is taken on a trusted pointerdown
 * or a reader's drag would die the moment the pointer leaves a 32 px thumb, and the guard
 * is mandatory: the player's synthetic pointers have nothing to capture and the call
 * throws (SPEC §7). The release is answered on pointerup and pointercancel, never on
 * pointerleave, which does not fire while capture holds.
 *
 * Every readout holds its width and the thumb moves by transform inside a fixed rail, so
 * a value running from Off to Max moves nothing else (SPEC §5). The settle rides one
 * inline transition, which the kit's reduced-motion rule switches off for a reader who
 * asked for less movement.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fan speed</span>
          <span class="sp-text" data-part="readout" style="flex: 0 0 auto; width: 232px; text-align: right; white-space: nowrap">Off (0%)</span>
        </div>
        <div
          class="sp-body"
          data-part="scene"
          data-detent="0"
          data-caught="none"
          data-settle="landed"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px"
        >
          <div class="sp-surface" style="padding: 16px 20px 12px">
            <div style="position: relative; width: ${RAIL}px; height: 66px">
              <span
                style="position: absolute; left: 0; top: 20px; width: ${RAIL}px; height: 30px; border-radius: 9px;
                       background: var(--sp-sunken); box-shadow: inset 0 0 0 1px var(--sp-line)"
              ></span>
              ${wells}
              ${names}
              <span data-part="between" style="position: absolute; left: ${centreOf(2) + 24}px; top: 30px; width: 8px; height: 8px; pointer-events: none"></span>
              <span
                data-part="thumb"
                style="position: absolute; left: 0; top: 0; width: ${THUMB.w}px; height: ${THUMB.h}px; border-radius: 7px;
                       background: var(--sp-accent); transform: translateX(${TRAVEL.from - THUMB.w / 2}px);
                       cursor: grab; touch-action: none; user-select: none"
              >
                <span
                  aria-hidden="true"
                  style="position: absolute; left: 50%; top: ${THUMB.h}px; width: 4px; height: 11px; margin-left: -2px;
                         border-radius: 0 0 2px 2px; background: var(--sp-accent)"
                ></span>
              </span>
            </div>
          </div>
          <span class="sp-text sp-context" style="width: 408px; font-size: 11px; line-height: 1.35; text-align: center">
            The value sticks for a few pixels either side of a well, so the number steps rather than slides.
            Let go between two wells and the nearer one takes it.
          </span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const thumb = part(root, 'thumb');
  const readout = part(root, 'readout');
  const wellEls = STOPS.map((_, i) => part(root, `well-${i}`));

  /** Where the thumb's centre stands, and which well has hold of it. */
  let centre = centreOf(0);
  let caught: number | undefined = 0;
  let origin: { x: number; centre: number } | undefined;
  let entries = 0;
  const ticks = new Map<number, number>();

  const place = (next: number) => {
    centre = Math.max(TRAVEL.from, Math.min(TRAVEL.to, next));
    thumb.style.transform = `translateX(${centre - THUMB.w / 2}px)`;
  };

  const nearest = () => {
    let best = 0;
    for (let i = 1; i < STOPS.length; i++) {
      if (Math.abs(centreOf(i) - centre) < Math.abs(centreOf(best) - centre)) best = i;
    }
    return best;
  };

  /** The catch, said out loud: the well lights for a beat, the way a phone would tick. */
  const tick = (i: number) => {
    const well = wellEls[i];
    if (!well) return;
    flag(well, 'data-hit', true);
    well.style.boxShadow = 'inset 0 0 0 2px var(--sp-accent)';
    clock.clearTimeout(ticks.get(i));
    ticks.set(
      i,
      clock.setTimeout(() => {
        flag(well, 'data-hit', false);
        well.style.boxShadow = 'inset 0 0 0 2px var(--sp-line)';
      }, TICK_MS),
    );
  };

  const say = () => {
    const stop = caught === undefined ? undefined : STOPS[caught];
    scene.dataset.detent = caught === undefined ? 'free' : String(caught);
    if (stop) return void (readout.textContent = `${stop.label} (${stop.value})`);
    const low = STOPS[nearest()];
    readout.textContent = `Between wells${low ? ` (nearest ${low.label})` : ''}`;
  };

  const hold = (i: number | undefined) => {
    if (i === caught) return;
    if (i !== undefined) {
      entries += 1;
      scene.dataset.caught = entries > 1 ? 'many' : 'one';
      tick(i);
    }
    caught = i;
    say();
  };

  thumb.addEventListener('pointerdown', (event) => {
    // A real drag has to keep reporting once the pointer leaves a 32 px thumb. Synthetic
    // pointers have no capture to take and the call throws, so the guard is mandatory.
    if (event.isTrusted) thumb.setPointerCapture(event.pointerId);
    origin = { x: event.clientX, centre };
    entries = 0;
    scene.dataset.caught = 'none';
    scene.dataset.settle = 'holding';
    thumb.style.transition = 'none';
    thumb.style.cursor = 'grabbing';
  });

  thumb.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const wanted = origin.centre + (event.clientX - origin.x);
    let stuck: number | undefined;
    for (let i = 0; i < STOPS.length; i++) {
      if (Math.abs(wanted - centreOf(i)) <= CATCH) stuck = i;
    }
    // Inside a well the thumb does not move at all: the travel is spent on the resistance,
    // which is what makes the value step instead of slide.
    place(stuck === undefined ? wanted : centreOf(stuck));
    hold(stuck);
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    thumb.style.cursor = 'grab';
    thumb.style.transition = 'transform 130ms var(--sp-ease)';
    const landed = caught !== undefined;
    scene.dataset.settle = landed ? 'landed' : 'pulled';
    const target = landed ? caught : nearest();
    place(centreOf(target as number));
    if (!landed) tick(target as number);
    caught = target;
    say();
  };

  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', release);
}
