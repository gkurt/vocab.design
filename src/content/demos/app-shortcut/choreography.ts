import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the screen to land.
  { wait: 700 },
  { assert: { selector: '[data-part=screen][data-menu=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },

  // A finger held on an icon: the launcher answers with the app's own entry points, and
  // the list stays up after the press ends, because a long press is not a tap.
  { moveTo: '[data-part=icon-notes]' },
  { wait: 350 },
  { hold: 700 },
  { wait: 450 },
  { assert: { selector: '[data-part=menu][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=menu][data-app=notes]', state: 'visible' } },
  { assert: { selector: '[data-part=item-3]', state: 'visible' } },
  { assert: { selector: '[data-part=screen][data-menu=open]', state: 'visible' } },
  { wait: 800 },

  // Choosing an entry point is the dismissal. The menu goes with it, so the evidence
  // that the app started inside that action is on the readout.
  { moveTo: '[data-part=item-1]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=screen][data-menu=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-ran="notes-1"]', state: 'visible' } },
  { wait: 800 },

  // The same gesture on a different icon draws that app's list, in its own place and at
  // its own length: two items here, so the third slot is not there at all.
  { moveTo: '[data-part=icon-calendar]' },
  { wait: 350 },
  { hold: 700 },
  { wait: 450 },
  { assert: { selector: '[data-part=menu][data-app=calendar]', state: 'visible' } },
  { assert: { selector: '[data-part=item-2]', state: 'visible' } },
  { assert: { selector: '[data-part=item-3]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=item-1]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-ran="calendar-1"]', state: 'visible' } },
  { wait: 700 },
]);
