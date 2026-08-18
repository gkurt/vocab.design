import { steps } from '#src/stage/choreography.ts';

/**
 * A hero image answers no pointer, so the script is a tour: the cursor reads the type layout,
 * crosses the render to hold its lighting on stage, and finishes on the one thing in the scene
 * that is actually a control. The opening wait lets the mount fade land first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=object]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=headline]' },
  { wait: 800 },
  { assert: { selector: '[data-part=eyebrow]', state: 'visible' } },
  { moveTo: '[data-part=render]' },
  { wait: 900 },
  { assert: { selector: '[data-part=specular]', state: 'visible' } },
  { assert: { selector: '[data-part=chrome]', state: 'visible' } },
  { assert: { selector: '[data-part=glow]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=cta]' },
  { wait: 800 },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
