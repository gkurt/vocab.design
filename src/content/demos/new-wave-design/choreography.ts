import { steps } from '#src/stage/choreography.ts';

/**
 * A printed poster answers no pointer, so the script is a tour: the cursor crosses the Swiss
 * copy, then the stepped rules, the display word walking off its baseline, and the halftone
 * field and reversed bar on the New Wave copy, while the asserts hold each part of the break
 * on stage. The opening wait lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=poster-swiss]' },
  { wait: 850 },
  { assert: { selector: '[data-part=swiss-head]', state: 'visible' } },
  { assert: { selector: '[data-part=swiss-halftone]', state: 'visible' } },
  { moveTo: '[data-part=stair]' },
  { wait: 850 },
  { assert: { selector: '[data-part=stair]', state: 'visible' } },
  { assert: { selector: '[data-part=guides]', state: 'visible' } },
  { moveTo: '[data-part=display]' },
  { wait: 850 },
  { assert: { selector: '[data-part=display]', state: 'visible' } },
  { assert: { selector: '[data-part=angled]', state: 'visible' } },
  { assert: { selector: '[data-part=halftone]', state: 'visible' } },
  { assert: { selector: '[data-part=reversed]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
