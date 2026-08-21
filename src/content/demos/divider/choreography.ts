import { steps } from '#src/stage/choreography.ts';

// The line is scenery a reader passes over, not a control: it answers nothing, and
// the panel beside it is the control condition. Both stand from mount (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=panel-ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-plain]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=divider]', state: 'visible' } },
  { wait: 1600 },
]);
