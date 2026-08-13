import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount is the block period itself, so the script opens by waiting it out:
  // the file lands and the words that were always there finally paint.
  { wait: 1800 },
  { assert: { selector: '[data-part=sample][data-phase=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 350 },
  // Back in the blank period: the box still holds its room and the text is gone.
  { assert: { selector: '[data-part=sample][data-phase=waiting]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'hidden' } },
  { assert: { selector: '[data-part=body]', state: 'hidden' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 900 },
]);
