import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-teal]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-pink]', state: 'visible' } },
  { wait: 700 },
  // A printed sheet answers no pointer: the cursor visits the overprint where the two inks
  // cross, the bars that show the slip most plainly, and the doubled headline.
  { moveTo: '[data-part=ink-pink]' },
  { wait: 800 },
  { moveTo: '[data-part=bars-offset]' },
  { wait: 800 },
  { moveTo: '[data-part=headline]' },
  { wait: 800 },
  { assert: { selector: '[data-part=headline-teal]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'visible' } },
  { assert: { selector: '[data-part=regmark]', state: 'visible' } },
  { wait: 600 },
]);
