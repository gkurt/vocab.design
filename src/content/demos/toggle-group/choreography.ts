import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=toggle-bold][aria-pressed="false"]', state: 'visible' } },
  { moveTo: '[data-part=toggle-bold]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=toggle-bold][aria-pressed="true"]', state: 'visible' } },
  { moveTo: '[data-part=toggle-italic]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=toggle-italic][aria-pressed="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=toggle-bold][aria-pressed="true"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=toggle-italic]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=toggle-italic][aria-pressed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=toggle-bold][aria-pressed="true"]', state: 'visible' } },
  { wait: 900 },
]);
