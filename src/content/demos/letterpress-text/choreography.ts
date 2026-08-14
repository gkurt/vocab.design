import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=deboss]', state: 'visible' } },
  { wait: 700 },
  // A printed card answers no pointer: the cursor names where the light is taken to come
  // from, then the line that is pressed into the card, then the twin that stands off it.
  { moveTo: '[data-part=lightmark]' },
  { wait: 800 },
  { moveTo: '[data-part=deboss]' },
  { wait: 900 },
  { moveTo: '[data-part=emboss]' },
  { wait: 900 },
  { assert: { selector: '[data-part=emboss]', state: 'visible' } },
  { assert: { selector: '[data-part=label-deboss]', state: 'visible' } },
  { wait: 600 },
]);
