import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the resting claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=dropper][data-armed=false]', state: 'visible' } },
  { assert: { selector: '[data-part=loupe]', state: 'hidden' } },
  { wait: 500 },

  // Taking the tool arms it; it never flips whatever state it found.
  { moveTo: '[data-part=dropper]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dropper][data-armed=true]', state: 'visible' } },
  { assert: { selector: '[data-part=hint][data-mode=armed]', state: 'visible' } },

  // The loupe follows the pointer and reports the colour under it, not under the control.
  { moveTo: '[data-part=band-4]' },
  { wait: 600 },
  { assert: { selector: '[data-part=loupe]', state: 'visible' } },
  { assert: { selector: '[data-part=hint][data-mode=preview]', state: 'visible' } },
  { moveTo: '[data-part=band-2]' },
  { wait: 600 },
  { assert: { selector: '[data-part=loupe]', state: 'visible' } },

  // One click keeps the reading and the tool lets go, the way one API reading does.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-from=band-2]', state: 'visible' } },
  { assert: { selector: '[data-part=dropper][data-armed=false]', state: 'visible' } },
  { assert: { selector: '[data-part=loupe]', state: 'hidden' } },
  { wait: 900 },

  // A second reading, this time off a shape rather than off the sky behind it.
  { moveTo: '[data-part=dropper]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dropper][data-armed=true]', state: 'visible' } },
  { moveTo: '[data-part=sun]' },
  { wait: 600 },
  { assert: { selector: '[data-part=loupe]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-from=sun]', state: 'visible' } },
  { assert: { selector: '[data-part=hint][data-mode=kept]', state: 'visible' } },
  { wait: 900 },
]);
