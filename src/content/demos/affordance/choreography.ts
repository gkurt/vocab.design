import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  // The flat twin first: the pointer has to be on it before it says anything at all.
  { moveTo: '[data-part=flat]' },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-reads=label]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=raised]' },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-reads=pressable]', state: 'visible' } },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { wait: 1200 },
]);
