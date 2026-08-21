import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 320 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 340 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=who]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="false"]', state: 'visible' } },
  { wait: 800 },
]);
