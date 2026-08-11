import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sidebar][data-mode=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=label-inbox]', state: 'visible' } },
  { moveTo: '[data-part=nav-starred]' },
  { wait: 700 },
  { moveTo: '[data-part=collapse]' },
  { click: true },
  // The width transition is 240ms; the claim is made well clear of it.
  { wait: 800 },
  { assert: { selector: '[data-part=sidebar][data-mode=rail]', state: 'visible' } },
  // What a rail loses is the labels, not the destinations.
  { assert: { selector: '[data-part=label-inbox]', state: 'hidden' } },
  { assert: { selector: '[data-part=nav-starred]', state: 'visible' } },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=expand]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sidebar][data-mode=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=label-inbox]', state: 'visible' } },
  { wait: 800 },
]);
