import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel][data-opacity="100"]', state: 'visible' } },
  { moveTo: '[data-part=stop-50]' },
  { click: true },
  // Heading, text, border and buttons all go together: the value applies to the group.
  { assert: { selector: '[data-part=panel][data-opacity="50"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-10]' },
  { click: true },
  { assert: { selector: '[data-part=panel][data-opacity="10"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-10][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-100]' },
  { click: true },
  { assert: { selector: '[data-part=panel][data-opacity="100"]', state: 'visible' } },
  { wait: 1200 },
]);
