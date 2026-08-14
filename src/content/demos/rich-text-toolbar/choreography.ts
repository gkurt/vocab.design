import { steps } from '#src/stage/choreography.ts';

// Placing the caret is absolute, and each format is only ever pressed onto a line
// that does not already carry it, so no step depends on the state it finds (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=fmt-bold][aria-pressed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=run-lede][data-bold]', state: 'visible' } },
  { wait: 500 },
  // The caret moves into the already bold line and the button comes down on its own.
  { moveTo: '[data-part=run-lede]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=fmt-bold][aria-pressed="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=where][data-run=lede]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=run-note]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=fmt-bold][aria-pressed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=where][data-run=note]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=fmt-bold]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=run-note][data-bold]', state: 'visible' } },
  { assert: { selector: '[data-part=fmt-bold][aria-pressed="true"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=fmt-italic]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=run-note][data-italic]', state: 'visible' } },
  { assert: { selector: '[data-part=fmt-italic][aria-pressed="true"]', state: 'visible' } },
  { wait: 900 },
]);
