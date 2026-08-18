import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  // Mount is list detail: the schematic set is on the left, the chosen arrangement beside it.
  { assert: { selector: '[data-part=pane][data-arrangement=list-detail]', state: 'visible' } },
  { assert: { selector: '[data-part=list-column]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-supporting-pane]', state: 'hidden' } },
  { wait: 900 },
  // Each schematic names an arrangement, so a pick is absolute rather than a step along the list.
  { moveTo: '[data-part=pick-supporting-pane]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pick-supporting-pane][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=pane][data-arrangement=supporting-pane]', state: 'visible' } },
  { assert: { selector: '[data-part=support-rail]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-list-detail]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=pick-feed]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pick-feed][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=pane][data-arrangement=feed]', state: 'visible' } },
  { assert: { selector: '[data-part=feed-grid]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-supporting-pane]', state: 'hidden' } },
  { wait: 1200 },
  // Back to the first arrangement by naming it, since the set is a choice and not a cycle.
  { moveTo: '[data-part=pick-list-detail]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pane][data-arrangement=list-detail]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-pane]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-feed]', state: 'hidden' } },
  { wait: 900 },
]);
