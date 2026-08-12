import { steps } from '#src/stage/choreography.ts';

/**
 * Two saves, one announced and one not. Both are one-way, so a pass joined at any point
 * still ends with the same two slots filled.
 */
export default steps([
  // Empty and roomed, which is the state a reader's software has to be watching.
  { assert: { selector: '[data-part=status]', state: 'hidden' } },
  { assert: { selector: '[data-part=heard][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=save-good]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=status]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=save-bad]' },
  { click: true },
  { wait: 500 },
  // The same word appears, and this time the reader line says nothing was said.
  { assert: { selector: '[data-part=ghost-status]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=silent]', state: 'visible' } },
  { wait: 1200 },
]);
