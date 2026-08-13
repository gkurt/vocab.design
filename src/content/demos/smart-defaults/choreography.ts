import { steps } from '#src/stage/choreography.ts';

// The defaults are read off the form first, then overridden in one gesture, and only
// then is the blank version reached. Each state control reaches its own state, and the
// pass ends back on the state the demo mounts in (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=form][data-mode="prefilled"]', state: 'visible' } },
  { assert: { selector: '[data-part=country][data-value="gb"]', state: 'visible' } },
  { assert: { selector: '[data-part=ship-standard][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=ship-express]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ship-express][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=ship-standard][aria-selected="false"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=mode-blank]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=form][data-mode="blank"]', state: 'visible' } },
  { assert: { selector: '[data-part=country][data-value=""]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=mode-prefilled]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=form][data-mode="prefilled"]', state: 'visible' } },
  { assert: { selector: '[data-part=ship-standard][aria-selected="true"]', state: 'visible' } },
  { wait: 1000 },
]);
