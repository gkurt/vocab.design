import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The table is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=table][data-size="body"]', state: 'visible' } },
  // At body size the two columns part company in both directions.
  { assert: { selector: '[data-part=row-grey][data-wcag="pass"][data-apca="fail"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-white][data-wcag="fail"][data-apca="pass"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-ink][data-wcag="pass"][data-apca="pass"]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names one text setting outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-large]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=table][data-size="large"]', state: 'visible' } },
  // Bigger, bolder text lowers what APCA asks for, and the grey row clears it.
  { assert: { selector: '[data-part=row-grey][data-apca="pass"]', state: 'visible' } },
  // Mid grey on black still fails, at any size: WCAG 2 rates it AAA.
  { assert: { selector: '[data-part=row-thin][data-wcag="pass"][data-apca="fail"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-body]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=table][data-size="body"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-grey][data-apca="fail"]', state: 'visible' } },
  { wait: 900 },
]);
