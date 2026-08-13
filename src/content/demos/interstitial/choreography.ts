import { steps } from '#src/stage/choreography.ts';

// The link reaches the interstitial, the countdown is waited out rather than skipped,
// and the way onward reaches the article. Each control reaches one screen, so a pass
// that starts anywhere ends where the last one did (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=ad]', state: 'hidden' } },
  { moveTo: '[data-part=link]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ad]', state: 'visible' } },
  { assert: { selector: '[data-part=skip][data-ready]', state: 'hidden' } },
  { wait: 2600 },
  { assert: { selector: '[data-part=skip][data-ready]', state: 'visible' } },
  { moveTo: '[data-part=skip]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=article]', state: 'visible' } },
  { assert: { selector: '[data-part=ad]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=site]', state: 'visible' } },
  { wait: 900 },
]);
