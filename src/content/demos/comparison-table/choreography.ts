import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=table][data-mode=all]', state: 'visible' } },
  { assert: { selector: '[data-part=col-team][data-recommended]', state: 'visible' } },
  { assert: { selector: '[data-part=row-sso]', state: 'visible' } },
  // Four of the nine rows say the same thing in all three columns.
  { assert: { selector: '[data-part=row-forum][data-same]', state: 'visible' } },
  { moveTo: '[data-part=seg-diff]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=seg-diff][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=table][data-mode=diff]', state: 'visible' } },
  { assert: { selector: '[data-part=row-forum]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-backups]', state: 'hidden' } },
  // What is left is the decision: the rows where the plans actually part company.
  { assert: { selector: '[data-part=row-sso]', state: 'visible' } },
  { assert: { selector: '[data-part=row-sla]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-all]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=table][data-mode=all]', state: 'visible' } },
  { assert: { selector: '[data-part=row-forum]', state: 'visible' } },
  { wait: 800 },
]);
