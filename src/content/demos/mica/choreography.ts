import { steps } from '#src/stage/choreography.ts';

/**
 * The tinted, active window is on stage from mount, so the pose already shows the term.
 * Each segment names one window state outright, so a pass joined halfway lands on the
 * same state (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=mica][data-focus="active"]', state: 'visible' } },
  { assert: { selector: '[data-part=acrylic]', state: 'visible' } },
  { assert: { selector: '[data-part=wallpaper]', state: 'visible' } },
  { assert: { selector: '[data-part=mica-titlebar]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-inactive]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=mica][data-focus="inactive"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-inactive][data-selected]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-active]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=mica][data-focus="active"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-active][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
