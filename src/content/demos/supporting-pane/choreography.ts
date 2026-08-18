import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Expanded: the pane sits beside the focus pane and there is nothing to open.
  { assert: { selector: '[data-part=support][data-placement=beside]', state: 'visible' } },
  { assert: { selector: '[data-part=open-support]', state: 'hidden' } },
  { wait: 900 },
  // Each segment names the placement it produces, so a pick is absolute (SPEC §8).
  { moveTo: '[data-part=seg-below]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=support][data-placement=below]', state: 'visible' } },
  { assert: { selector: '[data-part=open-support]', state: 'hidden' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-behind]' },
  { click: true },
  { wait: 800 },
  // Compact: the same pane is off stage until the control the layout gave it is used.
  { assert: { selector: '[data-part=support][data-placement=behind]', state: 'hidden' } },
  { assert: { selector: '[data-part=open-support]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=open-support]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=support][data-placement=behind]', state: 'visible' } },
  { assert: { selector: '[data-part=close-support]', state: 'visible' } },
  { wait: 1300 },
  // The sheet has its own dismissal rather than a trigger that toggles (SPEC §8).
  { moveTo: '[data-part=close-support]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=support]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-beside]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=support][data-placement=beside]', state: 'visible' } },
  { wait: 900 },
]);
