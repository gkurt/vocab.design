import { steps } from '#src/stage/choreography.ts';

// Two rows are checked, once each, so a pass that is resumed or replayed still ends
// with a selection rather than undoing one (SPEC §8). The command spends it explicitly.
export default steps([
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { moveTo: '[data-part=cb-2]' },
  { wait: 300 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=bar][data-count="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2][data-selected]', state: 'visible' } },
  { moveTo: '[data-part=cb-3]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=bar][data-count="2"]', state: 'visible' } },
  // Some but not all: the state a two-state box cannot report.
  { assert: { selector: '[data-part=cb-all][aria-checked="mixed"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=archive]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tag-2]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-3]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-2][data-selected]', state: 'hidden' } },
  { wait: 1000 },
]);
