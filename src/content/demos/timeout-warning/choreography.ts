import { steps } from '#src/stage/choreography.ts';

/**
 * Idle time is the one beat that cannot be watched, so the script jumps it with the
 * labelled instrument and then lets the warning run in real seconds.
 */
export default steps([
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=session][data-zone=ok]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=skip]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { assert: { selector: '[data-part=session][data-zone=warn]', state: 'visible' } },
  // Long enough to watch the last minute actually run down inside the dialog.
  { wait: 2400 },
  { moveTo: '[data-part=extend]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=session][data-zone=ok]', state: 'visible' } },
  { wait: 1100 },
]);
