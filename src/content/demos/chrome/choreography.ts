import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the first reading of the furniture waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=chrome][data-state=shown]', state: 'visible' } },
  { assert: { selector: '[data-part=address]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 600 },

  // Content only: the furniture goes, and the page takes the whole window.
  { moveTo: '[data-part=seg-gone]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=chrome]', state: 'hidden' } },
  { assert: { selector: '[data-part=tab]', state: 'hidden' } },
  // The collapsed chrome has no box to claim, so the evidence is mirrored onto the readout.
  { assert: { selector: '[data-part=note][data-chrome=gone]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 800 },

  // Back with the chrome, which takes its share of the window again.
  { moveTo: '[data-part=seg-shown]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=chrome][data-state=shown]', state: 'visible' } },
  { assert: { selector: '[data-part=toolbar]', state: 'visible' } },
  { wait: 700 },
]);
