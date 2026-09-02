---
name: Fling
slug: fling
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "The fastest of the drag family: contact is released while it is
  still moving, so the content keeps travelling and the gesture cannot be
  dragged back."
aliases:
  - name: throw
    source: community
tags:
  - dragging
  - scroll
  - touch
relations:
  contrastWith:
    - momentum-scrolling
    - swipe
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Fling
    url: https://m1.material.io/patterns/gestures.html
sources:
  - title: "Material Design: gestures (drag, swipe, and fling)"
    url: https://m1.material.io/patterns/gestures.html
demo: inline
exhibit: false
useWhen: a throw that releases mid-motion and cannot be taken back
---

Drag, swipe and fling are one stroke told apart by what the finger was doing at the instant it
left the glass. A drag is a negotiation: the surface tracks the contact one to one, and until
the lift the reader can carry it back to where it started and nothing will have happened. A
fling ends mid-motion. The contact is still moving when it goes, so the interface stops reading
distance and starts reading speed, and everything that happens afterwards is the surface
spending momentum the reader is no longer holding.

The mechanism is a velocity tracker. A recognizer keeps the last handful of move samples,
fits a speed to them, and compares that speed at release against a minimum: below it the
gesture was a drag that came to a stop, above it the gesture was thrown. Android names the
result outright, since `GestureDetector` reports `onFling` with an X and a Y velocity, and
iOS hands the same number back from a pan recognizer's `velocity(in:)`. What the surface then
does with that number is a separate term: momentum scrolling is the deceleration curve, the
friction, the rubber band at the end, and a fling is the input that starts it. One is the
gesture, the other is the response, and it is worth keeping them apart because a surface can
refuse the response while still recognising the gesture.

The consequence worth designing around is that a fling cannot be taken back. A swipe carries
a direction that names a command, and it is usually still cancellable up to the release. A pan
tracks the pointer and can be undone by moving back. A fling is committed the moment the
contact ends, because the reader has already let go before the interface has finished
answering, which makes it the right gesture for travelling a long way through a list and the
wrong one for anything destructive. Throwing a message into an archive feels good until the
throw was a misread scroll.

It is also the gesture that most of the scrolling vocabulary is quietly built on. Momentum
scrolling, back to top, infinite scroll and list virtualization all assume readers who cover
hundreds of pixels per throw rather than dragging their way down, which is why a virtualized
list is judged on how it behaves during a coast rather than at rest, and why a jump-to-top
control exists at all: a fling is fast in one direction and no help getting back.
