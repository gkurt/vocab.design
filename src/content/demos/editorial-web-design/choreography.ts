import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=opener]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=deck]', state: 'visible' } },
  { wait: 700 },
  // A spread answers no pointer: the cursor reads it the way an eye would, top to bottom.
  { moveTo: '[data-part=eyebrow]' },
  { wait: 700 },
  { moveTo: '[data-part=headline]' },
  { wait: 900 },
  { moveTo: '[data-part=byline]' },
  { wait: 800 },
  { moveTo: '[data-part=dropcap]' },
  { wait: 800 },
  { moveTo: '[data-part=quote]' },
  { wait: 900 },
  { moveTo: '[data-part=figure]' },
  { wait: 800 },
  { assert: { selector: '[data-part=dropcap]', state: 'visible' } },
  { assert: { selector: '[data-part=quote]', state: 'visible' } },
  { assert: { selector: '[data-part=figure]', state: 'visible' } },
  { assert: { selector: '[data-part=byline]', state: 'visible' } },
  { wait: 600 },
]);
