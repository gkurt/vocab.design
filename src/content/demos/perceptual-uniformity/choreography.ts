import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=ok-ramp][data-hue=blue]', state: 'visible' } },
  { assert: { selector: '[data-part=hsl-ramp][data-hue=blue]', state: 'visible' } },
  { assert: { selector: '[data-part=ok-spread]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names one hue outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-red]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ok-ramp][data-hue=red]', state: 'visible' } },
  { assert: { selector: '[data-part=hsl-ramp][data-hue=red]', state: 'visible' } },
  { wait: 1400 },
  // Yellow is where HSL comes apart: its top rungs barely move and its bottom ones plunge.
  { moveTo: '[data-part=seg-yellow]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ok-ramp][data-hue=yellow]', state: 'visible' } },
  { assert: { selector: '[data-part=hsl-spread]', state: 'visible' } },
  { assert: { selector: '[data-part=ok-l-3]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-blue]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ok-ramp][data-hue=blue]', state: 'visible' } },
  { wait: 900 },
]);
