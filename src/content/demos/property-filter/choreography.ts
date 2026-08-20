import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 650 },
  { assert: { selector: '[data-part=field][data-step=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=token]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-hits="4"]', state: 'visible' } },
  { wait: 400 },

  // The field says what it knows: the properties it can filter by.
  { moveTo: '[data-part=input]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-state]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-label]', state: 'visible' } },
  { wait: 500 },

  // Typing narrows the properties rather than searching the issues.
  { type: 'sta' },
  { wait: 550 },
  { assert: { selector: '[data-part=opt-state]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-label]', state: 'hidden' } },
  { wait: 500 },

  // Property, then operator, then value: the token is built a piece at a time, and the
  // piece already chosen is shown in the field rather than only in the menu.
  { moveTo: '[data-part=opt-state]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=field][data-step=operator]', state: 'visible' } },
  { assert: { selector: '[data-part=token][data-state=pending]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-eq]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=opt-eq]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=field][data-step=value]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-open]', state: 'visible' } },
  { wait: 500 },

  // The finished triple lands in the field as a token, and the list obeys it.
  { moveTo: '[data-part=opt-open]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=token][data-state=committed]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-hits="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r3]', state: 'hidden' } },
  { wait: 800 },

  // Free text is still allowed after the token, and it narrows what the token left.
  { moveTo: '[data-part=input]' },
  { wait: 300 },
  { type: 'harbour' },
  { wait: 650 },
  { assert: { selector: '[data-part=field][data-free=harbour]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-hits="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r2]', state: 'hidden' } },
  { wait: 800 },

  // Removing the condition leaves the free text standing, which is what makes the
  // token a part of the query rather than the whole of it.
  { moveTo: '[data-part=token-remove]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=token]', state: 'hidden' } },
  { assert: { selector: '[data-part=field][data-free=harbour]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-hits="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r3]', state: 'visible' } },
  { assert: { selector: '[data-part=row-r2]', state: 'hidden' } },
  { wait: 800 },
]);
