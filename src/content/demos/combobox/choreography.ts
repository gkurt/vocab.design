import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=listbox]', state: 'hidden' } },
  { moveTo: '[data-part=input]' },
  { click: true },
  { assert: { selector: '[data-part=listbox]', state: 'visible' } },
  { wait: 500 },
  { type: 'ne' },
  { wait: 700 },
  { assert: { selector: '[data-part=listbox]', state: 'visible' } },
  { press: 'ArrowDown' },
  { wait: 500 },
  { press: 'Enter' },
  { wait: 400 },
  { assert: { selector: '[data-part=listbox]', state: 'hidden' } },
  { wait: 900 },
]);
