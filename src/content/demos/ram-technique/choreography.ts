import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // The widest container: three tracks, arrived at without a width being named anywhere.
  { assert: { selector: '[data-part=grid][data-cols="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-4]', state: 'visible' } },
  { assert: { selector: '[data-part=rule]', state: 'visible' } },
  { wait: 1000 },
  // Narrower: two tracks, from the same unchanged rule.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-cols="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-4]', state: 'visible' } },
  { wait: 1400 },
  // Narrower still: auto-fit collapses the empty tracks and one card fills the row.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-cols="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1]', state: 'visible' } },
  { assert: { selector: '[data-part=card-4]', state: 'visible' } },
  { wait: 1400 },
  // Back to the widest container.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-cols="3"]', state: 'visible' } },
  { wait: 800 },
]);
