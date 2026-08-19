import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The screen fades in from mount, so the first reading waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=fan]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=none]', state: 'visible' } },
  { wait: 400 },

  // One press unfolds the fan. The asserts come after the stagger has finished, so
  // the last action to arrive is judged where it lands rather than mid flight.
  { moveTo: '[data-part=fab]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=fan][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=act-note]', state: 'visible' } },
  { assert: { selector: '[data-part=act-share]', state: 'visible' } },
  { wait: 1000 },

  // Choosing an action is one of the ways back out. The evidence is on the status
  // line in the screen, not inside the fan that just closed.
  { moveTo: '[data-part=do-receipt]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=fan]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=receipt]', state: 'visible' } },
  { wait: 800 },

  // Unfolded again, and left the other way: a press well clear of the fan.
  { moveTo: '[data-part=fab]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=fan][data-open]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=title]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=fan]', state: 'hidden' } },
  { assert: { selector: '[data-part=fab]', state: 'visible' } },
  { wait: 700 },
]);
