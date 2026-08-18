import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the first reading of the knob waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=knob][data-mode=continuous]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-band=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=track-arc]', state: 'visible' } },
  { wait: 500 },

  // Turning it: the handle is dragged around the arc and the value follows the angle.
  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=stop-hi]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=readout][data-band=high]', state: 'visible' } },
  { assert: { selector: '[data-part=knob][data-mode=continuous]', state: 'visible' } },
  { wait: 700 },

  // Detents: the same sweep, but the value can only rest on a notch.
  { moveTo: '[data-part=seg-stepped]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=knob][data-mode=stepped]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-value="90"]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=stop-mid]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=readout][data-value="60"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-band=mid]', state: 'visible' } },
  { wait: 700 },

  // Endless: no end stops at all, so the scale closes into a ring.
  { moveTo: '[data-part=seg-endless]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=knob][data-mode=endless]', state: 'visible' } },
  { assert: { selector: '[data-part=track-ring]', state: 'visible' } },
  { assert: { selector: '[data-part=track-arc]', state: 'hidden' } },
  { wait: 600 },

  // An endless encoder reports how far the turn went, not where the pointer ended up.
  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=stop-lo]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=readout][data-band=low]', state: 'visible' } },
  { assert: { selector: '[data-part=knob][data-mode=endless]', state: 'visible' } },
  { wait: 700 },

  // Back to the bounded sweep, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-continuous]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=knob][data-mode=continuous]', state: 'visible' } },
  { assert: { selector: '[data-part=track-arc]', state: 'visible' } },
  { wait: 700 },
]);
