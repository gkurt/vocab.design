import { steps } from '#src/stage/choreography.ts';

/**
 * The boundary at 18 point, then at 14 point bold, with the 20 px line changing its verdict on
 * the same two colours. Each segment reaches its own weight rather than toggling one (SPEC §8),
 * and every claim is given room after the line has finished moving.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=threshold][data-weight=regular]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict-20][data-pass=no]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict-26][data-pass=yes]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-bold]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=threshold][data-weight=bold]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict-20][data-pass=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict-16][data-pass=no]', state: 'visible' } },
  { assert: { selector: '[data-part=starts][data-weight=bold]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-regular]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=threshold][data-weight=regular]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict-20][data-pass=no]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict-26][data-pass=yes]', state: 'visible' } },
  { wait: 1100 },
]);
