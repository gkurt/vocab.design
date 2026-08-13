import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ladder][data-ratio=minor]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-3]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-fourth]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ladder][data-ratio=fourth]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-fifth]' },
  { click: true },
  { wait: 500 },
  // The same four steps, pitched steeply enough that the top rung is now a headline.
  { assert: { selector: '[data-part=ladder][data-ratio=fifth]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-3]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-minor]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ladder][data-ratio=minor]', state: 'visible' } },
  { wait: 900 },
]);
