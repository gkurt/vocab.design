import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The bars each pass lays out, in the order the loop reaches them. */
const HEIGHTS = [30, 46, 20, 50, 35, 26];
const CHART_H = 50;
/** How long one interleaved iteration is held for, so the count can be read as it climbs. */
const STEP_MS = 260;
/** The batched pass measures once and then writes every bar together. */
const BATCH_MS = 380;
const LEAD = 70;

/**
 * Layout thrashing specimen: the same six bars laid out twice. The batched pass reads every
 * height first and then writes them all, so the frame contains one forced layout and the bars
 * arrive together. The interleaved pass measures each bar after moving the last one, so the
 * count climbs once per iteration and the row crawls into place behind it. Both counters are
 * the point: the work is invisible, and the number beside it is the only way to see it.
 *
 * The subject is the interleaved group: the term names the read-write loop, not the comparison
 * and not the chart. The batched twin is the counter-example and is a separate element rather
 * than a state the subject passes through, so no `data-pose` is needed; the interleaved group
 * is the term at rest, mid-run, and finished alike.
 *
 * The counts are the demo's own arithmetic. A line under the charts used to say so ("a page
 * cannot read the browser's tally, only a profiler can"), and a title over them used to count
 * the bars ("Six bars, laid out twice"); both were the site speaking inside the frame, and the
 * article already sends a reader to the performance panel. What is real is the shape, one
 * layout per write that follows a read. The steps come from the stage's clock so a pose
 * stops the run where it stands (SPEC §6), and `prefersReducedMotion` is asked directly since
 * no stylesheet reaches a chain of timers (SPEC §7). Bars grow inside a chart that already
 * holds its height, so nothing below them moves (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const bars = (id: string) =>
    HEIGHTS.map(
      (_, i) => `
        <span
          data-part="bar-${id}-${i}"
          style="flex: 1 1 0; height: 0; border-radius: 4px 4px 0 0; background: var(--sp-accent);
                 transition: height 0.2s var(--sp-ease)"
        ></span>`,
    ).join('');

  const chart = (id: string) => `
    <div style="display: flex; align-items: flex-end; gap: 10px; height: ${CHART_H}px;
                padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
      ${bars(id)}
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 408px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="run">Run</button>
        </div>

        <div class="sp-stack sp-context" data-part="batched" style="gap: 6px; margin-top: 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-text--ink">Read all, then write all</span>
            <span class="sp-label" data-part="count-batched" data-count="0" style="flex: 0 0 132px; text-align: right">
              0 forced layouts
            </span>
          </div>
          ${chart('batched')}
        </div>

        <div class="sp-stack" data-part="thrash" data-subject data-count="0" style="gap: 6px; margin-top: 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-text--ink">Read, write, read, write</span>
            <span
              class="sp-label"
              data-part="count-thrash"
              data-count="0"
              style="flex: 0 0 132px; text-align: right; color: var(--sp-warn); font-weight: 600"
            >0 forced layouts</span>
          </div>
          ${chart('thrash')}
        </div>

      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const thrash = part(root, 'thrash');
  const pending: number[] = [];

  const setCount = (id: string, count: number) => {
    const readout = part(root, `count-${id}`);
    readout.dataset.count = String(count);
    readout.textContent = count === 1 ? '1 forced layout' : `${count} forced layouts`;
    if (id === 'thrash') thrash.dataset.count = String(count);
  };

  const draw = (id: string, upto: number) => {
    for (let i = 0; i < HEIGHTS.length; i++) part(root, `bar-${id}-${i}`).style.height = `${i < upto ? HEIGHTS[i] : 0}px`;
  };

  const land = () => {
    draw('batched', HEIGHTS.length);
    draw('thrash', HEIGHTS.length);
    setCount('batched', 1);
    setCount('thrash', HEIGHTS.length);
    scene.dataset.state = 'settled';
  };

  const iterate = (index: number) => {
    setCount('thrash', index + 1);
    draw('thrash', index + 1);
    if (index + 1 < HEIGHTS.length) pending.push(clock.setTimeout(() => iterate(index + 1), STEP_MS));
  };

  const play = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;

    if (prefersReducedMotion(root)) {
      land();
      return;
    }

    draw('batched', 0);
    draw('thrash', 0);
    setCount('batched', 0);
    setCount('thrash', 0);
    scene.dataset.state = 'running';

    // One measurement for the whole pass, then every write together.
    pending.push(
      clock.setTimeout(() => {
        setCount('batched', 1);
        draw('batched', HEIGHTS.length);
      }, LEAD + BATCH_MS),
    );
    pending.push(clock.setTimeout(() => iterate(0), LEAD + STEP_MS));
    pending.push(
      clock.setTimeout(
        () => {
          scene.dataset.state = 'settled';
        },
        LEAD + STEP_MS * (HEIGHTS.length + 1),
      ),
    );
  };

  part(root, 'run').addEventListener('click', play);
  play();
}
