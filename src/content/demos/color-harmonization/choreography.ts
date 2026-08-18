import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=harmonized][data-cap="15"]', state: 'visible' } },
  { assert: { selector: '[data-part=out-error][data-shift="15"]', state: 'visible' } },
  { assert: { selector: '[data-part=src-error]', state: 'visible' } },
  { assert: { selector: '[data-part=seed]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one cap outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-8]' },
  { click: true },
  { wait: 600 },
  // A tighter cap moves every colour by exactly the cap: all three are further than twice it.
  { assert: { selector: '[data-part=harmonized][data-cap="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=out-error][data-shift="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=out-brand][data-shift="8"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-30]' },
  { click: true },
  { wait: 600 },
  // At 30 the halving rule bites before the cap does, and only the purple shows it.
  { assert: { selector: '[data-part=harmonized][data-cap="30"]', state: 'visible' } },
  { assert: { selector: '[data-part=out-error][data-shift="30"]', state: 'visible' } },
  { assert: { selector: '[data-part=out-brand][data-shift="22"]', state: 'visible' } },
  { assert: { selector: '[data-part=shift-brand]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-15]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=harmonized][data-cap="15"]', state: 'visible' } },
  { assert: { selector: '[data-part=out-success][data-shift="15"]', state: 'visible' } },
  { wait: 900 },
]);
