import { steps } from '#src/stage/choreography.ts';

/**
 * Every claim here is about the measurement, never about the flash itself. The fast rate has a
 * 250ms period, well under the ~500ms an assert can resolve, so nothing may assert which of the
 * two lamp states is showing at a given moment: the claims sit on the region's rate, the meter
 * read-outs and the refusal, all of which hold still between picks.
 *
 * The pass ends on the slow rate, which is the state the specimen mounts in (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=picker][data-value=slow]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-rate=slow]', state: 'visible' } },
  { assert: { selector: '[data-part=rate][data-hz="0.6"]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'hidden' } },
  { wait: 1200 },

  // Past the count and still below the threshold: the meter is the whole point of this state.
  { moveTo: '[data-part=seg-fast]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=region][data-rate=fast]', state: 'visible' } },
  { assert: { selector: '[data-part=rate][data-hz="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=exempt][data-ok=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'hidden' } },
  { moveTo: '[data-part=meter]' },
  { wait: 900 },
  { assert: { selector: '[data-part=darker]', state: 'visible' } },
  { assert: { selector: '[data-part=area]', state: 'visible' } },

  // The refused rate: the region goes still and the meter stops claiming an exemption.
  { moveTo: '[data-part=seg-over]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=region][data-rate=over]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'visible' } },
  { assert: { selector: '[data-part=exempt][data-ok=no]', state: 'visible' } },
  { assert: { selector: '[data-part=rate][data-hz="24"]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-slow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=region][data-rate=slow]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'hidden' } },
  { assert: { selector: '[data-part=rate][data-hz="0.6"]', state: 'visible' } },
  { wait: 1000 },
]);
