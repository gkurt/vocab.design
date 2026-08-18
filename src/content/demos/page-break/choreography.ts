import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // No rules: the boundary falls wherever the paper runs out, which is inside the figure.
  { assert: { selector: '[data-part=flow][data-rule=none]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-top]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-bottom]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-whole]', state: 'hidden' } },
  { wait: 1000 },
  // break-inside: avoid refuses the cut, so the figure travels whole and page one ends early.
  { moveTo: '[data-part=seg-avoid]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=flow][data-rule=avoid]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-whole]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-top]', state: 'hidden' } },
  { assert: { selector: '[data-part=heading-fees][data-page="2"]', state: 'visible' } },
  { wait: 1200 },
  // break-before: page commands a cut, so the heading leaves the foot of page two.
  { moveTo: '[data-part=seg-before]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=flow][data-rule=before]', state: 'visible' } },
  { assert: { selector: '[data-part=heading-fees][data-page="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-whole]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=flow][data-rule=none]', state: 'visible' } },
  { assert: { selector: '[data-part=fig-top]', state: 'visible' } },
  { wait: 800 },
]);
