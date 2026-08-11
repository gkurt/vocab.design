import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=link]', state: 'visible' } },
  { assert: { selector: '[data-part=peek]', state: 'hidden' } },
  { assert: { selector: '[data-part=link][data-visited]', state: 'hidden' } },
  { moveTo: '[data-part=link]' },
  { wait: 600 },
  // Where it goes, read out before anything is pressed: the affordance a button
  // has nothing to offer for.
  { assert: { selector: '[data-part=peek]', state: 'visible' } },
  { middleClick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=trail][data-event=new-tab]', state: 'visible' } },
  { wait: 900 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=link][data-visited]', state: 'visible' } },
  { assert: { selector: '[data-part=trail][data-event=followed]', state: 'visible' } },
  { wait: 900 },
]);
