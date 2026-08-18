import { steps } from '#src/stage/choreography.ts';

// Refuse once, and watch the refusal expire. The counter is the evidence: dismissed on ask
// three, back on ask four with the same words. Then the first ask, then the remembered
// state, then back to the third, which resets the counter so a looping pass reads the same
// numbers it read the first time (SPEC §8).
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=prompt][data-nag=on]', state: 'visible' } },
  { assert: { selector: '[data-part=counter][data-ask="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=not-now]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=prompt]', state: 'hidden' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=prompt]', state: 'visible' } },
  { assert: { selector: '[data-part=counter][data-ask="4"]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=mode-first]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prompt][data-nag=on]', state: 'visible' } },
  { assert: { selector: '[data-part=counter][data-ask="1"]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=mode-remembered]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prompt][data-nag=off]', state: 'visible' } },
  { assert: { selector: '[data-part=settings-link]', state: 'visible' } },
  { assert: { selector: '[data-part=not-now]', state: 'hidden' } },
  { assert: { selector: '[data-part=scrim]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=mode-third]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prompt][data-nag=on]', state: 'visible' } },
  { assert: { selector: '[data-part=counter][data-ask="3"]', state: 'visible' } },
  { wait: 800 },
]);
