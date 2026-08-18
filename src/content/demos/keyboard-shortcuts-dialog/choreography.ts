import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the ledger waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { wait: 600 },

  // The discovery path is the component: the key named in the status bar opens the list.
  { press: '?' },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { assert: { selector: '[data-part=group-editing]', state: 'visible' } },
  { assert: { selector: '[data-part=row-palette]', state: 'visible' } },
  { assert: { selector: '[data-part=row-help]', state: 'visible' } },
  { wait: 1600 },

  // Escape is one of the two explicit dismissals; the key itself never closes it.
  { press: 'Escape' },
  { wait: 550 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { wait: 700 },

  { press: '?' },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { assert: { selector: '[data-part=close]', state: 'visible' } },
  { wait: 900 },

  // The other dismissal, for a reader who arrived here with a pointer.
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { wait: 700 },
]);
