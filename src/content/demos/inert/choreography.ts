import { steps } from '#src/stage/choreography.ts';

/**
 * The same press twice, either side of the attribute. Opening and dismissing are
 * separate controls, so no step depends on the state it happens to find (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=dialog][data-open]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=dialog][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=page][inert]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=page][inert]', state: 'hidden' } },
  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { wait: 1200 },
]);
