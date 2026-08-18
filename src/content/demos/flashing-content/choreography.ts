import { steps } from '#src/stage/choreography.ts';

/**
 * The one pass in the collection that proves a specimen does not do something. It rests on the
 * slow pulse long enough to read the rate, asks for a rate above the threshold and asserts that
 * the region has gone still and is carrying the refusal rather than a faster animation, then puts
 * the safe rate back, which is the state the specimen mounts in (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=picker][data-value=safe]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-rate=safe]', state: 'visible' } },
  { assert: { selector: '[data-part=rate][data-hz="0.6"]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-over]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=region][data-rate=over]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-state=refused]', state: 'visible' } },
  { assert: { selector: '[data-part=rate][data-hz="8"]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-safe]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=region][data-rate=safe]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'hidden' } },
  { assert: { selector: '[data-part=rate][data-hz="0.6"]', state: 'visible' } },
  { wait: 1200 },
]);
