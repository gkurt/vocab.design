import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The surface is already wearing a brand at mount, so the pose shows the term without a summon.
  { assert: { selector: '[data-part=panel][data-brand="ledger"]', state: 'visible' } },
  { assert: { selector: '[data-part=primary]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one brand outright, so the run is the same wherever it is picked up.
  { moveTo: '[data-part=seg-ember]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-brand="ember"]', state: 'visible' } },
  { assert: { selector: '[data-part=on-hex]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-fern]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-brand="fern"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-ledger]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-brand="ledger"]', state: 'visible' } },
  { wait: 900 },
]);
