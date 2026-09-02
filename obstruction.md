---
name: Obstruction
slug: obstruction
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Putting deliberate hurdles in front of an action the business does
  not want taken, so the effort itself does the discouraging.
aliases:
  - name: friction by design
    source: community
  - name: intentional friction
    source: community
  - name: manage preferences maze
    source: community
tags: []
relations:
  contrastWith:
    - roach-motel
    - privacy-zuckering
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Deceptive Design: Obstruction"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: the path exists but is made exhausting on purpose
---

Obstruction is the pattern that never says no. The subscription can be cancelled, the
consent can be withdrawn, the account can be deleted, and every screen along the way is
accurate. What has been engineered is the length of the way: the entrance is unlabelled
("Manage preferences"), the exit is buried under three decoys, a confirmation asks whether
you are sure and offers the reverse in the loud button, and the last screen turns out to be
a telephone number with office hours. Nobody has been lied to. They have been outlasted.

The measurable design is the step count, which is why the pattern is so easy to audit and
so hard to defend. Count the clicks from a reader's stated intention to the intention being
carried out, then count them for the action the business prefers, and compare. Signing up
took one screen. Cancelling took four screens, a phone call, and a working day that
overlaps yours by three hours. Regulators now read that asymmetry directly: consent that is
harder to withdraw than to give fails the European standard for freely given consent, and
the American "click to cancel" rulemaking is written around exactly this comparison. The
gap between the two counts is the whole offence.

The hard part of using the word well is that friction is not the villain. A
[type to confirm](/type-to-confirm) box makes deleting a production database slower on
purpose, and it is good design: the cost is paid in the reader's own interest, at a moment
where a mistake is unrecoverable, and it is proportionate to the damage. The same slowness
in front of a cancellation serves the seller and costs the reader something they already
decided to spend. So the term names the intent, not the mechanism. Ask who benefits from
the delay and whether the reader would choose it if they understood it; if the answer is
the business, the extra screens are obstruction whatever they are labelled.

Which puts it squarely among the [dark patterns](/dark-pattern), and near the top of them
for durability, because it survives every review that only reads copy. There is nothing
deceptive to redline: each screen would pass in isolation, and only the path has the
problem. The repair is the same shape as the audit. Put the exit on the screen where the
reader already is, spell it with the word they would use ("Cancel subscription", not "Manage
preferences"), ask for confirmation once, and let the last step be a button rather than an
opening hour.
