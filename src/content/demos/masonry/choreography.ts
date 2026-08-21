import { steps } from '#src/stage/choreography.ts';

// `data-col` is the packer's own answer for each item, so the script can read the
// placement rule instead of measuring pixels. Item 6 chose the middle column
// because it was shortest at the time; the two added items each choose again.
export default steps([
  { wait: 420 },
  { assert: { selector: '[data-part=wall]', state: 'visible' } },
  { assert: { selector: '[data-part=item-3][data-col="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-6][data-col="2"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=add]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=item-7][data-col="1"]', state: 'visible' } },
  { wait: 600 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=item-8][data-col="3"]', state: 'visible' } },
  { wait: 800 },
]);
