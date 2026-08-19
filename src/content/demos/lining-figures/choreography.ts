import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=year][data-figures=lining]', state: 'visible' } },
  { assert: { selector: '[data-part=set][data-figures=lining]', state: 'visible' } },
  // The rules wrapper is height:0 so the guides can overlay the line without moving it,
  // and the stage reads a zero-height box as absent. Claim the 2px rule itself, which
  // is also the one the term is about.
  { assert: { selector: '[data-part=rule-cap]', state: 'visible' } },
  { assert: { selector: '[data-part=rule-base]', state: 'visible' } },
  { moveTo: '[data-part=seg-oldstyle]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=year][data-figures=oldstyle]', state: 'visible' } },
  { assert: { selector: '[data-part=year][data-figures=lining]', state: 'hidden' } },
  { assert: { selector: '[data-part=set][data-figures=oldstyle]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip, and the pass ends on the setting the subject's
  // data-pose calls honest.
  { moveTo: '[data-part=seg-lining]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=year][data-figures=lining]', state: 'visible' } },
  { assert: { selector: '[data-part=set][data-figures=lining]', state: 'visible' } },
  { assert: { selector: '[data-part=rule-base]', state: 'visible' } },
  { wait: 700 },
]);
