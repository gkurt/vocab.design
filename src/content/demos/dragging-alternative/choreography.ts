import { steps } from '#src/stage/choreography.ts';

/**
 * One card, two routes. The pass drags the card across to prove the gesture works, brings it back
 * through the move menu to prove the menu reaches the identical state, then takes the menu away
 * and shows the drag still working with nothing beside it. Choosing what the board offers resets
 * the card to the first column, so every route is demonstrated from the same start, and the last
 * choice returns the specimen to its mount state (SPEC §8).
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=offered][data-value=both]', state: 'visible' } },
  { assert: { selector: '[data-part=move-a]', state: 'visible' } },
  { assert: { selector: '[data-part=card-a][data-col=todo]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=card-a]' },
  { drag: { to: '[data-part=col-doing]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=card-a][data-col=doing]', state: 'visible' } },
  { assert: { selector: '[data-part=card-a][data-how=drag]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=move-a]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=menu][data-open]', state: 'visible' } },

  { moveTo: '[data-part=item-todo]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card-a][data-col=todo]', state: 'visible' } },
  { assert: { selector: '[data-part=card-a][data-how=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-drag]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=offered][data-value=drag]', state: 'visible' } },
  { assert: { selector: '[data-part=move-a]', state: 'hidden' } },
  { assert: { selector: '[data-part=card-a][data-col=todo]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=card-a]' },
  { drag: { to: '[data-part=col-doing]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=card-a][data-col=doing]', state: 'visible' } },
  { assert: { selector: '[data-part=card-a][data-how=drag]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-both]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=offered][data-value=both]', state: 'visible' } },
  { assert: { selector: '[data-part=move-a]', state: 'visible' } },
  { assert: { selector: '[data-part=card-a][data-col=todo]', state: 'visible' } },
  { wait: 900 },
]);
