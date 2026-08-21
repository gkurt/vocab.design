import { steps } from '#src/stage/choreography.ts';

// The list is the term, so the script only ever uses it: click an entry, let the
// prose settle, and read the section now under the pane's top edge. Nothing in the
// list changes state, because a table of contents does not track the reader.
export default steps([
  { wait: 420 },
  { assert: { selector: '[data-part=entry-overview]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-tokens]', state: 'visible' } },
  { assert: { selector: '[data-part=doc][data-top=overview]', state: 'visible' } },
  { moveTo: '[data-part=entry-tokens]' },
  { click: true },
  { wait: 1200 },
  { assert: { selector: '[data-part=doc][data-top=tokens]', state: 'visible' } },
  { moveTo: '[data-part=entry-install]' },
  { click: true },
  { wait: 1200 },
  { assert: { selector: '[data-part=doc][data-top=install]', state: 'visible' } },
  { wait: 800 },
]);
