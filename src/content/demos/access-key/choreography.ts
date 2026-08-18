import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=app][data-armed=no]', state: 'visible' } },
  { assert: { selector: '[data-part=menu-file]', state: 'hidden' } },
  { moveTo: '[data-part=doc]' },
  { wait: 400 },
  // Nothing armed: the letter is just a letter, and it lands in the document.
  { press: 'f' },
  { wait: 500 },
  { assert: { selector: '[data-part=app][data-typed=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=menu-file]', state: 'hidden' } },
  { wait: 900 },
  // The modifier arms the mode, which is the moment every mnemonic is drawn.
  { press: 'Alt' },
  { wait: 500 },
  { assert: { selector: '[data-part=app][data-armed=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=mn-file][data-shown]', state: 'visible' } },
  { wait: 900 },
  // The same letter now reaches the menu whose label it was taken from.
  { press: 'f' },
  { wait: 500 },
  { assert: { selector: '[data-part=menu-file][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=title-file][data-open]', state: 'visible' } },
  { wait: 1000 },
  // Inside the menu a bare letter runs the item and the menu goes with it, so the claim is
  // read off the window rather than off the surface the keystroke just closed.
  { press: 'n' },
  { wait: 500 },
  { assert: { selector: '[data-part=app][data-ran="new"]', state: 'visible' } },
  { assert: { selector: '[data-part=app][data-armed=no]', state: 'visible' } },
  { assert: { selector: '[data-part=menu-file]', state: 'hidden' } },
  { wait: 1200 },
]);
