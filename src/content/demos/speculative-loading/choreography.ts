import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=covered-mark][data-state=idle]', state: 'visible' } },
  // The hover is the rule's trigger: dwelling here spends the guess.
  { moveTo: '[data-part=covered]' },
  { wait: 1300 },
  { assert: { selector: '[data-part=covered-mark][data-state=ready]', state: 'visible' } },
  { click: true },
  { assert: { selector: '[data-part=screen][data-state=instant]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { assert: { selector: '[data-part=screen][data-state=index]', state: 'visible' } },
  { wait: 500 },
  // The same click on the link no rule covers, and the wait it still costs.
  { moveTo: '[data-part=plain]' },
  { click: true },
  { assert: { selector: '[data-part=screen][data-state=waiting]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=screen][data-state=arrived]', state: 'visible' } },
  { wait: 800 },
]);
