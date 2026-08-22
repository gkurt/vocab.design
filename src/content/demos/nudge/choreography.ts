import { steps } from '#src/stage/choreography.ts';

// Every position is asserted as an exact number, because exactness is the whole term:
// four small steps land on 44, two big ones land on 64, and nothing in between is
// approximate (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=card][data-x="40"][data-y="32"]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-selected]', state: 'hidden' } },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=card][data-selected]', state: 'visible' } },
  { press: 'ArrowRight' },
  { press: 'ArrowRight' },
  { press: 'ArrowRight' },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-x="44"]', state: 'visible' } },
  { press: 'ArrowDown' },
  { press: 'ArrowDown' },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-y="34"]', state: 'visible' } },
  { wait: 700 },
  // Shift is really held across the arrows rather than armed by a control: the scope
  // opens with a keydown and stamps `shiftKey` on every key inside it (SPEC §8), which
  // is the same flag a reader's own thumb sets.
  {
    withKey: {
      key: 'Shift',
      steps: [
        { wait: 400 },
        { assert: { selector: '[data-part=key-shift][data-held]', state: 'visible' } },
        { assert: { selector: '[data-part=readout][data-size="10"]', state: 'visible' } },
        { press: 'ArrowRight' },
        { press: 'ArrowRight' },
        { wait: 500 },
        { assert: { selector: '[data-part=card][data-x="64"]', state: 'visible' } },
        { wait: 700 },
      ],
    },
  },
  { wait: 500 },
  // The key let go: the chip goes out, the step is back to one pixel, and the card stays
  // exactly where the big steps left it.
  { assert: { selector: '[data-part=key-shift][data-held]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-size="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-x="64"]', state: 'visible' } },
  { wait: 1000 },
]);
