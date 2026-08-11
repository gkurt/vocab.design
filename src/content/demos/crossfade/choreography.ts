import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=panel-reef]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-kelp]', state: 'hidden' } },
  { moveTo: '[data-part=seg-kelp]' },
  { click: true },
  // Well clear of the 500ms overlap: the claim is about where the pair settles.
  { wait: 900 },
  { assert: { selector: '[data-part=panel-kelp]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-reef]', state: 'hidden' } },
  { moveTo: '[data-part=seg-reef]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=panel-reef]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-kelp]', state: 'hidden' } },
  { wait: 500 },
]);
