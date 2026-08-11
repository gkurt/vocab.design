import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=media]', state: 'visible' } },
  { moveTo: '[data-part=figure]' },
  { wait: 900 },
  { assert: { selector: '[data-part=body]', state: 'visible' } },
  { moveTo: '[data-part=nested]' },
  { wait: 900 },
  // The same pairing one depth down, inside the body of another one.
  { assert: { selector: '[data-part=nested]', state: 'visible' } },
  { wait: 900 },
]);
