import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer and the finish has no second state, so the script is waits
 * and asserts only (SPEC §8). It holds the glossy pair beside the matte one, then the three
 * layers the finish is made of, which is where the hard specular edge is visible as an edge.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=glossy]', state: 'visible' } },
  { assert: { selector: '[data-part=glossy-button]', state: 'visible' } },
  { assert: { selector: '[data-part=glossy-icon]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=matte]', state: 'visible' } },
  { assert: { selector: '[data-part=matte-button]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=anatomy]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-body]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-band]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-all]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
