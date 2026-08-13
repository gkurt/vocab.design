import { steps } from '#src/stage/choreography.ts';

// Both panels start reading the same line. Two items arrive above the view, and the only
// difference between the panels afterwards is which line each one is now showing: the
// anchored scroller is still on Message 4, the other has been pushed down to Message 2.
export default steps([
  { assert: { selector: '[data-part=anchored][data-top="m4"]', state: 'visible' } },
  { assert: { selector: '[data-part=loose][data-top="m4"]', state: 'visible' } },
  { moveTo: '[data-part=load]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=anchored][data-top="m4"]', state: 'visible' } },
  { assert: { selector: '[data-part=loose][data-top="m2"]', state: 'visible' } },
  { wait: 1400 },
  // The items really did arrive: scrolling the anchored panel back to the top reaches
  // them, which is the proof that nothing was withheld to keep the view still.
  { moveTo: '[data-part=anchored]' },
  { wait: 400 },
  { scroll: { y: -180 } },
  { wait: 500 },
  { assert: { selector: '[data-part=anchored][data-top="o1"]', state: 'visible' } },
  { wait: 1200 },
]);
