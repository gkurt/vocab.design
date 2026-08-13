import { steps } from '#src/stage/choreography.ts';

/**
 * The forced sequence walked to its end, where the site search above the form turns out to be
 * the last stop, then the same page with every control at tabindex 0. Stepping clamps at the
 * last stop and each segment reaches its own build, so a pass joined halfway still ends where
 * a whole one does (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=form][data-mode=forced]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-email][data-sim-focus]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-phone][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-email][data-sim-focus]', state: 'hidden' } },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-name][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-search][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=line-search][data-current]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-source]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=form][data-mode=source]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-search][data-sim-focus]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-name][data-sim-focus]', state: 'visible' } },
  { wait: 1000 },
]);
