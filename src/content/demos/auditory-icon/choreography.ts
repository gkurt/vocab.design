import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the desk to arrive.
  { wait: 500 },
  // Mounted with a sound already drawn, so the pin always has one to ring.
  { assert: { selector: '[data-part=wave][data-sound=whoosh]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-shape=swell]', state: 'visible' } },
  // The honest half of a sound the medium may not deliver unasked.
  { assert: { selector: '[data-part=silent]', state: 'visible' } },

  { moveTo: '[data-part=obj-paper]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  // A crumple is a rattling burst and nothing else in the scene sounds like it. The
  // claim is the shape, because resemblance is what this term has instead of convention.
  { assert: { selector: '[data-part=wave][data-sound=crumple]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-shape=burst]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=obj-envelope]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  // The other object, the other sound: one smooth swell, drawn as one.
  { assert: { selector: '[data-part=wave][data-sound=whoosh]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-shape=swell]', state: 'visible' } },
  { wait: 1100 },
]);
