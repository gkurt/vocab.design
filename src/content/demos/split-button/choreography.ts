import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=main]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=status][data-action=save]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=arrow]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow][aria-expanded="true"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=item-copy]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-action=copy]', state: 'visible' } },
  { wait: 900 },
]);
