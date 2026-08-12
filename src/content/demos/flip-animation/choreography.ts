import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-phase=idle]', state: 'visible' } },
  { moveTo: '[data-part=slot-b]' },
  { click: true },
  // Judged during the play step: the inverting transform only exists between the
  // layout change and the end of the run.
  { assert: { selector: '[data-part=readout][data-phase=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  // Well past the 700 ms run, so the claim is about the state it lands in.
  { wait: 1000 },
  { assert: { selector: '[data-part=readout][data-phase=done]', state: 'visible' } },
  // The other slot is an absolute state of its own, not a toggle back.
  { moveTo: '[data-part=slot-a]' },
  { click: true },
  { assert: { selector: '[data-part=readout][data-phase=playing]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=readout][data-phase=done]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
]);
