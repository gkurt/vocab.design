import { steps } from '#src/stage/choreography.ts';

/**
 * The chart arrives as delivered, loses its decoration, and gets it back, so a pass picked
 * up anywhere reads the same and the subject is honest again by the end. The opening wait
 * lets the mount fade land before the first claim; the waits after each click clear the
 * 0.4s opacity move by a comfortable margin rather than judging it mid-flight.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=junk][data-mode=laden]', state: 'visible' } },
  { assert: { selector: '[data-part=tally][data-mode=laden]', state: 'visible' } },
  { wait: 1000 },

  // Erase every mark that carries no number: the five values are all still there.
  { moveTo: '[data-part=seg-stripped]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=junk]', state: 'hidden' } },
  { assert: { selector: '[data-part=tally][data-mode=stripped]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-jul]', state: 'visible' } },
  { assert: { selector: '[data-part=axis]', state: 'visible' } },
  { wait: 1500 },

  // Back to the delivered chart, which is the only state in which the subject is the term.
  { moveTo: '[data-part=seg-laden]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=junk][data-mode=laden]', state: 'visible' } },
  { assert: { selector: '[data-part=tally][data-mode=laden]', state: 'visible' } },
  { wait: 800 },
]);
