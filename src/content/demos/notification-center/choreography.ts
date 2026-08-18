import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the first claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=tray]', state: 'visible' } },
  { assert: { selector: '[data-part=row-deploy]', state: 'visible' } },
  { assert: { selector: '[data-part=row-mention-age]', state: 'visible' } },
  { assert: { selector: '[data-part=group][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=members]', state: 'hidden' } },
  { assert: { selector: '[data-part=empty]', state: 'hidden' } },
  { assert: { selector: '[data-part=bell][data-unread="3"]', state: 'visible' } },
  { wait: 600 },
  // Volume is managed by grouping: the header opens its members into reserved room.
  { moveTo: '[data-part=group]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=group][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=members]', state: 'visible' } },
  { wait: 1200 },
  // Clear all is the explicit dismissal, and the tray keeps its height for the empty state.
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=tray]', state: 'visible' } },
  // The unread count means unseen items, so it goes with them.
  { assert: { selector: '[data-part=bell][data-unread="0"]', state: 'visible' } },
  { wait: 1200 },
  // Clearing a record is a deletion, so it gets the undo any deletion gets.
  { moveTo: '[data-part=restore]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'hidden' } },
  { assert: { selector: '[data-part=group][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=bell][data-unread="3"]', state: 'visible' } },
  { wait: 800 },
]);
