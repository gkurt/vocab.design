import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=notice][data-step=m]', state: 'visible' } },
  { assert: { selector: '[data-part=head][data-flow=row]', state: 'visible' } },
  { wait: 800 },
  // Absolute settings, never a step up: each segment names the size it reaches, so a
  // pass picked up anywhere demonstrates the same four (SPEC §8).
  { moveTo: '[data-part=seg-s]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=notice][data-step=s]', state: 'visible' } },
  { moveTo: '[data-part=seg-l]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=notice][data-step=l]', state: 'visible' } },
  { assert: { selector: '[data-part=head][data-flow=row]', state: 'visible' } },
  { moveTo: '[data-part=seg-xl]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=notice][data-step=xl]', state: 'visible' } },
  // The reflow the largest setting asks for, and the timestamp still whole.
  { assert: { selector: '[data-part=head][data-flow=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=time]', state: 'visible' } },
  { moveTo: '[data-part=numbers]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=numbers]', state: 'visible' } },
  { moveTo: '[data-part=seg-m]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=notice][data-step=m]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
