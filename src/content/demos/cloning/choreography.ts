import { steps } from '#src/stage/choreography.ts';

// The flight runs for 1100 ms after a 60 ms beat, so every mid-flight claim sits near the middle of
// that window and every landed claim is given the whole flight plus its settle. Each pick names an
// outcome outright rather than stepping to the next one, and the pass ends back on the clone it
// started from.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-mode=clone]', state: 'visible' } },
  { assert: { selector: '[data-part=flier]', state: 'visible' } },
  { assert: { selector: '[data-part=source-tile]', state: 'visible' } },
  { assert: { selector: '[data-part=slot]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=flier][data-mode=clone][data-state=landed]', state: 'visible' } },
  { assert: { selector: '[data-part=source-tile][data-tenant=kept]', state: 'visible' } },

  // The same flight with nothing duplicated: the library is left holding an empty outline.
  { moveTo: '[data-part=seg-move]' },
  { click: true },
  { wait: 200 },
  { assert: { selector: '[data-part=flier][data-state=flying]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=flier][data-mode=move][data-state=landed]', state: 'visible' } },
  { assert: { selector: '[data-part=source-tile][data-tenant=empty]', state: 'visible' } },

  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 200 },
  { assert: { selector: '[data-part=flier][data-state=flying]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=flier][data-state=landed]', state: 'visible' } },

  { moveTo: '[data-part=seg-clone]' },
  { click: true },
  { wait: 200 },
  { assert: { selector: '[data-part=flier][data-mode=clone][data-state=flying]', state: 'visible' } },
  { assert: { selector: '[data-part=source-tile][data-tenant=kept]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=flier][data-mode=clone][data-state=landed]', state: 'visible' } },
  { wait: 700 },
]);
