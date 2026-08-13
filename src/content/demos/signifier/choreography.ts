import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=readout][data-reads=away]', state: 'visible' } },
  // The bare twin first: the action is there, and nothing on it says anything at all.
  { moveTo: '[data-part=bare-button]' },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-reads=none]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=sig-button]' },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-reads=pressable]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=sig-link]' },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-reads=link]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=sig-grip]' },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-reads=grip]', state: 'visible' } },
  { wait: 1100 },
]);
