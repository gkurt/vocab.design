import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Side by side, both halves carrying their own path and their own action.
  { assert: { selector: '[data-part=region][data-arrangement="side"]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-charter]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-berth]', state: 'visible' } },
  { assert: { selector: '[data-part=cta-charter]', state: 'visible' } },
  { assert: { selector: '[data-part=cta-berth]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-narrow][data-selected]', state: 'visible' } },
  // Stacked, both halves are still there, but one of them is now first.
  { assert: { selector: '[data-part=region][data-arrangement="stacked"]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-charter]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-berth]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names a width, so the way back is a width too, not an undo.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-arrangement="side"]', state: 'visible' } },
  { assert: { selector: '[data-part=cta-berth]', state: 'visible' } },
  { wait: 800 },
]);
