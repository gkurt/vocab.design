import { steps } from '#src/stage/choreography.ts';

/**
 * Move to settings and the tab says so; two messages land while the reader is there and the
 * count joins the title; opening the inbox reads them and the count leaves. The wait before
 * the arrival is load-bearing, so it is followed by the assert that proves it (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=tab-title][data-page=inbox]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-title][data-unread]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=nav-settings]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tab-title][data-page=settings]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=tab-title][data-unread]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-inbox]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=nav-inbox]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tab-title][data-page=inbox]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-title][data-unread]', state: 'hidden' } },
  { assert: { selector: '[data-part=badge-inbox]', state: 'hidden' } },
  { wait: 900 },
]);
