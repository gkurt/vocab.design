import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The composite is on stage from mount, so the pose already shows the four inks mixing.
  { wait: 420 },
  { assert: { selector: '[data-part=stack][data-mode="all"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-cyan]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-key]', state: 'visible' } },
  { assert: { selector: '[data-part=screen]', state: 'visible' } },
  { assert: { selector: '[data-part=printed]', state: 'visible' } },
  { wait: 1000 },

  // Each segment names one plate outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-cyan]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-mode="cyan"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-cyan]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-magenta]', state: 'hidden' } },
  { assert: { selector: '[data-part=sail]', state: 'hidden' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-magenta]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-mode="magenta"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-magenta]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-cyan]', state: 'hidden' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-yellow]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-mode="yellow"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-yellow]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-key]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-mode="key"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-key]', state: 'visible' } },
  { assert: { selector: '[data-part=sail]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-yellow]', state: 'hidden' } },
  { wait: 1100 },

  // Back to the composite, which is the only state where the term is on the sheet.
  { moveTo: '[data-part=seg-all]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-mode="all"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-yellow]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 1300 },
]);
