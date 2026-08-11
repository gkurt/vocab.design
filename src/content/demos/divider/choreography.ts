import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=divider]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-plain]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=panel-plain]' },
  { wait: 900 },
  { moveTo: '[data-part=panel-ruled]' },
  { wait: 900 },
  // The line is scenery a reader passes over, not a control: it answers nothing.
  { assert: { selector: '[data-part=divider]', state: 'visible' } },
  { wait: 600 },
]);
