import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The card fades in from mount, so the first reading of the reference waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=reference][data-kind=target]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-target]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-band]', state: 'hidden' } },
  // Three days over the committed target: the line is what makes that countable.
  { assert: { selector: '[data-part=tally][data-out="3"]', state: 'visible' } },
  { wait: 700 },

  // The series' own mean is a reference too, and it fails a different set of marks.
  { moveTo: '[data-part=seg-average]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=reference][data-kind=average]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-average]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-target]', state: 'hidden' } },
  { assert: { selector: '[data-part=tally][data-out="5"]', state: 'visible' } },
  { wait: 900 },

  // A band is the same component with a tolerance: two rules and the zone between them.
  { moveTo: '[data-part=seg-band]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=reference][data-kind=band]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-band]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-average]', state: 'hidden' } },
  { assert: { selector: '[data-part=tally][data-out="4"]', state: 'visible' } },
  { wait: 900 },

  // Back to the target, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-target]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=reference][data-kind=target]', state: 'visible' } },
  { assert: { selector: '[data-part=tally][data-out="3"]', state: 'visible' } },
  { wait: 700 },
]);
