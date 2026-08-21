import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): a period homepage whose furniture is the whole claim, and
 * all of it is on stage at rest. Nothing blinks, nothing scrolls, and nothing here is
 * worth a cursor: naming the banner, the sign, the counter, and the webring in turn is
 * the identify pin's job.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { assert: { selector: '[data-part=banner]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=stripe]', state: 'visible' } },
  { assert: { selector: '[data-part=guestbook]', state: 'visible' } },
  { assert: { selector: '[data-part=email]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=counter]', state: 'visible' } },
  { assert: { selector: '[data-part=webring]', state: 'visible' } },
  { wait: 700 },
]);
