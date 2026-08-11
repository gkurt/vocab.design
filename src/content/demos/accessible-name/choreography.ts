import { steps } from '#src/stage/choreography.ts';

/** Each stop names the rung it lands on, so the readout is asserted, not assumed. */
export default steps([
  { assert: { selector: '[data-part=readout][data-source=none]', state: 'visible' } },
  { moveTo: '[data-part=control-icon]' },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-source=aria-label]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=control-input]' },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-source=label]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=control-text]' },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-source=content]', state: 'visible' } },
  { wait: 1400 },
]);
