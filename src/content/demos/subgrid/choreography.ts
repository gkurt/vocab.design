import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount borrows the parent's tracks: the traced lines and the card seams coincide.
  { assert: { selector: '[data-part=card-0][data-subgrid]', state: 'visible' } },
  { assert: { selector: '[data-part=guides]', state: 'visible' } },
  { assert: { selector: '[data-part=chip]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-own]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-own][aria-selected="true"]', state: 'visible' } },
  // Own rows now, so the card has stopped being a subgrid and its seams have left the
  // traced lines.
  { assert: { selector: '[data-part=card-0][data-subgrid]', state: 'hidden' } },
  { assert: { selector: '[data-part=card-0]', state: 'visible' } },
  { assert: { selector: '[data-part=card-2]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-subgrid]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card-0][data-subgrid]', state: 'visible' } },
  { wait: 900 },
]);
