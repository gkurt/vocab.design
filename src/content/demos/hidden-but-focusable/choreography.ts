import { steps } from '#src/stage/choreography.ts';

/**
 * Tab into the closed drawer and the ring leaves the screen while the reader line goes
 * silent, which is the whole term. The same drawer marked inert drops out of the walk, so
 * the third press lands on Contact instead. Each segment reaches its own build and the walk
 * clamps at its last stop, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=heard][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=void]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-home][data-sim-focus]', state: 'visible' } },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-search][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stop-account][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=silent]', state: 'visible' } },
  { assert: { selector: '[data-part=void]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-fixed]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=heard][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=void]', state: 'hidden' } },
  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stop-contact][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-account][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-broken]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=mark]', state: 'visible' } },
  { wait: 800 },
]);
