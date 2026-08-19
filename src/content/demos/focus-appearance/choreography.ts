import { steps } from '#src/stage/choreography.ts';

/**
 * The compliant ring first, then the two ways an indicator fails: too thin and too pale, and
 * a recolour that adds no area. Each segment reaches its own treatment rather than toggling
 * (SPEC §8), and every claim is made about the ring element in that state rather than about a
 * failing ring being absent, since a failing indicator is still drawn.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=ring][data-treatment=solid]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-treatment=solid]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-thin]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ring][data-treatment=thin]', state: 'visible' } },
  { assert: { selector: '[data-part=thickness][data-treatment=thin]', state: 'visible' } },
  { assert: { selector: '[data-part=change][data-treatment=thin]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-recolour]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ring][data-treatment=recolour]', state: 'visible' } },
  { assert: { selector: '[data-part=thickness][data-treatment=recolour]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-treatment=recolour]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-solid]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ring][data-treatment=solid]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-treatment=solid]', state: 'visible' } },
  { wait: 900 },
]);
