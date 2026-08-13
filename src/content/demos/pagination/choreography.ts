import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=page-1][aria-current="page"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1][data-item="1"]', state: 'visible' } },
  // The window skips at one end only while the current page sits at the other.
  { assert: { selector: '[data-part=gap-right]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-left]', state: 'hidden' } },
  { assert: { selector: '[data-part=prev][disabled]', state: 'visible' } },
  { moveTo: '[data-part=page-3]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=page-3][aria-current="page"]', state: 'visible' } },
  // Replaced, not appended: the third slice starts at the eleventh record.
  { assert: { selector: '[data-part=row-1][data-item="11"]', state: 'visible' } },
  { assert: { selector: '[data-part=prev][disabled]', state: 'hidden' } },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=page-5][aria-current="page"]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-left]', state: 'visible' } },
  { assert: { selector: '[data-part=row-5][data-item="25"]', state: 'visible' } },
  { moveTo: '[data-part=page-12]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=page-12][aria-current="page"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-5][data-item="60"]', state: 'visible' } },
  { assert: { selector: '[data-part=next][disabled]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-right]', state: 'hidden' } },
  { wait: 900 },
]);
