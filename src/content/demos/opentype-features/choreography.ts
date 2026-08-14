import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=rows][data-features="off"]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-liga]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-smcp]', state: 'visible' } },
  { wait: 1000 },
  // Two absolute states, asked for by name, so a pass picked up anywhere shows the
  // same thing (SPEC §8).
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rows][data-features="on"]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-frac]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rows][data-features="off"]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
