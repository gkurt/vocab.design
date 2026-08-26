import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the card to arrive.
  { wait: 550 },
  { assert: { selector: '[data-part=primary][data-zone=london]', state: 'visible' } },
  { assert: { selector: '[data-part=secondary][data-zone=chicago]', state: 'visible' } },
  // The trap the pattern exists to avoid: an abbreviation that names three zones at once.
  { assert: { selector: '[data-part=trap-abbr]', state: 'visible' } },
  { assert: { selector: '[data-part=trap-name]', state: 'visible' } },

  // Whose clock comes first is the reader's to say, and the answer is named, not toggled.
  { moveTo: '[data-part=pick-event]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=times][data-primary=event]', state: 'visible' } },
  { assert: { selector: '[data-part=primary][data-zone=chicago]', state: 'visible' } },
  { assert: { selector: '[data-part=secondary][data-zone=london]', state: 'visible' } },
  { assert: { selector: '[data-part=pick-event][data-selected]', state: 'visible' } },

  // Back the other way, by naming the other clock rather than by flipping this one.
  { moveTo: '[data-part=pick-reader]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=times][data-primary=reader]', state: 'visible' } },
  { assert: { selector: '[data-part=primary][data-zone=london]', state: 'visible' } },
  { wait: 1300 },
]);
