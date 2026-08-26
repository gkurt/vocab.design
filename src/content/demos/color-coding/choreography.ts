import { steps } from '#src/stage/choreography.ts';

/**
 * The scheme grows from four codes to twelve and comes back, each segment naming an
 * absolute count rather than a step (SPEC §8), so a pass joined halfway still reads as
 * the same claim: at four the hues are a quarter of the circle apart, at twelve they are
 * a thirtieth, and the key stops being matchable somewhere in between.
 */
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=week][data-codes="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-codes="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-5]', state: 'visible' } },
  { assert: { selector: '[data-part=key]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-8]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-8][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=week][data-codes="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-codes="8"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-12]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-12][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=week][data-codes="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-codes="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-5]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-4]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-4][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=week][data-codes="4"]', state: 'visible' } },
  { wait: 800 },
]);
