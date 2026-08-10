import { steps } from '#src/stage/choreography.ts';

// Every step chooses a destination outright, so a pass picked up anywhere reaches the
// same screen (SPEC §8). `hidden` covers the absent attribute, which is how the mark
// leaving the previous destination is proved.
export default steps([
  { assert: { selector: '[data-part=dest-inbox][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-inbox]', state: 'visible' } },
  { moveTo: '[data-part=dest-search]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dest-search][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=dest-inbox][data-current]', state: 'hidden' } },
  { assert: { selector: '[data-part=screen-search]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-inbox]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=dest-saved]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dest-saved][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-saved]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=dest-alerts]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dest-alerts][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-alerts]', state: 'visible' } },
  { wait: 900 },
]);
