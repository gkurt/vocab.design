import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // Mounted where it measured: under the first tab, with a width of its own.
  { assert: { selector: '[data-part=indicator][data-at=overview]', state: 'visible' } },
  { moveTo: '[data-part=tab-loans]' },
  { click: true },
  // Two tabs along, and well clear of the 220 ms slide.
  { wait: 500 },
  { assert: { selector: '[data-part=indicator][data-at=loans]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-loans][aria-selected="true"]', state: 'visible' } },
  { wait: 500 },
  // Back the other way, and to an absolute tab rather than a step along the row.
  { moveTo: '[data-part=tab-catalogue]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=indicator][data-at=catalogue]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-catalogue][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-loans][aria-selected="true"]', state: 'hidden' } },
  { wait: 600 },
]);
