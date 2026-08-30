import { steps } from '#src/stage/choreography.ts';

// Two domains for one right axis, then no right axis at all, and the proof is that the
// axis and the read-out move together while the bars never move: the wide domain is read
// with its flat claim, the tight domain with its outrunning one, and the single-axis state
// has no second axis to ring. The pass returns to the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=right-axis][data-axes=dual]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=series]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=scale-tight]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=right-axis][data-axes=dual]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=tight]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=scale-single]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=right-axis]', state: 'hidden' } },
  { assert: { selector: '[data-part=note][data-mode=single]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=scale-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=right-axis][data-axes=dual]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=wide]', state: 'visible' } },
  { wait: 800 },
]);
