import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the anchored box is below its anchor, and nothing has had to fall back.
  { assert: { selector: '[data-part=scene][data-place=block-end]', state: 'visible' } },
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-above]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-above][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-place=block-start]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-beside]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scene][data-place=inline-end]', state: 'visible' } },
  { wait: 700 },
  // Near the corner the requested placement would overflow, so the fallback resolves
  // the box to the other side of its anchor and the request is drawn as a ghost.
  { moveTo: '[data-part=seg-edge]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-place=fallback]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost]', state: 'visible' } },
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names a placement, so the way back is a placement too.
  { moveTo: '[data-part=seg-below]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scene][data-place=block-end]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost]', state: 'hidden' } },
  { wait: 700 },
]);
