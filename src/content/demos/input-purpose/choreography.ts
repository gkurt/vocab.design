import { steps } from '#src/stage/choreography.ts';

/**
 * The specimen rests with the tokens declared and the profile already in the fields, so the
 * script takes them away and puts them back. Each segment reaches an absolute state rather than
 * toggling one (SPEC §8), and the filled flag is claimed only once the last field has landed,
 * since that is what the flag counts.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=purpose][data-mode=declared]', state: 'visible' } },
  { assert: { selector: '[data-part=form][data-state=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-email]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-absent]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=purpose][data-mode=absent]', state: 'visible' } },
  { assert: { selector: '[data-part=form][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-email]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-mode=absent]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-declared]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=purpose][data-mode=declared]', state: 'visible' } },
  { assert: { selector: '[data-part=form][data-state=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-post]', state: 'visible' } },
  { wait: 1000 },
]);
