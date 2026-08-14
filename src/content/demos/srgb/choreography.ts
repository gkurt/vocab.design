import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The spellings are on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=space][data-hue="red"]', state: 'visible' } },
  { assert: { selector: '[data-part=wide]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one hue outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-green]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=space][data-hue="green"]', state: 'visible' } },
  { assert: { selector: '[data-part=code-srgb]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-blue]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=space][data-hue="blue"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-red]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=space][data-hue="red"]', state: 'visible' } },
  { wait: 900 },
]);
