import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the spacer's job waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=spacer][data-role=filler]', state: 'visible' } },
  { assert: { selector: '[data-part=handle]', state: 'hidden' } },
  { assert: { selector: '[data-part=pane-b]', state: 'visible' } },
  { wait: 600 },

  // The same element moves down between the panes, where it is the channel and carries the handle.
  { moveTo: '[data-part=seg-gutter]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=spacer][data-role=gutter]', state: 'visible' } },
  { assert: { selector: '[data-part=handle]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-a]', state: 'visible' } },
  { wait: 800 },

  // Back to the bar, and the handle goes with the job rather than with the element.
  { moveTo: '[data-part=seg-filler]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=spacer][data-role=filler]', state: 'visible' } },
  { assert: { selector: '[data-part=handle]', state: 'hidden' } },
  { wait: 700 },
]);
