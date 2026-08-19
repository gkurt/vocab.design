import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'visible' } },
  { wait: 700 },
  // First path: a press on the page behind it, on nothing in particular. Aimed at
  // the caption on the far side of the scene, because the page's own centre sits
  // at the popover's edge and the cursor would read as pressing the surface it
  // is dismissing.
  { moveTo: '[data-part=caption]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'visible' } },
  { wait: 700 },
  // Second path: the same dismissal for a reader with no outside to click.
  { press: 'Escape' },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { wait: 1200 },
]);
