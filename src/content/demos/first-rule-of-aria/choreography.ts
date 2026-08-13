import { steps } from '#src/stage/choreography.ts';

/**
 * Space on each control in turn, then a click on the div. Every step reaches a named result
 * rather than flipping one, so a pass joined halfway still ends where a whole one does
 * (SPEC §8). The key chip reads "Space"; the demo answers that spelling and the real one.
 */
export default steps([
  { assert: { selector: '[data-part=result][data-state=idle]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=native]' },
  { press: 'Space' },
  { wait: 500 },
  { assert: { selector: '[data-part=result][data-state=native-key]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=fake]' },
  { press: 'Space' },
  { wait: 500 },
  { assert: { selector: '[data-part=result][data-state=fake-key]', state: 'visible' } },
  { wait: 900 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=result][data-state=fake-click]', state: 'visible' } },
  { wait: 1100 },
]);
