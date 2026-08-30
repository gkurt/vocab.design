import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  // Both slots start under the query width, so both copies of the card stack.
  { assert: { selector: '[data-part=slot][data-width=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-layout=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=twin-card][data-layout=stack]', state: 'visible' } },
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-wide][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-width=wide]', state: 'visible' } },
  // The card in the widened slot re-lays; the twin, in a slot that did not move, does not.
  { assert: { selector: '[data-part=card][data-layout=row]', state: 'visible' } },
  { assert: { selector: '[data-part=twin-card][data-layout=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=twin-card][data-layout=row]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-width=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-layout=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 800 },
]);
