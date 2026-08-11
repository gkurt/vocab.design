import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=status][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=editor]' },
  { click: true },
  { type: ' Bring the pricing table.' },
  { assert: { selector: '[data-part=status][data-state=dirty]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=status][data-state=saving]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=status][data-state=saved]', state: 'visible' } },
  { wait: 1400 },
]);
