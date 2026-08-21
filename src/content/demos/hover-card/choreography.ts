import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 320 },
  { assert: { selector: '[data-part=card]', state: 'hidden' } },
  { moveTo: '[data-part=mention]' },
  { wait: 700 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=follow]', state: 'visible' } },
  { assert: { selector: '[data-part=mention][data-card=open]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=away]' },
  { wait: 800 },
  { assert: { selector: '[data-part=mention][data-card=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'hidden' } },
  { wait: 700 },
]);
