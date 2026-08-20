import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the start line waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-start="4"][data-offset]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=tracks]', state: 'visible' } },
  { wait: 700 },

  // The same six tracks, flush to the start: no offset, and nothing left empty.
  { moveTo: '[data-part=seg-flush]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=column][data-start="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'hidden' } },
  { assert: { selector: '[data-part=masthead]', state: 'visible' } },
  { wait: 900 },

  // Offset again, with the three tracks before it still reserved and still empty.
  { moveTo: '[data-part=seg-offset]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=column][data-start="4"][data-offset]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { wait: 700 },
]);
