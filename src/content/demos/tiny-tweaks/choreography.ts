import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The scene fades in from mount, so the first reading of the column waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-flow=stacked]', state: 'visible' } },
  { assert: { selector: '[data-part=picture]', state: 'visible' } },
  { assert: { selector: '[data-part=val-type]', state: 'visible' } },
  { wait: 600 },

  // Narrower: the numbers step down and the arrangement does not move.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-flow=stacked]', state: 'visible' } },
  { assert: { selector: '[data-part=copy]', state: 'visible' } },
  { wait: 800 },

  // Narrowest, where a reflowing pattern would have rearranged: still one column.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-flow=stacked]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=val-margin]', state: 'visible' } },
  { wait: 800 },

  // Back to the widest, with the same order and bigger numbers.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-flow=stacked]', state: 'visible' } },
  { wait: 700 },
]);
