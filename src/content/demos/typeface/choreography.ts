import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { assert: { selector: '[data-part=font-display]', state: 'visible' } },
  { assert: { selector: '[data-part=font-italic]', state: 'visible' } },
  { assert: { selector: '[data-part=font-bold]', state: 'visible' } },
  { wait: 800 },
  // A design answers no pointer: the cursor only walks the instances, which is the
  // comparison the specimen is making.
  { moveTo: '[data-part=font-display]' },
  { wait: 900 },
  { moveTo: '[data-part=font-italic]' },
  { wait: 900 },
  { moveTo: '[data-part=font-small]' },
  { wait: 900 },
  { assert: { selector: '[data-part=font-small]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
