import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the printed-scale claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-mode=scale]', state: 'visible' } },
  { assert: { selector: '[data-part=ticks][data-marked]', state: 'visible' } },
  { wait: 500 },

  // A printed scale is a ruler, not a catch: the handle rests between the coarse stops.
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-35]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-value="35"]', state: 'visible' } },
  { wait: 800 },

  // Turning the same marks into detents catches the handle at the nearest one.
  { moveTo: '[data-part=seg-detents]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-mode=detents]', state: 'visible' } },
  { assert: { selector: '[data-part=slider][data-value="40"]', state: 'visible' } },
  { wait: 700 },

  // Released at 65, held at 60, and the marks behind the handle light up.
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-65]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-value="60"]', state: 'visible' } },
  { assert: { selector: '[data-part=ticks][data-reached="60"]', state: 'visible' } },
  { wait: 900 },

  // Unmarked: the same track, with nothing said about where the values are.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=ticks][data-marked]', state: 'hidden' } },
  { wait: 900 },

  // Back to the printed scale, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-scale]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ticks][data-marked]', state: 'visible' } },
  { assert: { selector: '[data-part=slider][data-mode=scale]', state: 'visible' } },
  { wait: 800 },
]);
