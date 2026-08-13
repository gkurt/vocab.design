import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-far]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-near]', state: 'visible' } },
  { wait: 700 },
  // The cursor stands in for a gaze: it walks the stack from the far panel to the near one.
  { moveTo: '[data-part=panel-far]' },
  { wait: 800 },
  { moveTo: '[data-part=panel-mid]' },
  { wait: 800 },
  { moveTo: '[data-part=panel-near]' },
  { wait: 800 },
  // Landing on a pill is where a spatial control lights up under an unsteady gaze.
  { moveTo: '[data-part=play]' },
  { wait: 900 },
  { assert: { selector: '[data-part=play]', state: 'visible' } },
  { moveTo: '[data-part=later]' },
  { wait: 800 },
  { assert: { selector: '[data-part=panel-mid]', state: 'visible' } },
  { wait: 600 },
]);
