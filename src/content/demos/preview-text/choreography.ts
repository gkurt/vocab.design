import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8): both rows state their case at rest, and the only thing the
// term does is be there or be scraped. The asserts name which line is which, so the
// comparison is machine-checked rather than merely drawn.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=authored-preview][data-source="written"]', state: 'visible' } },
  { assert: { selector: '[data-part=scraped-preview][data-source="scraped"]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=row-authored]', state: 'visible' } },
  { assert: { selector: '[data-part=row-scraped]', state: 'visible' } },
  { wait: 2100 },
]);
