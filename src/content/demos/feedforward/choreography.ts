import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the panel to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-2][data-doomed]', state: 'hidden' } },

  // The term itself: the consequence is stated before anything is pressed, and it names
  // the things it would take rather than warning in general.
  { moveTo: '[data-part=delete]' },
  { wait: 500 },
  { assert: { selector: '[data-part=preview]', state: 'visible' } },
  { assert: { selector: '[data-part=no-undo]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2][data-doomed]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=warned]', state: 'visible' } },
  { wait: 900 },

  // Away again, aimed at a line of prose well clear of the panel: nothing was done, so
  // the claim retreats and the rows are ordinary rows again. The claim on the way out is
  // made through the rows that stay, never through the panel that is fading.
  { moveTo: '[data-part=caption]' },
  { wait: 700 },
  { assert: { selector: '[data-part=row-2][data-doomed]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-state=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { wait: 600 },

  // And then the act, which is what makes the statement worth having: exactly the three
  // files the panel named, and the receipt says so.
  { moveTo: '[data-part=delete]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-0]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=done]', state: 'visible' } },
  { wait: 1100 },
]);
