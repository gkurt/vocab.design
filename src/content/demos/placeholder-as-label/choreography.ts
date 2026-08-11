import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ghost-field][data-state=empty]', state: 'visible' } },
  { moveTo: '[data-part=ghost-field]' },
  { click: true },
  { type: 'mara@roastery.co' },
  { wait: 700 },
  // The name of the field went out with the first keystroke.
  { assert: { selector: '[data-part=ghost-field][data-state=filled]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=fixed-field]' },
  { click: true },
  { type: 'mara@roastery.co' },
  { wait: 700 },
  { assert: { selector: '[data-part=fixed-field][data-state=filled]', state: 'visible' } },
  // Same typing, and this field still says what it is.
  { assert: { selector: '[data-part=fixed-label]', state: 'visible' } },
  { wait: 900 },
]);
