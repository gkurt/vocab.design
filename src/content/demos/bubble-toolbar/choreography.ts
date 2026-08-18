import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The page fades in from mount, so the resting claim waits for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { wait: 500 },

  // A run on the first line: there is no room above it, so the bar flips below.
  { moveTo: '[data-part=w-3]' },
  { drag: { to: '[data-part=w-6]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=bar][data-place=below]', state: 'visible' } },
  { wait: 900 },

  // Clicking away drops the selection, and the bar has nothing left to be about.
  { moveTo: '[data-part=away]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { wait: 500 },

  // A run further down the page: now the bar sits above the words it describes.
  { moveTo: '[data-part=w-30]' },
  { drag: { to: '[data-part=w-31]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=bar][data-place=above]', state: 'visible' } },
  { wait: 600 },

  // A command acts on the run and leaves the bar where it is. Link is the one the script
  // presses because an underline changes no text metrics: bolding a run would re-wrap the
  // line under the bar, and nothing outside the selection should move (SPEC §5).
  { moveTo: '[data-part=btn-link]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=btn-link][aria-pressed="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar][data-open]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=away]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { wait: 500 },

  // Selecting the same run again: the bar reports the formatting the run already carries.
  { moveTo: '[data-part=w-30]' },
  { drag: { to: '[data-part=w-31]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=btn-link][aria-pressed="true"]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=btn-clear]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=btn-link][aria-pressed="false"]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=away]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { wait: 700 },
]);
