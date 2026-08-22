import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The resting state is the stranded one: paint and actions, with no pointer anywhere.
  { assert: { selector: '[data-part=card][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 600 },
  // A finger taps the neighbour. That is what really moves a stranded hover: the paint
  // this card never asked for lands over there instead, and only then does this one lose it.
  { moveTo: '[data-part=card-jetty]' },
  { wait: 500 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'hidden' } },
  { assert: { selector: '[data-part=card-jetty][data-stuck]', state: 'visible' } },
  { wait: 900 },
  // A tap on this card strands it again. The press applies the hover state and the lift
  // sends nothing, so the paint has no way out.
  { moveTo: '[data-part=card]' },
  { wait: 500 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 1000 },
  // Gated: the reveal is a pointer's flourish, so a tap has nothing to leave behind and
  // the actions are simply there.
  { moveTo: '[data-part=mode-gated]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 900 },
  // Back to the authoring the term is about, and the tap that strands it all over again.
  { moveTo: '[data-part=mode-ungated]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 1100 },
]);
