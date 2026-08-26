import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the list to arrive.
  { wait: 550 },
  { assert: { selector: '[data-part=agenda]', state: 'visible' } },
  // The two things a list says that a grid does not: what is next, and which day is free.
  { assert: { selector: '[data-part=next-chip]', state: 'visible' } },
  { assert: { selector: '[data-part=empty-day]', state: 'visible' } },
  { assert: { selector: '[data-part=day-mon][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=agenda][data-top-day=mon]', state: 'visible' } },

  // Reading forward is reading down: the day at the top of the scroller is the day named.
  { moveTo: '[data-part=agenda]' },
  { wait: 350 },
  { scroll: { y: 200 } },
  { wait: 650 },
  { assert: { selector: '[data-part=agenda][data-top-day=wed]', state: 'visible' } },
  { assert: { selector: '[data-part=day-wed][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=ev-oneone]', state: 'visible' } },
  { wait: 1200 },
]);
