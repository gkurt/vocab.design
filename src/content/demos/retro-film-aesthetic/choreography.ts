import { steps } from '#src/stage/choreography.ts';

/**
 * A developed frame answers no pointer, so the script is a tour: the cursor crosses the
 * treated frame, its date back, and the untreated copy beside it, while the asserts hold
 * the treatment's layers on stage. The opening wait lets the mount fade finish first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=treated]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=halation]' },
  { wait: 850 },
  { assert: { selector: '[data-part=halation]', state: 'visible' } },
  { moveTo: '[data-part=datestamp]' },
  { wait: 800 },
  { assert: { selector: '[data-part=datestamp]', state: 'visible' } },
  { moveTo: '[data-part=clean]' },
  { wait: 850 },
  { assert: { selector: '[data-part=clean]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
