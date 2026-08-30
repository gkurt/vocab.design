import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card][data-scheme="default"]', state: 'visible' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { wait: 900 },
  // Every segment names a whole scheme, so the card lands on the same values on any pass.
  { moveTo: '[data-part=seg-forest]' },
  { click: true },
  { assert: { selector: '[data-part=card][data-scheme="forest"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-forest][data-selected]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-plum]' },
  { click: true },
  { assert: { selector: '[data-part=card][data-scheme="plum"]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-default]' },
  { click: true },
  { assert: { selector: '[data-part=card][data-scheme="default"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-default][data-selected]', state: 'visible' } },
  { wait: 1200 },
]);
