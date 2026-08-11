import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=group]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-action=none]', state: 'visible' } },
  { moveTo: '[data-part=act-copy]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=status][data-action=copy]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=act-archive]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=status][data-action=archive]', state: 'visible' } },
  { wait: 900 },
]);
