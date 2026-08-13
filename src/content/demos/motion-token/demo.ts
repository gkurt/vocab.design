import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The duration the easing rows are all run at, so the curves are compared and not the times. */
const COMPARE_MS = 600;
/** The consumer's own beat of clearance, so its reset is painted before it moves. */
const LEAD = 60;
const STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

const TOKENS = [
  { id: 'duration-fast', value: '120 ms', dur: 120, timing: STANDARD },
  { id: 'duration-base', value: '240 ms', dur: 240, timing: STANDARD },
  { id: 'duration-slow', value: '400 ms', dur: 400, timing: STANDARD },
  { id: 'ease-standard', value: '0.2, 0, 0, 1', dur: COMPARE_MS, timing: STANDARD },
  { id: 'ease-enter', value: '0, 0, 0, 1', dur: COMPARE_MS, timing: 'cubic-bezier(0, 0, 0, 1)' },
  { id: 'ease-exit', value: '0.3, 0, 1, 1', dur: COMPARE_MS, timing: 'cubic-bezier(0.3, 0, 1, 1)' },
];

const LONGEST = Math.max(...TOKENS.map((token) => token.dur));
/** What the consumer spends, named here exactly as a component would name it. */
const CONSUMES = { dur: 240, timing: STANDARD };

/**
 * Motion token specimen: the set itself, published as a table. Each row carries a name, the
 * value behind it, and a dot that runs that value, so the difference between
 * `duration-fast` and `duration-slow` is legible as a distance covered in a moment rather
 * than as two numbers. The three easing rows all run at one duration, since a curve compared
 * at a different speed is not being compared at all.
 *
 * The subject is the token table: the term names the published set, not any component that
 * spends it. The Replay control and the consumer beside it are scenery, the second being the
 * point rather than the term (a card whose entrance is spelled `duration-base` and
 * `ease-standard` instead of two numbers a component author picked alone).
 *
 * The dots are the kit's own travelling primitive, so `motion.css` owns their reduced-motion
 * behaviour and pauses them off screen; each row states only its duration and its curve. The
 * consumer is a transition the demo drives, so it asks `prefersReducedMotion` itself and
 * lands rather than travelling (SPEC §5). Every timer is the stage's, so a pose stops the
 * run where it stands (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = TOKENS.map(
    (token) => `
      <tr data-part="row-${token.id}">
        <td>${token.id}</td>
        <td class="sp-text">${token.value}</td>
        <td>
          <span class="sp-track" style="display: block; width: 108px; flex: 0 0 auto">
            <span
              class="sp-dot"
              data-part="dot-${token.id}"
              style="animation-duration: ${token.dur}ms; --sp-timing: ${token.timing}"
            ></span>
          </span>
        </td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 432px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Motion tokens</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 10px">
          <table
            class="sp-table"
            data-part="table"
            data-subject
            data-state="settled"
            style="flex: 1 1 auto; --sp-cell-pad: 3px 8px"
          >
            <thead>
              <tr>
                <th style="width: 108px">Token</th>
                <th style="width: 78px">Value</th>
                <th>Runs like</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="sp-stack sp-context" style="flex: 0 0 98px; gap: 8px">
            <span class="sp-label">Spent by</span>
            <div
              class="sp-surface"
              data-part="consumer"
              style="height: 74px; padding: 8px; opacity: 0; transform: translateY(10px)"
            >
              <span class="sp-label">Card</span>
              <span class="sp-line" style="display: block; width: 84%; margin-top: 10px"></span>
              <span class="sp-line" style="display: block; width: 60%; margin-top: 8px"></span>
            </div>
            <span class="sp-label" style="line-height: 1.35">enter: duration-base, ease-standard</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const table = part(root, 'table');
  const consumer = part(root, 'consumer');
  let settling: number | undefined;
  let arriving: number | undefined;

  const land = () => {
    consumer.style.transition = `opacity ${CONSUMES.dur}ms ${CONSUMES.timing}, transform ${CONSUMES.dur}ms ${CONSUMES.timing}`;
    consumer.style.opacity = '1';
    consumer.style.transform = 'none';
    consumer.dataset.arrived = '';
  };

  const play = () => {
    clock.clearTimeout(settling);
    clock.clearTimeout(arriving);

    if (prefersReducedMotion(root)) {
      consumer.style.transition = 'none';
      land();
      table.dataset.state = 'settled';
      return;
    }

    // Taking the attribute away and putting it back is what restarts the kit's animation;
    // the reflow between the two is what stops the browser coalescing them into no change.
    table.removeAttribute('data-running');
    consumer.style.transition = 'none';
    consumer.style.opacity = '0';
    consumer.style.transform = 'translateY(10px)';
    consumer.removeAttribute('data-arrived');
    void table.offsetWidth;
    table.dataset.running = '';
    table.dataset.state = 'playing';

    arriving = clock.setTimeout(land, LEAD);
    settling = clock.setTimeout(() => {
      table.dataset.state = 'settled';
    }, LONGEST + 100);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
