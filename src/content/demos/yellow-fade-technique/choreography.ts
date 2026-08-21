import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so nothing is judged at t=0.
  { wait: 600 },
  { assert: { selector: '[data-part=wash]', state: 'hidden' } },
  { assert: { selector: '[data-part=mark-tile]', state: 'hidden' } },
  { assert: { selector: '[data-part=text-tile][data-value="Pick tile for the backsplash"]', state: 'visible' } },

  { moveTo: '[data-part=rename]' },
  { click: true },
  // Claimed at full strength, well inside the 900ms hold. A wash is never claimed
  // visible on its way out: an exit crosses the visibility floor early however wide
  // the window is made.
  { assert: { selector: '[data-part=wash][data-on=tile][data-wash=full]', state: 'visible' } },
  { assert: { selector: '[data-part=text-tile][data-value="Pick tile for the backsplash (slate)"]', state: 'visible' } },
  // Past the hold and the whole drain.
  { wait: 3000 },
  { assert: { selector: '[data-part=wash]', state: 'hidden' } },
  // The colour has gone; what it pointed at has not.
  { assert: { selector: '[data-part=mark-tile]', state: 'visible' } },
  { assert: { selector: '[data-part=text-tile][data-value="Pick tile for the backsplash (slate)"]', state: 'visible' } },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },

  { wait: 500 },
  { moveTo: '[data-part=check]' },
  { click: true },
  // A second change, on another row: the one wash follows the change rather than
  // belonging to a row.
  { assert: { selector: '[data-part=wash][data-on=electrician][data-wash=full]', state: 'visible' } },
  { assert: { selector: '[data-part=row-electrician][data-changed]', state: 'visible' } },
  { wait: 3000 },
  { assert: { selector: '[data-part=wash]', state: 'hidden' } },
  { assert: { selector: '[data-part=mark-electrician]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-tile]', state: 'visible' } },
  { wait: 700 },
]);
