import { steps } from '#src/stage/choreography.ts';

/**
 * The descriptive wording first, then the same three results with the words moved out of the
 * links, then back. Each segment reaches its own wording rather than flipping the other's, so
 * a pass joined halfway still ends where a whole one does (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=results][data-mode=descriptive]', state: 'visible' } },
  { assert: { selector: '[data-part=link-1][data-state=descriptive]', state: 'visible' } },
  { assert: { selector: '[data-part=readout-link-3][data-state=descriptive]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-vague]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-mode=vague]', state: 'visible' } },
  { assert: { selector: '[data-part=link-1][data-state=vague]', state: 'visible' } },
  { assert: { selector: '[data-part=readout-link-1][data-state=vague]', state: 'visible' } },
  { assert: { selector: '[data-part=readout-link-3][data-state=vague]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-descriptive]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-mode=descriptive]', state: 'visible' } },
  { assert: { selector: '[data-part=link-3][data-state=descriptive]', state: 'visible' } },
  { wait: 1000 },
]);
