import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=container-panel][data-role=primary][data-tone="90"]', state: 'visible' } },
  { assert: { selector: '[data-part=solid-panel][data-role=primary][data-tone="40"]', state: 'visible' } },
  // The fill holds ordinary copy: that is the claim, so the copy is asserted on stage.
  { assert: { selector: '[data-part=container-body]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one role outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-error]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=container-panel][data-role=error][data-tone="90"]', state: 'visible' } },
  { assert: { selector: '[data-part=solid-panel][data-role=error]', state: 'visible' } },
  { assert: { selector: '[data-part=container-body]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-success]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=container-panel][data-role=success][data-tone="90"]', state: 'visible' } },
  { assert: { selector: '[data-part=solid-panel][data-role=success]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-primary]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=container-panel][data-role=primary]', state: 'visible' } },
  { wait: 900 },
]);
