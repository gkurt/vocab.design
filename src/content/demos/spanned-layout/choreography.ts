import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The device fades in from mount, so the first reading of the seam waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-mode=crossed]', state: 'visible' } },
  { assert: { selector: '[data-part=seam]', state: 'visible' } },
  // The unaware layout has put a sentence and the primary button over the seam.
  { assert: { selector: '[data-part=save][data-cut]', state: 'visible' } },
  { assert: { selector: '[data-part=sentence]', state: 'visible' } },
  { wait: 1400 },

  // Avoided: one pane still, reflowed so the strip is empty.
  { moveTo: '[data-part=seg-avoided]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-avoided][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=band][data-mode=clear]', state: 'visible' } },
  { assert: { selector: '[data-part=save-avoided]', state: 'visible' } },
  { assert: { selector: '[data-part=save]', state: 'hidden' } },
  { wait: 1400 },

  // Split: the same strip is now the gutter between two panes.
  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=band][data-mode=gutter]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-list]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-detail]', state: 'visible' } },
  { assert: { selector: '[data-part=save-split]', state: 'visible' } },
  { wait: 1500 },

  // Each segment names an arrangement, so the way back is an arrangement too.
  { moveTo: '[data-part=seg-unaware]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=band][data-mode=crossed]', state: 'visible' } },
  { assert: { selector: '[data-part=save][data-cut]', state: 'visible' } },
  { wait: 700 },
]);
