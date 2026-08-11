import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card][data-in=backlog]', state: 'visible' } },
  { assert: { selector: '[data-part=doing-empty]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  // Absolute destination: the card lands in Doing whatever column the pass found it in.
  { drag: { to: '[data-part=zone-doing]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-in=doing]', state: 'visible' } },
  { assert: { selector: '[data-part=doing-empty]', state: 'hidden' } },
  // Released, so the destination stops advertising that it would take anything.
  { assert: { selector: '[data-part=zone-doing][data-active]', state: 'hidden' } },
  { wait: 1400 },
]);
