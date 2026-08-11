import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=item-archive]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-action=archive]', state: 'visible' } },
  { wait: 900 },
]);
