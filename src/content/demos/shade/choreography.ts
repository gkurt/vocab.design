import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=shades]', state: 'visible' } },
  { assert: { selector: '[data-part=sample][data-shade="45"]', state: 'visible' } },
  { moveTo: '[data-part=shade-85]' },
  { click: true },
  // The deepest step has lost most of its chroma, which is the trap the prose names.
  { assert: { selector: '[data-part=sample][data-shade="85"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=shade-25]' },
  { click: true },
  { assert: { selector: '[data-part=sample][data-shade="25"]', state: 'visible' } },
  { wait: 1300 },
]);
