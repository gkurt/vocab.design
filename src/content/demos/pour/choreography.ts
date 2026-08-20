import { steps } from '#src/stage/choreography.ts';

/**
 * The same screen filed four ways. Each segment reaches an absolute principle rather than toggling
 * one (SPEC §8), and every claim is a pair: the card names the bucket, and the flag has moved to the
 * failure that bucket is about, which is proved by the previous failure losing its flag.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-mode=perceivable]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-p][data-flagged]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-o][data-flagged]', state: 'hidden' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-operable]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=card][data-mode=operable]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-o][data-flagged]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-p][data-flagged]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-understandable]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=card][data-mode=understandable]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-u][data-flagged]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-o][data-flagged]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-robust]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=card][data-mode=robust]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-r][data-flagged]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-u][data-flagged]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-perceivable]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=card][data-mode=perceivable]', state: 'visible' } },
  { assert: { selector: '[data-part=fail-p][data-flagged]', state: 'visible' } },
  { wait: 900 },
]);
