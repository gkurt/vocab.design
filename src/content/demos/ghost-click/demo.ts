import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The legacy pipeline, in the three moments the ruler is drawn from. */
const BANNER_MS = 50;
const CLICK_MS = 300;
const SPAN_MS = 400;
const TICK_MS = 20;

const ROW_H = 34;
const ROW_GAP = 4;
const SHIFT = ROW_H + ROW_GAP;
/** Where the finger came down, in the panel's own coordinates: fixed for the whole replay. */
const POINT_X = 24;
const POINT_Y = 6 + ROW_H + ROW_GAP + ROW_H / 2;

const ROWS = [
  { key: 'delete', label: 'Delete account', subject: true },
  { key: 'dismiss', label: 'Dismiss', subject: false },
  { key: 'solve', label: 'Mark as solved', subject: false },
];

const row = ({ key, label, subject }: (typeof ROWS)[number]) => `
  <button
    type="button"
    data-part="row-${key}"
    data-row="${key}"
    ${subject ? 'data-subject' : ''}
    style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: ${ROW_H}px; padding: 0 12px 0 44px; border: 0; border-radius: 6px; background: var(--sp-sunken); color: var(--sp-ink); font: inherit; font-size: 13px; text-align: left; cursor: pointer"
  >
    <span class="sp-grow" style="min-width: 0">${label}</span>
    <span class="sp-label" data-part="mark-${key}" style="width: 112px; text-align: right"></span>
  </button>`;

