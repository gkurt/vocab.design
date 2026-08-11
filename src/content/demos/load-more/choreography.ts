import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=row-4]', state: 'visible' } },
  { assert: { selector: '[data-part=row-5]', state: 'hidden' } },
  { moveTo: '[data-part=more]' },
  { click: true },
  { assert: { selector: '[data-part=more][data-loading]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=row-8]', state: 'visible' } },
  { assert: { selector: '[data-part=row-9]', state: 'hidden' } },
  { moveTo: '[data-part=list]' },
  { scroll: { y: 160 } },
  { wait: 500 },
  { moveTo: '[data-part=more]' },
  { click: true },
  { wait: 1100 },
  { assert: { selector: '[data-part=row-12]', state: 'visible' } },
  { assert: { selector: '[data-part=more][disabled]', state: 'visible' } },
  { wait: 1200 },
]);
