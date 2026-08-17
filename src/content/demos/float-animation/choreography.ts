import { steps } from '#src/stage/choreography.ts';

// Each segment names an amplitude outright, so a pass resumed anywhere lands on the
// amplitude it asked for rather than on whichever one came next (SPEC §8).
export default steps([
  { wait: 900 },
  { assert: { selector: '[data-part=card-2][data-float=on][data-amp=subtle]', state: 'visible' } },
  { assert: { selector: '[data-part=row]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-lively]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card-2][data-float=on][data-amp=lively]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1][data-amp=lively]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-still]' },
  { click: true },
  { wait: 600 },
  // The counter-example: the setting is off, so nothing in the composition drifts.
  { assert: { selector: '[data-part=card-2][data-float=off]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-subtle]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card-2][data-float=on][data-amp=subtle]', state: 'visible' } },
  { wait: 900 },
]);
