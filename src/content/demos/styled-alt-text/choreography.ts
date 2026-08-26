import { steps } from '#src/stage/choreography.ts';

/**
 * Mount is the state the technique exists for, so the pass opens on the claim and
 * then shows what the fallbacks were standing in for. Each segment names an absolute
 * client setting, so a pass joined halfway lands somewhere true (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=styled][data-state=blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=plain][data-state=blocked]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-loaded]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=styled][data-state=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=plain][data-state=loaded]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-blocked]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=styled][data-state=blocked]', state: 'visible' } },
  { wait: 900 },
]);
