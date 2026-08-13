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
  // The modifier is armed as an absolute state, since a synthesized key press cannot
  // hold Shift down (SPEC §7).
  { moveTo: '[data-part=mode-big]' },
  { wait: 300 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-size="10"]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 300 },
  { press: 'ArrowRight' },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-x="64"]', state: 'visible' } },
  { wait: 1200 },
]);
