import { steps } from '#src/stage/choreography.ts';

// The reveal runs once at mount, so the script opens after it has landed rather than
// judging the panel mid-clip.
export default steps([
  { wait: 1400 },
  { assert: { selector: '[data-part=scene][data-state=revealed]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-clip=open]', state: 'visible' } },
  // Replay names a run rather than toggling one, so a resumed pass lands where it said.
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The clip takes 900 ms after a 60 ms lead, so the post-click beat lands well inside it.
  { assert: { selector: '[data-part=panel][data-clip=growing]', state: 'visible' } },
  // The room the panel will fill was reserved before any of it was painted.
  { assert: { selector: '[data-part=placeholder]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=scene][data-state=revealed]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-clip=open]', state: 'visible' } },
  { wait: 700 },
]);
