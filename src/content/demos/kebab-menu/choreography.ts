import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { wait: 1400 },
  { press: 'Escape' },
  { wait: 300 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
]);
