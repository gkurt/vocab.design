import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=hex][data-hex="4F46E5"]', state: 'visible' } },
  { moveTo: '[data-part=preset-amber]' },
  { click: true },
  // Each preset is an absolute value, so a pass picked up anywhere lands in the same place.
  { assert: { selector: '[data-part=hex][data-hex="F59E0B"]', state: 'visible' } },
  { assert: { selector: '[data-part=preset-amber][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=preset-green]' },
  { click: true },
  { assert: { selector: '[data-part=hex][data-hex="16A34A"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=preset-indigo]' },
  { click: true },
  { assert: { selector: '[data-part=hex][data-hex="4F46E5"]', state: 'visible' } },
  { assert: { selector: '[data-part=preset-indigo][data-selected]', state: 'visible' } },
  { wait: 1200 },
]);
