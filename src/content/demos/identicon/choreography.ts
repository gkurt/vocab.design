import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the marks waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=mark-review][data-handle=nils]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-review][data-code="4759"]', state: 'visible' } },
  // Two marks derived separately from the same handle came out identical.
  { assert: { selector: '[data-part=seed][data-match=yes]', state: 'visible' } },
  { wait: 600 },

  // A different identifier is a different pattern and a different hue.
  { moveTo: '[data-part=seg-marceau]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=mark-review][data-code="3e67"]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-list][data-handle=marceau]', state: 'visible' } },
  { assert: { selector: '[data-part=seed][data-match=yes]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-tomas]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=mark-review][data-code="7c2a"]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-list][data-handle=tomas]', state: 'visible' } },
  { wait: 700 },

  // Back to the first handle, which recomputes to the pattern it had before: the
  // determinism is the term, and this is the assert that proves it.
  { moveTo: '[data-part=seg-nils]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=mark-review][data-code="4759"]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-list][data-code="4759"]', state: 'visible' } },
  { wait: 700 },
]);
