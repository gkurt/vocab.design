import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // Mount is `overflow: auto`: the box clips at its padding edge and nothing has left it.
  { assert: { selector: '[data-part=box][data-overflow=auto]', state: 'visible' } },
  { assert: { selector: '[data-part=box][data-at=top]', state: 'visible' } },
  { assert: { selector: '[data-part=arena][data-spill=no]', state: 'visible' } },
  { wait: 900 },
  // The box is the thing that scrolls, not the page around it.
  { moveTo: '[data-part=box]' },
  { scroll: { y: 30 } },
  { wait: 500 },
  { assert: { selector: '[data-part=box][data-at=middle]', state: 'visible' } },
  { wait: 700 },
  { scroll: { y: 40 } },
  { wait: 500 },
  { assert: { selector: '[data-part=box][data-at=end]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-hidden]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-hidden][aria-selected="true"]', state: 'visible' } },
  // Still a scroll container: it clips the same way and holds the same content.
  { assert: { selector: '[data-part=box][data-overflow=hidden]', state: 'visible' } },
  { assert: { selector: '[data-part=box][data-at=top]', state: 'visible' } },
  { assert: { selector: '[data-part=arena][data-spill=no]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-visible]' },
  { click: true },
  { wait: 800 },
  // No scrollport at all: the content leaves the box instead of clipping.
  { assert: { selector: '[data-part=box][data-overflow=visible]', state: 'visible' } },
  { assert: { selector: '[data-part=arena][data-spill=yes]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names a value, so the way back is a value too, not an undo.
  { moveTo: '[data-part=seg-auto]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-overflow=auto]', state: 'visible' } },
  { assert: { selector: '[data-part=arena][data-spill=no]', state: 'visible' } },
  { wait: 900 },
]);
