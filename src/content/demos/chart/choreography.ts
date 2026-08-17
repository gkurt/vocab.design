import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims are made after the card has landed.
  { wait: 700 },
  { assert: { selector: '[data-part=plot][data-series=revenue]', state: 'visible' } },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { assert: { selector: '[data-part=value-label][data-value="84"]', state: 'visible' } },
  { wait: 700 },
  // Each segment names a series outright, so a pass resumed anywhere reads the same.
  // Every claim is made well clear of the 450 ms re-scale.
  { moveTo: '[data-part=seg-signups]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=plot][data-series=signups]', state: 'visible' } },
  { assert: { selector: '[data-part=plot][data-peak="610"]', state: 'visible' } },
  { assert: { selector: '[data-part=value-label][data-value="610"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-revenue]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=plot][data-series=revenue]', state: 'visible' } },
  { assert: { selector: '[data-part=plot][data-peak="84"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-jun]', state: 'visible' } },
  { wait: 900 },
]);
