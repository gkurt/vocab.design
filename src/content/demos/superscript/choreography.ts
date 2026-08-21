import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=line]', state: 'visible' } },
  { assert: { selector: '[data-part=marker]', state: 'visible' } },
  { assert: { selector: '[data-part=exponent]', state: 'visible' } },
  { wait: 1200 },
  // Each pick is a stated setting, not a flip: the script asks for the feature, then
  // asks for the fallback back, so a pass joined halfway still lands where it says.
  { moveTo: '[data-part=seg-variant]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=line][data-raised="variant"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-css]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=line][data-raised="css"]', state: 'visible' } },
  // The two ruled columns answer no pointer: they are read, not pointed at.
  { wait: 1200 },
  { assert: { selector: '[data-part=grown]', state: 'visible' } },
  { assert: { selector: '[data-part=held]', state: 'visible' } },
  { wait: 800 },
]);
