import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: a notch, with the content region starting at the inset the device reports.
  { assert: { selector: '[data-part=content][data-cutout=notch][data-mode=inset]', state: 'visible' } },
  { assert: { selector: '[data-part=app-bar]', state: 'visible' } },
  { wait: 900 },
  // The same content region drawn from the very top of the display: the bar goes under the housing.
  { moveTo: '[data-part=seg-edge]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-mode=edge]', state: 'visible' } },
  { wait: 1100 },
  // A smaller housing is not a safer one, so the shape is picked while the mode stays edge to edge.
  { moveTo: '[data-part=seg-hole]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-cutout=hole][data-mode=edge]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-island]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-cutout=island][data-mode=edge]', state: 'visible' } },
  { wait: 1000 },
  // Back to the honest state, which is also the state identify is allowed to pose.
  { moveTo: '[data-part=seg-inset]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=content][data-cutout=island][data-mode=inset]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-title]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-notch]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-cutout=notch][data-mode=inset]', state: 'visible' } },
  { wait: 800 },
]);
