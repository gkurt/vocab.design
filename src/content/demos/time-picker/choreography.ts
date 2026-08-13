import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=picker]', state: 'visible' } },
  { assert: { selector: '[data-part=hour-9][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="09:30 AM"]', state: 'visible' } },
  { moveTo: '[data-part=hour-10]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=hour-10][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=hour-9][aria-selected="true"]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-time="10:30 AM"]', state: 'visible' } },
  { moveTo: '[data-part=min-35]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=min-35][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="10:35 AM"]', state: 'visible' } },
  // Arrow keys nudge the column the last pick was in, one step of the picker's own size.
  { press: 'ArrowDown' },
  { wait: 500 },
  { assert: { selector: '[data-part=min-40][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="10:40 AM"]', state: 'visible' } },
  { moveTo: '[data-part=seg-pm]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=seg-pm][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="10:40 PM"]', state: 'visible' } },
  { wait: 900 },
]);
