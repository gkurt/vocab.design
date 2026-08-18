import { steps } from '#src/stage/choreography.ts';

// Characters land one at a time, which is what makes the filter demonstrable: the menu
// opens on the slash, narrows on `h`, and settles on one entry at `he`. Enter runs it, and
// the proof is on both sides at once: a block arrived and the letters that named it are
// gone. The menu is opened by the trigger and left by a choice or by Escape, so no step
// here flips a state it found (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=block]', state: 'hidden' } },
  { moveTo: '[data-part=editor]' },
  { click: true },
  { wait: 300 },
  { type: '/' },
  { wait: 450 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-divider]', state: 'visible' } },
  { wait: 500 },
  { type: 'h' },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-highlight]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-todo]', state: 'hidden' } },
  { assert: { selector: '[data-part=opt-divider]', state: 'hidden' } },
  { wait: 450 },
  { type: 'e' },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-heading][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-highlight]', state: 'hidden' } },
  { wait: 700 },
  { press: 'Enter' },
  { wait: 700 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { assert: { selector: '[data-part=composer][data-ran=heading]', state: 'visible' } },
  { wait: 1500 },
  // Opened again and dismissed the other way: the menu leaves, the writing stays.
  { type: '/' },
  { wait: 450 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { wait: 800 },
  { press: 'Escape' },
  { wait: 600 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { wait: 900 },
]);
