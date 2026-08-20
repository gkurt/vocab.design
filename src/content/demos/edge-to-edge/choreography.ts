import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The scene fades in from mount, so the first reading of the surface waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=canvas][data-mode=edge]', state: 'visible' } },
  { assert: { selector: '[data-part=action]', state: 'visible' } },
  { wait: 600 },

  // Inset: the surface is squeezed between the bars and the two bands go dead.
  { moveTo: '[data-part=seg-inset]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=canvas][data-mode=inset]', state: 'visible' } },
  { assert: { selector: '[data-part=status-bar]', state: 'visible' } },
  { assert: { selector: '[data-part=action]', state: 'visible' } },
  { wait: 800 },

  // Back edge to edge: the picture runs under both bars, the button keeps its insets.
  { moveTo: '[data-part=seg-edge]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=canvas][data-mode=edge]', state: 'visible' } },
  { assert: { selector: '[data-part=home-bar]', state: 'visible' } },
  { wait: 700 },
]);
