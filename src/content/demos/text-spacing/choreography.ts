import { steps } from '#src/stage/choreography.ts';

/**
 * The page's own spacing, then the criterion's four values over both blocks, then back.
 * Each segment reaches its own state (SPEC §8), and the claim that matters is the last
 * line of the tolerant block still being on screen once the spacing has opened up.
 */
export default steps([
  { assert: { selector: '[data-part=prose][data-spacing=off]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-clipped]', state: 'hidden' } },
  { assert: { selector: '[data-part=tail]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-applied]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=prose][data-spacing=applied]', state: 'visible' } },
  { assert: { selector: '[data-part=tail]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-clipped]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=applied]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=prose][data-spacing=off]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-clipped]', state: 'hidden' } },
  { wait: 900 },
]);
