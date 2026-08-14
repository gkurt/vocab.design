import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=device][data-state=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=alert][data-open]', state: 'hidden' } },
  // A shake cannot be synthesized, so the labelled control stands in for the gesture.
  { moveTo: '[data-part=sim]' },
  { wait: 400 },
  { click: true },
  // The rattle runs 620 ms and the alert follows it, so the claim is made well clear of both.
  { wait: 1400 },
  { assert: { selector: '[data-part=alert][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-state=alerting]', state: 'visible' } },
  { wait: 700 },
  // Cancel first: an accidental shake costs the reader nothing.
  { moveTo: '[data-part=cancel]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=alert][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-mode=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-undone]', state: 'hidden' } },
  { assert: { selector: '[data-part=last-line]', state: 'visible' } },
  { wait: 800 },
  // The deliberate one, which is the same gesture reaching the same alert.
  { moveTo: '[data-part=sim]' },
  { wait: 400 },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=alert][data-open]', state: 'visible' } },
  { moveTo: '[data-part=undo]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  // The evidence is on the note, not inside the alert the click has just closed.
  { assert: { selector: '[data-part=note][data-undone]', state: 'visible' } },
  { assert: { selector: '[data-part=last-line]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-mode=undone]', state: 'visible' } },
  { wait: 1200 },
]);
