import { steps } from '#src/stage/choreography.ts';

// The first useful action first, then the ask it defers, opened by the save and closed by
// its own dismissal (SPEC §8). The gated front door is visited once as the counter-example,
// and the pass ends back on the tool the demo mounts in.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=tool]', state: 'visible' } },
  { assert: { selector: '[data-part=gate]', state: 'hidden' } },
  { assert: { selector: '[data-part=result][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=ask]', state: 'hidden' } },
  { assert: { selector: '[data-part=ask-rest]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=url]' },
  { click: true },
  { type: 'harbour-minutes.org/2026' },
  { wait: 400 },
  { moveTo: '[data-part=shorten]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result][data-state=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=result-link]', state: 'visible' } },
  { assert: { selector: '[data-part=save]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ask]', state: 'visible' } },
  { assert: { selector: '[data-part=ask-email]', state: 'visible' } },
  { assert: { selector: '[data-part=ask-rest]', state: 'hidden' } },
  { wait: 1500 },

  { moveTo: '[data-part=ask-dismiss]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ask]', state: 'hidden' } },
  { assert: { selector: '[data-part=ask-rest]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=filled]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=mode-gated]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=gate-form]', state: 'visible' } },
  { assert: { selector: '[data-part=tool]', state: 'hidden' } },
  { wait: 1500 },

  { moveTo: '[data-part=mode-gradual]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=tool]', state: 'visible' } },
  { assert: { selector: '[data-part=gate]', state: 'hidden' } },
  { wait: 900 },
]);
