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
  // Then the same clicks with the key actually held: the scope brackets them in a real
  // keydown and keyup, every click inside carries ctrlKey, and the legend chip lights
  // from the same events a reader's own key sends.
  {
    withKey: {
      key: 'Control',
      steps: [
        { wait: 300 },
        { assert: { selector: '[data-part=key-pick][data-held]', state: 'visible' } },
        { moveTo: '[data-part=row-deck]' },
        { wait: 400 },
        { click: true },
        { wait: 500 },
        { assert: { selector: '[data-part=readout][data-mode=add]', state: 'visible' } },
        { assert: { selector: '[data-part=list][data-count="2"]', state: 'visible' } },
        { assert: { selector: '[data-part=row-budget][data-selected]', state: 'visible' } },
        { wait: 700 },
        { moveTo: '[data-part=row-photo]' },
        { wait: 400 },
        { click: true },
        { wait: 500 },
        { assert: { selector: '[data-part=list][data-count="3"]', state: 'visible' } },
        { assert: { selector: '[data-part=row-photo][data-selected]', state: 'visible' } },
      ],
    },
  },
  { wait: 400 },
  // The key let go: the chip goes out, and the selection the scope built survives it.
  { assert: { selector: '[data-part=key-pick][data-held]', state: 'hidden' } },
  { assert: { selector: '[data-part=list][data-count="3"]', state: 'visible' } },
  { wait: 1000 },
]);
