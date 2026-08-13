import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=bar][data-state=expanded]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  // Half of the range the collapse is mapped onto: the header stops halfway and stays
  // there, because the scroll position is the timeline rather than a trigger.
  { scroll: { y: 30 } },
  { wait: 500 },
  { assert: { selector: '[data-part=bar][data-state=collapsing]', state: 'visible' } },
  { wait: 700 },
  { scroll: { y: 200 } },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-state=collapsed]', state: 'visible' } },
  // Compact, but still on stage: collapsing is not hiding.
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 900 },
  // A delta past the top of the scroller: the expanded state is a position, not a flip.
  { scroll: { y: -400 } },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-state=expanded]', state: 'visible' } },
  { wait: 600 },
]);
