import { steps } from '#src/stage/choreography.ts';

// Three scopes over one score, in order. The proof at every stop is the same pair: the
// board reports which scope it is showing, and the reader's own row is still on it. The
// pass returns to the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=board][data-scope=all-time]', state: 'visible' } },
  { assert: { selector: '[data-part=you]', state: 'visible' } },
  { assert: { selector: '[data-part=gap]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=scope-week]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=board][data-scope=week]', state: 'visible' } },
  { assert: { selector: '[data-part=you]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=scope-friends]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=board][data-scope=friends]', state: 'visible' } },
  { assert: { selector: '[data-part=you]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=scope-all-time]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=board][data-scope=all-time]', state: 'visible' } },
  { assert: { selector: '[data-part=you]', state: 'visible' } },
  { wait: 900 },
]);
