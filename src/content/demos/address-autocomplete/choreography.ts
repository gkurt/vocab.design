import { steps } from '#src/stage/choreography.ts';

// Characters land one at a time, which is the only way the narrowing is visible: the list
// opens on the line, "mill" drops the two addresses that do not match, and choosing one
// closes the list and writes three fields that were empty a moment before. The pass ends on
// the state the specimen mounts in, restored by the labelled Start again (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=fields][data-filled="0"]', state: 'visible' } },
  { moveTo: '[data-part=lookup-input]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=lookup-input][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-church]', state: 'visible' } },
  { wait: 400 },
  { type: 'mill' },
  { wait: 600 },
  { assert: { selector: '[data-part=opt-mill-12]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-millgate]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-church]', state: 'hidden' } },
  { assert: { selector: '[data-part=opt-harbour]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=opt-mill-12]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=fields][data-filled="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=val-postcode][data-state=filled]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=reset]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=fields][data-filled="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { wait: 900 },
]);
