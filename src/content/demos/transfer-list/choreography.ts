import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=opt-region][data-in=available]', state: 'visible' } },
  { assert: { selector: '[data-part=move-right][aria-disabled="true"]', state: 'visible' } },
  { moveTo: '[data-part=opt-region]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=opt-region][aria-selected="true"]', state: 'visible' } },
  // Something is selected on the left, so the button that takes from the left is live.
  { assert: { selector: '[data-part=move-right][aria-disabled="true"]', state: 'hidden' } },
  { moveTo: '[data-part=move-right]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-region][data-in=chosen]', state: 'visible' } },
  { assert: { selector: '[data-part=move-right][aria-disabled="true"]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=opt-revenue]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=opt-revenue][aria-selected="true"]', state: 'visible' } },
  { moveTo: '[data-part=move-left]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-revenue][data-in=available]', state: 'visible' } },
  { assert: { selector: '[data-part=move-left][aria-disabled="true"]', state: 'visible' } },
  { wait: 900 },
]);
