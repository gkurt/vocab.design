import { steps } from '#src/stage/choreography.ts';

// Both drags end over a row named by part rather than by position, and the order they
// produce is asserted on the list itself, so the pass proves the sequence it rewrote
// rather than that something moved (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=list][data-order="mail-plants-van-bins"]', state: 'visible' } },
  { moveTo: '[data-part=grip-van]' },
  { drag: { to: '[data-part=row-mail]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=list][data-order="van-mail-plants-bins"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-van][data-index="0"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=grip-mail]' },
  { drag: { to: '[data-part=row-bins]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=list][data-order="van-plants-bins-mail"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-mail][data-index="3"]', state: 'visible' } },
  { wait: 1200 },
]);
