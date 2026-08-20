import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The console, with nothing over it yet.
  { wait: 700 },
  { assert: { selector: '[data-part=open]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-service][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=sheet-key][data-open]', state: 'hidden' } },
  { wait: 300 },

  // The flow rises from the bottom edge and stops short of the top.
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sheet-service][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-service][data-step="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=step-1]', state: 'visible' } },
  { assert: { selector: '[data-part=step-2]', state: 'hidden' } },
  { wait: 600 },

  // Step two, inside the same sheet: the header and the footer hold still.
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet-service][data-step="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=step-2]', state: 'visible' } },
  { assert: { selector: '[data-part=step-1]', state: 'hidden' } },
  { wait: 500 },

  // The stack: a second tearsheet over the first, which stays on stage above it.
  { moveTo: '[data-part=add-key]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sheet-key][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-service][data-open]', state: 'visible' } },
  { wait: 700 },

  // Dismissed explicitly, one level at a time, back to the flow that was waiting.
  { moveTo: '[data-part=key-cancel]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sheet-key][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=sheet-service][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=step-2]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=service-cancel]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=sheet-service][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=open]', state: 'visible' } },
  { wait: 600 },
]);
