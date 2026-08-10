import { steps } from '#src/stage/choreography.ts';

export default steps([
  // One of three is on at mount, so the parent opens already reporting "some".
  { assert: { selector: '[data-part=select-all][aria-checked="mixed"]', state: 'visible' } },
  { moveTo: '[data-part=opt-invoices]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-invoices][aria-checked="true"]', state: 'visible' } },
  // Two of three: the second answer did not disturb the first, and the parent is
  // still mixed. Independence is the claim, and this is where it is proved.
  { assert: { selector: '[data-part=select-all][aria-checked="mixed"]', state: 'visible' } },
  { moveTo: '[data-part=select-all]' },
  { click: true },
  { wait: 500 },
  // The option nobody touched came along: a mixed parent completes the set.
  { assert: { selector: '[data-part=opt-messages][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=select-all][aria-checked="true"]', state: 'visible' } },
  { wait: 800 },
  // The same control again. Toggling is the term for a checkbox, so the script drives
  // both directions rather than leaving one to the state it happens to find (SPEC §8).
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-contacts][aria-checked="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=select-all][aria-checked="false"]', state: 'visible' } },
  { moveTo: '[data-part=opt-contacts]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-contacts][aria-checked="true"]', state: 'visible' } },
]);
