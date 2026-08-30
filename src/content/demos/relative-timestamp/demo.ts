import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** One beat of the stage's clock, and the distances the feed is dragged through. */
const TICK_MS = 1100;
const STAGES = [
  { minutes: 0, key: 'now' },
  { minutes: 2, key: '2-min' },
  { minutes: 8, key: '8-min' },
  { minutes: 60, key: '1-h' },
  { minutes: 300, key: '5-h' },
  { minutes: 1500, key: '1-d' },
  { minutes: 4400, key: 'past' },
] as const;

/** Where the convention gives up: past this, a distance is worse than a date. */
const ABSOLUTE_AFTER = 2880;

interface Row {
  key: string;
  who: string;
  what: string;
  where: string;
  /** How old this row already was when the feed was drawn. */
  base: number;
  exact: string;
  absolute: string;
}

const ROWS: Row[] = [
  {
    key: 'ada',
    who: 'AM',
    what: 'Ada added tide readings',
    where: 'Harbour survey',
    base: 0,
    exact: '12 Aug 2026, 14:32',
    absolute: '12 Aug',
  },
  {
    key: 'ravi',
    who: 'RS',
    what: 'Ravi closed two findings',
    where: 'Quay inspection',
    base: 45,
    exact: '12 Aug 2026, 13:47',
    absolute: '12 Aug',
  },
  {
    key: 'noor',
    who: 'NK',
    what: 'Noor uploaded the chart',
    where: 'Harbour survey',
    base: 180,
    exact: '12 Aug 2026, 11:32',
    absolute: '12 Aug',
  },
];

const phrase = (minutes: number, absolute: string): string => {
  if (minutes >= ABSOLUTE_AFTER) return absolute;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)} h ago`;
  return 'yesterday';
};

/**
 * Relative timestamp specimen: an activity feed whose stamps age on the stage's clock, at
 * a compressed timescale, until the newest one crosses the threshold where the convention
 * gives up and prints a date instead. The footer used to name that compression out loud
 * ("Compressed time: the feed ages a step every beat."), which is the exhibit explaining
 * its own machinery from inside the product, so it went and Rewind kept the row.
 *
 * A line under the feed printed the newest row's exact time behind the words "Underneath,
 * unchanged:". No feed prints that: it was the site pointing at its own `datetime` and
 * `title`, both of which are still on every stamp for anyone who hovers or reads the markup.
 * The line is gone and the frame gave back its height.
 *
 * The subject is one stamp, the newest, which is the narrowest thing the term names:
 * not the row, not the feed, and not the exact time underneath it. The two stamps below
 * are more of the same thing rather than scenery, so they keep the normal register and
 * age along with it; the avatars, the copy and the Rewind control are the scene.
 *
 * Each stamp is a fixed width and every row is a fixed height, so a label going from
 * "just now" to "12 Aug" moves nothing (SPEC §5). Rewind reaches a state rather than
 * flipping one: it always puts the feed back at the moment it was written (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = ROWS.map(
    (r, index) => `
    <div class="sp-row" data-part="row-${r.key}" style="flex: 0 0 auto; gap: 10px; height: 46px">
      <span class="sp-avatar sp-context">${r.who}</span>
      <span class="sp-stack sp-context sp-grow" style="gap: 2px; min-width: 0">
        <span class="sp-text sp-text--ink" style="font-size: 13px">${r.what}</span>
        <span class="sp-label" style="font-size: 11px">${r.where}</span>
      </span>
      <time
        data-part="stamp-${r.key}"
        ${index === 0 ? 'data-subject' : ''}
        data-mode="relative"
        data-age="now"
        datetime="2026-08-12T14:32"
        title="${r.exact}"
        style="width: 72px; text-align: right; font-size: 12px; color: var(--sp-muted); font-variant-numeric: tabular-nums"
      >just now</time>
    </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
          <span class="sp-label">Harbour survey</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 6px">
          ${rows}
        </div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; padding: 8px 12px; justify-content: flex-end; border-top: 1px solid var(--sp-line)">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="rewind">Rewind</button>
        </div>
      </div>
    </div>
  `;

  let stage = 0;
  let timer: number | undefined;

  const draw = () => {
    const step = STAGES[stage] ?? STAGES[0];
    if (!step) return;
    for (const r of ROWS) {
      const minutes = r.base + step.minutes;
      const el = part(root, `stamp-${r.key}`);
      el.textContent = phrase(minutes, r.absolute);
      el.dataset.mode = minutes >= ABSOLUTE_AFTER ? 'absolute' : 'relative';
      el.dataset.age = step.key;
    }
  };

  const tick = () => {
    if (stage >= STAGES.length - 1) return;
    stage += 1;
    draw();
    timer = clock.setTimeout(tick, TICK_MS);
  };

  /** Always back to the moment the feed was written, wherever the run had reached. */
  const rewind = () => {
    clock.clearTimeout(timer);
    stage = 0;
    draw();
    timer = clock.setTimeout(tick, TICK_MS);
  };

  part(root, 'rewind').addEventListener('click', rewind);

  draw();
  timer = clock.setTimeout(tick, TICK_MS);
}
