import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8). The term's whole claim is visible at rest: the same words set twice,
// once needing a picture beside them and once being the picture. There is no second state to
// reach, so the asserts carry the script and no cursor pretends otherwise. The opening wait is
// the kit's mount fade.
export default steps([
  { wait: 480 },
  { assert: { selector: '[data-part=headline-large]', state: 'visible' } },
  { assert: { selector: '[data-part=headline-small]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=art]', state: 'visible' } },
  { assert: { selector: '[data-part=label-small]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=label-large]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=headline-large]', state: 'visible' } },
  { wait: 1000 },
]);
