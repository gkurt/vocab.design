import { steps } from '#src/stage/choreography.ts';

// Both passes run once at mount, six iterations at 260 ms plus the lead and the settle. The
// opening wait outlasts that, so Run is pressed with every bar standing and no bar is dropped
// back to zero mid-climb (SPEC §8).
export default steps([
  { wait: 2200 },
  { assert: { selector: '[data-part=scene][data-state=settled]', state: 'visible' } },
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
