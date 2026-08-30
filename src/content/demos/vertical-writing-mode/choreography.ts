import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=passage][data-vertical=yes][data-mode=vertical]', state: 'visible' } },
  // Measured off the layout: rotated, the Latin run is taller than it is wide.
  { assert: { selector: '[data-part=run-latin][data-lay=sideways]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-columns]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-lines]', state: 'hidden' } },
  // Absolute picks, never a flip: each segment names the setting it reaches.
  { moveTo: '[data-part=seg-horizontal]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=passage][data-vertical=no]', state: 'visible' } },
  { assert: { selector: '[data-part=run-latin][data-lay=across]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-lines]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-columns]', state: 'hidden' } },
  { moveTo: '[data-part=seg-upright]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=passage][data-mode=upright][data-vertical=yes]', state: 'visible' } },
  // Upright, the same three letters stack: a full em each, so the run grows taller.
  { assert: { selector: '[data-part=run-latin][data-lay=upright]', state: 'visible' } },
  { assert: { selector: '[data-part=run-digits]', state: 'visible' } },
  { wait: 700 },
  // Ends on the vertical setting, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-vertical]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=passage][data-vertical=yes][data-mode=vertical]', state: 'visible' } },
  { assert: { selector: '[data-part=run-latin][data-lay=sideways]', state: 'visible' } },
  { wait: 700 },
]);
