import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=fan]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 800 },
  // A poster answers no pointer: the cursor climbs the axis, fan, rule, title, ziggurat.
  { moveTo: '[data-part=fan]' },
  { wait: 900 },
  { moveTo: '[data-part=rule]' },
  { wait: 800 },
  { moveTo: '[data-part=title]' },
  { wait: 900 },
  { moveTo: '[data-part=steps]' },
  { wait: 800 },
  { assert: { selector: '[data-part=steps]', state: 'visible' } },
  { assert: { selector: '[data-part=frame]', state: 'visible' } },
  { assert: { selector: '[data-part=subtitle]', state: 'visible' } },
  { wait: 600 },
]);
