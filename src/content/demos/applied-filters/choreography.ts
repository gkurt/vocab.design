import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=chip-full-time]', state: 'visible' } },
  { assert: { selector: '[data-part=results][data-shown="1"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=chip-full-time]' },
  { click: true },
  { wait: 600 },
  // The token is gone, the facet that set it is unticked, and the results widen.
  { assert: { selector: '[data-part=chip-full-time]', state: 'hidden' } },
  { assert: { selector: '[data-part=box-full-time][aria-checked="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=results][data-shown="2"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=applied-empty]', state: 'visible' } },
  { assert: { selector: '[data-part=results][data-shown="6"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=facet-berlin]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=chip-berlin]', state: 'visible' } },
  { assert: { selector: '[data-part=results][data-shown="3"]', state: 'visible' } },
  { wait: 1200 },
]);
