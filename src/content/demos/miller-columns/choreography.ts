import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: the first level chosen, so the second column already holds its children.
  { assert: { selector: '[data-part=columns][data-depth="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-1-1][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=item-2-1]', state: 'visible' } },
  { assert: { selector: '[data-part=item-3-1]', state: 'hidden' } },
  { wait: 900 },
  // Choosing in the second column fills the third, and the first two stay exactly where they were.
  { moveTo: '[data-part=item-2-1]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=columns][data-depth="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-2-1][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=item-3-2]', state: 'visible' } },
  { wait: 1000 },
  // Choosing a leaf fills the fourth column with its preview and slides the set sideways.
  { moveTo: '[data-part=item-3-2]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=columns][data-depth="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'visible' } },
  { assert: { selector: '[data-part=path]', state: 'visible' } },
  { wait: 1300 },
  // Retargeting a level up is one click on a column that is still in front of the reader.
  { moveTo: '[data-part=item-2-2]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=columns][data-depth="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-2-2][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { wait: 900 },
]);
