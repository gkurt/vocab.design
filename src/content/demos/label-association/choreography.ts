import { steps } from '#src/stage/choreography.ts';

/**
 * Each press reaches an absolute state: the tied label puts the ring on its field, the
 * unattached words leave no field ringed at all, so a resumed run cannot invert the
 * claim.
 */
export default steps([
  { assert: { selector: '[data-part=field-tied]', state: 'visible' } },
  { moveTo: '[data-part=label-tied]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=input-tied][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=tied]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=label-loose]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=input-loose][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=input-tied][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-state=loose]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=label-tied]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=input-tied][data-sim-focus]', state: 'visible' } },
  { wait: 1200 },
]);
