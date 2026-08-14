import { steps } from '#src/stage/choreography.ts';

// Choosing a provider opens the consent screen and Continue completes the handoff, so
// every step reaches a state rather than flipping one (SPEC §8). Cancel is the other
// explicit way out and is left for the reader to find.
export default steps([
  { assert: { selector: '[data-part=providers]', state: 'visible' } },
  { assert: { selector: '[data-part=provider-apple]', state: 'visible' } },
  { assert: { selector: '[data-part=consent-step]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=provider-google]' },
  { click: true },
  { wait: 500 },
  // The provider, not the site, asks what may be shared.
  { assert: { selector: '[data-part=consent-step][data-provider=google]', state: 'visible' } },
  { assert: { selector: '[data-part=choose-step]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=allow]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=done-step]', state: 'visible' } },
  { assert: { selector: '[data-part=consent-step]', state: 'hidden' } },
  { wait: 1600 },
]);
