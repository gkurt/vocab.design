import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=page][data-locked]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-open]', state: 'visible' } },
  // A gesture spent on the locked page: the offset it held is the offset it keeps.
  { moveTo: '[data-part=page]' },
  { wait: 500 },
  { scroll: { y: 220 } },
  { assert: { selector: '[data-part=page][data-moved=no]', state: 'visible' } },
  { wait: 700 },
  // The same gesture inside the overlay, which is the one scroller that should answer.
  { moveTo: '[data-part=panel-scroll]' },
  { wait: 400 },
  { scroll: { y: 90 } },
  { assert: { selector: '[data-part=panel-scroll][data-moved=yes]', state: 'visible' } },
  { wait: 900 },
  // Closing releases the page, and the identical gesture now moves it.
  { moveTo: '[data-part=close]' },
  { wait: 300 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=page][data-locked]', state: 'hidden' } },
  { moveTo: '[data-part=page]' },
  { wait: 400 },
  { scroll: { y: 220 } },
  { assert: { selector: '[data-part=page][data-moved=yes]', state: 'visible' } },
  { wait: 900 },
  // And opening it again locks it, which is the state the specimen mounts in.
  { moveTo: '[data-part=open]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=page][data-locked]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-moved=no]', state: 'visible' } },
  { wait: 1200 },
]);
