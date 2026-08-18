import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Flat: one continuous display, one pane, and the fold still drawn across it.
  { assert: { selector: '[data-part=app][data-posture=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-b]', state: 'hidden' } },
  { assert: { selector: '[data-part=seam]', state: 'visible' } },
  { wait: 1000 },
  // Book: the hinge runs vertically and the app splits either side of it.
  { moveTo: '[data-part=seg-book]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=app][data-posture=book]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-b]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { wait: 1400 },
  // Tabletop: the hinge runs horizontally, so the controls move below the fold.
  { moveTo: '[data-part=seg-tabletop]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=app][data-posture=tabletop]', state: 'visible' } },
  { assert: { selector: '[data-part=controls]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 1400 },
  // Back to flat.
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=app][data-posture=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-b]', state: 'hidden' } },
  { wait: 800 },
]);
