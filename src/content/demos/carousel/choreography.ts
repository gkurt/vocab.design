import { steps } from '#src/stage/choreography.ts';

/**
 * Every claim is made against the track's absolute index, and each arrow press is
 * preceded by an assert that pins the index it starts from, so a pass that ever
 * began somewhere else fails loudly rather than demonstrating the wrong step.
 */
export default steps([
  { assert: { selector: '[data-part=track][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-1][data-selected]', state: 'visible' } },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=track][data-index="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=slide-2][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=slide-1][data-current]', state: 'hidden' } },
  { moveTo: '[data-part=dot-3]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=track][data-index="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-3][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=slide-3][data-current]', state: 'visible' } },
  { moveTo: '[data-part=dot-1]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=slide-1][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-3][data-selected]', state: 'hidden' } },
  { wait: 700 },
]);
