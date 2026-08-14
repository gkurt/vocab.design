import { steps } from '#src/stage/choreography.ts';

/**
 * The chunked build, one default changed in a single tap, then the same task built dense,
 * then back. Each segment reaches its own build and each chip sets its own group's answer
 * rather than flipping it, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=task][data-mode=calm]', state: 'visible' } },
  { assert: { selector: '[data-part=fmt-csv][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=calm]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=fmt-json]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=fmt-json][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=fmt-csv][aria-checked="false"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-dense]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=task][data-mode=dense]', state: 'visible' } },
  { assert: { selector: '[data-part=dense-8]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=dense]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=dense]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-calm]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=task][data-mode=calm]', state: 'visible' } },
  { assert: { selector: '[data-part=range-month][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=calm]', state: 'visible' } },
  { wait: 900 },
]);
