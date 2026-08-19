import { steps } from '#src/stage/choreography.ts';

/**
 * The consistent site first: three pages, one place. Then the same three pages with the help
 * route wandering, so the control that never moved is seen moving twice. Every segment reaches
 * its own page or policy rather than toggling one (SPEC §8), and the claims are made about the
 * control's own slot, which is the thing the criterion measures.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=help][data-where=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-policy=consistent]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-plans]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=title][data-page=plans]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-where=bar]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-cart]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=title][data-page=cart]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-where=bar]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-wandering]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=verdict][data-policy=wandering]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-where=float]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-home]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=help][data-where=bar]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-plans]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=help][data-where=footer]', state: 'visible' } },
  { assert: { selector: '[data-part=sits][data-slot=footer]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-cart]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=help][data-where=float]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-consistent]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=help][data-where=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-policy=consistent]', state: 'visible' } },
  { wait: 900 },
]);
