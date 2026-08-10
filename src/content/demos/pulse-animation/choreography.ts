import { steps } from '#src/stage/choreography.ts';

/**
 * A motion term is watched, not operated. The script's job is to hold still long
 * enough for several cycles to play and then say what a pulse leaves untouched.
 * Nothing is asserted at an edge of the loop: the dot never fades below a third of
 * its opacity, so "visible" is true at every frame rather than at most of them.
 */
export default steps([
  { assert: { selector: '[data-part=dot-mic]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=dot-mic]' },
  { wait: 1800 },
  // A full cycle later the dot is still there, and so is everything around it: a
  // pulse spends its whole loop inside its own box.
  { assert: { selector: '[data-part=dot-mic]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-camera]', state: 'visible' } },
  { assert: { selector: '[data-part=row-screen]', state: 'visible' } },
  { wait: 900 },
]);
