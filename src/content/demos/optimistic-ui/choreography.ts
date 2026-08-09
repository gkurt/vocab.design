import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=like]' },
  { click: true },
  { assert: { selector: '[data-part=status][data-state=pending]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=status][data-state=saved]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=fail]' },
  { click: true },
  { moveTo: '[data-part=like]' },
  { click: true },
  { assert: { selector: '[data-part=status][data-state=pending]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=status][data-state=reverted]', state: 'visible' } },
  { wait: 1000 },
]);
