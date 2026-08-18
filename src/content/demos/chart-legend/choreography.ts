import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The card fades in from mount, so the first reading of the key waits for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=legend][data-place=right]', state: 'visible' } },
  { assert: { selector: '[data-part=key-retail][data-shown]', state: 'visible' } },
  { assert: { selector: '[data-part=band-nov-trade]', state: 'visible' } },
  { wait: 600 },

  // Above the plot: the same key, on the reading path before the marks are looked at.
  { moveTo: '[data-part=seg-top]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=legend][data-place=top]', state: 'visible' } },
  { wait: 500 },

  // An interactive key is a filter: this entry isolates its own channel, and the bands
  // it dropped leave the plot rather than dimming in place.
  { moveTo: '[data-part=key-trade]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=legend][data-only=trade]', state: 'visible' } },
  { assert: { selector: '[data-part=band-nov-trade]', state: 'visible' } },
  { assert: { selector: '[data-part=band-nov-retail]', state: 'hidden' } },
  { assert: { selector: '[data-part=key-retail][data-shown]', state: 'hidden' } },
  { wait: 800 },

  // Dismissal is its own entry, so the script reaches a state instead of flipping one.
  { moveTo: '[data-part=key-all]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=legend][data-only=all]', state: 'visible' } },
  { assert: { selector: '[data-part=band-nov-retail]', state: 'visible' } },
  { assert: { selector: '[data-part=key-retail][data-shown]', state: 'visible' } },
  { wait: 600 },

  // Inline in the title line, which is the placement that runs out of room first.
  { moveTo: '[data-part=seg-inline]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=legend][data-place=inline]', state: 'visible' } },
  { wait: 700 },

  // Back beside the plot, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-right]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=legend][data-place=right]', state: 'visible' } },
  { wait: 600 },
]);
