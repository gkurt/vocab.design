import { steps } from '#src/stage/choreography.ts';

// Strip, dismissed, escalated to a full page cover, dismissed again, back to the strip
// the demo mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=banner][data-mode=strip]', state: 'visible' } },
  { assert: { selector: '[data-part=install]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-banner=strip]', state: 'visible' } },
  { wait: 900 },

  // One close button, and the article keeps its place because the room was reserved.
  { moveTo: '[data-part=dismiss]' },
  { wait: 250 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=page][data-banner=none]', state: 'visible' } },
  { assert: { selector: '[data-part=banner]', state: 'hidden' } },
  { wait: 1000 },

  // The same offer, escalated until it is the page.
  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=banner][data-mode=full]', state: 'visible' } },
  { assert: { selector: '[data-part=install-full]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-banner=full]', state: 'visible' } },
  { wait: 1200 },

  // Dismissal demoted to a quiet line under the install button.
  { moveTo: '[data-part=proceed]' },
  { wait: 250 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=page][data-banner=none]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-strip]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=banner][data-mode=strip]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-banner=strip]', state: 'visible' } },
  { wait: 900 },
]);
