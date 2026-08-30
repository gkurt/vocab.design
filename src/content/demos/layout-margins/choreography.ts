import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  // Mount is the narrow width: one inset, stated as a number.
  { assert: { selector: '[data-part=content][data-margin="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=surface]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-medium][data-selected]', state: 'visible' } },
  // The band steps up with the window: the inset is a system decision, not a percentage.
  { assert: { selector: '[data-part=content][data-margin="24"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-wide][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=content][data-margin="32"]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names a width, so the way back is a width too, not an undo.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-margin="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
]);
