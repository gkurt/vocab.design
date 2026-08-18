import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=year][data-figures=oldstyle]', state: 'visible' } },
  { assert: { selector: '[data-part=set][data-figures=oldstyle]', state: 'visible' } },
  { moveTo: '[data-part=set]' },
  { wait: 800 },
  // The rules wrapper is height:0 so the guides can overlay the line without moving it,
  // and the stage reads a zero-height box as absent. Claim the 2px x-height rule itself,
  // which is also the rule the term actually turns on.
  { assert: { selector: '[data-part=rule-x]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the set it reaches, and the pass
  // ends oldstyle, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-lining]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=year][data-figures=lining]', state: 'visible' } },
  { assert: { selector: '[data-part=year][data-figures=oldstyle]', state: 'hidden' } },
  { assert: { selector: '[data-part=set][data-figures=lining]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-oldstyle]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=year][data-figures=oldstyle]', state: 'visible' } },
  { assert: { selector: '[data-part=set][data-figures=oldstyle]', state: 'visible' } },
  { wait: 700 },
]);
