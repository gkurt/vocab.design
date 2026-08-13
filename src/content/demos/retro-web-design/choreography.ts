import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { assert: { selector: '[data-part=banner]', state: 'visible' } },
  { wait: 700 },
  // A period homepage answers no pointer: the cursor tours the furniture instead.
  { moveTo: '[data-part=banner]' },
  { wait: 800 },
  { moveTo: '[data-part=stripe]' },
  { wait: 800 },
  { moveTo: '[data-part=guestbook]' },
  { wait: 900 },
  { moveTo: '[data-part=counter]' },
  { wait: 800 },
  { moveTo: '[data-part=webring]' },
  { wait: 800 },
  { assert: { selector: '[data-part=stripe]', state: 'visible' } },
  { assert: { selector: '[data-part=guestbook]', state: 'visible' } },
  { assert: { selector: '[data-part=counter]', state: 'visible' } },
  { assert: { selector: '[data-part=webring]', state: 'visible' } },
  { wait: 600 },
]);
