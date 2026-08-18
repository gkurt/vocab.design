import { steps } from '#src/stage/choreography.ts';

/**
 * Four elements, one strip. The pins re-form for each, the abbreviations shorten role and
 * state into a handful of cells, and the last setting is the override where the braille line
 * and the speech deliberately disagree. Each segment reaches its own element rather than
 * cycling (SPEC §8), and the pass ends on the heading, where it began.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=strip][data-el=heading]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-cells="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=speech][data-el=heading]', state: 'visible' } },
  { assert: { selector: '[data-part=el-heading]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-button]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=strip][data-el=button]', state: 'visible' } },
  { assert: { selector: '[data-part=el-button]', state: 'visible' } },
  { assert: { selector: '[data-part=el-heading]', state: 'hidden' } },
  { assert: { selector: '[data-part=line][data-el=button]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-checkbox]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=strip][data-el=checkbox]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-cells="17"]', state: 'visible' } },
  { assert: { selector: '[data-part=el-checkbox]', state: 'visible' } },
  { assert: { selector: '[data-part=el-button]', state: 'hidden' } },
  { wait: 900 },

  // The override: the name that fits in eight cells, against the speech that keeps all of it.
  { moveTo: '[data-part=seg-label]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=strip][data-el=label]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-cells="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=el-long]', state: 'visible' } },
  { assert: { selector: '[data-part=speech][data-el=label]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-heading]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=strip][data-el=heading]', state: 'visible' } },
  { assert: { selector: '[data-part=el-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=el-long]', state: 'hidden' } },
  { wait: 900 },
]);
