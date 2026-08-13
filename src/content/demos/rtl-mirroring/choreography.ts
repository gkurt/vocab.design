import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the panel is the mirrored one, arrow and all.
  { assert: { selector: '[data-part=panel][dir=rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=chev-rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=chev-ltr]', state: 'hidden' } },
  { assert: { selector: '[data-part=nav-tides][data-current]', state: 'visible' } },
  { wait: 900 },
  // The same markup under the other direction: everything logical moves, the arrow is
  // redrawn, and the digits keep their own order.
  { moveTo: '[data-part=seg-ltr]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-ltr][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][dir=ltr]', state: 'visible' } },
  { assert: { selector: '[data-part=chev-ltr]', state: 'visible' } },
  { assert: { selector: '[data-part=chev-rtl]', state: 'hidden' } },
  { assert: { selector: '[data-part=clock]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names a direction, so the way back is a direction too, not an undo.
  { moveTo: '[data-part=seg-rtl]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][dir=rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=chev-rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=chev-ltr]', state: 'hidden' } },
  { wait: 800 },
]);
