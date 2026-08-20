import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-menu=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=ring]', state: 'hidden' } },

  // A press held on the canvas draws the ring around the point that was pressed.
  { moveTo: '[data-part=spot-left]' },
  { wait: 400 },
  { hold: 620 },
  { wait: 450 },
  { assert: { selector: '[data-part=ring]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-menu=open]', state: 'visible' } },
  { wait: 700 },

  // Direction is the choice: one stroke out through the top wedge and round to the
  // lower right one, where the release commits. Only the release counts.
  { drag: { to: '[data-part=wedge-filter]', via: ['[data-part=wedge-crop]'] } },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-chose=filter]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-menu=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=ring]', state: 'hidden' } },
  { wait: 900 },

  // The same hold somewhere else draws the same menu there: the items sit around the
  // point of invocation rather than in a fixed corner.
  { moveTo: '[data-part=spot-right]' },
  { wait: 400 },
  { hold: 620 },
  { wait: 450 },
  { assert: { selector: '[data-part=ring]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-menu=open]', state: 'visible' } },
  { wait: 700 },

  // Distance is the other half: out to a wedge, then back into the hub, where letting
  // go runs nothing at all and the previous choice is left standing.
  { drag: { to: '[data-part=hub]', via: ['[data-part=wedge-share]'] } },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-last=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-chose=filter]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-menu=closed]', state: 'visible' } },
  { wait: 900 },
]);
