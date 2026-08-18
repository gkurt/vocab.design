import { steps } from '#src/stage/choreography.ts';

/**
 * A foil poster answers no pointer, so the script is a tour: the cursor crosses the card
 * head on, then the same card tipped a little and tipped further, while the asserts hold
 * each card and its hue readout on stage. The opening wait lets the mount fade finish
 * before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=card-head]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=tile-head]' },
  { wait: 850 },
  { assert: { selector: '[data-part=read-head]', state: 'visible' } },
  { moveTo: '[data-part=tile-tip]' },
  { wait: 850 },
  { assert: { selector: '[data-part=card-tip]', state: 'visible' } },
  { assert: { selector: '[data-part=read-tip]', state: 'visible' } },
  { moveTo: '[data-part=tile-steep]' },
  { wait: 850 },
  { assert: { selector: '[data-part=card-steep]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
