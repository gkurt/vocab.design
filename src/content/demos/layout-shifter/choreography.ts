import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the composition waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=promo][data-slot=rail]', state: 'visible' } },
  { assert: { selector: '[data-part=dia-wide]', state: 'visible' } },
  { assert: { selector: '[data-part=main]', state: 'visible' } },
  { wait: 600 },

  // A second composition, not the first one reflowed: the promo becomes a card in a two up row.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=promo][data-slot=card]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-bands=four]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { wait: 800 },

  // A third: five bands, with the promo now above everything it used to sit beside.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=promo][data-slot=band]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-bands=five]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 800 },

  // Back to the widest plan, where the promo is a rail again.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=promo][data-slot=rail]', state: 'visible' } },
  { assert: { selector: '[data-part=dia-narrow]', state: 'visible' } },
  { wait: 700 },
]);
