import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=phone-field][data-state=empty]', state: 'visible' } },
  // The shape is on screen before a character is typed.
  { assert: { selector: '[data-part=phone-ghost]', state: 'visible' } },
  { assert: { selector: '[data-part=card-field][data-value="4242 4242 42"]', state: 'visible' } },
  { moveTo: '[data-part=phone]' },
  { click: true },
  { type: '5551234567' },
  { wait: 600 },
  // Ten digits went in; the brackets, the space and the hyphen came from the field.
  { assert: { selector: '[data-part=phone-field][data-state=complete]', state: 'visible' } },
  { assert: { selector: '[data-part=phone-field][data-value="(555) 123-4567"]', state: 'visible' } },
  { wait: 1400 },
]);
