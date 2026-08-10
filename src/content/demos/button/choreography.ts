import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=publish][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=publish]' },
  { click: true },
  { assert: { selector: '[data-part=publish][data-state=busy]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=working]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=publish][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=done]', state: 'visible' } },
  { wait: 900 },
]);
