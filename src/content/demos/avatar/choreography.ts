import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=avatar][data-source=photo]', state: 'visible' } },
  { assert: { selector: '[data-part=initials]', state: 'hidden' } },
  { wait: 700 },
  // Each step picks a record rather than flipping one, so the chain resolves the
  // same way whichever state the pass was interrupted in.
  { moveTo: '[data-part=rec-name]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=avatar][data-source=initials]', state: 'visible' } },
  { assert: { selector: '[data-part=initials]', state: 'visible' } },
  { assert: { selector: '[data-part=photo]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=rec-nothing]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=avatar][data-source=glyph]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph]', state: 'visible' } },
  { assert: { selector: '[data-part=initials]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=rec-photo]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=avatar][data-source=photo]', state: 'visible' } },
  { assert: { selector: '[data-part=photo]', state: 'visible' } },
  { wait: 900 },
]);
