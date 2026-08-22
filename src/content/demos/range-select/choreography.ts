import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=range][data-span="1"]', state: 'visible' } },
  // An unmodified click first: this is the end the range will be measured from.
  { moveTo: '[data-part=row-1]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-mode=single]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1][data-in-range]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][data-in-range]', state: 'hidden' } },
  { wait: 800 },
  // Shift is really held across the clicks that follow rather than armed by a control:
  // the scope opens with a keydown and stamps `shiftKey` on every event inside it
  // (SPEC §8), so each click below is a Shift click.
  {
    withKey: {
      key: 'Shift',
      steps: [
        { wait: 400 },
        { moveTo: '[data-part=row-4]' },
        { wait: 400 },
        { click: true },
        { wait: 600 },
        { assert: { selector: '[data-part=range][data-span="4"]', state: 'visible' } },
        // The row nobody clicked: the whole claim of the term.
        { assert: { selector: '[data-part=row-3][data-in-range]', state: 'visible' } },
        { assert: { selector: '[data-part=head-box][aria-checked=mixed]', state: 'visible' } },
        { wait: 1000 },
        // A second shifted click redraws the same range from the same anchor rather than
        // starting a new one, which is how a range is shrunk.
        { moveTo: '[data-part=row-2]' },
        { wait: 400 },
        { click: true },
        { wait: 600 },
        { assert: { selector: '[data-part=range][data-span="2"]', state: 'visible' } },
        { assert: { selector: '[data-part=row-4][data-in-range]', state: 'hidden' } },
        { wait: 700 },
      ],
    },
  },
  { wait: 500 },
  // The key let go: the range it drew survives it.
  { assert: { selector: '[data-part=readout][data-mode=range]', state: 'visible' } },
  { assert: { selector: '[data-part=range][data-span="2"]', state: 'visible' } },
  { wait: 900 },
]);
