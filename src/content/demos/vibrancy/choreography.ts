import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=scene][data-backdrop=sunset]', state: 'visible' } },
  { assert: { selector: '[data-part=material]', state: 'visible' } },
  { assert: { selector: '[data-part=flat]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one backdrop outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-ocean]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=scene][data-backdrop=ocean]', state: 'visible' } },
  // The vibrant panel has just changed colour; the blur-only one has not, and both are still here.
  { assert: { selector: '[data-part=material]', state: 'visible' } },
  { assert: { selector: '[data-part=tint]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-sunset]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=scene][data-backdrop=sunset]', state: 'visible' } },
  { assert: { selector: '[data-part=material]', state: 'visible' } },
  { wait: 900 },
]);
