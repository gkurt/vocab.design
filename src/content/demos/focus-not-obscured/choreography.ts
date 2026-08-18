import { steps } from '#src/stage/choreography.ts';

/**
 * One focused field, one docked consent bar, three scroll positions. The pass starts on the
 * honest middle case, half covered, which passes the Minimum criterion and fails the Enhanced
 * one; buries the field entirely, where the ring is drawn and nobody can see it; lifts it clear
 * of the bar, where both pass; and returns to where it began. Each segment names its own scroll
 * position absolutely (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=position][data-value=partial]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-visible]', state: 'visible' } },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=enhanced][data-position=partial]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-hidden]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-position=hidden]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-visible]', state: 'hidden' } },
  { assert: { selector: '[data-part=minimum][data-position=hidden]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-clear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-position=clear]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-visible]', state: 'visible' } },
  { assert: { selector: '[data-part=enhanced][data-position=clear]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-partial]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=position][data-value=partial]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-visible]', state: 'visible' } },
  { assert: { selector: '[data-part=enhanced][data-position=partial]', state: 'visible' } },
  { wait: 900 },
]);
