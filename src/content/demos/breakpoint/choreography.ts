import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=region]', state: 'visible' } },
  // Narrowest step: one column, and the aside is not in the layout at all.
  { assert: { selector: '[data-part=viewport][data-bp=sm]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-shape=stacked]', state: 'visible' } },
  { assert: { selector: '[data-part=aside]', state: 'hidden' } },
  { moveTo: '[data-part=seg-md]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-md][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-bp=md]', state: 'visible' } },
  // Past the first threshold the nav becomes a column beside the content.
  { assert: { selector: '[data-part=region][data-shape=sidebar]', state: 'visible' } },
  { assert: { selector: '[data-part=aside]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-lg]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=viewport][data-bp=lg]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-shape=three]', state: 'visible' } },
  { assert: { selector: '[data-part=aside]', state: 'visible' } },
  { wait: 1100 },
  // Each segment names a width, so the way back is a width too, not an undo.
  { moveTo: '[data-part=seg-sm]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=region][data-shape=stacked]', state: 'visible' } },
  { assert: { selector: '[data-part=aside]', state: 'hidden' } },
  { assert: { selector: '[data-part=region]', state: 'visible' } },
  { wait: 800 },
]);
