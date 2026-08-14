import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount is the trapped state: Card A carries a transform, so it is making a context.
  { assert: { selector: '[data-part=card-a][data-context]', state: 'visible' } },
  { assert: { selector: '[data-part=tip]', state: 'visible' } },
  { assert: { selector: '[data-part=chip]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-none][aria-selected="true"]', state: 'visible' } },
  // Nothing on the card any more, so there is no context for the tooltip to be stuck in.
  { assert: { selector: '[data-part=card-a][data-context]', state: 'hidden' } },
  { assert: { selector: '[data-part=card-a]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-opacity]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-opacity][aria-selected="true"]', state: 'visible' } },
  // The invisible trigger: the card looks identical and the tooltip is trapped again.
  { assert: { selector: '[data-part=card-a][data-context]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-transform]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card-a][data-context]', state: 'visible' } },
  { wait: 900 },
]);
