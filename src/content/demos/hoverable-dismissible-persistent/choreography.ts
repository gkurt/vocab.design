import { steps } from '#src/stage/choreography.ts';

/**
 * The compliant panel first: hover the term, travel onto the panel's own button (which is the
 * hoverable condition being proved, not decoration), then Escape, which is the dismissible one.
 * Then each failure, one condition at a time. The dismissal is asserted on the trigger's
 * mirrored state as well as on the panel, since the panel is what the key just took away.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=flyout]', state: 'hidden' } },
  { assert: { selector: '[data-part=cond-hoverable][data-met=yes]', state: 'visible' } },
  { moveTo: '[data-part=trigger]' },
  { wait: 600 },
  { assert: { selector: '[data-part=flyout][data-mode=compliant]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=flyout-link]' },
  { wait: 600 },
  { assert: { selector: '[data-part=flyout]', state: 'visible' } },
  { wait: 800 },
  { press: 'Escape' },
  { wait: 500 },
  { assert: { selector: '[data-part=flyout]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-closed=escape]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-timed]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=cond-persistent][data-met=no]', state: 'visible' } },
  { moveTo: '[data-part=trigger]' },
  { wait: 600 },
  { assert: { selector: '[data-part=flyout][data-mode=timed]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=flyout]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-closed=timer]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-gap]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=cond-hoverable][data-met=no]', state: 'visible' } },
  { moveTo: '[data-part=trigger]' },
  { wait: 600 },
  { assert: { selector: '[data-part=flyout][data-mode=gap]', state: 'visible' } },
  { wait: 600 },
  // The same travel that proved hoverable a moment ago, with nothing bridging the gap.
  { moveTo: '[data-part=flyout-link]' },
  { wait: 600 },
  { assert: { selector: '[data-part=flyout]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-closed=left]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-compliant]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=cond-hoverable][data-met=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=flyout][data-mode=compliant]', state: 'hidden' } },
  { wait: 800 },
]);
