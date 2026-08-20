import { steps } from '#src/stage/choreography.ts';

// The add opens the panel and the panel confirms it; Keep shopping dismisses it, the cart
// icon opens the same panel again, and its close control dismisses it. Each route reaches a
// named state rather than flipping the one it finds (SPEC §8), and the claim that the add
// stuck is mirrored onto the trigger's count, which survives the panel closing.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=cart][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=add]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=add]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=new-line][data-state=added]', state: 'visible' } },
  { assert: { selector: '[data-part=old-line]', state: 'visible' } },
  { assert: { selector: '[data-part=subtotal][data-total="52.00"]', state: 'visible' } },
  { assert: { selector: '[data-part=checkout]', state: 'visible' } },
  { assert: { selector: '[data-part=keep]', state: 'visible' } },
  { assert: { selector: '[data-part=cart][data-count="3"]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=keep]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=cart][data-count="3"]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=cart]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=new-line]', state: 'visible' } },
  { assert: { selector: '[data-part=subtotal][data-total="52.00"]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=add]', state: 'visible' } },
  { wait: 900 },
]);
