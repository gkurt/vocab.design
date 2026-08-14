import { steps } from '#src/stage/choreography.ts';

/**
 * Read the submitted form field by field. The flagged one announces that it was rejected and
 * why; its twin, painted exactly the same red, announces as an ordinary field. The walk
 * clamps at the last field, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=heard][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=err-good]', state: 'visible' } },
  { assert: { selector: '[data-part=err-twin]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=read]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=input-good][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=flagged]', state: 'visible' } },
  { wait: 1500 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=input-twin][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=input-good][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=heard][data-state=unflagged]', state: 'visible' } },
  { wait: 1500 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=input-twin][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=unflagged]', state: 'visible' } },
  { wait: 900 },
]);
