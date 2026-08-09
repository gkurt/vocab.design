import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { assert: { selector: '[data-part=popover]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=chip-due]' },
  { click: true },
  { assert: { selector: '[data-part=chip-due][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=popover]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=apply]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
]);
