import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=swirl]', state: 'visible' } },
  { wait: 700 },
  // A poster answers no pointer: the cursor visits the buzzing bands, the rosette that
  // supplies the symmetry, then the lettering that has been stretched to fill its ellipse.
  { moveTo: '[data-part=rosette]' },
  { wait: 800 },
  { moveTo: '[data-part=line-one]' },
  { wait: 800 },
  { moveTo: '[data-part=line-three]' },
  { wait: 800 },
  { assert: { selector: '[data-part=lettering]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 600 },
]);
