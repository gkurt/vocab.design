import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The strip is already running: a marquee needs no trigger, which is half of why
  // the pointer has to be able to stop it.
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-paused]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=strip]' },
  { wait: 400 },
  { assert: { selector: '[data-part=strip][data-paused]', state: 'visible' } },
  // Long enough for a reader to actually read the row that stopped in front of them.
  { wait: 1400 },
  { moveTo: '[data-part=page]' },
  { wait: 400 },
  { assert: { selector: '[data-part=strip][data-paused]', state: 'hidden' } },
  { assert: { selector: '[data-part=track]', state: 'visible' } },
  { wait: 1600 },
]);
