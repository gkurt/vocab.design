import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=opt-pdf][aria-selected="true"]', state: 'visible' } },
  { moveTo: '[data-part=opt-svg]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=opt-svg][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-pdf][aria-selected="true"]', state: 'hidden' } },
  { moveTo: '[data-part=opt-csv]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=opt-csv][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=listbox]', state: 'visible' } },
]);
