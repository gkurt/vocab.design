import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=chip-mine]' },
  { click: true },
  { assert: { selector: '[data-part=chip-mine][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=chip-label-remove]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=chip-label]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=chip-mine]' },
  { click: true },
  { assert: { selector: '[data-part=chip-mine][data-selected]', state: 'hidden' } },
]);
