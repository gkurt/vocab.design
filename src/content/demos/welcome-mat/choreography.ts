import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the window to land.
  { wait: 700 },
  // First entry to this feature: the mat is the content area, with its list, its primary
  // action and its permanent way out, and the feature behind it is not the reader's yet.
  { assert: { selector: '[data-part=mat]', state: 'visible' } },
  { assert: { selector: '[data-part=start]', state: 'visible' } },
  { assert: { selector: '[data-part=skip]', state: 'visible' } },
  { assert: { selector: '[data-part=feature][data-state=covered]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-alerts][data-current]', state: 'visible' } },
  { wait: 1100 },

  // The way out is explicit and one way. Nothing is blocked and nothing has to be escaped:
  // the mat leaves and the feature it covered is simply there.
  { moveTo: '[data-part=skip]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=mat]', state: 'hidden' } },
  { assert: { selector: '[data-part=feature][data-state=live]', state: 'visible' } },
  // The alerts a teammate configured were there all along: a mat is not an empty state.
  { assert: { selector: '[data-part=tab-alerts][data-current]', state: 'visible' } },
  { wait: 1100 },
]);
