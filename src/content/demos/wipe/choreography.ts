import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=slot][data-showing=harbour]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-state=settled]', state: 'visible' } },
  { moveTo: '[data-part=seg-offshore]' },
  { click: true },
  // Judged part way across, while the boundary is still travelling. A clip changes
  // what is painted and not what is measured, so both plates keep their boxes
  // throughout and the state attribute is what can prove the trip is on.
  { assert: { selector: '[data-part=slot][data-state=wiping]', state: 'visible' } },
  // Well clear of the 620 ms travel: the claim is about where the edge parks.
  { wait: 900 },
  { assert: { selector: '[data-part=slot][data-showing=offshore]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-offshore][aria-selected="true"]', state: 'visible' } },
  { wait: 600 },
  // Back the way it came, and to an absolute plate rather than a toggle.
  { moveTo: '[data-part=seg-harbour]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=slot][data-showing=harbour]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-state=settled]', state: 'visible' } },
  { wait: 500 },
]);
