---
name: Wizard
slug: wizard
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A flow broken into ordered steps with back and next controls, where
  each step validates before the next one is allowed.
aliases:
  - name: multi step form
    source: community
  - name: guided flow
    source: community
  - name: setup assistant
    source: community
tags:
  - forms
  - progress
relations:
  contrastWith:
    - one-thing-per-page
    - tearsheet
    - form
  variantOf: []
  partOf: []
  seeAlso:
    - step-indicator
implementations: []
sources:
  - title: "Cloudscape: components"
    url: https://cloudscape.design/components/
demo: inline
exhibit: false
useWhen: a long task split into ordered steps
---

A wizard takes one long task and serves it a screen at a time, in an order the
interface decides. That order is the feature. It suits work that is rare and
consequential (creating a cluster, filing a claim, setting up a device), work where
later questions depend on earlier answers, and work a person is doing for the first
time and will probably never do again. It suits an everyday form very badly: five
screens for eight fields is slower than eight fields, and it hides the shape of what
is being asked.

The word gets tangled with two others. A [step indicator](/step-indicator) is the row
of numbered dots that shows where you are, and it is a part of the wizard rather than
the thing itself, which matters because MUI names that indicator Stepper and many
teams then call the whole flow a stepper. On this site, [stepper](/stepper) is the
small plus and minus control for a quantity, so keep the three apart: the wizard is
the flow, the indicator is the progress, the stepper is the quantity control.

Most wizards are ruined by the same handful of details. Validate each step as it is
left, so nobody discovers on screen four that screen one was wrong. Never lose what
was typed: going back has to show the answers as they were, and coming forward again
must not re-ask them. Say where the reader is and how much is left, and let them
return to a step they have already completed. Finish with a review step that shows
every answer and names its action for what it does, so the last button reads "Create
workspace" and not "Finish". And for anything long enough to be interrupted, save
progress and let it resume, because a wizard that loses an hour of work is worse than
the long form it replaced.

The keyboard and the screen reader need the same care as the layout. Moving to a step
should move focus to that step's heading rather than leaving it on a Next button that
has just changed meaning, the step change should be announced, and the Back and Next
controls should keep the same position on every step so they can be found without
looking. Keep Back a quiet control and Next the prominent one, in that order, and do
not disable Next as the way of reporting an error: a control that cannot be pressed
cannot explain itself.
