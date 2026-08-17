import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=token-card][data-surface=light]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-card]', state: 'visible' } },
  { assert: { selector: '[data-part=value-outline]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 700 },
  // Same two cards on a dark surface: the token resolves to a new value, the recipe does not.
  { assert: { selector: '[data-part=token-card][data-surface=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=value-variant]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=token-card][data-surface=light]', state: 'visible' } },
  { assert: { selector: '[data-part=label-token]', state: 'visible' } },
  { wait: 900 },
]);
