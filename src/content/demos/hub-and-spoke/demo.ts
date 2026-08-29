import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

interface Task {
  key: string;
  name: string;
  glyph: IconName;
  rows: string[];
}

const TASKS: Task[] = [
  { key: 'inbox', name: 'Inbox', glyph: 'inbox', rows: ['Ferry timetable change', 'Bookbinder, ready Friday', 'Two receipts'] },
  { key: 'calendar', name: 'Calendar', glyph: 'calendar', rows: ['Tue 09:30 Studio visit', 'Wed 14:00 Print run', 'Fri 18:00 Ferry'] },
  { key: 'search', name: 'Search', glyph: 'search', rows: ['Recent: paper weights', 'Recent: ferry pass', 'Recent: Kew opening'] },
  { key: 'settings', name: 'Settings', glyph: 'sliders', rows: ['Account', 'Notifications', 'Storage'] },
];

/** Where the map's four satellites sit, in the order the tiles are laid out. */
const NODES = [
  [20, 16],
  [124, 16],
  [20, 52],
  [124, 52],
] as const;
const HUB_NODE = [72, 34] as const;

const ROUTES = {
  hub: '4 destinations one tap away',
  spoke: '1 destination one tap away: home',
} as const;

const NOTE = {
  hub: 'Every task hangs off this one screen, and the map beside it has no edge between any two of them. That is the shape, and the whole of it.',
  spoke:
    'Inside a task there is one way out and it goes home. Crossing to another task means leaving this one, returning to the hub, and starting again from there.',
} as const;

/**
 * Hub and spoke specimen: a home screen of four task tiles, each of which takes over the
 * frame, with exactly one control inside a task and it goes back to the hub. The topology
 * map below the frame draws the claim as a graph: four edges, all touching the centre, and
 * nothing joining one task to another. The read-out counts the destinations a reader can
 * reach without passing through home, which is four from the hub and one from anywhere else.
 *
 * The subject is the hub itself, the tile screen the whole shape is named for, and not the
 * frame, the map or the read-out. A spoke deliberately hides it, which is what the shape
 * means, so identify summons the hub by playing on until the specimen is home again
 * (SPEC §6); the mount state is the hub.
 *
 * The hub and the spoke are alternatives in one body of fixed height, so entering a task
 * moves nothing around it (SPEC §5). A tile names the task it opens and Back names home, so
 * every scripted step reaches a state rather than flipping the one it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const tiles = TASKS.map(
    (task) => `
      <button
        class="sp-surface"
        type="button"
        data-part="tile-${task.key}"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 88px; padding: 0; font: inherit; font-size: 12px; color: var(--sp-ink); cursor: pointer"
      >
        <span style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: var(--sp-accent-soft); color: var(--sp-accent)">${icon(task.glyph)}</span>
        ${task.name}
      </button>`,
  ).join('');

  const edges = NODES.map(
    ([x, y]) => `<line x1="${HUB_NODE[0]}" y1="${HUB_NODE[1]}" x2="${x}" y2="${y}" stroke="var(--sp-line)" stroke-width="2" />`,
  ).join('');

  const satellites = NODES.map(
    ([x, y], i) => `<circle data-part="node-${TASKS[i]?.key}" cx="${x}" cy="${y}" r="6" fill="var(--sp-line)" />`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Home</span>
          <span class="sp-label" data-part="routes" data-at="hub" style="font-size: 11px">${ROUTES.hub}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">

          <div class="sp-grid" data-part="hub" data-subject style="grid-template-columns: repeat(4, 1fr); gap: 10px">${tiles}</div>

          <div class="sp-stack" data-part="spoke" data-task="none" style="gap: 8px" hidden>
            <div class="sp-row">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back to home</button>
              <span class="sp-label sp-grow" style="text-align: right; font-size: 11px">No other destination from here</span>
            </div>
            <ul class="sp-list sp-surface sp-context" data-part="task-rows" style="padding: 2px 8px"></ul>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="width: 452px; gap: 14px; align-items: center">
        <svg role="img" aria-label="A star graph: four task nodes, each joined only to the hub in the centre" viewBox="0 0 144 68" width="144" height="68" style="flex: 0 0 auto">
          ${edges}
          ${satellites}
          <circle data-part="node-hub" cx="${HUB_NODE[0]}" cy="${HUB_NODE[1]}" r="9" fill="var(--sp-accent)" />
        </svg>
        <span class="sp-text" data-stage-verdict data-part="note" style="flex: 1 1 auto; height: 44px; font-size: 11px">${NOTE.hub}</span>
      </div>
    </div>
  `;

  const hub = part(root, 'hub');
  const spoke = part(root, 'spoke');
  const title = part(root, 'title');
  const routes = part(root, 'routes');
  const rows = part(root, 'task-rows');
  const note = part(root, 'note');

  const mark = (current: string) => {
    part(root, 'node-hub').setAttribute('fill', current === 'hub' ? 'var(--sp-accent)' : 'var(--sp-line)');
    for (const task of TASKS) {
      part(root, `node-${task.key}`).setAttribute('fill', current === task.key ? 'var(--sp-accent)' : 'var(--sp-line)');
    }
  };

  const goHome = () => {
    flag(hub, 'hidden', false);
    flag(spoke, 'hidden', true);
    spoke.dataset.task = 'none';
    title.textContent = 'Home';
    routes.dataset.at = 'hub';
    routes.textContent = ROUTES.hub;
    note.textContent = NOTE.hub;
    mark('hub');
  };

  const open = (task: Task) => {
    rows.innerHTML = task.rows.map((row) => `<li class="sp-list-item">${row}</li>`).join('');
    spoke.dataset.task = task.key;
    flag(hub, 'hidden', true);
    flag(spoke, 'hidden', false);
    title.textContent = task.name;
    routes.dataset.at = 'spoke';
    routes.textContent = ROUTES.spoke;
    note.textContent = NOTE.spoke;
    mark(task.key);
  };

  for (const task of TASKS) part(root, `tile-${task.key}`).addEventListener('click', () => open(task));
  part(root, 'back').addEventListener('click', goHome);
}
