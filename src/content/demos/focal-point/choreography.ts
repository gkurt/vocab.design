import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount is the size lever: the action is the biggest thing on the page.
  { assert: { selector: '[data-part=cta][data-lever="size"]', state: 'visible' } },
  { assert: { selector: '[data-part=neighbour]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-contrast]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-contrast][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=cta][data-lever="contrast"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-isolation]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-isolation][aria-selected="true"]', state: 'visible' } },
  // The crowd steps back and keeps its room, so the space around the action is the change.
  { assert: { selector: '[data-part=neighbour]', state: 'hidden' } },
  { assert: { selector: '[data-part=cta][data-lever="isolation"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=neighbour]', state: 'visible' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  // Still on the page, no longer winning anything: the state that carries no lever.
  { assert: { selector: '[data-part=cta][data-lever]', state: 'hidden' } },
  { wait: 1300 },
  // Each segment names a lever, so the way back is a lever too, not an undo.
  { moveTo: '[data-part=seg-size]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cta][data-lever="size"]', state: 'visible' } },
  { wait: 800 },
]);
