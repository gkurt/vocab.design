import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=composer][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=send][aria-disabled="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=sent]', state: 'hidden' } },
  { moveTo: '[data-part=prompt]' },
  { click: true },
  { type: 'Summarise the survey notes and list the three biggest risks' },
  { wait: 500 },
  // The box has grown with the request, and send has something to send.
  { assert: { selector: '[data-part=composer][data-state=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=send][aria-disabled="false"]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=send]' },
  { wait: 350 },
  { click: true },
  { wait: 500 },
  // Sent: the request joins the transcript and the composer is empty and quiet again.
  { assert: { selector: '[data-part=sent]', state: 'visible' } },
  { assert: { selector: '[data-part=composer][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=send][aria-disabled="true"]', state: 'visible' } },
  { wait: 1400 },
]);
