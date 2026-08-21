import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=screen][data-state="idle"]', state: 'visible' } },
  { assert: { selector: '[data-part=lock]', state: 'hidden' } },
  { assert: { selector: '[data-part=hex]', state: 'visible' } },
  // The idle telemetry sits a while, because sitting there computing nothing is the term.
  { wait: 1600 },
  // Scan always ends locked, whatever state a pass picks the specimen up in.
  { moveTo: '[data-part=scan]' },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=screen][data-state="locked"]', state: 'visible' } },
  { assert: { selector: '[data-part=lock]', state: 'visible' } },
  { assert: { selector: '[data-part=reticle]', state: 'visible' } },
  { wait: 1200 },
]);
