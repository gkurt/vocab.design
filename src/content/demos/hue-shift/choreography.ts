import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The shifted rendering is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=ball][data-hue="blue"]', state: 'visible' } },
  { assert: { selector: '[data-part=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=wheel]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-green]' },
  { click: true },
  { wait: 600 },
  // A different object hue, the same two treatments, and the pins move to say where.
  { assert: { selector: '[data-part=ball][data-hue="green"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-red]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ball][data-hue="red"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-blue]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ball][data-hue="blue"]', state: 'visible' } },
  { wait: 900 },
]);
