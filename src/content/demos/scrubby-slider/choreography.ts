import { steps } from '#src/stage/choreography.ts';

// Direction is what the drags prove, so they are asserted on the trend the field
// recorded rather than on a number that depends on where two dots happened to land.
// The typed value is exact, because typing is the half of this control that is.
export default steps([
  { assert: { selector: '[data-part=field][data-trend="none"]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-value="200"]', state: 'visible' } },
  { moveTo: '[data-part=scrub]' },
  { wait: 400 },
  { drag: { to: '[data-part=mark-right]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=field][data-trend="up"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=scrub]' },
  { wait: 300 },
  { drag: { to: '[data-part=mark-left]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=field][data-trend="down"]', state: 'visible' } },
  { wait: 900 },
  // The other half of the same control: a click puts you in the box, and the number
  // typed there is exact rather than approximate.
  { moveTo: '[data-part=value]' },
  { wait: 300 },
  { click: true },
  { wait: 300 },
  { type: '96' },
  { wait: 500 },
  { assert: { selector: '[data-part=field][data-value="96"][data-trend="typed"]', state: 'visible' } },
  { wait: 1200 },
]);
