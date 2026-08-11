import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The band is as wide as the page and wider than the column it interrupts.
  { assert: { selector: '[data-part=band][data-bleed]', state: 'visible' } },
  { assert: { selector: '[data-part=lede]', state: 'visible' } },
  { moveTo: '[data-part=lede]' },
  { wait: 800 },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { moveTo: '[data-part=band-label]' },
  { wait: 900 },
  { assert: { selector: '[data-part=band][data-bleed]', state: 'visible' } },
  { moveTo: '[data-part=tail]' },
  { wait: 800 },
  // The neighbours never moved: the escape belongs to one element.
  { assert: { selector: '[data-part=tail]', state: 'visible' } },
  { wait: 700 },
]);
