---
name: Screen magnification
slug: screen-magnification
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Blowing part of the screen up many times over, so a reader sees a
  keyhole of the layout at a time and anything far from the action is
  effectively off screen.
aliases:
  - name: screen magnifier
    source: community
  - name: ZoomText
    source: community
  - name: magnifier keyhole
    source: community
  - name: low vision zoom
    source: community
tags:
  - assistive-tech
  - perception
relations:
  contrastWith:
    - resize-text
    - reflow
    - screen-reader
  variantOf: []
  partOf: []
  seeAlso:
    - fisheye-view
implementations: []
sources:
  - title: "AbilityNet: Screen magnification"
    url: https://abilitynet.org.uk/factsheets/screen-magnification
demo: inline
exhibit: false
useWhen: a toast at the corner will never be seen
---

A screen magnifier is an electronic magnifying glass held over the display. It enlarges the
whole screen or a region of it, and the magnification goes far past anything a browser's own
zoom offers: AbilityNet notes packages that enlarge up to 64 times, with commercial tools
such as SuperNova and ZoomText, alongside the magnifiers built into Windows, macOS,
iOS, and Android. At 400 percent a reader sees roughly a sixteenth of the screen area, and at
800 percent a sixty-fourth. Everything else is not small. It is off screen.

That is the whole design consequence, and it is not the same problem
[reflow](/reflow) solves. Reflow, WCAG 1.4.10, is about content surviving a narrow viewport
without two-dimensional scrolling, and it helps enormously, because a single column at a
readable width is a column a magnifier can follow straight down. But a magnifier user on a
wide desktop layout is still moving a keyhole around a page that never got narrower, and
their trouble is spatial: the further apart two things are, the less likely both are ever seen
in the same view.

So the failures are all about distance. A [toast](/toast) in the bottom-right corner reporting
the result of a button pressed at the top left is invisible, which is why an
[inline validation](/inline-validation) message beside its field beats a summary far away,
and why an [error summary](/error-summary) has to move the reader to the field rather than
just describe it. A table with row labels on the left and the value on the right can be
unreadable in the middle. A [tooltip](/tooltip) that opens off the side of a magnified view
is a tooltip nobody sees. A sticky header that eats half the enlarged viewport takes half of
what little is left. The rule that follows from all of this is
[proximity](/proximity): put the response next to the thing that caused it, keep a label
with its control, and never make understanding depend on two far-apart parts of the screen
being read together.

Magnification also changes what motion and focus mean. When a magnifier is tracking the
caret or the focus ring, moving focus moves the whole view, so a script that steals focus
teleports the reader somewhere else entirely, and a
[focus ring](/focus-ring) that is thin or low contrast is a reader lost. Testing for this is
cheap and nobody does it: zoom your own operating system to 400 percent and try to complete
the flow you just designed. Anything you find yourself hunting for is something a magnifier
user hunts for every time. A related and easier check is [resize text](/resize-text) and
[text spacing](/text-spacing), which catch the layouts that break before magnification is
even involved.
