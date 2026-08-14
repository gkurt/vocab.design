import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=scene][data-at="0"][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=route]', state: 'visible' } },
  { moveTo: '[data-part=seg-50]' },
  { click: true },
  // Judged while the dot is still on its way: the distance along is the only thing moving.
  { assert: { selector: '[data-part=scene][data-state=moving]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=scene][data-at="50"][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-curve]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=seg-100]' },
  { click: true },
  { wait: 1200 },
  { assert: { selector: '[data-part=scene][data-at="100"][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-curve]', state: 'visible' } },
  { wait: 600 },
]);
