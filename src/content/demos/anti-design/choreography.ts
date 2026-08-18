import { steps } from '#src/stage/choreography.ts';

/**
 * A card answers no pointer, so the script is a tour: the cursor crosses the house-style
 * copy, then the stretched photograph, the overlapping price and the raw system control on
 * the anti-design copy, while the asserts hold each part of the break on stage. The opening
 * wait lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=card-anti]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=card-house]' },
  { wait: 850 },
  { assert: { selector: '[data-part=house-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=house-photo]', state: 'visible' } },
  { moveTo: '[data-part=anti-photo]' },
  { wait: 850 },
  { assert: { selector: '[data-part=anti-price]', state: 'visible' } },
  { moveTo: '[data-part=anti-button]' },
  { wait: 850 },
  { assert: { selector: '[data-part=anti-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=anti-sub]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
