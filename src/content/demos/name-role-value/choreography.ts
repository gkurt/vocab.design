import { steps } from '#src/stage/choreography.ts';

/**
 * The trio, then one leg knocked out at a time. Each segment reaches its own build and the
 * press reaches the on state, so a pass joined halfway still ends where this one does
 * (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=name][data-state=named]', state: 'visible' } },
  { assert: { selector: '[data-part=value][data-state=off]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=control]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=control][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=value][data-state=on]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-unnamed]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=name][data-state=missing]', state: 'visible' } },
  { assert: { selector: '[data-part=role][data-state=switch]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-case=unnamed]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-roleless]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=role][data-state=button]', state: 'visible' } },
  { assert: { selector: '[data-part=value][data-state=missing]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-state=named]', state: 'visible' } },
  { wait: 1100 },
]);
