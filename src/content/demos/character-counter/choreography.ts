import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=counter][data-state=ok]', state: 'visible' } },
  { moveTo: '[data-part=input]' },
  { click: true },
  { type: 'Runs a bit long' },
  { wait: 700 },
  { assert: { selector: '[data-part=counter][data-state=ok]', state: 'visible' } },
  { wait: 900 },
  // Close to the limit the count changes register: a warning, not an error.
  { type: ' once you get going' },
  { wait: 700 },
  { assert: { selector: '[data-part=counter][data-state=warn]', state: 'visible' } },
  { wait: 1400 },
]);
