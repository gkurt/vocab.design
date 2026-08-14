import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=thrash]', state: 'visible' } },
  // Run names a pass rather than toggling one, so a resumed script lands where it said.
  { moveTo: '[data-part=run]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=running]', state: 'visible' } },
  // The batched pass has spent its single layout by 450 ms and holds that count for the
  // rest of the run, while the interleaved one is still climbing.
  { wait: 500 },
  { assert: { selector: '[data-part=count-batched][data-count="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-state=running]', state: 'visible' } },
  // Six iterations at 260 ms, then the settle: comfortably past the end of the pass.
  { wait: 1500 },
  { assert: { selector: '[data-part=scene][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=count-thrash][data-count="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=count-batched][data-count="1"]', state: 'visible' } },
  { wait: 600 },
]);
