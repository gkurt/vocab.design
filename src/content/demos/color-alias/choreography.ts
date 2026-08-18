import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=alias-warning][data-points="amber-500"]', state: 'visible' } },
  { assert: { selector: '[data-part=alias-pending][data-points="amber-200"]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-banner-warning-bg][data-resolves="amber-500"]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one theme outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  // Both aliases re-point, and the component tokens follow without naming a new value.
  { assert: { selector: '[data-part=alias-warning][data-points="amber-300"]', state: 'visible' } },
  { assert: { selector: '[data-part=alias-pending][data-points="amber-600"]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-banner-warning-bg][data-resolves="amber-300"]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-chip-pending-bg][data-resolves="amber-600"]', state: 'visible' } },
  // The scale is untouched: every rung still on stage under its own name.
  { assert: { selector: '[data-part=rung-amber-200]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-amber-500]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=alias-warning][data-points="amber-500"]', state: 'visible' } },
  { assert: { selector: '[data-part=alias-pending][data-points="amber-200"]', state: 'visible' } },
  { wait: 900 },
]);
