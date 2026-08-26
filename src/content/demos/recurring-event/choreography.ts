import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the card to arrive.
  { wait: 550 },
  { assert: { selector: '[data-part=rule][data-exceptions="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=occ-3][data-state=kept]', state: 'visible' } },

  // Pick one occurrence out of the series.
  { moveTo: '[data-part=occ-3]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=occ-3][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=occ-5][data-scope=out]', state: 'visible' } },

  // The scope is the question a series edit cannot avoid, so it is answered out loud. All
  // events first, which lights the whole strip: this is the reach the choice is about.
  { moveTo: '[data-part=scope-all]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=scope-all][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=occ-1][data-scope=in]', state: 'visible' } },
  { assert: { selector: '[data-part=occ-6][data-scope=in]', state: 'visible' } },

  // Then the narrow answer, which is the one this edit wants.
  { moveTo: '[data-part=scope-this]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=scope-this][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=occ-6][data-scope=out]', state: 'visible' } },

  // Applied: one exception hanging off the rule, and five occurrences untouched.
  { moveTo: '[data-part=apply]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=occ-3][data-state=skipped]', state: 'visible' } },
  { assert: { selector: '[data-part=occ-4][data-state=kept]', state: 'visible' } },
  { assert: { selector: '[data-part=rule][data-exceptions="1"]', state: 'visible' } },
  { wait: 1300 },
]);
