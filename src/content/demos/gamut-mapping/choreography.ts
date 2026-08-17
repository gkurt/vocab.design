import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=mapped][data-fit=outside]', state: 'visible' } },
  { assert: { selector: '[data-part=clipped]', state: 'visible' } },
  { assert: { selector: '[data-part=boundary]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=thumb]' },
  // Absolute, not relative: each drag lands on the stop it aims at, so a pass that
  // starts over reaches the same chroma it did last time (SPEC §8).
  { drag: { to: '[data-part=stop-85]' } },
  { wait: 600 },
  // Inside the boundary the two answers agree, because there is nothing to map.
  { assert: { selector: '[data-part=mapped][data-fit=inside]', state: 'visible' } },
  { assert: { selector: '[data-part=map-read]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-340]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=mapped][data-fit=outside]', state: 'visible' } },
  { assert: { selector: '[data-part=clip-read]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-255]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=mapped][data-fit=outside]', state: 'visible' } },
  { wait: 900 },
]);
