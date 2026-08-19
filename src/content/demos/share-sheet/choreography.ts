import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The screen fades in from mount, so the first reading waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=none]', state: 'visible' } },
  { wait: 400 },

  // The app asks for the sheet; the system fills it in.
  { moveTo: '[data-part=share]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'visible' } },
  { assert: { selector: '[data-part=to-notes]', state: 'visible' } },
  { assert: { selector: '[data-part=do-copy]', state: 'visible' } },
  { wait: 1000 },

  // Choosing a destination is one of the sheet's explicit dismissals. The evidence
  // for it is in the screen, where the sheet no longer is.
  { moveTo: '[data-part=to-notes]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=notes]', state: 'visible' } },
  { wait: 800 },

  // Raised again, and left the other explicit way.
  { moveTo: '[data-part=share]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=cancel]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=notes]', state: 'visible' } },
  { wait: 700 },
]);
