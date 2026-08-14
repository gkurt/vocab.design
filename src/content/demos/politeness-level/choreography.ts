import { steps } from '#src/stage/choreography.ts';

/**
 * The polite update first, which parks behind the sentence in progress, then the assertive
 * one, which cuts the sentence off and leaves its unread tail dashed. Each button reaches its
 * own state, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=regions][data-level=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=spoken]', state: 'hidden' } },
  { assert: { selector: '[data-part=lost]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=fire-polite]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=regions][data-level=polite]', state: 'visible' } },
  { assert: { selector: '[data-part=msg-polite][data-state=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=msg-assertive][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=lost]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-level=polite]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=fire-assertive]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=regions][data-level=assertive]', state: 'visible' } },
  { assert: { selector: '[data-part=msg-assertive][data-state=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=msg-polite][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=lost]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-level=assertive]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=fire-polite]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=lost]', state: 'hidden' } },
  { assert: { selector: '[data-part=msg-polite][data-state=spoken]', state: 'visible' } },
  { wait: 900 },
]);
