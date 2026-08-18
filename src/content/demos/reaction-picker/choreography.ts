import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The thread fades in from mount, so the first reading waits for it to land. One
  // reaction is already on the message, from somebody who is not the reader.
  { wait: 700 },
  { assert: { selector: '[data-part=chip-thumb][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=picker][data-open]', state: 'hidden' } },
  { wait: 400 },

  // The trigger opens the picker.
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-open]', state: 'visible' } },
  { wait: 700 },

  // Dismissal is explicit: Escape closes it without choosing anything.
  { press: 'Escape' },
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=chip-party][data-count="1"]', state: 'hidden' } },
  { wait: 600 },

  // Open it again and answer the message with one emoji.
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-open]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=pick-party]' },
  { click: true },
  { wait: 600 },
  // Choosing dismisses the picker; the evidence is on the message, not inside the popup.
  { assert: { selector: '[data-part=picker][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=chip-party][data-count="1"]', state: 'visible' } },

  // A second reader joins the same reaction, which is what makes it a count.
  { wait: 1800 },
  { assert: { selector: '[data-part=chip-party][data-count="2"]', state: 'visible' } },
  { wait: 900 },
]);
