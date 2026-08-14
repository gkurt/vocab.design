import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ring][data-value="25"]', state: 'visible' } },
  { assert: { selector: '[data-part=twin]', state: 'visible' } },
  { wait: 900 },
  // Each control names a value outright, so a pass picked up anywhere lands the same
  // place (SPEC §8). Every claim is made well clear of the arc's 420 ms redraw.
  { moveTo: '[data-part=set-60]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=ring][data-value="60"]', state: 'visible' } },
  { assert: { selector: '[data-part=set-60][data-selected]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=set-100]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=ring][data-value="100"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=set-25]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=ring][data-value="25"]', state: 'visible' } },
  { wait: 900 },
]);
