import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=split]', state: 'visible' } },
  { assert: { selector: '[data-part=item-1][data-selected]', state: 'visible' } },
  { moveTo: '[data-part=item-3]' },
  { click: true },
  { wait: 500 },
  // The choice lives in the leading pane and stays visible while the trailing
  // pane shows what it points at.
  { assert: { selector: '[data-part=item-3][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-title]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=divider]' },
  { drag: { to: '[data-part=detail]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=split][data-state=max]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=divider]' },
  { drag: { to: '[data-part=list]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=split][data-state=min]', state: 'visible' } },
  { assert: { selector: '[data-part=item-3][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
