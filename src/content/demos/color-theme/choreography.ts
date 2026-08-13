import { steps } from '#src/stage/choreography.ts';

export default steps([
  // A theme is always on: the panel wears the light set from mount, so the pose shows the term.
  { assert: { selector: '[data-part=panel][data-set="light"]', state: 'visible' } },
  { assert: { selector: '[data-part=tokens]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one complete set, so the script never depends on the state it finds.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-set="dark"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-contrast]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-set="contrast"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-sepia]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-set="sepia"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-set="light"]', state: 'visible' } },
  { wait: 900 },
]);
