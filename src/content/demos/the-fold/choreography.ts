import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=fold]', state: 'visible' } },
  // At rest: the first screenful is whole, one block is cut by the line, the rest is below it.
  { assert: { selector: '[data-part=block-0][data-side=above]', state: 'visible' } },
  { assert: { selector: '[data-part=block-2][data-side=cut]', state: 'visible' } },
  { assert: { selector: '[data-part=block-3][data-side=below]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  { scroll: { y: 118 } },
  { wait: 800 },
  // The page moved and the line did not: what is above the fold changed, the fold did not.
  { assert: { selector: '[data-part=fold]', state: 'visible' } },
  { assert: { selector: '[data-part=block-2][data-side=above]', state: 'visible' } },
  { assert: { selector: '[data-part=block-4][data-side=cut]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1400 },
  // A delta back past the top, so the return is a position rather than an undo.
  { scroll: { y: -300 } },
  { wait: 800 },
  { assert: { selector: '[data-part=block-2][data-side=cut]', state: 'visible' } },
  { assert: { selector: '[data-part=fold]', state: 'visible' } },
  { wait: 800 },
]);
