import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=header-delivery][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=region-sizing]', state: 'hidden' } },
  { assert: { selector: '[data-part=region-care]', state: 'hidden' } },
  { moveTo: '[data-part=header-sizing]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=region-sizing]', state: 'visible' } },
  { assert: { selector: '[data-part=header-sizing][aria-expanded="true"]', state: 'visible' } },
  { wait: 1000 },
  // The policy the article commits to: opening a second section does not close the first.
  { moveTo: '[data-part=header-care]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=region-care]', state: 'visible' } },
  { assert: { selector: '[data-part=region-sizing]', state: 'visible' } },
  { assert: { selector: '[data-part=header-sizing][aria-expanded="true"]', state: 'visible' } },
  { wait: 1000 },
  // Closed again, so the stack is a stack of independent sections in both directions.
  { moveTo: '[data-part=header-sizing]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=region-sizing]', state: 'hidden' } },
  { assert: { selector: '[data-part=region-care]', state: 'visible' } },
  { wait: 900 },
]);
