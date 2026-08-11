import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The line takes about 1.9s to write itself; this is comfortably past the end.
  { wait: 2600 },
  { assert: { selector: '[data-part=line][data-done]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=line][data-typing]', state: 'visible' } },
  { wait: 2400 },
  { assert: { selector: '[data-part=line][data-done]', state: 'visible' } },
  { wait: 500 },
]);
