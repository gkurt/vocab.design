import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The card fades in from mount, so the closed claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=chevron][data-dir=right]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  // The other two directions are on stage the whole time: the row that goes deeper and
  // the select that drops a menu.
  { assert: { selector: '[data-part=row-payment]', state: 'visible' } },
  { assert: { selector: '[data-part=select]', state: 'visible' } },
  { wait: 600 },
  // The picker names a state outright rather than flipping whatever it finds (SPEC §8).
  { moveTo: '[data-part=seg-expanded]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=chevron][data-dir=down]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 1200 },
  // Collapse all is the explicit way back, and it points up for the same reason.
  { moveTo: '[data-part=collapse-all]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=chevron][data-dir=right]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 800 },
]);
