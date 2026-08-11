import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=tile-spring]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-ease]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Both are travelling: the run is claimed while it is still under way, since a
  // spring's whole argument is what happens between departure and rest.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // The eased tile has been parked for a while by now and the spring is still
  // coming back to its stop, so nothing here sits on a transition edge.
  { wait: 1400 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-spring]', state: 'visible' } },
  { wait: 700 },
]);
