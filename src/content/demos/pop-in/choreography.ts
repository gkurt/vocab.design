import { steps } from '#src/stage/choreography.ts';

// The pop is 460ms, which is too short to hang a mid-flight claim on, so the script proves
// the arrival happened by counting it instead: `data-plays` goes up and the medal is settled
// again with room to spare (SPEC §8). Digits in an attribute value are quoted, since a bare
// one is not a valid CSS identifier.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=medal][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=medal][data-plays="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },

  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=medal][data-plays="2"][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=medal][data-plays="3"][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 600 },
]);
