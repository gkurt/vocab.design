import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the first reading of the region waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=cover][data-length=short][data-fits=exact]', state: 'visible' } },
  { assert: { selector: '[data-part=principal]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 600 },

  // A paragraph more, and the region is still exactly the window's height: the free space
  // simply redistributes above and below the principal element.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cover][data-length=medium][data-fits=exact]', state: 'visible' } },
  { assert: { selector: '[data-part=head]', state: 'visible' } },
  { wait: 700 },

  // Past the minimum, the region grows instead of clipping, and the footer goes below the fold.
  { moveTo: '[data-part=seg-long]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cover][data-length=long][data-fits=over]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=window]' },
  { scroll: { y: 220 } },
  { wait: 700 },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 600 },

  // Back to the shortest content, which puts the region at its minimum again.
  { moveTo: '[data-part=seg-short]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cover][data-length=short][data-fits=exact]', state: 'visible' } },
  { wait: 700 },
]);
