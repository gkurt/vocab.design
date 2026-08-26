import { steps } from '#src/stage/choreography.ts';

// The muted clip is already running when the specimen mounts, which is the term. The
// unmuted request beside it has been refused, and one real click is the activation that
// lifts the refusal: the glyph only ever starts playback, so a resumed pass lands the
// same way (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=b-picture][data-state=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=a-picture][data-state=blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=a-overlay]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=a-play]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=a-picture][data-state=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=a-overlay]', state: 'hidden' } },
  { assert: { selector: '[data-part=b-picture][data-state=playing]', state: 'visible' } },
  { wait: 1200 },
]);
