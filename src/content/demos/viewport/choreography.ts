import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=viewport]', state: 'visible' } },
  // At rest the window sits over the top of the document.
  { assert: { selector: '[data-part=lens][data-at=top]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  { scroll: { y: 120 } },
  { wait: 800 },
  // The document moved and the window did not: the same rectangle now shows a different part.
  { assert: { selector: '[data-part=viewport]', state: 'visible' } },
  { assert: { selector: '[data-part=lens][data-at=middle]', state: 'visible' } },
  { wait: 1000 },
  { scroll: { y: 400 } },
  { wait: 800 },
  { assert: { selector: '[data-part=lens][data-at=bottom]', state: 'visible' } },
  { wait: 1000 },
  // A delta past the top, so the return is a scroll position rather than an undo.
  { scroll: { y: -700 } },
  { wait: 800 },
  { assert: { selector: '[data-part=lens][data-at=top]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport]', state: 'visible' } },
  { wait: 800 },
]);
