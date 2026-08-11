import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=rack][data-gutter="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=gutter-1][data-size="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=gutter-2][data-size="16"]', state: 'visible' } },
  { moveTo: '[data-part=seg-24]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-24][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=rack][data-gutter="24"]', state: 'visible' } },
  { assert: { selector: '[data-part=gutter-1][data-size="24"]', state: 'visible' } },
  // The gutters grew and the margins did not: they are not the same number.
  { assert: { selector: '[data-part=margin-left]', state: 'visible' } },
  { assert: { selector: '[data-part=margin-right]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-8]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rack][data-gutter="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=gutter-2][data-size="8"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-16]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rack][data-gutter="16"]', state: 'visible' } },
  { wait: 700 },
]);
