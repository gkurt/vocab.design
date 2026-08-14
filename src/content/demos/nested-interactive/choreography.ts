import { steps } from '#src/stage/choreography.ts';

/**
 * Tab down the two cards, then press Save on each. On the nested card the press reaches
 * the link as well, which is the term; on the card-action version it does not, and the
 * stretched link still opens the tour from anywhere else in the card.
 */
export default steps([
  { assert: { selector: '[data-part=card-nested]', state: 'visible' } },
  { assert: { selector: '[data-part=save-nested]', state: 'visible' } },
  { assert: { selector: '[data-part=announced][data-state=swallowed]', state: 'visible' } },
  { assert: { selector: '[data-part=card-nested][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=save-nested][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=announced][data-state=inner]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=save-nested]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-state=hijacked]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=nested]', state: 'visible' } },
  { wait: 1200 },
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=link-fixed][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=announced][data-state=link]', state: 'visible' } },
  { wait: 600 },
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=save-fixed][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=announced][data-state=button]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=save-fixed]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-state=saved]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=fixed]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=stretch]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-state=opened]', state: 'visible' } },
  { wait: 900 },
]);
