import { steps } from '#src/stage/choreography.ts';

/**
 * One theme, then another the author never picked either. Each segment names its theme
 * outright, so a pass joined halfway is still in a stated state (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=forced][data-theme=night]', state: 'visible' } },
  { assert: { selector: '[data-part=forced-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=forced-primary]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-desert]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=forced][data-theme=desert]', state: 'visible' } },
  { assert: { selector: '[data-part=forced-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=mapping]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-night]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=forced][data-theme=night]', state: 'visible' } },
  { wait: 900 },
]);
