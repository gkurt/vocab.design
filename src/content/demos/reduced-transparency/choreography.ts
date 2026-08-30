import { steps } from '#src/stage/choreography.ts';

/**
 * One panel, one wash, two answers to the same stated preference. The pass starts on the panel
 * the preference asks for, drops the request so the frosted finish comes back and the
 * backdrop bleeds through its label, then honours it again and ends where it began. Each
 * segment names its own setting absolutely rather than toggling (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=setting][data-value=honoured]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-setting=honoured]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-ignored]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=setting][data-value=ignored]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-setting=ignored]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-setting=honoured]', state: 'hidden' } },
  { assert: { selector: '[data-part=panel-text]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-honoured]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=setting][data-value=honoured]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-setting=honoured]', state: 'visible' } },
  { wait: 1000 },
]);
