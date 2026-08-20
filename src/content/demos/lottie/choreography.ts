import { steps } from '#src/stage/choreography.ts';

// Three absolute scales and two plays. The scale segments prove the claim (the bitmap is stretched,
// the paths are redrawn), and Replay proves both marks carry the same motion. The shake runs 1150 ms,
// so the mid-play claim lands well inside it and the settled claims are made half a second after it
// stopped (SPEC §8). `data-plays` is quoted because an unquoted value starting with a digit is not a
// valid CSS identifier (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-scale=x2]', state: 'visible' } },
  { assert: { selector: '[data-part=raster]', state: 'visible' } },
  { assert: { selector: '[data-part=vector][data-state=settled][data-plays="0"]', state: 'visible' } },

  // Three times the export size: the bitmap has no more detail to give.
  { moveTo: '[data-part=seg-x3]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-scale=x3]', state: 'visible' } },
  { assert: { selector: '[data-part=say]', state: 'visible' } },

  { moveTo: '[data-part=replay]' },
  { click: true },
  // Judged while the shake is still running: both panes are playing the one motion.
  { assert: { selector: '[data-part=vector][data-state=playing][data-plays="1"]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=vector][data-state=settled][data-plays="1"]', state: 'visible' } },
  { wait: 500 },

  // Back to the size it was exported at, where the two panes agree.
  { moveTo: '[data-part=seg-x1]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-scale=x1]', state: 'visible' } },
  { assert: { selector: '[data-part=vector]', state: 'visible' } },

  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 1500 },
  { assert: { selector: '[data-part=vector][data-state=settled][data-plays="2"]', state: 'visible' } },

  { moveTo: '[data-part=seg-x3]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-scale=x3]', state: 'visible' } },
  { wait: 600 },
]);
