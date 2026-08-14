import { steps } from '#src/stage/choreography.ts';

// The same point is clicked twice, once under each rule, so the only thing that could
// have changed the answer is the rule itself. The badge click in between proves the
// contest is really about paint order and not about the overlay alone.
export default steps([
  { assert: { selector: '[data-part=readout][data-hit=none]', state: 'visible' } },
  { moveTo: '[data-part=aim-photo]' },
  { wait: 450 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-hit=overlay]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=badge]' },
  { wait: 400 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-hit=badge]', state: 'visible' } },
  { wait: 900 },
  // Both picks are absolute states, so a pass resumed anywhere still means what it says.
  { moveTo: '[data-part=mode-none]' },
  { wait: 350 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-hit=none]', state: 'visible' } },
  { moveTo: '[data-part=aim-photo]' },
  { wait: 450 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-hit=image]', state: 'visible' } },
  { wait: 1200 },
]);
