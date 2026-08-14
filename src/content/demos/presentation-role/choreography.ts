import { steps } from '#src/stage/choreography.ts';

/**
 * Take the role off both tables and put it back, reading each announcement as it changes.
 * Each segment reaches its own state rather than flipping the other's (SPEC §8), and the
 * asserts read the role attribute itself.
 */
export default steps([
  { assert: { selector: '[data-part=layout][role=presentation]', state: 'visible' } },
  { assert: { selector: '[data-part=say-layout][data-state=presentation]', state: 'visible' } },
  { assert: { selector: '[data-part=say-sales][data-state=presentation]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-semantic]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=layout][role=presentation]', state: 'hidden' } },
  { assert: { selector: '[data-part=say-layout][data-state=semantic]', state: 'visible' } },
  { assert: { selector: '[data-part=say-sales][data-state=semantic]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=semantic]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-presentation]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=layout][role=presentation]', state: 'visible' } },
  { assert: { selector: '[data-part=sales][role=presentation]', state: 'visible' } },
  { assert: { selector: '[data-part=say-layout][data-state=presentation]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=presentation]', state: 'visible' } },
  { wait: 1200 },
]);
