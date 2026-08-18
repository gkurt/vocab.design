import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=target][data-stage=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { wait: 500 },
  // Firm: the press crosses the first mark, and a preview lifts without committing to anything.
  { moveTo: '[data-part=force-firm]' },
  { wait: 450 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=target][data-stage=peek]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-stage=peek]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'hidden' } },
  { wait: 900 },
  // Deep: past the second mark the same preview commits, fills the pane, and offers its actions.
  { moveTo: '[data-part=force-deep]' },
  { wait: 450 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=target][data-stage=pop]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-stage=pop]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 1000 },
  // Acting on the popped panel dismisses it and hands the press back to rest. The claim is made
  // on the row, since the button that made it is inside the surface the click just closed.
  { moveTo: '[data-part=archive]' },
  { wait: 450 },
  { click: true },
  { wait: 1100 },
  { assert: { selector: '[data-part=target][data-stage=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { wait: 900 },
]);
