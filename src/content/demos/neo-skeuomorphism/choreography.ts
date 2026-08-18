import { steps } from '#src/stage/choreography.ts';

/**
 * Three widgets set side by side answer no pointer, so the script is a tour: the cursor
 * crosses the flat copy, the neumorphic one, then the parts of the neo-skeuomorphic copy that
 * carry the material (the brushed faceplate's sheen, the glossy tile, the knurled dial),
 * while the asserts hold each reading on stage. The opening wait lets the mount fade finish
 * before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=widget-neo]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=widget-flat]' },
  { wait: 850 },
  { assert: { selector: '[data-part=flat-play]', state: 'visible' } },
  { assert: { selector: '[data-part=flat-track]', state: 'visible' } },
  { moveTo: '[data-part=widget-neu]' },
  { wait: 850 },
  { assert: { selector: '[data-part=neu-play]', state: 'visible' } },
  { assert: { selector: '[data-part=neu-art]', state: 'visible' } },
  { moveTo: '[data-part=neo-dial]' },
  { wait: 850 },
  { assert: { selector: '[data-part=neo-dial]', state: 'visible' } },
  { assert: { selector: '[data-part=neo-sheen]', state: 'visible' } },
  { assert: { selector: '[data-part=neo-art]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
