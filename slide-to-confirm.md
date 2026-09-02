---
name: Slide to confirm
slug: slide-to-confirm
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A control that commits only once its thumb is dragged the length of
  its track, so the effort of the gesture is the guard against doing it by
  accident.
aliases:
  - name: swipe to confirm
    source: community
  - name: slide to unlock
    source: community
  - name: confirmation slider
    source: community
tags:
  - dragging
  - touch
relations:
  contrastWith:
    - hold-to-confirm
    - type-to-confirm
  variantOf:
    - microinteraction
  partOf: []
  seeAlso:
    - dragging-alternative
implementations: []
sources:
  - title: "WCAG 2.2: Understanding SC 2.5.7 Dragging Movements"
    url: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements
demo: inline
exhibit: false
useWhen: making one irreversible action need a deliberate drag
---

The ancestor is slide to unlock, which existed because a phone in a pocket is pressed
constantly and a tap is the one thing a pocket can produce. That is the whole mechanism.
A drag has a beginning, a direction, a distance and an end, and nothing bumps into all
four of those by accident. Once the pattern was understood as a guard rather than as a
lock screen it moved to the places where an accidental commit is expensive: payment
terminals, industrial stops, ending a live broadcast, wiping a device. The label usually
states the act ("slide to delete"), because a track that says nothing is a puzzle rather
than a confirmation.

It has two published siblings on this site and choosing between them is a question of what
you want the guard to cost. [Hold to confirm](/hold-to-confirm) charges time: a second of
sustained pressure, cheap to learn, awkward for anyone whose hands do not hold still.
[Type to confirm](/type-to-confirm) charges attention and knowledge, since copying the name
of the thing proves you know which thing you are about to destroy, and it is the only one of
the three that catches the right gesture aimed at the wrong object. Sliding charges motor
precision and continuity, which makes it the most natural of the three under a thumb and the
least forgiving for a shaky hand or a trackpad. As a rule of thumb: type for the irreversible
and named, hold for the physical and quick, slide for touch and for anything that must not
happen in a pocket.

That last cost is not a matter of taste, it is a conformance failure waiting to happen.
WCAG 2.2 added success criterion 2.5.7, Dragging Movements, which requires that any function
operated by dragging also be achievable with a single pointer without dragging. A slide to
confirm that is the only way through fails it, and the fix is small: ship a plain button
beside the track, or make a tap on the far end of the track commit as well. That is a
[dragging alternative](/dragging-alternative), and the specimen on this page carries one for
exactly this reason. Anything teaching this pattern without it is teaching a bug.

The craft is in the threshold and the release. The track has to be long enough that the
gesture reads as deliberate and short enough to finish in one motion without repositioning
the hand, which in practice means something like a thumb's travel rather than the width of
the screen. A release before the threshold springs the thumb back, and that spring is the
most important animation in the control: it is the interface saying that nothing happened,
which is the only way a reader learns that letting go early is safe. Once it commits, do not
spring back and do not re-arm, because a guard that resets itself into a live state is a
guard that can be tripped twice.
