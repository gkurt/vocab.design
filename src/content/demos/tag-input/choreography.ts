import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=chip-grids]', state: 'visible' } },
  { moveTo: '[data-part=entry]' },
  { type: 'kerning' },
  { press: 'Enter' },
  { wait: 400 },
  { assert: { selector: '[data-part=chip-new]', state: 'visible' } },
  { moveTo: '[data-part=chip-grids-remove]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=chip-grids]', state: 'hidden' } },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
]);
