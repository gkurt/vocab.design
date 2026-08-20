import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 650 },
  { assert: { selector: '[data-part=bar][data-value=all]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r2]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r3]', state: 'visible' } },
  { wait: 500 },

  // Picking Mail leaves the query alone and shortens the list to one kind of result.
  { moveTo: '[data-part=seg-mail]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-value=mail]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-scope=mail]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r4]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r2]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-r3]', state: 'hidden' } },
  { assert: { selector: '[data-part=query]', state: 'visible' } },
  { wait: 900 },

  // Another scope, the same query: the field never had to be retyped.
  { moveTo: '[data-part=seg-files]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-value=files]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r2]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r5]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r1]', state: 'hidden' } },
  { wait: 900 },

  // People holds a single match, and the list keeps its box either way.
  { moveTo: '[data-part=seg-people]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=count][data-scope=people]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r3]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r5]', state: 'hidden' } },
  { wait: 800 },

  // Back to All, which is the state the bar rests in.
  { moveTo: '[data-part=seg-all]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-value=all]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r5]', state: 'visible' } },
  { wait: 800 },
]);
