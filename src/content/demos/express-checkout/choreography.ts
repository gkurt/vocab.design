import { steps } from '#src/stage/choreography.ts';

// A wallet raises the sheet, the sheet is read for the three things it already knows, and
// Cancel puts it away again, which is the state the specimen mounts in. The wallet row is
// checked at every stop, since the claim is that the row is above the form rather than in
// it (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=wallets]', state: 'visible' } },
  { assert: { selector: '[data-part=form]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=wallet-kestrel]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sheet][data-wallet=kestrel]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-address]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-card]', state: 'visible' } },
  { assert: { selector: '[data-part=wallets]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=sheet-close]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { assert: { selector: '[data-part=wallets]', state: 'visible' } },
  { assert: { selector: '[data-part=form]', state: 'visible' } },
  { wait: 900 },
]);
