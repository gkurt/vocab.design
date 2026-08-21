import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 320 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=announce][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=danger]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  // The role's two obligations: announced at once, and focus resting on the safe answer.
  { assert: { selector: '[data-part=announce][data-state=alert]', state: 'visible' } },
  { assert: { selector: '[data-part=cancel][data-sim-focus]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=cancel]' },
  { click: true },
  { wait: 500 },
  // The exit is claimed through what stays: the scrim's flag and the announcement line.
  { assert: { selector: '[data-part=scrim][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=announce][data-state=idle]', state: 'visible' } },
  { wait: 800 },
]);
