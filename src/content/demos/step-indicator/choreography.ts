import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=step-1][aria-current=step]', state: 'visible' } },
  { moveTo: '[data-part=continue]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=step-2][aria-current=step]', state: 'visible' } },
  { assert: { selector: '[data-part=step-1][data-state=done]', state: 'visible' } },
  { wait: 600 },
  { click: true },
  { wait: 620 },
  // The last stage: Continue has nowhere left to go, and the track says so.
  { assert: { selector: '[data-part=step-3][aria-current=step]', state: 'visible' } },
  { assert: { selector: '[data-part=continue][aria-disabled="true"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 620 },
  { assert: { selector: '[data-part=step-2][aria-current=step]', state: 'visible' } },
  { assert: { selector: '[data-part=step-3][data-state=todo]', state: 'visible' } },
  { wait: 900 },
]);
