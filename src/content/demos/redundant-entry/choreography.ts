import { steps } from '#src/stage/choreography.ts';

/**
 * The same address, twice. The pass takes the offer in the flow the specimen mounts in and shows
 * three fields filling with nothing retyped, then switches to the flow that asks again and types
 * the address back in a character at a time while the counter climbs. Choosing a flow empties the
 * fields and resets the counter, so both routes are counted from zero and the last choice returns
 * the specimen to its mount state (SPEC §8).
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=flow][data-value=carried]', state: 'visible' } },
  { assert: { selector: '[data-part=use-billing]', state: 'visible' } },
  { assert: { selector: '[data-part=step-two][data-retyped="0"]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=use-billing]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=street][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=postcode][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=step-two][data-retyped="0"]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-retype]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=use-billing]', state: 'hidden' } },
  { assert: { selector: '[data-part=step-two][data-retyped="0"]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=street]' },
  { type: '12 Ash Lane' },
  { wait: 700 },
  { assert: { selector: '[data-part=street][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=step-two][data-retyped="1"]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=postcode]' },
  { type: 'S1 4QP' },
  { wait: 700 },
  { assert: { selector: '[data-part=postcode][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=step-two][data-retyped="2"]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-carried]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=use-billing]', state: 'visible' } },
  { assert: { selector: '[data-part=step-two][data-retyped="0"]', state: 'visible' } },
  { wait: 900 },
]);
