import { steps } from '#src/stage/choreography.ts';

// The same eighteen days through the three states the mechanic has, and the proof is that
// the counter and the last square move together: kept reads eighteen, one missed square
// reads zero, and a freeze on that same square reads eighteen again. The pass returns to
// the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=count][data-mode=kept]', state: 'visible' } },
  { assert: { selector: '[data-part=day-last][data-state=kept]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=state-missed]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=count][data-mode=missed]', state: 'visible' } },
  { assert: { selector: '[data-part=day-last][data-state=missed]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=state-frozen]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=count][data-mode=frozen]', state: 'visible' } },
  { assert: { selector: '[data-part=day-last][data-state=frozen]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=state-kept]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=count][data-mode=kept]', state: 'visible' } },
  { assert: { selector: '[data-part=day-last][data-state=kept]', state: 'visible' } },
  { wait: 800 },
]);
