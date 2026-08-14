import { steps } from '#src/stage/choreography.ts';

// Three fixed points in the field, each an absolute state of the mapping: the near
// corner comes forward at two opposite corners, and the centre is the one place where
// both rotations are zero.
export default steps([
  { assert: { selector: '[data-part=card][data-tilt=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=sheen]', state: 'hidden' } },
  { moveTo: '[data-part=top-left]' },
  { wait: 650 },
  { assert: { selector: '[data-part=card][data-tilt=top-left]', state: 'visible' } },
  { assert: { selector: '[data-part=sheen]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=bottom-right]' },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-tilt=bottom-right]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=centre]' },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-tilt=flat]', state: 'visible' } },
  { wait: 900 },
]);
