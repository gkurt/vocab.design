import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=gauge][data-value="35"]', state: 'visible' } },
  { assert: { selector: '[data-part=gauge][data-zone=ok]', state: 'visible' } },
  { wait: 900 },
  // Every control names a value outright, so a pass picked up anywhere lands the same
  // place (SPEC §8). Each claim is made well clear of the needle's 500 ms swing.
  { moveTo: '[data-part=set-72]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=gauge][data-value="72"]', state: 'visible' } },
  { assert: { selector: '[data-part=gauge][data-zone=warn]', state: 'visible' } },
  { assert: { selector: '[data-part=set-72][data-selected]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=set-94]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=gauge][data-zone=critical]', state: 'visible' } },
  { assert: { selector: '[data-part=status]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=set-35]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=gauge][data-value="35"]', state: 'visible' } },
  { assert: { selector: '[data-part=gauge][data-zone=ok]', state: 'visible' } },
  { wait: 900 },
]);
