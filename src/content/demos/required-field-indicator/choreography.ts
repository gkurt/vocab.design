import { steps } from '#src/stage/choreography.ts';

/**
 * The mark, then what it was promising, then the same form under the other convention.
 * Each segment reaches its own state, and submitting is one way, so a pass joined
 * anywhere still tells the truth about where it is (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=form][data-convention=required]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-email]', state: 'visible' } },
  { assert: { selector: '[data-part=error]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=submit]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=error]', state: 'visible' } },
  { assert: { selector: '[data-part=email][aria-invalid="true"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-optional]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=form][data-convention=optional]', state: 'visible' } },
  // The asterisks are gone and the one optional field says so instead.
  { assert: { selector: '[data-part=mark-email]', state: 'hidden' } },
  { assert: { selector: '[data-part=mark-company]', state: 'visible' } },
  { wait: 1200 },
]);
