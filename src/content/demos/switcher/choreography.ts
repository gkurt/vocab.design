import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the arrangement waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=switcher][data-axis=row]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1]', state: 'visible' } },
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { wait: 500 },

  // Narrower than the threshold, and every card takes a line of its own.
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=aim-narrow]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=switcher][data-axis=column]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1]', state: 'visible' } },
  { assert: { selector: '[data-part=card-2]', state: 'visible' } },
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { wait: 800 },

  // Back over the threshold, and they share one row again. The handle has travelled with
  // the container's edge, so the drag starts from wherever it is now.
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=aim-wide]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=switcher][data-axis=row]', state: 'visible' } },
  { assert: { selector: '[data-part=card-2]', state: 'visible' } },
  { wait: 700 },
]);
