import { steps } from '#src/stage/choreography.ts';

/**
 * Adding is idempotent in the sense the player needs: every press adds, none undoes,
 * so a run resumed anywhere still lands on a region carrying a message.
 */
export default steps([
  // The region ships empty, so there is nothing to see until it is written into.
  { assert: { selector: '[data-part=status][data-state=idle]', state: 'hidden' } },
  { moveTo: '[data-part=add-espresso]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=status][data-state=updated]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=add-filter]' },
  { click: true },
  { wait: 1200 },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { wait: 1200 },
]);
