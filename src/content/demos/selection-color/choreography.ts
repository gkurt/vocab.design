import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The highlight is held from mount, which is also the state the subject's pose condition names.
  { assert: { selector: '[data-part=run][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=default-run][data-selected]', state: 'visible' } },
  { wait: 1000 },
  // Each segment names one state of the selection, so neither step depends on the state it finds.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=run][data-selected]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-selected]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=run][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
