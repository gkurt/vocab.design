import { steps } from '#src/stage/choreography.ts';

/**
 * The mangled reading first, then the authored respelling, then back to the default: each
 * segment reaches an absolute state rather than toggling one (SPEC §8). Every claim waits for
 * the voice to finish, since the spoken word is the thing under test.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=token][data-mode=default]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-hint]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=respelling][data-revealed]', state: 'visible' } },
  { assert: { selector: '[data-part=token][data-mode=hint]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-default]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=token][data-mode=default]', state: 'visible' } },
  { assert: { selector: '[data-part=respelling][data-revealed]', state: 'hidden' } },
  { wait: 1100 },
]);
