import { steps } from '#src/stage/choreography.ts';

/**
 * A printed poster answers no pointer, so the script is a tour: the cursor crosses the
 * angled composition, its montage block and its bar, then the square copy beside it, while
 * the asserts hold both readings on stage. The opening wait lets the mount fade finish.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=composition]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=montage]' },
  { wait: 850 },
  { assert: { selector: '[data-part=montage]', state: 'visible' } },
  { moveTo: '[data-part=headline]' },
  { wait: 850 },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { moveTo: '[data-part=square]' },
  { wait: 850 },
  { assert: { selector: '[data-part=square-band]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
