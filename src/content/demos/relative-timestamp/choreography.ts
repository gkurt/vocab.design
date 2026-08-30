import { steps } from '#src/stage/choreography.ts';

// Rewind first, so everything after it is measured from a known moment: the feed then
// ages a step a beat until the newest stamp gives up on distance and prints a date.
export default steps([
  { assert: { selector: '[data-part=stamp-ada]', state: 'visible' } },
  { moveTo: '[data-part=rewind]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=stamp-ada][data-age=now]', state: 'visible' } },
  { assert: { selector: '[data-part=stamp-ada][data-mode=relative]', state: 'visible' } },
  { wait: 2700 },
  // The value starts with a digit, which an unquoted attribute selector cannot.
  { assert: { selector: '[data-part=stamp-ada][data-age="8-min"]', state: 'visible' } },
  { wait: 4800 },
  { assert: { selector: '[data-part=stamp-ada][data-mode=absolute]', state: 'visible' } },
  { moveTo: '[data-part=rewind]' },
  { wait: 400 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=stamp-ada][data-age=now]', state: 'visible' } },
  { wait: 800 },
]);
