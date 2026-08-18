import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-view=home]', state: 'visible' } },
  { assert: { selector: '[data-part=model]', state: 'visible' } },
  // Sideways: the camera travels around the target, so a new side of the model comes into view.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-right]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-view=turned]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-clamped=no]', state: 'visible' } },
  { wait: 900 },
  // Upward: the camera climbs, still short of the stop, and the target stays where it was.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-up]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-clamped=no]', state: 'visible' } },
  { wait: 900 },
  // The same drag again runs into the turntable's stop, which is what keeps a view describable.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-up]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-clamped=yes]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=reset]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=viewport][data-view=home]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-clamped=no]', state: 'visible' } },
  { wait: 1100 },
]);
