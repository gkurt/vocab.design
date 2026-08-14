import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=line]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-showing=notdef]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=key-hex]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=key-hex][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-showing=hex]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=key-fffd]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=key-fffd][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-showing=fffd]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=key-notdef]' },
  { click: true },
  { wait: 600 },
  // Back on the box the line is actually showing.
  { assert: { selector: '[data-part=key-notdef][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-showing=notdef]', state: 'visible' } },
  { wait: 1000 },
]);
