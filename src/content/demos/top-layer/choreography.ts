import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the surface is a modal dialog: promoted, with its backdrop over the page.
  // The kit scrim fades in over 220 ms from mount, so the claims wait it out.
  { wait: 600 },
  { assert: { selector: '[data-part=surface][data-layer=top]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'visible' } },
  { assert: { selector: '[data-part=ribbon]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-popover]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-popover][data-selected]', state: 'visible' } },
  // Anchored inside the card now, and still clear of both the clip and the 99999.
  { assert: { selector: '[data-part=surface][data-layer=top]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-plain][data-selected]', state: 'visible' } },
  // The same box left in the page: it keeps its place in the document's own order.
  { assert: { selector: '[data-part=surface][data-layer=page]', state: 'visible' } },
  { assert: { selector: '[data-part=ribbon]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'hidden' } },
  { wait: 1500 },
  // Each segment names what the surface is, so the way back is a surface too, not an undo.
  { moveTo: '[data-part=seg-dialog]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-dialog][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=surface][data-layer=top]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'visible' } },
  { wait: 900 },
]);
