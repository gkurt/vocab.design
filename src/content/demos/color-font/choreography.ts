import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=glyph][data-palette=sunrise]', state: 'visible' } },
  // Three layers where flat type has one: each claimed on its own.
  { assert: { selector: '[data-part=layer-0]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-1]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-2]', state: 'visible' } },
  { assert: { selector: '[data-part=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=emoji]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names a palette the family shipped.
  { moveTo: '[data-part=seg-dusk]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=glyph][data-palette=dusk]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-2]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-1]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends back on the palette the specimen mounts with.
  { moveTo: '[data-part=seg-sunrise]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=glyph][data-palette=sunrise]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-2]', state: 'visible' } },
  { wait: 700 },
]);
