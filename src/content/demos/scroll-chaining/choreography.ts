import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel][data-chain=room]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-moved=no]', state: 'visible' } },
  // Past the last message and on: the default is that the rest of the gesture becomes
  // the page's. The distance overshoots the panel's end on purpose, so the handoff
  // happens wherever the panel's content leaves off.
  { moveTo: '[data-part=panel]' },
  { wait: 500 },
  { scroll: { y: 500 } },
  { assert: { selector: '[data-part=panel][data-chain=chained]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-moved=yes]', state: 'visible' } },
  { wait: 1100 },
  // The same gesture against a scroller that refuses to hand it on.
  { moveTo: '[data-part=mode-contain]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=panel][data-chain=room]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=panel]' },
  { wait: 400 },
  { scroll: { y: 500 } },
  { assert: { selector: '[data-part=panel][data-chain=blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-moved=no]', state: 'visible' } },
  { wait: 1200 },
]);
