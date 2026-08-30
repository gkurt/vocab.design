import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the panel to arrive.
  { wait: 500 },
  // Mounted with a figure already written: the subject is never an empty grid.
  { assert: { selector: '[data-part=figure][data-event=sent]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-shape=rising]', state: 'visible' } },

  { moveTo: '[data-part=event-failed]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  // A different event is a different figure, and the shape is the claim: falling, not
  // merely other. Abstraction is why the shape has to be stated rather than heard.
  { assert: { selector: '[data-part=figure][data-event=failed]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-shape=falling]', state: 'visible' } },
  { assert: { selector: '[data-part=event-failed][data-selected]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=event-done]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  // The family: this figure is the rising one again with a tail, which is what lets a
  // set of earcons be learned as a set rather than as three unrelated noises.
  { assert: { selector: '[data-part=figure][data-event=done]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-shape=rising-tail]', state: 'visible' } },
  { assert: { selector: '[data-part=note-3]', state: 'visible' } },
  { wait: 1100 },
]);
