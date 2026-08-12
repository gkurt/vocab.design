import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card-ranked]', state: 'visible' } },
  { assert: { selector: '[data-part=card-flat]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-1]', state: 'hidden' } },
  { moveTo: '[data-part=seg-on]' },
  { wait: 500 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-on][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-1]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-2]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-off]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=chip-3]', state: 'hidden' } },
  { wait: 600 },
]);
