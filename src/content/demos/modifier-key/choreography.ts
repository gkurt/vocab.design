import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=list][data-count="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-brief][data-selected]', state: 'visible' } },
  // Unmodified first: a plain click replaces whatever was selected.
  { moveTo: '[data-part=row-budget]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-mode=replace]', state: 'visible' } },
  { assert: { selector: '[data-part=row-budget][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=row-brief][data-selected]', state: 'hidden' } },
  { wait: 800 },
  // The modifier is armed through its own control, since a synthesized click carries no
  // keys at all. Both segments are absolute states, so the pass never flips a toggle.
  { moveTo: '[data-part=mode-ctrl]' },
  { wait: 350 },
  { click: true },
  { wait: 500 },
  { moveTo: '[data-part=row-deck]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-mode=add]', state: 'visible' } },
  { assert: { selector: '[data-part=list][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-budget][data-selected]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=row-photo]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=list][data-count="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-photo][data-selected]', state: 'visible' } },
  { wait: 1000 },
]);
