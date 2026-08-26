import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the arrangement waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=fluid][data-flow=row]', state: 'visible' } },
  { assert: { selector: '[data-part=col-1]', state: 'visible' } },
  { assert: { selector: '[data-part=col-2]', state: 'visible' } },
  { wait: 500 },

  // Narrow enough that twice the column ceiling no longer fits, and the second one drops.
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=aim-narrow]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=fluid][data-flow=column]', state: 'visible' } },
  { assert: { selector: '[data-part=col-1]', state: 'visible' } },
  { assert: { selector: '[data-part=col-2]', state: 'visible' } },
  // The ghost half is fixed, so it is the same picture at either width.
  { assert: { selector: '[data-part=ghost-2]', state: 'visible' } },
  { wait: 900 },

  // Back over the floors, and the columns share a row again. The handle travelled with
  // the container's edge, so the drag starts from wherever it is now.
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=aim-wide]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=fluid][data-flow=row]', state: 'visible' } },
  { assert: { selector: '[data-part=col-2]', state: 'visible' } },
  { wait: 700 },
]);
