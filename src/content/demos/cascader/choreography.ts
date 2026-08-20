import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the resting claims wait for the window to land.
  { wait: 700 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=path][data-depth="0"]', state: 'visible' } },
  { wait: 400 },

  // Pressing the field opens level one, and only level one.
  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-levels="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-united-states]', state: 'visible' } },
  { assert: { selector: '[data-part=col-2]', state: 'hidden' } },
  { wait: 600 },

  // Choosing a country opens the next level beside it, already filtered to that country.
  { moveTo: '[data-part=opt-united-states]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-levels="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-california]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-ontario]', state: 'hidden' } },
  { assert: { selector: '[data-part=col-3]', state: 'hidden' } },
  { wait: 700 },

  // And the level after that, still without closing anything already open.
  { moveTo: '[data-part=opt-california]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-levels="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-oakland]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-united-states][aria-selected="true"]', state: 'visible' } },
  { wait: 700 },

  // The leaf commits: the panel closes and the field shows the whole path, which is where the
  // evidence has to live once the levels have gone.
  { moveTo: '[data-part=opt-oakland]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=path][data-value=oakland]', state: 'visible' } },
  { assert: { selector: '[data-part=path][data-depth="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=delivers][data-city=oakland]', state: 'visible' } },
  { wait: 1000 },

  // Reopening restores the committed path with every level shown and selected, rather than
  // dropping the reader back at the first column.
  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=panel][data-levels="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-california][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-oakland][aria-selected="true"]', state: 'visible' } },
  { wait: 900 },
]);
