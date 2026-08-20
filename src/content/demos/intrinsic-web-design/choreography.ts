import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the tracks waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=item-b][data-fit=fits]', state: 'visible' } },
  { assert: { selector: '[data-part=item-a][data-fit=fits]', state: 'visible' } },
  { assert: { selector: '[data-part=skeleton]', state: 'visible' } },
  { wait: 700 },

  // The same content poured into a fixed skeleton: one item cut, one stretched.
  { moveTo: '[data-part=seg-extrinsic]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=item-b][data-fit=cut]', state: 'visible' } },
  { assert: { selector: '[data-part=item-a][data-fit=stretched]', state: 'visible' } },
  { assert: { selector: '[data-part=val-name]', state: 'visible' } },
  { wait: 900 },

  // Content out again: the file name fits whole and the short item stops pretending to be wide.
  { moveTo: '[data-part=seg-intrinsic]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=item-b][data-fit=fits]', state: 'visible' } },
  { assert: { selector: '[data-part=item-a][data-fit=fits]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 700 },
]);
