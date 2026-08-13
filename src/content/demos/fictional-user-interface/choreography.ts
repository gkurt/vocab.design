import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=screen][data-state="idle"]', state: 'visible' } },
  { assert: { selector: '[data-part=lock]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=hex]' },
  { wait: 700 },
  { moveTo: '[data-part=field]' },
  { wait: 700 },
  // Scan always ends locked, whatever state a pass picks the specimen up in.
  { moveTo: '[data-part=scan]' },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=screen][data-state="locked"]', state: 'visible' } },
  { assert: { selector: '[data-part=lock]', state: 'visible' } },
  { assert: { selector: '[data-part=reticle]', state: 'visible' } },
  { wait: 1200 },
]);
