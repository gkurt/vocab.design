import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The card fades in from mount, so the first reading of the interval waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=interval-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=whisk-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=band-blue]', state: 'hidden' } },
  { assert: { selector: '[data-part=basis][data-mode=bars]', state: 'visible' } },
  { wait: 900 },

  // Take the intervals away and the dots alone declare a winner.
  { moveTo: '[data-part=seg-bare]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=whisk-blue]', state: 'hidden' } },
  { assert: { selector: '[data-part=band-blue]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-mode=bare]', state: 'visible' } },
  { assert: { selector: '[data-part=basis][data-mode=bare]', state: 'visible' } },
  { wait: 900 },

  // A shaded band is the same interval without the picket fence of end caps.
  { moveTo: '[data-part=seg-band]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=interval-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=band-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=whisk-blue]', state: 'hidden' } },
  { wait: 900 },

  // Back to the whiskers, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-bars]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=whisk-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=band-blue]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-mode=bars]', state: 'visible' } },
  { wait: 700 },
]);
