import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Nothing has been answered yet, by either listener: a throttle absorbs input, it
  // does not invent it.
  { assert: { selector: '[data-part=throttled][data-live]', state: 'hidden' } },
  { assert: { selector: '[data-part=eager][data-calls="0"]', state: 'visible' } },
  { moveTo: '[data-part=feed]' },
  { wait: 300 },
  { scroll: { y: 190 } },
  // The first event was answered at once, and the burst behind it was not: more events
  // arrived than answers went out, which is the term.
  { assert: { selector: '[data-part=throttled][data-live]', state: 'visible' } },
  { assert: { selector: '[data-part=throttled][data-capped]', state: 'visible' } },
  // Long enough after the scroll for the trailing sample to land, so the readout is
  // holding the position the scroll finished at.
  { wait: 700 },
  { scroll: { y: 150 } },
  { assert: { selector: '[data-part=throttled][data-capped]', state: 'visible' } },
  { assert: { selector: '[data-part=eager]', state: 'visible' } },
  { wait: 1400 },
]);
