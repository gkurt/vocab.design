import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=search-clear]', state: 'hidden' } },
  { assert: { selector: '[data-part=result-fiddle]', state: 'visible' } },
  { moveTo: '[data-part=search-input]' },
  { click: true },
  { type: 'mo' },
  { wait: 500 },
  { assert: { selector: '[data-part=result-monstera]', state: 'visible' } },
  { assert: { selector: '[data-part=result-fiddle]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-matches="1"]', state: 'visible' } },
  // The clear control is the half of the field a plain text input does not have,
  // and it only exists once there is a query to throw away.
  { assert: { selector: '[data-part=search-clear]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=search-clear]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=result-fiddle]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-matches="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=search-clear]', state: 'hidden' } },
  { wait: 800 },
]);
