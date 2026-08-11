import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=row-ben]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=row-ben][aria-selected="true"]', state: 'visible' } },
  { wait: 900 },
  // Exclusive, so moving the selection is what proves the rows are one set.
  { moveTo: '[data-part=row-dev]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=row-dev][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-ben][aria-selected="true"]', state: 'hidden' } },
  { wait: 900 },
]);
