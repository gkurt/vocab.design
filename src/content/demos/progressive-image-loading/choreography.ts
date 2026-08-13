import { steps } from '#src/stage/choreography.ts';

// The stand-in is on screen from the first frame and the file is not; the swap is
// what the pass proves. Each control reaches a state rather than flipping one: a
// placeholder pick reloads with that stand-in, and Reload reloads with whichever is
// current (SPEC §8). Every claim is given room for the cross-fade to finish first.
export default steps([
  { assert: { selector: '[data-part=slot][data-phase=placeholder]', state: 'visible' } },
  { assert: { selector: '[data-part=stand-in]', state: 'visible' } },
  { assert: { selector: '[data-part=full]', state: 'hidden' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=slot][data-phase=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=full]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=kind-colour]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-kind=colour][data-phase=placeholder]', state: 'visible' } },
  { assert: { selector: '[data-part=full]', state: 'hidden' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=slot][data-phase=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=full]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=reload]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-kind=colour][data-phase=placeholder]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=slot][data-phase=loaded]', state: 'visible' } },
  { wait: 1000 },
]);
