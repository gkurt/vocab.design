import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Measured from the columns themselves: the opening line is in column one, alone.
  { assert: { selector: '[data-part=orphan][data-column="1"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-keep]' },
  { click: true },
  { wait: 700 },
  // Kept together: the line went over with its paragraph, and column one ends early.
  { assert: { selector: '[data-part=orphan][data-column="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=carried]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-set]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=orphan][data-column="1"]', state: 'visible' } },
  { wait: 800 },
]);
