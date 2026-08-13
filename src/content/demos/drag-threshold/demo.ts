import { part } from '#src/kit/parts.ts';

/** The dead zone itself, in px, and the scene the card is dragged around. */
const THRESHOLD = 8;
const STAGE = { w: 412, h: 168 };
const CARD = { x: 40, y: 40, w: 160, h: 88 };
const CENTRE = { x: CARD.x + CARD.w / 2, y: CARD.y + CARD.h / 2 };

/** The two ends a scripted stroke aims at: one inside the dead zone, one well outside it. */
const TWITCH = { x: CENTRE.x + 6, y: CENTRE.y + 4 };
const SHOVE = { x: CENTRE.x + 96, y: CENTRE.y };

const DOT = 8;

const dot = (name: string, at: { x: number; y: number }) =>
  `<span
     data-part="${name}"
     style="position: absolute; left: ${at.x - DOT / 2}px; top: ${at.y - DOT / 2}px; width: ${DOT}px; height: ${DOT}px; border-radius: 50%; background: var(--sp-ink)"
   ></span>`;

const tag = (text: string, at: { x: number; y: number }) =>
  `<span class="sp-label" style="position: absolute; left: ${at.x}px; top: ${at.y}px; font-size: 11px; white-space: nowrap">${text}</span>`;

const distance = (dx: number, dy: number) => Math.round(Math.hypot(dx, dy));

/**
 * Drag threshold specimen: a card that ignores pointer travel under eight pixels, with the
 * dead zone drawn around the point the press landed and the distance read out live. The
 * subject is the card, since the threshold is a property of the draggable thing rather
 * than of the board it sits on; the ring, the two aiming dots, and the readouts are
 * instrumentation and stay in the context register.
 *
 * Both outcomes are really computed from the pointer, not mimed: a stroke that stays
 * inside the ring ends as a click, and one that leaves it engages the drag. The travel
 * spent crossing the ring is subtracted before the card starts following, which is why the
 * card does not jump by the width of the dead zone at the moment it wakes up.
 *
 * The card moves by a transform inside a fixed board and every readout holds its width, so
 * a drag moves the card and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sprint board</span>
          <span class="sp-text" data-part="readout" style="width: 216px; text-align: right; white-space: nowrap">Press the card and move a little</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div data-part="stage" style="position: relative; width: ${STAGE.w}px; height: ${STAGE.h}px">
            <div
              class="sp-surface"
              data-part="card"
              data-verdict="none"
              data-state="idle"
              data-subject
              style="position: absolute; left: ${CARD.x}px; top: ${CARD.y}px; width: ${CARD.w}px; height: ${CARD.h}px; padding: 10px 12px; transform: translate(0px, 0px); transition: none; cursor: grab; touch-action: none; user-select: none"
            >
              <span class="sp-heading" style="font-size: 13px">Ferry timetable</span>
              <span class="sp-text" style="display: block; margin-top: 4px; font-size: 12px">Due Thursday</span>
            </div>
            <div class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              <span
                data-part="ring"
                data-state="idle"
                style="position: absolute; left: ${CENTRE.x - THRESHOLD}px; top: ${CENTRE.y - THRESHOLD}px; width: ${THRESHOLD * 2}px; height: ${THRESHOLD * 2}px; border: 1px dashed var(--sp-muted); border-radius: 50%"
              ></span>
              ${dot('twitch', TWITCH)}
              ${dot('shove', SHOVE)}
              ${tag(`${THRESHOLD} px`, { x: CENTRE.x - 40, y: CENTRE.y - 8 })}
              ${tag(`${distance(TWITCH.x - CENTRE.x, TWITCH.y - CENTRE.y)} px: a twitch`, { x: CENTRE.x + 12, y: CENTRE.y + 8 })}
              ${tag(`${distance(SHOVE.x - CENTRE.x, SHOVE.y - CENTRE.y)} px: a drag`, { x: SHOVE.x - 24, y: SHOVE.y - 26 })}
            </div>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label sp-grow" data-part="travel" style="font-variant-numeric: tabular-nums">0 px travelled, ${THRESHOLD} px needed</span>
          <span class="sp-label">Under the ring it is still a click</span>
        </div>
      </div>
    </div>
  `;

  const stage = part(root, 'stage');
  const card = part(root, 'card');
  const ring = part(root, 'ring');
  const readout = part(root, 'readout');
  const travel = part(root, 'travel');

  let origin: { x: number; y: number } | undefined;
  /** Where the card stands, and the travel already spent when the drag woke up. */
  let placed = { x: 0, y: 0 };
  let crossed: { x: number; y: number } | undefined;

  const say = (verdict: string, text: string) => {
    card.dataset.verdict = verdict;
    readout.textContent = text;
  };

  card.addEventListener('pointerdown', (event) => {
    // The board is read before anything is written to it, so the ring lands on the point
    // the press actually landed on rather than on a stale box.
    const box = stage.getBoundingClientRect();
    origin = { x: event.clientX, y: event.clientY };
    crossed = undefined;
    ring.style.left = `${event.clientX - box.left - THRESHOLD}px`;
    ring.style.top = `${event.clientY - box.top - THRESHOLD}px`;
    ring.dataset.state = 'live';
    card.dataset.state = 'pressed';
    travel.textContent = `0 px travelled, ${THRESHOLD} px needed`;
    say('none', 'Pressed: nothing has moved yet');
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    const travelled = Math.hypot(dx, dy);
    travel.textContent = `${Math.round(travelled)} px travelled, ${THRESHOLD} px needed`;
    if (!crossed) {
      if (travelled < THRESHOLD) return say('none', `Inside the ring: ${Math.round(travelled)} px`);
      // The travel spent crossing is banked, so the card starts from where it stands
      // instead of jumping by the width of the dead zone.
      crossed = { x: dx, y: dy };
      card.dataset.state = 'dragging';
    }
    card.style.transform = `translate(${placed.x + dx - crossed.x}px, ${placed.y + dy - crossed.y}px)`;
    say('none', `Dragging: ${Math.round(travelled)} px from the press`);
  });

  const release = (event: PointerEvent) => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    const travelled = distance(dx, dy);
    origin = undefined;
    ring.dataset.state = 'idle';
    card.dataset.state = 'idle';
    if (!crossed) return say('click', `Released at ${travelled} px: a click`);
    placed = { x: placed.x + dx - crossed.x, y: placed.y + dy - crossed.y };
    crossed = undefined;
    say('drag', `Dragged ${travelled} px: the card moved`);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
