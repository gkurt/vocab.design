import { steps } from '#src/stage/choreography.ts';

/**
 * Four Tab presses around a three-stop ring: the fourth lands back on the first control,
 * and nothing behind the scrim has been reached. Escape then takes the documented exit and
 * the next press finds the page again. The walk is the stage's own over the specimen's real
 * tab sequence (SPEC §7), so what the asserts read is the sequence itself.
 */
export default steps([
  { wait: 650 },
  { assert: { selector: '[data-part=dialog][data-trapped]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-where=dialog]', state: 'visible' } },

  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-close][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-cancel][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-send][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 550 },
  // The wrap: the sequence has run out and started again inside the same region.
  { assert: { selector: '[data-part=stop-close][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=page-overview][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=page-trigger][data-sim-focus]', state: 'hidden' } },
  { wait: 800 },

  { press: 'Escape' },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog][data-trapped]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-state=released]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-where=page]', state: 'visible' } },
  { wait: 500 },

  { press: 'Tab' },
  { wait: 550 },
  { assert: { selector: '[data-part=page-overview][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
]);
