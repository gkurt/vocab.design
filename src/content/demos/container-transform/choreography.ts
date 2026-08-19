import { steps } from '#src/stage/choreography.ts';

// The move runs 560ms, so the mid-flight claim lands comfortably inside it rather than on
// either edge, and the settled claims are made well after the box has stopped (SPEC §8).
// Open and close are separate controls, so no step flips whatever state it found.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=container][data-mode=compact][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=open]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },

  { moveTo: '[data-part=open]' },
  { click: true },
  // Judged while the container is still travelling: the growth is the term.
  { assert: { selector: '[data-part=container][data-state=moving]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=container][data-mode=detail][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-title]', state: 'visible' } },
  { assert: { selector: '[data-part=close]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=close]' },
  { click: true },
  { assert: { selector: '[data-part=container][data-state=moving]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=container][data-mode=compact][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=open]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 600 },
]);
