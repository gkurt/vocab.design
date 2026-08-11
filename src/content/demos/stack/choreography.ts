import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Four margins, three different gaps: the rhythm is measured off the boxes.
  { assert: { selector: '[data-part=column][data-mode=soup]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-rhythm=ragged]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-stack]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-mode=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-rhythm=even]', state: 'visible' } },
  { assert: { selector: '[data-part=item-4]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-soup]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-rhythm=ragged]', state: 'visible' } },
  { wait: 800 },
]);
