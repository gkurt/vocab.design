import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=switch]' },
  { wait: 500 },
  { assert: { selector: '[data-part=switch][aria-checked="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=held-count]', state: 'hidden' } },
  { click: true },
  // Past the thumb's travel, and long before anything could have been saved: what the
  // setting governs has already changed, which is the claim the term makes.
  { wait: 600 },
  { assert: { selector: '[data-part=switch][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=held-count]', state: 'visible' } },
  { wait: 1600 },
  // The flip is the term, so the script flips it back rather than leaving the return
  // to whatever state the next pass happens to find.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=switch][aria-checked="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=held-count]', state: 'hidden' } },
]);
