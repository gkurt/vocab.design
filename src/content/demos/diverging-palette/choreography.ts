import { steps } from '#src/stage/choreography.ts';

/**
 * The honest scale, the neutral dragged to +4, then back. Each segment names the value the
 * join sits on outright, so a pass picked up anywhere lands in a stated state (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=scale][data-centre=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-at="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=chart]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-offset]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=scale][data-centre=offset]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-at="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-centre=offset]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-zero]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=scale][data-centre=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-at="0"]', state: 'visible' } },
  { wait: 900 },
]);
