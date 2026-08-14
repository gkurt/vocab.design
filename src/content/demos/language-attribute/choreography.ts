import { steps } from '#src/stage/choreography.ts';

/**
 * Take the attribute off the three passages and put it back. Each segment reaches its own
 * state rather than flipping the other's (SPEC §8), and the asserts read the attribute
 * itself: the French passage either carries `lang` or it does not.
 */
export default steps([
  { assert: { selector: '[data-part=text-fr][lang=fr]', state: 'visible' } },
  { assert: { selector: '[data-part=voice-fr][data-state=fr]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=set]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-missing]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=text-fr][lang=fr]', state: 'hidden' } },
  { assert: { selector: '[data-part=text-de][lang=de]', state: 'hidden' } },
  { assert: { selector: '[data-part=voice-fr][data-state=en]', state: 'visible' } },
  { assert: { selector: '[data-part=voice-de][data-state=en]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=missing]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-set]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=text-fr][lang=fr]', state: 'visible' } },
  { assert: { selector: '[data-part=text-de][lang=de]', state: 'visible' } },
  { assert: { selector: '[data-part=voice-de][data-state=de]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=set]', state: 'visible' } },
  { wait: 1200 },
]);
