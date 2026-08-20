import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the row waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=strip][data-inks=six]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-b]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-f]', state: 'visible' } },
  { wait: 600 },

  // Flattened: the same six marks, now set in one ink.
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=strip][data-inks=one]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-b]', state: 'visible' } },
  { wait: 900 },

  // Back to full colour, where one mark takes the whole row.
  { moveTo: '[data-part=seg-colour]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=strip][data-inks=six]', state: 'visible' } },
  { wait: 700 },
]);
