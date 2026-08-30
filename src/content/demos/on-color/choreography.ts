import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=pair][data-palette="indigo"]', state: 'visible' } },
  { assert: { selector: '[data-part=paired-ink]', state: 'visible' } },
  { wait: 900 },
  // Each palette is an absolute state, so the pair re-resolves the same way on any pass.
  { moveTo: '[data-part=seg-amber]' },
  { click: true },
  { assert: { selector: '[data-part=pair][data-palette="amber"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-amber][data-selected]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-teal]' },
  { click: true },
  { assert: { selector: '[data-part=pair][data-palette="teal"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-indigo]' },
  { click: true },
  { assert: { selector: '[data-part=pair][data-palette="indigo"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-indigo][data-selected]', state: 'visible' } },
  { wait: 1200 },
]);
