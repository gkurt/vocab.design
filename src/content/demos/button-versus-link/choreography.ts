import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=action]', state: 'visible' } },
  { moveTo: '[data-part=action]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=status][data-state=sent]', state: 'visible' } },
  // The button acted, and the page the reader is on is still the same page.
  { assert: { selector: '[data-part=address][data-page=list]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=destination]' },
  { wait: 500 },
  // Hovering a link says where it goes before it is pressed.
  { assert: { selector: '[data-part=peek]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=address][data-page=invoice]', state: 'visible' } },
  { assert: { selector: '[data-part=outcome][data-event=navigated]', state: 'visible' } },
  { wait: 900 },
]);
