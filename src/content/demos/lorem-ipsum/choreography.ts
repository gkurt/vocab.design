import { steps } from '#src/stage/choreography.ts';

/**
 * Nothing here responds to a pointer and nothing changes state, so the script is waits and
 * asserts only (SPEC §8). It holds the placeholder card on stage beside the same layout
 * carrying the lengths the placeholder was hiding: a one-word name, a role that wraps, and
 * a bio nobody filled in. The chips that once footed the scene are gone, so the claim on
 * their row went with them.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card-lorem]', state: 'visible' } },
  { assert: { selector: '[data-part=bio-lorem]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=card-real]', state: 'visible' } },
  { assert: { selector: '[data-part=name-real]', state: 'visible' } },
  { assert: { selector: '[data-part=role-real]', state: 'visible' } },
  { assert: { selector: '[data-part=bio-real]', state: 'visible' } },
  { wait: 1400 },
]);
