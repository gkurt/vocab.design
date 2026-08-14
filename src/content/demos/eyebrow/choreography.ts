import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card][data-eyebrow=with]', state: 'visible' } },
  { assert: { selector: '[data-part=eyebrow]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-without]' },
  { click: true },
  { wait: 600 },
  // The line is still there, holding its room; only the shelf label has gone.
  { assert: { selector: '[data-part=card][data-eyebrow=without]', state: 'visible' } },
  { assert: { selector: '[data-part=eyebrow]', state: 'hidden' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-with]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-eyebrow=with]', state: 'visible' } },
  { assert: { selector: '[data-part=eyebrow]', state: 'visible' } },
  { wait: 1000 },
]);
