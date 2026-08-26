import { steps } from '#src/stage/choreography.ts';

// The sender's footer is picked absolutely rather than toggled (SPEC §8), and the
// client's control is pressed last, because the term's claim is that it works whichever
// footer the sender shipped. The receipt stays visible after the press, so the closing
// asserts land on evidence rather than on something leaving the stage.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=client-bar]', state: 'visible' } },
  { assert: { selector: '[data-part=footer][data-form="plain"]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=form-buried]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=footer][data-form="buried"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=header-unsub]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { assert: { selector: '[data-part=header-unsub][aria-disabled="true"]', state: 'visible' } },
  { wait: 1400 },
]);
