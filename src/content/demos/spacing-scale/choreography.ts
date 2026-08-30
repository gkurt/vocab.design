import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the card spends three rungs of the ladder, and those rungs are marked.
  { assert: { selector: '[data-part=ruler]', state: 'visible' } },
  { assert: { selector: '[data-part=step-16][data-used]', state: 'visible' } },
  { assert: { selector: '[data-part=step-8][data-used]', state: 'visible' } },
  { assert: { selector: '[data-part=step-24][data-used]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-off][data-selected]', state: 'visible' } },
  // Values invented for this one card: the ladder is still published, and nothing on it
  // is being spent.
  { assert: { selector: '[data-part=card][data-mode="off"]', state: 'visible' } },
  { assert: { selector: '[data-part=step-16][data-used]', state: 'hidden' } },
  { assert: { selector: '[data-part=step-8][data-used]', state: 'hidden' } },
  { assert: { selector: '[data-part=step-24][data-used]', state: 'hidden' } },
  { assert: { selector: '[data-part=step-16]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names where the values come from, so the way back is a source too.
  { moveTo: '[data-part=seg-scale]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=card][data-mode="scale"]', state: 'visible' } },
  { assert: { selector: '[data-part=step-16][data-used]', state: 'visible' } },
  { wait: 800 },
]);
