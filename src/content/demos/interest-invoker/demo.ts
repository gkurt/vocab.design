import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The platform's own defaults for `interest-delay-start` and `interest-delay-end`. */
const START_MS = 500;
const END_MS = 500;

const TRIGGER = [
  'display: inline',
  'padding: 0',
  'border: 0',
  'background: none',
  'font: inherit',
  'color: var(--sp-accent)',
  'text-decoration: underline',
  'text-underline-offset: 2px',
  'cursor: pointer',
  'touch-action: none',
].join('; ');

const card = (key: string): string => `
  <div
    class="sp-popover"
    data-part="${key}-card"
    id="${key}-card"
    role="tooltip"
    style="left: 0; right: 0; top: 52px; min-width: 0; --sp-arrow-x: 30px"
  >
    <div class="sp-row" style="gap: 8px">
      <span class="sp-avatar">AL</span>
      <div style="min-width: 0">
        <div class="sp-heading" style="font-size: 12px">Ada Lovelace</div>
        <div class="sp-text" style="font-size: 11px">Mathematician, 1815 to 1852</div>
      </div>
    </div>
  </div>`;

const column = (key: string, label: string, touch: boolean, subject: boolean): string => `
  <div
    ${touch ? 'data-touch' : ''}
    style="flex: 1 1 0; min-width: 0; position: relative; min-height: 112px"
  >
    <span class="sp-label">${label}</span>
    <p class="sp-text sp-text--ink" style="margin: 4px 0 0">
      Translated by
      <button type="button" data-part="${key}-trigger" ${subject ? 'data-subject' : ''} interestfor="${key}-card" style="${TRIGGER}">
        Ada Lovelace</button
      >, 1843.
    </p>
    ${card(key)}
  </div>`;

/**
 * Interest invoker specimen: one control, two of the three inputs the platform defines
 * interest for. On the left a pointer dwells past the delay; on the right, inside a touch
 * scope where no hover can ever arrive, the same control answers a press held for the same
 * length of time. Focus is the third path and it is really wired, so a reader who tabs to
 * either trigger gets the card the script cannot ask for (attract never moves real focus,
 * SPEC §7). Escape gives interest up, exactly as the explainer says it must.
 *
 * The subject is the trigger on the left, the narrowest element the term names: the card
 * beside it is a hover card, which is a different word. The right-hand column is a peer
 * instance of the same term rather than scenery, so it keeps its own paint.
 *
 * The two columns were headed "Pointer: a dwell" and "Touch: a press held", which named the
 * gesture the reader was about to watch rather than the input the column is for. They name the
 * input now, and the note the stage draws in the strip already spells out the rest.
 *
 * The delays are the explainer's own defaults, held on the stage clock so a pose cannot be
 * dismissed mid-inspection. The touch column wires no `pointerenter` at all, because a
 * finger cannot hover and hover paint inside a touch scope would hand a reader the one
 * thing they cannot do (SPEC §7).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px; padding: 14px">
        <div class="sp-row" style="align-items: flex-start; gap: 20px">
          ${column('a', 'Pointer', false, true)}
          ${column('b', 'Touch', true, false)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 12px 0 0">
          Interest is defined per input: a pointer dwells, a keyboard focuses, a finger presses and
          holds. Escape always gives it up.
        </p>
      </div>
    </div>
  `;

  type Lane = { trigger: HTMLElement; card: HTMLElement; timer?: number };
  const lanes: Record<string, Lane> = {};

  const show = (key: string) => {
    const lane = lanes[key];
    if (!lane) return;
    clock.clearTimeout(lane.timer);
    lane.timer = undefined;
    flag(lane.card, 'data-open', true);
  };

  const hide = (key: string) => {
    const lane = lanes[key];
    if (!lane) return;
    clock.clearTimeout(lane.timer);
    lane.timer = undefined;
    flag(lane.card, 'data-open', false);
  };

  /** Interest is shown after a wait and given up after one, which is the whole contract. */
  const arm = (key: string, ms: number, then: () => void) => {
    const lane = lanes[key];
    if (!lane) return;
    clock.clearTimeout(lane.timer);
    lane.timer = clock.setTimeout(then, ms);
  };

  for (const key of ['a', 'b']) {
    lanes[key] = { trigger: part(root, `${key}-trigger`), card: part(root, `${key}-card`) };
  }

  // Pointer lane: a dwell shows interest, leaving gives it up after the end delay.
  lanes.a?.trigger.addEventListener('pointerenter', () => arm('a', START_MS, () => show('a')));
  lanes.a?.trigger.addEventListener('pointerleave', () => arm('a', END_MS, () => hide('a')));

  // Touch lane: no hover exists here, so the press itself is the dwell. The capture is
  // what keeps a real finger's release reporting once it slides off the word.
  lanes.b?.trigger.addEventListener('pointerdown', (event) => {
    if (event.isTrusted) (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    arm('b', START_MS, () => show('b'));
  });
  for (const type of ['pointerup', 'pointercancel'] as const) {
    lanes.b?.trigger.addEventListener(type, () => {
      const lane = lanes.b;
      if (lane && !lane.card.hasAttribute('data-open')) hide('b');
    });
  }

  // Focus is the third input the platform names, and Escape is the one way out of all three.
  for (const key of ['a', 'b']) {
    const lane = lanes[key];
    if (!lane) continue;
    lane.trigger.addEventListener('focus', () => arm(key, START_MS, () => show(key)));
    lane.trigger.addEventListener('blur', () => hide(key));
    lane.trigger.addEventListener('keydown', (event) => {
      if ((event as KeyboardEvent).key === 'Escape') hide(key);
    });
  }
}
