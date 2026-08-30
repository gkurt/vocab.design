import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Mode = 'fake' | 'fair';

const TICK_MS = 1000;
/** Five minutes, the round number a manufactured deadline always seems to start at. */
const START_S = 299;

const two = (n: number) => String(n).padStart(2, '0');
const face = (total: number) => `${two(Math.floor(total / 60))}:${two(total % 60)}`;

const VERDICT = {
  fake: 'Reload and the clock starts again at five minutes. Nothing expires when it reaches zero.',
  fair: 'A dated deadline survives a reload, because the price really does change on Friday.',
} as const;

const BODY = {
  fake: `
    <span class="sp-label" style="font-size: 11px">Sale price ends in</span>
    <span
      data-part="readout"
      data-at="start"
      style="font-size: 26px; font-weight: 600; line-height: 1.1; color: var(--sp-warn); font-variant-numeric: tabular-nums"
    >${face(START_S)}</span>
    <span class="sp-text" style="font-size: 11px">Order now or the price returns to 64.00.</span>`,
  fair: `
    <span class="sp-label" style="font-size: 11px">Sale price held until</span>
    <span data-part="deadline" style="font-size: 19px; font-weight: 600; line-height: 1.1">Friday 30 May, 6pm</span>
    <span class="sp-text" style="font-size: 11px">The same price is here tomorrow. Nothing on this page is counting.</span>`,
} as const;

/**
 * Fake urgency specimen: the pressure banner on a checkout, with the page's own reload
 * control put where a reader can reach it. Pressing it is the whole demonstration, since
 * the deadline that does not survive a refresh was never a deadline.
 *
 * The subject is the banner alone, not the checkout: the term names the manufactured
 * deadline, and the order summary is only what it is attached to (SPEC §5). The banner
 * declares the fake state as its honest condition (`data-pose`), because ringing the
 * dated version would be a picture of the opposite word (SPEC §6). Both states are drawn
 * at one height, so switching moves nothing around them, and the readout is tabular so a
 * tick cannot twitch the line (SPEC §5). The tick is a clock timer, so identify can hold
 * a number still that is otherwise never the same twice (SPEC §6).
 *
 * A label used to sit over the banner, reading "Limited-time banner (as shipped)" and
 * "(made honest)" with the pick. No checkout labels its own banner that way, and the strip's
 * verdict already names the state, which a specimen may not do twice. It is gone; the banner
 * sits directly under the order summary now.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout</span>
          <span class="sp-label" data-part="reload-count" style="font-size: 11px">Reloads: 0</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="reload" type="button">Reload page</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 8px 10px">
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Cast iron pan, 26cm</span><span class="sp-text">49.00</span></div>
            <div class="sp-row sp-row--between" style="margin-top: 4px"><span class="sp-text sp-text--ink">Delivery</span><span class="sp-text">4.50</span></div>
          </div>
          <div
            class="sp-surface"
            data-part="banner"
            data-subject
            data-pose="[data-mode=fake]"
            data-mode="fake"
            data-reloads="0"
            style="display: flex; flex-direction: column; justify-content: center; gap: 4px; height: 82px; padding: 10px 12px; background: var(--sp-surface)"
          >${BODY.fake}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 292px; font-size: 11px">${VERDICT.fake}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="fake" data-axis="Fake urgency" data-term="fake">
          <button class="sp-segment" data-part="mode-fake" value="fake">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const banner = part(root, 'banner');
  const verdict = part(root, 'verdict');
  const reloadCount = part(root, 'reload-count');

  let left = START_S;
  let timer: number | undefined;

  const paint = () => {
    const readout = root.querySelector<HTMLElement>('[data-part="readout"]');
    if (!readout) return;
    readout.textContent = face(left);
    if (left === START_S) readout.dataset.at = 'start';
    else readout.removeAttribute('data-at');
  };

  const tick = () => {
    left = Math.max(0, left - 1);
    paint();
    if (left > 0) timer = clock.setTimeout(tick, TICK_MS);
  };

  const runClock = (on: boolean) => {
    clock.clearTimeout(timer);
    timer = undefined;
    left = START_S;
    paint();
    if (on) timer = clock.setTimeout(tick, TICK_MS);
  };

  const show = (mode: Mode) => {
    banner.dataset.mode = mode;
    banner.innerHTML = BODY[mode];
    verdict.textContent = VERDICT[mode];
    runClock(mode === 'fake');
  };

  part(root, 'reload').addEventListener('click', () => {
    const reloads = Number(banner.dataset.reloads ?? 0) + 1;
    banner.dataset.reloads = String(reloads);
    reloadCount.textContent = `Reloads: ${reloads}`;
    // The fake deadline is reborn whole; the dated one is untouched, because it is a fact.
    if (banner.dataset.mode === 'fake') runClock(true);
  });

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'fake');
  });

  runClock(true);
}
