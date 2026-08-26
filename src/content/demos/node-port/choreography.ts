import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // Mounted with one wire already landed: a Number output feeding a Number input.
  { assert: { selector: '[data-part=wire-fac-height]', state: 'visible' } },
  { assert: { selector: '[data-part=port-in-normal]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-state=rest]', state: 'visible' } },
  { wait: 700 },
  // A Color output dropped on a Number port: the connection is refused, and says why.
  { moveTo: '[data-part=port-out-color]' },
  { wait: 350 },
  { drag: { to: '[data-part=port-in-strength]' } },
  { wait: 650 },
  { assert: { selector: '[data-part=verdict][data-state=refused]', state: 'visible' } },
  { assert: { selector: '[data-part=port-in-strength][data-refused]', state: 'visible' } },
  { assert: { selector: '[data-part=wire-color-strength]', state: 'hidden' } },
  { wait: 1000 },
  // The same gesture into a port of its own type lands.
  { moveTo: '[data-part=port-out-vector]' },
  { wait: 350 },
  { drag: { to: '[data-part=port-in-normal]' } },
  { wait: 650 },
  { assert: { selector: '[data-part=wire-vector-normal]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-state=linked]', state: 'visible' } },
  { assert: { selector: '[data-part=port-in-strength][data-refused]', state: 'hidden' } },
  { wait: 900 },
]);
