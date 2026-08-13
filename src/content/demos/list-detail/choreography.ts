import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Wide: both panes at once, the first entry already selected and open.
  { assert: { selector: '[data-part=region][data-width=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-item="0"]', state: 'visible' } },
  { moveTo: '[data-part=item-2]' },
  { click: true },
  { wait: 700 },
  // Picking in the index changes the detail, and the row stays marked as the one being read.
  { assert: { selector: '[data-part=item-2][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-item="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  // Too narrow for both: the pair becomes two screens, and the index is the first one.
  { assert: { selector: '[data-part=region][data-width=narrow][data-pane=list]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=item-4]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=detail][data-item="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=back]', state: 'visible' } },
  { wait: 1000 },
  // Back is the explicit way out of the pushed screen, not a toggle on the trigger.
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=region][data-pane=list]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=region][data-width=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-item="4"]', state: 'visible' } },
  { wait: 800 },
]);
