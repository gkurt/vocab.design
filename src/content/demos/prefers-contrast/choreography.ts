import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card][data-contrast=normal]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-more]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-contrast=more]', state: 'visible' } },
  // The card is the same card: the stronger rendering changes colour, not layout.
  { assert: { selector: '[data-part=change]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-normal]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-contrast=normal]', state: 'visible' } },
  { wait: 800 },
]);
