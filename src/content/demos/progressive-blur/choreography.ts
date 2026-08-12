import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { assert: { selector: '[data-part=hard]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller-ramp][data-scrolled]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=scroller-ramp]' },
  { scroll: { y: 130 } },
  { wait: 700 },
  // The scene has travelled up into the ramp, and the title over it is still readable.
  { assert: { selector: '[data-part=scroller-ramp][data-scrolled]', state: 'visible' } },
  { assert: { selector: '[data-part=title-ramp]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { wait: 1500 },
  // A delta past the top of the scroller, so the rest position is reached and not flipped.
  { scroll: { y: -400 } },
  { wait: 700 },
  { assert: { selector: '[data-part=scroller-ramp][data-scrolled]', state: 'hidden' } },
  { wait: 600 },
]);
