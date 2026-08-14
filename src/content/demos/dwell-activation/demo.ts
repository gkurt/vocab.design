import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The hold the toolbar asks for, and how often the ring is repainted while it runs. */
const DWELL_MS = 1200;
const TICK_MS = 60;

const TOOLS: { key: string; label: string; glyph: IconName }[] = [
  { key: 'tool-line', label: 'Line', glyph: 'minus' },
  { key: 'dwell', label: 'Draw', glyph: 'pencil' },
  { key: 'tool-stamp', label: 'Stamp', glyph: 'star' },
];

const RING = [
  'position: absolute',
  'left: 50%',
  'top: 50%',
  'width: 38px',
  'height: 38px',
  'margin: -19px 0 0 -19px',
  'border-radius: 50%',
  'pointer-events: none',
  'opacity: 0',
  'transition: opacity 0.12s',
  'background: conic-gradient(var(--sp-accent) calc(var(--sp-dwell, 0) * 1turn), var(--sp-sunken) 0)',
  'mask: radial-gradient(circle, transparent 16px, #000 17px)',
].join('; ');

/**
 * Dwell activation specimen: a drawing toolbar where a tool is chosen by resting on it. The
 * ring fills while the pointer holds still and the tool commits when it closes; leaving
 * before that empties the ring, which is what crossing a toolbar on the way somewhere else
 * has to do.
 *
 * The subject is the Draw button, since the term names the gesture one control answers
 * rather than the toolbar it sits in or the page the tool draws on. The other two tools are
 * wired identically and stay in the context register, as do the page and the readout.
 *
 * Unlike a long press or a spring-loaded drag, the held state here is one the player can
 * actually reach: a hover is what `moveTo` leaves behind when the cursor arrives, so this
 * specimen needs no simulation control. The countdown is a real clock timer started by
 * `pointerenter` and cancelled by `pointerleave`, which is why the scripted pass can cross
 * the button on its way to the page and show the ring emptying.
 *
 * Nothing is re-parented while the ring runs, and selection changes paint only, so a tool
 * committing moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const buttons = TOOLS.map(({ key, label, glyph }) => {
    const subject = key === 'dwell';
    return `
      <button
        class="sp-button sp-button--ghost${subject ? '' : ' sp-context'}"
        type="button"
        data-part="${key}"
        ${subject ? 'data-subject' : ''}
        aria-label="${label}"
        style="position: relative; width: 46px; height: 46px; padding: 0; display: flex; align-items: center; justify-content: center"
      >
        ${icon(glyph)}
        <span data-part="ring-${key}" style="${RING}"></span>
      </button>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 278px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-text" data-part="readout" style="width: 246px; text-align: right; white-space: nowrap">Rest on a tool to choose it</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            class="sp-row sp-surface"
            data-part="toolbar"
            data-outcome="idle"
            style="gap: 6px; padding: 6px"
          >${buttons}</div>

          <div
            class="sp-surface sp-context"
            data-part="away"
            style="display: flex; flex-direction: column; justify-content: space-between; width: 400px; height: 132px; padding: 12px"
          >
            <div class="sp-stack" style="gap: 8px">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 64%"></div>
              <div class="sp-line" style="width: 78%"></div>
            </div>
            <span class="sp-label">The page. Crossing a tool on the way here empties its ring.</span>
          </div>

          <span class="sp-label sp-context">No press anywhere: holding still for ${DWELL_MS} ms is the click.</span>
        </div>
      </div>
    </div>
  `;

  const toolbar = part(root, 'toolbar');
  const readout = part(root, 'readout');

  let timer: number | undefined;
  let elapsed = 0;
  let running: string | undefined;

  const say = (outcome: string, text: string) => {
    toolbar.dataset.outcome = outcome;
    readout.textContent = text;
  };

  const paint = (key: string, fraction: number, shown: boolean) => {
    const ring = part(root, `ring-${key}`);
    ring.style.setProperty('--sp-dwell', String(fraction));
    ring.style.opacity = shown ? '1' : '0';
  };

  const clearDwell = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    if (running) paint(running, 0, false);
    running = undefined;
    elapsed = 0;
  };

  const commit = (key: string) => {
    const label = TOOLS.find((tool) => tool.key === key)?.label ?? '';
    clearDwell();
    for (const tool of TOOLS) flag(part(root, tool.key), 'data-selected', tool.key === key);
    say('activated', `${label} chosen by resting ${DWELL_MS} ms`);
  };

  const tick = (key: string) => {
    elapsed += TICK_MS;
    paint(key, Math.min(elapsed / DWELL_MS, 1), true);
    if (elapsed >= DWELL_MS) return commit(key);
    say('dwelling', `Dwelling: ${elapsed} of ${DWELL_MS} ms`);
    timer = clock.setTimeout(() => tick(key), TICK_MS);
  };

  for (const { key, label } of TOOLS) {
    const button = part(root, key);

    // The hold is armed by arrival and paid for while it runs: the ring is the only
    // warning a reader gets, and the only way to change their mind is to leave.
    button.addEventListener('pointerenter', () => {
      clearDwell();
      running = key;
      paint(key, 0, true);
      say('dwelling', `Dwelling on ${label}`);
      timer = clock.setTimeout(() => tick(key), TICK_MS);
    });

    button.addEventListener('pointerleave', () => {
      if (running !== key) return;
      const spent = elapsed;
      clearDwell();
      say('cancelled', `Left after ${spent} ms: the ring emptied`);
    });
  }

  flag(part(root, 'tool-line'), 'data-selected', true);
}
