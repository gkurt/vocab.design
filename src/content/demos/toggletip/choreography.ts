import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=info-button]' },
  // Long enough that a tooltip would already have shown: hover is exactly what a
  // toggletip does not answer, which is the whole reason it can hold a link.
  { wait: 800 },
  { assert: { selector: '[data-part=tip]', state: 'hidden' } },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=tip]', state: 'visible' } },
  { wait: 1600 },
  // Dismissal is the same control again: the toggling is the term, so the script
  // drives both directions rather than leaving one to the state it happens to find.
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=tip]', state: 'hidden' } },
]);
