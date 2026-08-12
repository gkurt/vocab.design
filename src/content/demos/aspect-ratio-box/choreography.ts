import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { assert: { selector: '[data-part=box][data-ratio="16-9"]', state: 'visible' } },
  { moveTo: '[data-part=seg-4-3]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-4-3][aria-selected="true"]', state: 'visible' } },
  // Same width, taller box: the height is the ratio's answer, not a second setting.
  { assert: { selector: '[data-part=box][data-ratio="4-3"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-1-1]' },
  { click: true },
  { wait: 700 },
  // The tallest case, and the caption beside it has not moved: the room was reserved.
  { assert: { selector: '[data-part=box][data-ratio="1-1"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-16-9]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=box][data-ratio="16-9"]', state: 'visible' } },
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { wait: 800 },
]);