/**
 * Ghost click specimen: the legacy touch pipeline replayed on the stage's clock. The touch
 * is handled at a fixed point inside the panel, a banner arrives and pushes the rows down
 * one place, and the synthesized click is dispatched at that same point three hundred
 * milliseconds later. The row it reaches is found with `elementFromPoint`, not decided in
 * advance, which is the whole claim the term makes: a click carries a coordinate, and the
 * element is whatever is standing there when it lands.
 *
 * The subject is the destructive row, the control the phantom click activates. The term
 * names an activation nobody aimed at, so the narrowest element it names is the one that
 * receives it. The dashed ring is not apparatus: it draws the coordinate the held-back click
 * carries, which is the term's own claim, and it is the box the demo hit-tests through
 * `elementFromPoint`, so it keeps the accent and stays out of the context register. The ruler
 * and the replay control are the apparatus and do carry it.
 *
 * The shift is the term, so it is allowed, and it is contained: the panel is clipped and
 * the banner is drawn inside it, so nothing outside the panel moves at all (SPEC §5). Each
 * row reserves the width of its own verdict, so a row being marked shifts no text.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Support</span>
          <span class="sp-text" data-part="readout" style="width: 300px; text-align: right; white-space: nowrap">One touch, waiting to be replayed</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="panel"
            data-phase="idle"
            style="position: relative; height: 128px; overflow: hidden"
          >
            <div
              data-part="rows"
              style="position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; gap: ${ROW_GAP}px; padding: 6px; transform: translateY(0); transition: transform 0.18s var(--sp-ease)"
            >${ROWS.map(row).join('')}</div>
            <div
              class="sp-context"
              data-part="banner"
              style="position: absolute; left: 0; right: 0; top: 0; display: flex; align-items: center; height: ${SHIFT}px; padding: 0 12px; background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 12px; transform: translateY(-100%); transition: transform 0.18s var(--sp-ease)"
            >Your session expires in 2 minutes</div>
            <span
              data-part="point"
              style="position: absolute; left: ${POINT_X}px; top: ${POINT_Y}px; width: 26px; height: 26px; margin: -13px 0 0 -13px; border: 2px dashed var(--sp-accent); border-radius: 50%; pointer-events: none"
            ></span>
          </div>
          <div class="sp-context" data-part="ruler" style="position: relative; height: 46px">
            <span class="sp-label" style="position: absolute; left: 0; top: 0; font-size: 10px; white-space: nowrap">touchend, handled here</span>
            <span
              class="sp-label"
              style="position: absolute; left: 75%; top: 0; font-size: 10px; white-space: nowrap; transform: translateX(-50%)"
            >click, ${CLICK_MS} ms later</span>
            <span style="position: absolute; left: 0; top: 15px; width: 2px; height: 8px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: 12.5%; top: 15px; width: 2px; height: 8px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: 75%; top: 15px; width: 2px; height: 8px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: 0; right: 0; top: 23px; height: 5px; border-radius: 3px; background: var(--sp-sunken)"></span>
            <span
              data-part="fill"
              style="position: absolute; left: 0; top: 23px; width: 0; height: 5px; border-radius: 3px; background: var(--sp-accent)"
            ></span>
            <span
              data-part="pip"
              style="position: absolute; left: 75%; top: 21px; width: 9px; height: 9px; margin-left: -4px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.12s"
            ></span>
            <span class="sp-label" style="position: absolute; left: 0; top: 31px; font-size: 10px">0</span>
            <span class="sp-label" style="position: absolute; left: 12.5%; top: 31px; font-size: 10px; transform: translateX(-50%)">banner</span>
            <span class="sp-label" style="position: absolute; right: 0; top: 31px; font-size: 10px">${SPAN_MS} ms</span>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay the legacy pipeline</button>
        <span class="sp-label">The click carries a point, not an element.</span>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const rows = part(root, 'rows');
  const banner = part(root, 'banner');
  const point = part(root, 'point');
  const fill = part(root, 'fill');
  const pip = part(root, 'pip');
  const readout = part(root, 'readout');

  let timer: number | undefined;
  let elapsed = 0;
  let shifted = false;
  /** True only while the demo is delivering the synthesized click, so a row can tell. */
  let phantom = false;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const mark = (key: string, text: string) => {
    part(root, `mark-${key}`).textContent = text;
  };

  const reset = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    elapsed = 0;
    shifted = false;
    panel.dataset.phase = 'idle';
    rows.style.transform = 'translateY(0)';
    banner.style.transform = 'translateY(-100%)';
    fill.style.width = '0';
    pip.style.opacity = '0';
    for (const { key } of ROWS) {
      part(root, `row-${key}`).removeAttribute('data-ghosted');
      part(root, `row-${key}`).removeAttribute('data-tapped');
      mark(key, '');
    }
  };

  /** Deliver the click the browser held back, at the coordinate the finger used. */
  const deliver = () => {
    const box = point.getBoundingClientRect();
    const scope = root.getRootNode() as unknown as DocumentOrShadowRoot;
    const hit = scope.elementFromPoint?.(box.left + box.width / 2, box.top + box.height / 2) ?? null;
    const target = hit?.closest<HTMLElement>('[data-row]') ?? null;
    pip.style.opacity = '1';
    panel.dataset.phase = 'ghosted';
    if (!target) return say(`Click ${CLICK_MS} ms later, same point: nothing there`);
    phantom = true;
    target.click();
    phantom = false;
  };

  const tick = () => {
    elapsed += TICK_MS;
    fill.style.width = `${(Math.min(elapsed, CLICK_MS) / SPAN_MS) * 100}%`;
    if (!shifted && elapsed >= BANNER_MS) {
      shifted = true;
      panel.dataset.phase = 'shifted';
      banner.style.transform = 'translateY(0)';
      rows.style.transform = `translateY(${SHIFT}px)`;
      say('A banner arrives: every row moves down one');
    }
    if (elapsed >= CLICK_MS) {
      timer = undefined;
      return deliver();
    }
    timer = clock.setTimeout(tick, TICK_MS);
  };

  for (const { key, label } of ROWS) {
    part(root, `row-${key}`).addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLElement;
      if (!phantom) {
        flag(target, 'data-tapped', true);
        mark(key, 'you pressed this');
        return say(`Pressed: ${label}`);
      }
      flag(target, 'data-ghosted', true);
      mark(key, 'ghost click');
      say(`Click ${CLICK_MS} ms later, same point: ${label}`);
    });
  }

  // Reached, never flipped (SPEC §8): a replay always starts from the same frame, so every
  // pass delivers the same click to the same coordinate.
  part(root, 'replay').addEventListener('click', () => {
    reset();
    panel.dataset.phase = 'touched';
    flag(part(root, 'row-dismiss'), 'data-tapped', true);
    mark('dismiss', 'touchend handled');
    say('touchend handled by Dismiss, under the finger');
    timer = clock.setTimeout(tick, TICK_MS);
  });
}
